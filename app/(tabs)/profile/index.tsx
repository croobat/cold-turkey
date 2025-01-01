import { View, ScrollView, SafeAreaView } from 'react-native';
import { Button, Card, Text, useTheme, Avatar } from 'react-native-paper';

import { style } from '@/constants/Styles';

export default function ProfileScreen() {
	const theme = useTheme();

	const motivation = [
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
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={[style.paddingHorizontal, style.lgRowGap]}>
				{/* motivation */}
				<View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<Text variant="titleMedium" style={{ color: theme.colors.primary }}>
							Motivation
						</Text>
						<Button mode="text" contentStyle={{ flexDirection: 'row-reverse' }} icon="chevron-right" onPress={() => {}}>
							View all
						</Button>
					</View>
					{motivation.map((item) => (
						<Card key={item.id}>
							<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
							<Card.Title title={item.title} subtitle={item.description} />
						</Card>
					))}
				</View>

				{/* achievements */}
				<View style={{ flexDirection: 'column', gap: 10 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<Text variant="titleMedium" style={{ color: theme.colors.primary }}>
							Achievements
						</Text>
						<Button mode="text" contentStyle={{ flexDirection: 'row-reverse' }} icon="chevron-right" onPress={() => {}}>
							View all
						</Button>
					</View>
					{achievements.map((achievement) => (
						<Card key={achievement.id}>
							<Card.Title
								title={achievement.title}
								subtitle={achievement.subtitle}
								left={({ size }) => <Avatar.Icon size={size} icon={achievement.icon} />}
							/>
						</Card>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
