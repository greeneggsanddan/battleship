import { playRound, cpuRound, getPlayer } from "../gameController";

describe('player methods', () => {
  const human = getPlayer(1);
  const cpu = getPlayer(2);

  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(.4);
  });

  test('cell marked when round played', () => {
    playRound(4, 4);
    expect(human.enemyBoard.array[4][4].isShot).toBe(true);
  });

  test('cpu makes a shot', () => {
    cpuRound();
    expect(cpu.enemyBoard.array[4][4].isShot).toBe(true);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

});