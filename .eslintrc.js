module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    project: "./tsconfig.json",
    sourceType: "module",
  },
  ignorePatterns: ["**/*.js"],
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    es2020: true,
    node: true,
  },
  rules: {
    // Use Array<> and ReadonlyArray<> syntax in types.
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "generic",
        readonly: "generic",
      },
    ],

    // Require explicit accessibility modifiers since everything is public by default.
    "@typescript-eslint/explicit-member-accessibility": "error",

    // Mandatory return types clutters the code too much.
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // Do not allow returning something if the return type is void.
    "@typescript-eslint/no-confusing-void-expression": "error",

    // Allow empty interfaces, since a lot of components don't require props.
    "@typescript-eslint/no-empty-interface": "off",

    // Only allow unused variables that are prefixed with an underscore. Use an ESLint rule instead of TypeScript's noUnusedLocals and noUnusedParameters to allow unused items when developing
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        vars: "all",
        varsIgnorePattern: "^_",
      },
    ],

    // var-require is used when importing assets.
    "@typescript-eslint/no-var-requires": "off",

    // Do not allow unnecessary checks for null.
    "@typescript-eslint/no-unnecessary-condition": "error",

    // Require explicit boolean expressions to avoid the ambiguities that JavaScript has, https://dorey.github.io/JavaScript-Equality-Table/#if-statement.
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      },
    ],

    // Require that all possible values are handled by switch statements.
    "@typescript-eslint/switch-exhaustiveness-check": "error",

    // Always use strict comparisons.
    eqeqeq: "error",

    // Use fat arrow function style.
    "func-style": "error",

    // Forbid reassigning parameters.
    "no-param-reassign": "error",

    // Do not allow unused expressions.
    "no-unused-expressions": "error",

    // Prefer const over let.
    "prefer-const": "error",

    // Prefer template strings over concatenating with plus.
    "prefer-template": "error",

    // Allow unescaped single and double quotes.
    "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
  },
};
