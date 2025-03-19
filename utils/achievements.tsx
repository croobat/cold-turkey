import { useEffect } from 'react';
import { store, useAppSelector } from '@/store';
import { completeAchievement, selectCompletedAchievements } from '@/store/achievementsSlice';
import { selectRelapses } from '@/store/logsSlice';
import { useQuitProgress } from '@/utils/useQuitProgress';

import ACHIEVEMENTS_DATA from '@/data/achievements.json';

export function useAchievements() {
	const completedAchievements = useAppSelector(selectCompletedAchievements);
	const relapses = useAppSelector(selectRelapses);

	const { daysSaved, cigarettesSaved, moneySaved } = useQuitProgress();

	const relapseCount = relapses.length;

	const handleCompletion = (achievementId: string) => {
		const isCompleted = completedAchievements.find((achievement) => achievement.id === achievementId);
		if (!isCompleted) store.dispatch(completeAchievement(achievementId));
	};

	useEffect(() => {
		if (!completedAchievements) return;

		const progressValues = { relapseCount, daysSaved, moneySaved, cigarettesSaved };

		ACHIEVEMENTS_DATA.forEach((achievement) => {
			const { id, criteria } = achievement;
			if (!criteria) return;

			const currentValue = progressValues[criteria.type as keyof typeof progressValues];
			if (currentValue >= criteria.value) handleCompletion(id);
		});
	}, [completedAchievements, daysSaved, moneySaved, cigarettesSaved, relapseCount]);
}
