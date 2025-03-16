import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme, Avatar, List, Icon } from 'react-native-paper';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { style } from '@/constants/Styles';
import { useSelector } from 'react-redux';
import { selectMotivations } from '@/store/motivationsSlice';
import { useAppSelector } from '@/store';
import { selectCompletedAchievementsOrderedByCompletionDate } from '@/store/achievementsSlice';
import { Motivation, Achievement } from '@/types';
import { METRICS } from '@/constants/Metrics';

import ACHIEVEMENTS_DATA from '@/data/achievements.json';

type CompletedAchievement = Achievement & {
	completedAt: string | null;
};

const TitleRow = ({ title, onPress }: { title: string; onPress: () => void }) => {
	const theme = useTheme();

	return (
		<TouchableOpacity onPress={onPress} style={[style.row, style.paddingVertical]}>
			<Text variant="titleMedium" style={{ color: theme.colors.primary }}>
				{title}
			</Text>
			<Icon source="chevron-right" color={theme.colors.primary} size={METRICS.icon} />
		</TouchableOpacity>
	);
};

export default function ProfileScreen() {
	const { t, i18n } = useTranslation();
	const theme = useTheme();

	const motivations = useSelector(selectMotivations);

	const [randomMotivation, setRandomMotivation] = useState<Motivation>();
	const completedAchievements = useAppSelector(selectCompletedAchievementsOrderedByCompletionDate);
	const firstThreeAchievements = completedAchievements.slice(0, 3);
	const currentLanguage = i18n.language as 'en' | 'es';

	useFocusEffect(
		useCallback(() => {
			if (motivations.length > 0) {
				const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
				setRandomMotivation(randomMotivation);
			}
		}, [motivations]),
	);

	const achievements = firstThreeAchievements
		.map((achievement) => {
			const achievementData = ACHIEVEMENTS_DATA.find((achievementData) => achievementData.id === achievement.id);
			if (!achievementData) return null;
			return {
				...achievementData,
				completedAt: achievement.completedAt,
			} as CompletedAchievement;
		})
		.filter((achievement): achievement is CompletedAchievement => achievement !== null);

	return (
		<SafeAreaView style={style.container}>
			<ScrollView contentContainerStyle={[style.paddingHorizontal, style.rowGap]}>
				{/* motivation */}
				<View>
					<TitleRow title={t('profile.motivations')} onPress={() => router.navigate('/profile/motivations')} />
					{motivations.length === 0 && <Text variant="bodyMedium">{t('profile.noMotivationsAdded')}</Text>}
					{motivations.length > 0 && (
						<Card>
							{randomMotivation?.image && (
								<Card.Cover style={style.cardCover} source={{ uri: randomMotivation.image }} />
							)}
							<Card.Title title={randomMotivation?.title} subtitle={randomMotivation?.content} />
						</Card>
					)}
				</View>

				{/* achievements */}
				<View>
					<TitleRow title={t('achievements.title')} onPress={() => router.navigate('/profile/achievements')} />

					{achievements &&
						achievements.length > 0 &&
						achievements.map((achievement, index) => (
							<List.Item
								key={index}
								title={achievement[currentLanguage].title}
								description={achievement[currentLanguage].content}
								left={() => (
									<Avatar.Icon
										icon={achievement.icon as any}
										size={42}
										style={{
											backgroundColor: achievement.completedAt ? theme.colors.primary : theme.colors.surfaceDisabled,
										}}
									/>
								)}
							/>
						))}
				</View>

				<TitleRow title={t('profile.feedback')} onPress={() => console.info('feedback')} />

				<View>
					<Text variant="titleMedium" style={{ color: theme.colors.primary }}>
						Donations
					</Text>
					<Text variant="bodyMedium">Support the development of this app.</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
