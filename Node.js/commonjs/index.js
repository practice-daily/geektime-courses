// console.log('start require')

// let lib = require('./lib.js')

// console.log('end require')
// console.log('require:', lib)
// console.log('\n')

// // require 进来的是一个引用
// lib.test = 'add'

// setTimeout(() => {
//   console.log()
//   console.log('=== index.js: exports start ===')
//   console.log(typeof exports, exports)
//   console.log('=== index.js: exports end ===')

//   console.log('\n')

//   console.log('=== index.js: module.exports start ===')
//   console.log(typeof module.exports, module.exports)
//   console.log('=== index.js: module.exports end ===')
// }, 2000)

// /**
//  * 可以使用 webpack 分析 commonjs 模块化规范
//  * webpack --devtool none --mode development --target node index.js
//  */


function changeAgeAndRef(person) {
  person.age = 30
  person = {
    name: 'world',
    age: 40
  }
  return person
}

var person = {
  name: 'hello',
  age: 18
}

var person2 = changeAgeAndRef(person)
console.log(person) // { name: 'hello', age: 30 }
console.log(person2) // { name: 'world', age: 40 }
