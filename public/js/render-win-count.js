export default renderWinCount

const crossWinCountElement = document.querySelector('.cross-win-count')
const circleWinCountElement = document.querySelector('.circle-win-count')

function renderWinCount(crossWinCount, circleWinCount){
  crossWinCountElement.innerText = `cross win count: ${crossWinCount}`
  circleWinCountElement.innerText = `circle win count: ${circleWinCount}`
}
