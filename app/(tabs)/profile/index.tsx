import { View, ScrollView, SafeAreaView } from 'react-native';
import { Card, Text, useTheme, Avatar, List, IconButton } from 'react-native-paper';
import { router } from 'expo-router';

import { style } from '@/constants/Styles';

export default function ProfileScreen() {
	const theme = useTheme();

	const motivations = [
		{
			id: 1,
			media: 'image',
			title: 'Motivation',
			description: 'Add a text, image or video to remind you why you want to quit',
		},
	];

	const achievements = [
		{
			id: 1,
			title: 'Getting started',
			subtitle: 'Quit Smoking for the first time',
			icon: 'smoking-off',
		},
		{
			id: 2,
			title: 'Getting started',
			subtitle: 'Quit Smoking for the first time',
			icon: 'smoking-off',
		},
	];

	return (
		<SafeAreaView style={style.container}>
			<ScrollView contentContainerStyle={[style.paddingHorizontal, style.rowGap]}>
				{/* motivation */}
				<View>
					<View style={style.row}>
						<Text variant="titleMedium" style={{ color: theme.colors.primary }}>
							Motivations
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
							Achievements
						</Text>
						<IconButton icon="chevron-right" onPress={() => router.navigate('/profile/achievements')} />
					</View>

					{achievements.map((achievement) => (
						<List.Item
							key={achievement.id}
							title={achievement.title}
							description={achievement.subtitle}
							left={() => <Avatar.Icon icon={achievement.icon} />}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
