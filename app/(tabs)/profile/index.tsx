import { View, ScrollView, SafeAreaView } from 'react-native';
import { Card, Text, useTheme, Avatar, List, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { style } from '@/constants/Styles';
import { useSelector } from 'react-redux';
import { selectMotivations } from '@/store/motivationsSlice';
import { useAppSelector } from '@/store';
import { selectAchievements } from '@/store/achievementsSlice';
import { Achievement } from '@/store/achievementsSlice';

export default function ProfileScreen() {
	const theme = useTheme();
	// const achievements = useSelector(selectAchievements);
	const motivations = useSelector(selectMotivations);

	const { t } = useTranslation();

	const activeAchievements: Achievement[] = useAppSelector(selectAchievements);
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

					{motivations.length > 0 && (
						<Card>
							<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
							<Card.Title title={motivations[0].title} subtitle={motivations[0].content} />
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

					{activeAchievements &&
						activeAchievements.length > 0 &&
						activeAchievements.map((achievement, index) => (
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
					<IconButton icon="chevron-right" onPress={() => console.log('Pressed')} />
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
