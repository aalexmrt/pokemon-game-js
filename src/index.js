import { getPokemons } from './data/index.js'
import { getRandomNumList, shuffleArray } from './utils/index.js'
import { hideCard, showCard } from './components/Card.js'
import { BoardGame, failSound, matchSound } from './components/BoardGame.js'
import { ScorePanel } from './components/ScorePanel.js'
import { checkEndGame, checkSelectedCards } from './logic/index.js'
import { WinGame } from './components/WinGame.js'
import { GameOver } from './components/GameOver.js'

const TOTAL_POKEMONS = 6
const GAME_DURATION_SECONDS = 30
const TIMER_INTERVAL_MS = 1000

let selectedCards = []
let matchedCards = []
let score = 0
let time = GAME_DURATION_SECONDS
let currentGame = null
let updateGameScore = null
let winGame = null
let loseGame = null

const resetGame = () => {
  const lastGame = currentGame
  currentGame = null
  clearInterval(lastGame)
  selectedCards = []
  matchedCards = []
  score = 0
  time = GAME_DURATION_SECONDS
  Game()
}

const handleClick = (e) => {
  const card = e.currentTarget
  showCard(card)
  selectedCards.push(card)

  if (selectedCards.length < 2) {
    return
  }

  if (!checkSelectedCards(selectedCards)) {
    failSound()
    selectedCards.forEach((card) => hideCard(card))
  } else {
    matchSound()
    score++
    updateGameScore(score)
    matchedCards.push([...selectedCards])
  }
  selectedCards = []
  if (checkEndGame(matchedCards.length, TOTAL_POKEMONS)) {
    winGame()
    // clearInterval(currentGame)
  }
}

const startGameTimer = (timerText) => {
  currentGame = setInterval(() => {
    time--
    timerText.textContent = time
    if (checkEndGame(matchedCards.length, TOTAL_POKEMONS)) {
      clearInterval(currentGame)
      return
    }
    if (time === 0) {
      loseGame()
      clearInterval(currentGame)
      return
    }
  }, TIMER_INTERVAL_MS)
}

const Game = async () => {
  // Prepare Score Board panel
  const rootElement = document.getElementById('root')
  rootElement.innerHTML = ''
  const [scorePanelElement, timerText, scoreText] = ScorePanel(
    time,
    score,
    resetGame
  )
  updateGameScore = (score) => {
    scoreText.textContent = score
  }
  winGame = () => {
    rootElement.appendChild(winGameElement)
  }
  loseGame = () => {
    rootElement.appendChild(loseGameElement)
  }
  // Get pokemons and prepare Board Game
  const URL = 'https://pokeapi.co/api/v2/pokemon'
  const randomList = getRandomNumList(TOTAL_POKEMONS)
  const pokemonsPromises = await getPokemons(URL, randomList)
  const pokemonList = await Promise.all(pokemonsPromises)
  let pokemonListCloned = [...pokemonList, ...pokemonList]
  pokemonListCloned = shuffleArray(pokemonListCloned)
  const boardGameElement = BoardGame(pokemonListCloned, handleClick)
  const winGameElement = WinGame(resetGame)
  const loseGameElement = GameOver(resetGame)
  // Append Score Board and Board Game to DOM Element
  rootElement.appendChild(scorePanelElement)
  rootElement.appendChild(boardGameElement)

  // Start game timer
  startGameTimer(timerText)
}

// Call main function
Game()
