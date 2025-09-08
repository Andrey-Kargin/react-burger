import reducer, {
	fetchOrderByNumber,
	clearOrderInfo,
	setOrderInfo,
} from './orderInfoSlice';
import type { TOrder } from '../utils/types';

const order: TOrder = {
	_id: 'o1',
	number: 777,
	name: 'Тестовый заказ',
	status: 'done',
	ingredients: ['i1', 'i2'],
	createdAt: '2024-01-01T00:00:00.000Z',
	updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('orderInfoSlice', () => {
	it('initial', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual({
			order: null,
			loading: false,
			error: null,
		});
	});

	it('clearOrderInfo', () => {
		const dirty = { order, loading: true, error: 'x' };
		expect(reducer(dirty as any, clearOrderInfo())).toEqual({
			order: null,
			loading: false,
			error: null,
		});
	});

	it('setOrderInfo', () => {
		const s = reducer(undefined, setOrderInfo(order));
		expect(s.order).toEqual(order);
		const s2 = reducer(s, setOrderInfo(null));
		expect(s2.order).toBeNull();
	});

	it('pending', () => {
		const s = reducer(undefined, { type: fetchOrderByNumber.pending.type });
		expect(s.loading).toBe(true);
		expect(s.error).toBeNull();
	});

	it('fulfilled', () => {
		const s = reducer(undefined, {
			type: fetchOrderByNumber.fulfilled.type,
			payload: order,
		});
		expect(s.loading).toBe(false);
		expect(s.order).toEqual(order);
	});

	it('rejected', () => {
		const s = reducer(undefined, {
			type: fetchOrderByNumber.rejected.type,
			error: { message: 'Заказ не найден' },
		});
		expect(s.loading).toBe(false);
		expect(s.error).toBe('Заказ не найден');
	});
});
