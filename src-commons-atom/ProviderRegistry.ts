import { Disposable, TextEditor } from "atom"
import { Provider as ProviderTypes, BusySignalProvider, FindReferencesProvider } from "../types-packages/main.d"

export class ProviderRegistry<Provider extends Exclude<ProviderTypes, BusySignalProvider | FindReferencesProvider>> {
  private providers: Array<Provider>

  constructor() {
    this.providers = []
  }

  addProvider(provider: Provider): Disposable {
    const index = this.providers.findIndex((p) => provider.priority > p.priority)
    if (index === -1) {
      this.providers.push(provider)
    } else {
      this.providers.splice(index, 0, provider)
    }
    return new Disposable(() => {
      this.removeProvider(provider)
    })
  }

  removeProvider(provider: Provider): void {
    const index = this.providers.indexOf(provider)
    if (index !== -1) {
      this.providers.splice(index, 1)
    }
  }

  // TODO deprecate since there can be N providers.
  getProviderForEditor(editor: TextEditor): Provider | null {
    const grammar = editor.getGrammar().scopeName
    return this.findProvider(grammar)
  }

  // TODO create an ordering or priority aware util to prefer instead.
  getAllProvidersForEditor(editor: TextEditor): Iterable<Provider> {
    const grammar = editor.getGrammar().scopeName
    return this.findAllProviders(grammar)
  }

  findProvider(grammar: string): Provider | null {
    for (const provider of this.findAllProviders(grammar)) {
      return provider
    }
    return null
  }

  /**
   * Iterates over all providers matching the grammar, in priority order.
   */
  *findAllProviders(grammar: string): Iterable<Provider> {
    for (const provider of this.providers) {
      if (provider.grammarScopes == null || provider.grammarScopes.indexOf(grammar) !== -1) {
        yield provider
      }
    }
  }
}
