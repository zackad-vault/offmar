import Reader from './Reader'

test('disallow default export for "Reader"', () => {
  expect(Reader).toBeUndefined()
})
