import { useEffect } from 'react';
import { intervalToDuration, parseISO } from 'date-fns';

import { store, useAppSelector } from '@/store';
import { completeAchievement, selectCompletedAchievements } from '@/store/achievementsSlice';
import { selectLastRelapse, selectRelapses } from '@/store/logsSlice';
import { selectPricePerCigarette } from '@/store/settingsSlice';
import { selectCigarettesPerDay } from '@/store/settingsSlice';

export function useAchievements() {
	const completedAchievements = useAppSelector(selectCompletedAchievements);

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

	const handleCompletion = (achievementId: string) => {
		const isCompleted = completedAchievements.find((achievement) => achievement.id === achievementId);
		if (!isCompleted) store.dispatch(completeAchievement(achievementId));
	}

	useEffect(() => {
		if (!completedAchievements) return;
		if (relapses.length >= 1) {
			handleCompletion('gettingStarted');
		}
	}, [relapses, completedAchievements]);

	// TODO: Dynamic handle all existing achievements completion
	useEffect(() => {
		if (!completedAchievements) return;
		switch (true) {
			case daysSinceQuit >= 365:
				handleCompletion('oneYearStreak');
				break;
			case daysSinceQuit >= 100:
				handleCompletion('hundredDays');
				break;
			case daysSinceQuit >= 30:
				handleCompletion('oneMonthStreak');
				break;
			case daysSinceQuit >= 7:
				handleCompletion('oneWeekStreak');
				break;
			case daysSinceQuit >= 3:
				handleCompletion('threeDayStreak');
				break;
			case daysSinceQuit >= 1:
				handleCompletion('oneDayStreak');
				break;
		}
	}, [daysSinceQuit, completedAchievements]);

	useEffect(() => {
		if (!completedAchievements) return;
		switch (true) {
			case moneySaved >= 100:
				handleCompletion('oneHundredCash');
				break;
			case moneySaved >= 500:
				handleCompletion('fiveHundredCash');
				break;
			case moneySaved >= 1000:
				handleCompletion('thousandCash');
				break;
			default:
				break;
		}
	}, [moneySaved, completedAchievements]);

	useEffect(() => {
		if (!completedAchievements) return;
		switch (true) {
			case cigarettesNotSmoked >= 10000:
				handleCompletion('tenThousandCigarettes');
				break;
			case cigarettesNotSmoked >= 1000:
				handleCompletion('thousandCigarettes');
				break;
			case cigarettesNotSmoked >= 100:
				handleCompletion('hundredCigarettes');
				break;
			case cigarettesNotSmoked >= 20:
				handleCompletion('twentyCigarettes');
				break;
		}
	}, [cigarettesNotSmoked, completedAchievements]);
}
