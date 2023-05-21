module.exports = chekConnectionPlayers

function chekConnectionPlayers(currentPlayer,circle, cross) {
  if (cross && circle) {
    currentPlayer = cross
    cross.send(JSON.stringify({ type: 'start', you: 'x', player: 'x', msg: 'game start' }))
    circle.send(JSON.stringify({ type: 'start', you: 'circle', player: 'x', msg: 'game start' }))
  }
  return currentPlayer
}

