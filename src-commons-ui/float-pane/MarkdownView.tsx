import { createSignal, onMount } from "solid-js"
import DOMPurify from "dompurify"
import { MarkdownService } from "../../types-packages/main"
import { getMarkdownRenderer } from "../MarkdownRenderer"

export interface Props {
  markdown: Array<string> | string
  grammarName?: string
  renderer?: MarkdownService
  containerClassName: string
  contentClassName: string
  // already rendered markdown
  html?: Array<string> | string
}

/** A react component that can hosts markdown texts */
export function MarkdownView(props: Props) {
  const [getMarkdown, setMarkdown] = createSignal("")

  /** Calls `getDocumentationHtml` to convert Markdown to markdown */
  onMount(async () => {
    setMarkdown((await renderMarkdown(props.markdown, props.grammarName, props.renderer)) ?? "")
  })

  return (
    <div className={props.containerClassName} onWheel={onWheel}>
      <div className={props.contentClassName} innerHTML={getMarkdown()} />
    </div>
  )
}

/**
 * Handles the mouse wheel event to enable scrolling over long text
 *
 * @param evt The mouse wheel event being triggered
 */
function onWheel(evt: WheelEvent) {
  return evt.stopPropagation()
}

/**
 * Convert the markdown documentation to markdown
 *
 * @param markdownTexts The documentation text in markdown format to be converted
 * @param grammarName The default grammar used for embedded code samples
 * @param renderer Markdown service to be used for rendering
 * @returns A promise object to track the asynchronous operation
 */
export async function renderMarkdown(
  markdownTexts: Array<string> | string,
  grammarName: string = atom.workspace.getActiveTextEditor()?.getGrammar().scopeName?.toLowerCase() || "",
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
    markdownText = markdownTexts
  }
  if (renderer) {
    return DOMPurify.sanitize(await renderer.render(markdownText, grammarName))
  } else {
    // Use built-in markdown renderer (it already does sanitization)
    const render = await getMarkdownRenderer()
    return render(markdownText, grammarName)
  }
}
