const easyBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const mediumBoard = [
    [0, 2, 0, 6, 0, 8, 0, 0, 0],
    [5, 8, 0, 0, 0, 9, 7, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 0],
    [3, 7, 0, 0, 0, 0, 5, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 8, 0, 0, 0, 0, 1, 3],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 9, 8, 0, 0, 0, 3, 6],
    [0, 0, 0, 3, 0, 6, 0, 9, 0]
];

const hardBoard = [
    [0, 0, 0, 0, 0, 0, 0, 1, 2],
    [0, 0, 0, 0, 3, 5, 0, 0, 0],
    [0, 0, 9, 7, 0, 6, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 8, 3],
    [0, 0, 0, 0, 7, 0, 4, 0, 0],
    [0, 0, 0, 8, 6, 0, 0, 0, 0],
    [0, 0, 0, 5, 9, 0, 0, 0, 0],
    [7, 4, 0, 0, 0, 0, 0, 0, 0]
];

let currentBoard = [];

function createBoard(board) {
    currentBoard = board;
    const boardElement = document.getElementById('sudoku-board');
    boardElement.innerHTML = ''; // Reset board
    
    board.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            const inputElement = document.createElement('input');
            if (value !== 0) {
                inputElement.value = value;
                inputElement.classList.add('filled');
                inputElement.disabled = true;
            } else {
                inputElement.setAttribute('maxlength', 1);
                inputElement.oninput = () => validateInput(inputElement);
            }
            boardElement.appendChild(inputElement);
        });
    });
}

// Start the game based on difficulty
function startGame(difficulty) {
    if (difficulty === 'easy') {
        createBoard(easyBoard);
    } else if (difficulty === 'medium') {
        createBoard(mediumBoard);
    } else if (difficulty === 'hard') {
        createBoard(hardBoard);
    }
}

// Validate user input to ensure it's between 1-9
function validateInput(input) {
    const value = input.value;
    if (value < 1 || value > 9) {
        input.value = '';
    }
}

// Check the solution
function checkSolution() {
    const inputs = document.querySelectorAll('input:not(.filled)');
    let isComplete = true;

    inputs.forEach(input => {
        if (input.value === '') {
            alert('Please fill all cells.');
            isComplete = false;
            return;
        }
    });

    if (isComplete) {
        alert('Well done! You completed the Sudoku.');
    }
}

// Reset the board
function resetBoard() {
    createBoard(currentBoard);
}

// Call the createBoard function on page load with an easy board
window.onload = () => startGame('easy');
