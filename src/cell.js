export default class Cell {
  constructor() {
    this.shipIndex = null;
    this.isShot = false;
    this.isSunk = false;
  }

  shoot() {
    this.isShot = true;
  }

  sink() {
    this.isSunk = true;
  }
}