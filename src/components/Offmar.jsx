import React from 'preact'
import natsort from 'natsort'
import DirListing from './DirListing.jsx'

export default class Offmar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'list',
      directories: [],
      files: [],
    }
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
    this.setState({
      directories: directories,
      files: files
    })
  }

  render () {
    return (
      (this.state.mode === 'list') ?
        <DirListing
          directories={this.state.directories}
          files={this.state.files}
        /> :
        false
    )
  }
}
