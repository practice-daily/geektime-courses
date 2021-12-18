console.log('lib start')

/**
 * exports 挂载在对象下
 * exports 可多次挂载
 */
exports.hello = 'world'

exports.add = function (a, b) {
  return a + b
}

/**
 * module.exports 可以不用挂载在对象下
 * 存在 module.exports 时，exports 将失效
 */
module.exports = function minus (a, b) {
  return a - b
}

setTimeout(() => {
  console.log('=== exports start ===')
  console.log(typeof exports)
  console.log(exports)
  console.log('=== exports end ===')

  console.log('\n')

  console.log('=== module.exports start ===')
  console.log(typeof module.exports)
  console.log(module.exports)
  console.log('=== module.exports end ===')
}, 1000)
