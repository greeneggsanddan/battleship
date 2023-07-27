import Cell from "./cell";
import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.array = this.createBoard();
    this.ships = [];
    this.shipsSunk = 0;
  }

  createBoard() { // eslint-disable-line
    const board = [];

    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) {
        const cell = new Cell();
        row.push(cell);
      }
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
    if (index !== null) {
      this.ships[index].hit();
      if (this.ships[index].isSunk()) this.shipsSunk += 1;
      return index;
    }
    return null;
  }

  checkLegality(x, y, length, isHorizontal) {
    const shipCoordinates = [];
    let isLegal = true;

    for (let i = 0; i < length; i += 1) {
      if (isHorizontal) shipCoordinates.push([x, y + i]);
      else shipCoordinates.push([x + i, y]);
    }

    shipCoordinates.forEach(coordinate => {
      const shipX = coordinate[0];
      const shipY = coordinate[1];

      if (shipX < 0 || shipX > 9 || shipY < 0 || shipY > 9) {
        isLegal = false;
        return;
      }
      if (this.array[shipX][shipY].shipIndex !== null) isLegal = false;
    });

    return isLegal;
  }
}