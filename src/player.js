const SHIP_LENGTHS = [5, 4, 3, 3, 2];

export default class Player {
  constructor(board, enemyBoard) {
    this.board = board;
    this.enemyBoard = enemyBoard;
  }

  randomizeShips() {
    SHIP_LENGTHS.forEach(shipLength => {
      let x;
      let y;
      let isHorizontal;
      let isLegal = false;

      while (!isLegal) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        isHorizontal = Math.random() < .5;
        isLegal = this.board.checkLegality(x, y, shipLength, isHorizontal);
      }

      this.board.placeShip(x, y, shipLength, isHorizontal);
    });
  }

  shootRandom() { // moved to gameController
    let x;
    let y;
    let isShot = true;

    while (isShot) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      isShot = this.enemyBoard.array[x][y].isShot;
    }

    const shipIndex = this.enemyBoard.receiveAttack(x, y);
    return shipIndex;
  }

}