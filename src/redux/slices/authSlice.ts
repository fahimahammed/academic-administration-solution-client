/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
	accessToken: string | null;
	user: unknown;
}

const initialState: AuthState = {
	accessToken: null,
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<{ accessToken: string }>) => {
			state.accessToken = action.payload.accessToken;
		},
		defaultState: state => {
			state = initialState;
		},
		userInfo: (state, action: PayloadAction<{ user: unknown }>) => {
			state.user = action.payload;
		},
	},
});

export const { setAuth, defaultState, userInfo } = authSlice.actions;

export default authSlice.reducer;
