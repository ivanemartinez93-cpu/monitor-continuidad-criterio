export default [{
  files: ['src/main.js', 'src/service.js', 'src/controller.js', 'src/ui.js', 'test/**/*.js'],
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { document: 'readonly', fetch: 'readonly' } },
  rules: { 'no-undef': 'error', 'no-unused-vars': 'error', 'no-unreachable': 'error', 'no-constant-condition': 'error' },
}];

