import { Gameboard, Player } from "./game.js";

// icons https://www.freepik.com/free-vector/set-silhouettes-naval-ships_11052928.htm#query=warship&position=2&from_view=keyword&track=sph&uuid=fe968b55-ef3b-481a-b69a-ecbbb60a471c

function createDom() {
  const body = document.querySelector("body");
  const header = document.createElement("div");
  const main = document.createElement("div");
  const footer = document.createElement("div");

  header.classList.add("header");
  const title = document.createElement("div");
  title.textContent = "Battleships";

  main.classList.add("main");
  const enemyBoard = document.createElement("div");
  const enemyBoardTitle = document.createElement("div");
  enemyBoardTitle.textContent = "Enemy board";

  const ownBoard = document.createElement("div");
  const ownBoardTitle = document.createElement("div");
  ownBoardTitle.textContent = "Your board";

  const ships = document.createElement("div");
  const shipsTitle = document.createElement("div");
  shipsTitle.textContent = "Place your ships";

  header.appendChild(title);
  main.appendChild(enemyBoard);
  enemyBoard.appendChild(enemyBoardTitle);
  main.appendChild(ownBoard);
  ownBoard.appendChild(ownBoardTitle);
  main.appendChild(ships);
  ships.appendChild(shipsTitle);
  shipsTitle.textContent = "Place your ships";
  body.appendChild(header);
  body.appendChild(main);
  body.appendChild(footer);
}

export { createDom };
