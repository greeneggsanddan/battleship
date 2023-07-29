import Gameboard from "./gameboard";
import Player from "./player";

const boardOne = new Gameboard();
const boardTwo = new Gameboard();
const human = new Player(boardOne, boardTwo);
const cpu = new Player(boardTwo, boardOne);

let isGameOver = false;

export function playRound(x, y, player = human) {
  // make sure it's a legal move
  const board = player.enemyBoard;
  const shipIndex = board.receiveAttack(x, y);

  if (shipIndex !== null && board.ships[shipIndex].isSunk()) {
    // you sank my battleship[index]
    if (board.shipsSunk === 5) isGameOver = true;
  }
}

export function cpuRound() {
  let x;
  let y;
  let isShot = true;

  while (isShot) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    isShot = human.board.array[x][y].isShot;
  }

  console.log(x);
  console.log(y);

  playRound(x, y, cpu);
}

export function getPlayer(number) {
  if (number === 1) return human;
  return cpu;
}