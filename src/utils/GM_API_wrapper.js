export function setValue(key, value) {
  try {
    return GM_setValue(key, value)
  } catch (error) {
    return value
  }
}

export function getValue(key, defaultValue) {
  try {
    return GM_getValue(key, defaultValue)
  } catch (error) {
    return defaultValue
  }
}
