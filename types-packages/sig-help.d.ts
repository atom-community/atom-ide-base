import { DisposableLike, Point, TextEditor } from "atom"

export type SignatureHelpRegistry = (provider: SignatureHelpProvider) => DisposableLike

/**
 * Signature help is activated when:
 *
 * - Upon keystroke, any provider with a matching grammar scope contains the pressed key inside its triggerCharacters set
 * - The signature-help:show command is manually activated
 *
 * Once signature help has been triggered, the provider will be queried immediately with the current cursor position,
 * and then repeatedly upon cursor movements until a null/empty signature is returned.
 *
 * Returned signatures will be displayed in a small datatip at the current cursor. The highest-priority provider with a
 * non-null result will be used.
 */
export interface SignatureHelpProvider {
  priority: number
  grammarScopes: ReadonlyArray<string>

  /**
   * A set of characters that will trigger signature help when typed. If a null/empty set is provided, only manual
   * activation of the command works.
   */
  triggerCharacters?: Set<string>

  getSignatureHelp(editor: TextEditor, point: Point): Promise<SignatureHelp | undefined | null>
}

export interface SignatureHelp {
  signatures: Signature[]
  activeSignature?: number | null
  activeParameter?: number | null
}

export interface Signature {
  label: string
  documentation?: string | MarkupContent | null
  parameters?: SignatureParameter[]
}
export type SignatureInformation = Signature

export type MarkupKind = "plaintext" | "markdown"

export interface MarkupContent {
  kind: MarkupKind
  value: string
}

export interface SignatureParameter {
  label: string | [number, number]
  documentation?: string | MarkupContent | null
}
export type ParameterInformation = SignatureParameter
