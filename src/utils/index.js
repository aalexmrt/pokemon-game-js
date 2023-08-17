// Utils
const playSound = (sound) => {
  var audio = new Audio(sound)
  audio.play()
}

const shuffleArray = (array) => {
  let currentIndex = array.length
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

const getRandomNumList = (size) => {
  console.log('hel')
  let randomNumList = []
  while (randomNumList.length < size) {
    const newRandom = Math.floor(Math.random() * 200) + 1
    if (randomNumList.indexOf(newRandom) === -1) {
      randomNumList.push(newRandom)
    }
  }
  console.log(randomNumList)
  return randomNumList
}

export { playSound, shuffleArray, getRandomNumList }
