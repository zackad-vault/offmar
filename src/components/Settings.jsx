import React from 'preact'

export function SettingToggleButton() {
  const { openSetting, settingDialog, onClickHandler } = this.props
  return (
    <div className={``}>
      <button onClick={onClickHandler}>Setting Button - {openSetting ? 'Open' : 'Close'}</button>
      {openSetting && settingDialog}
    </div>
  )
}

export function SettingDialog({ discardHandler, onChangeHandler, themes, currentTheme }) {
  const themeSelector = (
    <div>
      <label htmlFor='theme-selector'>Theme color</label>
      <select
        name='theme-selector'
        className={`block w-full bg-primary text-primary border py-1 px-2 mt-2`}
        onChange={onChangeHandler}
      >
        {themes.map((theme, index) => (
          <option key={theme.name} value={index} selected={theme.name === currentTheme ? true : false}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <div className={`fixed top-12 inset-x-0 bg-secondary p-3 border mx-auto w-1/4`}>
      <h2 className={`font-medium text-lg border-b mb-3`}>Settings</h2>
      {themeSelector}
      <hr className={`border-b`} />
      <button className={`button border py-1 px-2 text-xs float-right`} onClick={discardHandler}>
        Save Settings
      </button>
    </div>
  )
}
