module.exports = {
  /** @link https://stackoverflow.com/questions/50863312/jest-gives-cannot-find-module-when-importing-components-with-absolute-paths */
  moduleDirectories: ['node_modules', '<rootDir>/'],
  roots: ['<rootDir>/src/'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/__tests__/utils.tsx',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
};
