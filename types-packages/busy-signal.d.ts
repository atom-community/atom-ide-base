import type { IdeUri } from "./uri"

export interface BusySignalOptions {
  /**
   * Can say that a busy signal will only appear when a given file is open. Default = `null`, meaning the busy signal
   * applies to all files.
   */
  onlyForFile?: IdeUri

  /**
   * Is user waiting for computer to finish a task? (traditional busy spinner) or is the computer waiting for user to
   * finish a task? (action required)
   *
   * @default `'computer'`
   */
  waitingFor?: "computer" | "user"

  /** Debounce it? default = `true` for busy-signal, and `false` for action-required. */
  debounce?: boolean

  /**
   * If `onClick` is set, then the tooltip will be clickable.
   *
   * @default `null`
   */
  onDidClick?: () => void

  /**
   * If set to `true`, the busy signal tooltip will be immediately revealed when it first becomes visible (without
   * explicit mouse interaction).
   */
  revealTooltip?: boolean
}

/** `atom-ide-busy-signal` service. */
export interface BusySignalService {
  /**
   * Activates the busy signal with the given title and returns the promise from the provided callback. The busy signal
   * automatically deactivates when the returned promise either resolves or rejects.
   *
   * @typeParam T Return type of the async function
   * @param title Name of the busy signal to activate
   * @param f Async function. When the promise resolves, the signal deactivates.
   * @param options Options for this signal
   * @returns A promise which resolves with the type of `f`
   */
  reportBusyWhile<T>(title: string, f: () => Promise<T>, options?: BusySignalOptions): Promise<T>

  /**
   * Activates the busy signal. Set the title in the returned BusySignal object (you can update the title multiple
   * times) and dispose it when done.
   *
   * @param title Name of the busy signal to activate
   * @param options Options for this signal
   */
  reportBusy(title: string, options?: BusySignalOptions): BusyMessage

  /**
   * @summary This is a no-op.
   *
   * When someone consumes the busy service, they get back a
   * reference to the single shared instance, so disposing of it would be wrong.
   */
  dispose(): void
}

/** @summary Represents a particular busy signal. */
export interface BusyMessage {
  /**
   * @param title New title for the signal.
   * @summary Set or update the title of a signal.
   */
  setTitle(title: string): void

  /** @summary Dispose of the signal when done to make it go away. */
  dispose(): void
}

/** @summary `busy-signal` service. */
export interface BusySignalRegistry {
  /** @summary Creates a `busy-signal` provider and adds it to the registry. */
  create(): BusySignalProvider
}

/** @summary `busy-signal` service. */
export interface BusySignalProvider {
  /**
   * @param message Name of the signal to notify regarding its addition.
   * @summary Fires a `did-add` event.
   */
  add(message: string): void

  /**
   * @param message Name of the signal to notify regarding its removal.
   * @summary Fires a `did-remove` event.
   */
  remove(message: string): void

  /** @summary Fires a `did-clear` event. */
  clear(): void

  /** @summary Fires a `did-dispose` event and disposes of subscriptions. */
  dispose(): void
}
