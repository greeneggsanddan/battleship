import Player from "./player";

describe('player methods', () => {
  let player;

  beforeEach(() => {
    player = new Player();
  });

  test('place all five ships', () => {
    player.randomizeShips();
    expect(player.board.ships.length).toBe(5);
  });
});
