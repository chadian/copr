module.exports = {
  plugins: ["jasmine"],
  env: {
    es6: true,
    node: true,
    jasmine: true
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2017
  },
  extends: [
    "eslint:recommended",
    // prettier comes last so it has final say
    "prettier"
  ],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"]
  }
};
