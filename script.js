// store game status in a variable
const statusDisplay = document.querySelector('.status'); 

//variables that track the status
//game active will pause the game in case it ends
let gameActive = true;

//current player
let currentPlayer = 'X';

//current game state using empty strings in an array
let gameState = ['', '', '', '', '', '', '', '', '']

//declare game ending or chaning messages inside of functions

const winningMessage = () => `Player ${currentPlayer} has won the game!`;
const drawMessage = () => `The game has ended in a draw :(`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn.`;

//set initial message to let players know who's turn it is

statusDisplay.innerHTML = currentPlayerTurn();

//Values in arrays for our winningConditions are indexes for cells that need to be populated by the same player for them to be considered a victor.
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    
]

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
//Updated game state to reflect the move played and update the UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

//     If we get to here we know that the no one won the game yet, 
// and that there are still moves to be played, so we continue by changing the current player.
const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' :'X';
    statusDisplay.innerHTML = currentPlayerTurn()
} 



//In the for-loop, we go through each one and check whether the elements of our 
//game state array under those indexes match. If they do match we move on to declare the current player as victorious and ending the game.

const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]]
        if (a === '' || b === '' || c=== '') {
            continue;
        } 
        if (a ===b && b===c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
//We will check weather there are any values in our game state array 
//that are still not populated with a player sign
    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();


}

const handleCellClicked = (clickedCellEvent) => {
    //save clicked html event in a variable 
    const clickedCell = clickedCellEvent.target;
    //Grab data-cell-index from clicked cell event. It will return a string value, so we need to parse it into a number
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'))

    //check if cell has been played or paused. If not, continue the game
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    
    }
    //if ok, proceed with game
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

const handleRestartGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', '']
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = '')
}

//add event listeners for game cell plus the restart button

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClicked));
document.querySelector('.restart').addEventListener('click', handleRestartGame);