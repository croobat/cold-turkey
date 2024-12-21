import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Icon } from 'react-native-paper';
import { View } from 'react-native';

export default function NavigationLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				headerTitleAlign: 'left',
				headerTitleStyle: {
					fontSize: 24,
					fontWeight: 'bold',
				},
				headerStyle: {
					backgroundColor: 'transparent',
					borderBottomWidth: 0,
					shadowColor: 'transparent',
					shadowOffset: { width: 0, height: 0 },
					shadowOpacity: 0,
					shadowRadius: 0,
					elevation: 0,
				},
				tabBarStyle: {
					borderTopWidth: 0,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
					headerRight: () => (
						<View style={{ marginRight: 16 }}>
							<Icon source="bell" size={24} />
						</View>
					),
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
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
}
