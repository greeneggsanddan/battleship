export default class Cell {
  constructor(shipIndex = null, isShot = false) {
    this.shipIndex = shipIndex;
    this.isShot = isShot;
  }

  shoot() {
    this.isShot = true;
  }
}