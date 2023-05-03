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

let playerCount = 0
let computerCount = 0
let totalCount = 0
process.stdin.on('data', (buffer) => {
  const playerAction = buffer.toString().trim()
  // console.log('stdin playerAction:', playerAction)
  const result = game(playerAction)
  if (result === -1) {
    playerCount++
  } else if (result === 1) {
    computerCount++
  }
  totalCount++
  console.table([
    { name: '玩家赢', count: playerCount },
    { name: '机器人赢', count: computerCount },
    { name: '总次数', count: totalCount },
  ])
  if (playerCount === 3) {
    console.log('你太厉害了，我不玩了！')
    process.exit()
  }
})
