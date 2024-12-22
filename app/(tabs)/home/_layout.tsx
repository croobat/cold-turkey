import { Stack } from 'expo-router';

export default function HomeLayout() {
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
			<Stack.Screen name="index" options={{ title: 'Home' }} />
			<Stack.Screen name="relapse-add" options={{ title: 'Reset Timer' }} />
		</Stack>
	);
}
