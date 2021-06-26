import * as Atom from "atom"

export interface OutlineProvider {
  name: string
  /** If there are multiple providers for a given grammar, the one with the highest priority will be used. */
  priority: number
  grammarScopes: ReadonlyArray<string>
  updateOnEdit?: boolean
  getOutline(editor: Atom.TextEditor): Promise<Outline | null | undefined>
}

export interface OutlineTree {
  /** From Atom.Octicon or Atom.OcticonsPrivate (types not allowed over rpc so we use string) */
  icon?: string
  /** Kind you can pass to the UI for theming */
  kind?: OutlineTreeKind

  /** Must have `plainText` or the `tokenizedText` property. If both are present, `tokenizedText` is preferred. */
  plainText?: string
  /** Must have `plainText` or the `tokenizedText` property. If both are present, `tokenizedText` is preferred. */
  tokenizedText?: TokenizedText

  /** If user has atom-ide-base-outline-view.nameOnly then representativeName is used instead. */
  representativeName?: string

  startPosition: Atom.Point
  endPosition?: Atom.Point
  landingPosition?: Atom.Point
  children: OutlineTree[]
}

export interface Outline {
  outlineTrees: OutlineTree[]
}

/** Kind of outline tree - matches the names from the Language Server Protocol v2. */
export type OutlineTreeKind =
  | "file"
  | "module"
  | "namespace"
  | "package"
  | "class"
  | "method"
  | "property"
  | "field"
  | "constructor"
  | "enum"
  | "interface"
  | "function"
  | "variable"
  | "constant"
  | "string"
  | "number"
  | "boolean"
  | "array"

export type TokenKind =
  | "keyword"
  | "class-name"
  | "constructor"
  | "method"
  | "param"
  | "string"
  | "whitespace"
  | "plain"
  | "type"

export interface TextToken {
  kind: TokenKind
  value: string
}

export type TokenizedText = TextToken[]
