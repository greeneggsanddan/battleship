import Gameboard from "./gameboard";

describe('board methods', () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
    board.placeShip(5, 5, 3, false);
  });

  test('board is created', () => {
    expect(board.array[0]).toBeDefined();
  });

  test('cell created at last position', () => {
    expect(board.array[9][9].shipIndex).toBe(null);
  });

  test('ship placed on board', () => {
    expect(board.array[5][5].shipIndex).toBe(0);
    expect(board.array[6][5].shipIndex).toBe(0);
    expect(board.array[7][5].shipIndex).toBe(0);
  });

  test('ship receives attack', () => {
    board.receiveAttack(5, 5);
    expect(board.ships[0].hits).toBe(1);
  })
});