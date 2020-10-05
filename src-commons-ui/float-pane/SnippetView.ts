/**
 * a reference to the DOMpurify function to make safe HTML strings
 */
import DOMPurify from "dompurify"

/**
 * an etch component that hosts a code snippet incl. syntax highlighting
 */
export class SnippetView {
  rootElement: HTMLElement

  /**
   * creates a snippet view component handing in the snippet
   * @param {string} snippet the code snippet to be embedded
   */
  constructor({ snippet }: { snippet: string }) {
    this.rootElement = document.createElement("div")
    this.rootElement.classList.add("datatip-container")
    if (snippet) {
      const innerHTML = DOMPurify.sanitize(snippet)
      this.rootElement.innerHTML = `
        <div className='datatip-snippet'>${innerHTML}</div>`
    }
  }

  /**
   * returns the root element of the snippet view component
   * @return {HTMLElement} the root element wrapping the HTML content
   */
  get element(): HTMLElement {
    return this.rootElement
  }
}
