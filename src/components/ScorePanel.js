export const ScorePanel = (time, score, resetGame) => {
  const scorePanelElement = document.createElement('section')
  scorePanelElement.classList.add('container-fluid')

  const Timer = (time) => {
    return `
      <div class="col-auto p-2">
      <h2>Time</h2>
      <p class="h2 timer-text">${time}</p>
      </div>
      `
  }

  const Score = (score) => {
    return `
     <div class="col-auto p-2">
     <h2>Score</h2>
     <p class="h2 score-text">${score}</p>
     </div>
     `
  }

  scorePanelElement.innerHTML = `
 <div class="row score-board justify-content-evenly align-items-center g-2 text-center">
 ${Timer(time)}
 ${Score(score)}
 <div class="col-auto p-2">
 <button class='custom-btn py-2 px-3 btn-16'>Reset game</button>
 </div>
 </div>
 `

  const timerText = scorePanelElement.querySelector('.timer-text')
  const scoreText = scorePanelElement.querySelector('.score-text')
  const resetButton = scorePanelElement.querySelector('button')
  resetButton.addEventListener('click', resetGame)
  console.log(resetButton)
  return [scorePanelElement, timerText, scoreText]
}
