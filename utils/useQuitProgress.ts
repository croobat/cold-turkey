import { useState } from 'react';
import { intervalToDuration, parseISO, format } from 'date-fns';
import { useAppSelector } from '@/store';
import { selectLastRelapse } from '@/store/logsSlice';
import { selectCigarettesPerDay, selectPricePerCigarette } from '@/store/settingsSlice';

export interface QuitProgress {
	daysSaved: number;
	hoursSaved: number;
	minutesSaved: number;
	cigarettesSaved: number;
	moneySaved: number;
	dateSinceQuit: string;
	timeSinceQuit: string;
}

export function useQuitProgress(): QuitProgress {
	const [currentTime] = useState(new Date());
	const lastRelapse = useAppSelector(selectLastRelapse);
	const cigarettesPerDay = useAppSelector(selectCigarettesPerDay);
	const pricePerCigarette = useAppSelector(selectPricePerCigarette);

	const isoString = lastRelapse?.datetime || new Date().toISOString();
	const quitDate = parseISO(isoString);

	const duration = intervalToDuration({ start: quitDate, end: currentTime });
	const daysSaved = duration.days ?? 0;
	const hoursSaved = duration.hours ?? 0;
	const minutesSaved = duration.minutes ?? 0;

	const cigarettesSaved = Math.round((daysSaved + hoursSaved / 24) * cigarettesPerDay);
	const moneySaved = cigarettesSaved * pricePerCigarette;
	const dateSinceQuit = format(quitDate, 'MMMM d, yyyy');
	const timeSinceQuit = format(quitDate, 'p');

	return {
		daysSaved,
		hoursSaved,
		minutesSaved,
		cigarettesSaved,
		moneySaved,
		dateSinceQuit,
		timeSinceQuit,
	};
}
