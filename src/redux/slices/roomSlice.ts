/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface RoomState {
	filterOptions: Record<string, QueryParamsType>;
	sortBy?: string;
	sortOrder?: string;
}

const initialState: RoomState = {
	filterOptions: {},
	sortBy: '',
	sortOrder: '',
};

export const roomSlice = createSlice({
	name: 'room',
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

export const { setFilter, setDefault, setSort } = roomSlice.actions;

export default roomSlice.reducer;
