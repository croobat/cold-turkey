import { View, ScrollView, SafeAreaView } from 'react-native';
import { Card, Text, useTheme, Avatar, List, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { style } from '@/constants/Styles';

type Motivation = {
	id: number;
	media: 'image' | 'text';
	title: string;
	description: string;
};

type Achievement = {
	id: number;
	icon: string;
	title: string;
	description: string;
};

export default function ProfileScreen() {
	const theme = useTheme();
	const { t } = useTranslation();

	const motivations: Motivation[] = [
		{
			id: 1,
			media: 'image',
			title: t('profile.motivation'),
			description: t('profile.addATextOrImageToRemindYouWhyYouQuit'),
		},
	];

	const achievements: Achievement[] = [
		{
			id: 1,
			icon: 'flag-checkered',
			title: t('achievements.gettingStarted'),
			description: t('achievements.gettingStartedDescription'),
		},
		{
			id: 2,
			icon: 'calendar-today',
			title: t('achievements.firstDay'),
			description: t('achievements.firstDayDescription'),
		},
		{
			id: 3,
			icon: 'progress-clock',
			title: t('achievements.firstWeek'),
			description: t('achievements.firstWeekDescription'),
		},
		{
			id: 4,
			icon: 'calendar-month',
			title: t('achievements.firstMonth'),
			description: t('achievements.firstMonthDescription'),
		},
	];

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

					{motivations.map((item) => (
						<Card key={item.id}>
							<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
							<Card.Title title={item.title} subtitle={item.description} />
						</Card>
					))}
				</View>

				{/* achievements */}
				<View>
					<View style={style.row}>
						<Text variant="titleMedium" style={{ color: theme.colors.primary }}>
							{t('achievements.title')}
						</Text>
						<IconButton icon="chevron-right" onPress={() => router.navigate('/profile/achievements')} />
					</View>

					{achievements.map((achievement) => (
						<List.Item
							key={achievement.id}
							title={achievement.title}
							description={achievement.description}
							left={() => <Avatar.Icon icon={achievement.icon} />}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
