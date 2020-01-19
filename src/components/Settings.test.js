import Settings from './Settings'

test('disallow default export for "Reader"', () => {
  expect(Settings).toBeUndefined()
})
