describe("tests", () => {
  const deps = [
    "atom-ide-markdown-service",
    "atom-ide-datatip",
    "atom-ide-signature-help",
    "atom-ide-hyperclick",
    "atom-ide-definitions",
    "atom-ide-outline",
    "linter",
    "linter-ui-default",
  ]

  beforeEach(async () => {
    jasmine.attachToDOM(atom.views.getView(atom.workspace))

    /*    Activation     */
    // Trigger deferred activation
    atom.packages.triggerDeferredActivationHooks()
    // Activate activation hook
    atom.packages.triggerActivationHook("core:loaded-shell-environment")

    // Activate the package
    await atom.packages.activatePackage("atom-ide-base")
  })

  it("Installation", async function () {
    expect(atom.packages.isPackageLoaded("atom-ide-base")).toBeTruthy()
    const allDeps = atom.packages.getAvailablePackageNames()
    deps.forEach((dep) => {
      expect(allDeps.includes(dep)).toBeTruthy()
    })
  })

  it("Activation", async function () {
    expect(atom.packages.isPackageLoaded("atom-ide-base")).toBeTruthy()
    deps.forEach(async (dep) => {
      await atom.packages.activatePackage(dep)
      expect(atom.packages.isPackageLoaded(dep)).toBeTruthy()
    })
  })
})
