import Gameboard from "./gameboard";
import Player from "./player";

const boardOne = new Gameboard();
const boardTwo = new Gameboard();
const player = new Player(boardOne, boardTwo);
const cpu = new Player(boardTwo, boardOne);
let activePlayer = player;
let isGameOver = false;

export function playRound(x, y) {
  // make sure it's a legal move
  const board = activePlayer.enemyBoard;
  const shipIndex = board.receiveAttack(x, y);
  console.log("🚀 ~ file: gameController.js:15 ~ playRound ~ shipIndex:", shipIndex)

  if (shipIndex !== null && board.ships[shipIndex].isSunk()) {
    // you sank my battleship[index]
    if (board.shipsSunk === 5) isGameOver = true;
  }

  switchPlayerTurn(); // eslint-disable-line
}

function cpuRound() {
  let x;
  let y;
  let isShot = true;

  while (isShot) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    isShot = activePlayer.enemyBoard.array[x][y].isShot;
  }

  playRound(x, y);
}

function switchPlayerTurn() {
  activePlayer = activePlayer === player ? cpu : player;
  if (activePlayer === cpu) cpuRound();
}

export function getActivePlayer() {
  return activePlayer;
}