/**
 * the markdown service object
 */
export interface MarkdownService {
  /**
   * function to render markdown for the given grammar
   * @param  markdownText markdown string to render
   * @param  grammar      grammar to render the string with
   * @return              highlighted HTML
   */
  render(markdownText: string, grammar: string): Promise<string>
}
