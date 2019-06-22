import React from 'preact'

function LabelItem ({title}) {
  return (
    <span> / {title}</span>
  )
}

function Breadcrumbs () {
  const location = document.location.pathname
  let items = location
    .split('/')
    .filter(item => item !== '')

  let breadcrumbs = [{path: '/', title: 'Root'}]
  let link = ''
  for (let item of items) {
    link += '/' + item
    breadcrumbs.push({
      path: decodeURIComponent(link),
      title: decodeURIComponent(item)
    })
  }

  breadcrumbs.map((item, i, arr) => {
    if (arr.length - 1 === i) {
      item.element = <LabelItem title={item.title}/>
    } else {
      item.element = <span key={item.path}> / <a href={item.path}>{item.title}</a></span>
    }
    return item
  })

  return (
    <div className='p-2 border-b'>
      {breadcrumbs.map(item => item.element)}
    </div>
  )
}

export default Breadcrumbs
