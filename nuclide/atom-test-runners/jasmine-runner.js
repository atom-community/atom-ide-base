const { createRunner } = require("atom-jasmine3-test-runner")

// https://github.com/UziTech/atom-jasmine3-test-runner#api
module.exports = createRunner({
  testPackages: process.env.APM_TEST_PACKAGES ? process.env.APM_TEST_PACKAGES.split(' ') : [],
  suffix: "-test",
  legacySuffix: "-test-v1",
  testPaths: ["__tests__", "__atom_tests__"],
  timeReporter: true,
  silentInstallation: true,
  // Extra Packages
  specHelper: false
})
