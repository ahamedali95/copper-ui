module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "@typescript-eslint",
    "jest",
    "react-hooks",
    "unused-imports",
    "simple-import-sort"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:react-hooks/recommended"
  ],
  parserOptions: {
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module"
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  rules: {
    indent: [ 'error', 4 ],
    "unused-imports/no-unused-imports": "error",
    "react/jsx-max-props-per-line": ["error", { "maximum": 1 }],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-closing-bracket-location": ["error", "line-aligned"],
    "react/jsx-sort-props": [0, {
      "ignoreCase": false,
      "callbacksLast": false
    }],
    "react/jsx-wrap-multilines": ["error", {
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical": "parens-new-line",
      "prop": "parens-new-line"
    }],
    "react/jsx-curly-newline": ["error", { multiline: "forbid", singleline: "forbid" }],
    "quotes": ["error", "double", { "avoidEscape": true }],
    "jsx-quotes": ["error", "prefer-double"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "object-curly-spacing": ["error", "always", { "arraysInObjects": true }],
    "comma-dangle": "error"
  }
};