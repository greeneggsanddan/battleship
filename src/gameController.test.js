import { playRound, getActivePlayer} from "./gameController";

describe('player methods', () => {
  const player = getActivePlayer();

  beforeEach(() => {
    
  });

  test('cell marked when round played', () => {
    playRound(4, 4);
    expect(player.enemyBoard.array[4][4].isShot).toBe(true);
  });

});