import { View, ScrollView, SafeAreaView } from 'react-native';
import { Card, Text, useTheme, Avatar, List, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { style } from '@/constants/Styles';
import { useSelector } from 'react-redux';
import { selectMotivations } from '@/store/motivationsSlice';
import { useAppSelector } from '@/store';
import { selectCompletedAchievementsOrderedByCompletionDate } from '@/store/achievementsSlice';
import { Motivation } from '@/index';
import achievementsData from '@/data/achievements.json';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
export default function ProfileScreen() {
	const theme = useTheme();
	const [randomMotivation, setRandomMotivation] = useState<Motivation>();
	const motivations = useSelector(selectMotivations);

	useFocusEffect(
		useCallback(() => {
			if (motivations.length > 0) {
				const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
				setRandomMotivation(randomMotivation);
			}
		}, [motivations]),
	);

	const { t } = useTranslation();

	const completedAchievements = useAppSelector(selectCompletedAchievementsOrderedByCompletionDate);
	const firstThreeAchievements = completedAchievements.slice(0, 3);
	const achievements = firstThreeAchievements.map((achievement) => {
		const achievementData = achievementsData.find((achievementData) => achievementData.id === achievement.id);
		return {
			...achievementData,
			completedAt: achievement.completedAt,
		};
	});

	return (
		<SafeAreaView style={style.container}>
			<ScrollView contentContainerStyle={[style.paddingHorizontal, style.rowGap]}>
				{/* motivation */}
				<View>
					<View style={style.row}>
						<Text variant="titleMedium" style={{ color: theme.colors.primary }}>
							{t('profile.motivations')}
						</Text>
						<IconButton icon="chevron-right" onPress={() => router.navigate('/profile/motivations')} />
					</View>
					{motivations.length === 0 && <Text variant="bodyMedium">{t('profile.noMotivationsAdded')}</Text>}
					{motivations.length > 0 && (
						<Card>
							{randomMotivation?.image && <Card.Cover source={{ uri: randomMotivation.image }} />}
							<Card.Title title={randomMotivation?.title} subtitle={randomMotivation?.content} />
						</Card>
					)}
				</View>

				{/* achievements */}
				<View>
					<View style={style.row}>
						<Text variant="titleMedium" style={{ color: theme.colors.primary }}>
							{t('achievements.title')}
						</Text>
						<IconButton icon="chevron-right" onPress={() => router.navigate('/profile/achievements')} />
					</View>

					{achievements &&
						achievements.length > 0 &&
						achievements.map((achievement, index) => (
							<List.Item
								key={index}
								title={achievement.title}
								description={achievement.content}
								left={() => (
									<Avatar.Icon
										icon={achievement.icon as IconSource}
										size={42}
										style={{
											backgroundColor: achievement.completedAt ? theme.colors.primary : theme.colors.surfaceDisabled,
										}}
									/>
								)}
							/>
						))}
				</View>
				<View style={style.row}>
					<Text variant="titleMedium" style={{ color: theme.colors.primary }}>
						Feedback
					</Text>
					<IconButton icon="chevron-right" onPress={() => console.info('Pressed')} />
				</View>
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
