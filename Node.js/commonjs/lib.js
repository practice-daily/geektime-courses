// console.log('lib')
exports.hello = 'world'
exports.add = function (a, b) {
  return a + b
}

module.exports = function minus (a, b) {
  return a - b;
}

setTimeout(() => {
  console.log(exports)
}, 1000)
