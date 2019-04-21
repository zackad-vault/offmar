import React from 'react'

export default class ListItem extends React.Component {
  render () {
    return (
      <p className='m-1'>
        <a className='no-underline'
          href={this.props.item.href}
          >
          {this.props.item.textContent}
        </a>
      </p>
    )
  }
}
