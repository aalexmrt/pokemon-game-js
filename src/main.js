// main.js

// Utils
function shuffle(array) {
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

function get_random_numbers() {
  const generate_total_pokemons = 10

  var generated_random_num = []
  // Fill generated_random_num with uniques numbers
  while (generated_random_num.length < generate_total_pokemons) {
    random_number = Math.floor(Math.random() * (200 - 1) + 1)
    if (generated_random_num.indexOf(random_number) === -1)
      generated_random_num.push(random_number)
  }
  return generated_random_num
}

// Pokemon cards animations, transitions and check if the selected cards are matching
const rotation_css_style = 'card-inner-rotation'
var first_pokemon_card = []
var second_pokemon_card = []
var matched_pokemons = []
var game_running = false
var matchPokemons_init = false

function matchPokemons(pokemon, card) {
  if (!game_running) {
    return false
  }

  if (!matchPokemons_init) {
    if (first_pokemon_card.length == 0) {
      first_pokemon_card[0] = pokemon
      first_pokemon_card[1] = card
      first_pokemon_card[1].classList.add(rotation_css_style)
    } else if (second_pokemon_card.length == 0) {
      second_pokemon_card[0] = pokemon
      second_pokemon_card[1] = card
      second_pokemon_card[1].classList.add(rotation_css_style)

      matchPokemons_init = true

      if (first_pokemon_card[0] != second_pokemon_card[0]) {
        setTimeout(() => {
          first_pokemon_card[1].classList.remove(rotation_css_style)
          second_pokemon_card[1].classList.remove(rotation_css_style)
          first_pokemon_card = []
          second_pokemon_card = []
          matchPokemons_init = false
        }, 600)
      } else if (first_pokemon_card[0] == second_pokemon_card[0]) {
        first_pokemon_card[1].classList.add('top-layer')
        second_pokemon_card[1].classList.add('top-layer')
        setTimeout(() => {
          matched_pokemons.push(pokemon['pokemon_name'])
          first_pokemon_card = []
          second_pokemon_card = []
          matchPokemons_init = false
        }, 600)
      }
    }
  }
}

function removeWelcomeGameMsg() {
  const welcome_container = $('#welcome-pokemon-game')
  welcome_container.addClass('d-none')
}

const pokemon_table_board = $('#pokemon-table-board')

function buildPokemonBoardCards() {
  // Remove all HTML from pokemon table board. RESET
  pokemon_table_board.addClass('pokemon-table-board')
  pokemon_table_board.html('')
  // Shuffle array
  shuffle(pokemon_data)
  // Build the DOM with pokemons
  for (const key of Object.keys(pokemon_data)) {
    const cardInner = document.createElement('div')
    const cardFront = document.createElement('div')
    const cardBack = document.createElement('div')

    cardInner.addClass('card-inner')
    cardFront.addClass('card-front')
    cardBack.addClass('card-back')

    // Back card
    const cardBackImg = document.createElement('img')
    cardBackImg.addClass('pokemon-img')
    cardBackImg.src = pokemon_data[key]['img']
    const cardBackTitle = document.createElement('h2')
    cardBackTitle.addClass('pokemon-name')
    cardBackTitle.innerText = pokemonName =
      // Capitalize pokemon name
      pokemon_data[key]['pokemon_name'].charAt(0).toUpperCase() +
      pokemon_data[key]['pokemon_name'].slice(1)

    cardBack.appendChild(cardBackImg)
    cardBack.appendChild(cardBackTitle)

    // Front card
    const frontCardImg = document.createElement('img')
    frontCardImg.classList.add('cover-img')
    frontCardImg.src = 'cover-card.jpeg'

    cardFront.appendChild(frontCardImg)

    cardInner.appendChild(cardFront)
    cardInner.appendChild(cardBack)

    cardInner.addEventListener('click', () => {
      matchPokemons(pokemon_data[key], cardInner)
    })

    pokemon_table_board.append(cardInner)
  }
}

// Display and generate final message with the result of the game
const end_game_result = document.createElement('h1')
const play_again_btn = document.createElement('button')

function endGame() {
  pokemon_table_board.innerHTML = ''
  pokemon_table_board.classList.add('end-game-container')
  end_game_result.classList.add('game-over')
  end_game_result.classList.add('grid-vertical-align')

  play_again_btn.classList.add('play-again-btn')
  play_again_btn.classList.add('grid-vertical-align')

  pokemon_table_board.classList.remove('pokemon-table-board')
  play_again_btn.innerText = 'PLAY AGAIN'

  play_again_btn.addEventListener('click', () => {
    buildPokemonBoardCards()
    startGame()
  })

  pokemon_table_board.appendChild(end_game_result)
  pokemon_table_board.appendChild(play_again_btn)
}

var gameSeconds = 60
var scorePoints = 0

function startGame() {
  gameSeconds = gameSeconds * 1000
  $('#timer-p').text(gameSeconds)
  $('#score-points-p').text(scorePoints)
  var game = setInterval(() => {
    game_running = true
    if (gameSeconds % 1000 == 0) {
      $('#timer-p').text(gameSeconds / 1000)
    }
    gameSeconds = gameSeconds - 25
    $('#score-points-p').text(matched_pokemons.length)
    if (matched_pokemons.length == pokemon_data.length - 10) {
      end_game_result.innerText = 'YOU WIN'
    }
    if (time < 0) {
      end_game_result.innerText = 'GAME OVER'
    }
    if (time < 0 || matched_pokemons.length == pokemon_data.length - 10) {
      clearInterval(game)
      endGame()
      game_running = false
    }
  }, 25)
}

const url = 'https://pokeapi.co/api/v2/pokemon/20'
let pokemon_data = []
let random_numbers = []

async function get_pokemons_promises() {
  pokemon_data = []
  random_numbers = get_random_numbers()
  // use map() to perform a fetch and handle the response for each url
  let get_pokemons = Promise.all(
    random_numbers.map((random_numbers) =>
      fetch(url + random_numbers)
        .then((response) => response.json())
        .then((pokemon_item) => {
          // fill pokemon_data with data objects of pokemons => ID, IMG, POKEMON_NAME
          pokemon_data.push({
            id: pokemon_item.id,
            img: pokemon_item.sprites['front_default'],
            pokemon_name: pokemon_item.name,
          })
        })
    )
  ).then(() => {
    // Duplicate pokemons
    for (const key of Object.keys(pokemon_data)) {
      pokemon_data.push(pokemon_data[key])
    }
  })

  return get_pokemons
}

function App() {
  const play_btn = document.getElementById('play-btn')
  play_btn.addEventListener(
    'click',
    () => {
      const promises = get_pokemons_promises()
      promises.then(() => {
        removeWelcomeGameMsg()
        buildPokemonBoardCards()
        startGame()
      })

      // runGame()
    },
    {
      once: true, // Trigger only once, event listener is removed when the button is clicked
    }
  )
}

App()
