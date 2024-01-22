module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['*.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {},
    },
  ],
  rules: {
    /**
     * ts 会检查
     */
    'import/no-unresolved': 'off',
    /**
     * ts 会检查全局变量
     */
    'import/no-deprecated': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    // 禁止出现未使用过的变量
    'no-unused-vars': 'warn',
  },
};
