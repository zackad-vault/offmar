import React from 'preact'
import natsort from 'natsort'
import DirListing from './DirListing.jsx'
import Reader from './Reader.jsx'
import { SettingToggleButton, SettingDialog } from './Settings.jsx'

export default class Offmar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 'list',
      openSetting: false,
      themes: [
        { name: 'theme-black', label: 'Black' },
        { name: 'theme-dark', label: 'Dark' },
        { name: 'theme-gray', label: 'Gray' },
        { name: 'theme-light', label: 'Light' },
      ],
      // Persist to userscript manager storage
      activeTheme: 0,
      directories: [],
      files: [],
      images: [],
    }

    this.closeSettingDialog = this.closeSettingDialog.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.settingToggleButtonHandler = this.settingToggleButtonHandler.bind(this)
    this.onChangeThemeSelectorHandler = this.onChangeThemeSelectorHandler.bind(this)
  }

  componentDidMount() {
    const items = this.props.listItems
      .map(item => {
        item.href = item.href.replace(/\/+\s*$/, '')
        return item
      })
      .sort(natsort({ insensitive: true }))

    const directories = items.filter(item => item.className === 'dir')

    const files = items.filter(item => item.className === 'file')

    const regexFilter = new RegExp('.jpe?g$|.png$|.gif$', 'i')
    const images = files.filter(image => image.href.match(regexFilter))

    this.setState({
      directories: directories,
      files: files,
      images: images,
    })

    document.addEventListener('keydown', this.handleKeydown)

    let activeTheme = GM_getValue('activeTheme', 0)
    this.setState({
      theme: this.state.themes[activeTheme],
      activeTheme: activeTheme,
    })
  }

  handleKeydown(event) {
    const { activeTheme, themes } = this.state
    const keyCode = event.keyCode

    switch (keyCode) {
      // 'Enter/Return' key
      case 13:
        if (this.state.images.length > 0) {
          this.setState({ mode: 'reader' })
        }
        break
      // ';' (Semicolon)
      case 59:
        const newActiveTheme = activeTheme < themes.length - 1 ? activeTheme + 1 : 0
        this.setState({ activeTheme: newActiveTheme })
        GM_setValue('activeTheme', newActiveTheme)
        break
      // '\' key
      case 220:
        this.setState({ mode: 'list' })
        break
    }
  }

  closeSettingDialog() {
    this.setState({ openSetting: false })
  }

  onChangeThemeSelectorHandler(event) {
    const newActiveTheme = parseInt(event.target.value)
    this.setState({ activeTheme: newActiveTheme })
    GM_setValue('activeTheme', newActiveTheme)
  }

  settingToggleButtonHandler() {
    this.setState(prevState => ({ openSetting: !prevState.openSetting }))
  }

  render() {
    const { openSetting, files, directories, images, mode, activeTheme, themes } = this.state
    const settingDialog = (
      <SettingDialog
        discardHandler={this.closeSettingDialog}
        onChangeHandler={this.onChangeThemeSelectorHandler}
        themes={themes}
        currentTheme={themes[activeTheme].name}
      />
    )
    const settingToggleButton = (
      <SettingToggleButton
        openSetting={openSetting}
        settingDialog={settingDialog}
        onClickHandler={this.settingToggleButtonHandler}
      />
    )
    const list = <DirListing directories={directories} files={files} settingButton={settingToggleButton} />
    const reader = <Reader images={images} settingButton={settingToggleButton} />

    return (
      <div className={`${themes[activeTheme].name} min-h-screen bg-primary text-primary`}>
        {mode === 'list' ? list : reader}
      </div>
    )
  }
}
