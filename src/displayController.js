// import { playRound } from "./gameController";
import Gameboard from "./gameboard";
import Player from "./player";

export default function createBoard(player) {
  const board = document.createElement('div');
  board.classList.add('board');

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement('div');
      const peg = document. createElement('div');

      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      peg.classList.add('peg');
      if (player.board.array[i][j].shipIndex !== null) {
        cell.classList.add('ship');
      }

      // cell.addEventListener('click', () => {
      //   cell.classList.toggle('ship');
      //   peg.classList.toggle('miss');
      // });

      cell.appendChild(peg);
      board.appendChild(cell);
    }
  }

  return board;
}


// function boardClickHandler(e) {
//   const row = e.target.dataset.row;
//   const col = e.target.dataset.col;

//   playRound(row, col);
// }

export function startGame() {
  const body = document.querySelector('body');
  const boardOne = new Gameboard();
  const boardTwo = new Gameboard();
  const player = new Player(boardOne, boardTwo);
  const cpu = new Player(boardTwo, boardOne);

  player.randomizeShips();
  cpu.randomizeShips();

  body.appendChild(createBoard(player));
  body.appendChild(createBoard(cpu));
}