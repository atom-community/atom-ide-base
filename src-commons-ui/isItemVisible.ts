import type { Dock, ViewRegistry } from "atom"

/** A function to detect if an item (view) is visible in Atom.
 * This is useful to skip code excecution or updating when the item is not visible.
 * @param item this is an item that is stored in {ViewRegistry}. It has the same type of the argument that you pass to `atom.view.getView(item)`.
 */
export function isItemVisible(item: Parameters<ViewRegistry["getView"]>[0]) {
  if (item === undefined || item === null) {
    return false
  }
  // check the HTMLElement itself (important for when the dock/container is visible but the tab is not selected)
  // try getting the element
  const element =
    (item as { getElement: () => HTMLElement })?.getElement() ?? (item as { element: HTMLElement })?.element
  if (element !== undefined && !isElementVisible(element)) {
    return false
    // if it we can't detect the invisiblity using HTML we need to consider Atom's context so we continue
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

/** A function to detect if an HTMLElement is visible. It doesn't consider the Atom context.
 * To detect if an item is visible in Atom use {isItemVisible} instead
 * This is useful to skip code excecution or updating when the element is not visible.
 * @param element
 */
export function isElementVisible(element: HTMLElement) {
  if (
    element instanceof HTMLElement &&
    (element.style.display === "none" || element.hidden || element.offsetHeight === 0)
  ) {
    return false
  }
  return true
}
