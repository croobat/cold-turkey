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
import { selectAchievementsOrderedByCompletionDate } from '@/store/achievementsSlice';
import { Motivation, Achievement } from '@/index';

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

	const achievements: Achievement[] = useAppSelector(selectAchievementsOrderedByCompletionDate);
	const firstThreeAchievements = achievements.slice(0, 3);

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

					{firstThreeAchievements &&
						firstThreeAchievements.length > 0 &&
						firstThreeAchievements.map((achievement, index) => (
							<List.Item
								key={index}
								title={achievement.title}
								description={achievement.content}
								left={() => (
									<Avatar.Icon
										icon={achievement.icon}
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
