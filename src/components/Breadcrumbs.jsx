import React from 'react'

export default class Breadcrumbs extends React.Component {
  render () {
    const location = document.location.href
    let items = location
      .replace('file://', '')
      .split('/')
      .filter(item => item !== '')

    let breadcrumbs = []
    let link = ''
    for (let item of items) {
      link += '/' + item
      breadcrumbs.push({
        path: link,
        title: item
      })
    }

    breadcrumbs.map((item) => {
      item.element = <span key={item.path}> / <a href={item.path}>{item.title}</a></span>
      return item
    })

    return (
      <div>
        {breadcrumbs.map(item => item.element)}
      </div>
    )
  }
}
