/** @babel */

import { lineCountIfLarge, lineLengthIfLongerThan, largeness } from "../commons-atom/editor-largeness"
import type { TextEditor, WorkspaceOpenOptions } from "atom"
import { open, track, cleanup } from "temp"
import { Chance } from "chance"
const chance = new Chance()
import { promises as fsp } from "fs"
const { writeFile } = fsp

export function createString(numParagraphs: number, numSentences: number) {
  let str: string = ""
  const parLengths: number[] = new Array(numParagraphs)
  for (let i = 0; i < numParagraphs; i++) {
    const par = chance.paragraph({ sentences: numSentences })
    str = str.concat(par, "\n")
    parLengths[i] = par.length
  }
  return { str, parLengths }
}

export async function openTempTextEditor(
  numParagraphs: number = 30,
  numSentences: number = 10,
  workspaceOpenOptions: WorkspaceOpenOptions = {}
) {
  const { str, parLengths } = createString(numParagraphs, numSentences)
  const filePath = (await open()).path
  await writeFile(filePath, str)
  const textEditor: TextEditor = await atom.workspace.open(filePath, {
    pending: true,
    ...workspaceOpenOptions,
  })
  return { textEditor, fileLegth: str.length, parLengths }
}

describe("editor", () => {
  beforeAll(() => {
    track()
  })

  describe("lineCountIfLarge", () => {
    it("return 0 for small files", async () => {
      const { textEditor } = await openTempTextEditor(1, 1)
      expect(lineCountIfLarge(textEditor, 1000)).toBe(0)
    })
    it("return line count for large files", async () => {
      const { textEditor } = await openTempTextEditor(5000, 1)
      expect(lineCountIfLarge(textEditor, 1000)).toBe(5001)
    })
    it("return maximum number for extremely large files", async () => {
      const { textEditor } = await openTempTextEditor(100, 1)
      textEditor.largeFileMode = true
      expect(lineCountIfLarge(textEditor, 1000)).toBe(100000)
    })
  })

  describe("lineLengthIfLongerThan", () => {
    it("return 0 for short files", async () => {
      const { textEditor } = await openTempTextEditor(1, 1)
      expect(lineLengthIfLongerThan(textEditor, 1000)).toBe(0)
    })
    it("return largest line length for long files", async () => {
      const { textEditor, fileLegth } = await openTempTextEditor(1, 100)
      expect(lineLengthIfLongerThan(textEditor, 100)).toBeGreaterThanOrEqual(fileLegth - 10)
    })
  })

  describe("largeness", () => {
    it("return 0 for small files", async () => {
      const { textEditor } = await openTempTextEditor(1, 1)
      expect(largeness(textEditor, 1000, 1000)).toBe(0)
    })
    it("return line count for large files", async () => {
      const { textEditor } = await openTempTextEditor(5000, 1)
      expect(largeness(textEditor, 1000, 1000)).toBe(5001)
    })
    it("return maximum number for extremely large files", async () => {
      const { textEditor } = await openTempTextEditor(100, 1)
      textEditor.largeFileMode = true
      expect(largeness(textEditor, 1000, 1000)).toBe(100000)
    })
    it("return 0 for short files", async () => {
      const { textEditor } = await openTempTextEditor(1, 1)
      expect(largeness(textEditor, 1000, 1000)).toBe(0)
    })
    it("return largest line length for long files", async () => {
      const { textEditor, fileLegth } = await openTempTextEditor(1, 10000)
      expect(largeness(textEditor, 1000, 1000)).toBeGreaterThanOrEqual(fileLegth - 10)
    })
  })

  afterAll(async () => {
    await cleanup()
  })
})
