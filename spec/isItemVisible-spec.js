/** @babel */

import type { TextEditor, WorkspaceOpenOptions, Dock } from "atom"
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
  spyOnProperty(textEditor.getElement(), "offsetHeight", "get").and.returnValue(1000)
  return textEditor
}

async function openGitTabs() {
  await atom.workspace.getCenter().activate()
  jasmine.attachToDOM(atom.views.getView(atom.workspace))
  if (!atom.packages.isPackageActive("github")) {
    atom.packages.enablePackage("github")
    await atom.packages.activatePackage("github")
  }
  await openTempTextEditor({ location: "center" })
  await atom.commands.dispatch(atom.views.getView(atom.workspace), "github:toggle-git-tab")
}

describe("isItemVisible", () => {
  beforeAll(() => {
    track()
  })

  describe("detects if the text editor is visible", () => {
    beforeEach(() => {
      atom.workspace.getTextEditors().forEach((editor) => editor.destroy())
    })

    it("if two text editors are opened in the center", async () => {
      // open first editor
      const textEditor1 = await openTempTextEditor()
      expect(atom.workspace.getActiveTextEditor()).toBe(textEditor1)

      expect(textEditor1.getElement().style.display).toBe("")
      expect(textEditor1.getElement().offsetHeight).toBe(1000)
      expect(isItemVisible(textEditor1)).toBe(true)

      // open second editor
      const textEditor2 = await openTempTextEditor()
      expect(atom.workspace.getActiveTextEditor()).toBe(textEditor2)

      // expect(textEditor1.getElement().style.display).toBe("none") // doesn't work in the test env, but works in reality
      expect(atom.workspace.paneContainerForItem(textEditor1)).toBe(undefined)
      expect(isItemVisible(textEditor1)).toBe(false)

      expect(textEditor2.getElement().style.display).toBe("")
      expect(textEditor2.getElement().offsetHeight).toBe(1000)
      expect(isItemVisible(textEditor2)).toBe(true)
    })

    it("if text editors are split", async () => {
      // open first editor
      const textEditor1 = await openTempTextEditor()
      expect(atom.workspace.getActiveTextEditor()).toBe(textEditor1)
      expect(textEditor1.getElement().style.display).toBe("")
      expect(isItemVisible(textEditor1)).toBe(true)

      // open second editor in the right
      const textEditor2 = await openTempTextEditor({ split: "right" })
      expect(atom.workspace.getActiveTextEditor()).toBe(textEditor2)

      expect(textEditor1.getElement().style.display).toBe("")
      expect(isItemVisible(textEditor1)).toBe(true)

      expect(textEditor2.getElement().style.display).toBe("")
      expect(isItemVisible(textEditor2)).toBe(true)
    })
  })

  describe("detects if the dock item is visible", () => {
    it("finds the visible tab among all the tabs in a dock pane", async () => {
      await openGitTabs()
      const rightDock: Dock = atom.workspace.getRightDock()
      jasmine.attachToDOM(rightDock.getElement())

      const rightDockItems: Array<object> = rightDock.getPaneItems()
      const item1OffsetHeightSpy = spyOnProperty(rightDockItems[0].getElement(), "offsetHeight", "get")
      const item2OffsetHeightSpy = spyOnProperty(rightDockItems[1].getElement(), "offsetHeight", "get")

      // "detects hidden if the dock is closed"
      // hide the dock
      rightDock.hide()
      expect(atom.workspace.paneContainerForItem(rightDockItems[0]).isVisible()).toBe(false)
      expect(atom.workspace.paneContainerForItem(rightDockItems[1]).isVisible()).toBe(false)

      // despite having offsetHeight it is detected as hidden using `dock.isVisible`
      item1OffsetHeightSpy.and.returnValue(682)
      item2OffsetHeightSpy.and.returnValue(682)
      expect(isItemVisible(rightDockItems[0])).toBe(false)
      expect(isItemVisible(rightDockItems[1])).toBe(false)

      // "can detect using offsetHeight"
      // show the dock
      rightDock.show()
      expect(atom.workspace.paneContainerForItem(rightDockItems[0]).isVisible()).toBe(true)
      expect(atom.workspace.paneContainerForItem(rightDockItems[1]).isVisible()).toBe(true)

      // can detect using offsetHeight
      item1OffsetHeightSpy.and.returnValue(682)
      item2OffsetHeightSpy.and.returnValue(0) // hidden pane
      const visibleItems1 = rightDockItems.filter((item) => isItemVisible(item))
      expect(visibleItems1.length).toBe(1)
      expect(isItemVisible(rightDockItems[0])).toBe(true)
      expect(isItemVisible(rightDockItems[1])).toBe(false)

      // "can detect using display none"
      item1OffsetHeightSpy.and.returnValue(682)
      item2OffsetHeightSpy.and.returnValue(682)
      rightDockItems[1].getElement().style.display = "none" // hidden pane
      const visibleItems2 = rightDockItems.filter((item) => isItemVisible(item))
      expect(visibleItems2.length).toBe(1)
      expect(isItemVisible(rightDockItems[0])).toBe(true)
      expect(isItemVisible(rightDockItems[1])).toBe(false)
    })
  })

  afterAll(async () => {
    await cleanup()
  })
})
