// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	env: {
		browser: true,
		node: true,
		jest: true,
	},
	extends: ['expo', 'eslint:recommended', 'plugin:react/recommended', 'prettier'],
	ignorePatterns: ['/dist/*'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'warn',
		'react/react-in-jsx-scope': 'off',
	},
};
