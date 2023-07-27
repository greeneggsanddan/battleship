import Player from "./player";
import Gameboard from "./gameboard";

describe('player methods', () => {
  let boardOne;
  let boardTwo;
  let playerOne;
  let playerTwo;


  beforeEach(() => {
    boardOne = new Gameboard();
    boardTwo = new Gameboard();
    playerOne = new Player(boardOne, boardTwo);
    playerTwo = new Player(boardTwo, boardOne);
  });

  test('place all five ships', () => {
    playerOne.randomizeShips();
    expect(playerOne.board.ships.length).toBe(5);
  });

  test('random shots will not overlap', () => {
    let counter = 0;

    playerOne.shootRandom();
    playerOne.shootRandom();
    playerOne.shootRandom();
    playerOne.shootRandom();
    playerOne.shootRandom();
    playerOne.shootRandom();
    playerOne.shootRandom();
    playerOne.shootRandom();
    playerOne.shootRandom();
    playerOne.shootRandom();

    playerTwo.board.array.forEach(row => {
      row.forEach(cell => {
        if (cell.isShot) counter += 1;
      })
    });

    expect(counter).toBe(10);
  });
});
