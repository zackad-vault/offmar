import { h, Component } from 'preact'
import natsort from 'natsort'
import { DirListing } from './DirListing.jsx'
import { Reader } from './Reader.jsx'
import { SettingToggleButton } from './SettingToggleButton.jsx'
import { SettingDialog } from './SettingDialog.jsx'
import { getValue, setValue } from '../utils/GM_API_wrapper'
import { Breadcrumbs } from './Breadcrumbs.jsx'

class Offmar extends Component {
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
      borderImage: true,
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
    this.borderStateChangeHandler = this.borderStateChangeHandler.bind(this)
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

    const regexFilter = new RegExp('.jpe?g$|.png$|.gif$|.webp$', 'i')
    const images = files.filter(image => image.href.match(regexFilter))

    let activeTheme
    let maxImageWidth
    let borderImage
    activeTheme = getValue('activeTheme', 0)
    maxImageWidth = getValue('maxImageWidth', null)
    borderImage = getValue('borderImage', true)

    document.addEventListener('keydown', this.handleKeydown)
    this.setState({
      directories: directories,
      files: files,
      images: images,
      theme: this.state.themes[activeTheme],
      activeTheme: activeTheme,
      maxImageWidth: maxImageWidth,
      borderImage: borderImage,
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
    setValue('activeTheme', newActiveTheme)
  }

  onChangeMaxImageWidthHandler(event) {
    const maxImageWidth = parseInt(event.target.value)

    if (!maxImageWidth) {
      this.setState({ maxImageWidth: null })
      setValue('maxImageWidth', null)
      return
    }

    this.setState({ maxImageWidth: maxImageWidth })
    setValue('maxImageWidth', maxImageWidth)
  }

  settingToggleButtonHandler() {
    this.setState(prevState => ({ openSetting: !prevState.openSetting }))
  }

  borderStateChangeHandler() {
    this.setState(prevState => ({ borderImage: !prevState.borderImage }))
    setValue('borderImage', this.state.borderImage)
  }

  render() {
    const {
      openSetting,
      files,
      directories,
      images,
      mode,
      activeTheme,
      themes,
      maxImageWidth,
      borderImage,
    } = this.state
    const settingDialog = (
      <SettingDialog
        discardHandler={this.closeSettingDialog}
        themeChangeHandler={this.onChangeThemeSelectorHandler}
        maxImageChangeHandler={this.onChangeMaxImageWidthHandler}
        borderChangeHandler={this.borderStateChangeHandler}
        themes={themes}
        maxImageWidth={maxImageWidth}
        borderImage={borderImage}
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
    const list = <DirListing directories={directories} files={files} />
    const reader = <Reader images={images} maxImageWidth={maxImageWidth} borderImage={borderImage} />

    return (
      <div className={`${themes[activeTheme].name} min-h-screen bg-primary text-primary`}>
        <Breadcrumbs settingButton={settingToggleButton} />
        {mode === 'list' ? list : reader}
      </div>
    )
  }
}

export { Offmar }
