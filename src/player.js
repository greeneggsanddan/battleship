import Gameboard from "./gameboard";

const SHIP_LENGTHS = [5, 4, 3, 3, 2];

export default class Player {
  constructor() {
    this.board = new Gameboard();
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

  shootRandom() { // should the opponent or the player do the shooting?
    let x;
    let y;
    let isLegal = false;

    while (!isLegal) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      isLegal = this.board.checkLegality(x, y);
    }

    this.board.receiveAttack(x, y);
  }

}

// playerOne.receiveAttack()