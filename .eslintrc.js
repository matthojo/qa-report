module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'google',
  'rules': {
    'max-len': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-warning-comments': 0,
    'comma-dangle': ['error', 'never'],
    'no-var': 0,
    'camelcase': [2, {properties: 'never'}],
    'func-call-spacing': ['error', 'never'],
    'keyword-spacing': ['error', { "before": true }],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'curly': ['error'],
    'arrow-parens': ['error', 'always'],
    'linebreak-style': ['warn', 'unix']
  }
}