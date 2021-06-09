import { MarkdownView, Props as MarkdownViewProps } from "./MarkdownView"
import { SnippetView, Props as SnippetViewProps } from "./SnippetView"
import { ReactView, Props as ReactViewProps } from "./ReactView"

export const DATATIP_ACTIONS = Object.freeze({
  PIN: "PIN",
  CLOSE: "CLOSE",
})

const IconsForAction = {
  [DATATIP_ACTIONS.PIN]: "pin",
  [DATATIP_ACTIONS.CLOSE]: "x",
}

interface Props {
  component?: ReactViewProps
  markdown?: MarkdownViewProps
  snippet?: SnippetViewProps
  action?: string
  actionTitle?: string
  className?: string
  onActionClick?: (event: any) => void
  onMouseDown?: (event: any) => void
  onClickCapture?: (event: any) => void
}

/**
 * a component for a decoration pane
 */
export function ViewContainer(props: Props) {
  return (
    <div className={props.className ?? "datatip-element"} {...props.onMouseDown} {...props.onClickCapture}>
      {props.component !== undefined ? <ReactView {...props.component} /> : undefined}
      {props.snippet !== undefined ? <SnippetView {...props.snippet} /> : undefined}
      {props.markdown !== undefined ? <MarkdownView {...props.markdown} /> : undefined}
      {props.action !== undefined ? (
        <div
          className={`datatip-pin-button icon-${IconsForAction[props.action]}`}
          onClick={() => {
            props.onActionClick?.(event)
          }}
          title={props.actionTitle}
        />
      ) : undefined}
    </div>
  )
}
