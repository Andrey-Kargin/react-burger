import { createSlice, nanoid } from '@reduxjs/toolkit';

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    bun: null,
    ingredients: [], // начинка
  },
  reducers: {
    addIngredient: {
      reducer(state, action) {
        const item = action.payload;
        if (item.type === 'bun') {
          state.bun = item;
        } else {
          state.ingredients.push(item);
        }
      },
      prepare(ingredient) {
        return { payload: { ...ingredient, uid: nanoid() } };
      },
    },
    removeIngredient(state, action) {
      state.ingredients = state.ingredients.filter((item) => item.uid !== action.payload);
    },
    moveIngredient(state, action) {
      const { fromIndex, toIndex } = action.payload;
      const updated = [...state.ingredients];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      state.ingredients = updated;
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} = constructorSlice.actions;

export default constructorSlice.reducer;