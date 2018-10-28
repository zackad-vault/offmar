import React from 'react'

export default class ListItem extends React.Component {
  render () {
    return (
      <p>
        <a href={this.props.item.href}>{this.props.item.textContent}</a>
      </p>
    )
  }
}
