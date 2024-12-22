import { Platform, StyleSheet } from 'react-native';
import { METRICS } from './Metrics';

const isIos = Platform.OS === 'ios';

export const style = StyleSheet.create({
	container: {
		flexGrow: 1,
		marginTop: 50,
	},
	content: {
		flex: 1,
		padding: METRICS.sm,
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
		// bigger margin for android
		bottom: METRICS.lg + (isIos ? 0 : METRICS.lg),
		right: METRICS.lg,
		position: 'absolute',
	},

	xsMargin: { margin: METRICS.xs },
	xsMarginTop: { marginTop: METRICS.xs },
	xsMarginBottom: { marginBottom: METRICS.xs },

	smMargin: { margin: METRICS.sm },
	smMarginTop: { marginTop: METRICS.sm },
	smMarginBottom: { marginBottom: METRICS.sm },

	mdMargin: { margin: METRICS.md },
	mdMarginTop: { marginTop: METRICS.md },
	mdMarginBottom: { marginBottom: METRICS.md },

	lgMargin: { margin: METRICS.lg },
	lgMarginTop: { marginTop: METRICS.lg },
	lgMarginBottom: { marginBottom: METRICS.lg },

	smPadding: { padding: METRICS.sm },

	mdPadding: { padding: METRICS.md },

	lgPadding: { padding: METRICS.lg },
	lgPaddingTop: { paddingTop: METRICS.lg },

	xsRowGap: { rowGap: METRICS.xs },
	smRowGap: { rowGap: METRICS.sm },

	mdRowGap: { rowGap: METRICS.md },

	lgRowGap: { rowGap: METRICS.lg },

	smColumnGap: { columnGap: METRICS.sm },

	mdColumnGap: { columnGap: METRICS.md },

	lgColumnGap: { columnGap: METRICS.lg },

	test: {
		borderColor: 'red',
		borderWidth: 1,
		backgroundColor: 'lightred',
	},
});
