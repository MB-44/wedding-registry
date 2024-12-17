module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/test/**/*.test.ts"],
    moduleDirectories: ["node_modules", "src"],
    setupFiles : ['./jest.setup.ts'],
  };  