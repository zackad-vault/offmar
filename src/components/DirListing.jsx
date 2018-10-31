import React from 'react'
import natsort from 'natsort'
import ListItem from './ListItem.jsx'

export default class DirListing extends React.Component {
  render () {
    const items = this.props.items
      .map(item => {
        item.href = item.href.replace(/\/+\s*$/, '')
        return item
      })
      .sort(natsort({insensitive: true}))

    const directory = items
      .filter(item => item.className === 'dir')

    const file = items
      .filter(item => item.className === 'file')

    return (
      <div>
        {directory.map(item => <ListItem item={item} key={item.href}/>)}
        {file.map(item => <ListItem item={item} key={item.href}/>)}
      </div>
    )
  }
}
