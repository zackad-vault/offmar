import React from 'react'
import DirListing from './components/DirListing.jsx'

export default class Offmar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'list'
    }
  }

  render () {
    return (
      (this.state.mode === 'list') ? <DirListing items={this.props.listItems}/> : false
    )
  }
}
