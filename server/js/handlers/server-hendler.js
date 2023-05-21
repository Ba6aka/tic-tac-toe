module.exports = { handleServer }

const WebSocket = require('ws');
const checkWinCondition = require('../check-win-condtion.js')
const checkConnectionPlayers = require('../check-connection-player.js')
const { updateGame, notUpdateGame } = require('../update-game.js')
const { serveFile } = require('../serve-file.js')
const { stringify } = JSON

let circle, cross, answer, currentPlayer, player, crossWinCount, circleWinCount
let state = ['', '', '', '', '', '', '', '', '']

crossWinCount = circleWinCount = 0

async function handleServer(server) {
  const wss = new WebSocket.Server({ server })

  server.on('request', async (request, response) => {
    const method = request.method

    if (method == 'GET') {
      serveFile(request, response)
    }
  })

  wss.on('connection', (ws) => {
    if (!cross) {
      cross = ws
      currentPlayer = checkConnectionPlayers(currentPlayer, circle, cross)
    } else if (!circle) {
      circle = ws
      currentPlayer = checkConnectionPlayers(currentPlayer, circle, cross)
    }

    ws.onclose = () => {
      state = ['', '', '', '', '', '', '', '', '']

      const disconnectedMessage = ({ type: 'disconnect', msg: 'your opponent disconnected', state: state })

      if (ws == cross) {
        cross = null
        circle?.send(stringify(disconnectedMessage))
      } else {
        circle = null
        cross?.send(stringify(disconnectedMessage))
      }
    }

    ws.onmessage = (message) => {
      const msg = JSON.parse(message.data)

      if (ws == currentPlayer) {
        switch (msg.type) {
          case 'game-state':
            if (!state[msg.move]) {
              currentPlayer === cross ? state[msg.move] = 'x' : state[msg.move] = 'circle'
              currentPlayer = currentPlayer === cross ? circle : cross
              player = currentPlayer === cross ? 'x' : 'circle'

              const answerState = checkWinCondition(state)

              answer = updateGame(state, answerState, player, crossWinCount, circleWinCount)

              if (answer.type === 'win' || answer.type === 'standoff') {
                state = ['', '', '', '', '', '', '', '', '']
              }

              circle.send(stringify(answer))
              cross.send(stringify(answer))
            } else {
              currentPlayer = currentPlayer

              answer = notUpdateGame(state, player)
              currentPlayer.send(stringify(answer))
            }
            break;
        }
      }
    }
  })
}


