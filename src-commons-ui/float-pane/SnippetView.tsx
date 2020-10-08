import * as React from "react"
import DOMPurify from "dompurify"
import { MarkdownService } from "../../types-packages/main"
import { getMarkdownRenderer } from "../MarkdownRenderer"

interface Props {
  snippet: string
  containerClassName: string
  contentClassName: string
}

interface State {}

/**
 * A React component that hosts a code snippet with syntax highlighting
 */
export class SnippetView extends React.Component<Props, State> {
  render() {
    return (
      <div className={this.props.containerClassName}>
        <div
          className={this.props.contentClassName}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(this.props.snippet),
          }}
        />
      </div>
    )
  }
}

/**
 * converts a given code snippet into syntax formatted HTML
 * @param snippets the code snippet to be converted
 * @param grammarName the name of the grammar to be used for syntax highlighting
 * @param renderer markdown service to be used for rendering
 * @return a promise object to track the asynchronous operation
 */
export async function getSnippetHtml(
  snippets: Array<String>,
  grammarName: string,
  renderer?: MarkdownService
): Promise<string | null> {
  if (snippets !== undefined && snippets.length > 0) {
    const regExpLSPPrefix = /^\((method|property|parameter|alias)\)\W/
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
  }
  return null
}
