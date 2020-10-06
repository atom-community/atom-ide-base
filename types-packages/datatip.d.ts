import * as Atom from "atom"

export interface DatatipService {
  addProvider(provider: DatatipProvider): Atom.DisposableLike
  addModifierProvider(provider: ModifierDatatipProvider): Atom.DisposableLike
  createPinnedDataTip(datatip: Datatip, editor: Atom.TextEditor, options?: PinnedDatatipOptions): Atom.DisposableLike
}

export interface PinnedDatatipOptions {
  // Defaults to 'end-of-line'.
  position?: PinnedDatatipPosition
  // Defaults to true.
  showRangeHighlight?: boolean
}

export type PinnedDatatipPosition = "end-of-line" | "above-range"

export interface DatatipProvider {
  priority: number
  grammarScopes?: ReadonlyArray<string>
  // A unique name for the provider to be used for analytics.
  // It is recommended that it be the name of the provider's package.
  providerName: string
  datatip(editor: Atom.TextEditor, bufferPosition: Atom.Point): Promise<Datatip | undefined | null>
}

export interface ModifierDatatipProvider {
  priority: number
  grammarScopes?: string[]
  providerName: string
  modifierDatatip(
    editor: Atom.TextEditor,
    bufferPosition: Atom.Point,
    heldKeys: Set<ModifierKey>
  ): Promise<Datatip | undefined | null>
}

export type AnyDatatipProvider = DatatipProvider | ModifierDatatipProvider

// Borrowed from the LSP API.
export interface MarkdownMarkedString {
  type: "markdown"
  value: string
}

export interface SnippetMarkedString {
  type: "snippet"
  grammar: Atom.Grammar
  value: string
}

export type MarkedString = MarkdownMarkedString | SnippetMarkedString

export interface MarkedStringDatatip {
  markedStrings: MarkedString[]
  range: Atom.Range
  pinnable?: boolean
}

export interface ReactComponentDatatip {
  component: () => JSX.Element // React component
  range: Atom.Range
  pinnable?: boolean
}

export type Datatip = MarkedStringDatatip | ReactComponentDatatip

export type ModifierKey = "metaKey" | "shiftKey" | "altKey" | "ctrlKey"
