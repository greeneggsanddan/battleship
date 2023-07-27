import Gameboard from "./gameboard";
import Player from "./player";

const boardOne = new Gameboard();
const boardTwo = new Gameboard();
const playerOne = new Player(boardOne, boardTwo);
const playerTwo = new Player(boardTwo, boardOne);
let activePlayer = playerOne;

function playRound(x, y) {
  // make sure it's a legal move
  activePlayer.enemyBoard.receiveAttack(x, y);
  // if shipsunk, check if game over
  if (checkGameOver) {
    isGameOver = true;
  } else switchPlayerTurn();
}

function switchPlayerTurn() {
  opponent = opponent === playerOne ? playerTwo : playerOne;
}

function checkForWinner(board) {
  if (board.shipsSunk === 5) return true;
  return false;
}