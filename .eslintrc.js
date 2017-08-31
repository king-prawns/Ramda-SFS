module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "env": {
    'browser': true
  },
  "rules": {
    "no-param-reassign": 0,
    "class-methods-use-this": 0,
    "no-console": 0,
    "comma-dangle": [2, "never"],
    "max-len": [0],
    "arrow-body-style": ["error", "as-needed"],
    "linebreak-style": ["error", "windows"],
    "no-unused-vars": 0,
    "vars-on-top": 0,
    "no-var": 0,
    "func-names": 0,
    "no-underscore-dangle": 0
  },
  settings: {
    "import/resolver": {
      "webpack": {
        "config": "build/webpack.base.conf.js"
      }
    }
  },
  globals: {
    'webpackGlobal': true
  }
};