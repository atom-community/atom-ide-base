export interface SourceInfo {
  id: string
  name: string
  start?: () => void
  stop?: () => void
}

export type ConsoleService = (options: SourceInfo) => ConsoleApi

export interface ConsoleApi {
  setStatus(status: OutputProviderStatus): void
  append(message: Message): void
  dispose(): void
  log(object: string): void
  error(object: string): void
  warn(object: string): void
  info(object: string): void
}

export type OutputProviderStatus = "starting" | "running" | "stopped"

export interface Message {
  text: string
  level: Level
  tags?: string[] | null
  kind?: MessageKind | null
  scopeName?: string | null
}

export type TaskLevelType = "info" | "log" | "warning" | "error" | "debug" | "success"
export type Level = TaskLevelType | Color
type Color = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "violet" | "rainbow"

export type MessageKind = "message" | "request" | "response"
