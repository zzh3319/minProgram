module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.wpy files
  plugins: [
    'html'
  ],
  globals: {
    vue: true,
    wx: true
  },
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'no-mixed-spaces-and-tabs': 0,
    "no-irregular-whitespace": 1,
    "no-multi-spaces": 1,
    "semi":0,
    "indent":0,
    "eol-last": 0,
    "space-before-blocks": 0,
    "arrow-spacing": 0,
    "spaced-comment": 0,
    "camelcase": 1,
    "quotes": [1, "single"],
    "one-var": 1,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    'handle-callback-err': ['error', 'error']
  }
}
