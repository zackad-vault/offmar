import React from 'preact'
import { throttle } from '../utils/throttle'

function LabelItem({ title }) {
  return <span className='text-secondary'> / {title}</span>
}

function LinkItem({ path, title }) {
  return (
    <span>
      {' '}
      /{' '}
      <a href={path} className='no-underline'>
        {title}
      </a>
    </span>
  )
}

class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pinned: true,
    }
  }

  componentDidMount() {
    const breadcrumbsHeight = 40
    let pxTrigger = 0

    const scrollHandler = () => {
      const pxFromTop = window.pageYOffset || window.scrollY

      if (pxFromTop > breadcrumbsHeight) {
        this.setState({ pinned: pxFromTop < pxTrigger })
        pxTrigger = pxFromTop
      } else {
        this.setState({ pinned: true })
      }
    }

    document.addEventListener('scroll', throttle(scrollHandler, 300))
  }

  render({ settingButton }) {
    const { pinned } = this.state
    const location = document.location.pathname
    let items = location.split('/').filter(item => item !== '')

    let breadcrumbs = [{ path: '/', title: 'Root' }]
    let link = ''
    for (let item of items) {
      link += '/' + item
      breadcrumbs.push({
        path: decodeURIComponent(link),
        title: decodeURIComponent(item),
      })
    }

    breadcrumbs.map((item, i, arr) => {
      if (arr.length - 1 === i) {
        item.element = <LabelItem title={item.title} />
      } else {
        item.element = <LinkItem path={item.path} title={item.title} />
      }
      return item
    })

    const pinnedStyle = pinned ? 'mt-o' : '-mt-12'

    return (
      <div className={`p-2 border-b bg-secondary flex fixed w-full ${pinnedStyle}`} style={{ transition: 'all 300ms' }}>
        {breadcrumbs.map(item => item.element)}
        <span className={`flex-grow`} />
        {settingButton}
      </div>
    )
  }
}

export { Breadcrumbs }
