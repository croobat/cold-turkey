import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { View } from 'react-native';
import { Text, Card, Button, useTheme } from 'react-native-paper';

const achievements = [
	{
		title: 'Getting started',
		subtitle: 'Quit Smoking for the first time',
		icon: 'smoking-off',
	},
	{
		title: 'Getting started',
		subtitle: 'Quit Smoking for the first time',
		icon: 'smoking-off',
	},
];

export default function Archivements() {
	const theme = useTheme();
	return (
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
				<Card key={achievement.title}>
					<Card.Title
						title={achievement.title}
						subtitle={achievement.subtitle}
						left={(props) => <MaterialCommunityIcons name={achievement.icon} size={40} color="white" />}
					/>
				</Card>
			))}
		</View>
	);
}
