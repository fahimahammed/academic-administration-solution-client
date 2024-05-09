/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AcademicDepartmentModalState {
	filterOptions?: Record<string, QueryParamsType>;
	sortBy?: string;
	sortOrder?: string;
}

const initialState: AcademicDepartmentModalState = {
	filterOptions: {},
	sortBy: '',
	sortOrder: '',
};

export const academicDepartmentSlice = createSlice({
	name: 'academicDepartment',
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

export const { setDefault, setFilter, setSort } = academicDepartmentSlice.actions;

export default academicDepartmentSlice.reducer;
