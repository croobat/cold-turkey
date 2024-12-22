import { Stack } from 'expo-router';

export default function GoalLayout() {
	return (
		<Stack
			screenOptions={{
				headerTransparent: true,
				headerTitleStyle: {
					fontSize: 20,
					fontWeight: 'bold',
				},
			}}
		>
			<Stack.Screen name="index" options={{ title: 'Goal' }} />
		</Stack>
	);
}
