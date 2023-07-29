// import { playRound } from "./gameController";
import { getPlayer, playRound, cpuRound } from "./gameController";

export default function createBoard(player, isCPU = false) {
  const board = document.createElement('div');
  board.classList.add('board');
  if (!isCPU) board.classList.add('human');

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const square = document.createElement('div');
      const peg = document. createElement('div');
      const cell = player.board.array[i][j];

      square.classList.add('square');
      square.dataset.row = i;
      square.dataset.col = j;
      peg.classList.add('peg');

      if (cell.shipIndex !== null) {
        square.classList.add('ship');
        if (isCPU) square.classList.add('hidden');
      }
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

function boardClickHandler(e) {
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;

  if (!row) return;

  playRound(row, col);
  updateDisplay();
  cpuRound();
  updateDisplay();
}

export function startGame() {
  const human = getPlayer(1);
  const cpu = getPlayer(2);

  human.randomizeShips();
  cpu.randomizeShips();

  updateDisplay();

  const playerBoard = document.querySelector('human');
  playerBoard.addEventListener('click', boardClickHandler);
}