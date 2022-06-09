const config = {
    transformIgnorePatterns: ["/node_modules/(?!dateformat)"],
    reporters: ["default", ["jest-junit",{outputDirectory : "test-results"}]],
  };
  
  module.exports = config;
  