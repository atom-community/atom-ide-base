import type * as Atom from "atom"
import type { IdeUri } from "./uri"

export type CallHierarchyType = "incoming" | "outgoing"

export interface CallHierarchyProvider {
  name: string
  priority: number
  grammarScopes: ReadonlyArray<string>
  getIncomingCallHierarchy(editor: Atom.TextEditor, point: Atom.Point): Promise<CallHierarchy<"incoming"> | null>
  getOutgoingCallHierarchy(editor: Atom.TextEditor, point: Atom.Point): Promise<CallHierarchy<"outgoing"> | null>
}

interface CallHierarchy<T extends CallHierarchyType> {
  type: T
  data: CallHierarchyItem[]
  /** Returns CallHierarchy data about the i-th CallHierarchyItem. */
  itemAt(i: number): Promise<CallHierarchy<T>>
}

interface CallHierarchyItem {
  path: IdeUri
  name: string
  /** Same as the icon of outline.d.ts */
  icon?: string
  tags: SymbolTagKind[]
  detail?: string
  range: Atom.Range
  selectionRange: Atom.Range
}

/**
 * Kind of symbol tag - matches the names from the Language Server Protocol. LSP specification:
 * https://microsoft.github.io/language-server-protocol/specifications/specification-current/#symbolTag
 */
export type SymbolTagKind = "deprecated" // currently no other type
