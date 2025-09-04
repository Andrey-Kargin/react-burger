import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersFeedMessage } from '../../utils/types';

type ProfileOrdersState = {
	connected: boolean;
	error: string | null;
	orders: TOrder[];
};

const initialState: ProfileOrdersState = {
	connected: false,
	error: null,
	orders: [],
};

const profileOrdersSlice = createSlice({
	name: 'profileOrders',
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
			const { orders } = action.payload;
			state.orders = (orders || []).filter(
				(o) => o && Array.isArray(o.ingredients) && typeof o.number === 'number'
			);
		},
	},
});

export const wsActions = profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;
