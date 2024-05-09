/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface StudentState {
	filterOptions: Record<string, QueryParamsType>;
	sortBy?: string;
	sortOrder?: string;
}

const initialState: StudentState = {
	filterOptions: {},
	sortBy: '',
	sortOrder: '',
};

export const studentSlice = createSlice({
	name: 'student',
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

export const { setFilter, setDefault, setSort } = studentSlice.actions;

export default studentSlice.reducer;
