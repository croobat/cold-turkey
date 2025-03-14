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
			state.motivations.push({
				...action.payload,
				id: Date.now(),
			});
		},
		resetMotivationsSlice: () => {
			return initialState;
		},
		deleteMotivation: (state: MotivationsState, action: PayloadAction<number>) => {
			state.motivations = state.motivations.filter((motivation) => motivation.id !== action.payload);
		},
		updateMotivation: (state: MotivationsState, action: PayloadAction<Motivation>) => {
			const index = state.motivations.findIndex((motivation) => motivation.id === action.payload.id);
			if (index !== -1) {
				state.motivations[index] = action.payload;
			}
		},
	},
});

export const { addMotivation, resetMotivationsSlice, deleteMotivation, updateMotivation } = motivationsSlice.actions;
export const selectMotivations = (state: RootState) => state.motivations.motivations;
export const selectMotivationById = (state: RootState, id: number) =>
	state.motivations.motivations.find((motivation) => motivation.id === id);
export default motivationsSlice.reducer;
