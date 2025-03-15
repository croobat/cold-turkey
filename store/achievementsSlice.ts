import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import achievementsData from '@/data/achievements.json';
import { Achievement } from '@/index';

export interface AchievementsState {
	achievements: Achievement[];
	completed: string[];
}

const initialState: AchievementsState = {
	achievements: achievementsData,
	completed: [],
};

const achievementsSlice = createSlice({
	name: 'achievements',
	initialState,
	reducers: {
		completeAchievement: (state, action: PayloadAction<string>) => {
			const achievementId = action.payload;

			state.completed.push(achievementId);

			const achievement = state.achievements.find((achievement) => achievement.id === achievementId);

			if (achievement) {
				achievement.completedAt = new Date().toISOString();
			}
		},
		resetAchievementsSlice: () => {
			return initialState;
		},
	},
});

export const { completeAchievement, resetAchievementsSlice } = achievementsSlice.actions;
export const selectAchievements = (state: RootState) => state.achievements.achievements;
export const selectAchievementsIds = (state: RootState) => state.achievements.completed;

export const selectCompletedAchievements = (state: RootState) =>
	state.achievements.achievements.filter((achievement) => state.achievements.completed.includes(achievement.id));

export const selectAchievementsOrderedByCompletionDate = (state: RootState) =>
	state.achievements.achievements.sort((a, b) => {
		if (a.completedAt && b.completedAt) {
			return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
		}
		return 0;
	});
export default achievementsSlice.reducer;
