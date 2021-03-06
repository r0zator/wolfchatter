module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,vue}'],
    coverageReporters: ['json', 'html', 'lcov', 'text-summary'],
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue',
    ],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFiles: ['./external-jest.js', 'jest-canvas-mock'],
    snapshotSerializers: [
        'jest-serializer-vue',
    ],
    testMatch: [
        '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
    ],
    testURL: 'http://localhost/',
    preset: '@vue/cli-plugin-unit-jest',
};
