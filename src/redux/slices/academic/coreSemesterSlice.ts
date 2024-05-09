/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AcademicCoreSemesterState {
	filterOptions?: Record<string, QueryParamsType>;
	sortBy?: string;
	sortOrder?: string;
}

const initialState: AcademicCoreSemesterState = {
	filterOptions: {},
	sortBy: '',
	sortOrder: '',
};

export const academicCoreSemesterSlice = createSlice({
	name: 'academicCoreSemester',
	initialState,
	reducers: {
		setDefault: state => (state = initialState),
		setFilter: (state, action: PayloadAction<Record<string, QueryParamsType>>) => {
			state.filterOptions = action.payload;
		},
		setSort: (state, action: PayloadAction<{ sortBy: string; sortOrder: string }>) => {
			state.sortBy = action.payload.sortBy;
			state.sortOrder = action.payload.sortOrder;
		},
	},
});

export const { setDefault, setFilter, setSort } = academicCoreSemesterSlice.actions;

export default academicCoreSemesterSlice.reducer;
