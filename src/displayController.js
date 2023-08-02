import { getPlayer, playRound, cpuRound, checkGameOver } from "./gameController";

function createBoard(player, isCPU = false) {
  const boardDiv = document.createElement('div');
  const boardName = document.createElement('h3');
  const board = document.createElement('div');

  board.classList.add('board');
  boardName.classList.add('name');

  const name = isCPU ? 'CPU\'s' : 'Your';
  boardName.textContent = `${name} board`;
  
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const square = document.createElement('div');
      const peg = document. createElement('div');
      const cell = player.board.array[i][j];
      
      square.dataset.row = i;
      square.dataset.col = j;
      square.classList.add('square');
      peg.classList.add('peg');
      
      if (isCPU) square.classList.add('cpu');
      if (isCPU) square.dataset.ship = cell.shipIndex;
      if (cell.shipIndex !== null && !isCPU) square.classList.add('ship');
      if (cell.isSunk) square.classList.add('ship');
      if (cell.isShot) {
        const marker = cell.shipIndex === null ? 'miss' : 'hit';
        peg.classList.add(marker);
      }

      square.appendChild(peg);
      board.appendChild(square);
    }
  }

  boardDiv.appendChild(boardName);
  boardDiv.appendChild(board);

  return boardDiv;
}

function updateDisplay() {
  const boards = document.querySelector('.container');
  const human = getPlayer(1);
  const cpu = getPlayer(2);

  boards.innerHTML = '';

  boards.appendChild(createBoard(human));
  boards.appendChild(createBoard(cpu, true));
}

function boardClickHandler(e) {
  // Checks if the event target is the peg
  const cell = e.target.classList.contains('peg') ? e.target.parentElement : e.target;

  const row = cell.dataset.row; // eslint-disable-line
  const col = cell.dataset.col; // eslint-disable-line
  const human = getPlayer(1);
  const cpu = getPlayer(2)

  // Checks that a square is clickable and hasn't already been shot
  if (!cell.classList.contains('cpu') || human.enemyBoard.array[row][col].isShot || checkGameOver()) return;

  const sunkShipIndex = playRound(row, col);
  updateDisplay();
  // if (checkGameOver()) {
  //   displayWinner(human);
  //   return;
  // }

  setTimeout(() => {
    if (sunkShipIndex !== null) {
      const sunkShip = document.querySelectorAll(`[data-ship='${sunkShipIndex}']`);
      
      sunkShip.forEach(square => {
        const squareRow = square.dataset.row;
        const squareCol = square.dataset.col;

        cpu.board.array[squareRow][squareCol].sink();
        square.classList.add('ship');
      });
    }
  }, 100);

  setTimeout(() => {
    cpuRound();
    updateDisplay();
    // if (checkGameOver()) displayWinner(cpu);
  }, 500);
}

export default function startGame() {
  const human = getPlayer(1);
  const cpu = getPlayer(2);

  human.randomizeShips();
  cpu.randomizeShips();

  updateDisplay();

  document.addEventListener('click', boardClickHandler);
}

function displayWinner(player) {

}