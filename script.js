
const squares = document.querySelectorAll(".board div")
const resultMsg = document.querySelector("h2")
const playersTurnLetter = document.querySelector("span")
const playAgainBtn = document.querySelector(".reset")
const playersTurnMsg = document.querySelector("h3") 
const playerX = "X"
const playerO = "O"
let player = "playerX"
let hasWon = false
let turns = 0
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


for (let square of squares) {
    square.addEventListener ("click", handleChoice)
}

playAgainBtn.addEventListener("click", handlePlayAgain)

function handleChoice (event) {
    turns++ 
    
    let selectedSquare = event.target

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
    resultMsg.style.display = "block"
    playAgainBtn.style.display = "block"
    for (let square of squares) {
        square.style.pointerEvents = "none"
    }
    playersTurnMsg.style.visibility = "hidden"
    resultMsg.innerHTML = `The winner is Player ${player} !`
}

function draw () {
    resultMsg.style.display = "block"
    resultMsg.innerHTML = "It's a draw!"
    playAgainBtn.style.display = "block"
    playersTurnMsg.style.visibility = "hidden"
}

function handlePlayAgain () {
    for (let square of squares) {
        square.classList.remove("X")
        square.classList.remove("O")
        square.style.pointerEvents = "auto"
        square.innerText = ""
    }
    playersTurnLetter.innerText = "X"
    playAgainBtn.style.display = "none"
    resultMsg.style.display = "none" 
    playersTurnMsg.style.visibility = "visible"
    turns = 0
    hasWon = false
    player = "playerX"
}