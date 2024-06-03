const gameBoard = (function () {
    const columns_rows = 3;
    const board = [];
    for (let i = 0; i < columns_rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns_rows; j++) {
            board[i].push(0);
        }
    }

    const getBoard = () => board;

    const dropToken = (row, column) => {
        if (board[row][column] !== 0) return;
        board[row][column] = 1;
    }

    return {getBoard, dropToken, printBoard};
})();