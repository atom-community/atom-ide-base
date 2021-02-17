import * as Atom from "atom"
import { IdeUri } from "./uri"

export interface FindReferencesProvider {
  /**
   * Return true if your provider supports finding references for the provided Atom.TextEditor.
   */
  isEditorSupported(editor: Atom.TextEditor): boolean | Promise<boolean>

  /**
   * `findReferences` will only be called if `isEditorSupported` previously returned true
   * for the given Atom.TextEditor.
   */
  findReferences(editor: Atom.TextEditor, position: Atom.Point): Promise<FindReferencesReturn | undefined | null>
}

export interface Reference {
  /**
   * URI of the file path
   */
  uri: IdeUri
  /**
   * name of calling method/function/symbol
   */
  name: string | undefined | null
  range: Atom.Range
}

export interface FindReferencesData {
  type: "data"
  baseUri: IdeUri
  referencedSymbolName: string
  references: Reference[]
  /**
   * defaults to 'Symbol References'
   */
  title?: string
}

export interface FindReferencesError {
  type: "error"
  message: string
}

export type FindReferencesReturn = FindReferencesData | FindReferencesError
