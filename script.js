
const squares = document.querySelectorAll(".board div")
const resultMsg = document.querySelector("h2")
const playersTurnLetter = document.querySelector("span")
const playAgainBtn = document.getElementById("reset")
const playersTurnMsg = document.getElementById("players-turn-msg") 
const background = document.querySelector("body")
const weatherDescription = document.querySelector(".weather-description")
const clickSound = new Audio("click.wav")
const finishSound = new Audio("finish.wav")
const playerX = "X"
const playerO = "O"
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let player = "playerX"
let hasWon = false
let turns = 0


for (let square of squares) {
    square.addEventListener ("click", handleChoice)
}

playAgainBtn.addEventListener("click", handlePlayAgain)


function handleChoice (event) {
    let selectedSquare = event.target

    turns++ 
    clickSound.play()

    if (turns % 2 === 1) {
        player = playerX
        playersTurnLetter.innerText = playerO
    } else {
        player = playerO
        playersTurnLetter.innerText = playerX
    }

    selectedSquare.innerText = player
    selectedSquare.classList.add(player)
    selectedSquare.style.pointerEvents = "none"
    
    if (turns > 4) {
        checkWin() 
    }
}

function checkWin() {
    winningCombos.forEach(function(winningCombo) {
        let counter = 0
        winningCombo.forEach(function(combo){
            if (squares[combo].classList.contains(player)) {
                counter++
            }
        })
        if (counter === 3) {
            hasWon = true
            winner()
        } 
    })
    if (turns === 9 && hasWon === false) {
        draw()
    }
}

function winner () {
    finishSound.play()
    for (let square of squares) {
        square.style.pointerEvents = "none"
    }
    resultMsg.classList.add('animate__animated', 'animate__lightSpeedInLeft')
    resultMsg.innerHTML = `Player ${player} is the winner &#9786;`
    playersTurnMsg.style.display = "none"
    playAgainBtn.style.visibility = "visible"
    playAgainBtn.classList.add('animate__animated', 'animate__heartBeat', 'animate__delay-1s', 'animate__infinite')
    if (player === "X") { 
        background.classList.add("backgroundx")
        weatherDescription.innerText = "Sun's out!"
    } else if (player === "O") {
        background.classList.add("backgroundo")
        weatherDescription.innerText = "Here comes the rain..."
    }
}

function draw () {
    finishSound.play()
    resultMsg.classList.add('animate__animated', 'animate__lightSpeedInLeft')
    resultMsg.innerHTML = "It's a draw &#9786"
    weatherDescription.innerText = "It's cloudy with a chance of meatballs"
    playersTurnMsg.style.display = "none"
    playAgainBtn.style.visibility = "visible"
    playAgainBtn.classList.add('animate__animated', 'animate__heartBeat', 'animate__delay-1s', 'animate__infinite')
}

function handlePlayAgain () {
    clickSound.play()
    for (let square of squares) {
        square.classList.remove("X")
        square.classList.remove("O")
        square.style.pointerEvents = "auto"
        square.innerText = ""
    }
    playersTurnMsg.style.display = "block"
    playersTurnLetter.innerText = "X"
    playAgainBtn.style.visibility = "hidden"
    playAgainBtn.classList.remove('animate__animated', 'animate__heartBeat', 'animate__infinite')
    resultMsg.innerText = ""
    resultMsg.classList.remove('animate__animated', 'animate__lightSpeedInLeft')
    weatherDescription.innerText = ""
    background.classList.remove("backgroundo")
    background.classList.remove("backgroundx")
    turns = 0
    hasWon = false
    player = "playerX"
}