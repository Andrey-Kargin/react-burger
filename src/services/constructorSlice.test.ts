import reducer, {
	addIngredient,
	removeIngredient,
	moveIngredient,
	clearConstructor,
} from './constructorSlice';
import type { ConstructorState } from './constructorSlice';
import type { TIngredient } from '../utils/types'; // проверьте относительный путь!

const makeIngredient = (overrides: Partial<TIngredient> = {}): TIngredient => ({
	_id: 'ing-1',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://example.com/image.png',
	image_mobile: 'https://example.com/image-mobile.png',
	image_large: 'https://example.com/image-large.png',
	__v: 0,
	...overrides,
});

describe('constructorSlice', () => {
	const initialState: ConstructorState = { bun: null, ingredients: [] };

	it('возвращает initial state', () => {
		expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
	});

	it('addIngredient: кладёт булку в bun', () => {
		const bun = makeIngredient({ type: 'bun', _id: 'bun-1', name: 'Булка' });
		const next = reducer(initialState, addIngredient(bun));
		expect(next.bun?._id).toBe('bun-1');
		expect(next.ingredients.length).toBe(0);
	});

	it('addIngredient: добавляет начинку в список', () => {
		const main = makeIngredient({
			type: 'main',
			_id: 'main-1',
			name: 'Начинка',
			price: 100,
		});
		const next = reducer(initialState, addIngredient(main));
		expect(next.ingredients.length).toBe(1);
		expect(next.ingredients[0]._id).toBe('main-1');
		expect(next.ingredients[0].uid).toBeDefined();
	});

	it('removeIngredient: удаляет по uid', () => {
		const main = makeIngredient({ type: 'main', _id: 'main-1' });
		const s1 = reducer(initialState, addIngredient(main));
		const uid = s1.ingredients[0].uid!;
		const s2 = reducer(s1, removeIngredient(uid));
		expect(s2.ingredients.length).toBe(0);
	});

	it('moveIngredient: меняет порядок', () => {
		const a = makeIngredient({ type: 'main', _id: 'a', name: 'A' });
		const b = makeIngredient({ type: 'main', _id: 'b', name: 'B' });
		const s1 = reducer(
			reducer(initialState, addIngredient(a)),
			addIngredient(b)
		);
		const s2 = reducer(s1, moveIngredient({ fromIndex: 0, toIndex: 1 }));
		expect(s2.ingredients.map((i) => i._id)).toEqual(['b', 'a']);
	});

	it('clearConstructor: очищает всё', () => {
		const bun = makeIngredient({ type: 'bun', _id: 'bun-1' });
		const main = makeIngredient({ type: 'main', _id: 'main-1' });
		const s1 = reducer(initialState, addIngredient(bun));
		const s2 = reducer(s1, addIngredient(main));
		const s3 = reducer(s2, clearConstructor());
		expect(s3).toEqual({ bun: null, ingredients: [] });
	});
});
