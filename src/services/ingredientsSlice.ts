import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from './api';

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

interface IngredientsResponse {
	success: boolean;
	data: TIngredient[];
}

interface IngredientsState {
	items: TIngredient[];
	loading: boolean;
	error: string | null;
}

const initialState: IngredientsState = {
	items: [],
	loading: false,
	error: null,
};

export const fetchIngredients = createAsyncThunk<
	TIngredient[],
	void,
	{ rejectValue: string }
>('ingredients/fetchIngredients', async (_, { rejectWithValue }) => {
	try {
		const data = await request<IngredientsResponse>('/ingredients');
		return data.data;
	} catch (err: any) {
		return rejectWithValue(err?.message ?? 'Failed to fetch ingredients');
	}
});

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchIngredients.fulfilled,
				(state, action: PayloadAction<TIngredient[]>) => {
					state.loading = false;
					state.items = action.payload;
				}
			)
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error =
					(action.payload as string) ?? action.error.message ?? null;
			});
	},
});

export default ingredientsSlice.reducer;
