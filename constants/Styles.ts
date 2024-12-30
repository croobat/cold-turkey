import { Platform, StyleSheet } from 'react-native';
import { METRICS } from './Metrics';

const isIos = Platform.OS === 'ios';

export const style = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	content: {
		flex: 1,
		marginTop: 42,
		paddingHorizontal: METRICS.md,
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

	margin: { margin: METRICS.md },
	marginHorizontal: { marginHorizontal: METRICS.md },
	marginVertical: { marginVertical: METRICS.md },
	marginTop: { marginTop: METRICS.md },
	marginBottom: { marginBottom: METRICS.md },
	marginLeft: { marginLeft: METRICS.md },
	marginRight: { marginRight: METRICS.md },

	lgMargin: { margin: METRICS.lg },
	lgMarginTop: { marginTop: METRICS.lg },
	lgMarginBottom: { marginBottom: METRICS.lg },

	smPadding: { padding: METRICS.sm },

	padding: { padding: METRICS.md },
	paddingHorizontal: { paddingHorizontal: METRICS.md },
	paddingVertical: { paddingVertical: METRICS.md },

	lgPadding: { padding: METRICS.lg },
	lgPaddingTop: { paddingTop: METRICS.lg },

	xsRowGap: { rowGap: METRICS.xs },
	smRowGap: { rowGap: METRICS.sm },

	rowGap: { rowGap: METRICS.md },

	lgRowGap: { rowGap: METRICS.lg },

	smColumnGap: { columnGap: METRICS.sm },
	columnGap: { columnGap: METRICS.md },
	lgColumnGap: { columnGap: METRICS.lg },
	xlColumnGap: { columnGap: METRICS.xl },

	test: {
		borderColor: 'red',
		borderWidth: 1,
	},
	test2: {
		borderColor: 'blue',
		borderWidth: 1,
	},
});
