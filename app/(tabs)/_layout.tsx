import React from 'react';
import { Tabs } from 'expo-router';
import { Icon, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

type TabBarIconProps = {
	focused: boolean;
	color: string;
	size: number;
};

export default function NavigationLayout() {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Tabs
			screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: theme.colors.surface, borderTopWidth: 0 } }}
		>
			<Tabs.Screen name="index" options={{ href: null }} />
			<Tabs.Screen
				name="home"
				options={{
					title: t('home.title'),
					tabBarLabel: t('home.title'),
					tabBarIcon: ({ color, size }: TabBarIconProps) => <Icon source="home" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="journal"
				options={{
					title: t('journal.title'),
					tabBarLabel: t('journal.title'),
					tabBarIcon: ({ color, size }: TabBarIconProps) => <Icon source="book" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="health"
				options={{
					title: t('health.title'),
					tabBarLabel: t('health.title'),
					tabBarIcon: ({ color, size }: TabBarIconProps) => <Icon source="heart" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="goal"
				options={{
					title: t('goal.title'),
					tabBarLabel: t('goal.title'),
					tabBarIcon: ({ color, size }: TabBarIconProps) => <Icon source="target" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: t('profile.title'),
					tabBarLabel: t('profile.title'),
					tabBarIcon: ({ color, size }: TabBarIconProps) => <Icon source="account" color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
}
