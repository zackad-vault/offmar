import React from 'react'
import natsort from 'natsort'
import ListItem from './ListItem.jsx'

export default class DirListing extends React.Component {
  render () {
    const directory = this.props.items
      .filter(item => item.className === 'dir')
      .sort(natsort({ insensitive: true }))
    const file = this.props.items
      .filter(item => item.className === 'file')
      .sort(natsort({insensitive: true}))
    return (
      <div>
        {directory.map(item => <ListItem item={item} key={item.href}/>)}
        {file.map(item => <ListItem item={item} key={item.href}/>)}
      </div>
    )
  }
}
