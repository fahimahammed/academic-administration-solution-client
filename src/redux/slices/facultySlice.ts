/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FacultyState {
	filterOptions: Record<string, QueryParamsType>;
	sortBy?: string;
	sortOrder?: string;
	academicSemesterId?: string;
	courseId?: string;
	offeredCourseSectionId?: string;
}

const initialState: FacultyState = {
	filterOptions: {},
	sortBy: '',
	sortOrder: '',
	academicSemesterId: '',
	courseId: '',
	offeredCourseSectionId: '',
};

export const facultySlice = createSlice({
	name: 'faculty',
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
		// setAcademicSemeterId: (state, action: PayloadAction<string>) => {
		// 	state.academicSemesterId = action.payload;
		// },
		// setCourseId: (state, action: PayloadAction<string>) => {
		// 	state.courseId = action.payload;
		// },
		// setOfferedCourseSectionId: (state, action: PayloadAction<string>) => {
		// 	state.offeredCourseSectionId = action.payload;
		// },
	},
});

export const { setFilter, setDefault, setSort } = facultySlice.actions;

export default facultySlice.reducer;
