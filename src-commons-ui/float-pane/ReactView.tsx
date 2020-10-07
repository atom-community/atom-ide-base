import * as React from "react"

/**
 * A react component that can host an externally given React component
 */
export class ReactView extends React.Component {
  containerClassName: string
  contentClassName: string
  props: {
    component: () => React.ReactElement
    containerClassName: string
    contentClassName: string
  }

  render() {
    let children = null
    if (this.props.component) {
      children = (
        <div className={this.props.contentClassName}>
          {this.props.component()}
        </div>
      )
    }

    return (
      <div className={this.props.containerClassName}>
        {children}
      </div>
    )
  }
}
