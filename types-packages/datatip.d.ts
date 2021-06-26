import * as Atom from "atom"

export interface DatatipService {
  addProvider(provider: DatatipProvider): Atom.DisposableLike
  addModifierProvider?(provider: ModifierDatatipProvider): Atom.DisposableLike
  createPinnedDataTip?(datatip: Datatip, editor: Atom.TextEditor, options?: PinnedDatatipOptions): Atom.DisposableLike
}

export interface PinnedDatatipOptions {
  /** Defaults to 'end-of-line'. */
  position?: PinnedDatatipPosition
  /** Defaults to true. */
  showRangeHighlight?: boolean
}

export type PinnedDatatipPosition = "end-of-line" | "above-range"

export interface DatatipProvider {
  priority: number

  /** A unique name for the provider to be used for analytics. It is recommended that it be the name of the provider's package. */
  providerName: string
  datatip(
    editor: Atom.TextEditor,
    bufferPosition: Atom.Point,
    /** The mouse event that triggered the datatip. This is null for manually toggled datatips. */
    mouseEvent?: MouseEvent | null
  ): Promise<Datatip | undefined | null>

  /** Either pass this or `validForScope` */
  grammarScopes?: ReadonlyArray<string>

  /** Either pass `grammarScopes` or this function. */
  validForScope?(scopeName: string): boolean
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

/** Borrowed from the LSP API. */
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
  /** React component */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: JSX will be defined if React or Etch is used.
  component: () => JSX.Element
  range: Atom.Range
  pinnable?: boolean
}

export type Datatip = MarkedStringDatatip | ReactComponentDatatip

export type ModifierKey = "metaKey" | "shiftKey" | "altKey" | "ctrlKey"
