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
    return ReactDOM.render(
      this.render(),
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

  async destroy() {
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

// /**
//  * get content of the given datatip as HTML
//  * @param datatip object to be rendered
//  * @param editor the Atom Text editor instance to host the data tip view
//  * @param renderer markdown service to be used for rendering
//  * @return a promise object to the reendered content
//  */
// async function getContent(datatip: Datatip, editor: TextEditor, renderer: MarkdownService) {
//   let component: ReactElement | null = null
//   let html: string = ""
//   let snippet: string = ""
//   if ("component" in datatip) {
//     return <datatip.component />
//   } else if (datatip.markedStrings.length > 0) {
//     const grammar = editor.getGrammar().scopeName.toLowerCase()
//     snippet =
//       (await getSnippetHtml(
//         datatip.markedStrings.filter((t) => t.type === "snippet").map((t) => t.value),
//         grammar,
//         renderer
//       )) ?? ""
//     html =
//       (await getDocumentationHtml(
//         datatip.markedStrings.filter((t) => t.type === "markdown").map((t) => t.value),
//         grammar,
//         renderer
//       )) ?? ""
//     const htmlOrSnippet = snippet + html
//     return <div>{htmlOrSnippet}</div>
//   } else {
//     return null
//   }
// }
