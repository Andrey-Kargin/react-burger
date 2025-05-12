import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const res = await fetch('https://norma.nomoreparties.space/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });
      if (!res.ok) throw new Error('Ошибка при создании заказа');
      const data = await res.json();
      return data.order.number;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    number: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrder(state) {
      state.number = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.number = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;