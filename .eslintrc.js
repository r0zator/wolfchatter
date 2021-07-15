module.exports = {
    root: true,

    env: {
        node: true,
        jest: true,
    },

    rules: {
        'no-console': 0,
        'import/named': 0,
        'no-debugger': 0,
        'no-param-reassign': 0,
        'prefer-destructuring': 0,
        'max-len': [1, 180, 4],
        indent: ['warn', 4, { SwitchCase: 1 }],
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        'no-trailing-spaces': ['error', { skipBlankLines: true }],
        'no-plusplus': 0,
        'arrow-body-style': 0,
        'no-use-before-define': 0,
        'object-curly-newline': ['error', {
            ObjectPattern: { minProperties: 10 },
        }],
        'vue/no-v-html': 0,
        'vue/html-indent': ['warn', 4],
        'vue/html-closing-bracket-newline': 0,
        'vue/valid-v-for': 0,
        'vue/max-attributes-per-line': 0,
        'vue/require-default-prop': 0,
        'vue/script-indent': 0,
        'vue/multiline-html-element-content-newline': 1,
        'vue/no-spaces-around-equal-signs-in-attribute': 1,
        'vue/require-prop-types': 1,
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            vue: 'never',
            jsx: 'never',
        }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.js', '**/*.spec.js', '**/*.stories.js'] }],
        'import/prefer-default-export': 0,
    },

    parserOptions: {
        parser: 'babel-eslint',
        fix: true,
    },

    extends: [
        'plugin:vue/recommended',
        '@vue/airbnb',
    ],
    globals: {
        _: true,
    },
};
