export const GameOver = (resetGame) => {
  const divElement = document.createElement('section')

  divElement.classList.add('end-game-modal')

  divElement.innerHTML = `
<div class='text'>
<h2> Game Over!! </h2>
<button class="custom-btn">Reset game</button>
</div>
`
  divElement.querySelector('button').addEventListener('click', resetGame)

  return divElement
}
