module.exports = (config) => {
  config.set({
    // uncomment to run only a subset of tests
    // files: [
    //   'src/**/02/*',
    //   'src/**/utils/*.ts',
    // ],
    mutate: [
      'src/**/*.ts',
      '!src/**/*.test.ts',
    ],
    coverageAnalysis: 'off', // Coverage analysis with a transpiler is not supported a.t.m.
    tsconfigFile: 'tsconfig.json',
    mutator: 'typescript',
    transpilers: [
      'typescript', // Specify that your typescript code needs to be transpiled before tests can be run. Not needed if you're using ts-node Just-in-time compilation.
    ],
    packageManager: 'npm',
    reporters: ['clear-text', 'dots'], // see https://stryker-mutator.io/stryker/plugins#reporters
    testRunner: 'jest',
    thresholds: { high: 100, low: 99, break: 95 },
    timeoutFactor: 15,
  });
};
