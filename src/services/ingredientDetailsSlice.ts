import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TIngredientType = 'bun' | 'sauce' | 'main';

export interface TIngredient {
	_id: string;
	name: string;
	type: TIngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v?: number;
	uid?: string;
}

interface IngredientDetailsState {
	item: TIngredient | null;
}

const initialState: IngredientDetailsState = {
	item: null,
};

const ingredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		openIngredient(state, action: PayloadAction<TIngredient>) {
			state.item = action.payload;
		},
		closeIngredient(state) {
			state.item = null;
		},
	},
});

export const { openIngredient, closeIngredient } =
	ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
