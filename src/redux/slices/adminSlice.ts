/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface adminState {
	filterOptions: Record<string, QueryParamsType>;
	sortBy?: string;
	sortOrder?: string;
}

const initialState: adminState = {
	filterOptions: {},
	sortBy: '',
	sortOrder: '',
};

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
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

export const { setFilter, setDefault, setSort } = adminSlice.actions;

export default adminSlice.reducer;
