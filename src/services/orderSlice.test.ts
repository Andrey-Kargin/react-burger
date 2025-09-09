import reducer, { sendOrder, clearOrder } from './orderSlice';

describe('orderSlice', () => {
	it('initial', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual({
			number: null,
			isLoading: false,
			error: null,
			isModalOpen: false,
		});
	});

	it('pending', () => {
		const state = reducer(undefined, { type: sendOrder.pending.type });
		expect(state.isLoading).toBe(true);
		expect(state.isModalOpen).toBe(false);
	});

	it('fulfilled', () => {
		const state = reducer(undefined, {
			type: sendOrder.fulfilled.type,
			payload: 777,
		});
		expect(state.isLoading).toBe(false);
		expect(state.number).toBe(777);
		expect(state.isModalOpen).toBe(true);
	});

	it('rejected', () => {
		const state = reducer(undefined, {
			type: sendOrder.rejected.type,
			payload: 'oops',
			error: { message: 'oops' },
		});
		expect(state.isLoading).toBe(false);
		expect(state.number).toBeNull();
		expect(state.error).toBe('oops');
		expect(state.isModalOpen).toBe(false);
	});

	it('clearOrder', () => {
		const dirty = { number: 1, isLoading: true, error: 'e', isModalOpen: true };
		expect(reducer(dirty as any, clearOrder())).toEqual({
			number: null,
			isLoading: false,
			error: null,
			isModalOpen: false,
		});
	});
});
