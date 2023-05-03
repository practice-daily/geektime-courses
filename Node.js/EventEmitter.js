const EventEmitter = require('events').EventEmitter

class GeekTime extends EventEmitter {
  constructor() {
    super()
    setInterval(() => {
      this.emit('NewLession', { price: Math.random() * 100 })
    }, 1000)
  }
}

const geekTime = new GeekTime

console.log(geekTime.on === geekTime.addListener) // true

// geekTime.on('NewLession', (res) => {
//   console.log('yeah~', res)
// })

geekTime.addListener('NewLession', (res) => {
  console.log('yeah!', res)
})
