import * as Atom from "atom"
import { Message } from "atom/linter"

export interface CodeAction {
  apply(): Promise<void>
  getTitle(): Promise<string>
  dispose(): void
}

export interface CodeActionProvider {
  grammarScopes?: ReadonlyArray<string>
  priority: number
  getCodeActions(
    editor: Atom.TextEditor,
    range: Atom.Range,
    diagnostics: Message[]
  ): Promise<CodeAction[] | null | undefined>
}

/**
 * atom-ide-base-code-actions provides a CodeActionFetcher which offers an API to
 * request CodeActions from all CodeAction providers. For now, CodeActionFetcher
 * can only fetch CodeActions for a Diagnostic. In the future, this API can be
 * extended to provide a stream of CodeActions based on the cursor position.
 */
export interface CodeActionFetcher {
  getCodeActionForDiagnostic: (diagnostic: Message, editor: Atom.TextEditor) => Promise<CodeAction[]>
}
