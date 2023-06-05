const net = require('net')
const fs = require('fs')
const protobuf = require('protocol-buffers')

const schemas = protobuf(fs.readFileSync(__dirname + '/detail.proto'))

const columns = require('./mockdata/column')

const server = net.createServer((socket) => {
  let oldBuffer = null
  socket.on('data', (buffer) => {
    if (oldBuffer) {
      buffer = Buffer.concat([oldBuffer, buffer])
    }

    let packageLength = 0
    while (packageLength = checkComplete(buffer)) {
      const package = buffer.slice(0, packageLength)
      buffer = buffer.slice(packageLength)

      const { seq, data } = decode(package)
      console.log('server decode:', seq, data)
      const column = columns.find(item => +item.id === +data.columnid)
      const recommendColumns = columns.filter(item => +item.id !== +data.columnid)

      socket.write(encode({ column, recommendColumns }, seq))
    }

    oldBuffer = buffer
  })
})

function checkComplete(buffer) {
  if (buffer.length < 6) return 0
  const bodyLength = buffer.readInt32BE(2)
  if (buffer.length < 6 + bodyLength) return 0
  return 6 + bodyLength
}

function decode(buffer) {
  const header = buffer.slice(0, 6)
  const body = buffer.slice(6)

  const seq = header.readInt16BE()
  const data = schemas.ColumnRequest.decode(body)

  return {
    seq,
    data,
  }
}

function encode(data, seq) {
  const body = schemas.ColumnResponse.encode(data)
  const bodyLength = body.length

  const header = Buffer.alloc(6)
  header.writeInt16BE(seq)
  header.writeInt32BE(bodyLength, 2)

  return Buffer.concat([header, body])
}

server.listen(4000)
