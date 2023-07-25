import Cell from "./cell";
import Ship from "./ship";

const BOARD_SIZE = 10;

export default class Gameboard {
  constructor() {
    this.array = this.createBoard();
    this.ships = [];
  }

  createBoard() { // eslint-disable-line
    const board = []
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      const row = new Array(BOARD_SIZE).fill(new Cell());
      board.push(row);
    }
    return board;
  }

  placeShip(x, y, length, isHorizontal) {
    const ship = new Ship(length);
    const index = this.ships.push(ship) - 1;
    
    for (let i = 0; i < length; i += 1) {
      if (isHorizontal) this.array[x][y + i].shipIndex = index;
      else this.array[x + i][y].shipIndex = index;
    }
  }

  receiveAttack(x, y) {
    this.array[x][y].shoot();
    const index = this.array[x][y].shipIndex;    
    if (index !== null) this.ships[index].hit();
  }
}