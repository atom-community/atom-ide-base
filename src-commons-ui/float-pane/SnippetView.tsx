import * as React from "react"
import DOMPurify from "dompurify"
import { MarkdownService } from "../../types-packages/main"
import { getMarkdownRenderer } from "../MarkdownRenderer"

export interface Props {
  snippet: string
  grammarName: string
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
      <div className={this.props.containerClassName}>
        <div
          className={this.props.contentClassName}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(this.state.snippet),
          }}
        />
      </div>
    )
  }

  async componentDidMount() {
    this.setState({
      snippet: (await getSnippetHtml(this.props.snippet, this.props.grammarName, this.props.renderer)) ?? "",
    })
  }
}

const regExpLSPPrefix = /^\((method|property|parameter|alias)\)\W/

/**
 * converts a given code snippet into syntax formatted HTML
 * @param snippets the code snippet to be converted
 * @param grammarName the name of the grammar to be used for syntax highlighting
 * @param renderer markdown service to be used for rendering
 * @return a promise object to track the asynchronous operation
 */
export async function getSnippetHtml(
  snippets: Array<string> | string,
  grammarName: string,
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
      snippet = snippet.replace(/^\s*<(\?|!)([a-zA-Z]+)?\s*/i, "") // remove any preamble from the line
      codeElem.innerText = snippet.replace(regExpLSPPrefix, "")
      preElem.appendChild(codeElem)
      divElem.appendChild(preElem)
    })

    if (renderer) {
      return renderer.render(divElem.outerHTML, grammarName)
    } else {
      // Use built-in markdown renderer when the markdown service is not available
      const render = await getMarkdownRenderer()
      return render(divElem.outerHTML, grammarName)
    }
  } else {
    return null
  }
}
