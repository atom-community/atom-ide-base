import { TextEditor } from "atom"

// TODO move these to atom-ide-base
const longLineLengthDefault = atom.config.get("linter-ui-default.longLineLength") || 4000
const largeLineCountDefault = atom.config.get("linter-ui-default.largeFileLineCount") / 6 || 3000 // minimum number of lines to trigger large file optimizations

/**
 * Find if an editor's largeness based on the given threashold
 * @param editor
 * @param largeLineCount lineCountIfLarge threashold
 * @param longLineLength lineLengthIfLongerThan threashold
 * @returns the the largness score if editor is large. Otherwise it returns 0
 */
export function largeness(
  editor: TextEditor,
  largeLineCount: number = largeLineCountDefault,
  longLineLength: number = longLineLengthDefault
) {
  const lineCount = lineCountIfLarge(editor, largeLineCount)
  if (lineCount !== 0) {
    return lineCount
  }
  const longLine = lineLengthIfLongerThan(editor, longLineLength)
  if (longLine !== 0) {
    return longLine
  }
  return 0
}

/**
 * Find if an editor has a line that is longer than the given threashold
 * @param editor
 * @param threashold largeLineCount threashold
 * @returns the line count if it is larger than threashold. Otherwise it returns 0
 */
export function lineCountIfLarge(editor: TextEditor, threashold: number) {
  // @ts-ignore
  if (editor.largeFileMode) {
    return 100000
  }
  const lineCount = editor.getLineCount()
  if (lineCount >= threashold) {
    return lineCount
  }
  return 0 // small file
}

/**
 * Find if an editor has a line that is longer than the given threashold
 * @param editor
 * @param threashold lineLengthForRow threashold
 * @param lineCount count up to this line. Default is {editor.getLineCount()}
 * @returns the first line length that has a length larger than threashold. If no line is found, it returns 0
 */
export function lineLengthIfLongerThan(
  editor: TextEditor,
  threashold: number,
  lineCount: number = editor.getLineCount()
) {
  const buffer = editor.getBuffer()
  for (let i = 0, len = lineCount; i < len; i++) {
    const lineLength = buffer.lineLengthForRow(i)
    if (lineLength > threashold) {
      return lineLength
    }
  }
  return 0 // small file
}
