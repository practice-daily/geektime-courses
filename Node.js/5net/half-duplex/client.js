const net = require('node:net')
const { Buffer } = require('node:buffer')

const socket = new net.Socket({})

socket.connect({
  host: '127.0.0.1',
  port: 4000,
})

socket.on('connect', (data) => {
  console.log('[client] @connect:', data)
})

socket.on('end', (data) => {
  console.log('[client] @end:', data)
})

socket.on('close', (data) => {
  console.log('[client] @close:', data)
})

const lessonids = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582"
]

function encode(val) {
  const buffer = Buffer.alloc(4)
  buffer.writeInt32BE(val)
  return buffer
}

let index = Math.floor(Math.random() * lessonids.length)
// 往服务器传数据
socket.write(encode(lessonids[index]))

socket.on('data', (buffer) => {
  // console.log('[client] @data:', buffer)
  console.log('[client] @data:', lessonids[index], buffer.toString())

  // 接收到数据之后，按照半双工通信的逻辑，马上开始下一次请求
  index = Math.floor(Math.random() * lessonids.length)
  socket.write(encode(lessonids[index]))
})
