import { Platform, StyleSheet } from 'react-native';
import { METRICS } from './Metrics';

const isIos = Platform.OS === 'ios';

export const style = StyleSheet.create({
	container: {
		flex: 1,
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
	fullHeight: {
		height: '100%',
	},
	fullWidth: {
		width: '100%',
	},
	fabStyle: {
		// bigger margin for android
		bottom: METRICS.lg + (isIos ? 0 : METRICS.lg),
		right: METRICS.lg,
		position: 'absolute',
	},
	keyboardMargin: {
		marginBottom: 350,
	},

	// margins
	noMargin: { margin: 0 },

	xsMargin: { margin: METRICS.xs },
	xsMarginTop: { marginTop: METRICS.xs },
	xsMarginBottom: { marginBottom: METRICS.xs },

	smMargin: { margin: METRICS.sm },
	smMarginTop: { marginTop: METRICS.sm },
	smMarginRight: { marginRight: METRICS.sm },
	smMarginBottom: { marginBottom: METRICS.sm },
	smMarginLeft: { marginLeft: METRICS.sm },

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

	xlMargin: { margin: METRICS.xl },
	xlMarginTop: { marginTop: METRICS.xl },
	xlMarginBottom: { marginBottom: METRICS.xl },

	xxlMargin: { margin: METRICS.xxl },
	xxlMarginTop: { marginTop: METRICS.xxl },
	xxlMarginBottom: { marginBottom: METRICS.xxl },

	xxxlMargin: { margin: METRICS.xxxl },
	xxxlMarginTop: { marginTop: METRICS.xxxl },
	xxxlMarginBottom: { marginBottom: METRICS.xxxl },

	// paddings
	noPadding: { padding: 0 },

	smPadding: { padding: METRICS.sm },

	padding: { padding: METRICS.md },
	paddingHorizontal: { paddingHorizontal: METRICS.md },
	paddingVertical: { paddingVertical: METRICS.md },
	paddingTop: { paddingTop: METRICS.md },
	paddingBottom: { paddingBottom: METRICS.md },
	paddingLeft: { paddingLeft: METRICS.md },
	paddingRight: { paddingRight: METRICS.md },

	lgPadding: { padding: METRICS.lg },
	lgPaddingTop: { paddingTop: METRICS.lg },

	xsRowGap: { rowGap: METRICS.xs },
	smRowGap: { rowGap: METRICS.sm },
	rowGap: { rowGap: METRICS.md },
	lgRowGap: { rowGap: METRICS.lg },

	xsColumnGap: { columnGap: METRICS.xs },
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
