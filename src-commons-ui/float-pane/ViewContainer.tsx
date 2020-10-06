/** @jsx etch.dom */

import etch from "etch"
import { HTMLView } from "./HTMLView"
import { SnippetView } from "./SnippetView"
import { ReactView } from "./ReactView"
import type { ReactElement } from "react"

/**
 * an etch component for a decoration pane
 */
export class ViewContainer {
  props: {
    component?: { element: () => ReactElement; containerClassName: string; contentClassName: string }
    html?: { element: string; containerClassName: string; contentClassName: string }
    snippet?: { element: string; containerClassName: string; contentClassName: string }
  }
  children: Array<JSX.Element>

  /**
   * creates a data tip view component
   * @param props  the props of this data tip view
   * @param children potential child nodes of this data tip view
   */
  constructor(props: any, children?: Array<JSX.Element>) {
    this.props = props
    this.children = children || []
    this.updateChildren()
    etch.initialize(this)
  }

  /**
   * renders the data tip view component
   * @return the data tip view element
   */
  render(): JSX.Element {
    const glowClass = atom.config.get("atom-ide-datatip.glowOnHover") ? "datatip-glow" : ""
    const classes = `datatip-element ${glowClass}`
    return <div className={classes}>{this.children}</div>
  }

  /**
   * updates the internal state of the data tip view
   */
  update(props: any, children?: Array<JSX.Element>) {
    // perform custom update logic here...
    // then call `etch.update`, which is async and returns a promise
    this.props = props
    this.children = children || []
    this.updateChildren()
    return etch.update(this)
  }

  /**
   * clean up the data tip view
   * @return a promise object to keep track of the asynchronous operation
   */
  async destroy(): Promise<void> {
    await etch.destroy(this)
  }

  /**
   * internal helper function to figure out the structure of the data tip view
   * to be rendered
   */
  updateChildren() {
    if (this.props.component) {
      const { element, containerClassName, contentClassName } = this.props.component
      this.children.push(
        <ReactView component={element} containerClassName={containerClassName} contentClassName={contentClassName} />
      )
    }
    if (this.props.snippet) {
      const { element, containerClassName, contentClassName } = this.props.snippet
      this.children.push(
        <SnippetView snippet={element} containerClassName={containerClassName} contentClassName={contentClassName} />
      )
    }
    if (this.props.html) {
      const { element, containerClassName, contentClassName } = this.props.html
      this.children.push(
        <HTMLView html={element} containerClassName={containerClassName} contentClassName={contentClassName} />
      )
    }
  }
}
