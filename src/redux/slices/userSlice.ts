/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UserState {
	userId: string | undefined | null;
	filterOptions: Record<string, QueryParamsType>;
	sortBy: string;
	sortOrder: string;
}

const initialState: UserState = {
	userId: '',
	filterOptions: {},
	sortBy: '',
	sortOrder: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserId: (state, action: PayloadAction<string>) => {
			state.userId = action.payload;
		},
		setFilter: (state, action: PayloadAction<Record<string, QueryParamsType>>) => {
			state.filterOptions = action.payload;
		},
		setSort: (state, action: PayloadAction<{ sortBy: string; sortOrder: string }>) => {
			state.sortBy = action.payload.sortBy;
			state.sortOrder = action.payload.sortOrder;
		},
		setDefault: state => (state = initialState),
	},
});

export const { setUserId, setDefault, setFilter, setSort } = userSlice.actions;

export default userSlice.reducer;
