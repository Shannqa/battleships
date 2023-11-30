/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDom: () => (/* binding */ createDom),
/* harmony export */   gameEnd: () => (/* binding */ gameEnd),
/* harmony export */   placeShips: () => (/* binding */ placeShips),
/* harmony export */   placementError: () => (/* binding */ placementError),
/* harmony export */   prepareShips: () => (/* binding */ prepareShips)
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");

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
function dragEnd() {
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
  const startGame = document.createElement("button");
  const prepInfoP2 = document.createElement("p");
  const errorMsg = document.createElement("div");
  prepBoardDiv.classList.add("prep-board-div");
  prepShipsDiv.classList.add("prep-ships-div");
  prepShipsList.classList.add("prep-ships-list");
  prepInfoDiv.classList.add("prep-info");
  startGame.classList.add("start-game");
  startGame.classList.add("hidden");
  prepInfoP2.classList.add("prep-info-p2");
  prepInfoP2.classList.add("hidden");
  errorMsg.classList.add("error-msg");
  errorMsg.classList.add("hidden");
  errorMsg.textContent = "Some ships don't fit on the board or overlap. Use drag & drop to move them or double click to rotate them before you can begin the game.";
  startGame.textContent = "Start game";
  startGame.addEventListener("click", checkPlacements);
  prepBoardTitle.textContent = "Your board";
  prepShipsTitle.textContent = "Place your ships";
  prepInfoP.textContent = "Drag & drop the ships on the board. Double-click a ship to rotate it.";
  prepInfoP2.textContent = "Once you're happy with the placement of your ships, click the start button to begin the game!";
  /* List of ships to be placed */
  _game_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard.shipLengths.forEach((item, index) => {
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
    prepShipsList.appendChild(fullShip);
  });
  prepBoardDiv.appendChild(prepBoardTitle);
  prepShipsDiv.appendChild(prepShipsTitle);
  prepShipsDiv.appendChild(prepShipsList);
  prepInfoDiv.appendChild(prepInfoP);
  prepInfoDiv.appendChild(startGame);
  prepInfoDiv.appendChild(prepInfoP2);
  prepShipsDiv.appendChild(prepInfoDiv);
  prepShipsDiv.appendChild(errorMsg);
  main.appendChild(prepBoardDiv);
  main.appendChild(prepShipsDiv);
  _game_js__WEBPACK_IMPORTED_MODULE_0__.players.prepare.board.drawGrid();
  const prepSquare = document.querySelectorAll(".prep-square");
  prepSquare.forEach(square => {
    square.addEventListener("drop", drop);
    square.addEventListener("dragover", allowDrop);
  });
}

// check if all ships were placed on the player's board
function areAllShipsPlaced() {
  const prepShipsList = document.querySelector(".prep-ships-list");
  if (prepShipsList.childNodes.length === 0) {
    const startGame = document.querySelector(".start-game");
    const prepInfoP2 = document.querySelector(".prep-info-p2");
    startGame.classList.remove("hidden");
    prepInfoP2.classList.remove("hidden");
  }
}

// check if all ships are placed correctly, if so, start the game
function checkPlacements() {
  const placeOnBoard = placeShips(_game_js__WEBPACK_IMPORTED_MODULE_0__.players.human.board);
  if (placeOnBoard === false) {
    const errorMsg = document.querySelector(".error-msg");
    errorMsg.classList.remove("hidden");
    return;
  }
  const prepBoardDiv = document.querySelector(".prep-board-div");
  const prepShipsDiv = document.querySelector(".prep-ships-div");
  prepBoardDiv.classList.add("hidden");
  prepShipsDiv.classList.add("hidden");
  _game_js__WEBPACK_IMPORTED_MODULE_0__.players.human.board.drawGrid();
  _game_js__WEBPACK_IMPORTED_MODULE_0__.players.AI.board.getRandomPlacement();
  _game_js__WEBPACK_IMPORTED_MODULE_0__.players.AI.board.drawGrid();
  // console.log(boardB.grid);
  _game_js__WEBPACK_IMPORTED_MODULE_0__.players.current = "human";
}
function placementError() {
  const prepShipsDiv = document.querySelector(".prep-ships-div");
  e;
}

// add ships to the players gameboard
//error: if ships at the beginning of the list are good, they get added to the grid. then, once an error happens, they stay inside the array instead of being removed
function placeShips(board) {
  // get placed ships coords
  for (let i = 0; i < _game_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard.shipLengths.length; i++) {
    const ship = document.querySelector(`#prep-${i}`);
    const coordStart = ship.parentNode.id;
    coordStart.split("");
    let startRow = parseInt(coordStart[1]);
    let startColumn = parseInt(coordStart[3]);
    let length = parseInt(_game_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard.shipLengths[i]);
    let endRow = startRow + length - 1;
    let endColumn = startColumn + length - 1;
    let fullCoords;
    if (ship.classList.contains("flex-toggle")) {
      //ship is vertical
      if (endRow > 9) {
        return false;
      }
      fullCoords = board.getFullCoords([[startRow, startColumn], [endRow, startColumn]]);
      if (board.checkIfOccupied(fullCoords) == true) {
        return false;
      }
      board.placeShip(length, [startRow, startColumn], [endRow, startColumn]);
    } else {
      // ship is horizontal
      if (endColumn > 9) {
        return false;
      }
      fullCoords = board.getFullCoords([[startRow, startColumn], [startRow, endColumn]]);
      if (board.checkIfOccupied(fullCoords) == true) {
        return false;
      }
      board.placeShip(length, [startRow, startColumn], [startRow, endColumn]);
    }
  }
}
/* Clean all child nodes of .main */
function cleanMainDom() {
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
  _game_js__WEBPACK_IMPORTED_MODULE_0__.players.current = null;
  if (player === "AI") {
    wonOrLost.textContent = "You won!";
  } else if (player === "human") {
    wonOrLost.textContent = "You lost";
  }
  modal.appendChild(wonOrLost);
  modal.appendChild(button);
  main.appendChild(modal);
}
function playAgain() {
  (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.getPlayers)();
  cleanMainDom();
  prepareShips();
}


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard),
/* harmony export */   Player: () => (/* binding */ Player),
/* harmony export */   Ship: () => (/* binding */ Ship),
/* harmony export */   getPlayers: () => (/* binding */ getPlayers),
/* harmony export */   players: () => (/* binding */ players)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");

const players = {
  current: null,
  human: null,
  AI: null,
  prepare: null
};
class Ship {
  constructor(length, id) {
    this.length = length;
    this.hits = 0;
    this.destroyed = false;
    this.id = id;
  }
  hit() {
    this.hits += 1;
    this.isSunk();
  }
  isSunk() {
    if (this.hits >= this.length) {
      this.destroyed = true;
      return true;
    }
    return false;
  }
}
class Gameboard {
  constructor(owner) {
    this.grid = this.createGrid();
    this.owner = owner;
    this.shipsList = [];
    this.receivedHits = 0;
    this.lostGame = false;
  }
  static shipLengths = [2, 3, 4, 5];
  placeShip(length, coordsStart, coordsEnd) {
    const id = this.shipsList.length;
    const placedShip = new Ship(length, id);

    // if the ship's length > 2, mark the other squares too
    this.shipsList.push(placedShip);
    if (coordsStart[0] !== coordsEnd[0]) {
      for (let i = coordsStart[0]; i <= coordsEnd[0]; i++) {
        this.grid[i][coordsStart[1]] = id;
      }
    }
    if (coordsStart[1] !== coordsEnd[1]) {
      for (let i = coordsStart[1]; i <= coordsEnd[1]; i++) {
        this.grid[coordsStart[0]][i] = id;
      }
    }
    this.grid[coordsStart[0]][coordsStart[1]] = id;
    this.grid[coordsEnd[0]][coordsEnd[1]] = id;
  }
  receiveAttack(coords) {
    let square;
    let id = this.grid[coords[0]][coords[1]];
    // console.log(id);
    if (id === "miss" || id === "hit") {
      // try again if invalid move
      console.log("invalid move");
      return "invalid move";
    }
    if (players.current === "human") {
      square = document.querySelector(`.enemy-square#r${coords[0]}c${coords[1]}`);
      players.current = "AI";
    } else if (players.current === "AI") {
      square = document.querySelector(`.own-square#r${coords[0]}c${coords[1]}`);
      players.current = "human";
    }

    //record a hit or miss
    if (id === null) {
      this.grid[coords[0]][coords[1]] = "miss";
      square.classList.add("miss");
    } else {
      square.classList.add("hit");
      let hitShip = this.shipsList[id];
      this.grid[coords[0]][coords[1]] = "hit";
      hitShip.hit();
      this.receivedHits += 1;
      this.checkIfLost();
    }
    console.log("owner: " + this.owner, "hits: " + this.receivedHits);
    //console.log(this.grid);
    //if it's AI's turn now, send an attack
    if (players.current === "AI") {
      players.human.board.AIattack();
    }
    // console.log(this.grid);
  }

  playerAttack(coords) {
    // if it's not the player's turn, clicking on enemy board will do nothing
    if (players.current === "human") {
      boards.AI.receiveAttack(coords);
    }
    return;
  }
  AIattack() {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    if (this.grid[x][y] === "hit" || this.grid[x][y] === "miss") {
      return this.AIattack();
    } else {
      return this.receiveAttack([x, y]);
    }
  }
  playerAttack(coords) {
    // if it's not the player's turn, clicking on enemy board will do nothing
    if (players.current === "human") {
      players.AI.board.receiveAttack(coords);
    }
    return;
  }
  checkIfLost() {
    const possibleScore = Gameboard.shipLengths.reduce((previous, current, initial) => previous + current, 0);
    if (this.receivedHits >= possibleScore) {
      this.lostGame = true;
      console.log("game lost: " + this.owner);
      (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.gameEnd)(this.owner);
    }
  }
  createGrid() {
    let gridArray = [];
    for (let y = 0; y < 10; y++) {
      gridArray.push([]);
      for (let x = 0; x < 10; x++) {
        gridArray[y].push(null);
      }
    }
    return gridArray;
  }

  // generate random ships and place them on the enemy board
  getRandomPlacement() {
    for (let i = Gameboard.shipLengths.length - 1; i >= 0; i--) {
      const shipL = parseInt(Gameboard.shipLengths[i]);
      let coords = this.getNewCoords(shipL);
      this.placeShip(shipL, [coords[0][0], coords[0][1]], [coords[1][0], coords[1][1]]);
      // console.log(this.grid);
    }
  }

  // runs functions generating and checking if new coords are valid, returns coords for one ship or uses recursion to start over the process if coords are invalid
  getNewCoords(shipLength) {
    let coords = this.randomizeCoords(parseInt(shipLength));
    let fullCoords = this.getFullCoords(coords);
    let coordCheck = this.checkIfOccupied(fullCoords);
    if (coordCheck === false) {
      return coords;
    } else {
      return this.getNewCoords(parseInt(shipLength));
    }
  }

  // uses math.random to get random coordinates on the board, randomize wheter the new ship will be vertical or horizontal, calculate that it fits on the board according to the ships length
  randomizeCoords(shipLength) {
    const startRow = Math.floor(Math.random() * 10);
    const startCol = Math.floor(Math.random() * 10);
    const endRow = startRow + parseInt(shipLength) - 1;
    const endCol = startCol + parseInt(shipLength) - 1;
    if (endRow < 10 && endCol < 10) {
      //randomize - horizontal or vertical
      let chance = Math.random() * 1;
      if (chance < 0.5) {
        return [[startRow, startCol], [startRow, endCol]];
      } else {
        return [[startRow, startCol], [endRow, startCol]];
      }
    } else if (endCol < 10) {
      return [[startRow, startCol], [startRow, endCol]];
    } else if (endRow < 10) {
      return [[startRow, startCol], [endRow, startCol]];
    } else {
      return this.randomizeCoords(shipLength);
    }
  }

  // gets full coordinates of every square in a single ship
  getFullCoords(coords) {
    let rowStart = parseInt(coords[0][0]);
    let colStart = parseInt(coords[0][1]);
    let rowEnd = parseInt(coords[1][0]);
    let colEnd = parseInt(coords[1][1]);
    let fullCoordinates = [];
    if (rowStart !== rowEnd) {
      for (let i = rowStart; i <= rowEnd; i++) {
        fullCoordinates.push([i, colStart]);
      }
    }
    if (colStart !== colEnd) {
      for (let i = colStart; i <= colEnd; i++) {
        fullCoordinates.push([rowStart, i]);
      }
    }
    return fullCoordinates;
  }

  // check if any square of the new ship is already occupied; if so, send info to previous functions to generate new ship coordinates instead
  checkIfOccupied(fullCoordinates) {
    // console.log(fullCoordinates);
    for (let i = 0; i < fullCoordinates.length; i++) {
      let coord = fullCoordinates[i];
      if (this.grid[parseInt(coord[0])][parseInt(coord[1])] !== null) {
        // console.log("check - occupied");
        return true;
      }
    }
    return false;
  }
  drawGrid() {
    const main = document.querySelector(".main");
    const array = this.grid;
    const body = document.querySelector("body");
    const prepBoardDiv = document.querySelector("div.prep-board-div");
    const grid = document.createElement("div");
    array.forEach((row, rindex) => {
      row.forEach((column, cindex) => {
        const square = document.createElement("div");
        square.setAttribute("id", `r${rindex}c${cindex}`);
        if (this.owner === "human") {
          square.classList.add("own-square");
        } else if (this.owner === "AI") {
          square.classList.add("enemy-square");
          square.addEventListener("click", () => {
            this.playerAttack([rindex, cindex]);
          });
        } else if (this.owner === "prepare") {
          square.classList.add("prep-square");
        }
        if (typeof column == "number") {
          // console.log(column);
          if (this.owner === "human") {
            square.classList.add("own-ship");
          } else {
            // remove marking of enemy ships in the final version of the game
            square.classList.add("enemy-ship");
          }
        }
        // check if those two ifs are needed, possibly remove
        if (column === "miss") {
          square.classList.add("miss");
        }
        if (column === "hit") {
          square.classList.add("hit");
        }
        grid.appendChild(square);
      });
    });
    if (this.owner === "human") {
      grid.classList.add("grid-own");
      main.appendChild(grid);
    } else if (this.owner === "AI") {
      grid.classList.add("grid-enemy");
      main.appendChild(grid);
    } else if (this.owner === "prepare") {
      grid.classList.add("grid-prep");
      prepBoardDiv.appendChild(grid);
    }
    grid.classList.add("grid");
  }
}
class Player {
  constructor(owner) {
    this.owner = owner;
    this.status = null;
    this.board = new Gameboard(owner);
  }
}
function getPlayers() {
  players.human = new Player("human");
  players.AI = new Player("AI");
  players.prepare = new Player("prepare");
}

/*
function playTestGame() {
  const playerA = new Player("human");
  const playerB = new Player("AI");
  boards.human = new Gameboard("human");
  boards.AI = new Gameboard("AI");

  cleanPlaceDom();
  boards.human.getRandomPlacement();

  boards.human.drawGrid();
  boards.AI.getRandomPlacement();
  boards.AI.drawGrid();
  // console.log(boardB.grid);
  currentPlayer = "human";
}*/



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Cinzel:wght@800&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

body {
  background-color: #0d1e26;
  color: #dca85d;
}

.header {
  margin: 12px;
  display: flex;
  justify-content: center;
}

.header > span {
  font-size: 2.5rem;
  font-family: 'Cinzel', serif;
  text-shadow: #3c3d51 0px -10px 6px, 2px 2px 2px #5f561b;
  border-bottom: #dca85d 2px solid;
  margin-bottom: 8px;
}

.main {
  display: flex;
  justify-content: center;
}

.prep-board-div {
  margin: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}

.prep-ships-div {
  margin: 6px 24px;
  display: flex;
  flex-direction: column;
  width: 300px;
}

.prep-ships-div > span, .prep-board-div > span {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.prep-info {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
}

.sq0-prep:hover {
  cursor: grab;
}

.grid {
  display: grid;
  grid-template-columns: repeat(10, 28px);
  column-gap: 0px;
  row-gap: 0px;
  justify-items: stretch;
  font-size: 12px;
  margin: 0 12px;
}

.own-square, .enemy-square, .prep-square {
  width: 28px;
  height: 28px;
  border: 1px #dca85d solid;
  margin: 0px;
}

.enemy-square:hover {
  cursor: pointer;
}

.enemy-square.hit {
  background-color: darkgreen;
}

.enemy-square.miss {
  background-color: grey;
}

.own-square.miss {
  background-color: grey;
}

.own-square.hit {
  background-color: rgb(255, 98, 205);
}

.own-square.ship, .prep-square.ship{
  background-color: #1253d6;
}

.ship-div {
  display: flex;
  margin: 4px;
}

.ship-on-board {
  position: absolute;
  margin: 0px;
}

.shipsq {
  background-color: rgb(56 9 135);
}

.flex-toggle {
  flex-direction: column;
}

.start-game, .button-modal {
  margin: 10px;
  background-color: #11364a;
  color: #dca85d;
  border: 1px #dca85d solid;
  padding: 6px 18px;
  font-size: 1.2rem;
  align-self: center;
}

.start-game:hover, .button:hover {
  background-color: #234e66;
  cursor: pointer;
}

.start-game:active, .button:active {
  background-color: rgb(56 9 135);
}

.own-ship {
  background: #1253d6;
}

.grid-enemy {
  background-color: rgb(58, 39, 104);
}

.grid-own, .grid-prep {
  background-color: #234e66;
}

.grid-place-own {
  background-color: #234e66;
}

.enemy-ship {
  background: rgb(175, 13, 40);
}

.error-msg {
  background-color: rgb(58, 39, 104);
  margin: 8px 0px;
  border: 1px #dca85d solid;
  padding: 6px;
}

.hidden {
  display: none;
}

.modal {
  position: absolute;
  z-index: 1;
  padding: 20px;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,4BAA4B;EAC5B,uDAAuD;EACvD,gCAAgC;EAChC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,eAAe;EACf,YAAY;EACZ,sBAAsB;EACtB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,WAAW;AACb;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,yBAAyB;EACzB,cAAc;EACd,yBAAyB;EACzB,iBAAiB;EACjB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,kCAAkC;EAClC,eAAe;EACf,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,aAAa;AACf","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@800&display=swap');\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  margin: 0px;\r\n  padding: 0px;\r\n}\r\n\r\nbody {\r\n  background-color: #0d1e26;\r\n  color: #dca85d;\r\n}\r\n\r\n.header {\r\n  margin: 12px;\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.header > span {\r\n  font-size: 2.5rem;\r\n  font-family: 'Cinzel', serif;\r\n  text-shadow: #3c3d51 0px -10px 6px, 2px 2px 2px #5f561b;\r\n  border-bottom: #dca85d 2px solid;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.main {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.prep-board-div {\r\n  margin: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 300px;\r\n}\r\n\r\n.prep-ships-div {\r\n  margin: 6px 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 300px;\r\n}\r\n\r\n.prep-ships-div > span, .prep-board-div > span {\r\n  font-size: 1.5rem;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.prep-info {\r\n  margin-top: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.sq0-prep:hover {\r\n  cursor: grab;\r\n}\r\n\r\n.grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 28px);\r\n  column-gap: 0px;\r\n  row-gap: 0px;\r\n  justify-items: stretch;\r\n  font-size: 12px;\r\n  margin: 0 12px;\r\n}\r\n\r\n.own-square, .enemy-square, .prep-square {\r\n  width: 28px;\r\n  height: 28px;\r\n  border: 1px #dca85d solid;\r\n  margin: 0px;\r\n}\r\n\r\n.enemy-square:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.enemy-square.hit {\r\n  background-color: darkgreen;\r\n}\r\n\r\n.enemy-square.miss {\r\n  background-color: grey;\r\n}\r\n\r\n.own-square.miss {\r\n  background-color: grey;\r\n}\r\n\r\n.own-square.hit {\r\n  background-color: rgb(255, 98, 205);\r\n}\r\n\r\n.own-square.ship, .prep-square.ship{\r\n  background-color: #1253d6;\r\n}\r\n\r\n.ship-div {\r\n  display: flex;\r\n  margin: 4px;\r\n}\r\n\r\n.ship-on-board {\r\n  position: absolute;\r\n  margin: 0px;\r\n}\r\n\r\n.shipsq {\r\n  background-color: rgb(56 9 135);\r\n}\r\n\r\n.flex-toggle {\r\n  flex-direction: column;\r\n}\r\n\r\n.start-game, .button-modal {\r\n  margin: 10px;\r\n  background-color: #11364a;\r\n  color: #dca85d;\r\n  border: 1px #dca85d solid;\r\n  padding: 6px 18px;\r\n  font-size: 1.2rem;\r\n  align-self: center;\r\n}\r\n\r\n.start-game:hover, .button:hover {\r\n  background-color: #234e66;\r\n  cursor: pointer;\r\n}\r\n\r\n.start-game:active, .button:active {\r\n  background-color: rgb(56 9 135);\r\n}\r\n\r\n.own-ship {\r\n  background: #1253d6;\r\n}\r\n\r\n.grid-enemy {\r\n  background-color: rgb(58, 39, 104);\r\n}\r\n\r\n.grid-own, .grid-prep {\r\n  background-color: #234e66;\r\n}\r\n\r\n.grid-place-own {\r\n  background-color: #234e66;\r\n}\r\n\r\n.enemy-ship {\r\n  background: rgb(175, 13, 40);\r\n}\r\n\r\n.error-msg {\r\n  background-color: rgb(58, 39, 104);\r\n  margin: 8px 0px;\r\n  border: 1px #dca85d solid;\r\n  padding: 6px;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n\r\n.modal {\r\n  position: absolute;\r\n  z-index: 1;\r\n  padding: 20px;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.js */ "./src/game.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/style.css");




//playTestGame();

(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.createDom)();
(0,_game_js__WEBPACK_IMPORTED_MODULE_1__.getPlayers)();
(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.prepareShips)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNVQTtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLDZIQUE2SDtBQUM3SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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dXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVib2FyZCwgcGxheWVycywgZ2V0UGxheWVycyB9IGZyb20gXCIuL2dhbWUuanNcIjtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURvbSgpIHtcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpO1xyXG4gIHRpdGxlLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwc1wiO1xyXG4gIG1haW4uY2xhc3NMaXN0LmFkZChcIm1haW5cIik7XHJcblxyXG4gIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gIGJvZHkuYXBwZW5kQ2hpbGQobWFpbik7XHJcbiAgYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xyXG59XHJcblxyXG4vKiBEcmFnIGFuZCBkcm9wIGZ1bmN0aW9ucyAqL1xyXG5mdW5jdGlvbiBhbGxvd0Ryb3AoZXYpIHtcclxuICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFnKGV2KSB7XHJcbiAgZXYuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGV2LnRhcmdldC5pZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyb3AoZXYpIHtcclxuICAvLyBjYXRjaCBhbiBlcnJvciBoYXBwZW5pbmcgaWYgdGhlIHVzZXIgdHJpZXMgdG8gZHJhZyBhbmQgZHJvcCB0aGUgc2hpcCBpbiBhIHdyb25nIHBsYWNlLCBlLmcuIGluIHRoZSBtaWRkbGUgb2YgbXVsdGlwbGUgc3F1YXJlc1xyXG4gIHRyeSB7XHJcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGRhdGEgPSBldi5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIik7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhKS5jbGFzc0xpc3QuYWRkKFwic2hpcC1vbi1ib2FyZFwiKTtcclxuICAgIGV2LnRhcmdldC5hcHBlbmRDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhKSk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICBjb25zb2xlLmxvZyhcImVycm9yIC0gZHJhZyZkcm9wXCIpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZHJhZ0VuZCgpIHtcclxuICBhcmVBbGxTaGlwc1BsYWNlZCgpO1xyXG59XHJcblxyXG4vKiBQcmVwYXJhdGlvbiBzdGFnZSAtIHBsYXllciBwbGFjZXMgdGhlaXIgc2hpcHMgb24gdGhlaXIgYm9hcmQgKi9cclxuZnVuY3Rpb24gcHJlcGFyZVNoaXBzKCkge1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIik7XHJcbiAgY29uc3QgcHJlcEJvYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBwcmVwQm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIGNvbnN0IHByZXBTaGlwc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29uc3QgcHJlcFNoaXBzVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICBjb25zdCBwcmVwU2hpcHNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBwcmVwSW5mb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29uc3QgcHJlcEluZm9QID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgY29uc3Qgc3RhcnRHYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBjb25zdCBwcmVwSW5mb1AyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgY29uc3QgZXJyb3JNc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICBwcmVwQm9hcmREaXYuY2xhc3NMaXN0LmFkZChcInByZXAtYm9hcmQtZGl2XCIpO1xyXG4gIHByZXBTaGlwc0Rpdi5jbGFzc0xpc3QuYWRkKFwicHJlcC1zaGlwcy1kaXZcIik7XHJcbiAgcHJlcFNoaXBzTGlzdC5jbGFzc0xpc3QuYWRkKFwicHJlcC1zaGlwcy1saXN0XCIpO1xyXG4gIHByZXBJbmZvRGl2LmNsYXNzTGlzdC5hZGQoXCJwcmVwLWluZm9cIik7XHJcbiAgc3RhcnRHYW1lLmNsYXNzTGlzdC5hZGQoXCJzdGFydC1nYW1lXCIpO1xyXG4gIHN0YXJ0R2FtZS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gIHByZXBJbmZvUDIuY2xhc3NMaXN0LmFkZChcInByZXAtaW5mby1wMlwiKTtcclxuICBwcmVwSW5mb1AyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgZXJyb3JNc2cuY2xhc3NMaXN0LmFkZChcImVycm9yLW1zZ1wiKTtcclxuICBlcnJvck1zZy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG5cclxuICBlcnJvck1zZy50ZXh0Q29udGVudCA9XHJcbiAgICBcIlNvbWUgc2hpcHMgZG9uJ3QgZml0IG9uIHRoZSBib2FyZCBvciBvdmVybGFwLiBVc2UgZHJhZyAmIGRyb3AgdG8gbW92ZSB0aGVtIG9yIGRvdWJsZSBjbGljayB0byByb3RhdGUgdGhlbSBiZWZvcmUgeW91IGNhbiBiZWdpbiB0aGUgZ2FtZS5cIjtcclxuICBzdGFydEdhbWUudGV4dENvbnRlbnQgPSBcIlN0YXJ0IGdhbWVcIjtcclxuICBzdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoZWNrUGxhY2VtZW50cyk7XHJcbiAgcHJlcEJvYXJkVGl0bGUudGV4dENvbnRlbnQgPSBcIllvdXIgYm9hcmRcIjtcclxuICBwcmVwU2hpcHNUaXRsZS50ZXh0Q29udGVudCA9IFwiUGxhY2UgeW91ciBzaGlwc1wiO1xyXG4gIHByZXBJbmZvUC50ZXh0Q29udGVudCA9XHJcbiAgICBcIkRyYWcgJiBkcm9wIHRoZSBzaGlwcyBvbiB0aGUgYm9hcmQuIERvdWJsZS1jbGljayBhIHNoaXAgdG8gcm90YXRlIGl0LlwiO1xyXG4gIHByZXBJbmZvUDIudGV4dENvbnRlbnQgPVxyXG4gICAgXCJPbmNlIHlvdSdyZSBoYXBweSB3aXRoIHRoZSBwbGFjZW1lbnQgb2YgeW91ciBzaGlwcywgY2xpY2sgdGhlIHN0YXJ0IGJ1dHRvbiB0byBiZWdpbiB0aGUgZ2FtZSFcIjtcclxuICAvKiBMaXN0IG9mIHNoaXBzIHRvIGJlIHBsYWNlZCAqL1xyXG4gIEdhbWVib2FyZC5zaGlwTGVuZ3Rocy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3QgZnVsbFNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZnVsbFNoaXAuY2xhc3NMaXN0LmFkZChcInNoaXAtZGl2XCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtOyBpKyspIHtcclxuICAgICAgY29uc3Qgc2hpcFNxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAvLyBmaXJzdCBzcXVhcmUgb2YgYSBzaGlwXHJcbiAgICAgICAgc2hpcFNxLmNsYXNzTGlzdC5hZGQoXCJzcTAtcHJlcFwiKTtcclxuICAgICAgfVxyXG4gICAgICBzaGlwU3EuY2xhc3NMaXN0LmFkZChcInByZXAtc3F1YXJlXCIpO1xyXG4gICAgICBzaGlwU3EuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICAgIGZ1bGxTaGlwLmFwcGVuZENoaWxkKHNoaXBTcSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogRHJhZyBhbmQgZHJvcCAqL1xyXG4gICAgZnVsbFNoaXAuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHByZXAtJHtpbmRleH1gKTtcclxuICAgIGZ1bGxTaGlwLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XHJcbiAgICBmdWxsU2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWcpO1xyXG4gICAgZnVsbFNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0VuZCk7XHJcbiAgICBmdWxsU2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBmdWxsU2hpcC5jbGFzc0xpc3QudG9nZ2xlKFwiZmxleC10b2dnbGVcIik7XHJcbiAgICB9KTtcclxuICAgIHByZXBTaGlwc0xpc3QuYXBwZW5kQ2hpbGQoZnVsbFNoaXApO1xyXG4gIH0pO1xyXG5cclxuICBwcmVwQm9hcmREaXYuYXBwZW5kQ2hpbGQocHJlcEJvYXJkVGl0bGUpO1xyXG4gIHByZXBTaGlwc0Rpdi5hcHBlbmRDaGlsZChwcmVwU2hpcHNUaXRsZSk7XHJcbiAgcHJlcFNoaXBzRGl2LmFwcGVuZENoaWxkKHByZXBTaGlwc0xpc3QpO1xyXG4gIHByZXBJbmZvRGl2LmFwcGVuZENoaWxkKHByZXBJbmZvUCk7XHJcbiAgcHJlcEluZm9EaXYuYXBwZW5kQ2hpbGQoc3RhcnRHYW1lKTtcclxuICBwcmVwSW5mb0Rpdi5hcHBlbmRDaGlsZChwcmVwSW5mb1AyKTtcclxuICBwcmVwU2hpcHNEaXYuYXBwZW5kQ2hpbGQocHJlcEluZm9EaXYpO1xyXG4gIHByZXBTaGlwc0Rpdi5hcHBlbmRDaGlsZChlcnJvck1zZyk7XHJcbiAgbWFpbi5hcHBlbmRDaGlsZChwcmVwQm9hcmREaXYpO1xyXG4gIG1haW4uYXBwZW5kQ2hpbGQocHJlcFNoaXBzRGl2KTtcclxuXHJcbiAgcGxheWVycy5wcmVwYXJlLmJvYXJkLmRyYXdHcmlkKCk7XHJcbiAgY29uc3QgcHJlcFNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlcC1zcXVhcmVcIik7XHJcbiAgcHJlcFNxdWFyZS5mb3JFYWNoKChzcXVhcmUpID0+IHtcclxuICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wKTtcclxuICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgYWxsb3dEcm9wKTtcclxuICB9KTtcclxufVxyXG5cclxuLy8gY2hlY2sgaWYgYWxsIHNoaXBzIHdlcmUgcGxhY2VkIG9uIHRoZSBwbGF5ZXIncyBib2FyZFxyXG5mdW5jdGlvbiBhcmVBbGxTaGlwc1BsYWNlZCgpIHtcclxuICBjb25zdCBwcmVwU2hpcHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVwLXNoaXBzLWxpc3RcIik7XHJcblxyXG4gIGlmIChwcmVwU2hpcHNMaXN0LmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICBjb25zdCBzdGFydEdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LWdhbWVcIik7XHJcbiAgICBjb25zdCBwcmVwSW5mb1AyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVwLWluZm8tcDJcIik7XHJcbiAgICBzdGFydEdhbWUuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIHByZXBJbmZvUDIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgcGxhY2VkIGNvcnJlY3RseSwgaWYgc28sIHN0YXJ0IHRoZSBnYW1lXHJcbmZ1bmN0aW9uIGNoZWNrUGxhY2VtZW50cygpIHtcclxuICBjb25zdCBwbGFjZU9uQm9hcmQgPSBwbGFjZVNoaXBzKHBsYXllcnMuaHVtYW4uYm9hcmQpO1xyXG5cclxuICBpZiAocGxhY2VPbkJvYXJkID09PSBmYWxzZSkge1xyXG4gICAgY29uc3QgZXJyb3JNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVycm9yLW1zZ1wiKTtcclxuICAgIGVycm9yTXNnLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IHByZXBCb2FyZERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlcC1ib2FyZC1kaXZcIik7XHJcbiAgY29uc3QgcHJlcFNoaXBzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVwLXNoaXBzLWRpdlwiKTtcclxuICBwcmVwQm9hcmREaXYuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICBwcmVwU2hpcHNEaXYuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuXHJcbiAgcGxheWVycy5odW1hbi5ib2FyZC5kcmF3R3JpZCgpO1xyXG4gIHBsYXllcnMuQUkuYm9hcmQuZ2V0UmFuZG9tUGxhY2VtZW50KCk7XHJcbiAgcGxheWVycy5BSS5ib2FyZC5kcmF3R3JpZCgpO1xyXG4gIC8vIGNvbnNvbGUubG9nKGJvYXJkQi5ncmlkKTtcclxuICBwbGF5ZXJzLmN1cnJlbnQgPSBcImh1bWFuXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYWNlbWVudEVycm9yKCkge1xyXG4gIGNvbnN0IHByZXBTaGlwc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlcC1zaGlwcy1kaXZcIik7XHJcblxyXG4gIGU7XHJcbn1cclxuXHJcbi8vIGFkZCBzaGlwcyB0byB0aGUgcGxheWVycyBnYW1lYm9hcmRcclxuLy9lcnJvcjogaWYgc2hpcHMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdCBhcmUgZ29vZCwgdGhleSBnZXQgYWRkZWQgdG8gdGhlIGdyaWQuIHRoZW4sIG9uY2UgYW4gZXJyb3IgaGFwcGVucywgdGhleSBzdGF5IGluc2lkZSB0aGUgYXJyYXkgaW5zdGVhZCBvZiBiZWluZyByZW1vdmVkXHJcbmZ1bmN0aW9uIHBsYWNlU2hpcHMoYm9hcmQpIHtcclxuICAvLyBnZXQgcGxhY2VkIHNoaXBzIGNvb3Jkc1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZWJvYXJkLnNoaXBMZW5ndGhzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3ByZXAtJHtpfWApO1xyXG4gICAgY29uc3QgY29vcmRTdGFydCA9IHNoaXAucGFyZW50Tm9kZS5pZDtcclxuICAgIGNvb3JkU3RhcnQuc3BsaXQoXCJcIik7XHJcbiAgICBsZXQgc3RhcnRSb3cgPSBwYXJzZUludChjb29yZFN0YXJ0WzFdKTtcclxuICAgIGxldCBzdGFydENvbHVtbiA9IHBhcnNlSW50KGNvb3JkU3RhcnRbM10pO1xyXG4gICAgbGV0IGxlbmd0aCA9IHBhcnNlSW50KEdhbWVib2FyZC5zaGlwTGVuZ3Roc1tpXSk7XHJcbiAgICBsZXQgZW5kUm93ID0gc3RhcnRSb3cgKyBsZW5ndGggLSAxO1xyXG4gICAgbGV0IGVuZENvbHVtbiA9IHN0YXJ0Q29sdW1uICsgbGVuZ3RoIC0gMTtcclxuICAgIGxldCBmdWxsQ29vcmRzO1xyXG4gICAgaWYgKHNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxleC10b2dnbGVcIikpIHtcclxuICAgICAgLy9zaGlwIGlzIHZlcnRpY2FsXHJcbiAgICAgIGlmIChlbmRSb3cgPiA5KSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGZ1bGxDb29yZHMgPSBib2FyZC5nZXRGdWxsQ29vcmRzKFtcclxuICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sdW1uXSxcclxuICAgICAgICBbZW5kUm93LCBzdGFydENvbHVtbl0sXHJcbiAgICAgIF0pO1xyXG4gICAgICBpZiAoYm9hcmQuY2hlY2tJZk9jY3VwaWVkKGZ1bGxDb29yZHMpID09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgYm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgW3N0YXJ0Um93LCBzdGFydENvbHVtbl0sIFtlbmRSb3csIHN0YXJ0Q29sdW1uXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBzaGlwIGlzIGhvcml6b250YWxcclxuICAgICAgaWYgKGVuZENvbHVtbiA+IDkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgZnVsbENvb3JkcyA9IGJvYXJkLmdldEZ1bGxDb29yZHMoW1xyXG4gICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2x1bW5dLFxyXG4gICAgICAgIFtzdGFydFJvdywgZW5kQ29sdW1uXSxcclxuICAgICAgXSk7XHJcbiAgICAgIGlmIChib2FyZC5jaGVja0lmT2NjdXBpZWQoZnVsbENvb3JkcykgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBib2FyZC5wbGFjZVNoaXAobGVuZ3RoLCBbc3RhcnRSb3csIHN0YXJ0Q29sdW1uXSwgW3N0YXJ0Um93LCBlbmRDb2x1bW5dKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuLyogQ2xlYW4gYWxsIGNoaWxkIG5vZGVzIG9mIC5tYWluICovXHJcbmZ1bmN0aW9uIGNsZWFuTWFpbkRvbSgpIHtcclxuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xyXG4gIHdoaWxlIChtYWluLmZpcnN0Q2hpbGQpIHtcclxuICAgIG1haW4ucmVtb3ZlQ2hpbGQobWFpbi5maXJzdENoaWxkKTtcclxuICB9XHJcbn1cclxuXHJcbi8qIFRoZSBnYW1lIGVuZHMsIHN0YXJ0IG92ZXIgKi9cclxuZnVuY3Rpb24gZ2FtZUVuZChwbGF5ZXIpIHtcclxuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xyXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCB3b25Pckxvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cclxuICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwibW9kYWxcIik7XHJcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1idXR0b25cIik7XHJcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJQbGF5IGFnYWluXCI7XHJcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5QWdhaW4pO1xyXG4gIHBsYXllcnMuY3VycmVudCA9IG51bGw7XHJcbiAgaWYgKHBsYXllciA9PT0gXCJBSVwiKSB7XHJcbiAgICB3b25Pckxvc3QudGV4dENvbnRlbnQgPSBcIllvdSB3b24hXCI7XHJcbiAgfSBlbHNlIGlmIChwbGF5ZXIgPT09IFwiaHVtYW5cIikge1xyXG4gICAgd29uT3JMb3N0LnRleHRDb250ZW50ID0gXCJZb3UgbG9zdFwiO1xyXG4gIH1cclxuXHJcbiAgbW9kYWwuYXBwZW5kQ2hpbGQod29uT3JMb3N0KTtcclxuICBtb2RhbC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gIG1haW4uYXBwZW5kQ2hpbGQobW9kYWwpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5QWdhaW4oKSB7XHJcbiAgZ2V0UGxheWVycygpO1xyXG4gIGNsZWFuTWFpbkRvbSgpO1xyXG4gIHByZXBhcmVTaGlwcygpO1xyXG59XHJcblxyXG5leHBvcnQgeyBjcmVhdGVEb20sIHByZXBhcmVTaGlwcywgcGxhY2VTaGlwcywgcGxhY2VtZW50RXJyb3IsIGdhbWVFbmQgfTtcclxuIiwiaW1wb3J0IHsgZ2FtZUVuZCB9IGZyb20gXCIuL2RvbS5qc1wiO1xyXG5cclxuY29uc3QgcGxheWVycyA9IHtcclxuICBjdXJyZW50OiBudWxsLFxyXG4gIGh1bWFuOiBudWxsLFxyXG4gIEFJOiBudWxsLFxyXG4gIHByZXBhcmU6IG51bGwsXHJcbn07XHJcblxyXG5jbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgsIGlkKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMuaGl0cyA9IDA7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5oaXRzICs9IDE7XHJcbiAgICB0aGlzLmlzU3VuaygpO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lcikge1xyXG4gICAgdGhpcy5ncmlkID0gdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XHJcbiAgICB0aGlzLnNoaXBzTGlzdCA9IFtdO1xyXG4gICAgdGhpcy5yZWNlaXZlZEhpdHMgPSAwO1xyXG4gICAgdGhpcy5sb3N0R2FtZSA9IGZhbHNlO1xyXG4gIH1cclxuICBzdGF0aWMgc2hpcExlbmd0aHMgPSBbMiwgMywgNCwgNV07XHJcblxyXG4gIHBsYWNlU2hpcChsZW5ndGgsIGNvb3Jkc1N0YXJ0LCBjb29yZHNFbmQpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5zaGlwc0xpc3QubGVuZ3RoO1xyXG4gICAgY29uc3QgcGxhY2VkU2hpcCA9IG5ldyBTaGlwKGxlbmd0aCwgaWQpO1xyXG5cclxuICAgIC8vIGlmIHRoZSBzaGlwJ3MgbGVuZ3RoID4gMiwgbWFyayB0aGUgb3RoZXIgc3F1YXJlcyB0b29cclxuICAgIHRoaXMuc2hpcHNMaXN0LnB1c2gocGxhY2VkU2hpcCk7XHJcbiAgICBpZiAoY29vcmRzU3RhcnRbMF0gIT09IGNvb3Jkc0VuZFswXSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gY29vcmRzU3RhcnRbMF07IGkgPD0gY29vcmRzRW5kWzBdOyBpKyspIHtcclxuICAgICAgICB0aGlzLmdyaWRbaV1bY29vcmRzU3RhcnRbMV1dID0gaWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb29yZHNTdGFydFsxXSAhPT0gY29vcmRzRW5kWzFdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb29yZHNTdGFydFsxXTsgaSA8PSBjb29yZHNFbmRbMV07IGkrKykge1xyXG4gICAgICAgIHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1baV0gPSBpZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5ncmlkW2Nvb3Jkc1N0YXJ0WzBdXVtjb29yZHNTdGFydFsxXV0gPSBpZDtcclxuICAgIHRoaXMuZ3JpZFtjb29yZHNFbmRbMF1dW2Nvb3Jkc0VuZFsxXV0gPSBpZDtcclxuICB9XHJcblxyXG4gIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XHJcbiAgICBsZXQgc3F1YXJlO1xyXG4gICAgbGV0IGlkID0gdGhpcy5ncmlkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGlkKTtcclxuICAgIGlmIChpZCA9PT0gXCJtaXNzXCIgfHwgaWQgPT09IFwiaGl0XCIpIHtcclxuICAgICAgLy8gdHJ5IGFnYWluIGlmIGludmFsaWQgbW92ZVxyXG4gICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgbW92ZVwiKTtcclxuICAgICAgcmV0dXJuIFwiaW52YWxpZCBtb3ZlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBsYXllcnMuY3VycmVudCA9PT0gXCJodW1hblwiKSB7XHJcbiAgICAgIHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgYC5lbmVteS1zcXVhcmUjciR7Y29vcmRzWzBdfWMke2Nvb3Jkc1sxXX1gXHJcbiAgICAgICk7XHJcbiAgICAgIHBsYXllcnMuY3VycmVudCA9IFwiQUlcIjtcclxuICAgIH0gZWxzZSBpZiAocGxheWVycy5jdXJyZW50ID09PSBcIkFJXCIpIHtcclxuICAgICAgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLm93bi1zcXVhcmUjciR7Y29vcmRzWzBdfWMke2Nvb3Jkc1sxXX1gKTtcclxuICAgICAgcGxheWVycy5jdXJyZW50ID0gXCJodW1hblwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmVjb3JkIGEgaGl0IG9yIG1pc3NcclxuICAgIGlmIChpZCA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmdyaWRbY29vcmRzWzBdXVtjb29yZHNbMV1dID0gXCJtaXNzXCI7XHJcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICBsZXQgaGl0U2hpcCA9IHRoaXMuc2hpcHNMaXN0W2lkXTtcclxuICAgICAgdGhpcy5ncmlkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9IFwiaGl0XCI7XHJcbiAgICAgIGhpdFNoaXAuaGl0KCk7XHJcbiAgICAgIHRoaXMucmVjZWl2ZWRIaXRzICs9IDE7XHJcbiAgICAgIHRoaXMuY2hlY2tJZkxvc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIm93bmVyOiBcIiArIHRoaXMub3duZXIsIFwiaGl0czogXCIgKyB0aGlzLnJlY2VpdmVkSGl0cyk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHRoaXMuZ3JpZCk7XHJcbiAgICAvL2lmIGl0J3MgQUkncyB0dXJuIG5vdywgc2VuZCBhbiBhdHRhY2tcclxuICAgIGlmIChwbGF5ZXJzLmN1cnJlbnQgPT09IFwiQUlcIikge1xyXG4gICAgICBwbGF5ZXJzLmh1bWFuLmJvYXJkLkFJYXR0YWNrKCk7XHJcbiAgICB9XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmdyaWQpO1xyXG4gIH1cclxuXHJcbiAgcGxheWVyQXR0YWNrKGNvb3Jkcykge1xyXG4gICAgLy8gaWYgaXQncyBub3QgdGhlIHBsYXllcidzIHR1cm4sIGNsaWNraW5nIG9uIGVuZW15IGJvYXJkIHdpbGwgZG8gbm90aGluZ1xyXG4gICAgaWYgKHBsYXllcnMuY3VycmVudCA9PT0gXCJodW1hblwiKSB7XHJcbiAgICAgIGJvYXJkcy5BSS5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBBSWF0dGFjaygpIHtcclxuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KTtcclxuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KTtcclxuICAgIGlmICh0aGlzLmdyaWRbeF1beV0gPT09IFwiaGl0XCIgfHwgdGhpcy5ncmlkW3hdW3ldID09PSBcIm1pc3NcIikge1xyXG4gICAgICByZXR1cm4gdGhpcy5BSWF0dGFjaygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxheWVyQXR0YWNrKGNvb3Jkcykge1xyXG4gICAgLy8gaWYgaXQncyBub3QgdGhlIHBsYXllcidzIHR1cm4sIGNsaWNraW5nIG9uIGVuZW15IGJvYXJkIHdpbGwgZG8gbm90aGluZ1xyXG4gICAgaWYgKHBsYXllcnMuY3VycmVudCA9PT0gXCJodW1hblwiKSB7XHJcbiAgICAgIHBsYXllcnMuQUkuYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tJZkxvc3QoKSB7XHJcbiAgICBjb25zdCBwb3NzaWJsZVNjb3JlID0gR2FtZWJvYXJkLnNoaXBMZW5ndGhzLnJlZHVjZShcclxuICAgICAgKHByZXZpb3VzLCBjdXJyZW50LCBpbml0aWFsKSA9PiBwcmV2aW91cyArIGN1cnJlbnQsXHJcbiAgICAgIDBcclxuICAgICk7XHJcbiAgICBpZiAodGhpcy5yZWNlaXZlZEhpdHMgPj0gcG9zc2libGVTY29yZSkge1xyXG4gICAgICB0aGlzLmxvc3RHYW1lID0gdHJ1ZTtcclxuICAgICAgY29uc29sZS5sb2coXCJnYW1lIGxvc3Q6IFwiICsgdGhpcy5vd25lcik7XHJcbiAgICAgIGdhbWVFbmQodGhpcy5vd25lcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVHcmlkKCkge1xyXG4gICAgbGV0IGdyaWRBcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XHJcbiAgICAgIGdyaWRBcnJheS5wdXNoKFtdKTtcclxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XHJcbiAgICAgICAgZ3JpZEFycmF5W3ldLnB1c2gobnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBncmlkQXJyYXk7XHJcbiAgfVxyXG5cclxuICAvLyBnZW5lcmF0ZSByYW5kb20gc2hpcHMgYW5kIHBsYWNlIHRoZW0gb24gdGhlIGVuZW15IGJvYXJkXHJcbiAgZ2V0UmFuZG9tUGxhY2VtZW50KCkge1xyXG4gICAgZm9yIChsZXQgaSA9IEdhbWVib2FyZC5zaGlwTGVuZ3Rocy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBjb25zdCBzaGlwTCA9IHBhcnNlSW50KEdhbWVib2FyZC5zaGlwTGVuZ3Roc1tpXSk7XHJcbiAgICAgIGxldCBjb29yZHMgPSB0aGlzLmdldE5ld0Nvb3JkcyhzaGlwTCk7XHJcbiAgICAgIHRoaXMucGxhY2VTaGlwKFxyXG4gICAgICAgIHNoaXBMLFxyXG4gICAgICAgIFtjb29yZHNbMF1bMF0sIGNvb3Jkc1swXVsxXV0sXHJcbiAgICAgICAgW2Nvb3Jkc1sxXVswXSwgY29vcmRzWzFdWzFdXVxyXG4gICAgICApO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmdyaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gcnVucyBmdW5jdGlvbnMgZ2VuZXJhdGluZyBhbmQgY2hlY2tpbmcgaWYgbmV3IGNvb3JkcyBhcmUgdmFsaWQsIHJldHVybnMgY29vcmRzIGZvciBvbmUgc2hpcCBvciB1c2VzIHJlY3Vyc2lvbiB0byBzdGFydCBvdmVyIHRoZSBwcm9jZXNzIGlmIGNvb3JkcyBhcmUgaW52YWxpZFxyXG4gIGdldE5ld0Nvb3JkcyhzaGlwTGVuZ3RoKSB7XHJcbiAgICBsZXQgY29vcmRzID0gdGhpcy5yYW5kb21pemVDb29yZHMocGFyc2VJbnQoc2hpcExlbmd0aCkpO1xyXG4gICAgbGV0IGZ1bGxDb29yZHMgPSB0aGlzLmdldEZ1bGxDb29yZHMoY29vcmRzKTtcclxuICAgIGxldCBjb29yZENoZWNrID0gdGhpcy5jaGVja0lmT2NjdXBpZWQoZnVsbENvb3Jkcyk7XHJcbiAgICBpZiAoY29vcmRDaGVjayA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIGNvb3JkcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldE5ld0Nvb3JkcyhwYXJzZUludChzaGlwTGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyB1c2VzIG1hdGgucmFuZG9tIHRvIGdldCByYW5kb20gY29vcmRpbmF0ZXMgb24gdGhlIGJvYXJkLCByYW5kb21pemUgd2hldGVyIHRoZSBuZXcgc2hpcCB3aWxsIGJlIHZlcnRpY2FsIG9yIGhvcml6b250YWwsIGNhbGN1bGF0ZSB0aGF0IGl0IGZpdHMgb24gdGhlIGJvYXJkIGFjY29yZGluZyB0byB0aGUgc2hpcHMgbGVuZ3RoXHJcbiAgcmFuZG9taXplQ29vcmRzKHNoaXBMZW5ndGgpIHtcclxuICAgIGNvbnN0IHN0YXJ0Um93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgY29uc3Qgc3RhcnRDb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBjb25zdCBlbmRSb3cgPSBzdGFydFJvdyArIHBhcnNlSW50KHNoaXBMZW5ndGgpIC0gMTtcclxuICAgIGNvbnN0IGVuZENvbCA9IHN0YXJ0Q29sICsgcGFyc2VJbnQoc2hpcExlbmd0aCkgLSAxO1xyXG5cclxuICAgIGlmIChlbmRSb3cgPCAxMCAmJiBlbmRDb2wgPCAxMCkge1xyXG4gICAgICAvL3JhbmRvbWl6ZSAtIGhvcml6b250YWwgb3IgdmVydGljYWxcclxuICAgICAgbGV0IGNoYW5jZSA9IE1hdGgucmFuZG9tKCkgKiAxO1xyXG4gICAgICBpZiAoY2hhbmNlIDwgMC41KSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgICAgW3N0YXJ0Um93LCBlbmRDb2xdLFxyXG4gICAgICAgIF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgICAgW2VuZFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgIF07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZW5kQ29sIDwgMTApIHtcclxuICAgICAgcmV0dXJuIFtcclxuICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgICBbc3RhcnRSb3csIGVuZENvbF0sXHJcbiAgICAgIF07XHJcbiAgICB9IGVsc2UgaWYgKGVuZFJvdyA8IDEwKSB7XHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgW3N0YXJ0Um93LCBzdGFydENvbF0sXHJcbiAgICAgICAgW2VuZFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmFuZG9taXplQ29vcmRzKHNoaXBMZW5ndGgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZ2V0cyBmdWxsIGNvb3JkaW5hdGVzIG9mIGV2ZXJ5IHNxdWFyZSBpbiBhIHNpbmdsZSBzaGlwXHJcbiAgZ2V0RnVsbENvb3Jkcyhjb29yZHMpIHtcclxuICAgIGxldCByb3dTdGFydCA9IHBhcnNlSW50KGNvb3Jkc1swXVswXSk7XHJcbiAgICBsZXQgY29sU3RhcnQgPSBwYXJzZUludChjb29yZHNbMF1bMV0pO1xyXG4gICAgbGV0IHJvd0VuZCA9IHBhcnNlSW50KGNvb3Jkc1sxXVswXSk7XHJcbiAgICBsZXQgY29sRW5kID0gcGFyc2VJbnQoY29vcmRzWzFdWzFdKTtcclxuXHJcbiAgICBsZXQgZnVsbENvb3JkaW5hdGVzID0gW107XHJcbiAgICBpZiAocm93U3RhcnQgIT09IHJvd0VuZCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gcm93U3RhcnQ7IGkgPD0gcm93RW5kOyBpKyspIHtcclxuICAgICAgICBmdWxsQ29vcmRpbmF0ZXMucHVzaChbaSwgY29sU3RhcnRdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGNvbFN0YXJ0ICE9PSBjb2xFbmQpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IGNvbFN0YXJ0OyBpIDw9IGNvbEVuZDsgaSsrKSB7XHJcbiAgICAgICAgZnVsbENvb3JkaW5hdGVzLnB1c2goW3Jvd1N0YXJ0LCBpXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmdWxsQ29vcmRpbmF0ZXM7XHJcbiAgfVxyXG5cclxuICAvLyBjaGVjayBpZiBhbnkgc3F1YXJlIG9mIHRoZSBuZXcgc2hpcCBpcyBhbHJlYWR5IG9jY3VwaWVkOyBpZiBzbywgc2VuZCBpbmZvIHRvIHByZXZpb3VzIGZ1bmN0aW9ucyB0byBnZW5lcmF0ZSBuZXcgc2hpcCBjb29yZGluYXRlcyBpbnN0ZWFkXHJcbiAgY2hlY2tJZk9jY3VwaWVkKGZ1bGxDb29yZGluYXRlcykge1xyXG4gICAgLy8gY29uc29sZS5sb2coZnVsbENvb3JkaW5hdGVzKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVsbENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBjb29yZCA9IGZ1bGxDb29yZGluYXRlc1tpXTtcclxuICAgICAgaWYgKHRoaXMuZ3JpZFtwYXJzZUludChjb29yZFswXSldW3BhcnNlSW50KGNvb3JkWzFdKV0gIT09IG51bGwpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNoZWNrIC0gb2NjdXBpZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGRyYXdHcmlkKCkge1xyXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcclxuICAgIGNvbnN0IGFycmF5ID0gdGhpcy5ncmlkO1xyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG4gICAgY29uc3QgcHJlcEJvYXJkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdi5wcmVwLWJvYXJkLWRpdlwiKTtcclxuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgYXJyYXkuZm9yRWFjaCgocm93LCByaW5kZXgpID0+IHtcclxuICAgICAgcm93LmZvckVhY2goKGNvbHVtbiwgY2luZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHIke3JpbmRleH1jJHtjaW5kZXh9YCk7XHJcbiAgICAgICAgaWYgKHRoaXMub3duZXIgPT09IFwiaHVtYW5cIikge1xyXG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJvd24tc3F1YXJlXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vd25lciA9PT0gXCJBSVwiKSB7XHJcbiAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImVuZW15LXNxdWFyZVwiKTtcclxuICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckF0dGFjayhbcmluZGV4LCBjaW5kZXhdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vd25lciA9PT0gXCJwcmVwYXJlXCIpIHtcclxuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwicHJlcC1zcXVhcmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgY29sdW1uID09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbHVtbik7XHJcbiAgICAgICAgICBpZiAodGhpcy5vd25lciA9PT0gXCJodW1hblwiKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwib3duLXNoaXBcIik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgbWFya2luZyBvZiBlbmVteSBzaGlwcyBpbiB0aGUgZmluYWwgdmVyc2lvbiBvZiB0aGUgZ2FtZVxyXG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImVuZW15LXNoaXBcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRob3NlIHR3byBpZnMgYXJlIG5lZWRlZCwgcG9zc2libHkgcmVtb3ZlXHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gXCJoaXRcIikge1xyXG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5vd25lciA9PT0gXCJodW1hblwiKSB7XHJcbiAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZChcImdyaWQtb3duXCIpO1xyXG4gICAgICBtYWluLmFwcGVuZENoaWxkKGdyaWQpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm93bmVyID09PSBcIkFJXCIpIHtcclxuICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1lbmVteVwiKTtcclxuICAgICAgbWFpbi5hcHBlbmRDaGlsZChncmlkKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vd25lciA9PT0gXCJwcmVwYXJlXCIpIHtcclxuICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1wcmVwXCIpO1xyXG4gICAgICBwcmVwQm9hcmREaXYuYXBwZW5kQ2hpbGQoZ3JpZCk7XHJcbiAgICB9XHJcbiAgICBncmlkLmNsYXNzTGlzdC5hZGQoXCJncmlkXCIpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lcikge1xyXG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBudWxsO1xyXG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQob3duZXIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UGxheWVycygpIHtcclxuICBwbGF5ZXJzLmh1bWFuID0gbmV3IFBsYXllcihcImh1bWFuXCIpO1xyXG4gIHBsYXllcnMuQUkgPSBuZXcgUGxheWVyKFwiQUlcIik7XHJcbiAgcGxheWVycy5wcmVwYXJlID0gbmV3IFBsYXllcihcInByZXBhcmVcIik7XHJcbn1cclxuXHJcbi8qXHJcbmZ1bmN0aW9uIHBsYXlUZXN0R2FtZSgpIHtcclxuICBjb25zdCBwbGF5ZXJBID0gbmV3IFBsYXllcihcImh1bWFuXCIpO1xyXG4gIGNvbnN0IHBsYXllckIgPSBuZXcgUGxheWVyKFwiQUlcIik7XHJcbiAgYm9hcmRzLmh1bWFuID0gbmV3IEdhbWVib2FyZChcImh1bWFuXCIpO1xyXG4gIGJvYXJkcy5BSSA9IG5ldyBHYW1lYm9hcmQoXCJBSVwiKTtcclxuXHJcbiAgY2xlYW5QbGFjZURvbSgpO1xyXG4gIGJvYXJkcy5odW1hbi5nZXRSYW5kb21QbGFjZW1lbnQoKTtcclxuXHJcbiAgYm9hcmRzLmh1bWFuLmRyYXdHcmlkKCk7XHJcbiAgYm9hcmRzLkFJLmdldFJhbmRvbVBsYWNlbWVudCgpO1xyXG4gIGJvYXJkcy5BSS5kcmF3R3JpZCgpO1xyXG4gIC8vIGNvbnNvbGUubG9nKGJvYXJkQi5ncmlkKTtcclxuICBjdXJyZW50UGxheWVyID0gXCJodW1hblwiO1xyXG59Ki9cclxuXHJcbmV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgUGxheWVyLCBwbGF5ZXJzLCBnZXRQbGF5ZXJzIH07XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Q2luemVsOndnaHRAODAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKiB7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBtYXJnaW46IDBweDtcclxuICBwYWRkaW5nOiAwcHg7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZDFlMjY7XHJcbiAgY29sb3I6ICNkY2E4NWQ7XHJcbn1cclxuXHJcbi5oZWFkZXIge1xyXG4gIG1hcmdpbjogMTJweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4uaGVhZGVyID4gc3BhbiB7XHJcbiAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgZm9udC1mYW1pbHk6ICdDaW56ZWwnLCBzZXJpZjtcclxuICB0ZXh0LXNoYWRvdzogIzNjM2Q1MSAwcHggLTEwcHggNnB4LCAycHggMnB4IDJweCAjNWY1NjFiO1xyXG4gIGJvcmRlci1ib3R0b206ICNkY2E4NWQgMnB4IHNvbGlkO1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxufVxyXG5cclxuLm1haW4ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5wcmVwLWJvYXJkLWRpdiB7XHJcbiAgbWFyZ2luOiA2cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDMwMHB4O1xyXG59XHJcblxyXG4ucHJlcC1zaGlwcy1kaXYge1xyXG4gIG1hcmdpbjogNnB4IDI0cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLnByZXAtc2hpcHMtZGl2ID4gc3BhbiwgLnByZXAtYm9hcmQtZGl2ID4gc3BhbiB7XHJcbiAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcblxyXG4ucHJlcC1pbmZvIHtcclxuICBtYXJnaW4tdG9wOiA2cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4uc3EwLXByZXA6aG92ZXIge1xyXG4gIGN1cnNvcjogZ3JhYjtcclxufVxyXG5cclxuLmdyaWQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI4cHgpO1xyXG4gIGNvbHVtbi1nYXA6IDBweDtcclxuICByb3ctZ2FwOiAwcHg7XHJcbiAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgbWFyZ2luOiAwIDEycHg7XHJcbn1cclxuXHJcbi5vd24tc3F1YXJlLCAuZW5lbXktc3F1YXJlLCAucHJlcC1zcXVhcmUge1xyXG4gIHdpZHRoOiAyOHB4O1xyXG4gIGhlaWdodDogMjhweDtcclxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xyXG4gIG1hcmdpbjogMHB4O1xyXG59XHJcblxyXG4uZW5lbXktc3F1YXJlOmhvdmVyIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5lbmVteS1zcXVhcmUuaGl0IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZ3JlZW47XHJcbn1cclxuXHJcbi5lbmVteS1zcXVhcmUubWlzcyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcclxufVxyXG5cclxuLm93bi1zcXVhcmUubWlzcyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcclxufVxyXG5cclxuLm93bi1zcXVhcmUuaGl0IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCA5OCwgMjA1KTtcclxufVxyXG5cclxuLm93bi1zcXVhcmUuc2hpcCwgLnByZXAtc3F1YXJlLnNoaXB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEyNTNkNjtcclxufVxyXG5cclxuLnNoaXAtZGl2IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1hcmdpbjogNHB4O1xyXG59XHJcblxyXG4uc2hpcC1vbi1ib2FyZCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIG1hcmdpbjogMHB4O1xyXG59XHJcblxyXG4uc2hpcHNxIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYgOSAxMzUpO1xyXG59XHJcblxyXG4uZmxleC10b2dnbGUge1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5zdGFydC1nYW1lLCAuYnV0dG9uLW1vZGFsIHtcclxuICBtYXJnaW46IDEwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzExMzY0YTtcclxuICBjb2xvcjogI2RjYTg1ZDtcclxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xyXG4gIHBhZGRpbmc6IDZweCAxOHB4O1xyXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcclxufVxyXG5cclxuLnN0YXJ0LWdhbWU6aG92ZXIsIC5idXR0b246aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzRlNjY7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uc3RhcnQtZ2FtZTphY3RpdmUsIC5idXR0b246YWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYgOSAxMzUpO1xyXG59XHJcblxyXG4ub3duLXNoaXAge1xyXG4gIGJhY2tncm91bmQ6ICMxMjUzZDY7XHJcbn1cclxuXHJcbi5ncmlkLWVuZW15IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTgsIDM5LCAxMDQpO1xyXG59XHJcblxyXG4uZ3JpZC1vd24sIC5ncmlkLXByZXAge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzRlNjY7XHJcbn1cclxuXHJcbi5ncmlkLXBsYWNlLW93biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcclxufVxyXG5cclxuLmVuZW15LXNoaXAge1xyXG4gIGJhY2tncm91bmQ6IHJnYigxNzUsIDEzLCA0MCk7XHJcbn1cclxuXHJcbi5lcnJvci1tc2cge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1OCwgMzksIDEwNCk7XHJcbiAgbWFyZ2luOiA4cHggMHB4O1xyXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XHJcbiAgcGFkZGluZzogNnB4O1xyXG59XHJcblxyXG4uaGlkZGVuIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4ubW9kYWwge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB6LWluZGV4OiAxO1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSxzQkFBc0I7RUFDdEIsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsNEJBQTRCO0VBQzVCLHVEQUF1RDtFQUN2RCxnQ0FBZ0M7RUFDaEMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUNBQXVDO0VBQ3ZDLGVBQWU7RUFDZixZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2QseUJBQXlCO0VBQ3pCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsZUFBZTtFQUNmLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGFBQWE7QUFDZlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1DaW56ZWw6d2dodEA4MDAmZGlzcGxheT1zd2FwJyk7XFxyXFxuXFxyXFxuKiB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgbWFyZ2luOiAwcHg7XFxyXFxuICBwYWRkaW5nOiAwcHg7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBkMWUyNjtcXHJcXG4gIGNvbG9yOiAjZGNhODVkO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyIHtcXHJcXG4gIG1hcmdpbjogMTJweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciA+IHNwYW4ge1xcclxcbiAgZm9udC1zaXplOiAyLjVyZW07XFxyXFxuICBmb250LWZhbWlseTogJ0NpbnplbCcsIHNlcmlmO1xcclxcbiAgdGV4dC1zaGFkb3c6ICMzYzNkNTEgMHB4IC0xMHB4IDZweCwgMnB4IDJweCAycHggIzVmNTYxYjtcXHJcXG4gIGJvcmRlci1ib3R0b206ICNkY2E4NWQgMnB4IHNvbGlkO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbiB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5wcmVwLWJvYXJkLWRpdiB7XFxyXFxuICBtYXJnaW46IDZweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAzMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnByZXAtc2hpcHMtZGl2IHtcXHJcXG4gIG1hcmdpbjogNnB4IDI0cHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHdpZHRoOiAzMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnByZXAtc2hpcHMtZGl2ID4gc3BhbiwgLnByZXAtYm9hcmQtZGl2ID4gc3BhbiB7XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLnByZXAtaW5mbyB7XFxyXFxuICBtYXJnaW4tdG9wOiA2cHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLnNxMC1wcmVwOmhvdmVyIHtcXHJcXG4gIGN1cnNvcjogZ3JhYjtcXHJcXG59XFxyXFxuXFxyXFxuLmdyaWQge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyOHB4KTtcXHJcXG4gIGNvbHVtbi1nYXA6IDBweDtcXHJcXG4gIHJvdy1nYXA6IDBweDtcXHJcXG4gIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxyXFxuICBmb250LXNpemU6IDEycHg7XFxyXFxuICBtYXJnaW46IDAgMTJweDtcXHJcXG59XFxyXFxuXFxyXFxuLm93bi1zcXVhcmUsIC5lbmVteS1zcXVhcmUsIC5wcmVwLXNxdWFyZSB7XFxyXFxuICB3aWR0aDogMjhweDtcXHJcXG4gIGhlaWdodDogMjhweDtcXHJcXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XFxyXFxuICBtYXJnaW46IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmVuZW15LXNxdWFyZTpob3ZlciB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5lbmVteS1zcXVhcmUuaGl0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtncmVlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmVuZW15LXNxdWFyZS5taXNzIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxyXFxufVxcclxcblxcclxcbi5vd24tc3F1YXJlLm1pc3Mge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXHJcXG59XFxyXFxuXFxyXFxuLm93bi1zcXVhcmUuaGl0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDk4LCAyMDUpO1xcclxcbn1cXHJcXG5cXHJcXG4ub3duLXNxdWFyZS5zaGlwLCAucHJlcC1zcXVhcmUuc2hpcHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMjUzZDY7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWRpdiB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgbWFyZ2luOiA0cHg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLW9uLWJvYXJkIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIG1hcmdpbjogMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcHNxIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1NiA5IDEzNSk7XFxyXFxufVxcclxcblxcclxcbi5mbGV4LXRvZ2dsZSB7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhcnQtZ2FtZSwgLmJ1dHRvbi1tb2RhbCB7XFxyXFxuICBtYXJnaW46IDEwcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTEzNjRhO1xcclxcbiAgY29sb3I6ICNkY2E4NWQ7XFxyXFxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xcclxcbiAgcGFkZGluZzogNnB4IDE4cHg7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXJ0LWdhbWU6aG92ZXIsIC5idXR0b246aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXJ0LWdhbWU6YWN0aXZlLCAuYnV0dG9uOmFjdGl2ZSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYgOSAxMzUpO1xcclxcbn1cXHJcXG5cXHJcXG4ub3duLXNoaXAge1xcclxcbiAgYmFja2dyb3VuZDogIzEyNTNkNjtcXHJcXG59XFxyXFxuXFxyXFxuLmdyaWQtZW5lbXkge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU4LCAzOSwgMTA0KTtcXHJcXG59XFxyXFxuXFxyXFxuLmdyaWQtb3duLCAuZ3JpZC1wcmVwIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzRlNjY7XFxyXFxufVxcclxcblxcclxcbi5ncmlkLXBsYWNlLW93biB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjM0ZTY2O1xcclxcbn1cXHJcXG5cXHJcXG4uZW5lbXktc2hpcCB7XFxyXFxuICBiYWNrZ3JvdW5kOiByZ2IoMTc1LCAxMywgNDApO1xcclxcbn1cXHJcXG5cXHJcXG4uZXJyb3ItbXNnIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1OCwgMzksIDEwNCk7XFxyXFxuICBtYXJnaW46IDhweCAwcHg7XFxyXFxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xcclxcbiAgcGFkZGluZzogNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaGlkZGVuIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbCB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB6LWluZGV4OiAxO1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IGNyZWF0ZURvbSwgcHJlcGFyZVNoaXBzIH0gZnJvbSBcIi4vZG9tLmpzXCI7XHJcbmltcG9ydCB7IGdldFBsYXllcnMgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XHJcbmltcG9ydCBjc3MgZnJvbSBcIi4vc3R5bGUuY3NzXCI7XHJcblxyXG4vL3BsYXlUZXN0R2FtZSgpO1xyXG5cclxuY3JlYXRlRG9tKCk7XHJcbmdldFBsYXllcnMoKTtcclxucHJlcGFyZVNoaXBzKCk7XHJcbiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJwbGF5ZXJzIiwiZ2V0UGxheWVycyIsImNyZWF0ZURvbSIsImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJoZWFkZXIiLCJjcmVhdGVFbGVtZW50IiwidGl0bGUiLCJtYWluIiwiZm9vdGVyIiwiY2xhc3NMaXN0IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImFsbG93RHJvcCIsImV2IiwicHJldmVudERlZmF1bHQiLCJkcmFnIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInRhcmdldCIsImlkIiwiZHJvcCIsImRhdGEiLCJnZXREYXRhIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb25zb2xlIiwibG9nIiwiZHJhZ0VuZCIsImFyZUFsbFNoaXBzUGxhY2VkIiwicHJlcGFyZVNoaXBzIiwicHJlcEJvYXJkRGl2IiwicHJlcEJvYXJkVGl0bGUiLCJwcmVwU2hpcHNEaXYiLCJwcmVwU2hpcHNUaXRsZSIsInByZXBTaGlwc0xpc3QiLCJwcmVwSW5mb0RpdiIsInByZXBJbmZvUCIsInN0YXJ0R2FtZSIsInByZXBJbmZvUDIiLCJlcnJvck1zZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjaGVja1BsYWNlbWVudHMiLCJzaGlwTGVuZ3RocyIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJmdWxsU2hpcCIsImkiLCJzaGlwU3EiLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGUiLCJwcmVwYXJlIiwiYm9hcmQiLCJkcmF3R3JpZCIsInByZXBTcXVhcmUiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3F1YXJlIiwiY2hpbGROb2RlcyIsImxlbmd0aCIsInJlbW92ZSIsInBsYWNlT25Cb2FyZCIsInBsYWNlU2hpcHMiLCJodW1hbiIsIkFJIiwiZ2V0UmFuZG9tUGxhY2VtZW50IiwiY3VycmVudCIsInBsYWNlbWVudEVycm9yIiwiZSIsInNoaXAiLCJjb29yZFN0YXJ0IiwicGFyZW50Tm9kZSIsInNwbGl0Iiwic3RhcnRSb3ciLCJwYXJzZUludCIsInN0YXJ0Q29sdW1uIiwiZW5kUm93IiwiZW5kQ29sdW1uIiwiZnVsbENvb3JkcyIsImNvbnRhaW5zIiwiZ2V0RnVsbENvb3JkcyIsImNoZWNrSWZPY2N1cGllZCIsInBsYWNlU2hpcCIsImNsZWFuTWFpbkRvbSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImdhbWVFbmQiLCJwbGF5ZXIiLCJtb2RhbCIsIndvbk9yTG9zdCIsImJ1dHRvbiIsInBsYXlBZ2FpbiIsIlNoaXAiLCJjb25zdHJ1Y3RvciIsImhpdHMiLCJkZXN0cm95ZWQiLCJoaXQiLCJpc1N1bmsiLCJvd25lciIsImdyaWQiLCJjcmVhdGVHcmlkIiwic2hpcHNMaXN0IiwicmVjZWl2ZWRIaXRzIiwibG9zdEdhbWUiLCJjb29yZHNTdGFydCIsImNvb3Jkc0VuZCIsInBsYWNlZFNoaXAiLCJwdXNoIiwicmVjZWl2ZUF0dGFjayIsImNvb3JkcyIsImhpdFNoaXAiLCJjaGVja0lmTG9zdCIsIkFJYXR0YWNrIiwicGxheWVyQXR0YWNrIiwiYm9hcmRzIiwieCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInkiLCJwb3NzaWJsZVNjb3JlIiwicmVkdWNlIiwicHJldmlvdXMiLCJpbml0aWFsIiwiZ3JpZEFycmF5Iiwic2hpcEwiLCJnZXROZXdDb29yZHMiLCJzaGlwTGVuZ3RoIiwicmFuZG9taXplQ29vcmRzIiwiY29vcmRDaGVjayIsInN0YXJ0Q29sIiwiZW5kQ29sIiwiY2hhbmNlIiwicm93U3RhcnQiLCJjb2xTdGFydCIsInJvd0VuZCIsImNvbEVuZCIsImZ1bGxDb29yZGluYXRlcyIsImNvb3JkIiwiYXJyYXkiLCJyb3ciLCJyaW5kZXgiLCJjb2x1bW4iLCJjaW5kZXgiLCJQbGF5ZXIiLCJzdGF0dXMiLCJjc3MiXSwic291cmNlUm9vdCI6IiJ9