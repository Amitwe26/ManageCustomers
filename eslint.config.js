const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // other configs
  ],
  rules: {
    // your rules here
  },
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"], // Specify the extensions you want to lint
      rules: {
        // any specific rules for these files
      },
    },
  ],
});
