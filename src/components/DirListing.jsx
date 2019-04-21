import React from 'react'
import Breadcrumbs from './Breadcrumbs.jsx'
import ListItem from './ListItem.jsx'

function DirListing ({ directories, files }) {
  return (
    <div className='container mx-auto'>
      <Breadcrumbs />
      {
        directories
          .map(item => <ListItem item={item} key={item.href}/>)
      }
      {
        files
          .map(item => <ListItem item={item} key={item.href}/>)
      }
    </div>
  )
}

export default DirListing
