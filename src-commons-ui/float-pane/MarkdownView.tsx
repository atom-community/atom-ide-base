import * as React from "react"
import DOMPurify from "dompurify"
import { MarkdownService } from "../../types-packages/main"
import { getMarkdownRenderer } from "../MarkdownRenderer"

export interface Props {
  markdown: Array<string> | string
  html?: Array<string> | string // already renderered markdown
  grammarName: string
  renderer?: MarkdownService
  containerClassName: string
  contentClassName: string
}

interface State {
  markdown: string
}

/**
 * A react component that can hosts markdown texts
 */
export class MarkdownView extends React.Component<Props, State> {
  state: State = { markdown: "" }

  render() {
    return (
      <div className={this.props.containerClassName} onWheel={(e) => this.onMouseWheel(e)}>
        <div
          className={this.props.contentClassName}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(this.state.markdown),
          }}
        />
      </div>
    )
  }

  /**
   * handles the mouse wheel event to enable scrolling over long text
   * @param evt the mouse wheel event being triggered
   */
  onMouseWheel(evt: React.WheelEvent) {
    evt.stopPropagation()
  }

  /**
    Calls `getDocumentationHtml` to convert Markdown to markdown
  */
  async componentDidMount() {
    this.setState({
      markdown: (await renderMarkdown(this.props.markdown, this.props.grammarName, this.props.renderer)) ?? "",
    })
  }
}

/**
 * convert the markdown documentation to markdown
 * @param markdownTexts the documentation text in markdown format to be converted
 * @param grammarName  the default grammar used for embedded code samples
 * @param renderer markdown service to be used for rendering
 * @return a promise object to track the asynchronous operation
 */
export async function renderMarkdown(
  markdownTexts: Array<string> | string,
  grammarName: string,
  renderer?: MarkdownService
): Promise<string | null> {
  if (markdownTexts === undefined) {
    return null
  }

  let markdownText = ""
  // if Array
  if (Array.isArray(markdownTexts)) {
    if (markdownTexts.length === 0) {
      return null
    }
    markdownText = (markdownTexts as Array<string>).join("\r\n")
  }
  // if string
  else {
    //@ts-ignore
    markdownText = markdownTexts
  }
  if (renderer) {
    return await renderer.render(markdownText, grammarName)
  } else {
    // Use built-in markdown renderer when the markdown service is not available
    const render = await getMarkdownRenderer()
    return await render(markdownText, grammarName)
  }
}
