console.log('require start')

let lib = require('./lib.js')

console.log('require end')
console.log('require:', lib)
console.log('\n')

// require 进来的是一个引用
lib.test = 'add'

/**
 * 可以使用 webpack 分析 commonjs 模块化规范
 * webpack --devtool none --mode development --target node index.js
 */
