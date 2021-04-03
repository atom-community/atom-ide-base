/** Show a JavaScript Error as an atom notifications */
export function notifyError(e: Error) {
  atom.notifications.addError(e.name, {
    stack: e.stack,
    detail: e.message,
  })
}
