module.exports = {
  rootDir: "../../",
  verbose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/config/jest/enzyme.js"],
  transform: {
    preset: "ts-jest",
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/jest/fileMock.js",
  },
};
