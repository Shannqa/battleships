import { createDom, prepareShips, cleanPlaceDom } from "./dom.js";
import { Player, Gameboard, playGame } from "./game.js";
import css from "./style.css";

createDom();
prepareShips();

/* for tests - show only enemy board
cleanPlaceDom();
const playerB = new Player("AI");
const boardB = new Gameboard("AI");
boardB.randomizePlacement();
boardB.drawGrid();
*/
