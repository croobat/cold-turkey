import { StyleSheet } from 'react-native';
import { METRICS } from './Metrics';

export const style = StyleSheet.create({
	container: {
		flexGrow: 1,
		marginTop: 50,
	},
	content: {
		flex: 1,
		padding: METRICS.small,
	},
	centered: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	flexCentered: {
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
	fabStyle: {
		bottom: METRICS.large,
		right: METRICS.large,
		position: 'absolute',
	},

	smallMargin: { margin: METRICS.small },
	mediumMargin: { margin: METRICS.medium },
	largeMargin: { margin: METRICS.large },

	smallPadding: { padding: METRICS.small },
	mediumPadding: { padding: METRICS.medium },
	largePadding: { padding: METRICS.large },

	smallRowGap: { rowGap: METRICS.small },
	mediumRowGap: { rowGap: METRICS.medium },
	largeRowGap: { rowGap: METRICS.large },

	smallColumnGap: { columnGap: METRICS.small },
	mediumColumnGap: { columnGap: METRICS.medium },
	largeColumnGap: { columnGap: METRICS.large },

	test: {
		borderColor: 'red',
		borderWidth: 1,
		backgroundColor: 'lightred',
	},
});
