import { h } from 'preact'

function SettingDialog({
  discardHandler,
  themeChangeHandler,
  maxImageChangeHandler,
  themes,
  currentTheme,
  maxImageWidth,
  borderImage,
  borderChangeHandler,
}) {
  const themeSelector = (
    <div>
      <label htmlFor='theme-selector'>Theme color</label>
      <select
        name='theme-selector'
        className={`block w-full bg-primary text-primary border py-1 px-2 mt-2`}
        onChange={themeChangeHandler}
      >
        {themes.map((theme, index) => (
          <option key={theme.name} value={index} selected={theme.name === currentTheme ? true : false}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  )
  const imageWidthLimit = (
    <div className={`mt-3`}>
      <label htmlFor='max-image-width'>Maximum image width</label>
      <input
        type='number'
        name='max-image-width'
        className={`block w-full bg-primary border py-1 px-2`}
        placeholder='Value in pixel (leave blank to default 100%)'
        value={maxImageWidth && maxImageWidth}
        onChange={maxImageChangeHandler}
      />
    </div>
  )
  const withBorderSetting = (
    <div className='mt-3'>
      <input
        type='checkbox'
        id='enable-image-border'
        className='inline-block'
        checked={borderImage}
        onChange={borderChangeHandler}
      />
      <label htmlFor='enable-image-border' className='ml-3'>
        Enable Border Top of Image
      </label>
    </div>
  )
  return (
    <div className={`fixed top-12 inset-x-0 bg-secondary p-3 border mx-auto w-1/4`}>
      <h2 className={`font-medium text-lg border-b mb-3`}>Settings</h2>
      {themeSelector}
      {imageWidthLimit}
      {withBorderSetting}
      <hr className={`border-b`} />
      <button className={`button border py-1 px-2 text-xs float-right`} onClick={discardHandler}>
        Save Settings
      </button>
    </div>
  )
}

export { SettingDialog }
