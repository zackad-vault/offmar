import React from 'preact'
import natsort from 'natsort'
import DirListing from './DirListing.jsx'
import Reader from './Reader.jsx'

export default class Offmar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'list',
      directories: [],
      files: [],
      images: [],
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
      // '\' key
      case 220:
        this.setState({mode: 'list'})
        break
    }
  }

  render () {
    return (
      <div className='container mx-auto'>
        {
          (this.state.mode === 'list') ?
            <DirListing
              directories={this.state.directories}
              files={this.state.files}
            /> :
            <Reader
              images={this.state.images}
            />
        }
      </div>
    )
  }
}
