/**
 * @file atom-ide
 * @see https://github.com/atom-ide-community/atom-ide-base
 */

export * from "./uri"
export * from "./busy-signal"
export * from "./code-actions"
export * from "./code-highlight"
export * from "./datatip"
export * from "./definitions"
export * from "./find-references"
export * from "./hyperclick"
export * from "./outline"
export * from "./sig-help"
export * from "./markdown-service"
export * from "./code-format"
export * from "./text-edit"
export * from "./refactor"
export * from "./console"

import { BusySignalProvider } from "./busy-signal.d"
import { CodeActionProvider } from "./code-actions"
import { CodeHighlightProvider } from "./code-highlight"
import { AnyDatatipProvider } from "./datatip"
import { DefinitionProvider } from "./definitions"
import { FindReferencesProvider } from "./find-references"
import { HyperclickProvider } from "./hyperclick"
import { OutlineProvider } from "./outline"
import { SignatureHelpProvider } from "./sig-help"

export interface ProviderCommon {
  /** Providers with higher priorities will be preferred over lower ones. */
  priority: number
  /** Omitting grammarScopes implies that the provider applies to all grammars. */
  grammarScopes?: Array<string>
}

export type Provider =
  | ProviderCommon
  | BusySignalProvider
  | CodeActionProvider
  | CodeHighlightProvider
  | AnyDatatipProvider
  | DefinitionProvider
  | FindReferencesProvider
  | HyperclickProvider
  | OutlineProvider
  | SignatureHelpProvider
