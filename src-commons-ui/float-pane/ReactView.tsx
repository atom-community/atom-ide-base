import * as React from "react"

export interface Props {
  component: () => React.ReactElement
  containerClassName: string
  contentClassName: string
}

interface State {}

/**
 * A react component that can host an externally given React component
 */
export class ReactView extends React.Component<Props, State> {
  render() {
    let children = null
    if (this.props.component) {
      children = <div className={this.props.contentClassName}>{this.props.component()}</div>
    }

    return <div className={this.props.containerClassName}>{children}</div>
  }
}
