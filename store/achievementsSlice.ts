import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { archivementList } from '@/constants/achievements';
type Archivement = {
	title: string;
	content: string;
	icon: string;
	iconColor: string;
	date: string | null;
};

export interface AchievementsState {
	achievements: Archivement[];
}

const initialState: AchievementsState = {
	achievements: archivementList,
};

const achievementsSlice = createSlice({
	name: 'achievements',
	initialState,
	reducers: {
		addArchivement: (state: AchievementsState, action: PayloadAction<Archivement>) => {
			state.achievements.push(action.payload);
		},
		resetAchievementsSlice: () => {
			return initialState;
		},
	},
});

export const { addArchivement, resetAchievementsSlice } = achievementsSlice.actions;
export const selectAchievements = (state: RootState) => state.achievements.achievements;
export default achievementsSlice.reducer;
