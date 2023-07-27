import { playRound, cpuRound, getActivePlayer, switchPlayerHelper } from "./gameController";

describe('player methods', () => {
  let player = getActivePlayer();
  jest.spyOn(global.Math, 'random').mockReturnValue(.4);

  test('cell marked when round played', () => {
    playRound(4, 4);
    expect(player.enemyBoard.array[4][4].isShot).toBe(true);
  });

  test('cpu makes a shot', () => {
    switchPlayerHelper();
    cpuRound();
    player = getActivePlayer();
    expect(player.board.array[4][4].isShot).toBe(true);
  })

  test('cpu takes turn after player', () => {
    playRound(0, 0);
    player = getActivePlayer();
    expect(player.board.array[4][4].isShot).toBe(true);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

});