document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetBtn = document.getElementById("resetBtn");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }
    function handleCellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                status.textContent = `Player ${currentPlayer} wins!`;
            } else if (gameBoard.every(cell => cell !== "")) {
                status.textContent = "It's a tie!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }
    function renderBoard() {
        gameBoard.forEach((value, index) => {
            const cell = board.children[index];
            cell.textContent = value;
        });
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }
    resetBtn.addEventListener("click", () => {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        renderBoard();
        status.textContent = "Player X's turn";
    });
});
