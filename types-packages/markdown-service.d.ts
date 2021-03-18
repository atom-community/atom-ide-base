export interface DOMPurifyConfig {
  ADD_ATTR?: string[]
  ADD_DATA_URI_TAGS?: string[]
  ADD_TAGS?: string[]
  ALLOW_DATA_ATTR?: boolean
  ALLOWED_ATTR?: string[]
  ALLOWED_TAGS?: string[]
  FORBID_ATTR?: string[]
  FORBID_TAGS?: string[]
  FORCE_BODY?: boolean
  KEEP_CONTENT?: boolean
  /**
   * This defaults to `true` starting DOMPurify 2.2.0. Note that setting it to `false`
   * might cause XSS from attacks hidden in closed shadowroots in case the browser
   * supports Declarative Shadow: DOM https://web.dev/declarative-shadow-dom/
   */
  RETURN_DOM_IMPORT?: boolean
  SANITIZE_DOM?: boolean
  WHOLE_DOCUMENT?: boolean
  ALLOWED_URI_REGEXP?: RegExp
  SAFE_FOR_TEMPLATES?: boolean
  ALLOW_UNKNOWN_PROTOCOLS?: boolean
  USE_PROFILES?: false | { mathMl?: boolean; svg?: boolean; svgFilters?: boolean; html?: boolean }
  IN_PLACE?: boolean
}
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
