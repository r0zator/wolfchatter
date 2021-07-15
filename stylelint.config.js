module.exports = {
    root: true,
    rules: {
        indentation: [4],
        'selector-pseudo-element-colon-notation': ['single'],
        'at-rule-no-unknown': [true, { ignoreAtRules: ['include', 'extend'] }],
        'no-eol-whitespace': [true, { ignore: ['empty-lines'] }],
        'rule-empty-line-before': ['always', { ignore: ['first-nested'] }],
    },
    extends: [
        'stylelint-config-standard',
    ],
};
