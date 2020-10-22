/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 */

/**
 * Private Classes
 */

// Octicons v4.4.0. List extracted from the atom-styleguide package.
type atom$Octicon = 'alert' | 'alignment-align' | 'alignment-aligned-to' | 'alignment-unalign' |
  'arrow-down' | 'arrow-left' | 'arrow-right' | 'arrow-small-down' | 'arrow-small-left' |
  'arrow-small-right' | 'arrow-small-up' | 'arrow-up' | 'beaker' | 'beer' | 'bell' | 'bold' |
  'book' | 'bookmark' | 'briefcase' | 'broadcast' | 'browser' | 'bug' | 'calendar' | 'check' |
  'checklist' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'circle-slash' |
  'circuit-board' | 'clippy' | 'clock' | 'cloud-download' | 'cloud-upload' | 'code' | 'color-mode' |
  'comment' | 'comment-add' | 'comment-discussion' | 'credit-card' | 'dash' | 'dashboard' |
  'database' | 'desktop-download' | 'device-camera' | 'device-camera-video' | 'device-desktop' |
  'device-mobile' | 'diff' | 'diff-added' | 'diff-ignored' | 'diff-modified' | 'diff-removed' |
  'diff-renamed' | 'ellipses' | 'ellipsis' | 'eye' | 'eye-unwatch' | 'eye-watch' | 'file' |
  'file-add' | 'file-binary' | 'file-code' | 'file-directory' | 'file-directory-create' |
  'file-media' | 'file-pdf' | 'file-submodule' | 'file-symlink-directory' | 'file-symlink-file' |
  'file-text' | 'file-zip' | 'flame' | 'fold' | 'gear' | 'gift' | 'gist' | 'gist-fork' |
  'gist-new' | 'gist-private' | 'gist-secret' | 'git-branch' | 'git-branch-create' |
  'git-branch-delete' | 'git-commit' | 'git-compare' | 'git-fork-private' | 'git-merge' |
  'git-pull-request' | 'git-pull-request-abandoned' | 'globe' | 'grabber' | 'graph' | 'heart' |
  'history' | 'home' | 'horizontal-rule' | 'hourglass' | 'hubot' | 'inbox' | 'info' |
  'issue-closed' | 'issue-opened' | 'issue-reopened' | 'italic' | 'jersey' | 'jump-down' |
  'jump-left' | 'jump-right' | 'jump-up' | 'key' | 'keyboard' | 'law' | 'light-bulb' | 'link' |
  'link-external' | 'list-ordered' | 'list-unordered' | 'location' | 'lock' | 'log-in' | 'log-out' |
  'logo-gist' | 'logo-github' | 'mail' | 'mail-read' | 'mail-reply' | 'mark-github' | 'markdown' |
  'megaphone' | 'mention' | 'microscope' | 'milestone' | 'mirror' | 'mirror-private' |
  'mirror-public' | 'mortar-board' | 'move-down' | 'move-left' | 'move-right' | 'move-up' | 'mute' |
  'no-newline' | 'octoface' | 'organization' | 'package' | 'paintcan' | 'pencil' | 'person' |
  'person-add' | 'person-follow' | 'pin' | 'playback-fast-forward' | 'playback-pause' |
  'playback-play' | 'playback-rewind' | 'plug' | 'plus-small' | 'plus' | 'podium' |
  'primitive-dot' | 'primitive-square' | 'pulse' | 'puzzle' | 'question' | 'quote' | 'radio-tower' |
  'remove-close' | 'reply' | 'repo' | 'repo-clone' | 'repo-create' | 'repo-delete' |
  'repo-force-push' | 'repo-forked' | 'repo-pull' | 'repo-push' | 'repo-sync' | 'rocket' | 'rss' |
  'ruby' | 'screen-full' | 'screen-normal' | 'search' | 'search-save' | 'server' | 'settings' |
  'shield' | 'sign-in' | 'sign-out' | 'smiley' | 'split' | 'squirrel' | 'star' | 'star-add' |
  'star-delete' | 'steps' | 'stop' | 'sync' | 'tag' | 'tag-add' | 'tag-remove' | 'tasklist' |
  'telescope' | 'terminal' | 'text-size' | 'three-bars' | 'thumbsdown' | 'thumbsup' | 'tools' |
  'trashcan' | 'triangle-down' | 'triangle-left' | 'triangle-right' | 'triangle-up' | 'type-array'|
  'type-boolean'| 'type-class'| 'type-constant'| 'type-constructor'| 'type-enum'| 'type-field'|
  'type-file'| 'type-function'| 'type-interface'| 'type-method'| 'type-module'| 'type-namespace'|
  'type-number'| 'type-package'| 'type-property'| 'type-string'| 'type-variable' | 'unfold' |
  'unmute' | 'unverified' | 'verified' | 'versions' | 'watch' | 'x' | 'zap';

type atom$PaneLocation = 'left' | 'right' | 'bottom' | 'center';

import { Color } from "atom"
export type atom$Color = Color;

import { Model } from "atom"
export type atom$Model = Model;

import { Package } from "atom"
export type atom$Package = Package;

/**
 * Essential Classes
 */
import { CustomEvent } from "atom"
export type atom$CustomEvent = CustomEvent;

import { CommandRegistry } from "atom"
export type atom$CommandRegistry = CommandRegistry;

declare class atom$CompositeDisposable {
  constructor(...disposables: Array<IDisposable>);
  dispose(): void;

  add(...disposables: Array<IDisposable>): void;
  remove(disposable: IDisposable): void;
  clear(): void;
}

type atom$ConfigParams = {
  saveCallback?: (arg0: Object) => void;
  mainSource?: string;
  projectHomeSchema?: atom$ConfigSchema;
};

type atom$ConfigType =
  | 'boolean'
  | 'string'
  | 'integer'
  | 'number'
  | 'array'
  | 'object'
  | 'color'
  | 'any';

type atom$ConfigSchema = {
  default?: unknown;
  description?: string;
  enum?: Array<string | {value: string; description: string}>;
  maximum?: number;
  minimum?: number;
  properties?: Object;
  title?: string;
  type: Array<atom$ConfigType> | atom$ConfigType;
};

declare class atom$Config {
  defaultSettings: Object;
  settings: Object;

  // Config Subscription
  observe(
    keyPath: string,
    optionsOrCallback?:
      | {scope?: atom$ScopeDescriptorLike}
      | ((value: unknown) => void),
    callback?: (value: unknown) => unknown,
  ): IDisposable;

  onDidChange(
    keyPathOrCallback:
      | string
      | ((event: {oldValue: unknown; newValue: unknown}) => unknown),
    optionsOrCallback?:
      | {scope?: atom$ScopeDescriptorLike}
      | ((event: {oldValue: unknown; newValue: unknown}) => unknown),
    callback?: (event: {oldValue: unknown; newValue: unknown}) => unknown,
  ): IDisposable;

  // Managing Settings
  get(
    keyPath?: string,
    options?: {
      excludeSources?: Array<string>;
      sources?: Array<string>;
      scope?: atom$ScopeDescriptorLike;
    },
  ): unknown;

  set(
    keyPath: string,
    value: unknown | null | undefined,
    options?: {
      scopeSelector?: string;
      source?: string;
    },
  ): boolean;

  unset(
    keyPath: string,
    options?: {
      scopeSelector?: string;
      source?: string;
    },
  ): void;

  getUserConfigPath(): string;

  // Undocumented Methods
  constructor(params?: atom$ConfigParams);
  getRawValue(
    keyPath: string | null | undefined,
    options: {excludeSources?: string; sources?: string},
  ): unknown;
  getSchema(keyPath: string): atom$ConfigSchema;
  save(): void;
  setRawValue(keyPath: string, value: unknown): void;
  setSchema(keyPath: string, schema: atom$ConfigSchema): void;
  removeAtKeyPath(
    keyPath: string | null | undefined,
    value: unknown | null | undefined,
  ): unknown;

  // Used by nuclide-config to set the initial settings from disk
  resetUserSettings(newSettings: Object, options?: {source?: string}): void;
}

declare class atom$Cursor {
  // Cursor Marker
  marker: atom$Marker;
  editor: atom$TextEditor;

  // Event Subscription
  onDidChangePosition(
    callback: (event: {
      oldBufferPosition: atom$Point;
      oldScreenPosition: atom$Point;
      newBufferPosition: atom$Point;
      newScreenPosition: atom$Point;
      textChanged: boolean;
      Cursor: atom$Cursor;
    }) => unknown,
  ): IDisposable;

  // Managing Cursor Position
  getBufferRow(): number;
  getBufferColumn(): number;
  getBufferPosition(): atom$Point;

  // Cursor Position Details
  // Moving the Cursor
  moveUp(rowCount: number, arg1: {moveToEndOfSelection?: boolean}): void;
  moveDown(rowCount: number, arg1: {moveToEndOfSelection?: boolean}): void;

  // Local Positions and Ranges
  getCurrentWordBufferRange(options?: {wordRegex: RegExp}): atom$Range;
  getCurrentWordPrefix(): string;

  // Visibility
  // Comparing to another cursor
  // Utilities
  wordRegExp(options?: {includeNonWordCharacters: boolean}): RegExp;
}

declare class atom$Decoration {
  destroy(): void;
  onDidChangeProperties(
    callback: (event: {
      oldProperties: Object;
      newProperties: Object;
    }) => unknown,
  ): IDisposable;
  onDidDestroy(callback: () => unknown): IDisposable;
  getMarker(): atom$Marker;
  getProperties(): Object;
  setProperties(properties: unknown): void;
}

declare class atom$DisplayMarkerLayer {
  destroy(): void;
  clear(): void;
  isDestroyed(): boolean;
  markBufferPosition(
    position: atom$PointLike,
    options?: MarkerOptions,
  ): atom$Marker;
  markBufferRange(
    range: atom$Range | atom$RangeLike,
    options?: MarkerOptions,
  ): atom$Marker;
  findMarkers(options: MarkerOptions): Array<atom$Marker>;
  getMarkers(): Array<atom$Marker>;
  onDidUpdate(callback: () => unknown): IDisposable;
}

declare class atom$LayerDecoration {
  destroy(): void;
  isDestroyed(): boolean;
  getProperties(): Object;
  setProperties(properties: unknown): void;
  setPropertiesForMarker(marker: atom$Marker, properties: unknown): void;
}

declare class atom$Disposable {
  constructor(disposalAction?: (...args: Array<any>) => any);
  disposed: boolean;
  dispose(): void;
}

declare class atom$Emitter {
  onEventHandlerException(error: any): IDisposable;
  dispose(): void;
  on(name: string, callback: (v: any) => unknown): IDisposable;
  once(name: string, callback: (v: any) => unknown): IDisposable;
  preempt(name: string, callback: (v: any) => void): IDisposable;
  // This is a flow hack to prevent emitting more than one value.
  // `EventEmitter` allows emitting any number of values - making this a land
  // mine, since we tend to think of `emit` as interchangeable.
  // This hack only works if the extra value is not `undefined`, so this isn't
  // full-proof, but it works for most cases.
  emit(name: string, value: any, ...no_extra_args_allowed: Array<void>): void;
}

declare class atom$Gutter {
  name: string;
  destroy(): void;
  decorateMarker(
    marker: atom$Marker,
    options?: {type?: string; class?: string; item?: Object | HTMLElement},
  ): atom$Decoration;
  show(): void;
  hide(): void;
  onDidDestroy(callback: () => void): IDisposable;
}

declare type atom$MarkerChangeEvent = {
  oldHeadScreenPosition: atom$Point;
  newHeadScreenPosition: atom$Point;
  oldTailScreenPosition: atom$Point;
  newTailScreenPosition: atom$Point;

  oldHeadBufferPosition: atom$Point;
  newHeadBufferPosition: atom$Point;
  oldTailBufferPosition: atom$Point;
  newTailBufferPosition: atom$Point;

  isValid: boolean;
  textChanged: boolean;
};

declare class atom$Marker {
  destroy(): void;
  getBufferRange(): atom$Range;
  getStartBufferPosition(): atom$Point;
  onDidChange(
    callback: (event: atom$MarkerChangeEvent) => unknown,
  ): IDisposable;
  isValid(): boolean;
  isDestroyed(): boolean;
  onDidDestroy(callback: () => unknown): IDisposable;
  getScreenRange(): atom$Range;
  setBufferRange(range: atom$RangeLike, properties?: {reversed: boolean}): void;
  id: number;
}

declare class atom$ServiceHub {
  provide<T>(keyPath: string, version: string, service: T): IDisposable;
  consume<T>(
    keyPath: string,
    versionRange: string,
    callback: (provider: T) => unknown,
  ): IDisposable;
}

type atom$PackageMetadata = {
  name: string;
  version: string;
};

declare class atom$PackageManager {
  readonly initialPackagesActivated: boolean;

  // Event Subscription
  onDidLoadInitialPackages(callback: () => void): IDisposable;
  onDidActivateInitialPackages(callback: () => void): IDisposable;
  onDidActivatePackage(callback: (pkg: atom$Package) => unknown): IDisposable;
  onDidDeactivatePackage(callback: (pkg: atom$Package) => unknown): IDisposable;
  onDidLoadPackage(callback: (pkg: atom$Package) => unknown): IDisposable;
  onDidUnloadPackage(callback: (pkg: atom$Package) => unknown): IDisposable;
  onDidTriggerActivationHook(
    activationHook: string,
    callback: () => unknown,
  ): IDisposable;

  // Package system data
  getApmPath(): string;
  getPackageDirPaths(): Array<string>;

  // General package data
  resolvePackagePath(name: string): string | null | undefined;
  isBundledPackage(name: string): boolean;

  // Enabling and disabling packages
  enablePackage(name: string): atom$Package | null | undefined;
  disablePackage(name: string): atom$Package | null | undefined;
  isPackageDisabled(name: string): boolean;

  // Accessing active packages
  getActivePackage(name: string): atom$Package | null | undefined;
  getActivePackages(): Array<atom$Package>;
  isPackageActive(name: string): boolean;
  hasActivatedInitialPackages(): boolean;

  // Activating and deactivating packages
  activatePackage(name: string): Promise<atom$Package>;

  // Accessing loaded packages
  getLoadedPackage(name: string): atom$Package | null | undefined;
  getLoadedPackages(): Array<atom$Package>;
  isPackageLoaded(name: string): boolean;
  hasLoadedInitialPackages(): boolean;

  // Accessing available packages
  getAvailablePackageNames(): Array<string>;
  getAvailablePackageMetadata(): Array<atom$PackageMetadata>;

  // (Undocumented.)
  activate(): Promise<any>;
  deactivatePackages(): Promise<void>;
  deactivatePackage(
    name: string,
    suppressSerialization?: boolean,
  ): Promise<void>;
  emitter: atom$Emitter;
  loadedPackages: {
    [packageName: string]: atom$Package;
  };
  loadPackage(name: string): void;
  loadPackages(): void;
  serializePackage(pkg: atom$Package): void;
  serviceHub: atom$ServiceHub;
  packageDirPaths: Array<string>;
  triggerActivationHook(hook: string): void;
  triggerDeferredActivationHooks(): void;
  unloadPackage(name: string): void;
  unloadPackages(): void;
}

declare class atom$StyleManager {
  // Event Subscription

  // Reading Style Elements
  getStyleElements(): Array<HTMLStyleElement>;

  // Paths
  getUserStyleSheetPath(): string;

  // (Undocumented.)
  addStyleSheet(
    source: string,
    params: {
      sourcePath?: string;
      context?: boolean;
      priority?: number;
      skipDeprecatedSelectorsTransformation?: boolean;
    },
  ): IDisposable;
}

type atom$PaneSplitParams = {
  copyActiveItem?: boolean;
  items?: Array<Object>;
};

type atom$PaneSplitOrientation = 'horizontal' | 'vertical';
type atom$PaneSplitSide = 'before' | 'after';

// Undocumented class
declare class atom$applicationDelegate {
  focusWindow(): Promise<unknown>;
  open(params: {
    pathsToOpen: Array<string>;
    newWindow?: boolean;
    devMode?: boolean;
    safeMode?: boolean;
  }): void;

  // Used by nuclide-config to replicate atom.config saveCallback
  setUserSettings(
    config: atom$Config,
    configFilePath: string,
  ): Promise<unknown>;
}

type atom$PaneParams = {
  activeItem?: Object;
  applicationDelegate: atom$applicationDelegate;
  focused?: boolean;
  container: Object;
  config: atom$Config;
  notificationManager: atom$NotificationManager;
  deserializerManager: atom$DeserializerManager;
  items?: Array<Object>;
  itemStackIndices?: Array<number>;
  flexScale?: number;
};

declare class atom$Pane {
  // Items
  addItem(item: Object, options?: {index?: number; pending?: boolean}): Object;
  getItems(): Array<Object>;
  getActiveItem(): Object | null | undefined;
  itemAtIndex(index: number): Object | null | undefined;
  getActiveItemIndex(): number;
  activateItem(item: Object): Object | null | undefined;
  activateItemAtIndex(index: number): void;
  moveItemToPane(item: Object, pane: atom$Pane, index: number): void;
  destroyItem(item: Object, force?: boolean): Promise<boolean>;
  itemForURI(uri: string): Object;

  // Event subscriptions.
  onDidAddItem(cb: (event: {item: Object; index: number}) => void): IDisposable;
  onDidRemoveItem(
    cb: (event: {item: Object; index: number}) => void,
  ): IDisposable;
  onWillRemoveItem(
    cb: (event: {item: Object; index: number}) => void,
  ): IDisposable;
  onDidDestroy(cb: () => unknown): IDisposable;
  onDidChangeFlexScale(cb: (newFlexScale: number) => void): IDisposable;
  onWillDestroy(cb: () => void): IDisposable;
  observeActiveItem(cb: (item: Object | null | undefined) => void): IDisposable;

  // Lifecycle
  isActive(): boolean;
  activate(): void;
  destroy(): void;
  isDestroyed(): void;

  // Splitting
  splitLeft(params?: atom$PaneSplitParams): atom$Pane;
  splitRight(params?: atom$PaneSplitParams): atom$Pane;
  splitUp(params?: atom$PaneSplitParams): atom$Pane;
  splitDown(params?: atom$PaneSplitParams): atom$Pane;
  split(
    orientation: atom$PaneSplitOrientation,
    side: atom$PaneSplitSide,
    params?: atom$PaneSplitParams,
  ): atom$Pane;

  // Undocumented Methods
  constructor(params: atom$PaneParams);
  getPendingItem(): atom$PaneItem;
  setPendingItem(item: atom$PaneItem): void;
  clearPendingItem(): void;
  getFlexScale(): number;
  getElement(): HTMLElement;
  getParent(): Object;
  removeItem(item: Object, moved: boolean | null | undefined): void;
  setActiveItem(item: Object): Object;
  setFlexScale(flexScale: number): number;
  getContainer(): atom$PaneContainer;
  getActiveEditor(): atom$TextEditor | null | undefined;

  element: HTMLElement;
}

declare interface atom$PaneItem {
  // These are all covariant, meaning that these props are read-only. Therefore we can assign an
  // object with more strict requirements to an variable of this type.
  readonly getTitle: () => string;
  readonly getLongTitle?: () => string;
  readonly getIconName?: () => string;
  readonly getURI?: () => string | null | undefined;
  readonly onDidChangeIcon?: (cb: (icon: string) => void) => IDisposable;
  readonly onDidChangeTitle?: (cb: (title: string) => void) => IDisposable;
  readonly onDidTerminatePendingState?: (arg0: () => unknown) => IDisposable;
  readonly serialize?: () => Object;
  readonly terminatePendingState?: () => void;
}

// Undocumented class
declare class atom$PaneAxis {
  getFlexScale(): number;
  setFlexScale(flexScale: number): number;
  getItems(): Array<Object>;
}

// Undocumented class
// Note that this is not the same object returned by `atom.workspace.getPaneContainers()`. (Those
// are typed here as AbstractPaneContainers and, in the current implementation, wrap these.)
declare class atom$PaneContainer {
  constructor(arg0: {
    config: atom$Config;
    applicationDelegate: atom$applicationDelegate;
    notificationManager: atom$NotificationManager;
    deserializerManager: atom$DeserializerManager;
  });
  destroy(): void;
  getActivePane(): atom$Pane;
  getActivePaneItem(): Object | null | undefined;
  getLocation(): atom$PaneLocation;
  getPanes(): Array<atom$Pane>;
  getPaneItems(): Array<atom$PaneItem>;
  observePanes(cb: (pane: atom$Pane) => void): IDisposable;
  onDidAddPane(cb: (event: {pane: atom$Pane}) => void): IDisposable;
  onDidDestroyPane(cb: (event: {pane: atom$Pane}) => void): IDisposable;
  onWillDestroyPane(cb: (event: {pane: atom$Pane}) => void): IDisposable;
  onDidAddPaneItem(cb: (item: atom$PaneItem) => void): IDisposable;
  onDidDestroyPaneItem(cb: (item: atom$Pane) => void): IDisposable;
  paneForItem(item: Object): atom$Pane | null | undefined;
  serialize(): Object;
}

declare class atom$Panel {
  // Construction and Destruction
  destroy(): void;

  // Event Subscription
  onDidChangeVisible(callback: (visible: boolean) => any): IDisposable;
  onDidDestroy(callback: (panel: atom$Panel) => any): IDisposable;

  // Panel Details
  getElement(): HTMLElement;
  getItem(): any;
  getPriority(): number;
  isVisible(): boolean;
  hide(): void;
  show(): void;
}

type atom$PointObject = {row: number; column: number};

type atom$PointLike = atom$Point | [number, number] | atom$PointObject;

declare class atom$Point {
  fromObject(
    object: atom$PointLike,
    copy: boolean | null | undefined,
  ): atom$Point;
  constructor(row: number, column: number);
  row: number;
  column: number;
  copy(): atom$Point;
  negate(): atom$Point;

  // Comparison
  min(point1: atom$PointLike, point2: atom$PointLike): atom$Point;
  compare(other: atom$PointLike): -1 | 0 | 1;
  isEqual(otherRange: atom$PointLike): boolean;
  isLessThan(other: atom$PointLike): boolean;
  isLessThanOrEqual(other: atom$PointLike): boolean;
  isGreaterThan(other: atom$PointLike): boolean;
  isGreaterThanOrEqual(other: atom$PointLike): boolean;

  // Operations
  translate(other: atom$PointLike): atom$Point;

  // Conversion
  serialize(): [number, number];
  toArray(): [number, number];
}

type atom$RangeObject = {
  start: atom$PointObject;
  end: atom$PointObject;
};

type atom$RangeLike =
  | atom$Range
  | atom$RangeObject // TODO: Flow doesn't really handle the real signature below...
  | [atom$PointLike, atom$PointLike]
  | {
      start: atom$PointLike;
      end: atom$PointLike;
    };

declare class atom$Range {
  fromObject(object: atom$RangeLike, copy?: boolean): atom$Range;
  fromPointWithDelta(
    startPoint: atom$PointLike,
    rowDelta: number,
    columnDelta: number,
  ): atom$Range;

  constructor(pointA: atom$PointLike, pointB: atom$PointLike);
  compare(other: atom$Range): number;
  start: atom$Point;
  end: atom$Point;
  isEmpty(): boolean;
  isEqual(otherRange: atom$RangeLike): boolean;
  isSingleLine(): boolean;
  intersectsWith(otherRange: atom$RangeLike, exclusive?: boolean): boolean;
  containsPoint(point: atom$PointLike, exclusive?: boolean): boolean;
  containsRange(other: atom$Range, exclusive?: boolean): boolean;
  union(other: atom$Range): atom$Range;
  serialize(): Array<Array<number>>;
  translate(startDelta: atom$PointLike, endDelta?: atom$PointLike): atom$Range;
  getRowCount(): number;
  getRows(): Array<number>;
}

type RawStatusBarTile = {
  item: HTMLElement;
  priority: number;
};

type atom$StatusBarTile = {
  getPriority(): number;
  getItem(): HTMLElement;
  destroy(): void;
};

declare class atom$ScopeDescriptor {
  constructor(object: {scopes: Array<string>});
  getScopesArray(): Array<string>;
}

type atom$ScopeDescriptorLike = atom$ScopeDescriptor | Array<string>;

/**
 * This API is defined at https://github.com/atom/status-bar.
 */
declare class atom$StatusBar {
  addLeftTile(tile: RawStatusBarTile): atom$StatusBarTile;
  addRightTile(tile: RawStatusBarTile): atom$StatusBarTile;
  getLeftTiles(): Array<atom$StatusBarTile>;
  getRightTiles(): Array<atom$StatusBarTile>;
}

// https://github.com/atom/atom/blob/v1.9.0/src/text-editor-registry.coffee
declare class atom$TextEditorRegistry {
  add(editor: atom$TextEditor): IDisposable;
  remove(editor: atom$TextEditor): boolean;
  observe(callback: (editor: atom$TextEditor) => void): IDisposable;
  build: (params: atom$TextEditorParams) => atom$TextEditor;

  // Private
  editors: Set<atom$TextEditor>;
}

declare class atom$ThemeManager {
  // Event Subscription

  /**
   * As recent as Atom 1.0.10, the implementation of this method was:
   *
   * ```
   * onDidChangeActiveThemes: (callback) ->
   *   @emitter.on 'did-change-active-themes', callback
   *   @emitter.on 'did-reload-all', callback # TODO: Remove once deprecated pre-1.0 APIs are gone
   * ```
   *
   * Due to the nature of CoffeeScript, onDidChangeActiveThemes returns a Disposable even though it
   * is not documented as doing so. However, the Disposable that it does return removes the
   * subscription on the 'did-reload-all' event (which is supposed to be deprecated) rather than the
   * 'did-change-active-themes' one.
   */
  onDidChangeActiveThemes(callback: () => unknown): IDisposable;

  // Accessing Loaded Themes
  getLoadedThemeNames(): Array<string>;
  getLoadedThemes(): Array<unknown>; // TODO: Define undocumented ThemePackage class.

  // Accessing Active Themes
  getActiveThemeNames(): Array<string>;
  getActiveThemes(): Array<unknown>; // TODO: Define undocumented ThemePackage class.

  // Managing Enabled Themes
  getEnabledThemeNames(): Array<string>;

  // Private
  activateThemes(): Promise<any>;
  requireStylesheet(stylesheetPath: string): IDisposable;
}

type atom$TooltipsPlacementOption =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'auto';

type atom$TooltipsAddOptions = {
  title?: string;
  item?: HTMLElement;
  keyBindingCommand?: string;
  keyBindingTarget?: HTMLElement;
  animation?: boolean;
  container?: string | false;
  delay?: number | {show: number; hide: number};
  placement?:
    | atom$TooltipsPlacementOption
    | (() => atom$TooltipsPlacementOption);
  trigger?: string;
};

type atom$Tooltip = {
  show(): void;
  hide(): void;
  getTooltipElement(): HTMLElement;
};

declare class atom$TooltipManager {
  tooltips: Map<HTMLElement, Array<atom$Tooltip>>;
  add(target: HTMLElement, options: atom$TooltipsAddOptions): IDisposable;
  findTooltips(arg0: HTMLElement): Array<atom$Tooltip>;
}

type InsertTextOptions = {
  select: boolean;
  autoIndent: boolean;
  autoIndentNewline: boolean;
  autoDecreaseIndent: boolean;
  normalizeLineEndings: boolean | null | undefined;
  undo: string;
};

type DecorateMarkerParams =
  | {
      type: 'line';
      class: string;
      onlyHead?: boolean;
      onlyEmpty?: boolean;
      onlyNonEmpty?: boolean;
    }
  | {
      type: 'gutter';
      item?: HTMLElement;
      class?: string;
      onlyHead?: boolean;
      onlyEmpty?: boolean;
      onlyNonEmpty?: boolean;
      gutterName?: string;
    }
  | {
      type: 'highlight';
      class?: string;
      gutterName?: string;
    }
  | {
      type: 'overlay';
      item: Object;
      position?: 'head' | 'tail'; // Defaults to 'head' when unspecified.
    }
  | {
      type: 'block';
      item: HTMLElement;
      position?: 'before' | 'after'; // Defaults to 'before' when unspecified.
    }
  | {
      type: 'line-number';
      class?: string;
    };

type ChangeCursorPositionEvent = {
  oldBufferPosition: atom$Point;
  oldScreenPosition: atom$Point;
  newBufferPosition: atom$Point;
  newScreenPosition: atom$Point;
  textChanged: boolean;
  cursor: atom$Cursor;
};

type MarkerOptions = {
  reversed?: boolean;
  tailed?: boolean;
  invalidate?: 'never' | 'surround' | 'overlap' | 'inside' | 'touch';
  exclusive?: boolean;
};

type atom$ChangeSelectionRangeEvent = {
  oldBufferRange: atom$Range;
  oldScreenRange: atom$Range;
  newBufferRange: atom$Range;
  newScreenRange: atom$Range;
  selection: atom$Selection;
};

declare class atom$TextEditor extends atom$Model {
  id: number;
  verticalScrollMargin: number;

  // Event Subscription
  onDidChange(callback: () => void): IDisposable;
  onDidChangePath(callback: (newPath: string) => unknown): IDisposable;
  onDidStopChanging(callback: () => unknown): IDisposable;
  onDidChangeCursorPosition(
    callback: (event: ChangeCursorPositionEvent) => unknown,
  ): IDisposable;
  onDidAddCursor(callback: (cursor: atom$Cursor) => unknown): IDisposable;
  onDidRemoveCursor(callback: (cursor: atom$Cursor) => unknown): IDisposable;
  onDidDestroy(callback: () => unknown): IDisposable;
  onDidSave(callback: (event: {path: string}) => unknown): IDisposable;
  getBuffer(): atom$TextBuffer;
  observeGrammar(callback: (grammar: atom$Grammar) => unknown): IDisposable;
  onWillInsertText(
    callback: (event: {cancel: () => void; text: string}) => void,
  ): IDisposable;
  // Note that the range property of the event is undocumented.
  onDidInsertText(
    callback: (event: {text: string; range: atom$Range}) => unknown,
  ): IDisposable;
  onDidChangeSoftWrapped(
    callback: (softWrapped: boolean) => unknown,
  ): IDisposable;
  onDidChangeSelectionRange(
    callback: (event: atom$ChangeSelectionRangeEvent) => unknown,
  ): IDisposable;
  observeSelections(
    callback: (selection: atom$Selection) => unknown,
  ): IDisposable;
  onDidAddSelection(
    callback: (selection: atom$Selection) => unknown,
  ): IDisposable;

  // File Details
  getTitle: () => string;
  getLongTitle(): string;

  /**
   * If you open Atom via Spotlight such that it opens with a tab named
   * "untitled" that does not correspond to a file on disk, this will return
   * null.
   */
  getPath(): string | null | undefined;
  getURI: () => string | null | undefined;
  insertNewline(): void;
  isModified: () => boolean;
  isEmpty(): boolean;
  getEncoding(): buffer$Encoding;
  setEncoding(encoding: string): void;
  getTabLength(): number;
  getSoftTabs(): boolean;
  getIconName(): string;
  onDidChangeIcon(cb: (icon: string) => void): IDisposable;
  onDidChangeTitle(cb: (title: string) => void): IDisposable;

  // File Operations
  save(): Promise<void>;
  // DO NOT USE: Doesn't work with remote text buffers!
  // saveAs(filePath: string): void,

  // Reading Text
  getText(): string;
  getTextInBufferRange(range: atom$RangeLike): string;
  getLineCount(): number;
  getScreenLineCount(): number;
  getLastScreenRow(): number;

  // Mutating Text
  setText(text: string, options?: InsertTextOptions): void;
  setTextInBufferRange(
    range: atom$RangeLike,
    text: string,
    options?: {
      normalizeLineEndings?: boolean;
      undo?: string;
    },
  ): atom$Range;
  insertText(text: string): Array<atom$Range> | false;
  mutateSelectedText(
    fn: (selection: atom$Selection, index: number) => void,
  ): void;
  delete: () => void;
  backspace: () => void;
  duplicateLines: () => void;

  // History
  createCheckpoint(): atom$TextBufferCheckpoint;
  revertToCheckpoint(checkpoint: atom$TextBufferCheckpoint): boolean;
  terminatePendingState(): void;
  transact(fn: () => unknown, _: void): void;
  transact(groupingInterval: number, fn: () => unknown): void;
  onDidTerminatePendingState(arg0: () => unknown): IDisposable;

  // TextEditor Coordinates
  screenPositionForBufferPosition(
    bufferPosition: atom$PointLike,
    options?: {
      wrapBeyondNewlines?: boolean;
      wrapAtSoftNewlines?: boolean;
      screenLine?: boolean;
    },
  ): atom$Point;
  bufferPositionForScreenPosition(
    screenPosition: atom$PointLike,
    options?: {
      wrapBeyondNewlines?: boolean;
      wrapAtSoftNewlines?: boolean;
      screenLine?: boolean;
    },
  ): atom$Point;
  getEofBufferPosition(): atom$Point;
  getVisibleRowRange(): [number, number];
  bufferRowForScreenRow(screenRow: number): number;
  screenRangeForBufferRange(bufferRange: atom$RangeLike): atom$Range;
  bufferRangeForBufferRow(bufferRow: number): atom$Range;

  // Decorations
  decorateMarker(
    marker: atom$Marker,
    decorationParams: DecorateMarkerParams,
  ): atom$Decoration;
  decorateMarkerLayer(
    markerLayer: atom$DisplayMarkerLayer,
    decorationParams: DecorateMarkerParams,
  ): atom$LayerDecoration;
  decorationsForScreenRowRange(
    startScreenRow: number,
    endScreenRow: number,
  ): {
    [markerId: string]: Array<Object>;
  };
  getDecorations(options?: {
    class?: string;
    type?: string;
  }): Array<atom$Decoration>;

  // Markers
  addMarkerLayer(): atom$DisplayMarkerLayer;
  getDefaultMarkerLayer(): atom$DisplayMarkerLayer;
  markBufferPosition(
    position: atom$PointLike,
    options?: MarkerOptions,
  ): atom$Marker;
  markBufferRange(range: atom$RangeLike, options?: MarkerOptions): atom$Marker;
  markScreenRange(range: atom$RangeLike, options?: MarkerOptions): atom$Marker;
  markScreenPosition(
    position: atom$PointLike,
    options?: MarkerOptions,
  ): atom$Marker;
  findMarkers(options: MarkerOptions): Array<atom$Marker>;
  getMarkerCount(): number;

  // Cursors
  getCursors(): Array<atom$Cursor>;
  setCursorBufferPosition(
    position: atom$PointLike,
    options?: {
      autoscroll?: boolean;
      wrapBeyondNewlines?: boolean;
      wrapAtSoftNewlines?: boolean;
      screenLine?: boolean;
    },
  ): void;
  getCursorBufferPosition(): atom$Point;
  getCursorBufferPositions(): Array<atom$Point>;
  getCursorScreenPosition(): atom$Point;
  getCursorScreenPositions(): Array<atom$Point>;
  getLastCursor(): atom$Cursor;
  addCursorAtBufferPosition(point: atom$PointLike): atom$Cursor;
  moveToBeginningOfLine(): void;
  moveToEndOfLine(): void;
  moveToBottom(): void;

  // Folds
  foldCurrentRow(): void;
  unfoldCurrentRow(): void;
  foldBufferRow(bufferRow: number): void;
  unfoldBufferRow(bufferRow: number): void;

  // Selections
  getLastSelection(): atom$Selection;
  getSelectedText(): string;
  selectAll(): void;
  getSelectedBufferRange(): atom$Range;
  getSelectedBufferRanges(): Array<atom$Range>;
  getSelections(): Array<atom$Selection>;
  selectToBufferPosition(point: atom$Point): void;
  setSelectedBufferRange(
    bufferRange: atom$RangeLike,
    options?: {
      reversed?: boolean;
      preserveFolds?: boolean;
    },
  ): void;
  setSelectedBufferRanges(
    bufferRanges: Array<atom$Range>,
    options?: {
      reversed?: boolean;
      preserveFolds?: boolean;
    },
  ): void;
  selectWordsContainingCursors(): void;

  // Folds
  unfoldAll(): void;

  // Searching and Replacing
  scanInBufferRange(
    regex: RegExp,
    range: atom$Range,
    iterator: (foundMatch: {
      match: unknown;
      matchText: string;
      range: atom$Range;
      stop: () => unknown;
      replace: (replaceWith: string) => unknown;
    }) => unknown,
  ): void;

  scan(
    regex: RegExp,
    iterator: (foundMatch: {
      match: RegExp$matchResult;
      matchText: string;
      range: atom$Range;
      stop: () => unknown;
      replace: (replaceWith: string) => unknown;
    }) => unknown,
  ): void;

  // Tab Behavior
  // Soft Wrap Behavior
  // Indentation
  indentationForBufferRow(bufferRow: number): number;
  setTabLength(tabLength: number): void;
  setSoftTabs(softTabs: boolean): void;

  lineTextForBufferRow(bufferRow: number): string;
  lineTextForScreenRow(screenRow: number): string;

  // Grammars
  getGrammar(): atom$Grammar;
  setGrammar(grammar: atom$Grammar | null | undefined): void;

  // Clipboard Operations
  pasteText: (options?: Object) => void;
  copySelectedText: () => void;

  // Managing Syntax Scopes
  getRootScopeDescriptor(): atom$ScopeDescriptor;
  scopeDescriptorForBufferPosition(
    bufferPosition: atom$PointLike,
  ): atom$ScopeDescriptor;

  // Gutter
  addGutter(options: {
    name: string;
    priority?: number;
    visible?: boolean;
  }): atom$Gutter;
  observeGutters(callback: (gutter: atom$Gutter) => void): IDisposable;
  getGutters(): Array<atom$Gutter>;
  gutterWithName(name: string): atom$Gutter | null | undefined;

  // Scrolling the TextEditor
  scrollToBufferPosition(
    position:
      | atom$Point
      | [number | null | undefined, number | null | undefined],
    options?: {center?: boolean},
  ): void;
  scrollToScreenPosition(
    position:
      | atom$Point
      | [number | null | undefined, number | null | undefined],
    options?: {center?: boolean},
  ): void;
  scrollToScreenRange(
    screenRange: atom$Range,
    options?: {clip?: boolean},
  ): void;
  scrollToCursorPosition(options?: {center?: boolean}): void;
  scrollToBottom(): void;
  scrollToTop(): void;

  // TextEditor Rendering
  getPlaceholderText(): string;
  setPlaceholderText(placeholderText: string): void;

  // This is undocumented, but Nuclide uses it in the AtomTextEditor wrapper.
  setLineNumberGutterVisible(lineNumberGutterVisible: boolean): void;

  // Editor Options
  setSoftWrapped(softWrapped: boolean): void;

  isFoldedAtBufferRow(row: number): boolean;
  getLastBufferRow(): number;

  // Undocumented Methods
  getElement(): atom$TextEditorElement;
  getDefaultCharWidth(): number;
  getLineHeightInPixels(): number;
  moveToTop(): void;
  tokenForBufferPosition(
    position:
      | atom$Point
      | [number | null | undefined, number | null | undefined],
  ): atom$Token;
  onDidConflict(callback: () => void): IDisposable;
  serialize(): Object;
  foldBufferRowRange(startRow: number, endRow: number): void;
  getNonWordCharacters(position?: atom$PointLike): string;
  scheduleComponentUpdate(): void;
}

/**
 * This is not part of the official Atom 1.0 API. Nevertheless, we need to reach into this object
 * via `atom$TextEditorElement` to do some things that we have no other way to do.
 */
declare class atom$TextEditorComponent {
  domNode: HTMLElement;
  scrollViewNode: HTMLElement;
  presenter: atom$TextEditorPresenter;
  refs: atom$TextEditorComponentRefs;
  linesComponent: atom$LinesComponent;
  // NOTE: This is typed as a property to allow overwriting.
  startCursorBlinking: () => void;
  stopCursorBlinking(): void;
  pixelPositionForScreenPosition(
    screenPosition: atom$Point,
    clip?: boolean,
  ): {top: number; left: number};
  screenPositionForMouseEvent(event: MouseEvent): atom$Point;
  pixelPositionForMouseEvent(
    event: MouseEvent,
    linesClientRect?: {
      top: number;
      left: number;
      bottom: number;
      right: number;
    },
  ): {top: number; left: number; bottom: number; right: number};
  invalidateBlockDecorationDimensions(decoration: atom$Decoration): void;
  element: atom$TextEditorElement;
  didFocus(): void;
  setScrollTop(scrollTop: number): void;
  getScrollTop(): number;

  setScrollLeft(scrollLeft: number): void;
  getScrollLeft(): number;
  updateSync(useScheduler?: boolean): void;
}

/**
 * This is not part of the official Atom 1.0 API. Nevertheless, we need to reach into this object
 * via `atom$TextEditorComponent` to do some things that we have no other way to do.
 */
declare class atom$TextEditorPresenter {
  startBlinkingCursors: () => void;
  stopBlinkingCursors(visible: boolean): void;
  updateLineNumberGutterState(): void;
}

/**
 * This is not part of the official Atom 1.0 API. Nevertheless, we need it to access
 * the deepest dom element receiving DOM events.
 */
declare class atom$LinesComponent {
  domNode: HTMLElement;
  getDomNode(): HTMLElement;
}

/**
 * This is not part of the official Atom 1.0 API. Nevertheless, we need it to access
 * the deepest dom element receiving DOM events.
 */
declare class atom$TextEditorComponentRefs {
  lineTiles: HTMLElement;
}

/**
 * This is not part of the official Atom 1.0 API, but it really should be. This is the element that
 * is returned when you run `atom.views.getView(<TextEditor>)`.
 */
declare class atom$TextEditorElement extends HTMLElement {
  component: atom$TextEditorComponent | null | undefined;
  getModel(): atom$TextEditor;
  setModel(model: atom$TextEditor): void;
  pixelPositionForBufferPosition(
    bufferPosition: atom$PointLike,
  ): {top: number; left: number};
  pixelPositionForScreenPosition(
    screenPosition: atom$Point,
  ): {
    left: number;
    top: number;
  };

  setScrollTop(scrollTop: number): void;
  getScrollTop(): number;

  setScrollLeft(scrollLeft: number): void;
  getScrollLeft(): number;

  getScrollHeight(): number;
  getHeight(): number;

  onDidChangeScrollTop(callback: (scrollTop: number) => unknown): IDisposable;
  onDidChangeScrollLeft(callback: (scrollLeft: number) => unknown): IDisposable;

  // Called when the editor is attached to the DOM.
  onDidAttach(callback: () => unknown): IDisposable;
  // Called when the editor is detached from the DOM.
  onDidDetach(callback: () => unknown): IDisposable;

  measureDimensions(): void;

  // Undocumented Methods

  // Returns a promise that resolves after the next update.
  getNextUpdatePromise(): Promise<void>;

  // `undefined` means no explicit width. `null` sets a zero width (which is almost certainly a
  // mistake) so we don't allow it.
  setWidth(width: number | void): void;
}

declare class atom$ViewProvider {
  modelConstructor: Function;
}

declare class atom$ViewRegistry {
  // Methods
  addViewProvider(
    modelConstructor: any,
    createView?: (...args: Array<any>) => HTMLElement | null | undefined,
  ): IDisposable;
  getView(textEditor: atom$TextEditor): atom$TextEditorElement;
  getView(notification: atom$Notification): HTMLElement;
  getView(gutter: atom$Gutter): HTMLElement;
  getView(panel: atom$Panel): HTMLElement;
  getView(workspace: atom$Workspace): HTMLElement;
  getView(object: Object): HTMLElement;
  providers: Array<atom$ViewProvider>;
}

type atom$WorkspaceAddPanelOptions = {
  item: Object;
  visible?: boolean;
  priority?: number;
  className?: string;
};

type atom$TextEditorParams = {
  buffer?: atom$TextBuffer;
  lineNumberGutterVisible?: boolean;
};

type DestroyPaneItemEvent = {
  item: atom$PaneItem;
  pane: atom$Pane;
  index: number;
};

type AddPaneItemEvent = {
  item: atom$PaneItem;
  pane: atom$Pane;
  index: number;
};

type OnDidOpenEvent = {
  uri: string;
  item: unknown;
  pane: atom$Pane;
  index: number;
};

type AddTextEditorEvent = {
  textEditor: atom$TextEditor;
  pane: atom$Pane;
  index: number;
};

type atom$WorkspaceOpenOptions = {
  activatePane?: boolean | null | undefined;
  activateItem?: boolean | null | undefined;
  initialLine?: number | null | undefined;
  initialColumn?: number | null | undefined;
  pending?: boolean | null | undefined;
  split?: string | null | undefined;
  searchAllPanes?: boolean | null | undefined;
  location?: atom$PaneLocation;
};

declare class atom$Workspace {
  // Event Subscription
  observePanes(cb: (pane: atom$Pane) => void): IDisposable;
  observeTextEditors(
    callback: (editor: atom$TextEditor) => unknown,
  ): IDisposable;
  observeActiveTextEditor(
    callback: (editor: atom$TextEditor | null | undefined) => unknown,
  ): IDisposable;
  onDidAddTextEditor(
    callback: (event: AddTextEditorEvent) => unknown,
  ): IDisposable;
  onDidChangeActivePaneItem(callback: (item: unknown) => unknown): IDisposable;
  onDidDestroyPaneItem(
    callback: (event: DestroyPaneItemEvent) => unknown,
  ): IDisposable;
  onDidAddPaneItem(callback: (event: AddPaneItemEvent) => unknown): IDisposable;
  observeActivePaneItem(
    callback: (item: unknown | null | undefined) => unknown,
  ): IDisposable;
  onDidStopChangingActivePaneItem(
    callback: (item: unknown | null | undefined) => unknown,
  ): IDisposable;
  observePaneItems(callback: (item: unknown) => unknown): IDisposable;
  onWillDestroyPaneItem(
    callback: (event: {item: unknown; pane: unknown; index: number}) => unknown,
  ): IDisposable;
  onDidOpen(callback: (event: OnDidOpenEvent) => unknown): IDisposable;

  getElement(): HTMLElement;

  // Opening
  open(
    uri?: string,
    options?: atom$WorkspaceOpenOptions,
  ): Promise<atom$TextEditor>;
  openURIInPane(
    uri?: string,
    pane: atom$Pane,
    options?: {
      initialLine?: number;
      initialColumn?: number;
      activePane?: boolean;
      searchAllPanes?: boolean;
    },
  ): Promise<atom$TextEditor>;
  isTextEditor(item: unknown | null | undefined): boolean;

  /* Optional method because this was added post-1.0. */
  buildTextEditor: (
    params: atom$TextEditorParams | null | undefined,
  ) => atom$TextEditor;

  /* Optional method because this was added in 1.9.0 */
  handleGrammarUsed?: (grammar: atom$Grammar) => void;
  reopenItem(): Promise<atom$TextEditor | null | undefined>;
  addOpener(callback: (uri: string) => any): IDisposable;
  hide(uriOrItem: string | Object): void;
  toggle(uriOrItem: string | Object): void;

  // Pane Containers
  getPaneContainers(): Array<atom$AbstractPaneContainer>;
  paneContainerForItem(
    item: unknown | null | undefined,
  ): atom$AbstractPaneContainer | null | undefined;

  // Pane Items
  getPaneItems(): Array<Object>;
  getActivePaneItem(): Object | null | undefined;
  getActivePaneContainer(): atom$PaneContainer;
  getTextEditors(): Array<atom$TextEditor>;
  getActiveTextEditor(): atom$TextEditor | null | undefined;
  createItemForURI(
    uri: string,
    options: atom$WorkspaceOpenOptions,
  ): atom$PaneItem;

  // Panes
  getPanes(): Array<atom$Pane>;
  getActivePane(): atom$Pane;
  activateNextPane(): boolean;
  activatePreviousPane(): boolean;
  paneForURI(uri: string): atom$Pane;
  paneForItem(item: unknown): atom$Pane | null | undefined;
  paneContainers: {
    [location in atom$PaneLocation]?: atom$AbstractPaneContainer
  };

  // Panels
  panelContainers: {
    [location: string]: atom$PanelContainer;
  };
  getBottomPanels(): Array<atom$Panel>;
  addBottomPanel(options: atom$WorkspaceAddPanelOptions): atom$Panel;
  getLeftPanels(): Array<atom$Panel>;
  addLeftPanel(options: atom$WorkspaceAddPanelOptions): atom$Panel;
  getRightPanels(): Array<atom$Panel>;
  addRightPanel(options: atom$WorkspaceAddPanelOptions): atom$Panel;
  getTopPanels(): Array<atom$Panel>;
  addTopPanel(options: atom$WorkspaceAddPanelOptions): atom$Panel;
  getModalPanels(): Array<atom$Panel>;
  addModalPanel(options: atom$WorkspaceAddPanelOptions): atom$Panel;
  getHeaderPanels(): Array<atom$Panel>;
  addHeaderPanel(options: atom$WorkspaceAddPanelOptions): atom$Panel;

  getLeftDock(): atom$Dock;
  getRightDock(): atom$Dock;
  getBottomDock(): atom$Dock;
  getCenter(): atom$WorkspaceCenter;

  // Searching and Replacing
  scan(
    regex: RegExp,
    options: {
      paths?: Array<string>;
      onPathsSearched?: (numSearched: number) => unknown;
      leadingContextLineCount?: number;
      trailingContextLineCount?: number;
    },
    iterator: (
      arg0:
        | {
            filePath: string;
            matches: Array<{
              leadingContextLines: Array<string>;
              lineText: string;
              lineTextOffset: number;
              range: atom$RangeLike;
              matchText: string;
              trailingContextLines: Array<string>;
            }>;
          }
        | null
        | undefined,
      arg1: Error,
    ) => unknown,
  ): Promise<string | null | undefined>;

  destroyActivePaneItemOrEmptyPane(): void;
  destroyActivePaneItem(): void;
}

declare class atom$AbstractPaneContainer {
  activate(): void;
  getLocation(): atom$PaneLocation;
  getElement(): HTMLElement;
  isVisible(): boolean;
  show(): void;
  hide(): void;
  getActivePane(): atom$Pane;
  getPanes(): Array<atom$Pane>;
  onDidAddPaneItem(arg0: (item: {item: Object}) => void): IDisposable;
  observePanes(cb: (pane: atom$Pane) => void): IDisposable;
  state: {
    size: number;
  };
}

declare class atom$Dock extends atom$AbstractPaneContainer {
  // This is a woefully incomplete list, items can be added as needed from
  // https://github.com/atom/atom/blob/master/src/dock.js
  toggle(): void;
}

declare class atom$WorkspaceCenter extends atom$AbstractPaneContainer {
  activate(): void;

  // Pane Items
  getPaneItems(): Array<atom$PaneItem>;
  getActivePaneItem(): atom$PaneItem | null | undefined;
  getTextEditors(): Array<atom$TextEditor>;
  getActiveTextEditor(): atom$TextEditor | null | undefined;

  observeActivePaneItem(
    callback: (arg0: atom$PaneItem) => unknown,
  ): IDisposable;
  onDidChangeActivePaneItem(callback: (item: unknown) => unknown): IDisposable;
  onDidAddTextEditor(
    callback: (item: {
      textEditor: atom$TextEditor;
      pane: atom$Pane;
      index: number;
    }) => unknown,
  ): IDisposable;
  // This should be removed soon anyway, it's currently deprecated.
  paneContainer: Object;
}

/**
 * Extended Classes
 */
declare class atom$BufferedNodeProcess {}

declare class atom$BufferedProcess {
  // Event Subscription
  onWillThrowError(
    callback: (errorObject: {error: Object; handle: unknown}) => unknown,
  ): IDisposable;
  // Helper Methods
  kill(): void;
}

declare class atom$Clipboard {
  // Methods
  write(text: string, metadata?: unknown): void;
  read(): string;
  readWithMetadata(): {
    metadata: unknown | null | undefined;
    text: string;
  };
}

declare class atom$ContextMenuManager {
  add(itemsBySelector: {
    [cssSelector: string]: Array<atom$ContextMenuItem>;
  }): IDisposable;
  itemSets: Array<atom$ContextMenuItemSet>;

  // Undocumented methods
  showForEvent(event: Event): void;
  templateForEvent(event: Event): Array<Object>;
}

declare class atom$ContextMenuItemSet {
  items: Array<atom$ContextMenuItem>;
  selector: string;
}

type atom$ContextMenuItem = {
  command?: string;
  created?: (event: MouseEvent) => void;
  enabled?: boolean;
  label?: string;
  shouldDisplay?: (event: MouseEvent) => boolean;
  submenu?: Array<atom$ContextMenuItem>;
  type?: string;
  visible?: boolean;
};

type atom$Deserializer = {
  name: string;
  deserialize: (state: Object) => unknown;
};

declare class atom$DeserializerManager {
  add(...deserializers: Array<atom$Deserializer>): IDisposable;
  deserialize(state: Object, params?: Object): unknown;
}

// Apparently it can sometimes include a `code` property.
declare class atom$GetEntriesError extends Error {
  code?: string;
}

declare class atom$Directory {
  constructor(dirname?: string);

  symlink: boolean;

  // Construction
  create(mode?: number): Promise<boolean>;

  // Event Subscription
  onDidChange(callback: () => unknown): IDisposable;

  // Directory Metadata
  isFile(): boolean;
  isDirectory(): boolean;
  exists(): Promise<boolean>;

  // Managing Paths
  getPath(): string;
  getBaseName(): string;
  relativize(fullPath: string): string;

  // Event Subscription
  onDidRename(callback: () => void): IDisposable;
  onDidDelete(callback: () => void): IDisposable;

  // Traversing
  getParent(): atom$Directory;
  getFile(filename: string): atom$File;
  getSubdirectory(dirname: string): atom$Directory;
  getEntries(
    callback: (
      error: atom$GetEntriesError | null | undefined,
      entries: Array<atom$Directory | atom$File> | null | undefined,
    ) => unknown,
  ): void;
  contains(path: string): boolean;
}

// These are the methods called on a file by atom-text-buffer
interface atom$Fileish {
  existsSync(): boolean;
  setEncoding(encoding: string): void;
  getEncoding(): string | null | undefined;
  onDidRename(callback: () => void): IDisposable;
  onDidDelete(callback: () => void): IDisposable;
  onDidChange(callback: () => void): IDisposable;
  onWillThrowWatchError(callback: () => unknown): IDisposable;
  getPath(): string;
  getBaseName(): string;
  createReadStream(): stream$Readable;
  createWriteStream(): stream$Writable;
}

declare class atom$File
/* implements atom$Fileish */
{
  constructor(filePath?: string, symlink?: boolean);

  symlink: boolean;

  // Construction
  create(): Promise<boolean>;

  // File Metadata
  isFile(): boolean;
  isDirectory(): boolean;
  exists(): Promise<boolean>;
  existsSync(): boolean;
  setEncoding(encoding: string): void;
  getEncoding(): string;

  // Event Subscription
  onDidRename(callback: () => void): IDisposable;
  onDidDelete(callback: () => void): IDisposable;
  onDidChange(callback: () => void): IDisposable;
  onWillThrowWatchError(callback: () => unknown): IDisposable;

  // Managing Paths
  getPath(): string;
  getBaseName(): string;

  // Traversing
  getParent(): atom$Directory;

  // Reading and Writing
  read(flushCache?: boolean): Promise<string>;
  write(text: string): Promise<void>;
  writeSync(text: string): void;
  createReadStream(): stream$Readable;
  createWriteStream(): stream$Writable;
}

declare class atom$GitRepository extends atom$Repository {
  // Unofficial API.
  statuses: {
    [filePath: string]: number;
  };
  // Return the `git-utils` async repo.
  getRepo(): atom$GitRepositoryInternal;
}

declare class atom$Grammar {
  name: string;
  scopeName: string;
  tokenizeLines(text: string): Array<Array<atom$GrammarToken>>;
  tokenizeLine(
    line: string,
    ruleStack: unknown,
    firstLine: boolean,
  ): {
    line: string;
    tags: Array<number>;
    // Dynamic property: invoking it will incur additional overhead
    tokens: Array<atom$GrammarToken>;
    ruleStack: unknown;
  };
}

type atom$GrammarToken = {
  value: string;
  scopes: Array<string>;
};

declare class atom$GrammarRegistry {
  // Event Subscription
  onDidAddGrammar(callback: (grammar: atom$Grammar) => void): IDisposable;

  // Managing Grammars
  grammarForScopeName(scopeName: string): atom$Grammar | null | undefined;
  removeGrammarForScopeName(scopeName: string): atom$Grammar | null | undefined;
  loadGrammarSync(grammarPath: string): atom$Grammar;
  selectGrammar(filePath: string, fileContents: string): atom$Grammar;
  autoAssignLanguageMode(buffer: atom$TextBuffer): void;
  assignLanguageMode(buffer: atom$TextBuffer, languageId: string): void;

  // Extended
  getGrammarScore(
    grammar: atom$Grammar,
    filePath: string,
    contents?: string,
  ): number;
  forEachGrammar(callback: (grammar: atom$Grammar) => unknown): void;

  // Private API
  clear(): IDisposable;
}

declare class atom$HistoryManager {
  removeProject(paths: Array<string>): void;
  getProjects(): Array<atom$HistoryProject>;
}

declare class atom$HistoryProject {
  paths(): Array<string>;
  lastOpened(): Date;
}

// https://github.com/atom/atom-keymap/blob/18f00ac307de5770bb8f98958bd9a13ecffa9e68/src/key-binding.coffee
declare class atom$KeyBinding {
  cachedKeyups: Array<string> | null | undefined;
  command: string;
  index: number;
  keystrokeArray: Array<string>;
  keystrokeCount: number;
  keystrokes: string;
  priority: number;
  selector: string;
  source: string;
  specificity: number;

  matches(keystroke: string): boolean;
  compare(keybinding: atom$KeyBinding): number;
  getKeyups(): Array<string> | null | undefined;
  matchesKeystrokes(
    userKeystrokes: Array<string>,
  ): boolean | 'exact' | 'partial' | 'pendingKeyup';
}

declare class atom$KeymapManager {
  // Event Subscription
  onDidMatchBinding(
    callback: (event: {
      keystrokes: string;
      binding: atom$KeyBinding;
      keyboardEventTarget: HTMLElement;
    }) => unknown,
  ): IDisposable;

  onDidPartiallyMatchBinding(
    callback: (event: {
      keystrokes: string;
      partiallyMatchedBindings: atom$KeyBinding;
      keyboardEventTarget: HTMLElement;
    }) => unknown,
  ): IDisposable;

  onDidFailToMatchBinding(
    callback: (event: {
      keystrokes: string;
      partiallyMatchedBindings: atom$KeyBinding;
      keyboardEventTarget: HTMLElement;
    }) => unknown,
  ): IDisposable;

  onDidFailToReadFile(
    callback: (error: {message: string; stack: string}) => unknown,
  ): IDisposable;

  // Adding and Removing Bindings
  add(source: string, bindings: Object): IDisposable;
  removeBindingsFromSource(source: string): void;

  // Accessing Bindings
  getKeyBindings(): Array<atom$KeyBinding>;
  findKeyBindings(params: {
    keystrokes?: string;
    command?: string;
    target?: HTMLElement;
  }): Array<atom$KeyBinding>;

  // Managing Keymap Files
  loadKeymap(path: string, options?: {watch: boolean}): void;
  watchKeymap(path: string): void;

  // Managing Keyboard Events
  handleKeyboardEvent(event: Event): void;
  keystrokeForKeyboardEvent(event: Event): string;
  getPartialMatchTimeout(): number;

  buildKeydownEvent(
    key: string,
    options: {
      target: HTMLElement;
      alt?: boolean;
      cmd?: boolean;
      ctrl?: boolean;
      shift?: boolean;
    },
  ): Event;
}

declare class atom$MenuManager {
  add(items: Array<Object>): IDisposable;
  update(): void;

  // Private API
  template: Array<Object>;
}

type atom$ProjectSpecification = {
  originPath: string;
  paths?: Array<string>;
  config?: {
    [key: string]: unknown;
  };
};

declare class atom$Project {
  // Event Subscription
  onDidChangePaths(
    callback: (projectPaths: Array<string>) => unknown,
  ): IDisposable;
  onDidAddBuffer(callback: (buffer: atom$TextBuffer) => unknown): IDisposable;
  onDidReplace(
    arg0: (settings: atom$ProjectSpecification) => unknown,
  ): IDisposable;
  observeBuffers(callback: (buffer: atom$TextBuffer) => unknown): IDisposable;
  observeRepositories(
    callback: (repository: atom$Repository) => unknown,
  ): IDisposable;
  replace?: (newSettings: atom$ProjectSpecification) => void;
  // Accessing the git repository
  getRepositories(): Array<atom$Repository | null | undefined>;
  repositoryForDirectory(
    directory: atom$Directory,
  ): Promise<atom$Repository | null | undefined>;

  // Managing Paths
  getPaths(): Array<string>;
  addPath(
    projectPath: string,
    options?: {
      emitEvent?: boolean;
      exact?: boolean;
      mustExist?: boolean;
    },
  ): void;
  setPaths(paths: Array<string>): void;
  removePath(projectPath: string): void;
  getDirectories(): Array<atom$Directory>;
  relativizePath(relativizePath?: string): Array<string>; // [projectPath: ?string, relativePath: string]
  relativize(filePath: string): string;
  contains(path: string): boolean;

  // Private API
  findBufferForPath(path: string): atom$TextBuffer | null | undefined;
  addBuffer(buffer: atom$TextBuffer): void;
  removeBuffer(buffer: atom$TextBuffer): void;
  getBuffers(): Array<atom$TextBuffer>;
}

type TextBufferScanIterator = (arg: {
  match: Array<string>;
  matchText: string;
  range: atom$Range;
  stop(): void;
  replace(replacement: string): void;
}) => void;

// This happens to be a number but it would be better if the type could be entirely opaque. All you
// need to know is that if something needs a checkpoint you should only pass it values received from
// TextBuffer::createCheckpoint
type atom$TextBufferCheckpoint = number;

// TextBuffer did-change/will-change
type atom$TextEditEvent = {
  oldRange: atom$Range;
  newRange: atom$Range;
  oldText: string;
  newText: string;
};

type atom$AggregatedTextEditEvent = {
  changes: Array<atom$TextEditEvent>;
};

declare class atom$LanguageMode {
  getLanguageId(): string;
}

declare class atom$TextBuffer {
  constructor(text?: string);
  constructor(params?: {filePath?: string; text?: string});

  file: atom$File | null | undefined;

  // Mixin
  deserialize: (state: Object, params: Object) => unknown;
  load: (
    file: string | atom$Fileish,
    params: Object,
  ) => Promise<atom$TextBuffer>;

  setFile(file: atom$Fileish): void;

  // Events
  onWillChange(callback: () => unknown): IDisposable;
  onDidChangeText(
    callback: (event: atom$AggregatedTextEditEvent) => unknown,
  ): IDisposable;
  onDidStopChanging(callback: () => unknown): IDisposable;
  onDidConflict(callback: () => unknown): IDisposable;
  onDidChangeModified(callback: () => unknown): IDisposable;
  onDidUpdateMarkers(callback: () => unknown): IDisposable;
  onDidCreateMarker(callback: () => unknown): IDisposable;
  onDidChangePath(callback: () => unknown): IDisposable;
  onDidChangeEncoding(callback: () => unknown): IDisposable;
  onWillSave(callback: () => unknown): IDisposable;
  onDidSave(callback: (event: {path: string}) => unknown): IDisposable;
  onDidDelete(callback: () => unknown): IDisposable;
  onWillReload(callback: () => unknown): IDisposable;
  onDidReload(callback: () => unknown): IDisposable;
  onDidDestroy(callback: () => unknown): IDisposable;
  onWillThrowWatchError(callback: () => unknown): IDisposable;

  // File Details
  // DO NOT USE (T21363106): Doesn't work with remote text buffers!
  // setPath(filePath: string): void,
  getPath(): string | null | undefined;
  setEncoding(encoding: string): void;
  getEncoding(): string;
  getUri(): string;
  getId(): string;
  getLanguageMode(): atom$LanguageMode;

  // Reading Text
  isEmpty(): boolean;
  getText(): string;
  getTextInRange(range: atom$RangeLike): string;
  getLineCount(): number;
  getLines(): Array<string>;
  getLastLine(): string;
  lineForRow(row: number): string;
  lineEndingForRow(row: number): string;
  lineLengthForRow(row: number): number;
  isRowBlank(row: number): boolean;
  previousNonBlankRow(startRow: number): number | null | undefined;
  nextNonBlankRow(startRow: number): number | null | undefined;

  // Mutating Text
  setText: (text: string) => atom$Range;
  setTextInRange(
    range: atom$RangeLike,
    text: string,
    options?: Object,
  ): atom$Range;
  setTextViaDiff(text: string): void;
  insert(
    position: atom$Point,
    text: string,
    options?: {
      normalizeLineEndings?: boolean;
      undo?: string;
    },
  ): atom$Range;
  append(
    text: string,
    options:
      | {
          normalizeLineEndings?: boolean;
          undo?: string;
        }
      | null
      | undefined,
  ): atom$Range;
  delete(range: atom$Range): atom$Range;
  deleteRows(startRow: number, endRow: number): atom$Range;

  // History
  undo(): void;
  redo(): void;
  transact(fn: () => unknown, _: void): void;
  transact(groupingInterval: number, fn: () => unknown): void;
  clearUndoStack(): void;
  createCheckpoint(): atom$TextBufferCheckpoint;
  revertToCheckpoint(checkpoint: atom$TextBufferCheckpoint): boolean;
  groupChangesSinceCheckpoint(checkpoint: atom$TextBufferCheckpoint): boolean;
  // TODO describe the return type more precisely.
  getChangesSinceCheckpoint(
    checkpoint: atom$TextBufferCheckpoint,
  ): Array<unknown>;

  // Search And Replace
  scan(regex: RegExp, iterator: TextBufferScanIterator): void;
  scanInRange(
    regex: RegExp,
    range: atom$Range,
    iterator: TextBufferScanIterator,
  ): void;
  backwardsScanInRange(
    regex: RegExp,
    range: atom$Range,
    iterator: TextBufferScanIterator,
  ): void;

  // Buffer Range Details
  getLastRow(): number;
  getRange(): atom$Range;
  rangeForRow(row: number, includeNewLine?: boolean): atom$Range;
  getLength(): number;

  // Position/Index mapping
  characterIndexForPosition(position: atom$PointLike): number;
  positionForCharacterIndex(index: number): atom$Point;

  // Buffer Operations
  reload(): void;
  load(): Promise<void>;
  save(): Promise<void>;

  isInConflict(): boolean;
  isModified(): boolean;

  // Private APIs
  cachedDiskContents: string | null | undefined;
  emitter: atom$Emitter;
  refcount: number;
  loaded: boolean;
  wasModifiedBeforeRemove: boolean;
  finishLoading(): atom$TextBuffer;
  updateCachedDiskContents(
    flushCache?: boolean,
    callback?: () => unknown,
  ): Promise<void>;
  emitModifiedStatusChanged(changed: boolean): void;
  destroy(): void;
  isDestroyed(): boolean;
  applyChange: () => void;
  shouldDestroyOnFileDelete?: () => boolean;
}

declare class atom$Notification {
  // Event Subscription
  onDidDismiss(callback: () => unknown): IDisposable;
  onDidDisplay(callback: () => unknown): IDisposable;

  // Methods
  getType(): string;
  getMessage(): string;
  getOptions(): Object;
  dismiss(): void;
  isDismissed(): boolean;
}

type atom$NotificationButton = {
  text: string;
  className?: string;
  onDidClick?: () => unknown;
};

type atom$NotificationOptions = {
  detail?: string;
  dismissable?: boolean;
  description?: string;
  icon?: string;
  stack?: string;
  buttons?: Array<atom$NotificationButton>;
};

declare class atom$NotificationManager {
  // Events
  onDidAddNotification(
    callback: (notification: atom$Notification) => void,
  ): IDisposable;

  // Adding Notifications
  add(
    type: string,
    message: string,
    options?: atom$NotificationOptions,
  ): atom$Notification;
  addSuccess(
    message: string,
    options?: atom$NotificationOptions,
  ): atom$Notification;
  addInfo(
    message: string,
    options?: atom$NotificationOptions,
  ): atom$Notification;
  addWarning(
    message: string,
    options?: atom$NotificationOptions,
  ): atom$Notification;
  addError(
    message: string,
    options?: atom$NotificationOptions,
  ): atom$Notification;
  addFatalError(
    message: string,
    options?: atom$NotificationOptions,
  ): atom$Notification;
  addNotification(notification: atom$Notification): atom$Notification;

  // Getting Notifications
  getNotifications(): Array<atom$Notification>;
}

// Make sure that common types can be referenced without the `atom$` prefix
// in type declarations.
declare var Cursor: typeof atom$Cursor;
declare var Panel: typeof atom$Panel;
declare var TextEditor: typeof atom$TextEditor;

type atom$UnhandledErrorEvent = {
  originalError: Object;
  message: string;
  url: string;
  line: number;
  column: number;
};

// The properties of this type match the properties of the `atom` global.
// This list is not complete.
type AtomGlobal = {
  // Properties
  appVersion: string;
  atomScriptMode: boolean | null | undefined; // Added by nuclide-atom-script.
  clipboard: atom$Clipboard;
  commands: atom$CommandRegistry;
  config: atom$Config;
  contextMenu: atom$ContextMenuManager;
  applicationDelegate: atom$applicationDelegate;
  deserializers: atom$DeserializerManager;
  grammars: atom$GrammarRegistry;
  history: atom$HistoryManager;
  keymaps: atom$KeymapManager;
  menu: atom$MenuManager;
  notifications: atom$NotificationManager;
  packages: atom$PackageManager;
  styles: atom$StyleManager;
  themes: atom$ThemeManager;
  textEditors: atom$TextEditorRegistry;
  tooltips: atom$TooltipManager;
  views: atom$ViewRegistry;
  workspace: atom$Workspace;
  project: atom$Project;
  devMode: boolean;

  // Event Subscription
  onWillThrowError(
    callback: (event: atom$UnhandledErrorEvent) => unknown,
  ): IDisposable;
  onDidThrowError(
    callback: (event: atom$UnhandledErrorEvent) => unknown,
  ): IDisposable;
  whenShellEnvironmentLoaded(callback: () => unknown): IDisposable;

  // Atom Details
  inDevMode(): boolean;
  inSafeMode(): boolean;
  inSpecMode(): boolean;
  getVersion(): string;
  isReleasedVersion(): boolean;
  getWindowLoadTime(): number;

  // This is an undocumented way to reach the Electron BrowserWindow.
  // Use `electron.remote.getCurrentWindow` instead.
  getCurrentWindow: void;

  // Messaging the User
  readonly confirm: ((
    arg0: {
      message: string;
      detail?: string;
      buttons?: Array<string>;
    },
    arg1: (arg0: number) => void,
  ) => void) & // The synchronous form. You really shouldn't use this.
    ((arg0: {
      message: string;
      detailedMessage?: string;
      buttons?:
        | Array<string>
        | {
            [buttonName: string]: () => unknown;
          };
    }) => number | null | undefined);

  open(params: {
    pathsToOpen?: Array<string>;
    newWindow?: boolean;
    devMode?: boolean;
    safeMode?: boolean;
  }): void;
  reload(): void;

  // Undocumented Methods
  getConfigDirPath(): string;
  showSaveDialogSync(options: Object): string;
  loadState(): Promise<Object | null | undefined>;
  getLoadSettings(): Object;
};

declare var atom: AtomGlobal;

type RepositoryDidChangeStatusCallback = (event: {
  path: string;
  pathStatus: number;
}) => unknown;
type RepositoryLineDiff = {
  oldStart: number;
  newStart: number;
  oldLines: number;
  newLines: number;
};

// Taken from the interface of [`GitRepository`][1], which is also implemented by
// `HgRepositoryClient`.
//
// [1]: https://github.com/atom/atom/blob/v1.7.3/src/git-repository.coffee
declare class atom$Repository {
  constructor(path: string, options?: {refreshOnWindowFocus?: boolean});

  // Event Subscription
  onDidChangeStatus: (
    callback: RepositoryDidChangeStatusCallback,
  ) => IDisposable;
  onDidChangeStatuses: (callback: () => unknown) => IDisposable;

  // Repository Details
  getType: () => string;
  getPath: () => string;
  getWorkingDirectory: () => string;
  isProjectAtRoot: () => boolean;
  relativize: (aPath: string) => string;
  getOriginURL: (aPath: string | null | undefined) => string | null | undefined;

  // Reading Status
  isPathModified: (aPath: string) => boolean;
  isPathNew: (aPath: string) => boolean;
  isPathIgnored: (aPath: string) => boolean;
  getDirectoryStatus: (aPath: string) => number;
  getPathStatus: (aPath: string) => number;
  getCachedPathStatus: (aPath: string) => number | null | undefined;
  isStatusModified: (status: number) => boolean;
  isStatusNew: (status: number) => boolean;
  refreshStatus: () => Promise<void>;

  // Retrieving Diffs
  getDiffStats: (filePath: string) => {added: number; deleted: number};
  getLineDiffs: (aPath: string, text: string) => Array<RepositoryLineDiff>;

  // Checking Out
  checkoutHead: (aPath: string) => boolean;
  checkoutReference: (reference: string, create: boolean) => Promise<void>;

  // Event Subscription
  onDidDestroy(callback: () => unknown): IDisposable;
  isDestroyed(): boolean;
}

declare class atom$GitRepositoryInternal {
  // Reading Status
  isStatusModified: (status: number) => boolean;
  isStatusNew: (status: number) => boolean;
  isStatusIgnored: (status: number) => boolean;
  isStatusStaged: (status: number) => boolean;
  isStatusDeleted: (status: number) => boolean;
}

// One of text or snippet is required.
// TODO(hansonw): use a union + intersection type
type atom$AutocompleteSuggestion = {
  text?: string;
  snippet?: string;
  displayText?: string;
  replacementPrefix?: string;
  type?: string | null | undefined;
  leftLabel?: string | null | undefined;
  leftLabelHTML?: string | null | undefined;
  rightLabel?: string | null | undefined;
  rightLabelHTML?: string | null | undefined;
  className?: string | null | undefined;
  iconHTML?: string | null | undefined;
  description?: string | null | undefined;
  descriptionMarkdown?: string | null | undefined;
  descriptionMoreURL?: string | null | undefined;
};

type atom$AutocompleteRequest = {
  editor: TextEditor;
  bufferPosition: atom$Point;
  scopeDescriptor: atom$ScopeDescriptor;
  prefix: string;
  activatedManually?: boolean;
};

type atom$AutocompleteProvider = {
  readonly selector: string;
  readonly getSuggestions: (
    request: atom$AutocompleteRequest,
  ) =>
    | Promise<Array<atom$AutocompleteSuggestion> | null | undefined>
    | (Array<atom$AutocompleteSuggestion> | null | undefined);
  readonly getSuggestionDetailsOnSelect?: (
    suggestion: atom$AutocompleteSuggestion,
  ) => Promise<atom$AutocompleteSuggestion | null | undefined>;
  readonly disableForSelector?: string;
  readonly inclusionPriority?: number;
  readonly excludeLowerPriority?: boolean;
  readonly suggestionPriority?: number;
  readonly filterSuggestions?: boolean;
  readonly disposable?: () => void;
  readonly onDidInsertSuggestion?: (
    insertedSuggestion: atom$SuggestionInsertedRequest,
  ) => void;
};

type atom$SuggestionInsertedRequest = {
  readonly editor: atom$TextEditor;
  readonly triggerPosition: atom$Point;
  readonly suggestion: atom$AutocompleteSuggestion;
};

// https://github.com/atom/autocomplete-plus/blob/master/README.md#the-watcheditor-api
type atom$AutocompleteWatchEditor = (
  editor: atom$TextEditor,
  labels?: Array<string>,
) => IDisposable;

// Undocumented API.
declare class atom$Token {
  value: string;
  matchesScopeSelector(selector: string): boolean;
}

declare class atom$Selection {
  clear(): void;
  getText(): string;
  getBufferRange(): atom$Range;
  insertText(
    text: string,
    options?: {
      select?: boolean;
      autoIndent?: boolean;
      autoIndentNewLine?: boolean;
      autoDecreaseIdent?: boolean;
      normalizeLineEndings?: boolean;
      undo?: boolean;
    },
  ): string;
  isEmpty(): boolean;
}

declare class atom$PanelContainer {
  dock: atom$Dock;
  element: HTMLElement;
  emitter: atom$Emitter;
  location: atom$PaneLocation;
  panels: Array<atom$Panel>;
  subscriptions: atom$CompositeDisposable;
  viewRegistry: atom$ViewRegistry;

  getPanels(): Array<atom$Panel>;
}

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 */

/*
 * APIs listed in this file are ones that should be built into Flow and need to be upstreamed.
 */
type IDisposable = {
  dispose(): unknown;
};

/*
 * These Notification & NotificationOptions definitions are not exhaustive while standardization,
 * browser, and Electron support remain incomplete.
 */
type NotificationOptions = {
  body?: string;
  icon?: string;
};

declare class Notification {
  constructor(message: string, options?: NotificationOptions);
  onclick: () => void;
}

// T9254051 - Fix flow http/https definitions.
declare class http$fixed$Server extends events$EventEmitter {
  listen(
    port: number,
    hostname?: string,
    backlog?: number,
    callback?: Function,
  ): http$fixed$Server;
  listen(path: string, callback?: Function): http$fixed$Server;
  listen(handle: Object, callback?: Function): http$fixed$Server;
  close(callback?: Function): http$fixed$Server;
  address(): {port: number; fmaily: string; address: string};
  maxHeadersCount: number;
}

declare class http$fixed$IncomingMessage extends stream$Readable {
  headers: Object;
  httpVersion: string;
  method: string;
  trailers: Object;
  setTimeout(msecs: number, callback: Function): void;
  socket: any; // TODO net.Socket
  statusCode: number;
  url: string;
  connection: {destroy: () => void};
}

declare class http$fixed$ClientRequest extends stream$Writable {}

declare class http$fixed$ServerResponse {
  setHeader(name: string, value: string): void;
  statusCode: number;
  write(value: string): void;
  end(): void;
}

declare class https$fixed {
  Server: typeof http$fixed$Server;
  createServer(
    options: Object,
    requestListener?: (
      request: http$fixed$IncomingMessage,
      response: http$fixed$ServerResponse,
    ) => void,
  ): http$fixed$Server;
  request(
    options: Object | string,
    callback: (response: http$fixed$IncomingMessage) => void,
  ): http$fixed$ClientRequest;
  get(
    options: Object | string,
    callback: (response: http$fixed$IncomingMessage) => void,
  ): http$fixed$ClientRequest;
}

declare class http$fixed {
  Server: typeof http$fixed$Server;
  createServer(
    requestListener?: (
      request: http$fixed$IncomingMessage,
      response: http$fixed$ServerResponse,
    ) => void,
  ): http$fixed$Server;
  request(
    options: Object | string,
    callback: (response: http$fixed$IncomingMessage) => void,
  ): http$fixed$ClientRequest;
  get(
    options: Object | string,
    callback: (response: http$fixed$IncomingMessage) => void,
  ): http$fixed$ClientRequest;
}

declare interface net$ListenOptions {
  port?: number;
  host?: string;
  backlog?: number;
  path?: string;
  exclusive?: boolean;
}

declare module 'event-kit' {
  var Emitter: typeof atom$Emitter;
  var Disposable: typeof atom$Disposable;
  var CompositeDisposable: typeof atom$CompositeDisposable;
}
