import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient, TConstructorIngredient } from '../utils/types';

export type ConstructorState = {
	bun: TIngredient | null;
	ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
	bun: null,
	ingredients: [],
};

const constructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient: {
			reducer(state, action: PayloadAction<TConstructorIngredient>) {
				const item = action.payload;
				if (item.type === 'bun') {
					state.bun = item;
				} else {
					state.ingredients.push(item);
				}
			},
			prepare(ingredient: TIngredient) {
				return {
					payload: { ...ingredient, uid: nanoid() } as TConstructorIngredient,
				};
			},
		},
		removeIngredient(state, action: PayloadAction<string>) {
			state.ingredients = state.ingredients.filter(
				(i) => i.uid !== action.payload
			);
		},
		moveIngredient(
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) {
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
