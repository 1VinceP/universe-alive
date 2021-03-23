module.exports = {
   root: true,
   env: {
      node: true,
   },
   extends: [
      'plugin:vue/vue3-essential',
      '@vue/airbnb',
   ],
   parserOptions: {
      parser: 'babel-eslint',
   },
   rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
   },
   overrides: [
      {
         // files: [
         //    '**/__tests__/*.{j,t}s?(x)',
         //    '**/tests/unit/**/*.spec.{j,t}s?(x)',
         // ],
         files: ['src/**'],
         env: {
            jest: true,
         },
         rules: {
            'linebreak-style': 0,
            'no-plusplus': 0,
            'arrow-parens': 0,
            'arrow-body-style': 0,
            'no-alert': 0,
            'no-nested-ternary': 0,
            'no-confusing-arrow': 0,
            'object-curly-newline': 0,
            'indent': ['error', 3],
            'function-paren-newline': 0,
            'no-else-return': 0,
            'max-len': 0,
            'no-underscore-dangle': 0,
         },
      },
   ],
};
