export default class Cell {
  constructor() {
    this.shipIndex = null;
    this.isShot = false;
  }

  shoot() {
    this.isShot = true;
  }
}