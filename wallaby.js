module.exports = function() {
  return {
    files: [
      'src/**/*.ts',
      'src/**/*.js',
      '!tests/*.ts',
      '!tests/*.js',
      'tsconfig.json',
      'jest.config.js',
      'src/**/*.json',
    ],
    tests: ['tests/*.js', 'tests/*.ts'],
    moduleDirectories: ['<rootDir>/node_modules'],
    env: {
      type: 'node',
      runner: 'node',
    },
    testFramework: 'jest',
    setup: function(wallaby) {
      var jestConfig = require('./jest.config.js');
      // for example:
      // jestConfig.globals = { "__DEV__": true };
      wallaby.testFramework.configure(jestConfig);
    },
    preprocessors: {
      '**/*.js?(x)': file =>
        require('babel-core').transform(file.content, {
          sourceMap: true,
          filename: file.path,
          presets: ['babel-preset-jest'],
        }),
    },
  };
};
