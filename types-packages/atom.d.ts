// TODO add to @types/Atom

export {}

// An {Object} with the following fields:
interface BufferChangeEvent {
  // The deleted text
  oldText: string

  // The {Range} of the deleted text before the change took place.
  oldRange: Range

  // The inserted text
  newText: string

  // The {Range} of the inserted text after the change took place.
  newRange: Range
}

type HighlightingChangeEvent = (range: Range) => void

declare module "atom" {

  interface ConfigParams {
    saveCallback?: (arg0: Object) => void;
    mainSource?: string;
    projectHomeSchema?: ConfigSchema;
  }

  type ConfigType =
    | 'boolean'
    | 'string'
    | 'integer'
    | 'number'
    | 'array'
    | 'object'
    | 'color'
    | 'any';

  interface ConfigSchema {
    default?: unknown;
    description?: string;
    enum?: Array<string | {value: string; description: string}>;
    maximum?: number;
    minimum?: number;
    properties?: Object;
    title?: string;
    type: Array<ConfigType> | ConfigType;
  }

  interface Config {
    defaultSettings: Object;
    settings: Object;

    constructor(params?: ConfigParams): Config;
    getRawValue(
      keyPath: string | null | undefined,
      options: {excludeSources?: string; sources?: string},
    ): unknown;
    getSchema(keyPath: string): ConfigSchema | null;
    save(): void;
    setRawValue(keyPath: string, value: unknown): void;
    setSchema(keyPath: string, schema: ConfigSchema): void;
    removeAtKeyPath(
      keyPath: string | null | undefined,
      value: unknown | null | undefined,
    ): unknown;

    // Used to set the initial settings from disk
    resetUserSettings(newSettings: Object, options?: {source?: string}): void;
  }

  type CommandRegistryListener_Extra = {
    name: string;
    tags?: Array<string>;
  }

  interface CustomEvent {
    originalEvent?: Event;
  }

  interface Package {
    activateTime: number;
    mainModule: any;
    mainModulePath: string;
    metadata: Object;
    loadTime: number;
    getType(): 'atom' | 'textmate' | 'theme';
    hasActivationCommands(): boolean;
    hasActivationHooks(): boolean;
    initializeTime: number;
    getActivationHooks(): Array<string>;
    onDidDeactivate(cb: () => unknown): Disposable;
    activateNow(): void;
    // Undocumented
    bundledPackage: boolean;
    getCanDeferMainModuleRequireStorageKey(): string;
    initializeIfNeeded(): void;
  }

  class Model {
    destroy(): void;
    isDestroyed(): boolean;
  }

  interface TextEditor {
    // Get the Element for the editor.
    getElement(): TextEditorElement

    // Controls visibility based on the given {Boolean}.
    setVisible(visible: boolean): void

    // Experimental: Get a notification when async tokenization is completed.
    onDidTokenize(callback: () => any): Disposable

    component: {
      getNextUpdatePromise(): Promise<unknown>
    }

    isDestroyed(): boolean

    getDefaultCharWidth(): number
  }

  interface LanguageMode {
    // A {Function} that returns a {String} identifying the language.
    getLanguageId(): string

    // A {Function} that is called whenever the buffer changes.
    bufferDidChange(change: BufferChangeEvent): void

    // A {Function} that takes a callback {Function} and calls it with a {Range} argument whenever the syntax of a given part of the buffer is updated.
    onDidChangeHighlighting(callback: HighlightingChangeEvent): void

    // A function that returns an iterator object with the following methods:
    buildHighlightIterator(): {
      // A {Function} that takes a {Point} and resets the iterator to that position.
      seek(point: Point): any

      // A {Function} that advances the iterator to the next token
      moveToSuccessor(): void

      // A {Function} that returns a {Point} representing the iterator's current position in the buffer.
      getPosition(): Point

      //  A {Function} that returns an {Array} of {Number}s representing tokens that end at the current position.
      getCloseTags(): Array<number>

      // A {Function} that returns an {Array} of {Number}s representing tokens that begin at the current position.
      getOpenTags(): Array<number>
    }
  }

  interface TextMateLanguageMode {
    fullyTokenized: boolean

    // Get the suggested indentation level for an existing line in the buffer.
    //
    // * bufferRow - A {Number} indicating the buffer row
    //
    // Returns a {Number}.
    suggestedIndentForBufferRow(bufferRow: number, tabLength: number, options: object): number

    // Get the suggested indentation level for a given line of text, if it were inserted at the given
    // row in the buffer.
    //
    // * bufferRow - A {Number} indicating the buffer row
    //
    // Returns a {Number}.
    suggestedIndentForLineAtBufferRow(bufferRow: number, line: number, tabLength: number): number

    // Get the suggested indentation level for a line in the buffer on which the user is currently
    // typing. This may return a different result from {::suggestedIndentForBufferRow} in order
    // to avoid unexpected changes in indentation. It may also return undefined if no change should
    // be made.
    //
    // * bufferRow - The row {Number}
    //
    // Returns a {Number}.
    suggestedIndentForEditedBufferRow(bufferRow: number, tabLength: number): number
  }

  interface TextBuffer {
    // Experimental: Get the language mode associated with this buffer.
    //
    // Returns a language mode {Object} (See {TextBuffer::setLanguageMode} for its interface).
    getLanguageMode(): LanguageMode | TextMateLanguageMode

    // Experimental: Set the LanguageMode for this buffer.
    //
    // * `languageMode` - an {Object} with the following methods:
    setLanguageMode(languageMode: LanguageMode | TextMateLanguageMode): void
  }

  interface TextEditorElement {
    setUpdatedSynchronously(val: boolean): void
  }
}
