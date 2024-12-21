import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

interface HeaderIconProps {
	icon: keyof typeof MaterialCommunityIcons.glyphMap;
	onPress: () => void;
}

const HeaderIcon: React.FC<HeaderIconProps> = ({ icon, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={{ marginHorizontal: 16 }}>
			<Icon source={icon} size={24} />
		</TouchableOpacity>
	);
};

export default function NavigationLayout() {
	const theme = useTheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				headerTitleAlign: 'left',
				headerTransparent: true,
				headerTitleStyle: {
					fontSize: 24,
					fontWeight: 'bold',
				},
				headerStyle: {
					backgroundColor: theme.colors.surface,
					borderBottomWidth: 0,
					shadowColor: 'transparent',
					shadowOffset: { width: 0, height: 0 },
					shadowOpacity: 0,
					shadowRadius: 0,
					elevation: 0,
				},
				tabBarStyle: {
					backgroundColor: theme.colors.surface,
					borderTopWidth: 0,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
					headerRight: () => (
						<HeaderIcon
							icon="bell"
							onPress={() => {
								console.log('notifications');
							}}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="journal"
				options={{
					title: 'Journal',
					tabBarLabel: 'Journal',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="book" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="health"
				options={{
					title: 'Health',
					tabBarLabel: 'Health',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="heart" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="goal"
				options={{
					title: 'Goal',
					tabBarLabel: 'Goal',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="target" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
}
