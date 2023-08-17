export const GameOver = () => {
  const divElement = document.createElement('section')

  divElement.classList.add('winner')

  divElement.innerHTML = `
<div class='text'>
<h2> Game Over!! </h2>
</div>
`

  return divElement
}
