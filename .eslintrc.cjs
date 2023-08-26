module.exports = {
  root: true,
  env: { browser: true, es2020: true, node:true},
  extends: [
    'eslint:recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },

  rules: {
    "indent": ["error", 2]
  },
}
