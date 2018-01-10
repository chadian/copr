module.exports = {
  plugins: ["jasmine"],
  env: {
    es6: true,
    node: true,
    jasmine: true
  },
  extends: "eslint:recommended",
  rules: {
    indent: ["error", 4],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"]
  }
};
