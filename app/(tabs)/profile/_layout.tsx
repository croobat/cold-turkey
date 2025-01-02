import { router, Stack } from 'expo-router';
import { IconButton, useTheme } from 'react-native-paper';

export default function ProfileLayout() {
	const theme = useTheme();

	return (
		<Stack screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: theme.colors.background } }}>
			<Stack.Screen
				name="index"
				options={{
					title: 'Profile',
					headerRight: () => (
						<IconButton
							icon="cog"
							onPress={() => router.push('/profile/settings')}
							mode="contained"
							style={{ margin: 0, padding: 0 }}
						/>
					),
				}}
			/>
			<Stack.Screen name="settings" options={{ title: 'Settings' }} />
			<Stack.Screen name="motivations" options={{ title: 'Motivations' }} />
			<Stack.Screen name="motivation_add" options={{ title: 'Add Motivation' }} />
			<Stack.Screen name="archivements" options={{ title: 'Archivements' }} />
		</Stack>
	);
}
