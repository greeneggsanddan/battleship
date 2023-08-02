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
  const container = document.querySelector('.container');
  const boards = document.createElement('div');
  const human = getPlayer(1);
  const cpu = getPlayer(2);

  boards.classList.add('board-container');

  container.innerHTML = '';

  boards.appendChild(createBoard(human));
  boards.appendChild(createBoard(cpu, true));

  container.appendChild(boards);
}

function displayWinner(isCPU) {
  const winner = document.createElement('p');
  const container = document.querySelector('.container');

  winner.classList.add('winner');
  winner.textContent = isCPU ? 'Computer wins!' : 'You win!';

  container.appendChild(winner);
}

function boardClickHandler(e) {
  // Checks if the event target is the peg
  const cell = e.target.classList.contains('peg') ? e.target.parentElement : e.target;

  const row = cell.dataset.row;
  const col = cell.dataset.col;
  const human = getPlayer(1);
  const cpu = getPlayer(2)

  // Checks that a square is clickable and hasn't already been shot
  if (!cell.classList.contains('cpu') || human.enemyBoard.array[row][col].isShot || checkGameOver()) return;

  const sunkShipIndex = playRound(row, col);
  updateDisplay();

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

  if (checkGameOver()) {
    displayWinner(false);
    return;
  }

  setTimeout(() => {
    cpuRound();
    updateDisplay();
    if (checkGameOver()) displayWinner(true);
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