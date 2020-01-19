import React from 'preact'
import { ListItem } from './ListItem.jsx'

function DirListing({ directories, files }) {
  return (
    <div>
      <div className='container mx-auto pt-12'>
        {directories.map(item => (
          <ListItem className='dir' item={item} key={item.href} />
        ))}
        {files.map(item => (
          <ListItem item={item} key={item.href} />
        ))}
      </div>
    </div>
  )
}

export { DirListing }
