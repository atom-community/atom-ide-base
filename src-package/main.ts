import { CompositeDisposable } from "atom"

let subscriptions: CompositeDisposable | null

/** Called by Atom when activating an extension */
export function activate() {
  // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
  subscriptions = new CompositeDisposable()

  package_deps().catch((e) => {
    atom.notifications.addError(e)
  })
}

/** Install Atom package dependencies if not already loaded */
async function package_deps() {
  // Add entries from package-deps here manually
  // (to prevent loading atom-package-deps and package.json when the deps are already loaded)
  const deps = [
    "atom-ide-markdown-service",
    "atom-ide-datatip",
    "atom-ide-signature-help",
    "atom-ide-hyperclick",
    "atom-ide-definitions",
    "atom-ide-outline",
    "linter",
    "linter-ui-default",
    "intentions",
  ]
  if (deps.some((p) => !atom.packages.isPackageLoaded(p))) {
    // install if not installed
    await (await import("atom-package-deps")).install("atom-ide-base", true)
    // enable if disabled
    deps
      .filter((p) => !atom.packages.isPackageLoaded(p))
      .forEach((p) => {
        atom.notifications.addInfo(`Enabling package ${p} that is needed for "atom-ide-base"`)
        atom.packages.enablePackage(p)
      })
  }
}

/** Called by Atom when deactivating an extension */
export function deactivate() {
  if (subscriptions) {
    subscriptions.dispose()
  }
  subscriptions = null
}

export const config = {
  longLineLength: {
    title: "Long Line Length",
    description:
      "If an editor has a line with a length more than this number, the editor will reduce the expensive operations to help the performance.",
    type: "number",
    default: 4000,
    order: 10,
  },
  largeLineCount: {
    title: "Large File Line Count",
    description:
      "If an editor more line numbers than this number, the editor will reduce the expensive operations to help the performance.",
    type: "number",
    default: 4000,
    order: 11,
  },
}
