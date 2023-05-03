module.exports = function (playerAction) {
  let computerAction
  let random = Math.random() * 3
  if (random < 1) {
    computerAction = 'rock'
  } else if (random > 2) {
    computerAction = 'scissor'
  } else {
    computerAction = 'paper'
  }
  // console.log('computerAction:', computerAction)
  let result = 0
  if (playerAction === computerAction) {
    // console.log('平局')
    result = 0
  } else if (
    (computerAction === 'rock' && playerAction === 'paper') ||
    (computerAction === 'scissor' && playerAction === 'rock') ||
    (computerAction === 'paper' && playerAction === 'scissor')
  ) {
    // console.log('【玩家】赢，【机器人】输')
    result = -1
  } else {
    // console.log('【机器人】赢，【玩家】输')
    result = 1
  }
  console.table([
    {
      playerAction,
      computerAction,
      result,
      name: result === 0 ? '平局' : result === -1 ? '【玩家】赢，【机器人】输' : '【机器人】赢，【玩家】输',
    }
  ])
  return result
}