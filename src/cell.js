export default class Cell {
  constructor() {
    this.shipIndex = null;
    this.isShot = false;
    this.isRevealed = false;
  }

  shoot() {
    this.isShot = true;
  }

  reveal() {
    this.isRevealed = true;
  }
}