import { Gameboard, Player, playGame, boards } from "./game.js";

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  // catch an error happening if the user tries to drag and drop the ship in a wrong place, e.g. in the middle of multiple squares
  try {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    document.getElementById(data).classList.add("ship-on-board");
    ev.target.appendChild(document.getElementById(data));
  } catch {
    console.log("error - drag&drop");
    return;
  }
}

function dragEnd(ev) {
  areAllShipsPlaced();
}
/* to remove
function createGrid() {
  let gridArray = [];
  for (let x = 0; x < 10; x++) {
    gridArray.push([]);
    for (let y = 0; y < 10; y++) {
      gridArray[x].push(null);
    }
  }
  return gridArray;
}

function drawGrid() {
  const ownBoard = document.querySelector(".own-board");
  const array = createGrid();

  const body = document.querySelector("body");
  const grid = document.createElement("div");

  array.forEach((row, rindex) => {
    row.forEach((cell, cindex) => {
      const square = document.createElement("div");
      square.classList.add("prep-square");
      square.setAttribute("id", `r${rindex}c${cindex}`);
      if (cell === "ship") {
        square.classList.add("ship");
      }
      if (cell === "miss") {
        square.classList.add("miss");
      }
      if (cell === "hit") {
        square.classList.add("hit");
      }

      grid.appendChild(square);
    });
  });

  grid.classList.add("grid");
  grid.classList.add("grid-place-own");
  ownBoard.appendChild(grid);
}
*/
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

  header.appendChild(title);
  // main.appendChild(enemyBoard);
  // enemyBoard.appendChild(enemyBoardTitle);

  body.appendChild(header);
  body.appendChild(main);
  body.appendChild(footer);
}

function prepareShips() {
  const prepare = new Player("prepare");
  boards.prepare = new Gameboard("prepare");

  const main = document.querySelector(".main");
  const prepBoard = document.createElement("div");
  const prepBoardTitle = document.createElement("span");
  prepBoard.classList.add("prep-board");
  prepBoardTitle.textContent = "Your board";

  const prepShips = document.createElement("div");
  prepShips.classList.add("prep-ships");
  const shipsTitle = document.createElement("span");
  shipsTitle.textContent = "Place your ships";

  const shipList = document.createElement("div");
  shipList.classList.add("ship-list");

  const shipLengths = [2, 3, 4, 5];
  shipLengths.forEach((item, index) => {
    const shipDiv = document.createElement("div");
    shipDiv.classList.add("ship-div");
    for (let i = 0; i < item; i++) {
      const shipSq = document.createElement("div");
      // shipSq.setAttribute("id", `sq0-to-place-${index}`);
      if (i === 0) {
        shipSq.classList.add("sq0-to-place");
      }

      shipSq.classList.add("prep-square");
      shipSq.classList.add("ship");

      shipDiv.appendChild(shipSq);
    }
    shipDiv.setAttribute("draggable", "true");
    shipDiv.setAttribute("id", `to-place-${index}`);

    // need to handle error - when the item is dragged in the middle of two squares
    shipDiv.addEventListener("dragstart", drag);
    shipDiv.addEventListener("dragend", dragEnd);
    shipDiv.addEventListener("dblclick", () => {
      shipDiv.classList.toggle("flex-toggle");
    });
    shipList.appendChild(shipDiv);
  });

  const placeInfo = document.createElement("div");
  const placeInfoSp = document.createElement("p");
  placeInfo.classList.add("place-info");
  placeInfoSp.textContent =
    "Drag & drop the ships on the board. Doubleclick a ship to rotate it.";
  placeInfo.appendChild(placeInfoSp);
  main.appendChild(prepBoard);
  prepBoard.appendChild(prepBoardTitle);
  main.appendChild(prepShips);
  prepShips.appendChild(shipsTitle);
  prepShips.appendChild(shipList);
  prepShips.appendChild(placeInfo);

  boards.prepare.drawGrid();
const squares = document.querySelectorAll(".prep-square");
  squares.forEach((square) => {
  square.addEventListener("drop", drop);

  square.addEventListener("dragover", allowDrop);
});
}
// check if all ships were placed on the board
function areAllShipsPlaced() {
  const prepShips = document.querySelector(".prep-ships");
  const shipList = document.querySelector(".ship-list");
  if (shipList.childNodes.length === 0) {
    const startGame = document.createElement("button");
    startGame.textContent = "Start game";
    startGame.classList.add("start-game");
    startGame.addEventListener("click", checkPlacedShips);
    const placeInfo = document.querySelector(".place-info");
    const placeInfoSp2 = document.createElement("p");
    placeInfoSp2.textContent =
      "Once you're happy with the placement of your ships, click the start button to begin the game!";
    placeInfo.appendChild(startGame);
    placeInfo.appendChild(placeInfoSp2);
    prepShips.appendChild(placeInfo);
  }
}

// +++ check if all ships are placed correctly
function checkPlacedShips() {
  playGame();
}

function placementError() {
  const prepShips = document.querySelector(".prep-ships");
  const errorMsg = document.createElement("div");
  errorMsg.classList.add("error-msg");
  errorMsg.textContent =
    "Some ships don't fit on the board or overlap. Use drag & drop to move them or double click to rotate them before you can begin the game.";
  prepShips.appendChild(errorMsg);
}

// place ships on the player's board
function placeShips(board) {
  // get placed ships coords
  const shipLengths = [2, 3, 4, 5];

  for (let i = 0; i < shipLengths.length; i++) {
    const ship = document.querySelector(`#to-place-${i}`);
    const coordStart = ship.parentNode.id;
    coordStart.split("");
    let startRow = parseInt(coordStart[1]);
    let startColumn = parseInt(coordStart[3]);
    let length = parseInt(shipLengths[i]);
    let endRow = startRow + length - 1;
    let endColumn = startColumn + length - 1;
    let fullCoords;
    if (ship.classList.contains("flex-toggle")) {
      //ship is vertical
      if (endRow > 9) {
        return true;
      }
      fullCoords = board.getFullCoords([
        [startRow, startColumn],
        [endRow, startColumn],
      ]);
      if (board.checkIfOccupied(fullCoords) == true) {
        // console.log("ayyy");
        return true;
      }
      board.placeShip(length, [startRow, startColumn], [endRow, startColumn]);
    } else {
      // ship is horizontal
      if (endColumn > 9) {
        return true;
      }
      fullCoords = board.getFullCoords([
        [startRow, startColumn],
        [startRow, endColumn],
      ]);
      if (board.checkIfOccupied(fullCoords) == true) {
        // console.log("ayyy");
        return true;
      }
      board.placeShip(length, [startRow, startColumn], [startRow, endColumn]);
    }
  }
}

function cleanPlaceDom() {
  const main = document.querySelector(".main");
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

export { createDom, prepareShips, placeShips, cleanPlaceDom, placementError };
