var tttTesterObj;

let iboard = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9
}

let say = function (string) {
    console.log(string);
}

let user = 'x'
let userName = ""
let winner = null
let botNum = 0
let newT = true     // New Turn
let winType = ""    //horizontal, vertical, backslash, forward
let gameChoice
let firstPlayer

function lockBtn() {
    for (var i = 1; i < 10; i++) {
        let tttBtn = document.getElementById('gi' + i.toString())
        tttBtn.onclick = function () { return false; }
    }
}

function startGame() {

    for (var i = 1; i < 10; i++) {
        let tttBtn = document.getElementById('gi' + i.toString());
        tttBtn.textContent = "-";
        tttBtn.setAttribute("onClick", "handleHumanTurn(" + i + ")");
        tttBtn.style.backgroundColor = '#EDF5E1'
        iboard[i] = i;
    }

    gameChoice = document.getElementById("humanBot")
    if (gameChoice.checked) { gameChoice = "B" }
    else { gameChoice = "F" }

    firstPlayer = document.getElementById("goFirst")
    if (firstPlayer.checked) { user = "X" }
    else { user = "O" }
    say("First Player is " + user)

    if (isBotMove()) { handleBotMove() }

}

function isBotMove() {
    if (user.toUpperCase() === "O" && gameChoice === "B") {
        return true
    }
}

function placeTaken(move) {
    return (iboard[move] === "X" || iboard[move] === "O")
    if (isBotMove()) {

    }
}

function getMoves() {

}

function handleBotMove() {
    say("Hi im at the top of bot move")

    let boardArr = []
    let sendArr = []
    for (let i = 0; i < Object.keys(iboard).length; i++) {
        if (iboard[i + 1] === "X" || iboard[i + 1] === "O") {
            boardArr[i] = iboard[i + 1].toLowerCase()
            sendArr[i] = boardArr[i]
        }
        else {
            boardArr[i] = 'e'
            sendArr[i] = boardArr[i]
        }

    }
    say("Board array before sending is: ")
    let winArray = makeMove(sendArr)
    say("Board array after function is: ")
    say(boardArr)
    say("And we get back: ")
    console.log(winArray)

    for (let i = 0; i < 9; i++) {
        say("Im at " + i + "looping through the minimax board")
        say("Here the element sent is " + boardArr[i] + " and we got back " + winArray[i])
        if (winArray[i].toString() != boardArr[i].toString()) {
            say("Hey this didn't match!")
            iboard[i + 1] = user.toUpperCase()
            document.getElementById('gi' + (i + 1).toString()).textContent = user.toUpperCase()
            say("Bot Moves to space " + (i + 1) + "!!!")
        }
    }

    say("Im at the bottom of bot move")
    if (getMovesLeft(iboard).length < 5) { wintest(user) }
    changeUser();
}

function handleHumanTurn(move) {
    if (iboard[move] === "X" || iboard[move] === "O") {
        say("This space is taken! Go again!")
        newT = false
    }
    else {
        //say('I AM THE CATCH ALL!!!')
        iboard[move] = user.toUpperCase()
        document.getElementById('gi' + move.toString()).textContent = user.toUpperCase()
        if (wintest(user) === false) {
            say(wintest(user))
            changeUser();
            if (isBotMove()) { handleBotMove() }
        }
    }
}

function displayBoard(board) {
    say(" " + board[1] + " | " + board[2] + " | " + board[3])
    say("--- --- ---")
    say(" " + board[4] + " | " + board[5] + " | " + board[6])
    say("--- --- ---")
    say(" " + board[7] + " | " + board[8] + " | " + board[9])
}

function changeUser() {
    if (user === null || user === undefined) {
        user = "X"
    } else if (user === "X") {
        user = 'O'
    } else {
        user = "X"
    }
}

function getMovesLeft(board) {
    let regex = /[1-9]/
    let array = []
    let i = 0
    let space = null
    for (let moves in board) {
        space = board[moves].toString()
        if (space.match(regex)) {
            array[i] = board[moves].toString()
            i = i + 1
        }
    }
    return array
}



function wintest(user) {
    let winChar  // What character to change numbers to
    let winNums = getWinState(user)
    //say(winNums)
    if (winNums.length != 0) {
        lockBtn()
        if (winType === "horizontal") { winChar = "-" }
        if (winType === "vertical") { winChar = "|" }
        if (winType === "backslash") { winChar = "\\" }
        if (winType === "forwardslash") { winChar = "/" }

        for (let w = 0; w < 3; w++) {
            //say(board[winNums[w]])
            iboard[winNums[w]] = winChar
            say('gi' + winNums[w].toString())
            let tttBtn = document.getElementById('gi' + winNums[w].toString())
            tttBtn.style.backgroundColor = '#8EE4AF'

        }

        say("\n" + userName + "(" + user.toUpperCase() + ") WINS!!!")
        displayBoard(iboard)
        say("\n")
        return true
    }
    if (getMovesLeft(iboard).length === 0) { return true }
    else { return false }
}


function getWinState(u) {

    let winArray = []
    u = u.toUpperCase()


    if (iboard[1] === u && iboard[2] === u && iboard[3] === u) {
        winArray[0] = 1
        winArray[1] = 2
        winArray[2] = 3
        winType = "horizontal"
    }
    else if (iboard[4] === u && iboard[5] === u && iboard[6] === u) {
        winArray[0] = 4
        winArray[1] = 5
        winArray[2] = 6
        winType = "horizontal"
    }
    else if (iboard[7] === u && iboard[8] === u && iboard[9] === u) {
        winArray[0] = 7
        winArray[1] = 8
        winArray[2] = 9
        winType = "horizontal"
    }
    else if (iboard[1] === u && iboard[4] === u && iboard[7] === u) {
        winArray[0] = 1
        winArray[1] = 4
        winArray[2] = 7
        winType = "vertical"
    }
    else if (iboard[2] === u && iboard[5] === u && iboard[8] === u) {
        winArray[0] = 2
        winArray[1] = 5
        winArray[2] = 8
        winType = "vertical"
    }
    else if (iboard[3] === u && iboard[6] === u && iboard[9] === u) {
        winArray[0] = 3
        winArray[1] = 6
        winArray[2] = 9
        winType = "vertical"
    }
    else if (iboard[1] === u && iboard[5] === u && iboard[9] === u) {
        winArray[0] = 1
        winArray[1] = 5
        winArray[2] = 9
        winType = "backslash"
    }
    else if (iboard[3] === u && iboard[5] === u && iboard[7] === u) {
        winArray[0] = 3
        winArray[1] = 5
        winArray[2] = 7
        winType = "forwardslash"
    }
    else if (iboard[1] != 1 && iboard[2] != 2 && iboard[3] != 3 &&
        iboard[4] != 4 && iboard[5] != 5 && iboard[6] != 6 &&
        iboard[7] != 7 && iboard[8] != 8 && iboard[9] != 9) {
        say("\n" + "Cat's game!!! It's a tie!!!" + "\n")
        lockBtn()
    }
    return winArray
}

