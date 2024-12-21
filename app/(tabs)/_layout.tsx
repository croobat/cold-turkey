import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Icon } from 'react-native-paper';

export default function NavigationLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false, tabBarStyle: { borderTopWidth: 0 } }}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="journal"
				options={{
					title: 'Journal',
					tabBarLabel: 'Journal',
					tabBarIcon: ({ color, size }) => <Feather name="book" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="health"
				options={{
					title: 'Health',
					tabBarLabel: 'Health',
					tabBarIcon: ({ color, size }) => <Feather name="activity" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="goal"
				options={{
					title: 'Goal',
					tabBarLabel: 'Goal',
					tabBarIcon: ({ color, size }) => <Feather name="target" color={color} size={size} />,
					// logout icon
					headerRight: () => <Icon size={20} source="camera" />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
					// logout icon
					headerRight: () => <Icon size={20} source="camera" />,
				}}
			/>
		</Tabs>
	);
}
