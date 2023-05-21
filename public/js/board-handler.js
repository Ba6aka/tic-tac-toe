import ws from "../script.js"

export default boardHandler

const board = document.querySelector('.board')

function boardHandler() {
  board.addEventListener('click', (e) => {

    if (e.target.id) {
      const state = {
        'type': 'game-state',
        'move': e.target.id
      }

      ws.send(JSON.stringify(state))
    }
    
  })

}

