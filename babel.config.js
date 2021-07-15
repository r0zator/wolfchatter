module.exports = {
    presets: [
        '@vue/app',
    ],
    env: {
        test: {
            plugins: ['require-context-hook'],
            presets: [['@babel/env', { targets: { node: 'current' } }]],
        },
    },
};
