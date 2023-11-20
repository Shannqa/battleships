test("create a ship object with length, number of times its been hit and sunk or not status", () => {
  const testShip = new Ship(3, 0, false);
  expect(testShip.length).toBe(3);
  expect(testShip.hits).toBe(0);
  expect(testShip.isSunk).toBe(false);
});
