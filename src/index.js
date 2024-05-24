var board;
let gameOver = false;
const player1 = "X";
const player2 = "O";
let playerSwitch;
var currentPlayer = player1;
var winningPlayer;
const gameBoard = document.getElementById("game-board");
const restartBtn = document.querySelector(".resart-btn");

window.onload = function () {
    gameOn()

}


function gameOn() {
    //greeting
    document.getElementById("current-player").innerHTML = `You start: Player ${currentPlayer}`
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]
    //sets up blocks and enters them into the board
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let block = document.createElement("div")
            block.id = i.toString() + "-" + j.toString()
            block.classList.add("block")
            if (i == 0 || i == 1) {
                block.classList.add("horizantal-border")
            }
            if (j == 0 || j == 1) {
                block.classList.add("vertical-border")
            }
            block.addEventListener('click', setBlock)
            gameBoard.append(block);


        }

    }

}

//resets the board
restartBtn.addEventListener('click', restartGame)

function restartGame() {
    let resetBlock = document.querySelectorAll(".block");
    for (const resetBlk of resetBlock) {
        resetBlk.innerText = " ";
        if (resetBlk.classList.contains("winner")) {
            resetBlk.classList.remove("winner")
        }
        if (resetBlk.classList.contains("gameover")) {
            resetBlk.classList.remove("gameover")
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // console.log(` previous: ${board[i][j]}`);
            board[i][j] = " "
            // console.log(` current: ${board[i][j]}`);
        }
    }

    gameOver = false;
    currentPlayer = player1;
    document.getElementById("current-player").innerHTML = `You start: Player ${currentPlayer}`

}

function setBlock() {

    if (gameOver) {
        restartGame()
        return;
    }

    let coordinates = this.id.split("-");
    let i = parseInt(coordinates[0]);
    let j = parseInt(coordinates[1]);

    //checks to see if block is already taken
    if (this.innerText !== "X" && this.innerText !== "O") {
        board[i][j] = currentPlayer;
        this.innerText = currentPlayer;
        //alternates between the different players
        if (currentPlayer == player1) {
            currentPlayer = player2
        }
        else {
            currentPlayer = player1
        }
    }
    //if block is not taken it will be by the player that clicked on it
    //updating both the frontend and back in  game boards to keep record and show results
    //makes sure the player doesn't change of a taken blocked is accidently clicked on
    this.innerText = this.innerText;
    board[i][j] = this.innerText
    currentPlayer = currentPlayer
    document.getElementById("current-player").innerHTML = `Your move: Player ${currentPlayer}`
    //checks to see if there is a winner
    gameOver = checkWinner()
    //checks to see if game board is full with no winners
    gameOver = gameFinished()
   




}
function gameFinished() {
    let count = 0;
    let gameBlock = document.querySelectorAll(".block");
    //makes sure there are no empty spaces left on the board if a winner hasn't been found yet
    for (const gameBlk of gameBlock) {
        if (gameBlk.innerText !== "X" && gameBlk.innerText !== "O") {
            count = count + 1
        }

    }
    //alters the color of the board based on if there a winner of the game or not
    if (count == 0) {
        for (const gameBlk of gameBlock) {
            if (gameBlk.classList.contains("winner")) {
                continue
            }
            gameBlk.classList.add("gameover")

        }
        //updates the score board if there is a winner or not
        for (const gameBlk of gameBlock) {
            if (gameBlk.classList.contains("winner")) {
                document.getElementById("current-player").innerHTML = `Congratulations Player ${winningPlayer}!! You won!!!`
                return true
            }
            document.getElementById("current-player").innerHTML = `Sorry guys! No Winners This Round`;
        }

        alert("Game is over! No more moves");
        return true;
    }

    return false
}
//will use the backend board to check if there is a winner
function checkWinner() {
    if (board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][0] !== " ") {
        winningPlayer = board[0][0]
        winner("0-0", "0-1", "0-2", winningPlayer)
         return gameOver = true;
    }
    if (board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[0][0] !== " ") {
        winningPlayer = board[0][0]
        winner("0-0", "1-0", "2-0", winningPlayer)
        gameOver = true;
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] !== " ") {
        winningPlayer = board[0][0]
        winner("0-0", "1-1", "2-2", winningPlayer)
        gameOver = true;
    }

    if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1] !== " ") {
        winningPlayer = board[0][1]
        winner("0-1", "1-1", "2-1", winningPlayer)
        gameOver = true;
    }
    if (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2] !== " ") {
        winningPlayer = board[0][2]
        winner("0-2", "1-2", "2-2", winningPlayer)
        gameOver = true;
    }
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] !== " ") {
        winningPlayer = board[0][2]
        winner("0-2", "1-1", "2-0", winningPlayer)
        gameOver = true;
    }
    return gameOver
}
//if there is a winner the winning set three will change colors and the winner will be anounced
function winner(space1, space2, space3, player) {
    // alert(`CONGRATULATIONS PLAYRER ${player} YOU'RE THE WINNER`)
    console.log(`Winner is Player ${player}`);
    // window.alert(`Congragulations Player ${player}!! You won`);
    document.getElementById("current-player").innerHTML = `Congratulations Player ${player}!! You won!!!`;
    let gblock = document.querySelectorAll(".block");
    for (let gblk of gblock) {
        if (gblk.id == space1 || gblk.id == space2 || gblk.id == space3) {
            console.log(gblk.id);
            gblk.classList.add("winner");
        }
    }
   
}

