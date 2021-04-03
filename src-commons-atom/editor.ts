import { TextEditor } from "atom"

/**
 * Find if an editor has a line that is longer than the given threashold
 * @param editor
 * @param threashold largeFileLineCount threashold
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
