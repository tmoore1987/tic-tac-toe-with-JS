//store game status in a variable
const statusDisplay = document.querySelector('.status')

//variables that track status and will pause game until it ends
let gameActive = true;

let currentPlayer = 'X';

//current game state using empty strings
let gameState = ['', '', '', '', '', '', '', '', '']

//declare game ending or changing messages inside of a function
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `The game is a draw.`
const currentPlayerTurn = () => `It's player ${currentPlayer}'s turn.`

//initial message to let players know who's turn it is

statusDisplay.innerHTML = currentPlayerTurn()

//Values in an array for all winning conditions
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//update game to reflect the move played, plus the UI
const cellPlayed = (clickedCell, clickedCellIndex) =>{
    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = currentPlayer;

}

//change player until someone wins or there are still moves to be played
const playerChange = () => {
    currentPlayer = currentPlayer === 'X'? 'O': 'X';
    statusDisplay.innerHTML = currentPlayerTurn()
    
}


//check the state of the game with a loop. If the game state match the winning conditions, game ends. Otherwise, we change the player.

const resultValidation = () =>{
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b ===c) {
            roundWon = true;
            break;
        }
    }

        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }

        //Check if there are any values in our game state array that are not populated
        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }
        

        playerChange();

}


const cellClicked = (clickedCellEvent) => {
    //save clicked html event in a variable 
    const clickedCell = clickedCellEvent.target;
    //Grab data-cell-index from clicked cell event. It will return a string value, so we need to parse it into a number
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'))

    //check if cell has been played or paused. If not, continue the game
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();

}


const restartGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = '')

}



//event listeners

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClicked));
document.querySelector('.restart').addEventListener('click', restartGame);
