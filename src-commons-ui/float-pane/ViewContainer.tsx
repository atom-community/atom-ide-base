import { MarkdownView, Props as MarkdownViewProps } from "./MarkdownView"
import { SnippetView, Props as SnippetViewProps } from "./SnippetView"
import { ReactView, Props as ReactViewProps } from "./ReactView"
import type { ReactElement } from "react"
import * as React from "react"
import ReactDOM from "react-dom"

export const DATATIP_ACTIONS = Object.freeze({
  PIN: "PIN",
  CLOSE: "CLOSE",
})

const IconsForAction = {
  [DATATIP_ACTIONS.PIN]: "pin",
  [DATATIP_ACTIONS.CLOSE]: "x",
}

interface Props {
  component?: ReactViewProps
  markdown?: MarkdownViewProps
  snippet?: SnippetViewProps
  action?: string
  actionTitle?: string
  className?: string
  onActionClick?: Function
  onMouseDown?: Function
  onClickCapture?: Function
}

interface State {}

/**
 * an etch component for a decoration pane
 */
export class ViewContainer extends React.Component<Props, State> {
  actionButton?: JSX.Element
  classNames: string
  children: Array<JSX.Element>

  rootElement: HTMLElement

  constructor(props: Props) {
    super(props)
    this.children = []
    this.updateChildren()
    this.rootElement = document.createElement("div")
    const glowClass = atom.config.get("atom-ide-datatip.glowOnHover") ? "datatip-glow" : ""
    this.classNames = `${String(props.className)} datatip-element ${glowClass}`
  }

  /**
   * renders the data tip view component
   * @return the data tip view element
   */
  render() {
    this.actionButton = this.ActionClick(this.props.action, this.props.actionTitle)
    return (
      <div className={this.classNames} {...this.props.onMouseDown} {...this.props.onClickCapture}>
        {this.children}
        {this.actionButton}
      </div>
    )
  }

  get element() {
    return ReactDOM.render(this.render(), this.rootElement)
  }

  /**
   * internal helper function to figure out the structure of the data tip view
   * to be rendered
   */
  updateChildren() {
    if (this.props.component) {
      this.children.push(<ReactView {...this.props.component} />)
    }
    if (this.props.snippet) {
      this.children.push(<SnippetView {...this.props.snippet} />)
    }
    if (this.props.markdown) {
      this.children.push(<MarkdownView {...this.props.markdown} />)
    }
  }

  ActionClick(action: string, actionTitle: string) {
    let actionButton = undefined
    if (action != null && IconsForAction[action] != null) {
      const actionIcon = IconsForAction[action]
      actionButton = (
        <div
          className={`datatip-pin-button icon-${actionIcon}`}
          onClick={(event) => {
            this.props.onActionClick()
          }}
          title={actionTitle}
        />
      )
    }
    return actionButton
  }

  async destroy() {
    return // this.componentWillUnmount()
  }
}
