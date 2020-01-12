const babelMath = require('../src/math')

test('add: 1 + 1 = 2', () => {
  expect(babelMath.add(1, 1)).toBe(2)
})

test('sub: 1 - 1 = 0', () => {
  expect(babelMath.sub(1, 1)).toBe(0)
})

// let a: number = 'hello'
