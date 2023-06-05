const fs = require('fs')
const EasySock = require('easy_sock')
const protobuf = require('protocol-buffers')

const schemas = protobuf(fs.readFileSync(__dirname + '/detail.proto', 'utf-8'))

const easySock = new EasySock()

easySock.setConfig({
  ip: '127.0.0.1',
  port: 4000,
  timeout: 500,
  keepAlive: true,
})

easySock.encode = (data, seq) => {
  console.log('client encode:', seq, data)
  const body = schemas.ColumnRequest.encode(data)

  const header = Buffer.alloc(6)
  header.writeInt16BE(seq)
  header.writeInt32BE(body.length, 2)

  return Buffer.concat([header, body])
}

easySock.decode = (buffer) => {
  console.log('client decode:', buffer)
  const header = buffer.slice(0, 6)
  const body = buffer.slice(6)

  const seq = header.readInt16BE()
  const result = schemas.ColumnResponse.decode(body)

  return {
    seq,
    result,
  }
}

easySock.isReceiveComplete = (buffer) => {
  console.log('client isReceiveComplete:', buffer)
  if (buffer.length < 6) return 0
  const bodyLength = buffer.readInt32BE(2)
  if (buffer.length < 6 + bodyLength) return 0
  return 6 + bodyLength
}

module.exports = easySock
