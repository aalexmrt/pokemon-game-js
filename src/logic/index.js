export const checkSelectedCards = (selectedCards) => {
  if (
    selectedCards[0].querySelector('.back-card').src ===
    selectedCards[1].querySelector('.back-card').src
  ) {
    return true
  } else {
    return false
  }
}

export const checkEndGame = (matchedCards, totalPokemons) => {
  if (matchedCards === totalPokemons) {
    return true // Win
  }
}
