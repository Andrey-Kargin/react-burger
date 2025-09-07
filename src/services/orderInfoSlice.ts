import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { request } from './api';
import { TOrder, TOrderByNumberResponse } from '../utils/types';

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
	'orderInfo/fetchByNumber',
	async (number) => {
		const data = await request<TOrderByNumberResponse>(`/orders/${number}`);
		const order = data.orders?.[0];
		if (!order) throw new Error('Заказ не найден');
		return order;
	}
);

type OrderInfoState = {
	order: TOrder | null;
	loading: boolean;
	error: string | null;
};

const initialState: OrderInfoState = {
	order: null,
	loading: false,
	error: null,
};

const orderInfoSlice = createSlice({
	name: 'orderInfo',
	initialState,
	reducers: {
		clearOrderInfo: (state) => {
			state.order = null;
			state.loading = false;
			state.error = null;
		},
		setOrderInfo: (state, action: PayloadAction<TOrder | null>) => {
			state.order = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchOrderByNumber.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOrderByNumber.fulfilled, (state, action) => {
				state.loading = false;
				state.order = action.payload;
			})
			.addCase(fetchOrderByNumber.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Ошибка';
			});
	},
});

export const { clearOrderInfo, setOrderInfo } = orderInfoSlice.actions;
export default orderInfoSlice.reducer;
