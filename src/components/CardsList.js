import { Card } from './Card.js'

export const CardsList = (items, handleClick) => {
  const cardRows = []
  let divElement = null
  const rows = [0, 6, 13]
  items.map((item, key) => {
    if (rows.includes(key)) {
      divElement = document.createElement('div')
      divElement.classList.add(
        'row',
        'pokemon-row',
        'justify-content-center',
        'align-items-center',
        'g-2'
      )
      cardRows.push(divElement)
    }
    const lastRow = Card(item, handleClick)
    divElement.appendChild(lastRow)
  })
  return cardRows
}
