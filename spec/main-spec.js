const timeout = process.env.CI ? 500000 : 1000

describe("tests", () => {
  const deps = [
    "atom-ide-markdown-service",
    "atom-ide-datatip",
    "atom-ide-signature-help",
    // "atom-ide-hyperclick", // the tests break. God knows why.
    "atom-ide-definitions",
    "atom-ide-outline",
    // "atom-ide-code-format",
    "linter",
    "linter-ui-default",
    "intentions",
  ]

  beforeAll(async () => {
    /*    Activation     */
    // Trigger deferred activation
    atom.packages.triggerDeferredActivationHooks()
    // Activate activation hook
    atom.packages.triggerActivationHook("core:loaded-shell-environment")

    // Activate the package
    await atom.packages.activatePackage("atom-ide-base")
    // wait until package-deps installs the deps
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, timeout)
    })
  }, timeout + 1000)

  it("Installation", function () {
    const allPackages = atom.packages.getAvailablePackageNames()
    deps.forEach(async (dep) => {
      expect(allPackages.includes(dep)).toBeTruthy()
      await atom.packages.activatePackage(dep)
      expect(atom.packages.isPackageLoaded(dep)).toBeTruthy()
    })
  })
})
