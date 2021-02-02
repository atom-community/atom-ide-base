import type { TextEditor, TextEditorComponent } from "atom"

/** makes the text selectable
  * - You can directly add `user-select: text` and `pointer-events: all` in CSS for better performance
  */
export function makeOverlaySelectable(editor: TextEditor, overlayElement: HTMLElement) {
  overlayElement.setAttribute("tabindex", "-1")
  if (overlayElement.style.userSelect === "none") {
    overlayElement.style.userSelect = "text"
  }
  overlayFocusFix(editor, overlayElement)
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

/** Makes the overlay component copyable
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

/**
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
