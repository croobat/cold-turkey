import { Stack } from 'expo-router';

export default function HomeLayout() {
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
			<Stack.Screen name="index" options={{ title: 'Home' }} />
			<Stack.Screen name="reset" options={{ title: 'Reset' }} />
		</Stack>
	);
}
