import * as Atom from "atom"

export interface CodeHighlightProvider {
  priority: number
  grammarScopes: ReadonlyArray<string>
  highlight(editor: Atom.TextEditor, bufferPosition: Atom.Point): Promise<Atom.Range[] | undefined | null>
}
