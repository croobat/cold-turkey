import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	column: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	test: {
		borderColor: 'red',
		borderWidth: 1,
		backgroundColor: 'lightred',
	},
});
