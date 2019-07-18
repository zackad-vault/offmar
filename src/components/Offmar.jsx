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
      // Start of to persisted data into userscript manager storage
      activeTheme: 0,
      maxImageWidth: null,
      // End of to be persisted data
      directories: [],
      files: [],
      images: [],
    }

    this.closeSettingDialog = this.closeSettingDialog.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.settingToggleButtonHandler = this.settingToggleButtonHandler.bind(this)
    this.onChangeThemeSelectorHandler = this.onChangeThemeSelectorHandler.bind(this)
    this.onChangeMaxImageWidthHandler = this.onChangeMaxImageWidthHandler.bind(this)
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

    document.addEventListener('keydown', this.handleKeydown)

    let activeTheme = GM_getValue('activeTheme', 0)
    let maxImageWidth = GM_getValue('maxImageWidth', null)
    this.setState({
      directories: directories,
      files: files,
      images: images,
      theme: this.state.themes[activeTheme],
      activeTheme: activeTheme,
      maxImageWidth: maxImageWidth,
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

  onChangeMaxImageWidthHandler(event) {
    const maxImageWidth = parseInt(event.target.value)

    if (!maxImageWidth) {
      this.setState({ maxImageWidth: null })
      GM_setValue('maxImageWidth', null)
      return
    }

    this.setState({ maxImageWidth: maxImageWidth })
    GM_setValue('maxImageWidth', maxImageWidth)
  }

  settingToggleButtonHandler() {
    this.setState(prevState => ({ openSetting: !prevState.openSetting }))
  }

  render() {
    const { openSetting, files, directories, images, mode, activeTheme, themes, maxImageWidth } = this.state
    const settingDialog = (
      <SettingDialog
        discardHandler={this.closeSettingDialog}
        onChangeHandler={this.onChangeThemeSelectorHandler}
        maxImageChangeHandler={this.onChangeMaxImageWidthHandler}
        themes={themes}
        maxImageWidth={maxImageWidth}
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
    const reader = <Reader images={images} maxImageWidth={maxImageWidth} settingButton={settingToggleButton} />

    return (
      <div className={`${themes[activeTheme].name} min-h-screen bg-primary text-primary`}>
        {mode === 'list' ? list : reader}
      </div>
    )
  }
}
