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
  board.cells.forEach((cell) => {
    cell.surroundingMines = countSurroundingMines(cell);
  });

  initBoard();
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  document.querySelector('.restart-btn').addEventListener('click', restartGame);
}

function checkForWin() {
  let winner = true;
  board.cells.forEach((cell) => {
    if ((cell.isMine && !cell.isMarked) || (!cell.isMine && cell.hidden)) {
      winner = false;
    }
  });

  if (winner) {
    displayMessage('🕵🏻‍♂️ BUGS NEUTRALIZED 🕵🏻‍♂️');
  }
}

function countSurroundingMines(cell) {
  let surrounding = getSurroundingCells(cell.row, cell.col);
  let count = 0;
  surrounding.forEach((block) => {
    if (block.isMine === true) {
      count++;
    }
  });
  return count;
}

function restartGame() {
  document.location.reload();
}
