var obj = {
  a: {}
}

var b = obj.a

b.add = function() {
  return 'exports'
}
b.char = 'hello'

obj.a = function() {
  return 'module.export'
}

// module.export
console.log(obj.a)

// exports
console.log(b)
