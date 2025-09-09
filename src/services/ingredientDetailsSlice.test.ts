import reducer, {
	openIngredient,
	closeIngredient,
} from './ingredientDetailsSlice';

const ing = {
	_id: '1',
	name: 'Тест',
	type: 'main',
	price: 1,
	image_mobile: '',
};

describe('ingredientDetailsSlice', () => {
	it('initial', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual({ item: null });
	});

	it('openIngredient', () => {
		const state = reducer(undefined, openIngredient(ing as any));
		expect(state.item?._id).toBe('1');
	});

	it('closeIngredient', () => {
		let state = reducer(undefined, openIngredient(ing as any));
		state = reducer(state, closeIngredient());
		expect(state.item).toBeNull();
	});
});
