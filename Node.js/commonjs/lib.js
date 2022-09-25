/**
 * exports 导出的都挂载在一个对象下，所以可多次挂载
 * module.exports 可以不用挂载在对象下，可以导出任意数据类型
 * 
 * module.exports 和 exports 一开始都是一个空对象，并且指向同一块内存。
 * 即 module.exports 和 exports 是等价的（前提是：不去重新赋值改变它们指向的内存地址）。
 * 
 * require 导入的本质上是 module.exports。
 * 这就产生了一个问题，当 module.exports 和 exports 指向的不是同一块内存时，exports 的内容就会失效。
 * 
 * 参考: https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
 */

console.log('start lib')

exports.hello = 'world'

exports.add = function (a, b) {
  return a + b
}

exports = {
  'hahaha': 'hehehe'
}

// module.exports.node = 'js'
// module.exports = 'Hello World!'
// module.exports = function minus (a, b) {
//   return a - b
// }


setTimeout(() => {
  console.log('=== lib.js: exports start ===')
  console.log(typeof exports, exports)
  console.log('=== lib.js: exports end ===')

  console.log('\n')

  console.log('=== lib.js: module.exports start ===')
  console.log(typeof module.exports, module.exports)
  console.log('=== lib.js: module.exports end ===')
}, 1000)
