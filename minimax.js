//to do:
//  optimize the algo

var player;
var opponent;
var myMove = false;

var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

//displays modal


function checkWin(board) {
    vals = [true, false];
    var allNotNull = true;
    for (var k = 0; k < vals.length; k++) {
        var value = vals[k];
        var diagonalComplete1 = true;
        var diagonalComplete2 = true;
        //checks diagonals for win
        for (var i = 0; i < 3; i++) {
            if (board[i][i] != value) {
                diagonalComplete1 = false;
            }
            if (board[2 - i][i] != value) {
                diagonalComplete2 = false;
            }
            //checks rows and columns for win
            var rowComplete = true;
            var colComplete = true;
            for (var j = 0; j < 3; j++) {
                if (board[i][j] != value) {
                    rowComplete = false;
                }
                if (board[j][i] != value) {
                    colComplete = false;
                }
                if (board[i][j] === null) {
                    allNotNull = false;
                }
            }
            if (rowComplete || colComplete) {
                return value ? 1 : 0;
            }
        }
        if (diagonalComplete1 || diagonalComplete2) {
            return value ? 1 : 0;
        }
    }
    if (allNotNull) {
        return -1;
    }
    return null;
}


function minimax(board, player) {
    nodes++;
    var winner = checkWin(board);
    if (winner !== null) {
        switch (winner) {
            case 1:
                // AI wins
                return [1, board];
            case 0:
                // opponent wins
                return [-1, board];
            case -1:
                // Tie
                return [0, board];
        }
    }
    else {
        // Next states
        var nextVal = null;
        var nextBoard = null;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === null) {
                    board[i][j] = player;
                    var value = minimax(board, !player)[0];
                    if ((player && (nextVal === null || value > nextVal)) || (!player && (nextVal === null || value < nextVal))) {
                        nextBoard = board.map(function (arr) {
                            return arr.slice();
                        });
                        nextVal = value;
                    }
                    board[i][j] = null;
                }
            }
        }
        // console.log("Nodes is " + nodes)
        // console.log("Board is " + board)
        // console.log("NextB is " + nextBoard)
        return [nextVal, nextBoard];
    }
}

function minimaxMove(board) {
    nodes = 0;
    return minimax(board, true)[1];
}

function makeMove(arrBoard) {

    //arrBoard = ['x', 'e', 'e', 'e', 'o', 'e', 'e', 'e', 'x']
    // console.log("ArrBoard at delivery is: ")
    // console.log(arrBoard)
    for (let a = 0; a < 9; a++) {
        ////convert to minimax format
        if (arrBoard[a] === 'x') { arrBoard[a] = false }
        if (arrBoard[a] === 'o') { arrBoard[a] = true }
        if (arrBoard[a] === 'e') { arrBoard[a] = null }
        ///// add them to baord
        if (a < 3) { board[0][a] = arrBoard[a] }
        if (a > 2 && a < 6) { board[1][a - 3] = arrBoard[a] }
        if (a > 5) { board[2][a - 6] = arrBoard[a] }
    }
    //board = [[false, null, null], [null, true, null], [null, null, false]]
    // console.log("Board is : ")
    // console.log(board)
    board = minimaxMove(board);
    console.log("MiniMax baord is :")
    console.log(board);

    let newBoard = []

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // console.log("ArrB at " + i + "+" + j + " is: " + arrBoard[i + j])
            // console.log("board at " + i + "+" + j + " is: " + board[i][j])
            arrBoard[(i * 3) + j] = board[i][j]
            // console.log("ArrB at " + i + "+" + j + " is NOW: " + arrBoard[+ j])
        }
    }
    for (a = 0; a < 9; a++) {
        ////convert to minimax format
        if (arrBoard[a] === false) { arrBoard[a] = 'x' }
        if (arrBoard[a] === true) { arrBoard[a] = 'o' }
        if (arrBoard[a] === null) { arrBoard[a] = 'e' }
    }
    console.log("New array is: " +arrBoard)
    return arrBoard
}