"use babel"
import { createRunner } from "atom-jasmine3-test-runner"
import pkg from "../package.json"

// https://github.com/UziTech/atom-jasmine3-test-runner#api
export default createRunner({
  testPackages: Array.from(pkg["package-deps"].map((p) => p.name)),
  timeReporter: true,
  silentInstallation: true,
  // Extra Packages
  specHelper: true,
})
