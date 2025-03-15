import { useEffect } from 'react';
import { intervalToDuration, parseISO } from 'date-fns';

import { store, useAppSelector } from '@/store';
import { completeAchievement, selectAchievementsIds } from '@/store/achievementsSlice';
import { selectLastRelapse, selectRelapses } from '@/store/logsSlice';
import { selectPricePerCigarette } from '@/store/settingsSlice';
import { selectCigarettesPerDay } from '@/store/settingsSlice';

export function useAchievements() {
	const completedAchievementsIds = useAppSelector(selectAchievementsIds);

	const pricePerCigarette = useAppSelector(selectPricePerCigarette);
	const relapses = useAppSelector(selectRelapses);
	const lastRelapse = useAppSelector(selectLastRelapse);
	const cigaretesPerDay = useAppSelector(selectCigarettesPerDay);

	const isoString = lastRelapse?.datetime || new Date().toISOString();
	const quitDate = parseISO(isoString);
	const duration = intervalToDuration({ start: quitDate, end: new Date() });
	const { days: daysSinceQuit = 0, hours: hoursSinceQuit = 0 } = duration;

	const cigarettesNotSmoked = Math.round((daysSinceQuit + hoursSinceQuit / 24) * cigaretesPerDay);
	const moneySaved = cigarettesNotSmoked * pricePerCigarette;

	useEffect(() => {
		if (!completedAchievementsIds) return;
		if (relapses.length >= 1 && !completedAchievementsIds.includes('gettingStarted')) {
			store.dispatch(completeAchievement('gettingStarted'));
		}
	}, [relapses, completedAchievementsIds]);

	useEffect(() => {
		if (!completedAchievementsIds) return;
		if (daysSinceQuit >= 1 && !completedAchievementsIds.includes('oneDayStreak')) {
			store.dispatch(completeAchievement('oneDayStreak'));
		}
	}, [daysSinceQuit, completedAchievementsIds]);

	useEffect(() => {
		if (!completedAchievementsIds) return;
		if (moneySaved >= 100 && !completedAchievementsIds.includes('oneHundredCash')) {
			store.dispatch(completeAchievement('oneHundredCash'));
		}
	}, [moneySaved, completedAchievementsIds]);
}
