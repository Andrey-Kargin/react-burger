import type { Middleware, MiddlewareAPI, AnyAction } from '@reduxjs/toolkit';

type WsActions = {
	connect: string;
	disconnect: string;
	onOpen: () => AnyAction;
	onClose: () => AnyAction;
	onError: (payload: string) => AnyAction;
	onMessage: (payload: any) => AnyAction;
};

type CreateWsArgs = {
	wsUrl: string;
	actions: WsActions;
	withAuth?: boolean;
};

export const createWsMiddleware = ({
	wsUrl,
	actions,
	withAuth = false,
}: CreateWsArgs): Middleware => {
	let socket: WebSocket | null = null;

	const middleware: Middleware =
		(store: MiddlewareAPI) => (next) => (action: unknown) => {
			const { dispatch } = store;
			const a = action as { type?: string };

			if (a?.type === actions.connect) {
				let url = wsUrl;

				if (withAuth) {
					const raw = localStorage.getItem('accessToken') || '';
					const token = raw.replace(/^Bearer\s+/i, '');
					const sep = url.includes('?') ? '&' : '?';
					url = `${url}${sep}token=${token}`;
				}

				if (socket) socket.close();
				socket = new WebSocket(url);

				socket.onopen = () => {
					dispatch(actions.onOpen());
				};

				socket.onerror = () => {
					dispatch(actions.onError('WebSocket error'));
				};

				socket.onclose = () => {
					dispatch(actions.onClose());
					socket = null;
				};

				socket.onmessage = (event) => {
					try {
						const data = JSON.parse(event.data);
						if (
							typeof data?.message === 'string' &&
							/invalid|missing token/i.test(data.message)
						) {
							dispatch(actions.onError('Invalid or missing token'));
							return;
						}
						dispatch(actions.onMessage(data));
					} catch (e: any) {
						dispatch(actions.onError(e?.message || 'Bad WS message'));
					}
				};
			}

			if (a?.type === actions.disconnect && socket) {
				socket.close(1000, 'manual disconnect');
				socket = null;
			}

			return next(action);
		};

	return middleware;
};
