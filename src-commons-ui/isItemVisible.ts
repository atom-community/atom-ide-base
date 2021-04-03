import type { Dock, ViewRegistry } from "atom"

/** A function to detect if an item (view) is visible in Atom.
 * This is useful to skip code excecution or updating when the item is not visible.
 * @param item this is an item that is stored in {ViewRegistry}. It has the same type of the argument that you pass to `atom.view.getView(item)`.
 */
export function isItemVisible(item: Parameters<ViewRegistry["getView"]>[0]) {
  // check the HTMLElement itself (important for when the dock/container is visible but the tab is not selected)
  if ("element" in item) {
    const element = (item as { element: any }).element
    if (element instanceof HTMLElement && (element.style.display === "none" || element.hidden)) {
      return false
    }
  }
  const paneContainer = atom.workspace.paneContainerForItem(item)
  // if no container it is not visible
  if (paneContainer === undefined) {
    return false
  } else if (typeof (paneContainer as any).isVisible === "function") {
    // use Dock.isVisible()
    return (paneContainer as Dock).isVisible()
  } else {
    // it is visible (when paneContainer is not a dock like TextEditor)
    return true
  }
}
