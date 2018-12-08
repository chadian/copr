module.exports = {
  plugins: ["jasmine"],
  env: {
    es6: true,
    node: true,
    jasmine: true
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2017
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {}
};
