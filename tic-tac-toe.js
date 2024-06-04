const player1 = 1;

const gameBoard = (function () {
    const columns_rows = 3;
    const board = [];
    for (let i = 0; i < columns_rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns_rows; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const dropToken = (row, column) => {
        if (board[row][column] < 1) return;

        board[row][column].addToken(player1);
        alert(board[row][column].getValue());
    }

    return {getBoard, dropToken};
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

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;
})();