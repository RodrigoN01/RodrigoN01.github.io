document.addEventListener('DOMContentLoaded', startGame);

let board = { cells: [] };

function createBoard() {
  let blocks = 6;
  for (let i = 0; i < blocks; i++) {
    for (let j = 0; j < blocks; j++) {
      board.cells.push({
        row: i,
        col: j,
        hidden: true,
        isMine: Math.random() < 0.2 ? true : false,
        isMarked: false,
      });
    }
  }
}

function startGame() {
  createBoard();
  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  lib.initBoard();
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
}

function checkForWin() {
  board.cells.forEach((cell) => {
    if (
      (cell.isMine === true && cell.isMarked === false) ||
      (cell.isMine === false && cell.hidden === true)
    ) {
      return;
    }
  });
  lib.displayMessage('You win!');
}

function countSurroundingMines(cell) {
  let surrounding = lib.getSurroundingCells(cell.row, cell.col);
  let count = 0;
  surrounding.forEach((block) => {
    if (block.isMine === true) {
      count++;
    }
  });
  return count;
}
