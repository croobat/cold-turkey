import { View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
// import { Image } from 'react-native-paper';

const motivation = [
	{
		media: 'image',
		title: 'Motivation',
		description: 'Add a text, image or video to remind you why you want to quit',
	},
];

export default function Motivation() {
	const theme = useTheme();
	return (
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
				<Card key={item.title}>
					<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
					<Card.Title title={item.title} subtitle={item.description} />
				</Card>
			))}
		</View>
	);
}
