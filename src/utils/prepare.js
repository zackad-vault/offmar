function cleanup() {
  let cssSelector = [
    'head > link',
    'head > style:not(:last-child)',
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
  document.body.prepend(root)
}

export { cleanup, getListItems ,insertRootContainer }
