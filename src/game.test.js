/* eslint-disable no-undef */
import { Ship } from "./game.js";
import { Gameboard } from "./game.js";

/* Ship class tests */

test("Ship class creates an object with length, number of times its been hit and sunk or not status", () => {
  const testShip = new Ship(3, 0, false);
  expect(testShip.length).toBe(3);
  expect(testShip.hits).toBe(0);
  expect(testShip.destroyed).toBe(false);
});

test("Ship class's method hit() increases the number of hits on the ship", () => {
  const testShip = new Ship(3, 0, false);
  testShip.hit();
  expect(testShip.hits).toBe(1);
});

test("Ship class's method isSunk() reports that the ship has been sunk if the number of hits is equal to the ship's length", () => {
  const testShip = new Ship(3, 2, false);
  testShip.hit();
  expect(testShip.destroyed).toBe(true);
  expect(testShip.isSunk()).toBe(true);
});

/* Gameboard class test */
test("Check that the ships are placed correctly on the gameboard", () => {
  const board = new Gameboard();
  board.placeShip(3, [5, 3], [8, 3]);
  expect(board.grid[5][3]).toBe("ship");
  expect(board.grid[7][3]).toBe("ship");
  expect(board.grid[4][3]).toBe(null);
  expect(board.grid[8][4]).toBe(null);
});
