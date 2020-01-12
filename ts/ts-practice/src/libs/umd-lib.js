(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.umdLib = factory()
  }
})(this, function() {
  return {
    version: '2.2.2',
    doSomething() {
      console.log('umdLib doSomething')
    }
  }
});