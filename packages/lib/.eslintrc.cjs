module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  extends: ["plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  rules: {},
};
