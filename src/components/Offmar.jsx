import React from 'preact'
import natsort from 'natsort'
import DirListing from './DirListing.jsx'
import Reader from './Reader.jsx'

export default class Offmar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'list',
      theme: 'theme-black',
      themes: [
        'theme-black',
        'theme-dark',
        'theme-gray',
        'theme-light',
      ],
      activeTheme: 0,
      directories: [],
      files: [],
      images: [],
      config: {},
    }

    this.handleKeydown = this.handleKeydown.bind(this)
  }

  componentDidMount () {
    const items = this.props.listItems
      .map(item => {
        item.href = item.href.replace(/\/+\s*$/, '')
        return item
      })
      .sort(natsort({insensitive: true}))

    const directories = items
      .filter(item => item.className === 'dir')

    const files = items
      .filter(item => item.className === 'file')

    const regexFilter = new RegExp('.jpe?g$|.png$|.gif$', 'i')
    const images = files
      .filter(image => image.href.match(regexFilter))

    this.setState({
      directories: directories,
      files: files,
      images: images
    })

    document.addEventListener('keydown', this.handleKeydown)

    if (localStorage.getItem('offmar')) {
      let activeTheme = JSON.parse(localStorage.getItem('offmar')).activeTheme
      this.setState({
        theme: this.state.themes[activeTheme],
        activeTheme: activeTheme
      })
    }

  }

  handleKeydown (event) {
    const keyCode = event.keyCode

    switch(keyCode) {
      // 'Enter/Return' key
      case 13:
        if (this.state.images.length > 0) {
          this.setState({mode: 'reader'})
        }
        break
      // ';' (Semicolon)
      case 59:
        const activeTheme = (this.state.activeTheme < this.state.themes.length - 1) ? this.state.activeTheme + 1 : 0
        this.setState({
          theme: this.state.themes[activeTheme],
          activeTheme: activeTheme,
          config: Object.assign({}, {
            activeTheme: activeTheme
          })
        })
        localStorage.setItem('offmar', JSON.stringify(this.state.config))
        break
      // '\' key
      case 220:
        this.setState({mode: 'list'})
        break
    }
  }

  render () {
    const list = <DirListing
      directories={this.state.directories}
      files={this.state.files}
    />

    const reader = <Reader
      images={this.state.images}
    />

    return (
      <div className={`${this.state.theme} min-h-screen bg-primary text-primary`}>
        { (this.state.mode === 'list') ? list : reader }
      </div>
    )
  }
}
