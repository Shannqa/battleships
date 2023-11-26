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
/* harmony export */   cleanPlaceDom: () => (/* binding */ cleanPlaceDom),
/* harmony export */   createDom: () => (/* binding */ createDom),
/* harmony export */   placeShips: () => (/* binding */ placeShips),
/* harmony export */   placementError: () => (/* binding */ placementError),
/* harmony export */   prepareShips: () => (/* binding */ prepareShips)
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");

function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById(data).classList.add("ship-on-board");
  ev.target.appendChild(document.getElementById(data));
}
function dragEnd(ev) {
  areAllShipsPlaced();
}
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
      square.classList.add("square");
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
      square.addEventListener("drop", drop);
      square.addEventListener("dragover", allowDrop);
      grid.appendChild(square);
    });
  });
  grid.classList.add("grid");
  grid.classList.add("grid-place-own");
  ownBoard.appendChild(grid);
}
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
  const main = document.querySelector(".main");
  const ownBoard = document.createElement("div");
  const ownBoardTitle = document.createElement("span");
  ownBoard.classList.add("own-board");
  ownBoardTitle.textContent = "Your board";
  const placeShips = document.createElement("div");
  placeShips.classList.add("place-ships");
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
      shipSq.classList.add("square");
      shipSq.classList.add("own-ship");
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
  placeInfoSp.textContent = "Drag & drop the ships on the board. Doubleclick a ship to rotate it.";
  placeInfo.appendChild(placeInfoSp);
  main.appendChild(ownBoard);
  ownBoard.appendChild(ownBoardTitle);
  main.appendChild(placeShips);
  placeShips.appendChild(shipsTitle);
  placeShips.appendChild(shipList);
  placeShips.appendChild(placeInfo);
  drawGrid();
}

// check if all ships were placed on the board
function areAllShipsPlaced() {
  const placeShips = document.querySelector(".place-ships");
  const shipList = document.querySelector(".ship-list");
  if (shipList.childNodes.length === 0) {
    const startGame = document.createElement("button");
    startGame.textContent = "Start game";
    startGame.classList.add("start-game");
    startGame.addEventListener("click", checkPlacedShips);
    const placeInfo = document.querySelector(".place-info");
    const placeInfoSp2 = document.createElement("p");
    placeInfoSp2.textContent = "Once you're happy with the placement of your ships, click the start button to begin the game!";
    placeInfo.appendChild(startGame);
    placeInfo.appendChild(placeInfoSp2);
    placeShips.appendChild(placeInfo);
  }
}

// +++ check if all ships are placed correctly
function checkPlacedShips() {
  (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.playGame)();
}
function placementError() {
  const placeShips = document.querySelector(".place-ships");
  const errorMsg = document.createElement("div");
  errorMsg.classList.add("error-msg");
  errorMsg.textContent = "Some ships don't fit on the board or overlap. Use drag & drop to move them or double click to rotate them before you can begin the game.";
  placeShips.appendChild(errorMsg);
}

// place ships on the player's board
function placeShips(board) {
  // get placed ships coords
  const shipLengths = [2, 3, 4, 5];
  const fullShips = [];
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
      fullCoords = board.getFullCoords([[startRow, startColumn], [endRow, startColumn]]);
      if (board.checkIfOccupied(fullCoords) == true) {
        console.log("ayyy");
        return true;
      }
      board.placeShip(length, [startRow, startColumn], [endRow, startColumn]);
    } else {
      // ship is horizontal
      if (endColumn > 9) {
        return true;
      }
      fullCoords = board.getFullCoords([[startRow, startColumn], [startRow, endColumn]]);
      if (board.checkIfOccupied(fullCoords) == true) {
        console.log("ayyy");
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
/* harmony export */   playGame: () => (/* binding */ playGame)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");

const possibleScore = 15;
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
    this.shipLengths = [2, 3, 4, 5];
  }
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
  receiveAttack(coordsX, coordsY) {
    let id = this.grid[coordsX][coordsY];
    if (id === null) {
      this.grid[coordsX][coordsY] = "miss";
    } else if (id === "miss" || id === "hit") {
      return "invalid move";
    } else {
      let hitShip = this.shipsList[id];
      this.grid[coordsX][coordsY] = "hit";
      hitShip.hit();
      this.receivedHits += 1;
    }
  }
  checkIfLost() {
    if (this.receivedHits >= possibleScore) {
      this.lostGame = true;
      return true;
    }
    return false;
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
    for (let i = this.shipLengths.length - 1; i >= 0; i--) {
      const shipL = parseInt(this.shipLengths[i]);
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
        console.log("check - occupied");
        return true;
      }
    }
    return false;
  }
  drawGrid() {
    const main = document.querySelector(".main");
    const array = this.grid;
    // console.log(array);

    const body = document.querySelector("body");
    const grid = document.createElement("div");
    array.forEach((row, rindex) => {
      row.forEach((column, cindex) => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("id", `r${rindex}c${cindex}`);
        if (typeof column == "number") {
          // console.log(column);
          if (this.owner === "human") {
            square.classList.add("own-ship");
          } else {
            square.classList.add("enemy-ship");
          }
        }
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
    } else {
      grid.classList.add("grid-enemy");
    }
    grid.classList.add("grid");
    main.appendChild(grid);
  }
}
class Player {
  constructor(owner) {
    this.owner = owner;
  }
}
function playGame() {
  const playerA = new Player("human");
  const playerB = new Player("AI");
  const boardA = new Gameboard("human");
  const boardB = new Gameboard("AI");
  let checkPlaced = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.placeShips)(boardA);
  if (checkPlaced === true) {
    console.log("truee");
    return (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.placementError)();
  }
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.cleanPlaceDom)();
  boardA.drawGrid();
  boardB.getRandomPlacement();
  boardB.drawGrid();
  console.log(boardB.grid);
}


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

.grid {
  display: grid;
  grid-template-columns: repeat(10, 28px);
  column-gap: 0px;
  row-gap: 0px;
  justify-items: stretch;
  font-size: 12px;
  margin: 0 12px;
}

.square {
  width: 28px;
  height: 28px;
  border: 1px #dca85d solid;
  margin: 0px;
}

.squareB {
  background: #234e66;
}

.miss {
  background-color: grey;
}

.hit {
  background-color: rgb(255, 98, 205);
}

#div1 {
  width: 350px;
  height: 70px;
  padding: 10px;
  border: 1px solid #aaaaaa;
}

.own-board {
  margin: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}

.place-ships {
  margin: 6px 24px;
  display: flex;
  flex-direction: column;
  width: 300px;
}

.place-ships > span, .own-board > span {
  font-size: 1.5rem;
  margin-bottom: 8px;
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

.sq0-to-place:hover {
  cursor: grab;
}

.flex-toggle {
  flex-direction: column;
}

.place-info {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
}

.start-game {
  margin: 10px;
  background-color: #11364a;
  color: #dca85d;
  border: 1px #dca85d solid;
  padding: 6px 18px;
  font-size: 1.2rem;
  align-self: center;
}

.start-game:hover {
  background-color: #234e66;
  cursor: pointer;
}

.start-game:active {
  background-color: rgb(56 9 135);
}

.own-ship {
  background: #1253d6;
}

.grid-enemy {
  background-color: rgb(58, 39, 104);
}

.grid-own {
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,4BAA4B;EAC5B,uDAAuD;EACvD,gCAAgC;EAChC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,eAAe;EACf,YAAY;EACZ,sBAAsB;EACtB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,WAAW;AACb;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,yBAAyB;EACzB,cAAc;EACd,yBAAyB;EACzB,iBAAiB;EACjB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,kCAAkC;EAClC,eAAe;EACf,yBAAyB;EACzB,YAAY;AACd","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@800&display=swap');\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  margin: 0px;\r\n  padding: 0px;\r\n}\r\n\r\nbody {\r\n  background-color: #0d1e26;\r\n  color: #dca85d;\r\n}\r\n\r\n.header {\r\n  margin: 12px;\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.header > span {\r\n  font-size: 2.5rem;\r\n  font-family: 'Cinzel', serif;\r\n  text-shadow: #3c3d51 0px -10px 6px, 2px 2px 2px #5f561b;\r\n  border-bottom: #dca85d 2px solid;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.main {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 28px);\r\n  column-gap: 0px;\r\n  row-gap: 0px;\r\n  justify-items: stretch;\r\n  font-size: 12px;\r\n  margin: 0 12px;\r\n}\r\n\r\n.square {\r\n  width: 28px;\r\n  height: 28px;\r\n  border: 1px #dca85d solid;\r\n  margin: 0px;\r\n}\r\n\r\n.squareB {\r\n  background: #234e66;\r\n}\r\n\r\n.miss {\r\n  background-color: grey;\r\n}\r\n\r\n.hit {\r\n  background-color: rgb(255, 98, 205);\r\n}\r\n\r\n#div1 {\r\n  width: 350px;\r\n  height: 70px;\r\n  padding: 10px;\r\n  border: 1px solid #aaaaaa;\r\n}\r\n\r\n.own-board {\r\n  margin: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 300px;\r\n}\r\n\r\n.place-ships {\r\n  margin: 6px 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 300px;\r\n}\r\n\r\n.place-ships > span, .own-board > span {\r\n  font-size: 1.5rem;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.ship-div {\r\n  display: flex;\r\n  margin: 4px;\r\n}\r\n\r\n.ship-on-board {\r\n  position: absolute;\r\n  margin: 0px;\r\n}\r\n\r\n.shipsq {\r\n  background-color: rgb(56 9 135);\r\n}\r\n\r\n.sq0-to-place:hover {\r\n  cursor: grab;\r\n}\r\n\r\n.flex-toggle {\r\n  flex-direction: column;\r\n}\r\n\r\n.place-info {\r\n  margin-top: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.start-game {\r\n  margin: 10px;\r\n  background-color: #11364a;\r\n  color: #dca85d;\r\n  border: 1px #dca85d solid;\r\n  padding: 6px 18px;\r\n  font-size: 1.2rem;\r\n  align-self: center;\r\n}\r\n\r\n.start-game:hover {\r\n  background-color: #234e66;\r\n  cursor: pointer;\r\n}\r\n\r\n.start-game:active {\r\n  background-color: rgb(56 9 135);\r\n}\r\n\r\n.own-ship {\r\n  background: #1253d6;\r\n}\r\n\r\n.grid-enemy {\r\n  background-color: rgb(58, 39, 104);\r\n}\r\n\r\n.grid-own {\r\n  background-color: #234e66;\r\n}\r\n\r\n.grid-place-own {\r\n  background-color: #234e66;\r\n}\r\n\r\n.enemy-ship {\r\n  background: rgb(175, 13, 40);\r\n}\r\n\r\n.error-msg {\r\n  background-color: rgb(58, 39, 104);\r\n  margin: 8px 0px;\r\n  border: 1px #dca85d solid;\r\n  padding: 6px;\r\n}"],"sourceRoot":""}]);
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



(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.createDom)();
(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.prepareShips)();

/* for tests - show only enemy board
cleanPlaceDom();
const playerB = new Player("AI");
const boardB = new Gameboard("AI");
boardB.randomizePlacement();
boardB.drawGrid();
*/
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDZIQUE2SDtBQUM3SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sZ0ZBQWdGLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLDhHQUE4RyxXQUFXLDZCQUE2QixrQkFBa0IsbUJBQW1CLEtBQUssY0FBYyxnQ0FBZ0MscUJBQXFCLEtBQUssaUJBQWlCLG1CQUFtQixvQkFBb0IsOEJBQThCLEtBQUssd0JBQXdCLHdCQUF3QixtQ0FBbUMsOERBQThELHVDQUF1Qyx5QkFBeUIsS0FBSyxlQUFlLG9CQUFvQiw4QkFBOEIsS0FBSyxlQUFlLG9CQUFvQiw4Q0FBOEMsc0JBQXNCLG1CQUFtQiw2QkFBNkIsc0JBQXNCLHFCQUFxQixLQUFLLGlCQUFpQixrQkFBa0IsbUJBQW1CLGdDQUFnQyxrQkFBa0IsS0FBSyxrQkFBa0IsMEJBQTBCLEtBQUssZUFBZSw2QkFBNkIsS0FBSyxjQUFjLDBDQUEwQyxLQUFLLGVBQWUsbUJBQW1CLG1CQUFtQixvQkFBb0IsZ0NBQWdDLEtBQUssb0JBQW9CLGtCQUFrQixvQkFBb0IsNkJBQTZCLDBCQUEwQixtQkFBbUIsS0FBSyxzQkFBc0IsdUJBQXVCLG9CQUFvQiw2QkFBNkIsbUJBQW1CLEtBQUssZ0RBQWdELHdCQUF3Qix5QkFBeUIsS0FBSyxtQkFBbUIsb0JBQW9CLGtCQUFrQixLQUFLLHdCQUF3Qix5QkFBeUIsa0JBQWtCLEtBQUssaUJBQWlCLHNDQUFzQyxLQUFLLDZCQUE2QixtQkFBbUIsS0FBSyxzQkFBc0IsNkJBQTZCLEtBQUsscUJBQXFCLHNCQUFzQixvQkFBb0IsNkJBQTZCLEtBQUsscUJBQXFCLG1CQUFtQixnQ0FBZ0MscUJBQXFCLGdDQUFnQyx3QkFBd0Isd0JBQXdCLHlCQUF5QixLQUFLLDJCQUEyQixnQ0FBZ0Msc0JBQXNCLEtBQUssNEJBQTRCLHNDQUFzQyxLQUFLLG1CQUFtQiwwQkFBMEIsS0FBSyxxQkFBcUIseUNBQXlDLEtBQUssbUJBQW1CLGdDQUFnQyxLQUFLLHlCQUF5QixnQ0FBZ0MsS0FBSyxxQkFBcUIsbUNBQW1DLEtBQUssb0JBQW9CLHlDQUF5QyxzQkFBc0IsZ0NBQWdDLG1CQUFtQixLQUFLLG1CQUFtQjtBQUNwOEg7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUN0SzFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSxzRkFBTyxVQUFVLHNGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7QUNBa0U7QUFDVjtBQUMxQjtBQUU5QlUsa0RBQVMsQ0FBQyxDQUFDO0FBQ1hNLHFEQUFZLENBQUMsQ0FBQzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZWJvYXJkLCBQbGF5ZXIsIHBsYXlHYW1lIH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xyXG5cclxuZnVuY3Rpb24gYWxsb3dEcm9wKGV2KSB7XHJcbiAgZXYucHJldmVudERlZmF1bHQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhZyhldikge1xyXG4gIGV2LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBldi50YXJnZXQuaWQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcm9wKGV2KSB7XHJcbiAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICB2YXIgZGF0YSA9IGV2LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhKS5jbGFzc0xpc3QuYWRkKFwic2hpcC1vbi1ib2FyZFwiKTtcclxuICBldi50YXJnZXQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFnRW5kKGV2KSB7XHJcbiAgYXJlQWxsU2hpcHNQbGFjZWQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcclxuICBsZXQgZ3JpZEFycmF5ID0gW107XHJcbiAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XHJcbiAgICBncmlkQXJyYXkucHVzaChbXSk7XHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcclxuICAgICAgZ3JpZEFycmF5W3hdLnB1c2gobnVsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBncmlkQXJyYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdHcmlkKCkge1xyXG4gIGNvbnN0IG93bkJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vd24tYm9hcmRcIik7XHJcbiAgY29uc3QgYXJyYXkgPSBjcmVhdGVHcmlkKCk7XHJcblxyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgYXJyYXkuZm9yRWFjaCgocm93LCByaW5kZXgpID0+IHtcclxuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjaW5kZXgpID0+IHtcclxuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XHJcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgciR7cmluZGV4fWMke2NpbmRleH1gKTtcclxuICAgICAgaWYgKGNlbGwgPT09IFwic2hpcFwiKSB7XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjZWxsID09PSBcIm1pc3NcIikge1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wKTtcclxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBhbGxvd0Ryb3ApO1xyXG4gICAgICBncmlkLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZFwiKTtcclxuICBncmlkLmNsYXNzTGlzdC5hZGQoXCJncmlkLXBsYWNlLW93blwiKTtcclxuICBvd25Cb2FyZC5hcHBlbmRDaGlsZChncmlkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRG9tKCkge1xyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpO1xyXG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBzXCI7XHJcblxyXG4gIG1haW4uY2xhc3NMaXN0LmFkZChcIm1haW5cIik7XHJcbiAgLy8gY29uc3QgZW5lbXlCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgLy8gY29uc3QgZW5lbXlCb2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAvLyBlbmVteUJvYXJkVGl0bGUudGV4dENvbnRlbnQgPSBcIkVuZW15IGJvYXJkXCI7XHJcblxyXG4gIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgLy8gbWFpbi5hcHBlbmRDaGlsZChlbmVteUJvYXJkKTtcclxuICAvLyBlbmVteUJvYXJkLmFwcGVuZENoaWxkKGVuZW15Qm9hcmRUaXRsZSk7XHJcblxyXG4gIGJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xyXG4gIGJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZVNoaXBzKCkge1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIik7XHJcbiAgY29uc3Qgb3duQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IG93bkJvYXJkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICBvd25Cb2FyZC5jbGFzc0xpc3QuYWRkKFwib3duLWJvYXJkXCIpO1xyXG4gIG93bkJvYXJkVGl0bGUudGV4dENvbnRlbnQgPSBcIllvdXIgYm9hcmRcIjtcclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgcGxhY2VTaGlwcy5jbGFzc0xpc3QuYWRkKFwicGxhY2Utc2hpcHNcIik7XHJcbiAgY29uc3Qgc2hpcHNUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIHNoaXBzVGl0bGUudGV4dENvbnRlbnQgPSBcIlBsYWNlIHlvdXIgc2hpcHNcIjtcclxuXHJcbiAgY29uc3Qgc2hpcExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHNoaXBMaXN0LmNsYXNzTGlzdC5hZGQoXCJzaGlwLWxpc3RcIik7XHJcblxyXG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzIsIDMsIDQsIDVdO1xyXG4gIHNoaXBMZW5ndGhzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCBzaGlwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZChcInNoaXAtZGl2XCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtOyBpKyspIHtcclxuICAgICAgY29uc3Qgc2hpcFNxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgLy8gc2hpcFNxLnNldEF0dHJpYnV0ZShcImlkXCIsIGBzcTAtdG8tcGxhY2UtJHtpbmRleH1gKTtcclxuICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICBzaGlwU3EuY2xhc3NMaXN0LmFkZChcInNxMC10by1wbGFjZVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2hpcFNxLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XHJcbiAgICAgIHNoaXBTcS5jbGFzc0xpc3QuYWRkKFwib3duLXNoaXBcIik7XHJcblxyXG4gICAgICBzaGlwRGl2LmFwcGVuZENoaWxkKHNoaXBTcSk7XHJcbiAgICB9XHJcbiAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XHJcbiAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGB0by1wbGFjZS0ke2luZGV4fWApO1xyXG5cclxuICAgIC8vIG5lZWQgdG8gaGFuZGxlIGVycm9yIC0gd2hlbiB0aGUgaXRlbSBpcyBkcmFnZ2VkIGluIHRoZSBtaWRkbGUgb2YgdHdvIHNxdWFyZXNcclxuICAgIHNoaXBEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnKTtcclxuICAgIHNoaXBEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0VuZCk7XHJcbiAgICBzaGlwRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LnRvZ2dsZShcImZsZXgtdG9nZ2xlXCIpO1xyXG4gICAgfSk7XHJcbiAgICBzaGlwTGlzdC5hcHBlbmRDaGlsZChzaGlwRGl2KTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcGxhY2VJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBwbGFjZUluZm9TcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHBsYWNlSW5mby5jbGFzc0xpc3QuYWRkKFwicGxhY2UtaW5mb1wiKTtcclxuICBwbGFjZUluZm9TcC50ZXh0Q29udGVudCA9XHJcbiAgICBcIkRyYWcgJiBkcm9wIHRoZSBzaGlwcyBvbiB0aGUgYm9hcmQuIERvdWJsZWNsaWNrIGEgc2hpcCB0byByb3RhdGUgaXQuXCI7XHJcbiAgcGxhY2VJbmZvLmFwcGVuZENoaWxkKHBsYWNlSW5mb1NwKTtcclxuICBtYWluLmFwcGVuZENoaWxkKG93bkJvYXJkKTtcclxuICBvd25Cb2FyZC5hcHBlbmRDaGlsZChvd25Cb2FyZFRpdGxlKTtcclxuICBtYWluLmFwcGVuZENoaWxkKHBsYWNlU2hpcHMpO1xyXG4gIHBsYWNlU2hpcHMuYXBwZW5kQ2hpbGQoc2hpcHNUaXRsZSk7XHJcbiAgcGxhY2VTaGlwcy5hcHBlbmRDaGlsZChzaGlwTGlzdCk7XHJcbiAgcGxhY2VTaGlwcy5hcHBlbmRDaGlsZChwbGFjZUluZm8pO1xyXG5cclxuICBkcmF3R3JpZCgpO1xyXG59XHJcblxyXG4vLyBjaGVjayBpZiBhbGwgc2hpcHMgd2VyZSBwbGFjZWQgb24gdGhlIGJvYXJkXHJcbmZ1bmN0aW9uIGFyZUFsbFNoaXBzUGxhY2VkKCkge1xyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzXCIpO1xyXG4gIGNvbnN0IHNoaXBMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLWxpc3RcIik7XHJcbiAgaWYgKHNoaXBMaXN0LmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICBjb25zdCBzdGFydEdhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgc3RhcnRHYW1lLnRleHRDb250ZW50ID0gXCJTdGFydCBnYW1lXCI7XHJcbiAgICBzdGFydEdhbWUuY2xhc3NMaXN0LmFkZChcInN0YXJ0LWdhbWVcIik7XHJcbiAgICBzdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoZWNrUGxhY2VkU2hpcHMpO1xyXG4gICAgY29uc3QgcGxhY2VJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1pbmZvXCIpO1xyXG4gICAgY29uc3QgcGxhY2VJbmZvU3AyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBwbGFjZUluZm9TcDIudGV4dENvbnRlbnQgPVxyXG4gICAgICBcIk9uY2UgeW91J3JlIGhhcHB5IHdpdGggdGhlIHBsYWNlbWVudCBvZiB5b3VyIHNoaXBzLCBjbGljayB0aGUgc3RhcnQgYnV0dG9uIHRvIGJlZ2luIHRoZSBnYW1lIVwiO1xyXG4gICAgcGxhY2VJbmZvLmFwcGVuZENoaWxkKHN0YXJ0R2FtZSk7XHJcbiAgICBwbGFjZUluZm8uYXBwZW5kQ2hpbGQocGxhY2VJbmZvU3AyKTtcclxuICAgIHBsYWNlU2hpcHMuYXBwZW5kQ2hpbGQocGxhY2VJbmZvKTtcclxuICB9XHJcbn1cclxuXHJcbi8vICsrKyBjaGVjayBpZiBhbGwgc2hpcHMgYXJlIHBsYWNlZCBjb3JyZWN0bHlcclxuZnVuY3Rpb24gY2hlY2tQbGFjZWRTaGlwcygpIHtcclxuICBwbGF5R2FtZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbGFjZW1lbnRFcnJvcigpIHtcclxuICBjb25zdCBwbGFjZVNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1zaGlwc1wiKTtcclxuICBjb25zdCBlcnJvck1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZXJyb3JNc2cuY2xhc3NMaXN0LmFkZChcImVycm9yLW1zZ1wiKTtcclxuICBlcnJvck1zZy50ZXh0Q29udGVudCA9XHJcbiAgICBcIlNvbWUgc2hpcHMgZG9uJ3QgZml0IG9uIHRoZSBib2FyZCBvciBvdmVybGFwLiBVc2UgZHJhZyAmIGRyb3AgdG8gbW92ZSB0aGVtIG9yIGRvdWJsZSBjbGljayB0byByb3RhdGUgdGhlbSBiZWZvcmUgeW91IGNhbiBiZWdpbiB0aGUgZ2FtZS5cIjtcclxuICBwbGFjZVNoaXBzLmFwcGVuZENoaWxkKGVycm9yTXNnKTtcclxufVxyXG5cclxuLy8gcGxhY2Ugc2hpcHMgb24gdGhlIHBsYXllcidzIGJvYXJkXHJcbmZ1bmN0aW9uIHBsYWNlU2hpcHMoYm9hcmQpIHtcclxuICAvLyBnZXQgcGxhY2VkIHNoaXBzIGNvb3Jkc1xyXG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzIsIDMsIDQsIDVdO1xyXG4gIGNvbnN0IGZ1bGxTaGlwcyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3RvLXBsYWNlLSR7aX1gKTtcclxuICAgIGNvbnN0IGNvb3JkU3RhcnQgPSBzaGlwLnBhcmVudE5vZGUuaWQ7XHJcbiAgICBjb29yZFN0YXJ0LnNwbGl0KFwiXCIpO1xyXG4gICAgbGV0IHN0YXJ0Um93ID0gcGFyc2VJbnQoY29vcmRTdGFydFsxXSk7XHJcbiAgICBsZXQgc3RhcnRDb2x1bW4gPSBwYXJzZUludChjb29yZFN0YXJ0WzNdKTtcclxuICAgIGxldCBsZW5ndGggPSBwYXJzZUludChzaGlwTGVuZ3Roc1tpXSk7XHJcbiAgICBsZXQgZW5kUm93ID0gc3RhcnRSb3cgKyBsZW5ndGggLSAxO1xyXG4gICAgbGV0IGVuZENvbHVtbiA9IHN0YXJ0Q29sdW1uICsgbGVuZ3RoIC0gMTtcclxuICAgIGxldCBmdWxsQ29vcmRzO1xyXG4gICAgaWYgKHNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxleC10b2dnbGVcIikpIHtcclxuICAgICAgLy9zaGlwIGlzIHZlcnRpY2FsXHJcbiAgICAgIGlmIChlbmRSb3cgPiA5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZnVsbENvb3JkcyA9IGJvYXJkLmdldEZ1bGxDb29yZHMoW1xyXG4gICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2x1bW5dLFxyXG4gICAgICAgIFtlbmRSb3csIHN0YXJ0Q29sdW1uXSxcclxuICAgICAgXSk7XHJcbiAgICAgIGlmIChib2FyZC5jaGVja0lmT2NjdXBpZWQoZnVsbENvb3JkcykgPT0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXl5eVwiKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBib2FyZC5wbGFjZVNoaXAobGVuZ3RoLCBbc3RhcnRSb3csIHN0YXJ0Q29sdW1uXSwgW2VuZFJvdywgc3RhcnRDb2x1bW5dKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHNoaXAgaXMgaG9yaXpvbnRhbFxyXG4gICAgICBpZiAoZW5kQ29sdW1uID4gOSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGZ1bGxDb29yZHMgPSBib2FyZC5nZXRGdWxsQ29vcmRzKFtcclxuICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sdW1uXSxcclxuICAgICAgICBbc3RhcnRSb3csIGVuZENvbHVtbl0sXHJcbiAgICAgIF0pO1xyXG4gICAgICBpZiAoYm9hcmQuY2hlY2tJZk9jY3VwaWVkKGZ1bGxDb29yZHMpID09IHRydWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImF5eXlcIik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgYm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgW3N0YXJ0Um93LCBzdGFydENvbHVtbl0sIFtzdGFydFJvdywgZW5kQ29sdW1uXSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhblBsYWNlRG9tKCkge1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIik7XHJcbiAgd2hpbGUgKG1haW4uZmlyc3RDaGlsZCkge1xyXG4gICAgbWFpbi5yZW1vdmVDaGlsZChtYWluLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlRG9tLCBwcmVwYXJlU2hpcHMsIHBsYWNlU2hpcHMsIGNsZWFuUGxhY2VEb20sIHBsYWNlbWVudEVycm9yIH07XHJcbiIsImltcG9ydCB7IHBsYWNlU2hpcHMsIGNsZWFuUGxhY2VEb20sIHBsYWNlbWVudEVycm9yIH0gZnJvbSBcIi4vZG9tLmpzXCI7XHJcblxyXG5jb25zdCBwb3NzaWJsZVNjb3JlID0gMTU7XHJcblxyXG5jbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgsIGlkKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMuaGl0cyA9IDA7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5oaXRzICs9IDE7XHJcbiAgICB0aGlzLmlzU3VuaygpO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lcikge1xyXG4gICAgdGhpcy5ncmlkID0gdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XHJcbiAgICB0aGlzLnNoaXBzTGlzdCA9IFtdO1xyXG4gICAgdGhpcy5yZWNlaXZlZEhpdHMgPSAwO1xyXG4gICAgdGhpcy5sb3N0R2FtZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaGlwTGVuZ3RocyA9IFsyLCAzLCA0LCA1XTtcclxuICB9XHJcblxyXG4gIHBsYWNlU2hpcChsZW5ndGgsIGNvb3Jkc1N0YXJ0LCBjb29yZHNFbmQpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5zaGlwc0xpc3QubGVuZ3RoO1xyXG4gICAgY29uc3QgcGxhY2VkU2hpcCA9IG5ldyBTaGlwKGxlbmd0aCwgaWQpO1xyXG5cclxuICAgIC8vIGlmIHRoZSBzaGlwJ3MgbGVuZ3RoID4gMiwgbWFyayB0aGUgb3RoZXIgc3F1YXJlcyB0b29cclxuICAgIHRoaXMuc2hpcHNMaXN0LnB1c2gocGxhY2VkU2hpcCk7XHJcbiAgICBpZiAoY29vcmRzU3RhcnRbMF0gIT09IGNvb3Jkc0VuZFswXSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gY29vcmRzU3RhcnRbMF07IGkgPD0gY29vcmRzRW5kWzBdOyBpKyspIHtcclxuICAgICAgICB0aGlzLmdyaWRbaV1bY29vcmRzU3RhcnRbMV1dID0gaWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb29yZHNTdGFydFsxXSAhPT0gY29vcmRzRW5kWzFdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb29yZHNTdGFydFsxXTsgaSA8PSBjb29yZHNFbmRbMV07IGkrKykge1xyXG4gICAgICAgIHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1baV0gPSBpZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1bY29vcmRzU3RhcnRbMV1dID0gaWQ7XHJcbiAgICB0aGlzLmdyaWRbY29vcmRzRW5kWzBdXVtjb29yZHNFbmRbMV1dID0gaWQ7XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvb3Jkc1gsIGNvb3Jkc1kpIHtcclxuICAgIGxldCBpZCA9IHRoaXMuZ3JpZFtjb29yZHNYXVtjb29yZHNZXTtcclxuICAgIGlmIChpZCA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmdyaWRbY29vcmRzWF1bY29vcmRzWV0gPSBcIm1pc3NcIjtcclxuICAgIH0gZWxzZSBpZiAoaWQgPT09IFwibWlzc1wiIHx8IGlkID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHJldHVybiBcImludmFsaWQgbW92ZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGhpdFNoaXAgPSB0aGlzLnNoaXBzTGlzdFtpZF07XHJcbiAgICAgIHRoaXMuZ3JpZFtjb29yZHNYXVtjb29yZHNZXSA9IFwiaGl0XCI7XHJcbiAgICAgIGhpdFNoaXAuaGl0KCk7XHJcbiAgICAgIHRoaXMucmVjZWl2ZWRIaXRzICs9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja0lmTG9zdCgpIHtcclxuICAgIGlmICh0aGlzLnJlY2VpdmVkSGl0cyA+PSBwb3NzaWJsZVNjb3JlKSB7XHJcbiAgICAgIHRoaXMubG9zdEdhbWUgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICBsZXQgZ3JpZEFycmF5ID0gW107XHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcclxuICAgICAgZ3JpZEFycmF5LnB1c2goW10pO1xyXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcclxuICAgICAgICBncmlkQXJyYXlbeV0ucHVzaChudWxsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdyaWRBcnJheTtcclxuICB9XHJcblxyXG4gIC8vIGdlbmVyYXRlIHJhbmRvbSBzaGlwcyBhbmQgcGxhY2UgdGhlbSBvbiB0aGUgZW5lbXkgYm9hcmRcclxuICBnZXRSYW5kb21QbGFjZW1lbnQoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gdGhpcy5zaGlwTGVuZ3Rocy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBjb25zdCBzaGlwTCA9IHBhcnNlSW50KHRoaXMuc2hpcExlbmd0aHNbaV0pO1xyXG4gICAgICBsZXQgY29vcmRzID0gdGhpcy5nZXROZXdDb29yZHMoc2hpcEwpO1xyXG4gICAgICB0aGlzLnBsYWNlU2hpcChcclxuICAgICAgICBzaGlwTCxcclxuICAgICAgICBbY29vcmRzWzBdWzBdLCBjb29yZHNbMF1bMV1dLFxyXG4gICAgICAgIFtjb29yZHNbMV1bMF0sIGNvb3Jkc1sxXVsxXV1cclxuICAgICAgKTtcclxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ncmlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHJ1bnMgZnVuY3Rpb25zIGdlbmVyYXRpbmcgYW5kIGNoZWNraW5nIGlmIG5ldyBjb29yZHMgYXJlIHZhbGlkLCByZXR1cm5zIGNvb3JkcyBmb3Igb25lIHNoaXAgb3IgdXNlcyByZWN1cnNpb24gdG8gc3RhcnQgb3ZlciB0aGUgcHJvY2VzcyBpZiBjb29yZHMgYXJlIGludmFsaWRcclxuICBnZXROZXdDb29yZHMoc2hpcExlbmd0aCkge1xyXG4gICAgbGV0IGNvb3JkcyA9IHRoaXMucmFuZG9taXplQ29vcmRzKHBhcnNlSW50KHNoaXBMZW5ndGgpKTtcclxuICAgIGxldCBmdWxsQ29vcmRzID0gdGhpcy5nZXRGdWxsQ29vcmRzKGNvb3Jkcyk7XHJcbiAgICBsZXQgY29vcmRDaGVjayA9IHRoaXMuY2hlY2tJZk9jY3VwaWVkKGZ1bGxDb29yZHMpO1xyXG4gICAgaWYgKGNvb3JkQ2hlY2sgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybiBjb29yZHM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXROZXdDb29yZHMocGFyc2VJbnQoc2hpcExlbmd0aCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gdXNlcyBtYXRoLnJhbmRvbSB0byBnZXQgcmFuZG9tIGNvb3JkaW5hdGVzIG9uIHRoZSBib2FyZCwgcmFuZG9taXplIHdoZXRlciB0aGUgbmV3IHNoaXAgd2lsbCBiZSB2ZXJ0aWNhbCBvciBob3Jpem9udGFsLCBjYWxjdWxhdGUgdGhhdCBpdCBmaXRzIG9uIHRoZSBib2FyZCBhY2NvcmRpbmcgdG8gdGhlIHNoaXBzIGxlbmd0aFxyXG4gIHJhbmRvbWl6ZUNvb3JkcyhzaGlwTGVuZ3RoKSB7XHJcbiAgICBjb25zdCBzdGFydFJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGNvbnN0IHN0YXJ0Q29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgY29uc3QgZW5kUm93ID0gc3RhcnRSb3cgKyBwYXJzZUludChzaGlwTGVuZ3RoKSAtIDE7XHJcbiAgICBjb25zdCBlbmRDb2wgPSBzdGFydENvbCArIHBhcnNlSW50KHNoaXBMZW5ndGgpIC0gMTtcclxuXHJcbiAgICBpZiAoZW5kUm93IDwgMTAgJiYgZW5kQ29sIDwgMTApIHtcclxuICAgICAgLy9yYW5kb21pemUgLSBob3Jpem9udGFsIG9yIHZlcnRpY2FsXHJcbiAgICAgIGxldCBjaGFuY2UgPSBNYXRoLnJhbmRvbSgpICogMTtcclxuICAgICAgaWYgKGNoYW5jZSA8IDAuNSkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgICAgIFtzdGFydFJvdywgZW5kQ29sXSxcclxuICAgICAgICBdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgICAgIFtlbmRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgICBdO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGVuZENvbCA8IDEwKSB7XHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgW3N0YXJ0Um93LCBzdGFydENvbF0sXHJcbiAgICAgICAgW3N0YXJ0Um93LCBlbmRDb2xdLFxyXG4gICAgICBdO1xyXG4gICAgfSBlbHNlIGlmIChlbmRSb3cgPCAxMCkge1xyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgIFtlbmRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJhbmRvbWl6ZUNvb3JkcyhzaGlwTGVuZ3RoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGdldHMgZnVsbCBjb29yZGluYXRlcyBvZiBldmVyeSBzcXVhcmUgaW4gYSBzaW5nbGUgc2hpcFxyXG4gIGdldEZ1bGxDb29yZHMoY29vcmRzKSB7XHJcbiAgICBsZXQgcm93U3RhcnQgPSBwYXJzZUludChjb29yZHNbMF1bMF0pO1xyXG4gICAgbGV0IGNvbFN0YXJ0ID0gcGFyc2VJbnQoY29vcmRzWzBdWzFdKTtcclxuICAgIGxldCByb3dFbmQgPSBwYXJzZUludChjb29yZHNbMV1bMF0pO1xyXG4gICAgbGV0IGNvbEVuZCA9IHBhcnNlSW50KGNvb3Jkc1sxXVsxXSk7XHJcblxyXG4gICAgbGV0IGZ1bGxDb29yZGluYXRlcyA9IFtdO1xyXG4gICAgaWYgKHJvd1N0YXJ0ICE9PSByb3dFbmQpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IHJvd1N0YXJ0OyBpIDw9IHJvd0VuZDsgaSsrKSB7XHJcbiAgICAgICAgZnVsbENvb3JkaW5hdGVzLnB1c2goW2ksIGNvbFN0YXJ0XSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb2xTdGFydCAhPT0gY29sRW5kKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb2xTdGFydDsgaSA8PSBjb2xFbmQ7IGkrKykge1xyXG4gICAgICAgIGZ1bGxDb29yZGluYXRlcy5wdXNoKFtyb3dTdGFydCwgaV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVsbENvb3JkaW5hdGVzO1xyXG4gIH1cclxuXHJcbiAgLy8gY2hlY2sgaWYgYW55IHNxdWFyZSBvZiB0aGUgbmV3IHNoaXAgaXMgYWxyZWFkeSBvY2N1cGllZDsgaWYgc28sIHNlbmQgaW5mbyB0byBwcmV2aW91cyBmdW5jdGlvbnMgdG8gZ2VuZXJhdGUgbmV3IHNoaXAgY29vcmRpbmF0ZXMgaW5zdGVhZFxyXG4gIGNoZWNrSWZPY2N1cGllZChmdWxsQ29vcmRpbmF0ZXMpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGZ1bGxDb29yZGluYXRlcyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZ1bGxDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgY29vcmQgPSBmdWxsQ29vcmRpbmF0ZXNbaV07XHJcbiAgICAgIGlmICh0aGlzLmdyaWRbcGFyc2VJbnQoY29vcmRbMF0pXVtwYXJzZUludChjb29yZFsxXSldICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjaGVjayAtIG9jY3VwaWVkXCIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBkcmF3R3JpZCgpIHtcclxuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIik7XHJcbiAgICBjb25zdCBhcnJheSA9IHRoaXMuZ3JpZDtcclxuICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICBhcnJheS5mb3JFYWNoKChyb3csIHJpbmRleCkgPT4ge1xyXG4gICAgICByb3cuZm9yRWFjaCgoY29sdW1uLCBjaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcclxuICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHIke3JpbmRleH1jJHtjaW5kZXh9YCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb2x1bW4gPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coY29sdW1uKTtcclxuICAgICAgICAgIGlmICh0aGlzLm93bmVyID09PSBcImh1bWFuXCIpIHtcclxuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJvd24tc2hpcFwiKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZW5lbXktc2hpcFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gXCJoaXRcIikge1xyXG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLm93bmVyID09PSBcImh1bWFuXCIpIHtcclxuICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1vd25cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBncmlkLmNsYXNzTGlzdC5hZGQoXCJncmlkLWVuZW15XCIpO1xyXG4gICAgfVxyXG4gICAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZFwiKTtcclxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZ3JpZCk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG93bmVyKSB7XHJcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5R2FtZSgpIHtcclxuICBjb25zdCBwbGF5ZXJBID0gbmV3IFBsYXllcihcImh1bWFuXCIpO1xyXG4gIGNvbnN0IHBsYXllckIgPSBuZXcgUGxheWVyKFwiQUlcIik7XHJcbiAgY29uc3QgYm9hcmRBID0gbmV3IEdhbWVib2FyZChcImh1bWFuXCIpO1xyXG4gIGNvbnN0IGJvYXJkQiA9IG5ldyBHYW1lYm9hcmQoXCJBSVwiKTtcclxuXHJcbiAgbGV0IGNoZWNrUGxhY2VkID0gcGxhY2VTaGlwcyhib2FyZEEpO1xyXG4gIGlmIChjaGVja1BsYWNlZCA9PT0gdHJ1ZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJ0cnVlZVwiKTtcclxuICAgIHJldHVybiBwbGFjZW1lbnRFcnJvcigpO1xyXG4gIH1cclxuICBjbGVhblBsYWNlRG9tKCk7XHJcbiAgYm9hcmRBLmRyYXdHcmlkKCk7XHJcbiAgYm9hcmRCLmdldFJhbmRvbVBsYWNlbWVudCgpO1xyXG4gIGJvYXJkQi5kcmF3R3JpZCgpO1xyXG4gIGNvbnNvbGUubG9nKGJvYXJkQi5ncmlkKTtcclxufVxyXG5cclxuZXhwb3J0IHsgU2hpcCwgR2FtZWJvYXJkLCBQbGF5ZXIsIHBsYXlHYW1lIH07XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Q2luemVsOndnaHRAODAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKiB7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBtYXJnaW46IDBweDtcclxuICBwYWRkaW5nOiAwcHg7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZDFlMjY7XHJcbiAgY29sb3I6ICNkY2E4NWQ7XHJcbn1cclxuXHJcbi5oZWFkZXIge1xyXG4gIG1hcmdpbjogMTJweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4uaGVhZGVyID4gc3BhbiB7XHJcbiAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgZm9udC1mYW1pbHk6ICdDaW56ZWwnLCBzZXJpZjtcclxuICB0ZXh0LXNoYWRvdzogIzNjM2Q1MSAwcHggLTEwcHggNnB4LCAycHggMnB4IDJweCAjNWY1NjFiO1xyXG4gIGJvcmRlci1ib3R0b206ICNkY2E4NWQgMnB4IHNvbGlkO1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxufVxyXG5cclxuLm1haW4ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5ncmlkIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyOHB4KTtcclxuICBjb2x1bW4tZ2FwOiAwcHg7XHJcbiAgcm93LWdhcDogMHB4O1xyXG4gIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIG1hcmdpbjogMCAxMnB4O1xyXG59XHJcblxyXG4uc3F1YXJlIHtcclxuICB3aWR0aDogMjhweDtcclxuICBoZWlnaHQ6IDI4cHg7XHJcbiAgYm9yZGVyOiAxcHggI2RjYTg1ZCBzb2xpZDtcclxuICBtYXJnaW46IDBweDtcclxufVxyXG5cclxuLnNxdWFyZUIge1xyXG4gIGJhY2tncm91bmQ6ICMyMzRlNjY7XHJcbn1cclxuXHJcbi5taXNzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xyXG59XHJcblxyXG4uaGl0IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCA5OCwgMjA1KTtcclxufVxyXG5cclxuI2RpdjEge1xyXG4gIHdpZHRoOiAzNTBweDtcclxuICBoZWlnaHQ6IDcwcHg7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjYWFhYWFhO1xyXG59XHJcblxyXG4ub3duLWJvYXJkIHtcclxuICBtYXJnaW46IDZweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB3aWR0aDogMzAwcHg7XHJcbn1cclxuXHJcbi5wbGFjZS1zaGlwcyB7XHJcbiAgbWFyZ2luOiA2cHggMjRweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgd2lkdGg6IDMwMHB4O1xyXG59XHJcblxyXG4ucGxhY2Utc2hpcHMgPiBzcGFuLCAub3duLWJvYXJkID4gc3BhbiB7XHJcbiAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcblxyXG4uc2hpcC1kaXYge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luOiA0cHg7XHJcbn1cclxuXHJcbi5zaGlwLW9uLWJvYXJkIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbn1cclxuXHJcbi5zaGlwc3Ege1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1NiA5IDEzNSk7XHJcbn1cclxuXHJcbi5zcTAtdG8tcGxhY2U6aG92ZXIge1xyXG4gIGN1cnNvcjogZ3JhYjtcclxufVxyXG5cclxuLmZsZXgtdG9nZ2xlIHtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4ucGxhY2UtaW5mbyB7XHJcbiAgbWFyZ2luLXRvcDogNnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG5cclxuLnN0YXJ0LWdhbWUge1xyXG4gIG1hcmdpbjogMTBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTEzNjRhO1xyXG4gIGNvbG9yOiAjZGNhODVkO1xyXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XHJcbiAgcGFkZGluZzogNnB4IDE4cHg7XHJcbiAgZm9udC1zaXplOiAxLjJyZW07XHJcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG59XHJcblxyXG4uc3RhcnQtZ2FtZTpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5zdGFydC1nYW1lOmFjdGl2ZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU2IDkgMTM1KTtcclxufVxyXG5cclxuLm93bi1zaGlwIHtcclxuICBiYWNrZ3JvdW5kOiAjMTI1M2Q2O1xyXG59XHJcblxyXG4uZ3JpZC1lbmVteSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU4LCAzOSwgMTA0KTtcclxufVxyXG5cclxuLmdyaWQtb3duIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjM0ZTY2O1xyXG59XHJcblxyXG4uZ3JpZC1wbGFjZS1vd24ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzRlNjY7XHJcbn1cclxuXHJcbi5lbmVteS1zaGlwIHtcclxuICBiYWNrZ3JvdW5kOiByZ2IoMTc1LCAxMywgNDApO1xyXG59XHJcblxyXG4uZXJyb3ItbXNnIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTgsIDM5LCAxMDQpO1xyXG4gIG1hcmdpbjogOHB4IDBweDtcclxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xyXG4gIHBhZGRpbmc6IDZweDtcclxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQiw0QkFBNEI7RUFDNUIsdURBQXVEO0VBQ3ZELGdDQUFnQztFQUNoQyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxlQUFlO0VBQ2YsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osYUFBYTtFQUNiLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsY0FBYztFQUNkLHlCQUF5QjtFQUN6QixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0Usa0NBQWtDO0VBQ2xDLGVBQWU7RUFDZix5QkFBeUI7RUFDekIsWUFBWTtBQUNkXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUNpbnplbDp3Z2h0QDgwMCZkaXNwbGF5PXN3YXAnKTtcXHJcXG5cXHJcXG4qIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBtYXJnaW46IDBweDtcXHJcXG4gIHBhZGRpbmc6IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGQxZTI2O1xcclxcbiAgY29sb3I6ICNkY2E4NWQ7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIge1xcclxcbiAgbWFyZ2luOiAxMnB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyID4gc3BhbiB7XFxyXFxuICBmb250LXNpemU6IDIuNXJlbTtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnQ2luemVsJywgc2VyaWY7XFxyXFxuICB0ZXh0LXNoYWRvdzogIzNjM2Q1MSAwcHggLTEwcHggNnB4LCAycHggMnB4IDJweCAjNWY1NjFiO1xcclxcbiAgYm9yZGVyLWJvdHRvbTogI2RjYTg1ZCAycHggc29saWQ7XFxyXFxuICBtYXJnaW4tYm90dG9tOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5tYWluIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdyaWQge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyOHB4KTtcXHJcXG4gIGNvbHVtbi1nYXA6IDBweDtcXHJcXG4gIHJvdy1nYXA6IDBweDtcXHJcXG4gIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxyXFxuICBmb250LXNpemU6IDEycHg7XFxyXFxuICBtYXJnaW46IDAgMTJweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNxdWFyZSB7XFxyXFxuICB3aWR0aDogMjhweDtcXHJcXG4gIGhlaWdodDogMjhweDtcXHJcXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XFxyXFxuICBtYXJnaW46IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNxdWFyZUIge1xcclxcbiAgYmFja2dyb3VuZDogIzIzNGU2NjtcXHJcXG59XFxyXFxuXFxyXFxuLm1pc3Mge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpdCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCA5OCwgMjA1KTtcXHJcXG59XFxyXFxuXFxyXFxuI2RpdjEge1xcclxcbiAgd2lkdGg6IDM1MHB4O1xcclxcbiAgaGVpZ2h0OiA3MHB4O1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNhYWFhYWE7XFxyXFxufVxcclxcblxcclxcbi5vd24tYm9hcmQge1xcclxcbiAgbWFyZ2luOiA2cHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICB3aWR0aDogMzAwcHg7XFxyXFxufVxcclxcblxcclxcbi5wbGFjZS1zaGlwcyB7XFxyXFxuICBtYXJnaW46IDZweCAyNHB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB3aWR0aDogMzAwcHg7XFxyXFxufVxcclxcblxcclxcbi5wbGFjZS1zaGlwcyA+IHNwYW4sIC5vd24tYm9hcmQgPiBzcGFuIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1kaXYge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIG1hcmdpbjogNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1vbi1ib2FyZCB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBtYXJnaW46IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXBzcSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYgOSAxMzUpO1xcclxcbn1cXHJcXG5cXHJcXG4uc3EwLXRvLXBsYWNlOmhvdmVyIHtcXHJcXG4gIGN1cnNvcjogZ3JhYjtcXHJcXG59XFxyXFxuXFxyXFxuLmZsZXgtdG9nZ2xlIHtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5wbGFjZS1pbmZvIHtcXHJcXG4gIG1hcmdpbi10b3A6IDZweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhcnQtZ2FtZSB7XFxyXFxuICBtYXJnaW46IDEwcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTEzNjRhO1xcclxcbiAgY29sb3I6ICNkY2E4NWQ7XFxyXFxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xcclxcbiAgcGFkZGluZzogNnB4IDE4cHg7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXJ0LWdhbWU6aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXJ0LWdhbWU6YWN0aXZlIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1NiA5IDEzNSk7XFxyXFxufVxcclxcblxcclxcbi5vd24tc2hpcCB7XFxyXFxuICBiYWNrZ3JvdW5kOiAjMTI1M2Q2O1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JpZC1lbmVteSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTgsIDM5LCAxMDQpO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JpZC1vd24ge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcXHJcXG59XFxyXFxuXFxyXFxuLmdyaWQtcGxhY2Utb3duIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzRlNjY7XFxyXFxufVxcclxcblxcclxcbi5lbmVteS1zaGlwIHtcXHJcXG4gIGJhY2tncm91bmQ6IHJnYigxNzUsIDEzLCA0MCk7XFxyXFxufVxcclxcblxcclxcbi5lcnJvci1tc2cge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU4LCAzOSwgMTA0KTtcXHJcXG4gIG1hcmdpbjogOHB4IDBweDtcXHJcXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XFxyXFxuICBwYWRkaW5nOiA2cHg7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBjcmVhdGVEb20sIHByZXBhcmVTaGlwcywgY2xlYW5QbGFjZURvbSB9IGZyb20gXCIuL2RvbS5qc1wiO1xyXG5pbXBvcnQgeyBQbGF5ZXIsIEdhbWVib2FyZCwgcGxheUdhbWUgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XHJcbmltcG9ydCBjc3MgZnJvbSBcIi4vc3R5bGUuY3NzXCI7XHJcblxyXG5jcmVhdGVEb20oKTtcclxucHJlcGFyZVNoaXBzKCk7XHJcblxyXG4vKiBmb3IgdGVzdHMgLSBzaG93IG9ubHkgZW5lbXkgYm9hcmRcclxuY2xlYW5QbGFjZURvbSgpO1xyXG5jb25zdCBwbGF5ZXJCID0gbmV3IFBsYXllcihcIkFJXCIpO1xyXG5jb25zdCBib2FyZEIgPSBuZXcgR2FtZWJvYXJkKFwiQUlcIik7XHJcbmJvYXJkQi5yYW5kb21pemVQbGFjZW1lbnQoKTtcclxuYm9hcmRCLmRyYXdHcmlkKCk7XHJcbiovXHJcbiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJQbGF5ZXIiLCJwbGF5R2FtZSIsImFsbG93RHJvcCIsImV2IiwicHJldmVudERlZmF1bHQiLCJkcmFnIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInRhcmdldCIsImlkIiwiZHJvcCIsImRhdGEiLCJnZXREYXRhIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwiZHJhZ0VuZCIsImFyZUFsbFNoaXBzUGxhY2VkIiwiY3JlYXRlR3JpZCIsImdyaWRBcnJheSIsIngiLCJwdXNoIiwieSIsImRyYXdHcmlkIiwib3duQm9hcmQiLCJxdWVyeVNlbGVjdG9yIiwiYXJyYXkiLCJib2R5IiwiZ3JpZCIsImNyZWF0ZUVsZW1lbnQiLCJmb3JFYWNoIiwicm93IiwicmluZGV4IiwiY2VsbCIsImNpbmRleCIsInNxdWFyZSIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjcmVhdGVEb20iLCJoZWFkZXIiLCJtYWluIiwiZm9vdGVyIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsInByZXBhcmVTaGlwcyIsIm93bkJvYXJkVGl0bGUiLCJwbGFjZVNoaXBzIiwic2hpcHNUaXRsZSIsInNoaXBMaXN0Iiwic2hpcExlbmd0aHMiLCJpdGVtIiwiaW5kZXgiLCJzaGlwRGl2IiwiaSIsInNoaXBTcSIsInRvZ2dsZSIsInBsYWNlSW5mbyIsInBsYWNlSW5mb1NwIiwiY2hpbGROb2RlcyIsImxlbmd0aCIsInN0YXJ0R2FtZSIsImNoZWNrUGxhY2VkU2hpcHMiLCJwbGFjZUluZm9TcDIiLCJwbGFjZW1lbnRFcnJvciIsImVycm9yTXNnIiwiYm9hcmQiLCJmdWxsU2hpcHMiLCJzaGlwIiwiY29vcmRTdGFydCIsInBhcmVudE5vZGUiLCJzcGxpdCIsInN0YXJ0Um93IiwicGFyc2VJbnQiLCJzdGFydENvbHVtbiIsImVuZFJvdyIsImVuZENvbHVtbiIsImZ1bGxDb29yZHMiLCJjb250YWlucyIsImdldEZ1bGxDb29yZHMiLCJjaGVja0lmT2NjdXBpZWQiLCJjb25zb2xlIiwibG9nIiwicGxhY2VTaGlwIiwiY2xlYW5QbGFjZURvbSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsInBvc3NpYmxlU2NvcmUiLCJTaGlwIiwiY29uc3RydWN0b3IiLCJoaXRzIiwiZGVzdHJveWVkIiwiaGl0IiwiaXNTdW5rIiwib3duZXIiLCJzaGlwc0xpc3QiLCJyZWNlaXZlZEhpdHMiLCJsb3N0R2FtZSIsImNvb3Jkc1N0YXJ0IiwiY29vcmRzRW5kIiwicGxhY2VkU2hpcCIsInJlY2VpdmVBdHRhY2siLCJjb29yZHNYIiwiY29vcmRzWSIsImhpdFNoaXAiLCJjaGVja0lmTG9zdCIsImdldFJhbmRvbVBsYWNlbWVudCIsInNoaXBMIiwiY29vcmRzIiwiZ2V0TmV3Q29vcmRzIiwic2hpcExlbmd0aCIsInJhbmRvbWl6ZUNvb3JkcyIsImNvb3JkQ2hlY2siLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzdGFydENvbCIsImVuZENvbCIsImNoYW5jZSIsInJvd1N0YXJ0IiwiY29sU3RhcnQiLCJyb3dFbmQiLCJjb2xFbmQiLCJmdWxsQ29vcmRpbmF0ZXMiLCJjb29yZCIsImNvbHVtbiIsInBsYXllckEiLCJwbGF5ZXJCIiwiYm9hcmRBIiwiYm9hcmRCIiwiY2hlY2tQbGFjZWQiLCJjc3MiXSwic291cmNlUm9vdCI6IiJ9