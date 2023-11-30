import { createDom, prepareShips, cleanPlaceDom } from "./dom.js";
import { Player, Gameboard, playGame, playTestGame, players } from "./game.js";
//import css from "./style.css";

//playTestGame();
function play() {
  players.human = new Player("human");
  players.AI = new Player("AI");
  players.prepare = new Player("prepare");
} 
play();
//console.log(players.prepare.board.owner);
createDom();
prepareShips();

