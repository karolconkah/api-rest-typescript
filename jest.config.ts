/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  coverageReporters: ["json"],

  setupFilesAfterEnv: ["./tests/jest.setup.ts"],

  testMatch: ["<rootDir>/tests/**/*.test.ts"],

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
