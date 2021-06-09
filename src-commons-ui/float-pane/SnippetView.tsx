import { createSignal, onMount } from "solid-js"
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

/**
 * A React component that hosts a code snippet with syntax highlighting
 */
export function SnippetView(props: Props) {
  const [getSnippet, setSnippet] = createSignal("")

  onMount(async () => {
    setSnippet((await getSnippetHtml(props.snippet, props.grammarName, props.renderer)) ?? "")
  })

  return (
    <div className={props.containerClassName} onWheel={onWheel}>
      <div className={props.contentClassName} innerHTML={getSnippet()} />
    </div>
  )
}

/**
 * handles the mouse wheel event to enable scrolling over long text
 * @param evt the mouse wheel event being triggered
 */
function onWheel(evt: WheelEvent) {
  return evt.stopPropagation()
}

const regexPremeable = /^\s*<([!?])([a-z]+)?\s*/i
const regexLSPPrefix = /^\((method|property|parameter|alias)\)\W/

/**
 * converts a given code snippet into syntax formatted HTML
 * @param snippets the code snippet to be converted
 * @param grammarName the name of the grammar to be used for syntax highlighting
 * @param renderer markdown service to be used for rendering
 * @return a promise object to track the asynchronous operation
 */
export async function getSnippetHtml(
  snipetsGiven: Array<string> | string,
  grammarName: string = atom.workspace.getActiveTextEditor()?.getGrammar().scopeName?.toLowerCase() || "",
  renderer?: MarkdownService
): Promise<string | null> {
  if (snipetsGiven === undefined) {
    return null
  }
  let snippets = snipetsGiven

  // if string
  if (typeof snippets === "string") {
    snippets = [snippets]
  }

  // if Array
  if (Array.isArray(snippets)) {
    if (snippets.length === 0) {
      return null
    }
    const markdown = snippets
      .map((snippet) => {
        const snp = snippet
          .replace(regexPremeable, "") // remove any preamble from the line
          .replace(regexLSPPrefix, "") // remove LSP prefix
        return `\`\`\`\n${snp}\n\`\`\``
      })
      .join("\n")

    if (renderer) {
      return DOMPurify.sanitize(await renderer.render(markdown, grammarName))
    } else {
      // Use built-in markdown renderer (it already does sanitization)
      const render = await getMarkdownRenderer()
      return render(markdown, grammarName)
    }
  } else {
    return null
  }
}
