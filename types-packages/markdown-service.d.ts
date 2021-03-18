import { Config } from "dompurify"
export type DOMPurifyConfig = Omit<Config, "RETURN_DOM" | "RETURN_DOM_FRAGMENT" | "RETURN_TRUSTED_TYPE">

/**
 * the markdown service object
 */
export interface MarkdownService {
  /**
   * renders markdown to safe HTML asynchronously
   * @param markdownText the markdown text to render
   * @param scopeName scope name used for highlighting the code
   * @param purifyConfig (optional) configuration object for DOMPurify
   * @return the html string containing the result
   */
  render(markdownText: string, scopeName?: string, domPurifyConfig?: DOMPurifyConfig): Promise<string>
}
