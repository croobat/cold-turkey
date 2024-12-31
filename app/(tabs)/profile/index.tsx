import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserStatsScreen from './user-stats';
import Archivements from './archivements';
import Motivation from './motivation';
import { router } from 'expo-router';
import { ScrollView } from 'react-native';

export default function ProfileScreen() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{
					gap: 20,
					paddingLeft: 12,
					paddingRight: 12,
					paddingTop: 40,
					paddingBottom: 20,
				}}
			>
				<UserStatsScreen />
				<Motivation />
				<Archivements />
				<Button
					mode="outlined"
					icon="cog"
					contentStyle={{ justifyContent: 'flex-start' }}
					onPress={() => router.push('/profile/settings')}
				>
					Settings
				</Button>
			</ScrollView>
		</SafeAreaView>
	);
}
