import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from './api';

interface OrderResponse {
	success: boolean;
	name: string;
	order: {
		number: number;
	};
}

interface OrderState {
	number: number | null;
	isLoading: boolean;
	error: string | null;
	isModalOpen: boolean;
}

const initialState: OrderState = {
	number: null,
	isLoading: false,
	error: null,
	isModalOpen: false,
};

export const sendOrder = createAsyncThunk<
	number,
	string[],
	{ rejectValue: string }
>('order/sendOrder', async (ingredientIds, { rejectWithValue }) => {
	try {
		const data = await request<OrderResponse>('/orders', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ingredients: ingredientIds }),
		});
		return data.order.number;
	} catch (err: any) {
		return rejectWithValue(err?.message ?? 'Failed to send order');
	}
});

const orderSlice = createSlice({
	name: 'order',
	initialState,
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
			.addCase(sendOrder.fulfilled, (state, action: PayloadAction<number>) => {
				state.isLoading = false;
				state.number = action.payload;
				state.isModalOpen = true;
			})
			.addCase(sendOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.number = null;
				state.error =
					(action.payload as string) ?? action.error.message ?? null;
				state.isModalOpen = false;
			});
	},
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
