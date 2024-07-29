// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: ['expo', 'eslint:recommended', 'plugin:react/recommended', 'prettier'],
	env: {
		browser: true,
		node: true,
		jest: true,
	},
	plugins: ['prettier'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				printWidth: 120,
				useTabs: true,
				jsxBracketSameLine: false,
			},
		],
	},
};
