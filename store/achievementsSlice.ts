import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
type Archivement = {
	title: string;
	content: string;
	icon: string;
	iconColor: string;
	date: string | null;
};

export interface AchievementsState {
	completed: Archivement[];
}

const initialState: AchievementsState = {
	completed: [],
};

const achievementsSlice = createSlice({
	name: 'achievements',
	initialState,
	reducers: {
		addArchivement: (state: AchievementsState, action: PayloadAction<Archivement>) => {
			state.completed.push(action.payload);
		},
		resetAchievementsSlice: () => {
			return initialState;
		},
	},
});

export const { addArchivement, resetAchievementsSlice } = achievementsSlice.actions;
export const selectAchievements = (state: RootState) => state.achievements.completed;
export default achievementsSlice.reducer;
