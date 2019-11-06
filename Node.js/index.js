// console.log(process)
// console.log(process.argv)
// console.log(process.env)
// console.log(process.cpuUsage)
// console.log(process.memoryUsage)
// console.log(process.exit)
// console.log(process.kill)
const game = require('./lib')
// const playerAction = process.argv[process.argv.length - 1]
// console.log('playerAction:', playerAction)
// const result = game(playerAction)
// console.log(result)

let count = 0
process.stdin.on('data', (buffer) => {
  const playerAction = buffer.toString().trim()
  // console.log('playerAction---', playerAction)
  const result = game(playerAction)
  console.log(result)
  if (result === 1) {
    count++
  }
  if (count === 3) {
    console.log('你太厉害了，我不玩了！')
    process.exit()
  }
})
