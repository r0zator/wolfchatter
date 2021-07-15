module.exports = {
    devServer: {
    },
    chainWebpack: (config) => {
        config.plugin('provide').use(require.resolve('webpack/lib/ProvidePlugin'), [{
            _: 'lodash',
            moment: 'moment',
        }]);
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
            ],
        },
        lintStyleOnBuild: true,
        stylelint: {},
        webpackBundleAnalyzer: {
            analyzerMode: 'disabled',
            openAnalyzer: false,
            generateStatsFile: false,
        },
    },
};

