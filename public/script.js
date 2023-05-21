import startGame from "./js/start-game.js"
import boardHandler from "./js/board-handler.js"
import drawBoard from "./js/draw-board.js"
import winHandler from "./js/win-handler.js"
import drawCleanBoard from "./js/draw-clear-board.js"
import renderPlayerInformation from "./js/render-player-information.js"
import disconnectHandler from "./js/disconnect-handler.js"
import renderWinCount from "./js/render-win-count.js"

boardHandler()

const serverHost = window.location.hostname
const serverPort = window.location.port
const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
const wss = new WebSocket(`${protocol}://${serverHost}:${serverPort}`)

wss.onmessage = (message) => {

  const msg = JSON.parse(message.data)

  switch (msg.type) {
    case 'start':
      startGame()
      renderPlayerInformation(msg.player, msg.you)
      alert(msg.msg)
      break

    case 'update-game-state':
      drawBoard(msg.state)
      renderPlayerInformation(msg.player)
      break

    case 'not-update-game-state':
      confirm('fucking shit')
      break

    case 'standoff':
      confirm('standoff case')
      drawBoard(msg.state)
      setTimeout(() => {
        drawCleanBoard(msg.state)
      }, 700);
      renderPlayerInformation(msg.player)
      break

    case 'win':
      drawBoard(msg.state)
      setTimeout(() => {
        winHandler(msg.msg)
        drawCleanBoard(msg.state)
        renderPlayerInformation(msg.player)
        renderWinCount(msg.crossCountWin, msg.circleCountWin)
      }, 1000)
      break

    case 'disconnect':
      disconnectHandler(msg.msg)
      setTimeout(() => {
        drawCleanBoard(msg.state)
        renderPlayerInformation(msg.player)
      }, 1000)
      break
  }
}



export default wss

