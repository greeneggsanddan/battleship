import Ship from "../ship";

describe('ship methods', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('adding a "hit" to the ship', () => {
    expect(ship.hit()).toBe(1);
  });

  test('adding multiple hits', () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test('ship is not sunk when hits are under threshold', () => {
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
  });

  test('ship sinks when hit the right number of times', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});