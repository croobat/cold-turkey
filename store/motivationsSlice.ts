import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { Motivation } from '@/index';

export interface MotivationsState {
	motivations: Motivation[];
}

const initialState: MotivationsState = {
	motivations: [],
};

const motivationsSlice = createSlice({
	name: 'motivations',
	initialState,
	reducers: {
		addMotivation: (state: MotivationsState, action: PayloadAction<Motivation>) => {
			state.motivations.push(action.payload);
		},
		resetMotivationsSlice: () => {
			return initialState;
		},
	},
});

export const { addMotivation, resetMotivationsSlice } = motivationsSlice.actions;
export const selectMotivations = (state: RootState) => state.motivations.motivations;
export default motivationsSlice.reducer;
