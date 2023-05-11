const net = require('node:net')

const socket = new net.Socket({})

socket.connect({
  host: '127.0.0.1',
  port: 4000,
})

socket.write('Hello Socket')

socket.on('connect', (data) => {
  console.log('[client] @connect:', data)
})

socket.on('data', (buffer) => {
  console.log('[client] @data:', buffer, buffer.toString())
})

socket.on('end', (data) => {
  console.log('[client] @end:', data)
})

socket.on('close', (data) => {
  console.log('[client] @close:', data)
})
