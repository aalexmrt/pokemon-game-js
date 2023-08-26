import { playSound } from '../utils/index.js'
import { CardsList } from './CardsList.js'

export const matchSound = () => {
  return playSound('./assets/sounds/correct.mp3')
}

export const failSound = () => {
  return playSound('./assets/sounds/fail.mp3')
}

export const BoardGame = (pokemonsList, handleClick) => {
  const divElement = document.createElement('section')
  divElement.innerHTML = `<div class="container"><div class="row board-game"></div></div>`
  const boardGame = divElement.querySelector('.board-game')
  const cardsList = CardsList(pokemonsList, handleClick)
  // console.log(cardsList)
  cardsList.map((item) => {
    boardGame.appendChild(item)
  })

  // console.log(divElement)
  return divElement
}
