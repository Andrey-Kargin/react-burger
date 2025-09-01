import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

type TIngredientType = 'bun' | 'sauce' | 'main';

export interface TIngredient {
	_id: string;
	name: string;
	type: TIngredientType;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	proteins?: number;
	fat?: number;
	carbohydrates?: number;
	calories?: number;
	__v?: number;
	uid?: string;
}

type TConstructorIngredient = TIngredient & { uid: string };

type ConstructorState = {
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
				(item) => item.uid !== action.payload
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
