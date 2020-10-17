const { createRunner } = require("atom-jasmine3-test-runner")

const fs = require("fs")

// https://github.com/UziTech/atom-jasmine3-test-runner#api
module.exports = createRunner({
  testPackages: process.env.APM_TEST_PACKAGES ? process.env.APM_TEST_PACKAGES.split(' ') : [],
  suffix: "-test-v3",
  legacySuffix: "-test",
  testPaths: ["__tests__", "__atom_tests__"].filter(dir => !fs.existsSync(process.cwd(), dir)),
  timeReporter: true,
  silentInstallation: true,
  // Extra Packages
  specHelper: false
})
