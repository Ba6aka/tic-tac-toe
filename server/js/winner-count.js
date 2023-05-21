module.exports = winnerCount

function winnerCount(answerState, crossWinCount, circleWinCount) {
  const winner = answerState.split(' ')[0]
  
  if (winner === 'x') crossWinCount++
  else circleWinCount++

  return [crossWinCount, circleWinCount]
}