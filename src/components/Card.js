export const hideCard = (item) => {
  setTimeout(() => {
    item.classList.remove('pokemon-card-box-animation')
  }, 200)
}

export const showCard = (item) => {
  item.classList.add('pokemon-card-box-animation')
}

export const Card = (item, handleClick) => {
  const img = item.sprites['front_default']

  const divElement = document.createElement('div')
  divElement.classList.add('col-auto', 'm-2', 'pokemon-card-box')

  divElement.innerHTML = `
    <img class="front-card" src="cover-card.jpeg" alt="cover pokemon image">
    <img class="back-card pokemon" src="${img}" alt="pokemon image">
 `
  divElement.addEventListener('click', handleClick)

  return divElement
}
