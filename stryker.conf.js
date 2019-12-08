module.exports = (config) => {
  config.set({
    mutate: [
      'src/**/index.ts',
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
    maxConcurrentTestRunners: 2, // resolves issue with tests not completing. See: https://github.com/stryker-mutator/stryker/issues/1542#issuecomment-495477158
  });
};
