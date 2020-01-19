import ListItem from './ListItem'

test('disallow default export for "ListItem"', () => {
  expect(ListItem).toBeUndefined()
})
