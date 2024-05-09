/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AcademicCoreDepartmentState {
	filterOptions?: Record<string, QueryParamsType>;
	sortBy?: string;
	sortOrder?: string;
	academicDepartmentId?: string;
}

const initialState: AcademicCoreDepartmentState = {
	filterOptions: {},
	sortBy: '',
	sortOrder: '',
	academicDepartmentId: '',
};

export const academicCoreDepartmentSlice = createSlice({
	name: 'academicCoreDepartment',
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
		setAcademicDepartmentId: (state, action: PayloadAction<string>) => {
			state.academicDepartmentId = action.payload;
		},
	},
});

export const { setDefault, setFilter, setSort, setAcademicDepartmentId } = academicCoreDepartmentSlice.actions;

export default academicCoreDepartmentSlice.reducer;
