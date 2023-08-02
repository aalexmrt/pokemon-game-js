// main.js

// Utils
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

function get_random_numbers() {
  let generated_random_num = []
  const generate_total_pokemons = 10
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
let first_pokemon_card = []
let second_pokemon_card = []
let matched_pokemons = []
let game_running = false
let matchPokemons_init = false

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
  const welcome_container = document.getElementById('welcome-game-msg')
  welcome_container.style.display = 'None'
}

const pokemon_table_board = document.getElementById('pokemon-table-board')

function buildPokemonBoardCards() {
  // Remove all HTML from pokemon table board. RESET
  pokemon_table_board.classList.add('pokemon-table-board')
  pokemon_table_board.innerHTML = ''
  // Shuffle array
  shuffle(pokemon_data)
  // Build the DOM with pokemons
  for (const key of Object.keys(pokemon_data)) {
    const cardInner = document.createElement('div')
    const cardFront = document.createElement('div')
    const cardBack = document.createElement('div')

    cardInner.classList.add('card-inner')
    cardFront.classList.add('card-front')
    cardBack.classList.add('card-back')

    // Back card
    const cardBackImg = document.createElement('img')
    cardBackImg.classList.add('pokemon-img')
    cardBackImg.src = pokemon_data[key]['img']
    const cardBackTitle = document.createElement('h2')
    cardBackTitle.classList.add('pokemon-name')
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

    pokemon_table_board.appendChild(cardInner)
  }
}

// Score boards
const score_board = document.getElementById('score-board')
const timer = document.getElementById('time')
const score_mark = document.getElementById('score')
let timer_p = document.createElement('p')
let score_p = document.createElement('p')
let timer_text = document.createTextNode('\u00A0')
let score_text = document.createTextNode('\u00A0')

function buildScoreBoard() {
  timer_p.innerHTML = ''
  score_p.innerHTML = ''

  timer_p.appendChild(timer_text)
  score_p.appendChild(score_text)

  timer.appendChild(timer_p)
  score_mark.appendChild(score_p)
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

function startGame() {
  let time = 60
  let score = 0
  time = time * 1000

  timer_text.nodeValue = time
  score_text.nodeValue = score
  var game = setInterval(() => {
    game_running = true
    if (time % 1000 == 0) {
      timer_text.nodeValue = time / 1000
    }
    time = time - 25
    score_text.nodeValue = matched_pokemons.length
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

const url = 'https://pokeapi.co/api/v2/pokemon/'
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
  buildScoreBoard()
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
