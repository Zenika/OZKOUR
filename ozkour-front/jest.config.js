// module.exports = {
//   preset: '@vue/cli-plugin-unit-jest'
// }

const config = {
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: ["/node_modules/(?!dateformat)"],
  reporters: ["default", ["jest-junit",{outputDirectory : "test-results"}]],
};

module.exports = config;
