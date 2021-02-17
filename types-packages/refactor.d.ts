import type { TextEditor, Point } from "atom"
import type { TextEdit } from "./text-edit"
import type { IdeUri } from "./uri"

export interface RefactorProvider {
  grammarScopes: string[]
  priority: number
  rename?(editor: TextEditor, position: Point, newName: string): Promise<Map<IdeUri, TextEdit[]> | null>
}
