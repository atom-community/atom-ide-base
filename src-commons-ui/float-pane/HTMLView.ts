/**
 * a reference to the DOMpurify function to make safe HTML strings
 */
import DOMPurify from "dompurify"

/**
 * an etch component that can host already prepared HTML text
 */
export class HTMLView {
  rootElement: HTMLElement

  /**
   * creates the HTML view component and hands over the HTML to embedd
   * @param {string} html the HTML string to embedd into the HTML view component
   */
  constructor({ html }: { html: string }) {
    this.rootElement = document.createElement("div")
    this.rootElement.className = "datatip-marked-container"
    this.rootElement.addEventListener("wheel", this.onMouseWheel, {
      passive: true,
    })
    if (html) {
      const innerHTML = DOMPurify.sanitize(html)
      this.rootElement.innerHTML = `
        <div className='datatip-marked'>${innerHTML}</div>`
    }
  }

  /**
   * cleanup the HTML view component
   */
  destroy() {
    this.rootElement.removeEventListener("wheel", this.onMouseWheel)
  }

  /**
   * returns the root element of the HTML view component
   * @return {HTMLElement} the root element wrapping the HTML content
   */
  get element(): HTMLElement {
    return this.rootElement
  }

  /**
   * handles the mouse wheel event to enable scrolling over long text
   * @param  {WheelEvent} evt the mouse wheel event being triggered
   */
  onMouseWheel(evt: WheelEvent) {
    evt.stopPropagation()
  }
}

