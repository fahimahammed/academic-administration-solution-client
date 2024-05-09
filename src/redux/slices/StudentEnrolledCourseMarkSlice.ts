/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface StudentEnrolledCourseMarkState {
	filterOptions: Record<string, QueryParamsType>;
	sortBy?: string;
	sortOrder?: string;
	academicSemesterId?: string;
	studentId?: string;
	studentEnrolledCourseId?: string;
}

const initialState: StudentEnrolledCourseMarkState = {
	filterOptions: {},
	sortBy: '',
	sortOrder: '',
	academicSemesterId: '',
	studentId: '',
	studentEnrolledCourseId: '',
};

export const studentEnrolledCourseMarkSlice = createSlice({
	name: 'studentEnrolledCourseMark',
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

export const { setFilter, setDefault, setSort } = studentEnrolledCourseMarkSlice.actions;

export default studentEnrolledCourseMarkSlice.reducer;
