// Use built-in markdown renderer when the markdown service is not available

import { MarkdownService } from "../types-packages/main"

let render: MarkdownService["render"] | undefined = undefined

export async function getMarkdownRenderer() {
  if (!render) {
    //@ts-ignore
    render = ((await import("atom-ide-markdown-service/modules/renderer")) as MarkdownService).render
  }
  return render
}
