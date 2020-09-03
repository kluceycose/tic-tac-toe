const Player = (name, marker) => {
    const getName = () => name;
    const setName = (newName) => name = newName;
    const getMarker = () => marker;
    const setMarker = (newMarker) => marker = newMarker;
    return {
        getName,
        getMarker,
        setName,
        setMarker,
    };
}

const gameBoard = (() => {
    const board = Array(9).fill("");

    const setSquare = (square, marker, pos, updateTile) => {
        square.textContent = marker;
        square.removeEventListener("click", updateTile);
        board[pos] = marker;
    };
    const resetBoard = (updateTile) => {
        board.fill("");
        const squares = document.querySelectorAll(".tile");
        squares.forEach(square => {
            square.textContent = "";
            square.addEventListener("click", updateTile);
        });
    };
    const checkWinner = (marker) => {
        let winner = false;
        if ((board[0] == marker && board[1] == marker && board[2] == marker)
            || (board[0] == marker && board[4] == marker && board[8] == marker)
            || (board[0] == marker && board[3] == marker && board[6] == marker)
            || (board[1] == marker && board[4] == marker && board[7] == marker)
            || (board[2] == marker && board[5] == marker && board[8] == marker)
            || (board[2] == marker && board[4] == marker && board[6] == marker)
            || (board[3] == marker && board[4] == marker && board[5] == marker)
            || (board[6] == marker && board[7] == marker && board[8] == marker)
        ) {
            winner = true;
        }
        return winner;
    }
    const checkTie = () => {
        let tie = true;
        board.forEach(square => {
            if(square == ""){
                tie = false;
            }
        });
        return tie;
    }

    return {
        setSquare,
        resetBoard,
        checkWinner,
        checkTie
    };
})();

const game = ((gameBoard) => {
    const players = [];
    players.push(Player("X", "X", 0));
    players.push(Player("O", "O", 0));
    let turn = 0;

    newGame();
    document.querySelector(".restart").addEventListener("click", newGame);
    document.querySelector("#p1Name").addEventListener("change", updateName);
    document.querySelector("#p2Name").addEventListener("change", updateName);
    
    function newGame() {
        document.querySelector("#status").textContent = `'s Turn`;
        showName(players[0].getName());
        gameBoard.resetBoard(updateTile);
        turn = 0;
    }
    function updateName(e) {
        if(e.target.id == "p1Name"){
            players[0].setName(e.target.value);
            if (turn % 2 == 0) showName(players[0].getName());
        } else {
            players[1].setName(e.target.value);
            if (turn % 2 == 1) showName(players[1].getName());
        }
    }
    function updateTile(e) {
        const playerNum = (turn % 2 == 0) ? 0 : 1;
        const marker = players[playerNum].getMarker();

        gameBoard.setSquare(e.target, marker, e.target.dataset.key, updateTile);

        if ( gameBoard.checkWinner(marker) ) {
            endGame(true);
        } else if ( gameBoard.checkTie() ) {
            endGame(false);
        } else {
            turn++;
            showName(players[turn % 2].getName());
        }
    }
    function showName(name) {
        let content = document.querySelector("#status")
                .textContent.replace(/^\w*'/, `${name}'`);
        document.querySelector("#status").textContent = content;
    }
    function endGame(winner){
        if(winner){
            const name = players[turn % 2].getName();
            const congratsMsg = `Congradulations, ${name}! You win!`;
            document.querySelector("#status").textContent = congratsMsg;
            const squares = document.querySelectorAll(".tile");
            squares.forEach(square => {
                square.removeEventListener("click", updateTile);
            });
        } else {
            const tieMsg = `It's a Tie!`;
            document.querySelector("#status").textContent = tieMsg;
        }
        
    }
})(gameBoard);
