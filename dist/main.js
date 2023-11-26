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

  // attack(coords) {
  //   this.receiveAttack(coords);

  // }

  receiveAttack(coords) {
    let id = this.grid[coords[0]][coords[1]];
    console.log(id);
    const square = document.querySelector(`#r${coords[0]}c${coords[1]}`);
    if (id === null) {
      this.grid[coords[0]][coords[1]] = "miss";
      square.classList.add("enemy-miss");
    } else if (id === "miss" || id === "hit") {
      console.log("invalid move");
      return "invalid move";
    } else {
      square.classList.add("enemy-hit");
      let hitShip = this.shipsList[id];
      this.grid[coords[0]][coords[1]] = "hit";
      hitShip.hit();
      this.receivedHits += 1;
    }
    console.log(this.grid);
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
        if (this.owner === "human") {
          square.classList.add("square");
        } else if (this.owner === "AI") {
          square.classList.add("enemy-square");
          square.addEventListener("click", () => {
            this.receiveAttack([rindex, cindex]);
          });
        }
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

.square, .enemy-square {
  width: 28px;
  height: 28px;
  border: 1px #dca85d solid;
  margin: 0px;
}

.enemy-square:hover {
  cursor: pointer;
}

.enemy-hit {
  background-color: darkgreen;
}

.enemy-miss {
  background-color: grey;
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,4BAA4B;EAC5B,uDAAuD;EACvD,gCAAgC;EAChC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,eAAe;EACf,YAAY;EACZ,sBAAsB;EACtB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,WAAW;AACb;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,yBAAyB;EACzB,cAAc;EACd,yBAAyB;EACzB,iBAAiB;EACjB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,kCAAkC;EAClC,eAAe;EACf,yBAAyB;EACzB,YAAY;AACd","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@800&display=swap');\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  margin: 0px;\r\n  padding: 0px;\r\n}\r\n\r\nbody {\r\n  background-color: #0d1e26;\r\n  color: #dca85d;\r\n}\r\n\r\n.header {\r\n  margin: 12px;\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.header > span {\r\n  font-size: 2.5rem;\r\n  font-family: 'Cinzel', serif;\r\n  text-shadow: #3c3d51 0px -10px 6px, 2px 2px 2px #5f561b;\r\n  border-bottom: #dca85d 2px solid;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.main {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 28px);\r\n  column-gap: 0px;\r\n  row-gap: 0px;\r\n  justify-items: stretch;\r\n  font-size: 12px;\r\n  margin: 0 12px;\r\n}\r\n\r\n.square, .enemy-square {\r\n  width: 28px;\r\n  height: 28px;\r\n  border: 1px #dca85d solid;\r\n  margin: 0px;\r\n}\r\n\r\n.enemy-square:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.enemy-hit {\r\n  background-color: darkgreen;\r\n}\r\n\r\n.enemy-miss {\r\n  background-color: grey;\r\n}\r\n\r\n.squareB {\r\n  background: #234e66;\r\n}\r\n\r\n.miss {\r\n  background-color: grey;\r\n}\r\n\r\n.hit {\r\n  background-color: rgb(255, 98, 205);\r\n}\r\n\r\n#div1 {\r\n  width: 350px;\r\n  height: 70px;\r\n  padding: 10px;\r\n  border: 1px solid #aaaaaa;\r\n}\r\n\r\n.own-board {\r\n  margin: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 300px;\r\n}\r\n\r\n.place-ships {\r\n  margin: 6px 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 300px;\r\n}\r\n\r\n.place-ships > span, .own-board > span {\r\n  font-size: 1.5rem;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.ship-div {\r\n  display: flex;\r\n  margin: 4px;\r\n}\r\n\r\n.ship-on-board {\r\n  position: absolute;\r\n  margin: 0px;\r\n}\r\n\r\n.shipsq {\r\n  background-color: rgb(56 9 135);\r\n}\r\n\r\n.sq0-to-place:hover {\r\n  cursor: grab;\r\n}\r\n\r\n.flex-toggle {\r\n  flex-direction: column;\r\n}\r\n\r\n.place-info {\r\n  margin-top: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.start-game {\r\n  margin: 10px;\r\n  background-color: #11364a;\r\n  color: #dca85d;\r\n  border: 1px #dca85d solid;\r\n  padding: 6px 18px;\r\n  font-size: 1.2rem;\r\n  align-self: center;\r\n}\r\n\r\n.start-game:hover {\r\n  background-color: #234e66;\r\n  cursor: pointer;\r\n}\r\n\r\n.start-game:active {\r\n  background-color: rgb(56 9 135);\r\n}\r\n\r\n.own-ship {\r\n  background: #1253d6;\r\n}\r\n\r\n.grid-enemy {\r\n  background-color: rgb(58, 39, 104);\r\n}\r\n\r\n.grid-own {\r\n  background-color: #234e66;\r\n}\r\n\r\n.grid-place-own {\r\n  background-color: #234e66;\r\n}\r\n\r\n.enemy-ship {\r\n  background: rgb(175, 13, 40);\r\n}\r\n\r\n.error-msg {\r\n  background-color: rgb(58, 39, 104);\r\n  margin: 8px 0px;\r\n  border: 1px #dca85d solid;\r\n  padding: 6px;\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sZ0ZBQWdGLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFV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Q0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNiQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7QUNBa0U7QUFDVjtBQUMxQjtBQUU5QlUsa0RBQVMsQ0FBQyxDQUFDO0FBQ1hNLHFEQUFZLENBQUMsQ0FBQzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZWJvYXJkLCBQbGF5ZXIsIHBsYXlHYW1lIH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xyXG5cclxuZnVuY3Rpb24gYWxsb3dEcm9wKGV2KSB7XHJcbiAgZXYucHJldmVudERlZmF1bHQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhZyhldikge1xyXG4gIGV2LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBldi50YXJnZXQuaWQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcm9wKGV2KSB7XHJcbiAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICB2YXIgZGF0YSA9IGV2LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhKS5jbGFzc0xpc3QuYWRkKFwic2hpcC1vbi1ib2FyZFwiKTtcclxuICBldi50YXJnZXQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFnRW5kKGV2KSB7XHJcbiAgYXJlQWxsU2hpcHNQbGFjZWQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcclxuICBsZXQgZ3JpZEFycmF5ID0gW107XHJcbiAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XHJcbiAgICBncmlkQXJyYXkucHVzaChbXSk7XHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcclxuICAgICAgZ3JpZEFycmF5W3hdLnB1c2gobnVsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBncmlkQXJyYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdHcmlkKCkge1xyXG4gIGNvbnN0IG93bkJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vd24tYm9hcmRcIik7XHJcbiAgY29uc3QgYXJyYXkgPSBjcmVhdGVHcmlkKCk7XHJcblxyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgYXJyYXkuZm9yRWFjaCgocm93LCByaW5kZXgpID0+IHtcclxuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjaW5kZXgpID0+IHtcclxuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XHJcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgciR7cmluZGV4fWMke2NpbmRleH1gKTtcclxuICAgICAgaWYgKGNlbGwgPT09IFwic2hpcFwiKSB7XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjZWxsID09PSBcIm1pc3NcIikge1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wKTtcclxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBhbGxvd0Ryb3ApO1xyXG4gICAgICBncmlkLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZFwiKTtcclxuICBncmlkLmNsYXNzTGlzdC5hZGQoXCJncmlkLXBsYWNlLW93blwiKTtcclxuICBvd25Cb2FyZC5hcHBlbmRDaGlsZChncmlkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRG9tKCkge1xyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpO1xyXG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBzXCI7XHJcblxyXG4gIG1haW4uY2xhc3NMaXN0LmFkZChcIm1haW5cIik7XHJcbiAgLy8gY29uc3QgZW5lbXlCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgLy8gY29uc3QgZW5lbXlCb2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAvLyBlbmVteUJvYXJkVGl0bGUudGV4dENvbnRlbnQgPSBcIkVuZW15IGJvYXJkXCI7XHJcblxyXG4gIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgLy8gbWFpbi5hcHBlbmRDaGlsZChlbmVteUJvYXJkKTtcclxuICAvLyBlbmVteUJvYXJkLmFwcGVuZENoaWxkKGVuZW15Qm9hcmRUaXRsZSk7XHJcblxyXG4gIGJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xyXG4gIGJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZVNoaXBzKCkge1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIik7XHJcbiAgY29uc3Qgb3duQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IG93bkJvYXJkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICBvd25Cb2FyZC5jbGFzc0xpc3QuYWRkKFwib3duLWJvYXJkXCIpO1xyXG4gIG93bkJvYXJkVGl0bGUudGV4dENvbnRlbnQgPSBcIllvdXIgYm9hcmRcIjtcclxuXHJcbiAgY29uc3QgcGxhY2VTaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgcGxhY2VTaGlwcy5jbGFzc0xpc3QuYWRkKFwicGxhY2Utc2hpcHNcIik7XHJcbiAgY29uc3Qgc2hpcHNUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIHNoaXBzVGl0bGUudGV4dENvbnRlbnQgPSBcIlBsYWNlIHlvdXIgc2hpcHNcIjtcclxuXHJcbiAgY29uc3Qgc2hpcExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHNoaXBMaXN0LmNsYXNzTGlzdC5hZGQoXCJzaGlwLWxpc3RcIik7XHJcblxyXG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzIsIDMsIDQsIDVdO1xyXG4gIHNoaXBMZW5ndGhzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCBzaGlwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHNoaXBEaXYuY2xhc3NMaXN0LmFkZChcInNoaXAtZGl2XCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtOyBpKyspIHtcclxuICAgICAgY29uc3Qgc2hpcFNxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgLy8gc2hpcFNxLnNldEF0dHJpYnV0ZShcImlkXCIsIGBzcTAtdG8tcGxhY2UtJHtpbmRleH1gKTtcclxuICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICBzaGlwU3EuY2xhc3NMaXN0LmFkZChcInNxMC10by1wbGFjZVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2hpcFNxLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XHJcbiAgICAgIHNoaXBTcS5jbGFzc0xpc3QuYWRkKFwib3duLXNoaXBcIik7XHJcblxyXG4gICAgICBzaGlwRGl2LmFwcGVuZENoaWxkKHNoaXBTcSk7XHJcbiAgICB9XHJcbiAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XHJcbiAgICBzaGlwRGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGB0by1wbGFjZS0ke2luZGV4fWApO1xyXG5cclxuICAgIC8vIG5lZWQgdG8gaGFuZGxlIGVycm9yIC0gd2hlbiB0aGUgaXRlbSBpcyBkcmFnZ2VkIGluIHRoZSBtaWRkbGUgb2YgdHdvIHNxdWFyZXNcclxuICAgIHNoaXBEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnKTtcclxuICAgIHNoaXBEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0VuZCk7XHJcbiAgICBzaGlwRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHNoaXBEaXYuY2xhc3NMaXN0LnRvZ2dsZShcImZsZXgtdG9nZ2xlXCIpO1xyXG4gICAgfSk7XHJcbiAgICBzaGlwTGlzdC5hcHBlbmRDaGlsZChzaGlwRGl2KTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcGxhY2VJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBwbGFjZUluZm9TcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHBsYWNlSW5mby5jbGFzc0xpc3QuYWRkKFwicGxhY2UtaW5mb1wiKTtcclxuICBwbGFjZUluZm9TcC50ZXh0Q29udGVudCA9XHJcbiAgICBcIkRyYWcgJiBkcm9wIHRoZSBzaGlwcyBvbiB0aGUgYm9hcmQuIERvdWJsZWNsaWNrIGEgc2hpcCB0byByb3RhdGUgaXQuXCI7XHJcbiAgcGxhY2VJbmZvLmFwcGVuZENoaWxkKHBsYWNlSW5mb1NwKTtcclxuICBtYWluLmFwcGVuZENoaWxkKG93bkJvYXJkKTtcclxuICBvd25Cb2FyZC5hcHBlbmRDaGlsZChvd25Cb2FyZFRpdGxlKTtcclxuICBtYWluLmFwcGVuZENoaWxkKHBsYWNlU2hpcHMpO1xyXG4gIHBsYWNlU2hpcHMuYXBwZW5kQ2hpbGQoc2hpcHNUaXRsZSk7XHJcbiAgcGxhY2VTaGlwcy5hcHBlbmRDaGlsZChzaGlwTGlzdCk7XHJcbiAgcGxhY2VTaGlwcy5hcHBlbmRDaGlsZChwbGFjZUluZm8pO1xyXG5cclxuICBkcmF3R3JpZCgpO1xyXG59XHJcblxyXG4vLyBjaGVjayBpZiBhbGwgc2hpcHMgd2VyZSBwbGFjZWQgb24gdGhlIGJvYXJkXHJcbmZ1bmN0aW9uIGFyZUFsbFNoaXBzUGxhY2VkKCkge1xyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzXCIpO1xyXG4gIGNvbnN0IHNoaXBMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLWxpc3RcIik7XHJcbiAgaWYgKHNoaXBMaXN0LmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICBjb25zdCBzdGFydEdhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgc3RhcnRHYW1lLnRleHRDb250ZW50ID0gXCJTdGFydCBnYW1lXCI7XHJcbiAgICBzdGFydEdhbWUuY2xhc3NMaXN0LmFkZChcInN0YXJ0LWdhbWVcIik7XHJcbiAgICBzdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoZWNrUGxhY2VkU2hpcHMpO1xyXG4gICAgY29uc3QgcGxhY2VJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1pbmZvXCIpO1xyXG4gICAgY29uc3QgcGxhY2VJbmZvU3AyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBwbGFjZUluZm9TcDIudGV4dENvbnRlbnQgPVxyXG4gICAgICBcIk9uY2UgeW91J3JlIGhhcHB5IHdpdGggdGhlIHBsYWNlbWVudCBvZiB5b3VyIHNoaXBzLCBjbGljayB0aGUgc3RhcnQgYnV0dG9uIHRvIGJlZ2luIHRoZSBnYW1lIVwiO1xyXG4gICAgcGxhY2VJbmZvLmFwcGVuZENoaWxkKHN0YXJ0R2FtZSk7XHJcbiAgICBwbGFjZUluZm8uYXBwZW5kQ2hpbGQocGxhY2VJbmZvU3AyKTtcclxuICAgIHBsYWNlU2hpcHMuYXBwZW5kQ2hpbGQocGxhY2VJbmZvKTtcclxuICB9XHJcbn1cclxuXHJcbi8vICsrKyBjaGVjayBpZiBhbGwgc2hpcHMgYXJlIHBsYWNlZCBjb3JyZWN0bHlcclxuZnVuY3Rpb24gY2hlY2tQbGFjZWRTaGlwcygpIHtcclxuICBwbGF5R2FtZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbGFjZW1lbnRFcnJvcigpIHtcclxuICBjb25zdCBwbGFjZVNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1zaGlwc1wiKTtcclxuICBjb25zdCBlcnJvck1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZXJyb3JNc2cuY2xhc3NMaXN0LmFkZChcImVycm9yLW1zZ1wiKTtcclxuICBlcnJvck1zZy50ZXh0Q29udGVudCA9XHJcbiAgICBcIlNvbWUgc2hpcHMgZG9uJ3QgZml0IG9uIHRoZSBib2FyZCBvciBvdmVybGFwLiBVc2UgZHJhZyAmIGRyb3AgdG8gbW92ZSB0aGVtIG9yIGRvdWJsZSBjbGljayB0byByb3RhdGUgdGhlbSBiZWZvcmUgeW91IGNhbiBiZWdpbiB0aGUgZ2FtZS5cIjtcclxuICBwbGFjZVNoaXBzLmFwcGVuZENoaWxkKGVycm9yTXNnKTtcclxufVxyXG5cclxuLy8gcGxhY2Ugc2hpcHMgb24gdGhlIHBsYXllcidzIGJvYXJkXHJcbmZ1bmN0aW9uIHBsYWNlU2hpcHMoYm9hcmQpIHtcclxuICAvLyBnZXQgcGxhY2VkIHNoaXBzIGNvb3Jkc1xyXG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzIsIDMsIDQsIDVdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3RvLXBsYWNlLSR7aX1gKTtcclxuICAgIGNvbnN0IGNvb3JkU3RhcnQgPSBzaGlwLnBhcmVudE5vZGUuaWQ7XHJcbiAgICBjb29yZFN0YXJ0LnNwbGl0KFwiXCIpO1xyXG4gICAgbGV0IHN0YXJ0Um93ID0gcGFyc2VJbnQoY29vcmRTdGFydFsxXSk7XHJcbiAgICBsZXQgc3RhcnRDb2x1bW4gPSBwYXJzZUludChjb29yZFN0YXJ0WzNdKTtcclxuICAgIGxldCBsZW5ndGggPSBwYXJzZUludChzaGlwTGVuZ3Roc1tpXSk7XHJcbiAgICBsZXQgZW5kUm93ID0gc3RhcnRSb3cgKyBsZW5ndGggLSAxO1xyXG4gICAgbGV0IGVuZENvbHVtbiA9IHN0YXJ0Q29sdW1uICsgbGVuZ3RoIC0gMTtcclxuICAgIGxldCBmdWxsQ29vcmRzO1xyXG4gICAgaWYgKHNoaXAuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxleC10b2dnbGVcIikpIHtcclxuICAgICAgLy9zaGlwIGlzIHZlcnRpY2FsXHJcbiAgICAgIGlmIChlbmRSb3cgPiA5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZnVsbENvb3JkcyA9IGJvYXJkLmdldEZ1bGxDb29yZHMoW1xyXG4gICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2x1bW5dLFxyXG4gICAgICAgIFtlbmRSb3csIHN0YXJ0Q29sdW1uXSxcclxuICAgICAgXSk7XHJcbiAgICAgIGlmIChib2FyZC5jaGVja0lmT2NjdXBpZWQoZnVsbENvb3JkcykgPT0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXl5eVwiKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBib2FyZC5wbGFjZVNoaXAobGVuZ3RoLCBbc3RhcnRSb3csIHN0YXJ0Q29sdW1uXSwgW2VuZFJvdywgc3RhcnRDb2x1bW5dKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHNoaXAgaXMgaG9yaXpvbnRhbFxyXG4gICAgICBpZiAoZW5kQ29sdW1uID4gOSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGZ1bGxDb29yZHMgPSBib2FyZC5nZXRGdWxsQ29vcmRzKFtcclxuICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sdW1uXSxcclxuICAgICAgICBbc3RhcnRSb3csIGVuZENvbHVtbl0sXHJcbiAgICAgIF0pO1xyXG4gICAgICBpZiAoYm9hcmQuY2hlY2tJZk9jY3VwaWVkKGZ1bGxDb29yZHMpID09IHRydWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImF5eXlcIik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgYm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgW3N0YXJ0Um93LCBzdGFydENvbHVtbl0sIFtzdGFydFJvdywgZW5kQ29sdW1uXSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhblBsYWNlRG9tKCkge1xyXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIik7XHJcbiAgd2hpbGUgKG1haW4uZmlyc3RDaGlsZCkge1xyXG4gICAgbWFpbi5yZW1vdmVDaGlsZChtYWluLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlRG9tLCBwcmVwYXJlU2hpcHMsIHBsYWNlU2hpcHMsIGNsZWFuUGxhY2VEb20sIHBsYWNlbWVudEVycm9yIH07XHJcbiIsImltcG9ydCB7IHBsYWNlU2hpcHMsIGNsZWFuUGxhY2VEb20sIHBsYWNlbWVudEVycm9yIH0gZnJvbSBcIi4vZG9tLmpzXCI7XHJcblxyXG5jb25zdCBwb3NzaWJsZVNjb3JlID0gMTU7XHJcblxyXG5jbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgsIGlkKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMuaGl0cyA9IDA7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5oaXRzICs9IDE7XHJcbiAgICB0aGlzLmlzU3VuaygpO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lcikge1xyXG4gICAgdGhpcy5ncmlkID0gdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XHJcbiAgICB0aGlzLnNoaXBzTGlzdCA9IFtdO1xyXG4gICAgdGhpcy5yZWNlaXZlZEhpdHMgPSAwO1xyXG4gICAgdGhpcy5sb3N0R2FtZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaGlwTGVuZ3RocyA9IFsyLCAzLCA0LCA1XTtcclxuICB9XHJcblxyXG4gIHBsYWNlU2hpcChsZW5ndGgsIGNvb3Jkc1N0YXJ0LCBjb29yZHNFbmQpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5zaGlwc0xpc3QubGVuZ3RoO1xyXG4gICAgY29uc3QgcGxhY2VkU2hpcCA9IG5ldyBTaGlwKGxlbmd0aCwgaWQpO1xyXG5cclxuICAgIC8vIGlmIHRoZSBzaGlwJ3MgbGVuZ3RoID4gMiwgbWFyayB0aGUgb3RoZXIgc3F1YXJlcyB0b29cclxuICAgIHRoaXMuc2hpcHNMaXN0LnB1c2gocGxhY2VkU2hpcCk7XHJcbiAgICBpZiAoY29vcmRzU3RhcnRbMF0gIT09IGNvb3Jkc0VuZFswXSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gY29vcmRzU3RhcnRbMF07IGkgPD0gY29vcmRzRW5kWzBdOyBpKyspIHtcclxuICAgICAgICB0aGlzLmdyaWRbaV1bY29vcmRzU3RhcnRbMV1dID0gaWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb29yZHNTdGFydFsxXSAhPT0gY29vcmRzRW5kWzFdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb29yZHNTdGFydFsxXTsgaSA8PSBjb29yZHNFbmRbMV07IGkrKykge1xyXG4gICAgICAgIHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1baV0gPSBpZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1bY29vcmRzU3RhcnRbMV1dID0gaWQ7XHJcbiAgICB0aGlzLmdyaWRbY29vcmRzRW5kWzBdXVtjb29yZHNFbmRbMV1dID0gaWQ7XHJcbiAgfVxyXG5cclxuICAvLyBhdHRhY2soY29vcmRzKSB7XHJcbiAgLy8gICB0aGlzLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcclxuXHJcbiAgLy8gfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xyXG4gICAgbGV0IGlkID0gdGhpcy5ncmlkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXTtcclxuICAgIGNvbnNvbGUubG9nKGlkKTtcclxuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNyJHtjb29yZHNbMF19YyR7Y29vcmRzWzFdfWApO1xyXG5cclxuICAgIGlmIChpZCA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmdyaWRbY29vcmRzWzBdXVtjb29yZHNbMV1dID0gXCJtaXNzXCI7XHJcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZW5lbXktbWlzc1wiKTtcclxuICAgIH0gZWxzZSBpZiAoaWQgPT09IFwibWlzc1wiIHx8IGlkID09PSBcImhpdFwiKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZCBtb3ZlXCIpO1xyXG4gICAgICByZXR1cm4gXCJpbnZhbGlkIG1vdmVcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZW5lbXktaGl0XCIpO1xyXG4gICAgICBsZXQgaGl0U2hpcCA9IHRoaXMuc2hpcHNMaXN0W2lkXTtcclxuICAgICAgdGhpcy5ncmlkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9IFwiaGl0XCI7XHJcbiAgICAgIGhpdFNoaXAuaGl0KCk7XHJcbiAgICAgIHRoaXMucmVjZWl2ZWRIaXRzICs9IDE7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmdyaWQpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tJZkxvc3QoKSB7XHJcbiAgICBpZiAodGhpcy5yZWNlaXZlZEhpdHMgPj0gcG9zc2libGVTY29yZSkge1xyXG4gICAgICB0aGlzLmxvc3RHYW1lID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVHcmlkKCkge1xyXG4gICAgbGV0IGdyaWRBcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XHJcbiAgICAgIGdyaWRBcnJheS5wdXNoKFtdKTtcclxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XHJcbiAgICAgICAgZ3JpZEFycmF5W3ldLnB1c2gobnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBncmlkQXJyYXk7XHJcbiAgfVxyXG5cclxuICAvLyBnZW5lcmF0ZSByYW5kb20gc2hpcHMgYW5kIHBsYWNlIHRoZW0gb24gdGhlIGVuZW15IGJvYXJkXHJcbiAgZ2V0UmFuZG9tUGxhY2VtZW50KCkge1xyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuc2hpcExlbmd0aHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgY29uc3Qgc2hpcEwgPSBwYXJzZUludCh0aGlzLnNoaXBMZW5ndGhzW2ldKTtcclxuICAgICAgbGV0IGNvb3JkcyA9IHRoaXMuZ2V0TmV3Q29vcmRzKHNoaXBMKTtcclxuICAgICAgdGhpcy5wbGFjZVNoaXAoXHJcbiAgICAgICAgc2hpcEwsXHJcbiAgICAgICAgW2Nvb3Jkc1swXVswXSwgY29vcmRzWzBdWzFdXSxcclxuICAgICAgICBbY29vcmRzWzFdWzBdLCBjb29yZHNbMV1bMV1dXHJcbiAgICAgICk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ3JpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBydW5zIGZ1bmN0aW9ucyBnZW5lcmF0aW5nIGFuZCBjaGVja2luZyBpZiBuZXcgY29vcmRzIGFyZSB2YWxpZCwgcmV0dXJucyBjb29yZHMgZm9yIG9uZSBzaGlwIG9yIHVzZXMgcmVjdXJzaW9uIHRvIHN0YXJ0IG92ZXIgdGhlIHByb2Nlc3MgaWYgY29vcmRzIGFyZSBpbnZhbGlkXHJcbiAgZ2V0TmV3Q29vcmRzKHNoaXBMZW5ndGgpIHtcclxuICAgIGxldCBjb29yZHMgPSB0aGlzLnJhbmRvbWl6ZUNvb3JkcyhwYXJzZUludChzaGlwTGVuZ3RoKSk7XHJcbiAgICBsZXQgZnVsbENvb3JkcyA9IHRoaXMuZ2V0RnVsbENvb3Jkcyhjb29yZHMpO1xyXG4gICAgbGV0IGNvb3JkQ2hlY2sgPSB0aGlzLmNoZWNrSWZPY2N1cGllZChmdWxsQ29vcmRzKTtcclxuICAgIGlmIChjb29yZENoZWNrID09PSBmYWxzZSkge1xyXG4gICAgICByZXR1cm4gY29vcmRzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TmV3Q29vcmRzKHBhcnNlSW50KHNoaXBMZW5ndGgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHVzZXMgbWF0aC5yYW5kb20gdG8gZ2V0IHJhbmRvbSBjb29yZGluYXRlcyBvbiB0aGUgYm9hcmQsIHJhbmRvbWl6ZSB3aGV0ZXIgdGhlIG5ldyBzaGlwIHdpbGwgYmUgdmVydGljYWwgb3IgaG9yaXpvbnRhbCwgY2FsY3VsYXRlIHRoYXQgaXQgZml0cyBvbiB0aGUgYm9hcmQgYWNjb3JkaW5nIHRvIHRoZSBzaGlwcyBsZW5ndGhcclxuICByYW5kb21pemVDb29yZHMoc2hpcExlbmd0aCkge1xyXG4gICAgY29uc3Qgc3RhcnRSb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBjb25zdCBzdGFydENvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGNvbnN0IGVuZFJvdyA9IHN0YXJ0Um93ICsgcGFyc2VJbnQoc2hpcExlbmd0aCkgLSAxO1xyXG4gICAgY29uc3QgZW5kQ29sID0gc3RhcnRDb2wgKyBwYXJzZUludChzaGlwTGVuZ3RoKSAtIDE7XHJcblxyXG4gICAgaWYgKGVuZFJvdyA8IDEwICYmIGVuZENvbCA8IDEwKSB7XHJcbiAgICAgIC8vcmFuZG9taXplIC0gaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxyXG4gICAgICBsZXQgY2hhbmNlID0gTWF0aC5yYW5kb20oKSAqIDE7XHJcbiAgICAgIGlmIChjaGFuY2UgPCAwLjUpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgW3N0YXJ0Um93LCBzdGFydENvbF0sXHJcbiAgICAgICAgICBbc3RhcnRSb3csIGVuZENvbF0sXHJcbiAgICAgICAgXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgW3N0YXJ0Um93LCBzdGFydENvbF0sXHJcbiAgICAgICAgICBbZW5kUm93LCBzdGFydENvbF0sXHJcbiAgICAgICAgXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChlbmRDb2wgPCAxMCkge1xyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgIFtzdGFydFJvdywgZW5kQ29sXSxcclxuICAgICAgXTtcclxuICAgIH0gZWxzZSBpZiAoZW5kUm93IDwgMTApIHtcclxuICAgICAgcmV0dXJuIFtcclxuICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgICBbZW5kUm93LCBzdGFydENvbF0sXHJcbiAgICAgIF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5yYW5kb21pemVDb29yZHMoc2hpcExlbmd0aCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBnZXRzIGZ1bGwgY29vcmRpbmF0ZXMgb2YgZXZlcnkgc3F1YXJlIGluIGEgc2luZ2xlIHNoaXBcclxuICBnZXRGdWxsQ29vcmRzKGNvb3Jkcykge1xyXG4gICAgbGV0IHJvd1N0YXJ0ID0gcGFyc2VJbnQoY29vcmRzWzBdWzBdKTtcclxuICAgIGxldCBjb2xTdGFydCA9IHBhcnNlSW50KGNvb3Jkc1swXVsxXSk7XHJcbiAgICBsZXQgcm93RW5kID0gcGFyc2VJbnQoY29vcmRzWzFdWzBdKTtcclxuICAgIGxldCBjb2xFbmQgPSBwYXJzZUludChjb29yZHNbMV1bMV0pO1xyXG5cclxuICAgIGxldCBmdWxsQ29vcmRpbmF0ZXMgPSBbXTtcclxuICAgIGlmIChyb3dTdGFydCAhPT0gcm93RW5kKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSByb3dTdGFydDsgaSA8PSByb3dFbmQ7IGkrKykge1xyXG4gICAgICAgIGZ1bGxDb29yZGluYXRlcy5wdXNoKFtpLCBjb2xTdGFydF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY29sU3RhcnQgIT09IGNvbEVuZCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gY29sU3RhcnQ7IGkgPD0gY29sRW5kOyBpKyspIHtcclxuICAgICAgICBmdWxsQ29vcmRpbmF0ZXMucHVzaChbcm93U3RhcnQsIGldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bGxDb29yZGluYXRlcztcclxuICB9XHJcblxyXG4gIC8vIGNoZWNrIGlmIGFueSBzcXVhcmUgb2YgdGhlIG5ldyBzaGlwIGlzIGFscmVhZHkgb2NjdXBpZWQ7IGlmIHNvLCBzZW5kIGluZm8gdG8gcHJldmlvdXMgZnVuY3Rpb25zIHRvIGdlbmVyYXRlIG5ldyBzaGlwIGNvb3JkaW5hdGVzIGluc3RlYWRcclxuICBjaGVja0lmT2NjdXBpZWQoZnVsbENvb3JkaW5hdGVzKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhmdWxsQ29vcmRpbmF0ZXMpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmdWxsQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGNvb3JkID0gZnVsbENvb3JkaW5hdGVzW2ldO1xyXG4gICAgICBpZiAodGhpcy5ncmlkW3BhcnNlSW50KGNvb3JkWzBdKV1bcGFyc2VJbnQoY29vcmRbMV0pXSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2sgLSBvY2N1cGllZFwiKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZHJhd0dyaWQoKSB7XHJcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xyXG4gICAgY29uc3QgYXJyYXkgPSB0aGlzLmdyaWQ7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhhcnJheSk7XHJcblxyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgYXJyYXkuZm9yRWFjaCgocm93LCByaW5kZXgpID0+IHtcclxuICAgICAgcm93LmZvckVhY2goKGNvbHVtbiwgY2luZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XHJcbiAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGByJHtyaW5kZXh9YyR7Y2luZGV4fWApO1xyXG4gICAgICAgIGlmICh0aGlzLm93bmVyID09PSBcImh1bWFuXCIpIHtcclxuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vd25lciA9PT0gXCJBSVwiKSB7XHJcbiAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImVuZW15LXNxdWFyZVwiKTtcclxuICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVBdHRhY2soW3JpbmRleCwgY2luZGV4XSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb2x1bW4gPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coY29sdW1uKTtcclxuICAgICAgICAgIGlmICh0aGlzLm93bmVyID09PSBcImh1bWFuXCIpIHtcclxuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJvd24tc2hpcFwiKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZW5lbXktc2hpcFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gXCJoaXRcIikge1xyXG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLm93bmVyID09PSBcImh1bWFuXCIpIHtcclxuICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1vd25cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBncmlkLmNsYXNzTGlzdC5hZGQoXCJncmlkLWVuZW15XCIpO1xyXG4gICAgfVxyXG4gICAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZFwiKTtcclxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZ3JpZCk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG93bmVyKSB7XHJcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5R2FtZSgpIHtcclxuICBjb25zdCBwbGF5ZXJBID0gbmV3IFBsYXllcihcImh1bWFuXCIpO1xyXG4gIGNvbnN0IHBsYXllckIgPSBuZXcgUGxheWVyKFwiQUlcIik7XHJcbiAgY29uc3QgYm9hcmRBID0gbmV3IEdhbWVib2FyZChcImh1bWFuXCIpO1xyXG4gIGNvbnN0IGJvYXJkQiA9IG5ldyBHYW1lYm9hcmQoXCJBSVwiKTtcclxuXHJcbiAgbGV0IGNoZWNrUGxhY2VkID0gcGxhY2VTaGlwcyhib2FyZEEpO1xyXG4gIGlmIChjaGVja1BsYWNlZCA9PT0gdHJ1ZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJ0cnVlZVwiKTtcclxuICAgIHJldHVybiBwbGFjZW1lbnRFcnJvcigpO1xyXG4gIH1cclxuICBjbGVhblBsYWNlRG9tKCk7XHJcbiAgYm9hcmRBLmRyYXdHcmlkKCk7XHJcbiAgYm9hcmRCLmdldFJhbmRvbVBsYWNlbWVudCgpO1xyXG4gIGJvYXJkQi5kcmF3R3JpZCgpO1xyXG4gIGNvbnNvbGUubG9nKGJvYXJkQi5ncmlkKTtcclxufVxyXG5cclxuZXhwb3J0IHsgU2hpcCwgR2FtZWJvYXJkLCBQbGF5ZXIsIHBsYXlHYW1lIH07XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Q2luemVsOndnaHRAODAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKiB7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBtYXJnaW46IDBweDtcclxuICBwYWRkaW5nOiAwcHg7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZDFlMjY7XHJcbiAgY29sb3I6ICNkY2E4NWQ7XHJcbn1cclxuXHJcbi5oZWFkZXIge1xyXG4gIG1hcmdpbjogMTJweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4uaGVhZGVyID4gc3BhbiB7XHJcbiAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgZm9udC1mYW1pbHk6ICdDaW56ZWwnLCBzZXJpZjtcclxuICB0ZXh0LXNoYWRvdzogIzNjM2Q1MSAwcHggLTEwcHggNnB4LCAycHggMnB4IDJweCAjNWY1NjFiO1xyXG4gIGJvcmRlci1ib3R0b206ICNkY2E4NWQgMnB4IHNvbGlkO1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxufVxyXG5cclxuLm1haW4ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5ncmlkIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyOHB4KTtcclxuICBjb2x1bW4tZ2FwOiAwcHg7XHJcbiAgcm93LWdhcDogMHB4O1xyXG4gIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIG1hcmdpbjogMCAxMnB4O1xyXG59XHJcblxyXG4uc3F1YXJlLCAuZW5lbXktc3F1YXJlIHtcclxuICB3aWR0aDogMjhweDtcclxuICBoZWlnaHQ6IDI4cHg7XHJcbiAgYm9yZGVyOiAxcHggI2RjYTg1ZCBzb2xpZDtcclxuICBtYXJnaW46IDBweDtcclxufVxyXG5cclxuLmVuZW15LXNxdWFyZTpob3ZlciB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uZW5lbXktaGl0IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZ3JlZW47XHJcbn1cclxuXHJcbi5lbmVteS1taXNzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xyXG59XHJcblxyXG4uc3F1YXJlQiB7XHJcbiAgYmFja2dyb3VuZDogIzIzNGU2NjtcclxufVxyXG5cclxuLm1pc3Mge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XHJcbn1cclxuXHJcbi5oaXQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDk4LCAyMDUpO1xyXG59XHJcblxyXG4jZGl2MSB7XHJcbiAgd2lkdGg6IDM1MHB4O1xyXG4gIGhlaWdodDogNzBweDtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNhYWFhYWE7XHJcbn1cclxuXHJcbi5vd24tYm9hcmQge1xyXG4gIG1hcmdpbjogNnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLnBsYWNlLXNoaXBzIHtcclxuICBtYXJnaW46IDZweCAyNHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB3aWR0aDogMzAwcHg7XHJcbn1cclxuXHJcbi5wbGFjZS1zaGlwcyA+IHNwYW4sIC5vd24tYm9hcmQgPiBzcGFuIHtcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbn1cclxuXHJcbi5zaGlwLWRpdiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW46IDRweDtcclxufVxyXG5cclxuLnNoaXAtb24tYm9hcmQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBtYXJnaW46IDBweDtcclxufVxyXG5cclxuLnNoaXBzcSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU2IDkgMTM1KTtcclxufVxyXG5cclxuLnNxMC10by1wbGFjZTpob3ZlciB7XHJcbiAgY3Vyc29yOiBncmFiO1xyXG59XHJcblxyXG4uZmxleC10b2dnbGUge1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbn1cclxuXHJcbi5wbGFjZS1pbmZvIHtcclxuICBtYXJnaW4tdG9wOiA2cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4uc3RhcnQtZ2FtZSB7XHJcbiAgbWFyZ2luOiAxMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTM2NGE7XHJcbiAgY29sb3I6ICNkY2E4NWQ7XHJcbiAgYm9yZGVyOiAxcHggI2RjYTg1ZCBzb2xpZDtcclxuICBwYWRkaW5nOiA2cHggMThweDtcclxuICBmb250LXNpemU6IDEuMnJlbTtcclxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5zdGFydC1nYW1lOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjM0ZTY2O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLnN0YXJ0LWdhbWU6YWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYgOSAxMzUpO1xyXG59XHJcblxyXG4ub3duLXNoaXAge1xyXG4gIGJhY2tncm91bmQ6ICMxMjUzZDY7XHJcbn1cclxuXHJcbi5ncmlkLWVuZW15IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTgsIDM5LCAxMDQpO1xyXG59XHJcblxyXG4uZ3JpZC1vd24ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzRlNjY7XHJcbn1cclxuXHJcbi5ncmlkLXBsYWNlLW93biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcclxufVxyXG5cclxuLmVuZW15LXNoaXAge1xyXG4gIGJhY2tncm91bmQ6IHJnYigxNzUsIDEzLCA0MCk7XHJcbn1cclxuXHJcbi5lcnJvci1tc2cge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1OCwgMzksIDEwNCk7XHJcbiAgbWFyZ2luOiA4cHggMHB4O1xyXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XHJcbiAgcGFkZGluZzogNnB4O1xyXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLDRCQUE0QjtFQUM1Qix1REFBdUQ7RUFDdkQsZ0NBQWdDO0VBQ2hDLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUNBQXVDO0VBQ3ZDLGVBQWU7RUFDZixZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osYUFBYTtFQUNiLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsY0FBYztFQUNkLHlCQUF5QjtFQUN6QixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0Usa0NBQWtDO0VBQ2xDLGVBQWU7RUFDZix5QkFBeUI7RUFDekIsWUFBWTtBQUNkXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUNpbnplbDp3Z2h0QDgwMCZkaXNwbGF5PXN3YXAnKTtcXHJcXG5cXHJcXG4qIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBtYXJnaW46IDBweDtcXHJcXG4gIHBhZGRpbmc6IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGQxZTI2O1xcclxcbiAgY29sb3I6ICNkY2E4NWQ7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIge1xcclxcbiAgbWFyZ2luOiAxMnB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyID4gc3BhbiB7XFxyXFxuICBmb250LXNpemU6IDIuNXJlbTtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnQ2luemVsJywgc2VyaWY7XFxyXFxuICB0ZXh0LXNoYWRvdzogIzNjM2Q1MSAwcHggLTEwcHggNnB4LCAycHggMnB4IDJweCAjNWY1NjFiO1xcclxcbiAgYm9yZGVyLWJvdHRvbTogI2RjYTg1ZCAycHggc29saWQ7XFxyXFxuICBtYXJnaW4tYm90dG9tOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5tYWluIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdyaWQge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyOHB4KTtcXHJcXG4gIGNvbHVtbi1nYXA6IDBweDtcXHJcXG4gIHJvdy1nYXA6IDBweDtcXHJcXG4gIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxyXFxuICBmb250LXNpemU6IDEycHg7XFxyXFxuICBtYXJnaW46IDAgMTJweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNxdWFyZSwgLmVuZW15LXNxdWFyZSB7XFxyXFxuICB3aWR0aDogMjhweDtcXHJcXG4gIGhlaWdodDogMjhweDtcXHJcXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XFxyXFxuICBtYXJnaW46IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmVuZW15LXNxdWFyZTpob3ZlciB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5lbmVteS1oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dyZWVuO1xcclxcbn1cXHJcXG5cXHJcXG4uZW5lbXktbWlzcyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcclxcbn1cXHJcXG5cXHJcXG4uc3F1YXJlQiB7XFxyXFxuICBiYWNrZ3JvdW5kOiAjMjM0ZTY2O1xcclxcbn1cXHJcXG5cXHJcXG4ubWlzcyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDk4LCAyMDUpO1xcclxcbn1cXHJcXG5cXHJcXG4jZGl2MSB7XFxyXFxuICB3aWR0aDogMzUwcHg7XFxyXFxuICBoZWlnaHQ6IDcwcHg7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2FhYWFhYTtcXHJcXG59XFxyXFxuXFxyXFxuLm93bi1ib2FyZCB7XFxyXFxuICBtYXJnaW46IDZweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAzMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYWNlLXNoaXBzIHtcXHJcXG4gIG1hcmdpbjogNnB4IDI0cHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHdpZHRoOiAzMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYWNlLXNoaXBzID4gc3BhbiwgLm93bi1ib2FyZCA+IHNwYW4ge1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICBtYXJnaW4tYm90dG9tOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWRpdiB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgbWFyZ2luOiA0cHg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLW9uLWJvYXJkIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIG1hcmdpbjogMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcHNxIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1NiA5IDEzNSk7XFxyXFxufVxcclxcblxcclxcbi5zcTAtdG8tcGxhY2U6aG92ZXIge1xcclxcbiAgY3Vyc29yOiBncmFiO1xcclxcbn1cXHJcXG5cXHJcXG4uZmxleC10b2dnbGUge1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYWNlLWluZm8ge1xcclxcbiAgbWFyZ2luLXRvcDogNnB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5zdGFydC1nYW1lIHtcXHJcXG4gIG1hcmdpbjogMTBweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTM2NGE7XFxyXFxuICBjb2xvcjogI2RjYTg1ZDtcXHJcXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XFxyXFxuICBwYWRkaW5nOiA2cHggMThweDtcXHJcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcclxcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhcnQtZ2FtZTpob3ZlciB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjM0ZTY2O1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhcnQtZ2FtZTphY3RpdmUge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU2IDkgMTM1KTtcXHJcXG59XFxyXFxuXFxyXFxuLm93bi1zaGlwIHtcXHJcXG4gIGJhY2tncm91bmQ6ICMxMjUzZDY7XFxyXFxufVxcclxcblxcclxcbi5ncmlkLWVuZW15IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1OCwgMzksIDEwNCk7XFxyXFxufVxcclxcblxcclxcbi5ncmlkLW93biB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjM0ZTY2O1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JpZC1wbGFjZS1vd24ge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcXHJcXG59XFxyXFxuXFxyXFxuLmVuZW15LXNoaXAge1xcclxcbiAgYmFja2dyb3VuZDogcmdiKDE3NSwgMTMsIDQwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmVycm9yLW1zZyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTgsIDM5LCAxMDQpO1xcclxcbiAgbWFyZ2luOiA4cHggMHB4O1xcclxcbiAgYm9yZGVyOiAxcHggI2RjYTg1ZCBzb2xpZDtcXHJcXG4gIHBhZGRpbmc6IDZweDtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IGNyZWF0ZURvbSwgcHJlcGFyZVNoaXBzLCBjbGVhblBsYWNlRG9tIH0gZnJvbSBcIi4vZG9tLmpzXCI7XHJcbmltcG9ydCB7IFBsYXllciwgR2FtZWJvYXJkLCBwbGF5R2FtZSB9IGZyb20gXCIuL2dhbWUuanNcIjtcclxuaW1wb3J0IGNzcyBmcm9tIFwiLi9zdHlsZS5jc3NcIjtcclxuXHJcbmNyZWF0ZURvbSgpO1xyXG5wcmVwYXJlU2hpcHMoKTtcclxuXHJcbi8qIGZvciB0ZXN0cyAtIHNob3cgb25seSBlbmVteSBib2FyZFxyXG5jbGVhblBsYWNlRG9tKCk7XHJcbmNvbnN0IHBsYXllckIgPSBuZXcgUGxheWVyKFwiQUlcIik7XHJcbmNvbnN0IGJvYXJkQiA9IG5ldyBHYW1lYm9hcmQoXCJBSVwiKTtcclxuYm9hcmRCLnJhbmRvbWl6ZVBsYWNlbWVudCgpO1xyXG5ib2FyZEIuZHJhd0dyaWQoKTtcclxuKi9cclxuIl0sIm5hbWVzIjpbIkdhbWVib2FyZCIsIlBsYXllciIsInBsYXlHYW1lIiwiYWxsb3dEcm9wIiwiZXYiLCJwcmV2ZW50RGVmYXVsdCIsImRyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwidGFyZ2V0IiwiaWQiLCJkcm9wIiwiZGF0YSIsImdldERhdGEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJkcmFnRW5kIiwiYXJlQWxsU2hpcHNQbGFjZWQiLCJjcmVhdGVHcmlkIiwiZ3JpZEFycmF5IiwieCIsInB1c2giLCJ5IiwiZHJhd0dyaWQiLCJvd25Cb2FyZCIsInF1ZXJ5U2VsZWN0b3IiLCJhcnJheSIsImJvZHkiLCJncmlkIiwiY3JlYXRlRWxlbWVudCIsImZvckVhY2giLCJyb3ciLCJyaW5kZXgiLCJjZWxsIiwiY2luZGV4Iiwic3F1YXJlIiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNyZWF0ZURvbSIsImhlYWRlciIsIm1haW4iLCJmb290ZXIiLCJ0aXRsZSIsInRleHRDb250ZW50IiwicHJlcGFyZVNoaXBzIiwib3duQm9hcmRUaXRsZSIsInBsYWNlU2hpcHMiLCJzaGlwc1RpdGxlIiwic2hpcExpc3QiLCJzaGlwTGVuZ3RocyIsIml0ZW0iLCJpbmRleCIsInNoaXBEaXYiLCJpIiwic2hpcFNxIiwidG9nZ2xlIiwicGxhY2VJbmZvIiwicGxhY2VJbmZvU3AiLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwic3RhcnRHYW1lIiwiY2hlY2tQbGFjZWRTaGlwcyIsInBsYWNlSW5mb1NwMiIsInBsYWNlbWVudEVycm9yIiwiZXJyb3JNc2ciLCJib2FyZCIsInNoaXAiLCJjb29yZFN0YXJ0IiwicGFyZW50Tm9kZSIsInNwbGl0Iiwic3RhcnRSb3ciLCJwYXJzZUludCIsInN0YXJ0Q29sdW1uIiwiZW5kUm93IiwiZW5kQ29sdW1uIiwiZnVsbENvb3JkcyIsImNvbnRhaW5zIiwiZ2V0RnVsbENvb3JkcyIsImNoZWNrSWZPY2N1cGllZCIsImNvbnNvbGUiLCJsb2ciLCJwbGFjZVNoaXAiLCJjbGVhblBsYWNlRG9tIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwicG9zc2libGVTY29yZSIsIlNoaXAiLCJjb25zdHJ1Y3RvciIsImhpdHMiLCJkZXN0cm95ZWQiLCJoaXQiLCJpc1N1bmsiLCJvd25lciIsInNoaXBzTGlzdCIsInJlY2VpdmVkSGl0cyIsImxvc3RHYW1lIiwiY29vcmRzU3RhcnQiLCJjb29yZHNFbmQiLCJwbGFjZWRTaGlwIiwicmVjZWl2ZUF0dGFjayIsImNvb3JkcyIsImhpdFNoaXAiLCJjaGVja0lmTG9zdCIsImdldFJhbmRvbVBsYWNlbWVudCIsInNoaXBMIiwiZ2V0TmV3Q29vcmRzIiwic2hpcExlbmd0aCIsInJhbmRvbWl6ZUNvb3JkcyIsImNvb3JkQ2hlY2siLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzdGFydENvbCIsImVuZENvbCIsImNoYW5jZSIsInJvd1N0YXJ0IiwiY29sU3RhcnQiLCJyb3dFbmQiLCJjb2xFbmQiLCJmdWxsQ29vcmRpbmF0ZXMiLCJjb29yZCIsImNvbHVtbiIsInBsYXllckEiLCJwbGF5ZXJCIiwiYm9hcmRBIiwiYm9hcmRCIiwiY2hlY2tQbGFjZWQiLCJjc3MiXSwic291cmNlUm9vdCI6IiJ9