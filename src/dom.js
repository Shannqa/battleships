import { Gameboard, Player } from "./game.js";

// icons https://www.freepik.com/free-vector/set-silhouettes-naval-ships_11052928.htm#query=warship&position=2&from_view=keyword&track=sph&uuid=fe968b55-ef3b-481a-b69a-ecbbb60a471c

function createDom() {
  const body = document.querySelector("body");
  const header = document.createElement("div");
  const main = document.createElement("div");
  const footer = document.createElement("div");

  header.classList.add("header");
  const title = document.createElement("span");
  title.textContent = "Battleships";

  main.classList.add("main");
  // const enemyBoard = document.createElement("div");
  // const enemyBoardTitle = document.createElement("div");
  // enemyBoardTitle.textContent = "Enemy board";

  const ownBoard = document.createElement("div");
  const ownBoardTitle = document.createElement("span");
  ownBoard.classList.add("own-board");
  ownBoardTitle.textContent = "Your board";

  const placeShips = document.createElement("div");
  placeShips.classList.add("place-ships");
  const shipsTitle = document.createElement("span");
  shipsTitle.textContent = "Place your ships";

  header.appendChild(title);
  // main.appendChild(enemyBoard);
  // enemyBoard.appendChild(enemyBoardTitle);
  main.appendChild(ownBoard);
  ownBoard.appendChild(ownBoardTitle);
  main.appendChild(placeShips);
  placeShips.appendChild(shipsTitle);
  body.appendChild(header);
  body.appendChild(main);
  body.appendChild(footer);
}

export { createDom };
