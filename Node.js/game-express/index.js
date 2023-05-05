const express = require('express')
const fs = require('fs')
const path = require('path')
const game = require('../game')

const app = express()

let playerWonCount = 0
let playerLastAction = ''
let sameActionCount = 0

app.get('/favicon.ico', (req, res) => {
  res.status(200)
  res.send()
})

app.get('/', (req, res) => {
  // const file = fs.readFileSync(path.join(__dirname, '../game/index.html'))
  // res.set({ 'Content-Type': 'text/html' })

  const file = fs.readFileSync(path.join(__dirname, '../game/index.html'), { encoding: 'utf-8' })

  res.status(200)
  res.send(file)
})

app.get(
  '/game',
  // 中间件洋葱模型
  (req, res, next) => {
    console.log('middleware start 0')

    const playerAction = req.query.action

    if (playerAction === 'reset') {
      playerWonCount = 0
      playerLastAction = ''
      sameActionCount = 0
      res.status(200)
      res.send('让我们重新开始吧！')
      return
    }

    if (playerWonCount === 3 || sameActionCount === 9) {
      res.status(500)
      res.send('我再也不跟你玩了！')
      return
    }

    if (sameActionCount === 3) {
      sameActionCount = 9
      res.status(400)
      res.send('你一直出同一种拳，你作弊！')
      return
    }

    next()

    if (res.playerWon) {
      playerWonCount++
    }

    console.log('middleware end 0')
  },

  (req, res, next) => {
    console.log('middleware start 1')
    const playerAction = req.query.action

    // if (playerAction === 'reset') {
    //   playerWonCount = 0
    //   playerLastAction = ''
    //   sameActionCount = 0
    //   res.status(200)
    //   res.send('让我们重新开始吧！')
    //   return
    // }

    // if (playerWonCount === 3 || sameActionCount === 9) {
    //   res.status(500)
    //   res.send('我再也不跟你玩了！')
    //   return
    // }

    // if (sameActionCount === 3) {
    //   sameActionCount = 9
    //   res.status(400)
    //   res.send('你一直出同一种拳，你作弊！')
    //   return
    // }

    // 当玩家操作与上次相同，则连续相同操作统计次数+1，否则统计清零
    // 当玩家操作连续三次相同，则视为玩家作弊，把sameCount置为9代表有过作弊行为
    if (!playerLastAction || playerLastAction === playerAction) {
      sameActionCount++
    } else {
      sameActionCount = 0
    }
    playerLastAction = playerAction

    // res.status(200)
    // const gameResult = game(playerAction)
    // if (gameResult === 0) {
    //   res.send('平局')
    // } else if (gameResult === -1) {
    //   res.send('你输了')
    // } else {
    //   playerWonCount++
    //   res.send('你赢了')
    // }

    res.playerAction = playerAction
    next()
    console.log('middleware end 1')
  },

  (req, res) => {
    console.log('middleware start 2')
    res.status(200)
    const { playerAction } = res
    const gameResult = game(playerAction)
    if (gameResult === 0) {
      res.send('平局')
    } else if (gameResult === -1) {
      res.send('你输了')
    } else {
      // playerWonCount++
      res.playerWon = true
      res.send('你赢了')
    }

    // express 洋葱模型异步问题
    // setTimeout(() => {
    //   res.status(200)
    //   const { playerAction } = res
    //   const gameResult = game(playerAction)
    //   if (gameResult === 0) {
    //     res.send('平局')
    //   } else if (gameResult === -1) {
    //     res.send('你输了')
    //   } else {
    //     // playerWonCount++
    //     res.playerWon = true
    //     res.send('你赢了')
    //   }
    // }, 100)
  }
)

app.listen(3000)
