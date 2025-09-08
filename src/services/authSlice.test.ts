import reducer, {
	registerUser,
	loginUser,
	logoutUser,
	fetchUser,
	checkAuth,
	resetError,
} from './authSlice';

const user = { email: 'a@b.c', name: 'Tester' };

describe('authSlice', () => {
	it('initial', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual({
			user: null,
			isAuthenticated: false,
			loading: false,
			error: null,
		});
	});

	it('resetError', () => {
		const s = reducer(
			{ user: null, isAuthenticated: false, loading: false, error: 'x' },
			resetError()
		);
		expect(s.error).toBeNull();
	});

	it('register fulfilled', () => {
		const s = reducer(undefined, {
			type: registerUser.fulfilled.type,
			payload: user,
		});
		expect(s.user).toEqual(user);
		expect(s.isAuthenticated).toBe(true);
	});

	it('register rejected', () => {
		const s = reducer(undefined, {
			type: registerUser.rejected.type,
			payload: 'bad',
			error: { message: 'bad' },
		});
		expect(s.error).toBe('bad');
	});

	it('login fulfilled', () => {
		const s = reducer(undefined, {
			type: loginUser.fulfilled.type,
			payload: user,
		});
		expect(s.user).toEqual(user);
		expect(s.isAuthenticated).toBe(true);
	});

	it('fetchUser fulfilled', () => {
		const s = reducer(undefined, {
			type: fetchUser.fulfilled.type,
			payload: user,
		});
		expect(s.user).toEqual(user);
		expect(s.isAuthenticated).toBe(true);
	});

	it('logout fulfilled', () => {
		const init = { user, isAuthenticated: true, loading: false, error: null };
		const s = reducer(init as any, { type: logoutUser.fulfilled.type });
		expect(s.user).toBeNull();
		expect(s.isAuthenticated).toBe(false);
	});

	it('checkAuth pending/fulfilled', () => {
		let s = reducer(undefined, { type: checkAuth.pending.type });
		expect(s.loading).toBe(true);
		s = reducer(s, { type: checkAuth.fulfilled.type, payload: user });
		expect(s.loading).toBe(false);
		expect(s.user).toEqual(user);
		expect(s.isAuthenticated).toBe(true);
	});

	it('checkAuth rejected', () => {
		let s = reducer(undefined, { type: checkAuth.pending.type });
		s = reducer(s, {
			type: checkAuth.rejected.type,
			payload: 'nope',
			error: { message: 'nope' },
		});
		expect(s.loading).toBe(false);
		expect(s.user).toBeNull();
		expect(s.isAuthenticated).toBe(false);
		expect(s.error).toBe('nope');
	});
});
