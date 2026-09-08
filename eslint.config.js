import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist"] },
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: "latest",
				ecmaFeatures: { jsx: true },
				sourceType: "module",
			},
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			eqeqeq: ["error", "always", { null: "ignore" }],
			"no-var": "error",
			"prefer-const": "error",
			"no-console": ["warn", { allow: ["warn", "error"] }],
			"no-debugger": "error",
			"no-duplicate-imports": "error",
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
		},
	},
	{
		files: ["**/*.{js,jsx}"],
		rules: {
			"no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
		},
	},
	{
		files: ["**/*.{ts,tsx}"],
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^[A-Z_]",
				},
			],
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{ prefer: "type-imports", fixStyle: "separate-type-imports" },
			],
			"@typescript-eslint/no-explicit-any": "error",
		},
	},
	{
		files: ["**/contexts/**/*.{js,jsx,ts,tsx}"],
		rules: {
			// Context 檔通常同時 export Provider 與 hook
			"react-refresh/only-export-components": "off",
		},
	},
);
