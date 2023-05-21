export default renderPlayerInformation
const h1 = document.querySelector('h1')
const h2 = document.querySelector('h2')

function renderPlayerInformation(player, you ){
  if (you){
    h2.innerText = ` You are ${you}`
  }

  h1.innerText = `Now step ${player} `
 
}