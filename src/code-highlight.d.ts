import * as Atom from "atom";

declare module "atom-ide-base" {
  export interface CodeHighlightProvider {
    priority: number;
    grammarScopes: ReadonlyArray<string>;
    highlight(
      editor: Atom.TextEditor,
      bufferPosition: Atom.Point
    ): Promise<Atom.Range[] | undefined | null>;
  }
}
