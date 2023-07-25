import Gameboard from "./gameboard";

describe('board methods', () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test('board is created', () => {
    expect(board.array[0]).toBeDefined();
  });

  test('cell created at last position', () => {
    expect(board.array[9][9].shipIndex).toBe(null);
  });

  test('ship placed on board', () => {
    board.placeShip(5, 5, 3, false);
    expect(board.array[6][5].shipIndex).toBe(0);
  });
});