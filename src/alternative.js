// Utils
function shuffleArray(array) {
  var currentIndex = array.length
  var randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element using destructuring assignment.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
var randomNumList = Array(10)
  .fill()
  .map((array, key) => {
    console.log(array, key)
    return Math.floor(200 * Math.random() + 1)
  })

// Main
const BoardGame = async (rootElement) => {
  const Row = (PokemonBox) => {
    return `<div class="row justify-content-center align-items-center g-2">${PokemonBox}</div>`
  }
  const PokemonBox = (imgSrc) => {
    return `
      <div class="col-auto pokemon-card-box">
        <img class="cover-img" id="cover-img" src="cover-card.jpeg" alt="pokemon card">
        <img class="pokemon-img" src="${imgSrc}">
      </div>
    `
  }

  //Fetch pokemons
  const URL = 'https://pokeapi.co/api/v2/pokemon'

  const pokemonPromises = randomNumList.map(async (randomNum) => {
    const id = randomNum
    try {
      console.log('Fetching data for id:', id)
      const response = await fetch(`${URL}/${id}`)
      const pokemon_data = await response.json()
      return pokemon_data
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  })
  const pokemonList = await Promise.all(pokemonPromises)
  var pokemonListClones = [...pokemonList, ...pokemonList]
  pokemonListClones = shuffleArray(pokemonListClones)

  var htmlBoard = ``
  var pokemonRow = ``
  var rows = [4, 9, 14, 19]
  pokemonListClones.map((pokemon, key) => {
    const pokemonImg = pokemon.sprites['front_default']
    pokemonRow += PokemonBox(pokemonImg)
    if (
      key === rows[0] ||
      key === rows[1] ||
      key === rows[2] ||
      key === rows[3]
    ) {
      htmlBoard += Row(pokemonRow)
      pokemonRow = ``
    }
  })

  return rootElement.html(htmlBoard)
}

// Insert the generated HTML into the DOM
const rootElement = $('.row') // Change this selector to match your actual element
BoardGame(rootElement)
