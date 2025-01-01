import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function GoalLayout() {
	const theme = useTheme();

	return (
		<Stack screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: theme.colors.background } }}>
			<Stack.Screen name="index" options={{ title: 'Goal' }} />
		</Stack>
	);
}
