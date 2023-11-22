import { Gameboard, Player } from "./game.js";
import css from "./style.css";

function playGame() {
  const playerA = new Player("human");
  const playerB = new Player("AI");
  const boardA = new Gameboard("human");
  const boardB = new Gameboard("AI");

  boardA.placeShip(2, [5, 7], [6, 7]);
  boardA.placeShip(3, [1, 4], [1, 6]);
  boardA.placeShip(3, [3, 5], [3, 8]);
  // boardA.placeShip(4, [8, 3], [8, 6]);
  console.log(boardA.grid);
  boardB.placeShip(2, [4, 1], [5, 1]);
  boardB.placeShip(3, [5, 7], [5, 9]);
  boardB.placeShip(4, [2, 3], [2, 6]);

  boardA.drawGrid();
  boardB.drawGrid();

  boardA.receiveAttack(5, 7);
  boardA.receiveAttack(6, 7);
  console.log(boardA.shipsList);
  console.log(boardA);
  // boardA.receiveAttack(1, 4);
  // boardA.drawGrid();
}

playGame();

export { playGame };
