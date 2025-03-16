import { useState } from 'react';
import { View, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import { Text, ProgressBar, Card, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { useQuitProgress } from '@/utils/useQuitProgress';
import { style } from '@/constants/Styles';

import HEALTH_DATA from '@/data/health-milestones.json';
import type { TimeMeasure } from '@/types';

type LanguageData = {
	title: string;
	description: string;
};

type MilestoneData = {
	en: LanguageData;
	es: LanguageData;
	timeAmount: number;
	timeMeasure: TimeMeasure;
};

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
	const { daysSaved, hoursSaved, minutesSaved } = useQuitProgress();

	const [refreshing, setRefreshing] = useState(false);

	const calculateProgress = (timeAmount: number, timeMeasure: TimeMeasure) => {
		const totalMinutes = daysSaved * 24 * 60 + hoursSaved * 60 + minutesSaved;
		const targetMinutes = timeAmount * (timeUnitToMs[timeMeasure] / (60 * 1000));
		const rawProgress = totalMinutes >= 0 ? Math.min(totalMinutes / targetMinutes, 1) : 0;
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

	const handleRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 1000);
	};

	const milestones: Milestone[] = Object.entries(HEALTH_DATA as Record<string, MilestoneData>).map(([_, milestone]) => {
		const language = i18n.language as keyof Pick<MilestoneData, 'en' | 'es'>;
		const languageData = milestone[language] || milestone.en;
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
				data={milestones}
				renderItem={renderItem}
				keyExtractor={(item) => item.title}
				contentContainerStyle={style.paddingHorizontal}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={theme.colors.primary} />
				}
			/>
		</SafeAreaView>
	);
}
