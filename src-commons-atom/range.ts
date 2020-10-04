import { TextEditor, TextEditorComponent, TextBuffer, Range, Point } from "atom"
import invariant from "assert"

/**
 * Finds the word at the position. You can either provide a word regex yourself,
 * or have Atom use the word regex in force at the scopes at that position,
 * in which case it uses the optional includeNonWordCharacters, default true.
 * (I know that's a weird default but it follows Atom's convention...)
 */
export function wordAtPosition(
  editor: TextEditor,
  position: Point,
  wordRegex?: RegExp | { includeNonWordCharacters: boolean }
): { wordMatch: Array<string>; range: Range } | null {
  let wordRegex_
  if (wordRegex instanceof RegExp) {
    wordRegex_ = wordRegex
  } else {
    // What is the word regex associated with the position? We'd like to use
    // Cursor.wordRegExp, except that function gets the regex associated
    // with the editor's current cursor while we want the regex associated with
    // the specific position. So we re-implement it ourselves...
    // @ts-ignore: https://github.com/atom/atom/blob/aa3c34bedb361e09a5068dce9620b460a20ca3fb/src/text-editor.js#L5032
    const nonWordChars: string = editor.getNonWordCharacters(position)
    const escaped = nonWordChars.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
    // We copied this escaping regex from Cursor.wordRegexp, rather than
    // using the library function 'escapeStringRegExp'. That's because the
    // library function doesn't escape the hyphen character and so is
    // unsuitable for use inside a range.
    let r = `^[\t ]*$|[^\\s${escaped}]+`
    if (wordRegex == null || wordRegex.includeNonWordCharacters) {
      r += `|[${escaped}]+`
    }
    wordRegex_ = new RegExp(r, "g")
  }
  return wordAtPositionFromBuffer(editor.getBuffer(), position, wordRegex_)
}

/**
 * Gets the trimmed range from a given range, i.e. moves the start and end points
 * to the first and last non-whitespace characters (or specified regex)
 * within the range respectively.
 *
 * @param editor       the editor containing the range
 * @param rangeToTrim  the range to trim
 * @param stopRegex    stop trimming when the first match is found for this regex,
 *   defaults to first non-whitespace character
 * @return Range  the trimmed range
 */
export function trimRange(editor: TextEditor, rangeToTrim: Range, stopRegex: RegExp = /\S/): Range {
  const buffer = editor.getBuffer()
  let { start, end } = rangeToTrim
  buffer.scanInRange(stopRegex, rangeToTrim, ({ range, stop }) => {
    start = range.start
    stop()
  })
  buffer.backwardsScanInRange(stopRegex, rangeToTrim, ({ range, stop }) => {
    end = range.end
    stop()
  })
  return new Range(start, end)
}

function getSingleWordAtPosition(editor: TextEditor, position: Point): string | null {
  const match = wordAtPosition(editor, position)
  // We should only receive a single identifier from a single point.
  if (match == null || match.wordMatch.length !== 1) {
    return null
  }

  return match.wordMatch[0]
}

/**
 * Gets the word being right-clicked on in a MouseEvent. A good use case for
 * this is performing an action on a word from a context menu.
 *
 * @param editor  the editor containing the word where the MouseEvent occurred
 *   from
 * @param event   the MouseEvent containing the screen position of the click
 */
export function getWordFromMouseEvent(editor: TextEditor, event: MouseEvent): string | null {
  // We can't immediately get the identifier right-clicked on from
  // the MouseEvent. Using its target element content would work in
  // some cases but wouldn't work if there was additional content
  // in the same element, such as in a comment.
  // @ts-ignore: https://github.com/atom/atom/blob/aa3c34bedb361e09a5068dce9620b460a20ca3fb/src/text-editor.js#L5075
  const component: TextEditorComponent = editor.getElement().component
  invariant(component)
  // This solution doesn't feel ideal but it is the way hyperclick does it.
  const point = component.screenPositionForMouseEvent(event)
  return getSingleWordAtPosition(editor, point)
}

/**
 * Attempts to get a word from the last selection or cursor. A good use case for
 * this is performing an action on an 'active' word after a command is triggered
 * via a keybinding.
 *
 * @param editor  the editor containing the 'active' word when the keybinding is
 *   triggered
 */
export function getWordFromCursorOrSelection(editor: TextEditor): string | null {
  const selection = editor.getSelectedText()
  if (selection && selection.length > 0) {
    return selection
  }

  // There was no selection so we can go ahead and try the cursor position.
  const point = editor.getCursorScreenPosition()
  return getSingleWordAtPosition(editor, point)
}

export function wordAtPositionFromBuffer(
  buffer: TextBuffer,
  position: Point,
  wordRegex: RegExp
): { wordMatch: Array<string>; range: Range } | null {
  const { row, column } = position
  const rowRange = buffer.rangeForRow(row)
  let matchData: { match: Array<string>; range: Range } | null
  // Extract the expression from the row text.
  buffer.scanInRange(wordRegex, rowRange, (data) => {
    const { range } = data
    if (range.start.isLessThanOrEqual(position) && range.end.isGreaterThan(position)) {
      matchData = data
    }
    // Stop the scan if the scanner has passed our position.
    if (range.end.column > column) {
      data.stop()
    }
  })
  // @ts-ignore (it is assigned above)
  if (matchData) {
    return {
      wordMatch: matchData.match,
      range: matchData.range,
    }
  } else {
    return null
  }
}

// Matches a regex on the text of the line ending at endPosition.
// regex should end with a '$'.
// Useful for autocomplete.
export function matchRegexEndingAt(buffer: TextBuffer, endPosition: Point, regex: RegExp): string | null {
  const line = buffer.getTextInRange([[endPosition.row, 0], endPosition])
  const match = regex.exec(line)
  return match == null ? null : match[0]
}

export function isPositionInRange(position: Point, range: Range | Array<Range>): boolean {
  return Array.isArray(range) ? range.some((r) => r.containsPoint(position)) : range.containsPoint(position)
}
