/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface BuildingState {
	buildingId?: string;
	sortBy?: string;
	sortOrder?: string;
}

const initialState: BuildingState = {
	buildingId: '',
	sortBy: '',
	sortOrder: '',
};

export const buildingSlice = createSlice({
	name: 'building',
	initialState,
	reducers: {
		setSort: (state, action: PayloadAction<{ sortBy: string; sortOrder: string }>) => {
			state.sortBy = action.payload.sortBy;
			state.sortOrder = action.payload.sortOrder;
		},
		setDefault: state => (state = initialState),
		setBuildingId: (state, action: PayloadAction<string>) => {
			state.buildingId = action.payload;
		},
	},
});

export const { setDefault, setSort, setBuildingId } = buildingSlice.actions;

export default buildingSlice.reducer;
