import { View, StyleSheet } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
export default function UserStatsScreen() {
	const theme = useTheme();

	return (
		<View style={{ gap: 10 }}>
			<Text variant="titleMedium" style={{ color: theme.colors.primary }}>
				User Stats
			</Text>
			<View style={{ gap: 4, flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
				<View style={styles.card}>
					<Avatar.Icon size={50} icon="smoking" style={{ marginTop: -30 }} />
					<Text variant="labelSmall" style={{ textAlign: 'center' }}>
						Cigarettes avoided
					</Text>
					<Text variant="titleMedium" style={{ textAlign: 'center', fontWeight: 'bold' }}>
						100
					</Text>
				</View>

				<View style={styles.card}>
					<Avatar.Icon size={50} icon="cash" style={{ marginTop: -30 }} />
					<Text variant="labelSmall" style={{ textAlign: 'center' }}>
						Money saved
					</Text>
					<Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
						$100
					</Text>
				</View>
				<View style={styles.card}>
					<Avatar.Icon size={50} icon="clock-outline" style={{ marginTop: -30 }} />
					<Text variant="labelSmall" style={{ textAlign: 'center' }}>
						Time regained
					</Text>
					<Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
						100 h
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		borderColor: 'gray',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 2,
		width: '32%',
		height: 110,
		borderRadius: 20,
		padding: 10,
	},
});
