import React from 'react';
import { Tabs } from 'expo-router';
import { Icon, useTheme } from 'react-native-paper';

export default function NavigationLayout() {
	const theme = useTheme();

	return (
		<Tabs
			screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: theme.colors.surface, borderTopWidth: 0 } }}
		>
			<Tabs.Screen name="index" options={{ href: null }} />
			<Tabs.Screen
				name="home"
				options={{
					title: 'Home',
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="journal"
				options={{
					title: 'Journal',
					tabBarLabel: 'Journal',
					tabBarIcon: ({ color, size }) => <Icon source="book" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="health"
				options={{
					title: 'Health',
					tabBarLabel: 'Health',
					tabBarIcon: ({ color, size }) => <Icon source="heart" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="goal"
				options={{
					title: 'Goal',
					tabBarLabel: 'Goal',
					tabBarIcon: ({ color, size }) => <Icon source="target" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, size }) => <Icon source="account" color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
}
