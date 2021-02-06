import type { TextEditor, TextEditorComponent } from "atom"

let copyKeyMapAdded = false

/** makes the text selectable and copyable
 *
 * Note: you can directly add `user-select: text` (and `pointer-events: all`) in CSS for better performance
 */
export function makeOverlaySelectable(editor: TextEditor, overlayElement: HTMLElement, focusFix = true) {
  // allow the browser to handle selecting
  overlayElement.setAttribute("tabindex", "-1")

  // make it selectable
  if (!overlayElement.style.userSelect || overlayElement.style.userSelect === "none") {
    overlayElement.style.userSelect = "text"
  }

  if (focusFix) {
    // fix overlay focus issue
    overlayFocusFix(editor, overlayElement)
  }

  // add copy keybindings
  overlayElement.classList.add("selectable-overlay")

  if (!copyKeyMapAdded) {
    addCopyKeyMap()
    copyKeyMapAdded = true
  }
}

function addCopyKeyMap() {
  atom.keymaps.add("selectable-overlay", {
    ".platform-win32 .selectable-overlay, .platform-linux .selectable-overlay": {
      "ctrl-c": "native!",
    },
    ".platform-darwin .selectable-overlay": {
      "cmd-c": "native!",
    },
  })
}

/**
 * - focus on the datatip once the text is selected (cursor gets disabled temporarily)
 * - remove focus once mouse leaves
 */
export function overlayFocusFix(editor: TextEditor, element: HTMLElement) {
  const editorComponent = atom.views.getView(editor).getComponent()
  element.addEventListener("mousedown", () => {
    blurEditor(editorComponent)
    element.addEventListener("mouseleave", () => {
      focusEditor(editorComponent)
    })
  })
}

export function focusEditor(editorComponent: TextEditorComponent) {
  // @ts-ignore
  editorComponent?.didFocus()
}

export function blurEditor(editorComponent: TextEditorComponent) {
  // @ts-ignore
  editorComponent?.didBlurHiddenInput({
    relatedTarget: null,
  })
}

/*
██████  ███████ ██████  ██████  ███████  ██████  █████  ████████ ███████ ██████
██   ██ ██      ██   ██ ██   ██ ██      ██      ██   ██    ██    ██      ██   ██
██   ██ █████   ██████  ██████  █████   ██      ███████    ██    █████   ██   ██
██   ██ ██      ██      ██   ██ ██      ██      ██   ██    ██    ██      ██   ██
██████  ███████ ██      ██   ██ ███████  ██████ ██   ██    ██    ███████ ██████
*/

/** @deprecated use `makeOverlaySelectable` instead.
 *
 * Makes the overlay component copyable
 * - you should call `makeOverlaySelectable` before this
 * - If your element already has mouseenter and mouseleav listeners, directly use `copyListener`
 */
export function makeOverLayCopyable(element: HTMLElement) {
  element.addEventListener("mouseenter", () => {
    element.addEventListener("keydown", copyListener)
  })

  element.addEventListener("mouseleave", () => {
    element.removeEventListener("keydown", copyListener)
  })
}

/** @deprecated use `makeOverlaySelectable` instead.
 *
 * A manual copy listener
 * Usage. Add the listener to your mouse enter and mouseleave listeners
   ```ts
   element.addEventListener("mouseenter", () => {element.addEventListener("keydown", copyListener)}`
   element.addEventListener("mouseleave", () => {element.removeEventListener("keydown", copyListener)}`
   ```
*/
export async function copyListener(event: KeyboardEvent) {
  event.preventDefault()
  if (event.ctrlKey && event.key === "c") {
    const text = document.getSelection()?.toString() ?? ""
    await navigator.clipboard.writeText(text)
  }
} // TODO we should not need to manually listen for copy paste
