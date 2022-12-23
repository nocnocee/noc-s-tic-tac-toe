let title = document.getElementById('title')
let reButton = document.getElementById('reButton')
let boxes = Array.from(document.getElementsByClassName('box'))
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const thisIsO = 'o'
const thisIsX = 'x'

let thisPlayer = thisIsX
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

const endGame = () => {
    boxes.forEach(box => box.removeEventListener('click', boxClicked))
}

const leftOver = () => {
    for (i = 0; i < spaces.length; i++) {
        if (spaces[i] == null) {
            return true
        }
    }
    return false
}

function boxClicked(e) {
    const id = e.target.id
    if(!spaces[id]){
        spaces[id] = thisPlayer
        e.target.innerText = thisPlayer
        
        let winningBlocks = playerWon()
        
        if (winningBlocks) {
            title.innerHTML = `${thisPlayer} won !!`
            winningBlocks.map( boxIndex => boxes[boxIndex].style.backgroundColor=winnerIndicator)
            endGame()     
        } else if (!leftOver()) {
            title.innerHTML = `It's a Tie !!`
        } else {
            if (thisPlayer == thisIsX) {
                thisPlayer = thisIsO
            } else {
                thisPlayer = thisIsX
            }
            title.innerHTML = `It's ${thisPlayer}'s turn`
        }
    }
}


reButton.addEventListener('click', restart)

function restart() {
    spaces.fill(null)
    startGame()
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })
    
    title.innerHTML = `Tic Tac Toe`
    
    thisPlayer = thisIsX
}


const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


function playerWon() {
    for (let condition of winCombos) {
        let [a, b, c] = condition
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        } 
        
    }
    return false
}


startGame()
