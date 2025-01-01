import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function HomeLayout() {
	const theme = useTheme();

	return (
		<Stack screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: theme.colors.background } }}>
			<Stack.Screen name="index" options={{ title: 'Home' }} />
			<Stack.Screen name="relapse-add" options={{ title: 'Add Relapse' }} />
		</Stack>
	);
}
