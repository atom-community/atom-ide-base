import { render } from "react-dom"

export interface Props {
  component: () => React.ReactElement
  containerClassName: string
  contentClassName: string
}

/**
 * A react component that can host an externally given React component
 */
export function ReactView(props: Props) {
  const content = document.createElement("div")
  content.className = props.contentClassName
  return (
    <div className={props.containerClassName}>
      {(render(props.component(), content) as HTMLElement | void) || undefined}
    </div>
  )
}
