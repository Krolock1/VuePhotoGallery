module.exports = {
    root: true,
    env: {
        node: true,
    },
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/no-deprecated-slot-attribute': 'off',
        '@typescript-eslint/no-explicit-any': 'off',

        indent: ['error', 4],
        semi: 'error',
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'arrow-parens': ['error', 'as-needed'],
        curly: 'error',
        'keyword-spacing': 'error',
        'arrow-spacing': 'error',
        'space-before-blocks': 'error',
        'func-call-spacing': ['error', 'never'],
        'space-in-parens': ['error', 'never'],
        'no-undef': 'error',
        'no-useless-rename': 'error',
        'no-empty': 'error',
        'no-empty-function': 'error',
        'no-unused-vars': 'error',
        'no-param-reassign': ['error', { props: false }],
        'no-non-null-assertion': 0,
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'always-multiline'],
        'object-curly-spacing': ['error', 'always'],
        'eol-last': ['error', 'always'],
        'spaced-comment': ['error', 'always'],
        'require-await': ['error'],
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
};
