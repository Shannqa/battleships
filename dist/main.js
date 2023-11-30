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
    return placementError();
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

// reset the human board due to placement error
function placementError() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (_game_js__WEBPACK_IMPORTED_MODULE_0__.players.human.board.grid[i][j] !== null) {
        _game_js__WEBPACK_IMPORTED_MODULE_0__.players.human.board.grid[i][j] = null;
      }
    }
  }
}

// add ships to the players gameboard
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
  button.classList.add("button-modal");
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

.start-game:hover, .button-modal:hover {
  background-color: #234e66;
  cursor: pointer;
}

.start-game:active, .button-modal:active {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgba(13, 30, 38, 0.7);
  font-size: 1.5rem;
  font-weight: bold;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,4BAA4B;EAC5B,uDAAuD;EACvD,gCAAgC;EAChC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,eAAe;EACf,YAAY;EACZ,sBAAsB;EACtB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,WAAW;AACb;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,yBAAyB;EACzB,cAAc;EACd,yBAAyB;EACzB,iBAAiB;EACjB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,kCAAkC;EAClC,eAAe;EACf,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,aAAa;EACb,uCAAuC;EACvC,iBAAiB;EACjB,iBAAiB;AACnB","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@800&display=swap');\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  margin: 0px;\r\n  padding: 0px;\r\n}\r\n\r\nbody {\r\n  background-color: #0d1e26;\r\n  color: #dca85d;\r\n}\r\n\r\n.header {\r\n  margin: 12px;\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.header > span {\r\n  font-size: 2.5rem;\r\n  font-family: 'Cinzel', serif;\r\n  text-shadow: #3c3d51 0px -10px 6px, 2px 2px 2px #5f561b;\r\n  border-bottom: #dca85d 2px solid;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.main {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.prep-board-div {\r\n  margin: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 300px;\r\n}\r\n\r\n.prep-ships-div {\r\n  margin: 6px 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 300px;\r\n}\r\n\r\n.prep-ships-div > span, .prep-board-div > span {\r\n  font-size: 1.5rem;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.prep-info {\r\n  margin-top: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.sq0-prep:hover {\r\n  cursor: grab;\r\n}\r\n\r\n.grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 28px);\r\n  column-gap: 0px;\r\n  row-gap: 0px;\r\n  justify-items: stretch;\r\n  font-size: 12px;\r\n  margin: 0 12px;\r\n}\r\n\r\n.own-square, .enemy-square, .prep-square {\r\n  width: 28px;\r\n  height: 28px;\r\n  border: 1px #dca85d solid;\r\n  margin: 0px;\r\n}\r\n\r\n.enemy-square:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.enemy-square.hit {\r\n  background-color: darkgreen;\r\n}\r\n\r\n.enemy-square.miss {\r\n  background-color: grey;\r\n}\r\n\r\n.own-square.miss {\r\n  background-color: grey;\r\n}\r\n\r\n.own-square.hit {\r\n  background-color: rgb(255, 98, 205);\r\n}\r\n\r\n.own-square.ship, .prep-square.ship{\r\n  background-color: #1253d6;\r\n}\r\n\r\n.ship-div {\r\n  display: flex;\r\n  margin: 4px;\r\n}\r\n\r\n.ship-on-board {\r\n  position: absolute;\r\n  margin: 0px;\r\n}\r\n\r\n.shipsq {\r\n  background-color: rgb(56 9 135);\r\n}\r\n\r\n.flex-toggle {\r\n  flex-direction: column;\r\n}\r\n\r\n.start-game, .button-modal {\r\n  margin: 10px;\r\n  background-color: #11364a;\r\n  color: #dca85d;\r\n  border: 1px #dca85d solid;\r\n  padding: 6px 18px;\r\n  font-size: 1.2rem;\r\n  align-self: center;\r\n}\r\n\r\n.start-game:hover, .button-modal:hover {\r\n  background-color: #234e66;\r\n  cursor: pointer;\r\n}\r\n\r\n.start-game:active, .button-modal:active {\r\n  background-color: rgb(56 9 135);\r\n}\r\n\r\n.own-ship {\r\n  background: #1253d6;\r\n}\r\n\r\n.grid-enemy {\r\n  background-color: rgb(58, 39, 104);\r\n}\r\n\r\n.grid-own, .grid-prep {\r\n  background-color: #234e66;\r\n}\r\n\r\n.grid-place-own {\r\n  background-color: #234e66;\r\n}\r\n\r\n.enemy-ship {\r\n  background: rgb(175, 13, 40);\r\n}\r\n\r\n.error-msg {\r\n  background-color: rgb(58, 39, 104);\r\n  margin: 8px 0px;\r\n  border: 1px #dca85d solid;\r\n  padding: 6px;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n\r\n.modal {\r\n  position: absolute;\r\n  z-index: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  padding: 20px;\r\n  background-color: rgba(13, 30, 38, 0.7);\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxnRkFBZ0YsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxL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QTtBQUNBOzs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7QUNBbUQ7QUFDWjtBQUNUOztBQUU5Qjs7QUFFQS9JLGtEQUFTLENBQUMsQ0FBQztBQUNYRCxvREFBVSxDQUFDLENBQUM7QUFDWjhCLHFEQUFZLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZWJvYXJkLCBwbGF5ZXJzLCBnZXRQbGF5ZXJzIH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlRG9tKCkge1xyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJcIik7XHJcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBzXCI7XHJcbiAgbWFpbi5jbGFzc0xpc3QuYWRkKFwibWFpblwiKTtcclxuXHJcbiAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICBib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcclxuICBib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XHJcbn1cclxuXHJcbi8qIERyYWcgYW5kIGRyb3AgZnVuY3Rpb25zICovXHJcbmZ1bmN0aW9uIGFsbG93RHJvcChldikge1xyXG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWcoZXYpIHtcclxuICBldi5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgZXYudGFyZ2V0LmlkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJvcChldikge1xyXG4gIC8vIGNhdGNoIGFuIGVycm9yIGhhcHBlbmluZyBpZiB0aGUgdXNlciB0cmllcyB0byBkcmFnIGFuZCBkcm9wIHRoZSBzaGlwIGluIGEgd3JvbmcgcGxhY2UsIGUuZy4gaW4gdGhlIG1pZGRsZSBvZiBtdWx0aXBsZSBzcXVhcmVzXHJcbiAgdHJ5IHtcclxuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgZGF0YSA9IGV2LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEpLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW9uLWJvYXJkXCIpO1xyXG4gICAgZXYudGFyZ2V0LmFwcGVuZENoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEpKTtcclxuICB9IGNhdGNoIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgLSBkcmFnJmRyb3BcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFnRW5kKCkge1xyXG4gIGFyZUFsbFNoaXBzUGxhY2VkKCk7XHJcbn1cclxuXHJcbi8qIFByZXBhcmF0aW9uIHN0YWdlIC0gcGxheWVyIHBsYWNlcyB0aGVpciBzaGlwcyBvbiB0aGVpciBib2FyZCAqL1xyXG5mdW5jdGlvbiBwcmVwYXJlU2hpcHMoKSB7XHJcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcclxuICBjb25zdCBwcmVwQm9hcmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IHByZXBCb2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgY29uc3QgcHJlcFNoaXBzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBwcmVwU2hpcHNUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIGNvbnN0IHByZXBTaGlwc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IHByZXBJbmZvRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBwcmVwSW5mb1AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBjb25zdCBzdGFydEdhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGNvbnN0IHByZXBJbmZvUDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBjb25zdCBlcnJvck1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gIHByZXBCb2FyZERpdi5jbGFzc0xpc3QuYWRkKFwicHJlcC1ib2FyZC1kaXZcIik7XHJcbiAgcHJlcFNoaXBzRGl2LmNsYXNzTGlzdC5hZGQoXCJwcmVwLXNoaXBzLWRpdlwiKTtcclxuICBwcmVwU2hpcHNMaXN0LmNsYXNzTGlzdC5hZGQoXCJwcmVwLXNoaXBzLWxpc3RcIik7XHJcbiAgcHJlcEluZm9EaXYuY2xhc3NMaXN0LmFkZChcInByZXAtaW5mb1wiKTtcclxuICBzdGFydEdhbWUuY2xhc3NMaXN0LmFkZChcInN0YXJ0LWdhbWVcIik7XHJcbiAgc3RhcnRHYW1lLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgcHJlcEluZm9QMi5jbGFzc0xpc3QuYWRkKFwicHJlcC1pbmZvLXAyXCIpO1xyXG4gIHByZXBJbmZvUDIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICBlcnJvck1zZy5jbGFzc0xpc3QuYWRkKFwiZXJyb3ItbXNnXCIpO1xyXG4gIGVycm9yTXNnLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcblxyXG4gIGVycm9yTXNnLnRleHRDb250ZW50ID1cclxuICAgIFwiU29tZSBzaGlwcyBkb24ndCBmaXQgb24gdGhlIGJvYXJkIG9yIG92ZXJsYXAuIFVzZSBkcmFnICYgZHJvcCB0byBtb3ZlIHRoZW0gb3IgZG91YmxlIGNsaWNrIHRvIHJvdGF0ZSB0aGVtIGJlZm9yZSB5b3UgY2FuIGJlZ2luIHRoZSBnYW1lLlwiO1xyXG4gIHN0YXJ0R2FtZS50ZXh0Q29udGVudCA9IFwiU3RhcnQgZ2FtZVwiO1xyXG4gIHN0YXJ0R2FtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hlY2tQbGFjZW1lbnRzKTtcclxuICBwcmVwQm9hcmRUaXRsZS50ZXh0Q29udGVudCA9IFwiWW91ciBib2FyZFwiO1xyXG4gIHByZXBTaGlwc1RpdGxlLnRleHRDb250ZW50ID0gXCJQbGFjZSB5b3VyIHNoaXBzXCI7XHJcbiAgcHJlcEluZm9QLnRleHRDb250ZW50ID1cclxuICAgIFwiRHJhZyAmIGRyb3AgdGhlIHNoaXBzIG9uIHRoZSBib2FyZC4gRG91YmxlLWNsaWNrIGEgc2hpcCB0byByb3RhdGUgaXQuXCI7XHJcbiAgcHJlcEluZm9QMi50ZXh0Q29udGVudCA9XHJcbiAgICBcIk9uY2UgeW91J3JlIGhhcHB5IHdpdGggdGhlIHBsYWNlbWVudCBvZiB5b3VyIHNoaXBzLCBjbGljayB0aGUgc3RhcnQgYnV0dG9uIHRvIGJlZ2luIHRoZSBnYW1lIVwiO1xyXG4gIC8qIExpc3Qgb2Ygc2hpcHMgdG8gYmUgcGxhY2VkICovXHJcbiAgR2FtZWJvYXJkLnNoaXBMZW5ndGhzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCBmdWxsU2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBmdWxsU2hpcC5jbGFzc0xpc3QuYWRkKFwic2hpcC1kaXZcIik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW07IGkrKykge1xyXG4gICAgICBjb25zdCBzaGlwU3EgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgIC8vIGZpcnN0IHNxdWFyZSBvZiBhIHNoaXBcclxuICAgICAgICBzaGlwU3EuY2xhc3NMaXN0LmFkZChcInNxMC1wcmVwXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIHNoaXBTcS5jbGFzc0xpc3QuYWRkKFwicHJlcC1zcXVhcmVcIik7XHJcbiAgICAgIHNoaXBTcS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgZnVsbFNoaXAuYXBwZW5kQ2hpbGQoc2hpcFNxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBEcmFnIGFuZCBkcm9wICovXHJcbiAgICBmdWxsU2hpcC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcHJlcC0ke2luZGV4fWApO1xyXG4gICAgZnVsbFNoaXAuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcclxuICAgIGZ1bGxTaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZyk7XHJcbiAgICBmdWxsU2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnRW5kKTtcclxuICAgIGZ1bGxTaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGZ1bGxTaGlwLmNsYXNzTGlzdC50b2dnbGUoXCJmbGV4LXRvZ2dsZVwiKTtcclxuICAgIH0pO1xyXG4gICAgcHJlcFNoaXBzTGlzdC5hcHBlbmRDaGlsZChmdWxsU2hpcCk7XHJcbiAgfSk7XHJcblxyXG4gIHByZXBCb2FyZERpdi5hcHBlbmRDaGlsZChwcmVwQm9hcmRUaXRsZSk7XHJcbiAgcHJlcFNoaXBzRGl2LmFwcGVuZENoaWxkKHByZXBTaGlwc1RpdGxlKTtcclxuICBwcmVwU2hpcHNEaXYuYXBwZW5kQ2hpbGQocHJlcFNoaXBzTGlzdCk7XHJcbiAgcHJlcEluZm9EaXYuYXBwZW5kQ2hpbGQocHJlcEluZm9QKTtcclxuICBwcmVwSW5mb0Rpdi5hcHBlbmRDaGlsZChzdGFydEdhbWUpO1xyXG4gIHByZXBJbmZvRGl2LmFwcGVuZENoaWxkKHByZXBJbmZvUDIpO1xyXG4gIHByZXBTaGlwc0Rpdi5hcHBlbmRDaGlsZChwcmVwSW5mb0Rpdik7XHJcbiAgcHJlcFNoaXBzRGl2LmFwcGVuZENoaWxkKGVycm9yTXNnKTtcclxuICBtYWluLmFwcGVuZENoaWxkKHByZXBCb2FyZERpdik7XHJcbiAgbWFpbi5hcHBlbmRDaGlsZChwcmVwU2hpcHNEaXYpO1xyXG5cclxuICBwbGF5ZXJzLnByZXBhcmUuYm9hcmQuZHJhd0dyaWQoKTtcclxuICBjb25zdCBwcmVwU3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVwLXNxdWFyZVwiKTtcclxuICBwcmVwU3F1YXJlLmZvckVhY2goKHNxdWFyZSkgPT4ge1xyXG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyb3ApO1xyXG4gICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBhbGxvd0Ryb3ApO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBjaGVjayBpZiBhbGwgc2hpcHMgd2VyZSBwbGFjZWQgb24gdGhlIHBsYXllcidzIGJvYXJkXHJcbmZ1bmN0aW9uIGFyZUFsbFNoaXBzUGxhY2VkKCkge1xyXG4gIGNvbnN0IHByZXBTaGlwc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZXAtc2hpcHMtbGlzdFwiKTtcclxuXHJcbiAgaWYgKHByZXBTaGlwc0xpc3QuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcclxuICAgIGNvbnN0IHN0YXJ0R2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtZ2FtZVwiKTtcclxuICAgIGNvbnN0IHByZXBJbmZvUDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZXAtaW5mby1wMlwiKTtcclxuICAgIHN0YXJ0R2FtZS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgcHJlcEluZm9QMi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gY2hlY2sgaWYgYWxsIHNoaXBzIGFyZSBwbGFjZWQgY29ycmVjdGx5LCBpZiBzbywgc3RhcnQgdGhlIGdhbWVcclxuZnVuY3Rpb24gY2hlY2tQbGFjZW1lbnRzKCkge1xyXG4gIGNvbnN0IHBsYWNlT25Cb2FyZCA9IHBsYWNlU2hpcHMocGxheWVycy5odW1hbi5ib2FyZCk7XHJcblxyXG4gIGlmIChwbGFjZU9uQm9hcmQgPT09IGZhbHNlKSB7XHJcbiAgICBjb25zdCBlcnJvck1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3ItbXNnXCIpO1xyXG4gICAgZXJyb3JNc2cuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIHJldHVybiBwbGFjZW1lbnRFcnJvcigpO1xyXG4gIH1cclxuICBjb25zdCBwcmVwQm9hcmREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZXAtYm9hcmQtZGl2XCIpO1xyXG4gIGNvbnN0IHByZXBTaGlwc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlcC1zaGlwcy1kaXZcIik7XHJcbiAgcHJlcEJvYXJkRGl2LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgcHJlcFNoaXBzRGl2LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcblxyXG4gIHBsYXllcnMuaHVtYW4uYm9hcmQuZHJhd0dyaWQoKTtcclxuICBwbGF5ZXJzLkFJLmJvYXJkLmdldFJhbmRvbVBsYWNlbWVudCgpO1xyXG4gIHBsYXllcnMuQUkuYm9hcmQuZHJhd0dyaWQoKTtcclxuICAvLyBjb25zb2xlLmxvZyhib2FyZEIuZ3JpZCk7XHJcbiAgcGxheWVycy5jdXJyZW50ID0gXCJodW1hblwiO1xyXG59XHJcblxyXG4vLyByZXNldCB0aGUgaHVtYW4gYm9hcmQgZHVlIHRvIHBsYWNlbWVudCBlcnJvclxyXG5mdW5jdGlvbiBwbGFjZW1lbnRFcnJvcigpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xyXG4gICAgICBpZiAocGxheWVycy5odW1hbi5ib2FyZC5ncmlkW2ldW2pdICE9PSBudWxsKSB7XHJcbiAgICAgICAgcGxheWVycy5odW1hbi5ib2FyZC5ncmlkW2ldW2pdID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gYWRkIHNoaXBzIHRvIHRoZSBwbGF5ZXJzIGdhbWVib2FyZFxyXG5mdW5jdGlvbiBwbGFjZVNoaXBzKGJvYXJkKSB7XHJcbiAgLy8gZ2V0IHBsYWNlZCBzaGlwcyBjb29yZHNcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWVib2FyZC5zaGlwTGVuZ3Rocy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcmVwLSR7aX1gKTtcclxuICAgIGNvbnN0IGNvb3JkU3RhcnQgPSBzaGlwLnBhcmVudE5vZGUuaWQ7XHJcbiAgICBjb29yZFN0YXJ0LnNwbGl0KFwiXCIpO1xyXG4gICAgbGV0IHN0YXJ0Um93ID0gcGFyc2VJbnQoY29vcmRTdGFydFsxXSk7XHJcbiAgICBsZXQgc3RhcnRDb2x1bW4gPSBwYXJzZUludChjb29yZFN0YXJ0WzNdKTtcclxuICAgIGxldCBsZW5ndGggPSBwYXJzZUludChHYW1lYm9hcmQuc2hpcExlbmd0aHNbaV0pO1xyXG4gICAgbGV0IGVuZFJvdyA9IHN0YXJ0Um93ICsgbGVuZ3RoIC0gMTtcclxuICAgIGxldCBlbmRDb2x1bW4gPSBzdGFydENvbHVtbiArIGxlbmd0aCAtIDE7XHJcbiAgICBsZXQgZnVsbENvb3JkcztcclxuICAgIGlmIChzaGlwLmNsYXNzTGlzdC5jb250YWlucyhcImZsZXgtdG9nZ2xlXCIpKSB7XHJcbiAgICAgIC8vc2hpcCBpcyB2ZXJ0aWNhbFxyXG4gICAgICBpZiAoZW5kUm93ID4gOSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBmdWxsQ29vcmRzID0gYm9hcmQuZ2V0RnVsbENvb3JkcyhbXHJcbiAgICAgICAgW3N0YXJ0Um93LCBzdGFydENvbHVtbl0sXHJcbiAgICAgICAgW2VuZFJvdywgc3RhcnRDb2x1bW5dLFxyXG4gICAgICBdKTtcclxuICAgICAgaWYgKGJvYXJkLmNoZWNrSWZPY2N1cGllZChmdWxsQ29vcmRzKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGJvYXJkLnBsYWNlU2hpcChsZW5ndGgsIFtzdGFydFJvdywgc3RhcnRDb2x1bW5dLCBbZW5kUm93LCBzdGFydENvbHVtbl0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hpcCBpcyBob3Jpem9udGFsXHJcbiAgICAgIGlmIChlbmRDb2x1bW4gPiA5KSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGZ1bGxDb29yZHMgPSBib2FyZC5nZXRGdWxsQ29vcmRzKFtcclxuICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sdW1uXSxcclxuICAgICAgICBbc3RhcnRSb3csIGVuZENvbHVtbl0sXHJcbiAgICAgIF0pO1xyXG4gICAgICBpZiAoYm9hcmQuY2hlY2tJZk9jY3VwaWVkKGZ1bGxDb29yZHMpID09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgYm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgW3N0YXJ0Um93LCBzdGFydENvbHVtbl0sIFtzdGFydFJvdywgZW5kQ29sdW1uXSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbi8qIENsZWFuIGFsbCBjaGlsZCBub2RlcyBvZiAubWFpbiAqL1xyXG5mdW5jdGlvbiBjbGVhbk1haW5Eb20oKSB7XHJcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcclxuICB3aGlsZSAobWFpbi5maXJzdENoaWxkKSB7XHJcbiAgICBtYWluLnJlbW92ZUNoaWxkKG1haW4uZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKiBUaGUgZ2FtZSBlbmRzLCBzdGFydCBvdmVyICovXHJcbmZ1bmN0aW9uIGdhbWVFbmQocGxheWVyKSB7XHJcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcclxuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29uc3Qgd29uT3JMb3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHJcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsXCIpO1xyXG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uLW1vZGFsXCIpO1xyXG4gIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUGxheSBhZ2FpblwiO1xyXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheUFnYWluKTtcclxuICBwbGF5ZXJzLmN1cnJlbnQgPSBudWxsO1xyXG4gIGlmIChwbGF5ZXIgPT09IFwiQUlcIikge1xyXG4gICAgd29uT3JMb3N0LnRleHRDb250ZW50ID0gXCJZb3Ugd29uIVwiO1xyXG4gIH0gZWxzZSBpZiAocGxheWVyID09PSBcImh1bWFuXCIpIHtcclxuICAgIHdvbk9yTG9zdC50ZXh0Q29udGVudCA9IFwiWW91IGxvc3RcIjtcclxuICB9XHJcblxyXG4gIG1vZGFsLmFwcGVuZENoaWxkKHdvbk9yTG9zdCk7XHJcbiAgbW9kYWwuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICBtYWluLmFwcGVuZENoaWxkKG1vZGFsKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxheUFnYWluKCkge1xyXG4gIGdldFBsYXllcnMoKTtcclxuICBjbGVhbk1haW5Eb20oKTtcclxuICBwcmVwYXJlU2hpcHMoKTtcclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlRG9tLCBwcmVwYXJlU2hpcHMsIHBsYWNlU2hpcHMsIGdhbWVFbmQgfTtcclxuIiwiaW1wb3J0IHsgZ2FtZUVuZCB9IGZyb20gXCIuL2RvbS5qc1wiO1xyXG5cclxuY29uc3QgcGxheWVycyA9IHtcclxuICBjdXJyZW50OiBudWxsLFxyXG4gIGh1bWFuOiBudWxsLFxyXG4gIEFJOiBudWxsLFxyXG4gIHByZXBhcmU6IG51bGwsXHJcbn07XHJcblxyXG5jbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgsIGlkKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMuaGl0cyA9IDA7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5oaXRzICs9IDE7XHJcbiAgICB0aGlzLmlzU3VuaygpO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lcikge1xyXG4gICAgdGhpcy5ncmlkID0gdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XHJcbiAgICB0aGlzLnNoaXBzTGlzdCA9IFtdO1xyXG4gICAgdGhpcy5yZWNlaXZlZEhpdHMgPSAwO1xyXG4gICAgdGhpcy5sb3N0R2FtZSA9IGZhbHNlO1xyXG4gIH1cclxuICBzdGF0aWMgc2hpcExlbmd0aHMgPSBbMiwgMywgNCwgNV07XHJcblxyXG4gIHBsYWNlU2hpcChsZW5ndGgsIGNvb3Jkc1N0YXJ0LCBjb29yZHNFbmQpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5zaGlwc0xpc3QubGVuZ3RoO1xyXG4gICAgY29uc3QgcGxhY2VkU2hpcCA9IG5ldyBTaGlwKGxlbmd0aCwgaWQpO1xyXG5cclxuICAgIC8vIGlmIHRoZSBzaGlwJ3MgbGVuZ3RoID4gMiwgbWFyayB0aGUgb3RoZXIgc3F1YXJlcyB0b29cclxuICAgIHRoaXMuc2hpcHNMaXN0LnB1c2gocGxhY2VkU2hpcCk7XHJcbiAgICBpZiAoY29vcmRzU3RhcnRbMF0gIT09IGNvb3Jkc0VuZFswXSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gY29vcmRzU3RhcnRbMF07IGkgPD0gY29vcmRzRW5kWzBdOyBpKyspIHtcclxuICAgICAgICB0aGlzLmdyaWRbaV1bY29vcmRzU3RhcnRbMV1dID0gaWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb29yZHNTdGFydFsxXSAhPT0gY29vcmRzRW5kWzFdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb29yZHNTdGFydFsxXTsgaSA8PSBjb29yZHNFbmRbMV07IGkrKykge1xyXG4gICAgICAgIHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1baV0gPSBpZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5ncmlkW2Nvb3Jkc1N0YXJ0WzBdXVtjb29yZHNTdGFydFsxXV0gPSBpZDtcclxuICAgIHRoaXMuZ3JpZFtjb29yZHNFbmRbMF1dW2Nvb3Jkc0VuZFsxXV0gPSBpZDtcclxuICB9XHJcblxyXG4gIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XHJcbiAgICBsZXQgc3F1YXJlO1xyXG4gICAgbGV0IGlkID0gdGhpcy5ncmlkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGlkKTtcclxuICAgIGlmIChpZCA9PT0gXCJtaXNzXCIgfHwgaWQgPT09IFwiaGl0XCIpIHtcclxuICAgICAgLy8gdHJ5IGFnYWluIGlmIGludmFsaWQgbW92ZVxyXG4gICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgbW92ZVwiKTtcclxuICAgICAgcmV0dXJuIFwiaW52YWxpZCBtb3ZlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBsYXllcnMuY3VycmVudCA9PT0gXCJodW1hblwiKSB7XHJcbiAgICAgIHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgYC5lbmVteS1zcXVhcmUjciR7Y29vcmRzWzBdfWMke2Nvb3Jkc1sxXX1gXHJcbiAgICAgICk7XHJcbiAgICAgIHBsYXllcnMuY3VycmVudCA9IFwiQUlcIjtcclxuICAgIH0gZWxzZSBpZiAocGxheWVycy5jdXJyZW50ID09PSBcIkFJXCIpIHtcclxuICAgICAgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLm93bi1zcXVhcmUjciR7Y29vcmRzWzBdfWMke2Nvb3Jkc1sxXX1gKTtcclxuICAgICAgcGxheWVycy5jdXJyZW50ID0gXCJodW1hblwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmVjb3JkIGEgaGl0IG9yIG1pc3NcclxuICAgIGlmIChpZCA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmdyaWRbY29vcmRzWzBdXVtjb29yZHNbMV1dID0gXCJtaXNzXCI7XHJcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICBsZXQgaGl0U2hpcCA9IHRoaXMuc2hpcHNMaXN0W2lkXTtcclxuICAgICAgdGhpcy5ncmlkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9IFwiaGl0XCI7XHJcbiAgICAgIGhpdFNoaXAuaGl0KCk7XHJcbiAgICAgIHRoaXMucmVjZWl2ZWRIaXRzICs9IDE7XHJcbiAgICAgIHRoaXMuY2hlY2tJZkxvc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIm93bmVyOiBcIiArIHRoaXMub3duZXIsIFwiaGl0czogXCIgKyB0aGlzLnJlY2VpdmVkSGl0cyk7XHJcbiAgICAvL2NvbnNvbGUubG9nKHRoaXMuZ3JpZCk7XHJcbiAgICAvL2lmIGl0J3MgQUkncyB0dXJuIG5vdywgc2VuZCBhbiBhdHRhY2tcclxuICAgIGlmIChwbGF5ZXJzLmN1cnJlbnQgPT09IFwiQUlcIikge1xyXG4gICAgICBwbGF5ZXJzLmh1bWFuLmJvYXJkLkFJYXR0YWNrKCk7XHJcbiAgICB9XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmdyaWQpO1xyXG4gIH1cclxuXHJcbiAgcGxheWVyQXR0YWNrKGNvb3Jkcykge1xyXG4gICAgLy8gaWYgaXQncyBub3QgdGhlIHBsYXllcidzIHR1cm4sIGNsaWNraW5nIG9uIGVuZW15IGJvYXJkIHdpbGwgZG8gbm90aGluZ1xyXG4gICAgaWYgKHBsYXllcnMuY3VycmVudCA9PT0gXCJodW1hblwiKSB7XHJcbiAgICAgIGJvYXJkcy5BSS5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBBSWF0dGFjaygpIHtcclxuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KTtcclxuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KTtcclxuICAgIGlmICh0aGlzLmdyaWRbeF1beV0gPT09IFwiaGl0XCIgfHwgdGhpcy5ncmlkW3hdW3ldID09PSBcIm1pc3NcIikge1xyXG4gICAgICByZXR1cm4gdGhpcy5BSWF0dGFjaygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxheWVyQXR0YWNrKGNvb3Jkcykge1xyXG4gICAgLy8gaWYgaXQncyBub3QgdGhlIHBsYXllcidzIHR1cm4sIGNsaWNraW5nIG9uIGVuZW15IGJvYXJkIHdpbGwgZG8gbm90aGluZ1xyXG4gICAgaWYgKHBsYXllcnMuY3VycmVudCA9PT0gXCJodW1hblwiKSB7XHJcbiAgICAgIHBsYXllcnMuQUkuYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tJZkxvc3QoKSB7XHJcbiAgICBjb25zdCBwb3NzaWJsZVNjb3JlID0gR2FtZWJvYXJkLnNoaXBMZW5ndGhzLnJlZHVjZShcclxuICAgICAgKHByZXZpb3VzLCBjdXJyZW50LCBpbml0aWFsKSA9PiBwcmV2aW91cyArIGN1cnJlbnQsXHJcbiAgICAgIDBcclxuICAgICk7XHJcbiAgICBpZiAodGhpcy5yZWNlaXZlZEhpdHMgPj0gcG9zc2libGVTY29yZSkge1xyXG4gICAgICB0aGlzLmxvc3RHYW1lID0gdHJ1ZTtcclxuICAgICAgY29uc29sZS5sb2coXCJnYW1lIGxvc3Q6IFwiICsgdGhpcy5vd25lcik7XHJcbiAgICAgIGdhbWVFbmQodGhpcy5vd25lcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVHcmlkKCkge1xyXG4gICAgbGV0IGdyaWRBcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XHJcbiAgICAgIGdyaWRBcnJheS5wdXNoKFtdKTtcclxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XHJcbiAgICAgICAgZ3JpZEFycmF5W3ldLnB1c2gobnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBncmlkQXJyYXk7XHJcbiAgfVxyXG5cclxuICAvLyBnZW5lcmF0ZSByYW5kb20gc2hpcHMgYW5kIHBsYWNlIHRoZW0gb24gdGhlIGVuZW15IGJvYXJkXHJcbiAgZ2V0UmFuZG9tUGxhY2VtZW50KCkge1xyXG4gICAgZm9yIChsZXQgaSA9IEdhbWVib2FyZC5zaGlwTGVuZ3Rocy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBjb25zdCBzaGlwTCA9IHBhcnNlSW50KEdhbWVib2FyZC5zaGlwTGVuZ3Roc1tpXSk7XHJcbiAgICAgIGxldCBjb29yZHMgPSB0aGlzLmdldE5ld0Nvb3JkcyhzaGlwTCk7XHJcbiAgICAgIHRoaXMucGxhY2VTaGlwKFxyXG4gICAgICAgIHNoaXBMLFxyXG4gICAgICAgIFtjb29yZHNbMF1bMF0sIGNvb3Jkc1swXVsxXV0sXHJcbiAgICAgICAgW2Nvb3Jkc1sxXVswXSwgY29vcmRzWzFdWzFdXVxyXG4gICAgICApO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmdyaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gcnVucyBmdW5jdGlvbnMgZ2VuZXJhdGluZyBhbmQgY2hlY2tpbmcgaWYgbmV3IGNvb3JkcyBhcmUgdmFsaWQsIHJldHVybnMgY29vcmRzIGZvciBvbmUgc2hpcCBvciB1c2VzIHJlY3Vyc2lvbiB0byBzdGFydCBvdmVyIHRoZSBwcm9jZXNzIGlmIGNvb3JkcyBhcmUgaW52YWxpZFxyXG4gIGdldE5ld0Nvb3JkcyhzaGlwTGVuZ3RoKSB7XHJcbiAgICBsZXQgY29vcmRzID0gdGhpcy5yYW5kb21pemVDb29yZHMocGFyc2VJbnQoc2hpcExlbmd0aCkpO1xyXG4gICAgbGV0IGZ1bGxDb29yZHMgPSB0aGlzLmdldEZ1bGxDb29yZHMoY29vcmRzKTtcclxuICAgIGxldCBjb29yZENoZWNrID0gdGhpcy5jaGVja0lmT2NjdXBpZWQoZnVsbENvb3Jkcyk7XHJcbiAgICBpZiAoY29vcmRDaGVjayA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIGNvb3JkcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldE5ld0Nvb3JkcyhwYXJzZUludChzaGlwTGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyB1c2VzIG1hdGgucmFuZG9tIHRvIGdldCByYW5kb20gY29vcmRpbmF0ZXMgb24gdGhlIGJvYXJkLCByYW5kb21pemUgd2hldGVyIHRoZSBuZXcgc2hpcCB3aWxsIGJlIHZlcnRpY2FsIG9yIGhvcml6b250YWwsIGNhbGN1bGF0ZSB0aGF0IGl0IGZpdHMgb24gdGhlIGJvYXJkIGFjY29yZGluZyB0byB0aGUgc2hpcHMgbGVuZ3RoXHJcbiAgcmFuZG9taXplQ29vcmRzKHNoaXBMZW5ndGgpIHtcclxuICAgIGNvbnN0IHN0YXJ0Um93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgY29uc3Qgc3RhcnRDb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBjb25zdCBlbmRSb3cgPSBzdGFydFJvdyArIHBhcnNlSW50KHNoaXBMZW5ndGgpIC0gMTtcclxuICAgIGNvbnN0IGVuZENvbCA9IHN0YXJ0Q29sICsgcGFyc2VJbnQoc2hpcExlbmd0aCkgLSAxO1xyXG5cclxuICAgIGlmIChlbmRSb3cgPCAxMCAmJiBlbmRDb2wgPCAxMCkge1xyXG4gICAgICAvL3JhbmRvbWl6ZSAtIGhvcml6b250YWwgb3IgdmVydGljYWxcclxuICAgICAgbGV0IGNoYW5jZSA9IE1hdGgucmFuZG9tKCkgKiAxO1xyXG4gICAgICBpZiAoY2hhbmNlIDwgMC41KSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgICAgW3N0YXJ0Um93LCBlbmRDb2xdLFxyXG4gICAgICAgIF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgICAgW2VuZFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgIF07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZW5kQ29sIDwgMTApIHtcclxuICAgICAgcmV0dXJuIFtcclxuICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgICBbc3RhcnRSb3csIGVuZENvbF0sXHJcbiAgICAgIF07XHJcbiAgICB9IGVsc2UgaWYgKGVuZFJvdyA8IDEwKSB7XHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgW3N0YXJ0Um93LCBzdGFydENvbF0sXHJcbiAgICAgICAgW2VuZFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmFuZG9taXplQ29vcmRzKHNoaXBMZW5ndGgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZ2V0cyBmdWxsIGNvb3JkaW5hdGVzIG9mIGV2ZXJ5IHNxdWFyZSBpbiBhIHNpbmdsZSBzaGlwXHJcbiAgZ2V0RnVsbENvb3Jkcyhjb29yZHMpIHtcclxuICAgIGxldCByb3dTdGFydCA9IHBhcnNlSW50KGNvb3Jkc1swXVswXSk7XHJcbiAgICBsZXQgY29sU3RhcnQgPSBwYXJzZUludChjb29yZHNbMF1bMV0pO1xyXG4gICAgbGV0IHJvd0VuZCA9IHBhcnNlSW50KGNvb3Jkc1sxXVswXSk7XHJcbiAgICBsZXQgY29sRW5kID0gcGFyc2VJbnQoY29vcmRzWzFdWzFdKTtcclxuXHJcbiAgICBsZXQgZnVsbENvb3JkaW5hdGVzID0gW107XHJcbiAgICBpZiAocm93U3RhcnQgIT09IHJvd0VuZCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gcm93U3RhcnQ7IGkgPD0gcm93RW5kOyBpKyspIHtcclxuICAgICAgICBmdWxsQ29vcmRpbmF0ZXMucHVzaChbaSwgY29sU3RhcnRdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGNvbFN0YXJ0ICE9PSBjb2xFbmQpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IGNvbFN0YXJ0OyBpIDw9IGNvbEVuZDsgaSsrKSB7XHJcbiAgICAgICAgZnVsbENvb3JkaW5hdGVzLnB1c2goW3Jvd1N0YXJ0LCBpXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmdWxsQ29vcmRpbmF0ZXM7XHJcbiAgfVxyXG5cclxuICAvLyBjaGVjayBpZiBhbnkgc3F1YXJlIG9mIHRoZSBuZXcgc2hpcCBpcyBhbHJlYWR5IG9jY3VwaWVkOyBpZiBzbywgc2VuZCBpbmZvIHRvIHByZXZpb3VzIGZ1bmN0aW9ucyB0byBnZW5lcmF0ZSBuZXcgc2hpcCBjb29yZGluYXRlcyBpbnN0ZWFkXHJcbiAgY2hlY2tJZk9jY3VwaWVkKGZ1bGxDb29yZGluYXRlcykge1xyXG4gICAgLy8gY29uc29sZS5sb2coZnVsbENvb3JkaW5hdGVzKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVsbENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBjb29yZCA9IGZ1bGxDb29yZGluYXRlc1tpXTtcclxuICAgICAgaWYgKHRoaXMuZ3JpZFtwYXJzZUludChjb29yZFswXSldW3BhcnNlSW50KGNvb3JkWzFdKV0gIT09IG51bGwpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNoZWNrIC0gb2NjdXBpZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGRyYXdHcmlkKCkge1xyXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcclxuICAgIGNvbnN0IGFycmF5ID0gdGhpcy5ncmlkO1xyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG4gICAgY29uc3QgcHJlcEJvYXJkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdi5wcmVwLWJvYXJkLWRpdlwiKTtcclxuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgYXJyYXkuZm9yRWFjaCgocm93LCByaW5kZXgpID0+IHtcclxuICAgICAgcm93LmZvckVhY2goKGNvbHVtbiwgY2luZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHIke3JpbmRleH1jJHtjaW5kZXh9YCk7XHJcbiAgICAgICAgaWYgKHRoaXMub3duZXIgPT09IFwiaHVtYW5cIikge1xyXG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJvd24tc3F1YXJlXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vd25lciA9PT0gXCJBSVwiKSB7XHJcbiAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImVuZW15LXNxdWFyZVwiKTtcclxuICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckF0dGFjayhbcmluZGV4LCBjaW5kZXhdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vd25lciA9PT0gXCJwcmVwYXJlXCIpIHtcclxuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwicHJlcC1zcXVhcmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgY29sdW1uID09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbHVtbik7XHJcbiAgICAgICAgICBpZiAodGhpcy5vd25lciA9PT0gXCJodW1hblwiKSB7XHJcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwib3duLXNoaXBcIik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgbWFya2luZyBvZiBlbmVteSBzaGlwcyBpbiB0aGUgZmluYWwgdmVyc2lvbiBvZiB0aGUgZ2FtZVxyXG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImVuZW15LXNoaXBcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRob3NlIHR3byBpZnMgYXJlIG5lZWRlZCwgcG9zc2libHkgcmVtb3ZlXHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gXCJoaXRcIikge1xyXG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5vd25lciA9PT0gXCJodW1hblwiKSB7XHJcbiAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZChcImdyaWQtb3duXCIpO1xyXG4gICAgICBtYWluLmFwcGVuZENoaWxkKGdyaWQpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm93bmVyID09PSBcIkFJXCIpIHtcclxuICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1lbmVteVwiKTtcclxuICAgICAgbWFpbi5hcHBlbmRDaGlsZChncmlkKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vd25lciA9PT0gXCJwcmVwYXJlXCIpIHtcclxuICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1wcmVwXCIpO1xyXG4gICAgICBwcmVwQm9hcmREaXYuYXBwZW5kQ2hpbGQoZ3JpZCk7XHJcbiAgICB9XHJcbiAgICBncmlkLmNsYXNzTGlzdC5hZGQoXCJncmlkXCIpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lcikge1xyXG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBudWxsO1xyXG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQob3duZXIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UGxheWVycygpIHtcclxuICBwbGF5ZXJzLmh1bWFuID0gbmV3IFBsYXllcihcImh1bWFuXCIpO1xyXG4gIHBsYXllcnMuQUkgPSBuZXcgUGxheWVyKFwiQUlcIik7XHJcbiAgcGxheWVycy5wcmVwYXJlID0gbmV3IFBsYXllcihcInByZXBhcmVcIik7XHJcbn1cclxuXHJcbi8qXHJcbmZ1bmN0aW9uIHBsYXlUZXN0R2FtZSgpIHtcclxuICBjb25zdCBwbGF5ZXJBID0gbmV3IFBsYXllcihcImh1bWFuXCIpO1xyXG4gIGNvbnN0IHBsYXllckIgPSBuZXcgUGxheWVyKFwiQUlcIik7XHJcbiAgYm9hcmRzLmh1bWFuID0gbmV3IEdhbWVib2FyZChcImh1bWFuXCIpO1xyXG4gIGJvYXJkcy5BSSA9IG5ldyBHYW1lYm9hcmQoXCJBSVwiKTtcclxuXHJcbiAgY2xlYW5QbGFjZURvbSgpO1xyXG4gIGJvYXJkcy5odW1hbi5nZXRSYW5kb21QbGFjZW1lbnQoKTtcclxuXHJcbiAgYm9hcmRzLmh1bWFuLmRyYXdHcmlkKCk7XHJcbiAgYm9hcmRzLkFJLmdldFJhbmRvbVBsYWNlbWVudCgpO1xyXG4gIGJvYXJkcy5BSS5kcmF3R3JpZCgpO1xyXG4gIC8vIGNvbnNvbGUubG9nKGJvYXJkQi5ncmlkKTtcclxuICBjdXJyZW50UGxheWVyID0gXCJodW1hblwiO1xyXG59Ki9cclxuXHJcbmV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgUGxheWVyLCBwbGF5ZXJzLCBnZXRQbGF5ZXJzIH07XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Q2luemVsOndnaHRAODAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKiB7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBtYXJnaW46IDBweDtcclxuICBwYWRkaW5nOiAwcHg7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZDFlMjY7XHJcbiAgY29sb3I6ICNkY2E4NWQ7XHJcbn1cclxuXHJcbi5oZWFkZXIge1xyXG4gIG1hcmdpbjogMTJweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4uaGVhZGVyID4gc3BhbiB7XHJcbiAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgZm9udC1mYW1pbHk6ICdDaW56ZWwnLCBzZXJpZjtcclxuICB0ZXh0LXNoYWRvdzogIzNjM2Q1MSAwcHggLTEwcHggNnB4LCAycHggMnB4IDJweCAjNWY1NjFiO1xyXG4gIGJvcmRlci1ib3R0b206ICNkY2E4NWQgMnB4IHNvbGlkO1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxufVxyXG5cclxuLm1haW4ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5wcmVwLWJvYXJkLWRpdiB7XHJcbiAgbWFyZ2luOiA2cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDMwMHB4O1xyXG59XHJcblxyXG4ucHJlcC1zaGlwcy1kaXYge1xyXG4gIG1hcmdpbjogNnB4IDI0cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLnByZXAtc2hpcHMtZGl2ID4gc3BhbiwgLnByZXAtYm9hcmQtZGl2ID4gc3BhbiB7XHJcbiAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcblxyXG4ucHJlcC1pbmZvIHtcclxuICBtYXJnaW4tdG9wOiA2cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4uc3EwLXByZXA6aG92ZXIge1xyXG4gIGN1cnNvcjogZ3JhYjtcclxufVxyXG5cclxuLmdyaWQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI4cHgpO1xyXG4gIGNvbHVtbi1nYXA6IDBweDtcclxuICByb3ctZ2FwOiAwcHg7XHJcbiAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgbWFyZ2luOiAwIDEycHg7XHJcbn1cclxuXHJcbi5vd24tc3F1YXJlLCAuZW5lbXktc3F1YXJlLCAucHJlcC1zcXVhcmUge1xyXG4gIHdpZHRoOiAyOHB4O1xyXG4gIGhlaWdodDogMjhweDtcclxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xyXG4gIG1hcmdpbjogMHB4O1xyXG59XHJcblxyXG4uZW5lbXktc3F1YXJlOmhvdmVyIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5lbmVteS1zcXVhcmUuaGl0IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZ3JlZW47XHJcbn1cclxuXHJcbi5lbmVteS1zcXVhcmUubWlzcyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcclxufVxyXG5cclxuLm93bi1zcXVhcmUubWlzcyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcclxufVxyXG5cclxuLm93bi1zcXVhcmUuaGl0IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCA5OCwgMjA1KTtcclxufVxyXG5cclxuLm93bi1zcXVhcmUuc2hpcCwgLnByZXAtc3F1YXJlLnNoaXB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEyNTNkNjtcclxufVxyXG5cclxuLnNoaXAtZGl2IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1hcmdpbjogNHB4O1xyXG59XHJcblxyXG4uc2hpcC1vbi1ib2FyZCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIG1hcmdpbjogMHB4O1xyXG59XHJcblxyXG4uc2hpcHNxIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYgOSAxMzUpO1xyXG59XHJcblxyXG4uZmxleC10b2dnbGUge1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5zdGFydC1nYW1lLCAuYnV0dG9uLW1vZGFsIHtcclxuICBtYXJnaW46IDEwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzExMzY0YTtcclxuICBjb2xvcjogI2RjYTg1ZDtcclxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xyXG4gIHBhZGRpbmc6IDZweCAxOHB4O1xyXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcclxufVxyXG5cclxuLnN0YXJ0LWdhbWU6aG92ZXIsIC5idXR0b24tbW9kYWw6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzRlNjY7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uc3RhcnQtZ2FtZTphY3RpdmUsIC5idXR0b24tbW9kYWw6YWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYgOSAxMzUpO1xyXG59XHJcblxyXG4ub3duLXNoaXAge1xyXG4gIGJhY2tncm91bmQ6ICMxMjUzZDY7XHJcbn1cclxuXHJcbi5ncmlkLWVuZW15IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTgsIDM5LCAxMDQpO1xyXG59XHJcblxyXG4uZ3JpZC1vd24sIC5ncmlkLXByZXAge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzRlNjY7XHJcbn1cclxuXHJcbi5ncmlkLXBsYWNlLW93biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcclxufVxyXG5cclxuLmVuZW15LXNoaXAge1xyXG4gIGJhY2tncm91bmQ6IHJnYigxNzUsIDEzLCA0MCk7XHJcbn1cclxuXHJcbi5lcnJvci1tc2cge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1OCwgMzksIDEwNCk7XHJcbiAgbWFyZ2luOiA4cHggMHB4O1xyXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XHJcbiAgcGFkZGluZzogNnB4O1xyXG59XHJcblxyXG4uaGlkZGVuIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4ubW9kYWwge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB6LWluZGV4OiAxO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMywgMzAsIDM4LCAwLjcpO1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQiw0QkFBNEI7RUFDNUIsdURBQXVEO0VBQ3ZELGdDQUFnQztFQUNoQyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYix1Q0FBdUM7RUFDdkMsZUFBZTtFQUNmLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsZUFBZTtFQUNmLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCx5QkFBeUI7RUFDekIsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGtDQUFrQztFQUNsQyxlQUFlO0VBQ2YseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25CXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUNpbnplbDp3Z2h0QDgwMCZkaXNwbGF5PXN3YXAnKTtcXHJcXG5cXHJcXG4qIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBtYXJnaW46IDBweDtcXHJcXG4gIHBhZGRpbmc6IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGQxZTI2O1xcclxcbiAgY29sb3I6ICNkY2E4NWQ7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIge1xcclxcbiAgbWFyZ2luOiAxMnB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyID4gc3BhbiB7XFxyXFxuICBmb250LXNpemU6IDIuNXJlbTtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnQ2luemVsJywgc2VyaWY7XFxyXFxuICB0ZXh0LXNoYWRvdzogIzNjM2Q1MSAwcHggLTEwcHggNnB4LCAycHggMnB4IDJweCAjNWY1NjFiO1xcclxcbiAgYm9yZGVyLWJvdHRvbTogI2RjYTg1ZCAycHggc29saWQ7XFxyXFxuICBtYXJnaW4tYm90dG9tOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5tYWluIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnByZXAtYm9hcmQtZGl2IHtcXHJcXG4gIG1hcmdpbjogNnB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgd2lkdGg6IDMwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucHJlcC1zaGlwcy1kaXYge1xcclxcbiAgbWFyZ2luOiA2cHggMjRweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgd2lkdGg6IDMwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucHJlcC1zaGlwcy1kaXYgPiBzcGFuLCAucHJlcC1ib2FyZC1kaXYgPiBzcGFuIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucHJlcC1pbmZvIHtcXHJcXG4gIG1hcmdpbi10b3A6IDZweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4uc3EwLXByZXA6aG92ZXIge1xcclxcbiAgY3Vyc29yOiBncmFiO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JpZCB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI4cHgpO1xcclxcbiAgY29sdW1uLWdhcDogMHB4O1xcclxcbiAgcm93LWdhcDogMHB4O1xcclxcbiAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXHJcXG4gIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gIG1hcmdpbjogMCAxMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4ub3duLXNxdWFyZSwgLmVuZW15LXNxdWFyZSwgLnByZXAtc3F1YXJlIHtcXHJcXG4gIHdpZHRoOiAyOHB4O1xcclxcbiAgaGVpZ2h0OiAyOHB4O1xcclxcbiAgYm9yZGVyOiAxcHggI2RjYTg1ZCBzb2xpZDtcXHJcXG4gIG1hcmdpbjogMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZW5lbXktc3F1YXJlOmhvdmVyIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmVuZW15LXNxdWFyZS5oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dyZWVuO1xcclxcbn1cXHJcXG5cXHJcXG4uZW5lbXktc3F1YXJlLm1pc3Mge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXHJcXG59XFxyXFxuXFxyXFxuLm93bi1zcXVhcmUubWlzcyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcclxcbn1cXHJcXG5cXHJcXG4ub3duLXNxdWFyZS5oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgOTgsIDIwNSk7XFxyXFxufVxcclxcblxcclxcbi5vd24tc3F1YXJlLnNoaXAsIC5wcmVwLXNxdWFyZS5zaGlwe1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEyNTNkNjtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAtZGl2IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBtYXJnaW46IDRweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAtb24tYm9hcmQge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgbWFyZ2luOiAwcHg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwc3Ege1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU2IDkgMTM1KTtcXHJcXG59XFxyXFxuXFxyXFxuLmZsZXgtdG9nZ2xlIHtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5zdGFydC1nYW1lLCAuYnV0dG9uLW1vZGFsIHtcXHJcXG4gIG1hcmdpbjogMTBweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTM2NGE7XFxyXFxuICBjb2xvcjogI2RjYTg1ZDtcXHJcXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XFxyXFxuICBwYWRkaW5nOiA2cHggMThweDtcXHJcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcclxcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhcnQtZ2FtZTpob3ZlciwgLmJ1dHRvbi1tb2RhbDpob3ZlciB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjM0ZTY2O1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhcnQtZ2FtZTphY3RpdmUsIC5idXR0b24tbW9kYWw6YWN0aXZlIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1NiA5IDEzNSk7XFxyXFxufVxcclxcblxcclxcbi5vd24tc2hpcCB7XFxyXFxuICBiYWNrZ3JvdW5kOiAjMTI1M2Q2O1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JpZC1lbmVteSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTgsIDM5LCAxMDQpO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JpZC1vd24sIC5ncmlkLXByZXAge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcXHJcXG59XFxyXFxuXFxyXFxuLmdyaWQtcGxhY2Utb3duIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzRlNjY7XFxyXFxufVxcclxcblxcclxcbi5lbmVteS1zaGlwIHtcXHJcXG4gIGJhY2tncm91bmQ6IHJnYigxNzUsIDEzLCA0MCk7XFxyXFxufVxcclxcblxcclxcbi5lcnJvci1tc2cge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU4LCAzOSwgMTA0KTtcXHJcXG4gIG1hcmdpbjogOHB4IDBweDtcXHJcXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XFxyXFxuICBwYWRkaW5nOiA2cHg7XFxyXFxufVxcclxcblxcclxcbi5oaWRkZW4ge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHotaW5kZXg6IDE7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBwYWRkaW5nOiAyMHB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMywgMzAsIDM4LCAwLjcpO1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IGNyZWF0ZURvbSwgcHJlcGFyZVNoaXBzIH0gZnJvbSBcIi4vZG9tLmpzXCI7XHJcbmltcG9ydCB7IGdldFBsYXllcnMgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XHJcbmltcG9ydCBjc3MgZnJvbSBcIi4vc3R5bGUuY3NzXCI7XHJcblxyXG4vL3BsYXlUZXN0R2FtZSgpO1xyXG5cclxuY3JlYXRlRG9tKCk7XHJcbmdldFBsYXllcnMoKTtcclxucHJlcGFyZVNoaXBzKCk7XHJcbiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJwbGF5ZXJzIiwiZ2V0UGxheWVycyIsImNyZWF0ZURvbSIsImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJoZWFkZXIiLCJjcmVhdGVFbGVtZW50IiwidGl0bGUiLCJtYWluIiwiZm9vdGVyIiwiY2xhc3NMaXN0IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImFsbG93RHJvcCIsImV2IiwicHJldmVudERlZmF1bHQiLCJkcmFnIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInRhcmdldCIsImlkIiwiZHJvcCIsImRhdGEiLCJnZXREYXRhIiwiZ2V0RWxlbWVudEJ5SWQiLCJjb25zb2xlIiwibG9nIiwiZHJhZ0VuZCIsImFyZUFsbFNoaXBzUGxhY2VkIiwicHJlcGFyZVNoaXBzIiwicHJlcEJvYXJkRGl2IiwicHJlcEJvYXJkVGl0bGUiLCJwcmVwU2hpcHNEaXYiLCJwcmVwU2hpcHNUaXRsZSIsInByZXBTaGlwc0xpc3QiLCJwcmVwSW5mb0RpdiIsInByZXBJbmZvUCIsInN0YXJ0R2FtZSIsInByZXBJbmZvUDIiLCJlcnJvck1zZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjaGVja1BsYWNlbWVudHMiLCJzaGlwTGVuZ3RocyIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJmdWxsU2hpcCIsImkiLCJzaGlwU3EiLCJzZXRBdHRyaWJ1dGUiLCJ0b2dnbGUiLCJwcmVwYXJlIiwiYm9hcmQiLCJkcmF3R3JpZCIsInByZXBTcXVhcmUiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3F1YXJlIiwiY2hpbGROb2RlcyIsImxlbmd0aCIsInJlbW92ZSIsInBsYWNlT25Cb2FyZCIsInBsYWNlU2hpcHMiLCJodW1hbiIsInBsYWNlbWVudEVycm9yIiwiQUkiLCJnZXRSYW5kb21QbGFjZW1lbnQiLCJjdXJyZW50IiwiaiIsImdyaWQiLCJzaGlwIiwiY29vcmRTdGFydCIsInBhcmVudE5vZGUiLCJzcGxpdCIsInN0YXJ0Um93IiwicGFyc2VJbnQiLCJzdGFydENvbHVtbiIsImVuZFJvdyIsImVuZENvbHVtbiIsImZ1bGxDb29yZHMiLCJjb250YWlucyIsImdldEZ1bGxDb29yZHMiLCJjaGVja0lmT2NjdXBpZWQiLCJwbGFjZVNoaXAiLCJjbGVhbk1haW5Eb20iLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJnYW1lRW5kIiwicGxheWVyIiwibW9kYWwiLCJ3b25Pckxvc3QiLCJidXR0b24iLCJwbGF5QWdhaW4iLCJTaGlwIiwiY29uc3RydWN0b3IiLCJoaXRzIiwiZGVzdHJveWVkIiwiaGl0IiwiaXNTdW5rIiwib3duZXIiLCJjcmVhdGVHcmlkIiwic2hpcHNMaXN0IiwicmVjZWl2ZWRIaXRzIiwibG9zdEdhbWUiLCJjb29yZHNTdGFydCIsImNvb3Jkc0VuZCIsInBsYWNlZFNoaXAiLCJwdXNoIiwicmVjZWl2ZUF0dGFjayIsImNvb3JkcyIsImhpdFNoaXAiLCJjaGVja0lmTG9zdCIsIkFJYXR0YWNrIiwicGxheWVyQXR0YWNrIiwiYm9hcmRzIiwieCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInkiLCJwb3NzaWJsZVNjb3JlIiwicmVkdWNlIiwicHJldmlvdXMiLCJpbml0aWFsIiwiZ3JpZEFycmF5Iiwic2hpcEwiLCJnZXROZXdDb29yZHMiLCJzaGlwTGVuZ3RoIiwicmFuZG9taXplQ29vcmRzIiwiY29vcmRDaGVjayIsInN0YXJ0Q29sIiwiZW5kQ29sIiwiY2hhbmNlIiwicm93U3RhcnQiLCJjb2xTdGFydCIsInJvd0VuZCIsImNvbEVuZCIsImZ1bGxDb29yZGluYXRlcyIsImNvb3JkIiwiYXJyYXkiLCJyb3ciLCJyaW5kZXgiLCJjb2x1bW4iLCJjaW5kZXgiLCJQbGF5ZXIiLCJzdGF0dXMiLCJjc3MiXSwic291cmNlUm9vdCI6IiJ9