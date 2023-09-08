class Gameboard {
  constructor() {
    this.clearBoard();
  }

  updateBoard(idx, mark) {
    if (this.isEmptyAt(idx)) {
      this.gameBoardArr[parseInt(idx)] = mark;
    }
  }

  clearBoard() {
    this.gameBoardArr = [];
  }

  logBoard() {
    console.log(this.gameBoardArr);
  }

  getBoard() {
    return(this.gameBoardArr);
  }

  getMarkAt(idx) {
    return this.gameBoardArr[idx];
  }

  isEmptyAt(idx) {
    if (this.gameBoardArr[idx] == undefined) {
      return true;
    }
    return false;
  }
}

class GameController {
  constructor() {
    this.gameStart();
  }

  gameStart() {
    this.currentTurn = "X";
    this.numTurns = 0;
    this.MAX_TURNS = 9;
  }

  changeTurns() {
    if (this.currentTurn == "X") {
      this.currentTurn = "O";
    } else {
      this.currentTurn = "X";
    }
    this.incrementTurnCounter();
  }

  getCurrentTurn() {
    return this.currentTurn;
  }

  getNumTurns() {
    return this.numTurns;
  }

  incrementTurnCounter() {
    if (this.numTurns < this.MAX_TURNS) {
      this.numTurns += 1;
    }
  }

  disableGridButton(gridButton) {
    gridButton.disabled = true;
  }

  disableAllGridButtons(gridButtons) {
    gridButtons.forEach(button => {
      button.disabled = true;
    });
  }

  enableAllGridButtons(gridbuttons) {
    gridButtons.forEach(button => {
      button.disabled = false;
    });
  }

  clearButtons(gridButtons) {
    gridButtons.forEach(button => {
      button.innerText = "";
    });
  }

  checkForWin(gameboard) {
    const winConditions = [123, 456, 789, 147, 258, 369, 159, 357];
    for (let i = 0; i < winConditions.length; i++) {
      const idxs = winConditions[i].toString().split("").map(Number);
      if (
        !gameboard.isEmptyAt(idxs[0] - 1) ||
        !gameboard.isEmptyAt(idxs[1] - 1) ||
        !gameboard.isEmptyAt(idxs[2] - 1)
      ) {
        if (
          gameboard.getMarkAt(idxs[0] - 1) == gameboard.getMarkAt(idxs[1] - 1) &&
          gameboard.getMarkAt(idxs[1] - 1) == gameboard.getMarkAt(idxs[2] - 1)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  checkForDraw(gameboard) {
    if (this.numTurns == this.MAX_TURNS && !this.checkForWin(gameboard)) {
      return true;
    }
    return false;
  }

  displayResult(display, result) {
    display.innerText = result;
  }

  resetDisplay(display) {
    display.innerText = "Who shall win the tic tac toe battle?";
  }
}

class Player {
  constructor(mark) {
    this.mark = mark;
  }

  placeMark(button) {
    if (button.innerText == "") {
      button.innerText = this.mark;
    }
  }

  getMark() {
    return this.mark;
  }

  win() {
    return this.mark + " Wins!";
  }

  tie() {
    return "It's a tie!";
  }
}

const board = new Gameboard();
const playerX = new Player("X");
const playerO = new Player("O");
const controller = new GameController();

controller.gameStart();

gridButtons = document.querySelectorAll(".grid-buttons");
restartBtn = document.getElementById("restart-btn");
resultDisplay = document.querySelector(".result-display");

gridButtons.forEach(button => {
  button.addEventListener("click", function() {
    if (controller.getCurrentTurn() == playerX.getMark()) {
      playerX.placeMark(button);
      board.updateBoard(button.getAttribute("data-idx"), playerX.getMark());
      controller.changeTurns();
      controller.disableGridButton(button);
      if (controller.checkForWin(board)) {
        controller.disableAllGridButtons(gridButtons);
        controller.displayResult(resultDisplay, playerX.win());
      }
      if (controller.checkForDraw(board)) {
        controller.displayResult(resultDisplay, playerX.tie());
      }
    } else {
      playerO.placeMark(button);
      board.updateBoard(button.getAttribute("data-idx"), playerO.getMark());
      controller.changeTurns();
      controller.disableGridButton(button);
      if (controller.checkForWin(board)) {
        controller.disableAllGridButtons(gridButtons);
        controller.displayResult(resultDisplay, playerO.win());
      }
      if (controller.checkForDraw(board)) {
        controller.displayResult(resultDisplay, playerO.tie());
      }
    }
  });
});

restartBtn.addEventListener("click", function() {
  board.clearBoard();
  controller.clearButtons(gridButtons);
  controller.enableAllGridButtons(gridButtons);
  controller.resetDisplay(resultDisplay);
  controller.gameStart();
});
