import Gameboard from "./gameboard";

export default class Player {
  constructor() {
    this.board = new Gameboard();
  }

  static shipLengths = [5, 4, 3, 3, 2];

  randomizeShips() {
    Player.shipLengths.forEach(shipLength => {
      let isLegal = false;
      while (!isLegal) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const isHorizontal = Math.random() < .5;
        isLegal = this.board.checkLegality(x, y, shipLength, isHorizontal);
      }
    });
  }

}


const playerOne = new Player();

playerOne.receiveAttack()