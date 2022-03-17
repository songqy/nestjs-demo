module.exports = {
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   project: 'tsconfig.json',
  //   sourceType: 'module',
  // },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    // 'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // 'prettier/@typescript-eslint',
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
    'no-var': ['error'],
    'no-console': ['error'],
    'comma-spacing': ['error'],
    'camelcase': ['error'],
    'no-unused-vars': ['error', { args: 'none' }],
    'no-cond-assign': ['error'],
    'no-return-assign': ['error'],
    'no-param-reassign': ['error'],
    // 'no-inline-comments': ['error'],
    'no-trailing-spaces': ['error'],
    'curly': ['error'],
    'eqeqeq': ['error'],
    'brace-style': ['error'],
    'key-spacing': ['error'],
    'semi-spacing': ['error'], //防止在表达式中的分号之前使用空格
    'semi': ['error', 'always'],
    'keyword-spacing': ['error'],
    'space-infix-ops': ['error'], // 要求操作符周围有空格
    'space-before-blocks': ['error'],
    'arrow-spacing': 2, //=>的前/后括号
    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }], // 禁止在类成员之间(单行不校验)出现空行
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always',
      },
    ],
    'quotes': ['error', 'single'],
    'prefer-arrow-callback': ['error'],
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'object-curly-spacing': ['error', 'always'], //强制在花括号中使用一致的空格
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'max-len': ['error', 180, 2, { 'ignoreComments': true }],
    'comma-dangle': ['error', 'always-multiline'],
  },
};
