import { TextEditor } from "atom"
import "../types-packages/atom"

/**
 * Highlights the given code with the given scope name (language)
 * @param code the given code as string
 * @param scopeName the language to highlight the code for
 */
export async function highlight(code: string, scopeName: string) {
  const ed = new TextEditor({
    readonly: true,
    keyboardInputEnabled: false,
    showInvisibles: false,
    tabLength: atom.config.get("editor.tabLength"),
  })
  const el = atom.views.getView(ed)
  try {
    el.setUpdatedSynchronously(true)
    el.style.pointerEvents = "none"
    el.style.position = "absolute"
    el.style.top = "100vh"
    el.style.width = "100vw"
    atom.grammars.assignLanguageMode(ed.getBuffer(), scopeName)
    ed.setText(code)
    ed.scrollToBufferPosition(ed.getBuffer().getEndPosition())
    atom.views.getView(atom.workspace).appendChild(el)
    await editorTokenized(ed)
    return Array.from(el.querySelectorAll(".line:not(.dummy)")).map((x) => x.innerHTML)
  } finally {
    el.remove()
  }
}

/**
 * A function that resolves once the given editor has tokenized
 * @param editor
 */
export async function editorTokenized(editor: TextEditor) {
  return new Promise((resolve) => {
    const languageMode = editor.getBuffer().getLanguageMode()
    const nextUpdatePromise = editor.component.getNextUpdatePromise()
    if ("fullyTokenized" in languageMode || "tree" in languageMode) {
      resolve(nextUpdatePromise)
    } else {
      const disp = editor.onDidTokenize(() => {
        disp.dispose()
        resolve(nextUpdatePromise)
      })
    }
  })
}
