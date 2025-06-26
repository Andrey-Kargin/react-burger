import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from './api';

const initialState = {
	user: null,
	isAuthenticated: false,
	loading: false,
	error: null,
};

export const registerUser = createAsyncThunk(
	'auth/register',
	async ({ email, password, name }) => {
		const data = await request('/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password, name }),
		});
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
		return data.user;
	}
);

export const loginUser = createAsyncThunk(
	'auth/login',
	async ({ email, password }) => {
		const data = await request('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
		return data.user;
	}
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
	const refreshToken = localStorage.getItem('refreshToken');
	await request('/auth/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token: refreshToken }),
	});
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
	const accessToken = localStorage.getItem('accessToken');
	const data = await request('/auth/user', {
		headers: {
			Authorization: accessToken,
			'Content-Type': 'application/json',
		},
	});
	return data.user;
});

export const checkAuth = createAsyncThunk(
	'auth/checkAuth',
	async (_, { dispatch, rejectWithValue }) => {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			return rejectWithValue('No token');
		}

		try {
			const data = await request('/auth/user', {
				headers: {
					Authorization: accessToken,
					'Content-Type': 'application/json',
				},
			});

			return data.user;
		} catch (err) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			return rejectWithValue(err.message);
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
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.isAuthenticated = false;
			})
			.addCase(checkAuth.pending, (state) => {
				state.loading = true;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(checkAuth.rejected, (state) => {
				state.loading = false;
				state.user = null;
				state.isAuthenticated = false;
			});
	},
});

export const updateUser = createAsyncThunk(
	'auth/updateUser',
	async ({ email, name, password }) => {
		const accessToken = localStorage.getItem('accessToken');
		const res = await request('/auth/user', {
			method: 'PATCH',
			headers: {
				Authorization: accessToken,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, name, password }),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data.user;
	}
);

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
