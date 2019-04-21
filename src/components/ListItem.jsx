import React from 'react'

function ListItem ({ item }) {
  return (
    <p className='m-1'>
      <a className='no-underline'
        href={item.href}
        >
        {item.textContent}
      </a>
    </p>
  )
}

export default ListItem
