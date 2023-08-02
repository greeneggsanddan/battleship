import Gameboard from "../gameboard";

test('cell is shot', () => {
  const board = new Gameboard;
  board.array[9][9].shoot();
  expect(board.array[9][9].isShot).toBe(true);
});