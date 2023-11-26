import { createDom, prepareShips, cleanPlaceDom } from "./dom.js";
import { Player, Gameboard, playGame } from "./game.js";
//import imgsrc from "./img_logo.gif";
//import css from "./style.css";

createDom();
prepareShips();

//
cleanPlaceDom();

const playerB = new Player("AI");
  const boardB = new Gameboard("AI");
  boardB.randomizePlacement();

  boardB.drawGrid();
