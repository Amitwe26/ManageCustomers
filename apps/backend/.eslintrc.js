module.exports = {
  env: {
    browser: true, // Enables browser globals like window and document
    es2021: true, // Enables ES2021 globals
    node: true, // Enables Node.js global variables
  },
  extends: [
    "eslint:recommended", // Use the recommended rules from ESLint
    "plugin:node/recommended", // Use recommended rules from the node plugin
  ],
  parserOptions: {
    ecmaVersion: 12, // Allows modern ECMAScript features
    sourceType: "module", // Allows the use of imports
  },
  rules: {
    // Custom rules can be added here
    "no-console": "off", // Allow console.log statements
    indent: ["error", 2], // Use 2 spaces for indentation
    quotes: ["error", "single"], // Use single quotes
    semi: ["error", "always"], // Require semicolons
  },
};
