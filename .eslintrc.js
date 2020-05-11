module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "no-var": ["error"],
    "no-console": ["error"],
    "comma-spacing": ["error"],
    "camelcase": ["error"],
    "no-unused-vars": ["error"],
    "no-cond-assign": ["error"],
    "no-return-assign": ["error"],
    "no-param-reassign": ["error"],
    "no-inline-comments": ["error"],
    "no-trailing-spaces": ["error"],
    "curly": ["error"],
    "eqeqeq": ["error"],
    "brace-style": ["error"],
    "key-spacing": ["error"],
    "semi-spacing": ["error"],
    "semi": ["error", "always"],
    "keyword-spacing": ["error"],
    "space-infix-ops": ["error"],
    "space-before-blocks": ["error"],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "quotes": ["error", "single"],
    "prefer-arrow-callback": ["error"],
    "object-curly-spacing": ["error", "never"],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "max-len": ["error", 180, 2, { "ignoreComments": true }],
    "comma-dangle": ["error", "always-multiline"]
  },
};
