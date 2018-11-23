import React from 'react'
import Breadcrumbs from './Breadcrumbs.jsx'
import ListItem from './ListItem.jsx'

export default class DirListing extends React.Component {
  render () {
    return (
      <div>
        <Breadcrumbs />
        {
          this.props.directories
            .map(item => <ListItem item={item} key={item.href}/>)
        }
        {
          this.props.files
            .map(item => <ListItem item={item} key={item.href}/>)
        }
      </div>
    )
  }
}
