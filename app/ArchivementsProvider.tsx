import React, { useEffect } from 'react';
import { completeAchievement, selectAchievementsIds } from '@/store/achievementsSlice';
import { store, useAppSelector } from '@/store';
import { selectMotivations } from '@/store/motivationsSlice';
import { selectLastRelapse, selectRelapses } from '@/store/logsSlice';
import { intervalToDuration, parseISO } from 'date-fns';
import { selectPricePerCigarette } from '@/store/settingsSlice';
import { selectCigarettesPerDay } from '@/store/settingsSlice';
export default function ArchivementsProvider({ children }: { children: React.ReactNode }) {
	const motivations = useAppSelector(selectMotivations);
	const completedAchievementsIds = useAppSelector(selectAchievementsIds);
	const cigaretesPerDay = useAppSelector(selectCigarettesPerDay);
	const pricePerCigarette = useAppSelector(selectPricePerCigarette);
	const relapses = useAppSelector(selectRelapses);
	const lastRelapse = useAppSelector(selectLastRelapse);
	const isoString = lastRelapse?.datetime || new Date().toISOString();
	const quitDate = parseISO(isoString);
	const duration = intervalToDuration({ start: quitDate, end: new Date() });
	const daysSinceQuit = duration.days ?? 0;
	const hoursSinceQuit = duration.hours ?? 0;
	const cigarettesNotSmoked = Math.round((daysSinceQuit + hoursSinceQuit / 24) * cigaretesPerDay);
	const moneySaved = cigarettesNotSmoked * pricePerCigarette;

	useEffect(() => {
		console.log(relapses);
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

	return <>{children}</>;
}
