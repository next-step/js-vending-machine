module.exports = {
	env: {
		node: true,
		browser: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:prettier/recommended"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	ignorePatterns: ["!.prettierrc.js"],
};
