import DirListing from './DirListing'

test('disallow default export for "DirListing"', () => {
  expect(DirListing).toBeUndefined()
})
