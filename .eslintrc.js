module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['standard', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        semi: [2, 'always'],
        'no-console': ['error', { allow: ['error'] }],
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',
        'prefer-destructuring': 'warn',
        'prefer-rest-params': 'warn',
        'prefer-spread': 'warn',
        yoda: 'error',
        'no-useless-constructor': 'off', // Dependency Injection
        '@typescript-eslint/no-unused-vars': 'error', // Enums TS
    },
};
