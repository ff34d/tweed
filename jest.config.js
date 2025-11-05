/** @type {import("jest").Config} */
export default {
  preset: "ts-jest",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  /* Ignore esModuleProp waring */
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [151001]
        }
      }
    ]
  }
}

