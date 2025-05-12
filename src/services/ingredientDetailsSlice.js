import { createSlice } from '@reduxjs/toolkit';

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState: {
    item: null,
  },
  reducers: {
    openIngredient(state, action) {
      state.item = action.payload;
    },
    closeIngredient(state) {
      state.item = null;
    },
  },
});

export const { openIngredient, closeIngredient } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;