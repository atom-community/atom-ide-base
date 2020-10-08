/**
 * a reference to the DOMpurify function to make safe HTML strings
 */
import DOMPurify from "dompurify"
import { MarkdownService } from "../../types-packages/main"
import { getMarkdownRenderer } from "../MarkdownRenderer"

/**
 * an etch component that can host already prepared HTML text
 */
export class HTMLView {
  rootElement: HTMLElement

  /**
   * creates the HTML view component and hands over the HTML to embedd
   * @param {string} html the HTML string to embedd into the HTML view component
   */
  constructor({
    html,
    containerClassName,
    contentClassName,
  }: {
    html: string
    containerClassName: string
    contentClassName: string
  }) {
    this.rootElement = document.createElement("div")
    this.rootElement.className = containerClassName
    this.rootElement.addEventListener("wheel", this.onMouseWheel, {
      passive: true,
    })
    if (html) {
      const innerHTML = DOMPurify.sanitize(html)
      this.rootElement.innerHTML = `
        <div className='${contentClassName}'>${innerHTML}</div>`
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

/**
 * convert the markdown documentation to HTML
 * @param markdownTexts the documentation text in markdown format to be converted
 * @param grammarName  the default grammar used for embedded code samples
 * @param renderer markdown service to be used for rendering
 * @return a promise object to track the asynchronous operation
 */
export async function getDocumentationHtml(
  markdownTexts: Array<String>,
  grammarName: string,
  renderer?: MarkdownService
): Promise<string | null> {
  if (markdownTexts !== undefined && markdownTexts.length > 0) {
    const markdownText = markdownTexts.join("\r\n")
    if (renderer) {
      return renderer.render(markdownText, grammarName)
    } else {
      // Use built-in markdown renderer when the markdown service is not available
      const render = await getMarkdownRenderer()
      return render(markdownText, grammarName)
    }
  }
  return null
}
