import { StyleSheet } from 'react-native';
import { METRICS } from './Metrics';

export const style = StyleSheet.create({
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
	test: {
		borderColor: 'red',
		borderWidth: 1,
		backgroundColor: 'lightred',
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
});
