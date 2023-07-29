// let activePlayer = player;
// let isGameOver = false;

// export function playRound(x, y) {
//   // make sure it's a legal move
//   const board = activePlayer.enemyBoard;
//   const shipIndex = board.receiveAttack(x, y);

//   if (shipIndex !== null && board.ships[shipIndex].isSunk()) {
//     // you sank my battleship[index]
//     if (board.shipsSunk === 5) isGameOver = true;
//   }

//   switchPlayerTurn(); // eslint-disable-line
// }

// export function cpuRound() {
//   let x;
//   let y;
//   let isShot = true;

//   while (isShot) {
//     x = Math.floor(Math.random() * 10);
//     y = Math.floor(Math.random() * 10);
//     isShot = activePlayer.enemyBoard.array[x][y].isShot;
//   }

//   playRound(x, y);
// }

// function switchPlayerTurn() {
//   activePlayer = activePlayer === player ? cpu : player;
//   if (activePlayer === cpu) cpuRound();
// }

// export function switchPlayerHelper() {
//   activePlayer = activePlayer === player ? cpu : player;
// }

// export function getActivePlayer() {
//   return activePlayer;
// }