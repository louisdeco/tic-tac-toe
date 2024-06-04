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
        if (board[row][column] < 1) return;

        board[row][column].addToken(player);
        alert(board[row][column].getValue());
    }

    const printBoard = () => {
        const boardWithCellValue = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValue)
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

    return {createBoard, getBoard, dropToken, printBoard, checkWin};
})();


function cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addToken, getValue};
}


const gameController = (function (playerOneName = "Player One", playerTwoName = "Player 2") {
    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ]

    let activePlayer = players[0];

    gameBoard.createBoard();

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row, column) => {
        console.log(`Dropping ${getActivePlayer().name} into row ${row + 1} and column ${column + 1}.`);
        gameBoard.dropToken(row, column, getActivePlayer().token);

        if (gameBoard.checkWin(getActivePlayer().token)) {
            console.log(`${getActivePlayer().name} wins!`);
            gameBoard.createBoard();
            return;
        }

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
    };
})();