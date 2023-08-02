import Player from "../player";
import Gameboard from "../gameboard";

describe('player methods', () => {
  let boardOne;
  let boardTwo;
  let playerOne;


  beforeEach(() => {
    boardOne = new Gameboard();
    boardTwo = new Gameboard();
    playerOne = new Player(boardOne, boardTwo);
  });

  test('place all five ships', () => {
    playerOne.randomizeShips();
    expect(playerOne.board.ships.length).toBe(5);
  });
});
