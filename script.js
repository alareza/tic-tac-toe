const gameboard = (() => {
  let gameboardArr = [];

  const clearBoard = () => gameboardArr = [];

  const updateBoard = (idx, mark) => {
    if (isEmptyAt(idx)) {
      gameboardArr[idx] = mark;
    }
  };

  const getBoard = () => {
    return gameboardArr;
  };

  const getMarkAt = (idx) => {
    return gameboardArr[idx];
  };

  const isEmptyAt = (idx) => {
    if (gameboardArr[idx] === undefined) {
      return true;
    }
    return false;
  };

  return{ clearBoard, updateBoard, getBoard, getMarkAt, isEmptyAt };
 })();

const gameController = (() => {
  let currentTurn = "X";
  let numTurns = 0;
  const MAX_TURNS = 9;

  const gameStart = () => {
    currentTurn = "X";
    numTurns = 0;
  };

  const changeTurns = () => {
    if (currentTurn == "X") {
      currentTurn = "O";
    } else {
      currentTurn = "X";
    }
    incrementTurnCounter();
  };

  const getCurrentTurn = () => {
    return currentTurn;
  };

  const getNumTurns = () => {
    return numTurns;
  };

  const incrementTurnCounter = () => {
    if (numTurns < MAX_TURNS) {
      numTurns += 1;
    }
  };

  const disableGridButton = (gridButton) => {
    gridButton.disabled = true;
  };

  const disableAllGridButtons = (gridButtons) => {
    gridButtons.forEach(button => {
      button.disabled = true;
    });
  };

  const enableAllGridButtons = (gridButtons) => {
    gridButtons.forEach(button => {
      button.disabled = false;
    });
  };

  const clearButtons = (gridButtons) => {
    gridButtons.forEach(button => {
      button.innerText = "";
    });
  };

  const checkForWin = (gameboard) => {
    const winConditions = [123, 456, 789, 147, 258, 369, 159, 357];
    for (let i = 0; i < winConditions.length; i++) {
      const idxs = winConditions[i].toString().split("").map(Number);
      if (!gameboard.isEmptyAt(idxs[0] - 1) ||
          !gameboard.isEmptyAt(idxs[1] - 1) ||
          !gameboard.isEmptyAt(idxs[2] - 1)
          ) {
        if (gameboard.getMarkAt(idxs[0] - 1) ==
            gameboard.getMarkAt(idxs[1] - 1) &&
            gameboard.getMarkAt(idxs[1] - 1) ==
            gameboard.getMarkAt(idxs[2] - 1)
            ) {
          return true;
        }
      }
    }
    return false;
  };

  const checkForDraw = (gameboard) => {
    if (numTurns == MAX_TURNS && !checkForWin(gameboard)) {
      return true;
    }
    return false;
  };

  const displayResult = (display, result) => {
    display.innerText = result;
  };

  const resetDisplay = (display) => {
    display.innerText = "Who shall win the tic tac toe battle?";
  };

  return { gameStart, changeTurns, getCurrentTurn, getNumTurns,
      disableGridButton, disableAllGridButtons, enableAllGridButtons,
      clearButtons, checkForWin, checkForDraw, displayResult, resetDisplay };
})();

const Player = (mark) => {
  const getMark = () => mark;

  const placeMark = (button) => {
    if (button.innerText == "") {
      button.textContent = mark;
    }
  };

  const win = () => {
    return mark + " Wins!";
  };

  const tie = () => {
    return "It's a tie!";
  };

  return { placeMark, getMark, win, tie };
}

// board invoked at top
// controller invoked at top
const playerX = Player("X");
const playerO = Player("O");

gameController.gameStart();

gridButtons = document.querySelectorAll(".grid-buttons");
restartBtn = document.getElementById("restart-btn");
resultDisplay = document.querySelector(".result-display");

gridButtons.forEach(button => {
  button.addEventListener("click", function() {
    if (gameController.getCurrentTurn() == playerX.getMark()) {
      playerX.placeMark(button);
      gameboard.updateBoard(button.getAttribute("data-idx"), playerX.getMark());
      gameController.changeTurns();
      gameController.disableGridButton(button);
      if (gameController.checkForWin(gameboard)) {
        gameController.disableAllGridButtons(gridButtons);
        gameController.displayResult(resultDisplay, playerX.win());
      }
      if (gameController.checkForDraw(gameboard)) {
        gameController.displayResult(resultDisplay, playerX.tie());
      }
    } else {
      playerO.placeMark(button);
      gameboard.updateBoard(button.getAttribute("data-idx"), playerO.getMark());
      gameController.changeTurns();
      gameController.disableGridButton(button);
      if (gameController.checkForWin(gameboard)) {
        gameController.disableAllGridButtons(gridButtons);
        gameController.displayResult(resultDisplay, playerO.win());
      }
      if (gameController.checkForDraw(gameboard)) {
        gameController.displayResult(resultDisplay, playerO.tie());
      }
    }
  });
});

restartBtn.addEventListener("click", function() {
  gameboard.clearBoard();
  gameController.clearButtons(gridButtons);
  gameController.enableAllGridButtons(gridButtons);
  gameController.resetDisplay(resultDisplay);
  gameController.gameStart();
});
