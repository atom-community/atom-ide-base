import { HTMLView, getDocumentationHtml } from "./HTMLView"
import { SnippetView, getSnippetHtml } from "./SnippetView"
import { ReactView } from "./ReactView"
import type { ReactElement } from "react"
import * as React from "react"
import ReactDOM from "react-dom"
import { MarkdownService } from "../../types-packages/main"
import type { Datatip } from "../../types-packages/main.d"

export const DATATIP_ACTIONS = Object.freeze({
  PIN: "PIN",
  CLOSE: "CLOSE",
})

const IconsForAction = {
  [DATATIP_ACTIONS.PIN]: "pin",
  [DATATIP_ACTIONS.CLOSE]: "x",
}

interface Props {
  component?: { element: () => ReactElement; containerClassName: string; contentClassName: string }
  html?: { element: string; containerClassName: string; contentClassName: string }
  snippet?: { element: string; containerClassName: string; contentClassName: string }
  action: string
  actionTitle: string
  className?: string
  datatip: Datatip
  onActionClick: Function
  onMouseDown: Function
  onClickCapture: Function
}

interface State {}

/**
 * an etch component for a decoration pane
 */
export class ViewContainer extends React.Component<Props, State> {
  children: Array<JSX.Element>
  rootElement: HTMLElement
  classNames
  constructor(props: Props) {
    super(props)
    this.children = []
    this.updateChildren()
    this.rootElement = document.createElement('div')
    const glowClass = atom.config.get("atom-ide-datatip.glowOnHover") ? "datatip-glow" : ""
    this.classNames = `${String(props.className)} datatip-element ${glowClass}`
  }

  /**
   * renders the data tip view component
   * @return the data tip view element
   */
  render(): JSX.Element {
    this.actionButton = this.ActionClick(this.props.action, this.props.actionTitle)
    return ReactDOM.render(
      <div className={this.classNames} {...this.props.onMouseDown} {...this.props.onClickCapture}>
        {this.children}
        {this.actionButton}
      </div>,
      this.rootElement
    )
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

  get element() {
    return this.render()
  }

  async destroy(): Promise<void> {
    return
  }

  ActionClick(action, actionTitle) {
    let actionButton = null
    if (action != null && IconsForAction[action] != null) {
      const actionIcon = IconsForAction[action]
      actionButton = (
        <div className={`datatip-pin-button icon-${actionIcon}`} onClick={(event: SyntheticEvent<>) => {
          this.props.onActionClick()}} title={actionTitle} />
      )
    }
    return actionButton
  }

}
