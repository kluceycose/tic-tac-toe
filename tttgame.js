const Player = (name, marker, wins) => {
    const getName = () => name;
    const setName = (newName) => name = newName;
    const getMarker = () => marker;
    const setMarker = (newMarker) => marker = newMarker;
    const getWins = () => wins;
    const addWin = () => wins = wins + 1;
    return {
        getName,
        getMarker,
        getWins,
        setName,
        setMarker,
        addWin
    };
}

const gameBoard = (() => {
    const board = Array(9).fill("");
    const setSquare = (marker, pos) => {
        board[pos] = marker;
    };
    const resetBoard = () => {
        board = board.fill("");
    };

    return {
        setSquare,
        resetBoard
    };
})();



const game = (() => {
    const players = [];
    players.push(Player("", "X", 0));
    players.push(Player("", "O", 0));
    let turn = 0;
    
    const newGame = () => {
        let squares = document.querySelectorAll(".tile");
        squares.forEach(square => {
            square.textContent = "";
            square.addEventListener("click", updateTile);
        });
    };
    const initialize = () => {
        newGame();
        document.querySelector("#p1Name").addEventListener("change", updateName);
        document.querySelector("#p1Name").addEventListener("change", updateName);
    };
    const updateName = (e) => {
        if(e.target.id == "p1Name"){
            players[0].setName(e.target.textContent);
        } else {
            players[1].setName(e.target.textContent);
        }
    }
    const updateTile = (e) => {
        console.log(e);
        if(turn % 2 == 0){
            e.target.textContent = players[0].getMarker();
        } else {
            e.target.textContent = players[1].getMarker();
        }
        e.target.removeEventListener("click", updateTile);
        turn++;
    }
    initialize();
    return {
        initialize,
        newGame,
        updateName
    }
})();

const displayController = (() => {
    const squares = document.querySelectorAll(".tile");
    const setSquare = (marker, pos) => {
        squares[pos].textContent = marker;
    };
})();
