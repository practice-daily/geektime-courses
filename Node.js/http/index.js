const http = require( 'http')
const fs = require('fs')
const path = require('path')
// const url = require('url')
// const querystring = require('querystring')

const game = require('../game/index')

let playerWonCount = 0
let playerLastAction = ''
let sameActionCount = 0

http.createServer((req, res) => {
  console.log('url:', req.url)

  // 第一种方法解析 url
  // const parsedUrl = url.parse(req.url)
  // const query = querystring.parse(parsedUrl.query)
  // console.log(query)

  // 第二种方法解析 url
  // const parsedUrl = url.parse(req.url, true)
  // const { pathname, query } = parsedUrl

  // 第三种方法解析 url (nodejs 最新版已经建议改用 URL 对象解析)
  const parsedUrl = new URL(req.url, 'http://localhost:3000')
  const { pathname } = parsedUrl

  console.log('parsedUrl:', parsedUrl)

  if (pathname === '/favicon.ico') {
    res.writeHead(200)
    res.end()
    return
  }

  if (pathname === '/') {
    res.writeHead(200)
    // res.end('Hello World!')
    fs.createReadStream(path.join(__dirname, '../game/index.html')).pipe(res)
    return
  }

  if (pathname === '/game') {
    // res.writeHead(200, 'OK', {
    //   'Content-Type': 'application/json'
    // })
    // const json = {
    //   errCode: 0,
    //   errMessage: 'success',
    //   data: null,
    // }
    // res.end(JSON.stringify(json))

    // const playerAction = query.action

    const query = parsedUrl.searchParams
    const playerAction = query.get('action')

    if (playerAction === 'reset') {
      playerWonCount = 0
      playerLastAction = ''
      sameActionCount = 0
      res.writeHead(200)
      res.end('让我们重新开始吧！')
      return
    }

    if (playerWonCount === 3 || sameActionCount === 9) {
      res.writeHead(500)
      res.end('我再也不跟你玩了！')
      return
    }

    if (sameActionCount === 3) {
      sameActionCount = 9
      res.writeHead(400)
      res.end('你一直出同一种拳，你作弊！')
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

    res.writeHead(200)
    const gameResult = game(playerAction)
    if (gameResult === 0) {
      res.end('平局')
    } else if (gameResult === -1) {
      res.end('你输了')
    } else {
      playerWonCount++
      res.end('你赢了')
    }
  }
}).listen(3000)
