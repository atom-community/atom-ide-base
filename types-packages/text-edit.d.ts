import type { Range } from "atom"

export interface TextEdit {
  oldRange: Range
  newText: string
  /** If included, this will be used to verify that the edit still applies cleanly. */
  oldText?: string
}
