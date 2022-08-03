module.exports = {
  plugins: ["jest"],
  env: {
    es2022: true,
    node: true,
    "jest/globals": true
  },
  parserOptions: {
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {}
};
