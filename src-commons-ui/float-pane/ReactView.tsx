export interface Props {
  component: () => React.ReactElement
  containerClassName: string
  contentClassName: string
}

let render: typeof import("react-dom").render | undefined

/** A react component that can host an externally given React component */
export function ReactView(props: Props) {
  if (render === undefined) {
    render = require("react-dom").render
  }
  const content = document.createElement("div")
  content.className = props.contentClassName
  return (
    <div className={props.containerClassName}>
      {(render!(props.component(), content) as HTMLElement | void) || undefined}
    </div>
  )
}
