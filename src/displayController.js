import { getPlayer, playRound, cpuRound } from "./gameController";

function createBoard(player, isCPU = false) {
  const board = document.createElement('div');
  board.classList.add('board');

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const square = document.createElement('div');
      const peg = document. createElement('div');
      const cell = player.board.array[i][j];

      square.classList.add('square');
      square.dataset.row = i;
      square.dataset.col = j;
      peg.classList.add('peg');

      if (isCPU) square.dataset.ship = cell.shipIndex;

      if (cell.shipIndex !== null && !isCPU) square.classList.add('ship');
        // Hides the CPU's ships until they are sunk
        // const isSunk = player.board.ships[cell.shipIndex].isSunk();
        // if (isCPU && !isSunk) square.classList.add('hidden');
      // }
      if (cell.isRevealed) square.classList.add('ship');
      if (cell.isShot) {
        const marker = cell.shipIndex === null ? 'miss' : 'hit';
        peg.classList.add(marker);
      }

      square.appendChild(peg);
      board.appendChild(square);
    }
  }

  return board;
}

function updateDisplay() {
  const body = document.querySelector('body');
  const human = getPlayer(1);
  const cpu = getPlayer(2);

  body.innerHTML = '';

  body.appendChild(createBoard(human));
  body.appendChild(createBoard(cpu, true));
}

async function boardClickHandler(e) {
  // Checks if the event target is the peg
  let cell;
  if (e.target.classList.contains('peg')) cell = e.target.parentElement;
  else cell = e.target;

  const row = cell.dataset.row; // eslint-disable-line
  const col = cell.dataset.col; // eslint-disable-line

  // Checks that a square was clicked
  if (!row) return;

  const sunkShipIndex = playRound(row, col);
  updateDisplay();
  if (sunkShipIndex !== null) {
    setTimeout(() => {
      const sunkShip = document.querySelectorAll(`[data-ship='${sunkShipIndex}']`);
      
      sunkShip.forEach(square => {
        const squareRow = square.dataset.row;
        const squareCol = square.dataset.col;
        const cpu = getPlayer(2);

        cpu.board.array[squareRow][squareCol].reveal();
        square.classList.add('ship');
      });
    }, 100);
  }

  // cpuRound();
  // updateDisplay();
}

export default function startGame() {
  const human = getPlayer(1);
  const cpu = getPlayer(2);

  human.randomizeShips();
  cpu.randomizeShips();

  updateDisplay();

  const body = document.querySelector('body');  // attach the event listener to something else
  body.addEventListener('click', boardClickHandler);
}