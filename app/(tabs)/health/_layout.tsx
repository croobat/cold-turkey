import { Stack } from 'expo-router';

export default function HealthLayout() {
	return (
		<Stack
			screenOptions={{
				headerTransparent: true,
				headerTitleStyle: {
					fontSize: 24,
					fontWeight: 'bold',
				},
			}}
		>
			<Stack.Screen name="index" options={{ title: 'Health' }} />
		</Stack>
	);
}
