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

let seq = 0 // 包 seq id

function encode(val) {
  const buffer = Buffer.alloc(6)
  buffer.writeInt16BE(seq)
  buffer.writeInt32BE(val, 2)
  console.log('请求:', seq, val, typeof val)
  seq++
  return buffer
}

// let index = Math.floor(Math.random() * lessonids.length)
// let lessonid = lessonids[index]
// 往服务器传数据
// socket.write(encode(lessonid))

socket.on('data', (buffer) => {
  // console.log('[client] @data:', buffer)
  // console.log('响应 [client] @data:', lessonid, buffer.toString())
  const seqBuffer = buffer.slice(0, 2)
  const titleBuffer = buffer.slice(2)
  console.log('响应 [client] @data:', seqBuffer.readInt16BE(), titleBuffer.toString())
})

setInterval(() => {
  const index = Math.floor(Math.random() * lessonids.length)
  const lessonid = lessonids[index]
  socket.write(encode(lessonid))
}, 50)

// 粘包测试：tcp会将同时发的包自动拼接成一个大的包来进行优化
// for (let i = 0; i < 100; i++) {
//   const index = Math.floor(Math.random() * lessonids.length)
//   const lessonid = lessonids[index]
//   socket.write(encode(lessonid))
// }