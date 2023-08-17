export const WinGame = () => {
  const divElement = document.createElement('section')

  divElement.classList.add('winner')

  divElement.innerHTML = `
 <div class='text'>
 <h2> You win!! </h2>
 </div>
 `

  return divElement
}
