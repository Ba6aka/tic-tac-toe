module.exports = { updateGame, notUpdateGame }

const winnerCount = require('./winner-count.js')

function updateGame(state, answerState, player, crossWinCount, circleWinCount) {
  if (typeof answerState === 'string' && answerState !== 'Standoff') {
    let arrayOfWinnerCount = winnerCount(answerState, crossWinCount, circleWinCount)

    answer = { type: 'win', msg: answerState, state: state, player: player, crossCountWin: arrayOfWinnerCount[0], circleCountWin: arrayOfWinnerCount[1] }
    
  } else if (answerState === 'Standoff') {
    state = ['', '', '', '', '', '', '', '', '']
    answer = { type: 'standoff', state: state, player: player }
  }
  else {
    answer = { type: 'update-game-state', state: answerState, player: player }
  }
  return answer
}

function notUpdateGame(answerState, player) {
  answer = { type: 'not-update-game-state', state: answerState, player: player }

  return answer
}
