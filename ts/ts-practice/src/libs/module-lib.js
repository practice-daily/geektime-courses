const version = '1.1.1'

function doSomething() {
  console.log('module doSomething')
}

function moduleLib(options) {
  console.log(options)
}

moduleLib.version = version
moduleLib.doSomething = doSomething

module.exports = moduleLib
