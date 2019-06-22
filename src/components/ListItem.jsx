import React from 'preact'

function ListItem ({ item }) {
  return (
    <p className='m-1 p-2 border-b'>
      <a className='no-underline text-white'
        href={item.href}
        >
        {item.textContent}
      </a>
    </p>
  )
}

export default ListItem
