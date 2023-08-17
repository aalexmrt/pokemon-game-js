export const getPokemons = async (URL, pokemonsId) => {
  return pokemonsId.map(async (id) => {
    try {
      console.log('Fetching data for id:', id)
      const response = await fetch(`${URL}/${id}`)
      const pokemonData = await response.json()
      return pokemonData
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  })
}
