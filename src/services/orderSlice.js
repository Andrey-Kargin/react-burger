import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from './api';

export const sendOrder = createAsyncThunk(
	'order/sendOrder',
	async (ingredientIds) => {
		const data = await request('/orders', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ingredients: ingredientIds }),
		});
		return data.order.number;
	}
);
const orderSlice = createSlice({
	name: 'order',
	initialState: {
		number: null,
		isLoading: false,
		error: null,
		isModalOpen: false,
	},
	reducers: {
		clearOrder(state) {
			state.number = null;
			state.isLoading = false;
			state.error = null;
			state.isModalOpen = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(sendOrder.pending, (state) => {
				state.isLoading = true;
				state.isModalOpen = false;
			})
			.addCase(sendOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.number = action.payload;
				state.isModalOpen = true;
			})
			.addCase(sendOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.number = null;
				state.error = action.error.message;
				state.isModalOpen = false;
			});
	},
});
export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
