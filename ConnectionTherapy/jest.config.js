module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
