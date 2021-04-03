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

  describe("detects if the dock item is visible", () => {
    it("finds the visible tab among all the tabs in a dock pane", async () => {
      await atom.packages.activatePackage("github")
      const rightDock = atom.workspace.getRightDock()
      const rightDockItems = rightDock.getPaneItems()

      console.log({ rightDockItems })

      rightDock.hide()
      expect(isItemVisible(rightDockItems[0])).toBe(false)
      expect(isItemVisible(rightDockItems[1])).toBe(false)

      rightDock.show()
      const visibleItems = rightDockItems.filter((item) => isItemVisible(item))
      expect(visibleItems.length).toBe(1)
    })
  })

  afterAll(async () => {
    await cleanup()
  })
})
