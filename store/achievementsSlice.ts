import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type Achievement = {
	id: string;
	title: string;
	content: string;
	icon: string;
	completedAt?: string;
};

export interface AchievementsState {
	achievements: Achievement[];
	completed_ids: string[];
}

const initialState: AchievementsState = {
	achievements: require('@/data/achievements.json'),
	completed_ids: [],
};

const achievementsSlice = createSlice({
	name: 'achievements',
	initialState,
	reducers: {
		completeAchievement: (state, action: PayloadAction<string>) => {
			const achievementId = action.payload;
			state.completed_ids.push(achievementId);
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
export const selectAchievementsIds = (state: RootState) => state.achievements.completed_ids;
export const selectCompletedAchievements = (state: RootState) =>
	state.achievements.achievements.filter((achievement) => state.achievements.completed_ids.includes(achievement.id));
export default achievementsSlice.reducer;
