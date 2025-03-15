import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import achievementsData from '@/data/achievements.json';

type completedAchievement = {
	id: string;
	completedAt: string;
};

export interface AchievementsState {
	completedAchievements: completedAchievement[];
}

const initialState: AchievementsState = {
	completedAchievements: [],
};

const achievementsSlice = createSlice({
	name: 'achievements',
	initialState,
	reducers: {
		completeAchievement: (state, action: PayloadAction<string>) => {
			const achievementId = action.payload;

			state.completedAchievements.push({
				id: achievementId,
				completedAt: new Date().toISOString(),
			});
		},
		resetAchievementsSlice: () => {
			return initialState;
		},
	},
});

export const { completeAchievement, resetAchievementsSlice } = achievementsSlice.actions;

export const selectCompletedAchievements = (state: RootState) =>
	state.achievements.completedAchievements;

export const selectCompletedAchievementsOrderedByCompletionDate = (state: RootState) =>
	state.achievements.completedAchievements.sort((a, b) => {
		if (a.completedAt && b.completedAt) {
			return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
		}
		return 0;
	});
export default achievementsSlice.reducer;
