/** @babel */

import type { TextEditor, WorkspaceOpenOptions } from "atom"
import { isItemVisible } from "../commons-ui/isItemVisible.js"
import { open, track, cleanup } from "temp"
import { Chance } from "chance"
const chance = new Chance()

async function openTempTextEditor(options: WorkspaceOpenOptions) {
  const textEditor: TextEditor = await atom.workspace.open((await open()).path, {
    pending: true,
    ...options,
  })
  textEditor.setText(chance.sentence({ words: 20 }))
  await textEditor.save()
  return textEditor
}

describe("isItemVisible", () => {
  beforeAll(() => {
    track()
  })

  describe("detects if the text editor is visible", () => {
    it("if two text editors are opened in the center", async () => {
      const textEditor1 = await openTempTextEditor()
      expect(atom.workspace.getActiveTextEditor()).toBe(textEditor1)
      expect(isItemVisible(textEditor1)).toBe(true)

      const textEditor2 = await openTempTextEditor()
      expect(atom.workspace.getActiveTextEditor()).toBe(textEditor2)
      expect(isItemVisible(textEditor2)).toBe(true)
      expect(isItemVisible(textEditor1)).toBe(false)
    })
    it("if text editors are split", async () => {
      const textEditor1 = await openTempTextEditor()
      expect(atom.workspace.getActiveTextEditor()).toBe(textEditor1)
      expect(isItemVisible(textEditor1)).toBe(true)

      const textEditor2 = await openTempTextEditor({ split: "right" })
      expect(atom.workspace.getActiveTextEditor()).toBe(textEditor2)
      expect(isItemVisible(textEditor2)).toBe(true)
      expect(isItemVisible(textEditor1)).toBe(true)
    })
  })

  afterAll(async () => {
    await cleanup()
  })
})
