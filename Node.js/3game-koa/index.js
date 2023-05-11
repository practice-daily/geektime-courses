const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const mount = require('koa-mount')
const game = require('../game/index')

const app = new Koa()

let req_id = 0
let playerWonCount = 0
let playerLastAction = ''
let sameActionCount = 0

const gameKoa = new Koa()
gameKoa.use(async (ctx, next) => {
  const start = Date.now()

  ctx.reqId = ++req_id
  const { reqId } = ctx
  console.log()
  console.log(reqId, 'gameKoa start 0')

  const playerAction = ctx.query.action
  if (playerAction === 'reset') {
    playerWonCount = 0
    playerLastAction = ''
    sameActionCount = 0
    ctx.status = 200
    ctx.body = reqId + '让我们重新开始吧！'
    return
  }

  if (playerWonCount >= 3) {
    ctx.status = 500
    ctx.body = reqId + '你都赢麻了，我再也不跟你玩了！'
    return
  }

  const ret = await next()

  if (ctx.playerWon) {
    playerWonCount++
  }

  console.log(reqId, 'gameKoa end 0:', ret)

  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

gameKoa.use(async (ctx, next) => {
  const { reqId } = ctx
  console.log(reqId, 'gameKoa start 1')

  const playerAction = ctx.query.action

  if (sameActionCount === 9) {
    ctx.status = 500
    ctx.body = reqId + '你作弊，我再也不跟你玩了！'
    return
  }

  if (sameActionCount === 3) {
    sameActionCount = 9
    ctx.status = 400
    ctx.body = reqId + '你一直出同一种拳，你作弊！'
    return
  }

  // 当玩家操作与上次相同，则连续相同操作统计次数+1，否则统计清零
  // 当玩家操作连续三次相同，则视为玩家作弊，把sameCount置为9代表有过作弊行为
  if (!playerLastAction || playerLastAction === playerAction) {
    sameActionCount++
  } else {
    sameActionCount = 0
  }
  playerLastAction = playerAction

  ctx.playerAction = playerAction

  const ret = await next()

  console.log(reqId, 'gameKoa end 1:', ret)

  return { reqId, ret }
})

gameKoa.use(async (ctx, next) => {
  const { reqId } = ctx
  console.log(reqId, 'gameKoa start 2')

  // const gameResult = game(ctx.playerAction)
  // let gameDesc = ''
  // if (gameResult === 0) {
  //   gameDesc = '平局'
  // } else if (gameResult === -1) {
  //   gameDesc = '你输了'
  // } else {
  //   gameDesc = '你赢了'
  //   ctx.playerWon = true
  // }

  // ctx.status = 200
  // ctx.body = gameDesc

  // console.log('gameKoa end 2')
  // return { reqId, gameResult, gameDesc }

  /**
   * Koa 使用 async function 实现的中间件：
   * 有“暂停执行”的能力；
   * 在异步的情况下也符合洋葱模型。
   */
  await new Promise((resolve) => {
    setTimeout(() => {
      const gameResult = game(ctx.playerAction)
      let gameDesc = ''
      if (gameResult === 0) {
        gameDesc = '平局'
      } else if (gameResult === -1) {
        gameDesc = '你输了'
      } else {
        gameDesc = '你赢了'
        ctx.playerWon = true
      }

      ctx.status = 200
      ctx.body = reqId + gameDesc

      resolve({ reqId, gameResult, gameDesc })
      console.log(reqId, 'gameKoa end 2')
    }, 500)
  })
})

app.use(mount('/game', gameKoa))

app.use(mount('/favicon.ico', (ctx, next) => {
  ctx.status = 200
  ctx.body = ''
}))

// koa-mount 是模糊匹配， / 必须放在最后
app.use(mount('/', (ctx, next) => {
  ctx.status = 200
  ctx.body = fs.readFileSync(path.join(__dirname, '../game/index.html'), 'utf-8')
}))

app.listen(3000)
