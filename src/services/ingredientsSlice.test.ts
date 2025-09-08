import reducer, { fetchIngredients } from './ingredientsSlice';

const payload = [
	{ _id: 'i1', name: 'Булка', type: 'bun', price: 1, image_mobile: '' },
	{ _id: 'i2', name: 'Соус', type: 'sauce', price: 2, image_mobile: '' },
] as any[];

describe('ingredientsSlice', () => {
	it('initial', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual({
			items: [],
			loading: false,
			error: null,
		});
	});

	it('pending', () => {
		const state = reducer(undefined, { type: fetchIngredients.pending.type });
		expect(state.loading).toBe(true);
		expect(state.error).toBeNull();
	});

	it('fulfilled', () => {
		const state = reducer(undefined, {
			type: fetchIngredients.fulfilled.type,
			payload,
		});
		expect(state.loading).toBe(false);
		expect(state.items).toHaveLength(2);
	});

	it('rejected', () => {
		const state = reducer(undefined, {
			type: fetchIngredients.rejected.type,
			payload: 'err',
			error: { message: 'E' },
		});
		expect(state.loading).toBe(false);
		expect(state.error).toBe('err');
	});
});
