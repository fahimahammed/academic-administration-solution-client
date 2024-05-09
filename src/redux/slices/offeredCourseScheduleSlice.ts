/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface OfferedCourseScheduleState {
	filterOptions?: Record<string, QueryParamsType>;
	sortBy?: string;
	sortOrder?: string;
}

const initialState: OfferedCourseScheduleState = {
	filterOptions: {},
	sortBy: '',
	sortOrder: '',
};

export const offeredCourseSlice = createSlice({
	name: 'offeredCourseSchedule',
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

export const { setDefault, setFilter, setSort } = offeredCourseSlice.actions;

export default offeredCourseSlice.reducer;
