import * as React from "react"
import DOMPurify from "dompurify"
import { MarkdownService } from "../../types-packages/main"
import { getMarkdownRenderer } from "../MarkdownRenderer"

export interface Props {
  snippet: Array<string> | string
  grammarName?: string
  renderer?: MarkdownService
  containerClassName: string
  contentClassName: string
}

interface State {
  snippet: string
}

/**
 * A React component that hosts a code snippet with syntax highlighting
 */
export class SnippetView extends React.Component<Props, State> {
  state = { snippet: "" }

  render() {
    return (
      <div className={this.props.containerClassName} onWheel={(e) => this.onMouseWheel(e)}>
        <div
          className={this.props.contentClassName}
          dangerouslySetInnerHTML={{
            __html: this.state.snippet,
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

  async componentDidMount() {
    this.setState({
      snippet: (await getSnippetHtml(this.props.snippet, this.props.grammarName, this.props.renderer)) ?? "",
    })
  }
}


const regexPremeable = /^\s*<(\?|!)([a-zA-Z]+)?\s*/i
const regexLSPPrefix = /^\((method|property|parameter|alias)\)\W/

/**
 * converts a given code snippet into syntax formatted HTML
 * @param snippets the code snippet to be converted
 * @param grammarName the name of the grammar to be used for syntax highlighting
 * @param renderer markdown service to be used for rendering
 * @return a promise object to track the asynchronous operation
 */
export async function getSnippetHtml(
  snippets: Array<string> | string,
  grammarName: string = atom.workspace.getActiveTextEditor()?.getGrammar().scopeName?.toLowerCase() || "",
  renderer?: MarkdownService
): Promise<string | null> {
  if (snippets === undefined) {
    return null
  }

  // if string
  if (typeof snippets === "string") {
    snippets = [snippets]
  }

  // if Array
  if (Array.isArray(snippets)) {
    if (snippets.length === 0) {
      return null
    }
    const divElem = document.createElement("div")
    snippets.forEach((snippet) => {
      const preElem = document.createElement("pre")
      const codeElem = document.createElement("code")
      snippet = snippet.replace(regexPremeable, "") // remove any preamble from the line
      codeElem.innerText = snippet.replace(regexLSPPrefix, "") // remove LSP prefix
      preElem.appendChild(codeElem)
      divElem.appendChild(preElem)
    })

    if (renderer) {
      return DOMPurify.sanitize(await renderer.render(divElem.outerHTML, grammarName))
    } else {
      // Use built-in markdown renderer (it already does sanitization)
      const render = await getMarkdownRenderer()
      return await render(divElem.innerHTML, grammarName)
    }
  } else {
    return null
  }
}
