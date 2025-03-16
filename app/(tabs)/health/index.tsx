import { useState } from 'react';
import { View, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import { Text, ProgressBar, Card, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { differenceInMilliseconds, parseISO } from 'date-fns';

import { useAppSelector } from '@/store';
import { selectLastRelapse } from '@/store/logsSlice';

import { style } from '@/constants/Styles';

import HEALTH_DATA from '@/data/health-milestones.json';
import type { TimeMeasure } from '@/types';

type Milestone = {
	title: string;
	description: string;
	timeAmount: number;
	timeMeasure: TimeMeasure;
};

const timeUnitToMs = {
	minutes: 60 * 1000,
	hours: 60 * 60 * 1000,
	days: 24 * 60 * 60 * 1000,
	weeks: 7 * 24 * 60 * 60 * 1000,
	months: 30 * 24 * 60 * 60 * 1000,
	years: 365 * 24 * 60 * 60 * 1000,
};

export default function HealthScreen() {
	const { t, i18n } = useTranslation();
	const theme = useTheme();

	const lastRelapse = useAppSelector(selectLastRelapse);

	const [refreshing, setRefreshing] = useState(false);

	const calculateProgress = (timeAmount: number, timeMeasure: TimeMeasure) => {
		if (!lastRelapse || !lastRelapse.datetime) return 0;

		const relapseDate = parseISO(lastRelapse.datetime);
		const currentTime = new Date();
		const timeDifference = differenceInMilliseconds(currentTime, relapseDate);
		const timeMeasureInMs = timeUnitToMs[timeMeasure] || timeUnitToMs.minutes;

		const rawProgress = timeDifference >= 0 ? Math.min(timeDifference / (timeAmount * timeMeasureInMs), 1) : 0;
		// Round to 2 decimal places to avoid floating point precision issues
		return Math.floor(rawProgress * 100) / 100;
	};

	const renderItem = ({ item }: { item: Milestone }) => {
		const { title, description, timeAmount, timeMeasure } = item;
		const progress = calculateProgress(timeAmount, timeMeasure);

		const isCompleted = progress === 1;
		return (
			<Card style={style.marginBottom}>
				<Card.Title title={title} />
				<Card.Content style={style.smRowGap}>
					<Text style={style.smMarginBottom}>{description}</Text>
					<ProgressBar animatedValue={progress} color={isCompleted ? undefined : theme.colors.tertiary} />
					<View style={style.row}>
						<Text>
							{item.timeAmount} {t(`common.${item.timeMeasure}`).toLowerCase()}
						</Text>
						<Text>
							{isCompleted
								? t('health.congratulationsYouDidIt')
								: `${Math.round(progress * 100)}% ${t('common.completed')}`}
						</Text>
					</View>
				</Card.Content>
			</Card>
		);
	};

	// refresh ui
	const handleRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 1000);
	};

	const milestones = Object.keys(HEALTH_DATA).map((key) => {
		// @ts-ignore
		const milestone = HEALTH_DATA[key];
		const languageData = milestone[i18n.language] || milestone.en;

		return {
			title: languageData.title,
			description: languageData.description,
			timeAmount: milestone.timeAmount,
			timeMeasure: milestone.timeMeasure,
		};
	});

	return (
		<SafeAreaView style={style.container}>
			<FlatList
				onRefresh={handleRefresh}
				refreshing={refreshing}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
				contentContainerStyle={style.paddingHorizontal}
				data={milestones}
				renderItem={renderItem}
				keyExtractor={(item: Milestone, index: number) => index.toString()}
			/>
		</SafeAreaView>
	);
}
