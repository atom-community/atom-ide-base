/**
 * the markdown service object
 */
export interface MarkdownService {
  // function to render markdown for the given grammar
  render(markdownText: string, grammar: string): Promise<string>
}
