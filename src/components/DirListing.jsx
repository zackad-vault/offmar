import React from 'preact'
import Breadcrumbs from './Breadcrumbs.jsx'
import ListItem from './ListItem.jsx'

function DirListing ({ directories, files }) {
  return (
    <div>
      <Breadcrumbs />
      <div className='container mx-auto'>
        {
          directories
            .map(item => <ListItem className='dir' item={item} key={item.href}/>)
        }
        {
          files
            .map(item => <ListItem item={item} key={item.href}/>)
        }
      </div>
    </div>
  )
}

export default DirListing
