import { renderToStaticMarkup } from "react-dom/server"
import type { ReactElement } from "react"

/**
 * a reference to the DOMpurify function to make safe HTML strings
 */
import DOMPurify from "dompurify"

/**
 * an etch component that can host an externally given React component
 */
export class ReactView {
  rootElement: HTMLElement
  children?: ReactElement
  childrenStatic?: string

  /**
   * creates a React view component handing over the React code to be rendered
   * @param component the React component to be rendered
   */
  constructor({ component }: { component: () => ReactElement }) {
    if (component) {
      this.children = component()
    }
    this.render()
    // etch.initialize(this);
  }

  render() {
    this.rootElement = document.createElement("span")
    this.rootElement.classList.add("datatip-container")
    if (this.children) {
      this.childrenStatic = DOMPurify.sanitize(renderToStaticMarkup(this.children))
      this.rootElement.innerHTML = `
          <div className="datatip-content">${this.childrenStatic}</div>
      `
    }
    return this.rootElement
  }

  /**
   * returns the root element of the React view component
   * @return {HTMLElement} the root element wrapping the HTML content
   */
  get element(): HTMLElement {
    return this.rootElement
  }
}
