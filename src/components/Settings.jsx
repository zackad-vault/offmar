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
    return (
      <div className={``}>
        <button onClick={this.buttonClickHandler}>Setting Button - {openSetting ? 'Open' : 'Close'}</button>
        {openSetting ? <SettingDialog /> : ''}
      </div>
    )
  }
}

export class SettingDialog extends React.Component {
  render() {
    return (
      <div className={`fixed top-12 inset-x-0 bg-secondary p-3 border mx-auto w-1/4`}>
        <h2 className={`font-medium`}>Settings</h2>
      </div>
    )
  }
}
