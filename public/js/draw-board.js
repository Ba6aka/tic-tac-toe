export default drawBoard

const cells = document.querySelectorAll('.cell')

function drawBoard(state) {

  for (let i = 0; i < state.length; i++) {
    if (state[i]) cells[i].classList.add(state[i])
  }

}