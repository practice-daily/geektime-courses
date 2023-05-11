const net = require('node:net')

const server = net.createServer((socket) => {
  socket.on('connect', (stream) => {
    console.log('[server] @connect:', stream)
  })

  socket.on('data', (buffer) => {
    console.log('[server] @data:', buffer, buffer.toString())
  })

  socket.on('end', (data) => {
    console.log('[server] @end:', data)
  })

  socket.on('close', (data) => {
    console.log('[server] @close:', data)
  })
})

server.listen(4000, () => {
  console.log('opened server on', server.address())
})
