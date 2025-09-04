import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import constructorReducer from './constructorSlice';
import ingredientDetailsReducer from './ingredientDetailsSlice';
import orderReducer from './orderSlice';
import authReducer from './authSlice';

import feedReducer, { wsActions as feedWsActions } from './ws/feedSlice';
import profileOrdersReducer, {
	wsActions as profileWsActions,
} from './ws/profileOrdersSlice';
import orderInfoReducer from './orderInfoSlice';
import { createWsMiddleware } from './ws/wsMiddleware';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		burgerConstructor: constructorReducer,
		ingredientDetails: ingredientDetailsReducer,
		order: orderReducer,
		auth: authReducer,
		feed: feedReducer,
		profileOrders: profileOrdersReducer,
		orderInfo: orderInfoReducer,
	},
	middleware: (getDefault) => {
		const base = getDefault();

		const feedWs = createWsMiddleware({
			wsUrl: 'wss://norma.nomoreparties.space/orders/all',
			actions: {
				// ВАЖНО: сюда строки типов для connect/disconnect
				connect: feedWsActions.connect.type,
				disconnect: feedWsActions.disconnect.type,
				// а здесь — сами экшен-криэйторы
				onOpen: feedWsActions.onOpen,
				onClose: feedWsActions.onClose,
				onError: feedWsActions.onError,
				onMessage: feedWsActions.onMessage,
			},
			withAuth: false,
		});

		const profileWs = createWsMiddleware({
			wsUrl: 'wss://norma.nomoreparties.space/orders',
			actions: {
				connect: profileWsActions.connect.type,
				disconnect: profileWsActions.disconnect.type,
				onOpen: profileWsActions.onOpen,
				onClose: profileWsActions.onClose,
				onError: profileWsActions.onError,
				onMessage: profileWsActions.onMessage,
			},
			withAuth: true,
		});

		return base.concat(feedWs, profileWs);
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
