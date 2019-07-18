import React from 'preact'

export class SettingToggleButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openSetting: false,
    }
    this.buttonClickHandler = this.buttonClickHandler.bind(this)
  }

  buttonClickHandler() {
    this.setState(prevState => ({ openSetting: !prevState.openSetting }))
  }

  render() {
    const { openSetting } = this.state
    return <button onClick={this.buttonClickHandler}>Setting Button - {openSetting ? 'Open' : 'Close'}</button>
  }
}
