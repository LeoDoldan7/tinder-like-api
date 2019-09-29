module.exports = {
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    /**
     * Rule extended from eslint:recommended, but it has
     * an open bug not solved at least in version 6.1.0
     */
    'require-atomic-updates': 'off',
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'minimum',
        align: 'value'
      }
    ],
    'func-call-spacing': ['error', 'never'],
    indent: ['error', 2],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'lines-between-class-members': ['error', 'always'],
    'no-lonely-if': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1
      }
    ],
    'no-debugger': 'off',
    'no-tabs': 'error',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'warn',
    'no-duplicate-imports': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['src/*']
      }
    ],
    'arrow-spacing': [
      'warn',
      {
        before: true,
        after: true
      }
    ],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    semi: 'error',
    'no-dupe-args': 'error',
    'no-irregular-whitespace': 'warn',
    'no-var': 'error',
    'no-async-promise-executor': 0,
    'no-empty-function': 'warn',
    'no-floating-decimal': 'error',
    'no-global-assign': 'error',
    'no-invalid-this': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    // 'no-multi-spaces': 'warn',
    'no-multi-str': 'warn',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-octal': 'warn',
    'no-redeclare': 'error',
    'no-return-await': 'warn',
    'no-throw-literal': 'warn',
    'no-useless-catch': 0,
    'no-useless-concat': 'error',
    'require-await': 'error',
    yoda: 'error',
    'no-delete-var': 'error',
    'no-shadow-restricted-names': 'error',
    'no-shadow': 'error',
    'no-unused-vars': 'warn',
    'capitalized-comments': 'off',
    'comma-dangle': 'warn',
    'no-whitespace-before-property': 'error',
    'block-spacing': 2,
    'space-before-blocks': 2,
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'spaced-comment': ['error', 'always'],
    'no-spaced-func': 'error',
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: true
      }
    ],
    'array-bracket-spacing': [
      'error',
      'never',
      {
        singleValue: false,
        objectsInArrays: false,
        arraysInArrays: false
      }
    ],
    'no-labels': 'error',
    'no-unused-labels': 'error',
    'eol-last': ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }]
  }
};
