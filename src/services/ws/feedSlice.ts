import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersFeedMessage } from '../../utils/types';

type FeedState = {
	connected: boolean;
	error: string | null;
	orders: TOrder[];
	total: number;
	totalToday: number;
};

const initialState: FeedState = {
	connected: false,
	error: null,
	orders: [],
	total: 0,
	totalToday: 0,
};

const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		connect: (state) => state,
		disconnect: (state) => state,
		onOpen: (state) => {
			state.connected = true;
			state.error = null;
		},
		onClose: (state) => {
			state.connected = false;
		},
		onError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		onMessage: (state, action: PayloadAction<TOrdersFeedMessage>) => {
			const { orders, total, totalToday } = action.payload;
			state.orders = (orders || []).filter(
				(o) => o && Array.isArray(o.ingredients) && typeof o.number === 'number'
			);
			state.total = total ?? 0;
			state.totalToday = totalToday ?? 0;
		},
	},
});

export const wsActions = feedSlice.actions;
export default feedSlice.reducer;
