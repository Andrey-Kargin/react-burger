import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from './api';

type TUser = {
	email: string;
	name: string;
};

type AuthState = {
	user: TUser | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
};

type AuthResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: TUser;
};

type UserResponse = {
	success: boolean;
	user: TUser;
};

type LogoutResponse = {
	success: boolean;
	message?: string;
};

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	loading: false,
	error: null,
};

export const registerUser = createAsyncThunk<
	TUser,
	{ email: string; password: string; name: string },
	{ rejectValue: string }
>('auth/register', async ({ email, password, name }, { rejectWithValue }) => {
	try {
		const data = await request<AuthResponse>('/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password, name }),
		});
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
		return data.user;
	} catch (e: any) {
		return rejectWithValue(e?.message ?? 'Register error');
	}
});

export const loginUser = createAsyncThunk<
	TUser,
	{ email: string; password: string },
	{ rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
	try {
		const data = await request<AuthResponse>('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
		return data.user;
	} catch (e: any) {
		return rejectWithValue(e?.message ?? 'Login error');
	}
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const refreshToken = localStorage.getItem('refreshToken');
			await request<LogoutResponse>('/auth/logout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token: refreshToken }),
			});
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		} catch (e: any) {
			// Даже если запрос упал — всё равно чистим локалсторадж
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			return rejectWithValue(e?.message ?? 'Logout error');
		}
	}
);

export const fetchUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
	'auth/fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			const data = await request<UserResponse>('/auth/user', {
				headers: {
					Authorization: accessToken ?? '',
					'Content-Type': 'application/json',
				},
			});
			return data.user;
		} catch (e: any) {
			return rejectWithValue(e?.message ?? 'Fetch user error');
		}
	}
);

export const checkAuth = createAsyncThunk<TUser, void, { rejectValue: string }>(
	'auth/checkAuth',
	async (_, { rejectWithValue }) => {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			return rejectWithValue('No token');
		}

		try {
			const data = await request<UserResponse>('/auth/user', {
				headers: {
					Authorization: accessToken,
					'Content-Type': 'application/json',
				},
			});
			return data.user;
		} catch (err: any) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			return rejectWithValue(err?.message ?? 'Auth check failed');
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// register
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				registerUser.fulfilled,
				(state, action: PayloadAction<TUser>) => {
					state.loading = false;
					state.user = action.payload;
					state.isAuthenticated = true;
				}
			)
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error =
					(action.payload as string) ?? action.error.message ?? null;
			})
			// login
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error =
					(action.payload as string) ?? action.error.message ?? null;
			})
			// fetchUser
			.addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.error =
					(action.payload as string) ?? action.error.message ?? null;
			})
			// logout
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.isAuthenticated = false;
			})
			// checkAuth
			.addCase(checkAuth.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(checkAuth.fulfilled, (state, action: PayloadAction<TUser>) => {
				state.loading = false;
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.error =
					(action.payload as string) ?? action.error.message ?? null;
			});
	},
});

export const updateUser = createAsyncThunk<
	TUser,
	{ email?: string; name?: string; password?: string },
	{ rejectValue: string }
>('auth/updateUser', async ({ email, name, password }, { rejectWithValue }) => {
	try {
		const accessToken = localStorage.getItem('accessToken');
		const data = await request<UserResponse>('/auth/user', {
			method: 'PATCH',
			headers: {
				Authorization: accessToken ?? '',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, name, password }),
		});
		return data.user;
	} catch (e: any) {
		return rejectWithValue(e?.message ?? 'Update user error');
	}
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
