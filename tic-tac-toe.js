const gameBoard = (function () {
    const columns_rows = 3;
    const board = [];

    const createBoard = () => {
        for (let i = 0; i < columns_rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns_rows; j++) {
                board[i].push(cell());
            }
        }
    }

    const getBoard = () => board;

    const dropToken = (row, column, player) => {
        if (board[row][column].getValue() !== "") return false;

        board[row][column].addToken(player);
        return true;
    }

    const checkWin = (player) => {
        for (let i = 0; i < columns_rows; i++) {
            if (board[i][0].getValue() == player && board[i][1].getValue() == player && board[i][2].getValue() == player) {
                return true;
            }
            if (board[0][i].getValue() == player && board[1][i].getValue() == player && board[2][i].getValue() == player) {
                return true;
            }
        }

        if (board[0][0].getValue() == player && board[1][1].getValue() == player && board[2][2].getValue() == player) {
            return true;
        }

        if (board[0][2].getValue() == player && board[1][1].getValue() == player && board[2][0].getValue() == player) {
            return true;
        }
    }

    const checkTie = () => {
        const hasEmptyCell = board.some(row => row.some(cell => cell.getValue() === ""));
        return !hasEmptyCell;
    }

    return {createBoard, getBoard, dropToken, checkWin, checkTie};
})();


function cell() {
    let value = "";

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addToken, getValue};
}


const gameController = (function (playerOneName = "Player One", playerTwoName = "Player Two") {
    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];

    let activePlayer = players[0];

    gameBoard.createBoard();

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {

        if (gameBoard.dropToken(row, column, getActivePlayer().token)) {

            if (gameBoard.checkWin(getActivePlayer().token)) {
                gameBoard.createBoard();
                return "win";
            }
    
            else if (gameBoard.checkTie()) {
                gameBoard.createBoard();
                return "tie";
            }
            switchPlayerTurn();
        }
    };

    return {
        playRound,
        getActivePlayer
    };
})();


const screenController = (function () {
    const player1 = document.querySelector(".player1");
    const player2 = document.querySelector(".player2");
    const boardDiv = document.querySelector(".board");
    const cells = document.querySelectorAll(".cell");
    const dialog = document.querySelector("dialog");
    

    const updatePlayer = () => {
        let activePlayer = gameController.getActivePlayer();
        if (activePlayer.name === "Player One") {
            player2.classList.remove("active");
            player1.classList.add("active");
        }
        else if (activePlayer.name === "Player Two") {
            player1.classList.remove("active");
            player2.classList.add("active");
        }
    }

    const updateBoard = () => {
        const board = gameBoard.getBoard();

        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const column = parseInt(cell.dataset.col);
            cell.textContent = board[row][column].getValue();
        })
    
    }

    const playWithBoard = () => {
        boardDiv.addEventListener("click", (event) => {

            if (event.target.className === "cell") {
                const row = event.target.getAttribute("data-row");
                const column = event.target.getAttribute("data-col");

                const playRound = gameController.playRound(row, column);

                if (playRound === "win") {
                    const winner = gameController.getActivePlayer().name.toUpperCase();
                    dialog.textContent = `${winner} WINS!`;
                    dialog.showModal();
                }
                
                if (playRound === "tie") {
                    dialog.textContent = "IT'S A TIE";
                    dialog.showModal();
                }

                updateBoard();
                updatePlayer()
            };
        })
    }

    const playGame = () => {
        updatePlayer();
        playWithBoard();
    }

playGame()

})()