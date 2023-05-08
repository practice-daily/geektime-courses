// import { Buffer } from 'node:buffer'
const { Buffer } = require('node:buffer')
const fs = require('node:fs')
const path = require('node:path')

const buf1 = Buffer.from('Hello Node.js')
const buf2 = Buffer.from([1, 2, 3, 4])
const buf3 = Buffer.alloc(10)
const buf4 = Buffer.alloc(10, 1)

console.log(buf1)
console.log(buf2)
console.log(buf3)
console.log(buf4)


// writeInt8 中的 8 代表 bit，意思是把数据写入这个 buffer 并且占用 8 个bit
buf2.writeInt8(15, 1)
console.log(buf2)

// buf2.writeInt16BE(1, 2)
buf2.writeInt16LE(1, 2)
console.log(buf2)

console.log('====================================')

const protobuf = require('protocol-buffers')
const message = protobuf(fs.readFileSync(path.join(__dirname, './test.proto')))
console.log(message)
const buf = message.Column.encode({
  id: 100036001,
  name: 'Node.js 开发实战',
  price: 89.9
})
console.log(buf)

console.log(message.Column.decode(buf))
