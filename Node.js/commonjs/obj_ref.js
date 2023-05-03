// 对象引用测试

var module = {
  exports: {}
}

var exports = module.exports

exports.add = function() {
  return '未重新赋值，仅添加属性 add'
}

exports.char = '未重新赋值，仅添加属性 char'

exports = {
  'hi': '重新赋值导致引用与 module.exports 不再指向同一地址'
}

module.exports = function test() {
  return '重新赋值导致引用与 exports 不再指向同一地址'
}

console.log('module.exports:', module.exports)

console.log('exports:', exports)
