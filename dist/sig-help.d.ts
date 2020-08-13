import { DisposableLike, Point, TextEditor } from "atom"

export type SignatureHelpRegistry = (provider: SignatureHelpProvider) => DisposableLike

export interface SignatureHelpProvider {
  priority: number
  grammarScopes: ReadonlyArray<string>

  triggerCharacters?: Set<string>

  getSignatureHelp(editor: TextEditor, point: Point): Promise<SignatureHelp | undefined | null>
}

export interface SignatureHelp {
  signatures: Signature[]
  activeSignature?: number
  activeParameter?: number
}

export interface Signature {
  label: string
  documentation?: string
  parameters?: SignatureParameter[]
}

export interface SignatureParameter {
  label: string
  documentation?: string
}
