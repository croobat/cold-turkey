import { Stack } from 'expo-router';

export default function ProfileLayout() {
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
			<Stack.Screen name="index" options={{ title: 'Settings' }} />
		</Stack>
	);
}
