/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SemesterRegistrationState {
	filterOptions?: Record<string, QueryParamsType>;
	sortBy?: string;
	sortOrder?: string;
	semesterRegistrationId?: string;
}

const initialState: SemesterRegistrationState = {
	filterOptions: {},
	sortBy: '',
	sortOrder: '',
	semesterRegistrationId: '',
};

export const semesterRegistrationSlice = createSlice({
	name: 'semesterRegistration',
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
		setSemesterRegistrationId: (state, action: PayloadAction<string>) => {
			state.semesterRegistrationId = action.payload;
		},
	},
});

export const { setDefault, setFilter, setSort, setSemesterRegistrationId } = semesterRegistrationSlice.actions;

export default semesterRegistrationSlice.reducer;
