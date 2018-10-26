function cleanup() {
  let cssSelector = [
    'head > link',
    'head > style',
    'head > link',
    'head > script',
    'body > :not(script)'
  ]
  document.querySelectorAll(cssSelector.join(','))
    .forEach(element => element.parentNode.removeChild(element))
}

function getListItems() {
  return [...document.querySelectorAll('table table a')]
}

function insertRootContainer() {
  let root = document.createElement('div')
  root.setAttribute('id', 'root')
  let scriptNode = document.querySelector('body script')
  scriptNode.parentNode.insertBefore(root, scriptNode)
}

export { cleanup, getListItems ,insertRootContainer }
