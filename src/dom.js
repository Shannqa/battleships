import { Gameboard, Player, playGame, players } from "./game.js";

function createDom() {
  const body = document.querySelector("body");
  const header = document.createElement("div");
  const title = document.createElement("span");
  const main = document.createElement("div");
  const footer = document.createElement("div");

  header.classList.add("header");
  title.textContent = "Battleships";
  main.classList.add("main");

  header.appendChild(title);
  body.appendChild(header);
  body.appendChild(main);
  body.appendChild(footer);
}

/* Drag and drop functions */
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

/* Preparation stage - player places their ships on their board */
function prepareShips() {
  const main = document.querySelector(".main");
  const prepBoardDiv = document.createElement("div");
  const prepBoardTitle = document.createElement("span");
  const prepShipsDiv = document.createElement("div");
  const prepShipsTitle = document.createElement("span");
  const prepShipsList = document.createElement("div");
  const prepInfoDiv = document.createElement("div");
  const prepInfoP = document.createElement("p");

  prepBoardDiv.classList.add("prep-board");
  prepShipsDiv.classList.add("prep-ships");
  prepShipsList.classList.add("prep-ships-list");
  prepInfoDiv.classList.add("prep-info");

  prepBoardTitle.textContent = "Your board";
  prepShipsTitle.textContent = "Place your ships";
  prepInfoP.textContent =
    "Drag & drop the ships on thw2e board. Doubleclick a ship to rotate it.";

  /* List of ships to be placed */
  Gameboard.shipLengths.forEach((item, index) => {
    const fullShip = document.createElement("div");
    fullShip.classList.add("ship-div");
    for (let i = 0; i < item; i++) {
      const shipSq = document.createElement("div");
      if (i === 0) {
        // first square of a ship
        shipSq.classList.add("sq0-prep");
      }
      shipSq.classList.add("prep-square");
      shipSq.classList.add("ship");
      fullShip.appendChild(shipSq);
    }
    
    /* Drag and drop */
    fullShip.setAttribute("id", `prep-${index}`);
    fullShip.setAttribute("draggable", "true");
    fullShip.addEventListener("dragstart", drag);
    fullShip.addEventListener("dragend", dragEnd);
    fullShip.addEventListener("dblclick", () => {
      fullShip.classList.toggle("flex-toggle");
    });
    prepShipsDiv.appendChild(prepShipsList);
  });

  prepBoardDiv.appendChild(prepBoardTitle);
  prepShipsDiv.appendChild(prepShipsTitle);
  prepShipsDiv.appendChild(prepShipsList);
  prepInfoDiv.appendChild(prepInfoP);
  prepShipsDiv.appendChild(prepInfoDiv);
  main.appendChild(prepBoardDiv);
  main.appendChild(prepShipsDiv);
  
  players.prepare.board.drawGrid();
}

// check if all ships were placed on the player's board
function areAllShipsPlaced() {
  const prepShipsDiv = document.querySelector(".prep-ships");
  const prepShipsList = document.querySelector(".prep-ships-list");
  const prepInfo = document.querySelector(".prep-info");

  if (prepShipsList.childNodes.length === 0) {
    const startGame = document.createElement("button");
    startGame.textContent = "Start game";
    startGame.classList.add("start-game");
    startGame.addEventListener("click", checkPlacedShips);
    const prepInfoP2 = document.createElement("p");
    prepInfoP2.textContent =
      "Once you're happy with the placement of your ships, click the start button to begin the game!";
    prepInfo.appendChild(startGame);
    prepInfo.appendChild(prepInfoP2);
    prepShips.appendChild(prepInfo);
  }
}

// check if all ships are placed correctly, if so, start the game
function checkPlacements() {
  const placeOnBoard = placeShips(players.human.board);
  
  if (placeOnBoard === false) {
    return placementError();
  }
  cleanPlaceDom();
  players.human.board.drawGrid();
  players.AI.board.getRandomPlacement();
  players.AI.board.drawGrid();
  // console.log(boardB.grid);
  players.currentPlayer = "human";
}

function placementError() {
  const prepShipsDiv = document.querySelector(".prep-ships");
  const errorMsg = document.createElement("div");
  errorMsg.classList.add("error-msg");
  errorMsg.textContent =
    "Some ships don't fit on the board or overlap. Use drag & drop to move them or double click to rotate them before you can begin the game.";
  prepShipsDiv.appendChild(errorMsg);
}

// add ships to the players gameboard
function placeShips(board) {
  // get placed ships coords

  for (let i = 0; i < Gameboard.shipLengths.length; i++) {
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
        return false;
      }
      fullCoords = board.getFullCoords([
        [startRow, startColumn],
        [endRow, startColumn],
      ]);
      if (board.checkIfOccupied(fullCoords) == true) {
        return false;
      }
      board.placeShip(length, [startRow, startColumn], [endRow, startColumn]);
    } else {
      // ship is horizontal
      if (endColumn > 9) {
        return false;
      }
      fullCoords = board.getFullCoords([
        [startRow, startColumn],
        [startRow, endColumn],
      ]);
      if (board.checkIfOccupied(fullCoords) == true) {
        return false;
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

/* The game ends, start over */
function gameEnd(player) {
  const main = document.querySelector(".main");
  const modal = document.createElement("div");
  const wonOrLost = document.createElement("p");
  const button = document.createElement("button");

  modal.classList.add("modal");
  button.classList.add("modal-button");
  button.textContent = "Play again";
  button.addEventListener("click", playAgain);
  if (player === "AI") {
    wonOrLost.textContent = "You won!";
  } else if (player === "human") {
    wonOrLost.textContent = "You lost";
  }
  
  modal.appendChild(wonOrLost);
  modal.appendChild(button);
  main.appendChild(modal);
}

function playAgain();
  players.human = null;
  players.AI = null;
  players.prepare = null;
  players.currentPlayer = null;
  cleanPlaceDom;
  play();

export { createDom, prepareShips, placeShips, cleanPlaceDom, placementError, gameEnd };