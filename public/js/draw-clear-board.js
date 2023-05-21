export default drawCleanBoard

const cells = document.querySelectorAll('.cell')

function drawCleanBoard(state) {

  for (let i = 0; i < state.length; i++) {
    cells[i].className = 'cell'
  }

}