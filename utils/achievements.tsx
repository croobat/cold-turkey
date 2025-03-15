import { useEffect } from 'react';
import { intervalToDuration, parseISO } from 'date-fns';

import { store, useAppSelector } from '@/store';
import { completeAchievement, selectCompletedAchievements } from '@/store/achievementsSlice';
import { selectLastRelapse, selectRelapses } from '@/store/logsSlice';
import { selectPricePerCigarette } from '@/store/settingsSlice';
import { selectCigarettesPerDay } from '@/store/settingsSlice';

import ACHIEVEMENTS_DATA from '@/data/achievements.json';

export function useAchievements() {
	const completedAchievements = useAppSelector(selectCompletedAchievements);
	const pricePerCigarette = useAppSelector(selectPricePerCigarette);
	const relapses = useAppSelector(selectRelapses);
	const lastRelapse = useAppSelector(selectLastRelapse);
	const cigaretesPerDay = useAppSelector(selectCigarettesPerDay);

	const isoString = lastRelapse?.datetime || new Date().toISOString();
	const quitDate = parseISO(isoString);
	const duration = intervalToDuration({ start: quitDate, end: new Date() });
	const { days: daysSaved = 0, hours: hoursSaved = 0 } = duration;

	const cigarettesSaved = Math.round((daysSaved + hoursSaved / 24) * cigaretesPerDay);
	const moneySaved = cigarettesSaved * pricePerCigarette;
	const relapseCount = relapses.length;

	const handleCompletion = (achievementId: string) => {
		const isCompleted = completedAchievements.find((achievement) => achievement.id === achievementId);
		if (!isCompleted) store.dispatch(completeAchievement(achievementId));
	};

	useEffect(() => {
		if (!completedAchievements) return;

		const progressValues = {
			relapseCount,
			daysSaved,
			moneySaved,
			cigarettesSaved,
		};

		ACHIEVEMENTS_DATA.forEach((achievement) => {
			const { id, criteria } = achievement;
			if (!criteria) return;

			const currentValue = progressValues[criteria.type as keyof typeof progressValues];
			if (currentValue >= criteria.value) handleCompletion(id);
		});
	}, [completedAchievements, daysSaved, moneySaved, cigarettesSaved, relapseCount]);
}
