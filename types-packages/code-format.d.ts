import type { TextEditor, Point, Range } from "atom"
import type { TextEdit } from "./text-edit"

export interface FileCodeFormatProvider {
  formatEntireFile: (editor: TextEditor, range: Range) => Promise<TextEdit[]>
  priority: number
  grammarScopes: string[]
}

export interface RangeCodeFormatProvider {
  formatCode: (editor: TextEditor, range: Range) => Promise<TextEdit[]>
  priority: number
  grammarScopes: string[]
}

export interface OnSaveCodeFormatProvider {
  formatOnSave: (editor: TextEditor) => Promise<TextEdit[]>
  priority: number
  grammarScopes: string[]
}

export interface OnTypeCodeFormatProvider {
  formatAtPosition: (editor: TextEditor, position: Point, character: string) => Promise<TextEdit[]>
  priority: number
  grammarScopes: string[]
}
