import { Config } from "dompurify"
export type DOMPurifyConfig = Omit<Config, "RETURN_DOM" | "RETURN_DOM_FRAGMENT" | "RETURN_TRUSTED_TYPE">

/** The markdown service object */
export interface MarkdownService {
  /**
   * Renders markdown to safe HTML asynchronously
   *
   * @param markdownText The markdown text to render
   * @param scopeName Scope name used for highlighting the code
   * @param purifyConfig (optional) configuration object for DOMPurify
   * @returns The html string containing the result
   */
  render(markdownText: string, scopeName?: string, domPurifyConfig?: DOMPurifyConfig): Promise<string>
}
