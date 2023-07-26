const playerOne = new Player();
const playerTwo = new Player();
let opponent = playerTwo;

function playRound(x, y) {
  // make sure it's a legal move
  opponent.board.receiveAttack(x, y);
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