import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  rootDir: "./",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$": "<rootDir>/test/mocks/fileMock.js",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};

export default config;
