const player1 = 1;

const gameBoard = (function () {
    const columns_rows = 3;
    const board = [];
    for (let i = 0; i < columns_rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns_rows; j++) {
            board[i].push(Cell());
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


function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addToken, getValue};
}