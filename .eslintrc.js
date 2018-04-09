module.exports = {
	extends: ['eslint-config-particle'],
	parserOptions: {
		ecmaVersion: 2018,
	},
	env: {
		browser: true,
		node: true,
	},
	rules: {
		'func-names': 0,
	}
};
