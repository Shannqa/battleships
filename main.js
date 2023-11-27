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
        // console.log("ayyy");
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

let currentPlayer = null;
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
  receiveAttack(coords) {
    let square;
    let id = this.grid[coords[0]][coords[1]];
    // console.log(id);
    if (id === "miss" || id === "hit") {
      // try again if invalid move
      console.log("invalid move");
      return "invalid move";
    }
    if (currentPlayer === "human") {
      square = document.querySelector(`.enemy-square#r${coords[0]}c${coords[1]}`);
      currentPlayer = "AI";
    } else if (currentPlayer === "AI") {
      square = document.querySelector(`.own-square#r${coords[0]}c${coords[1]}`);
      currentPlayer = "human";
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
    }
    console.log("owner: " + this.owner);
    console.log(this.grid);
    //if it's AI's turn now, send an attack
    if (currentPlayer === "AI") {
      this.AIattack();
    }
    // console.log(this.grid);
  }

  playerAttack(coords) {
    // if it's not the player's turn, clicking on enemy board will do nothing
    if (currentPlayer === "human") {
      this.receiveAttack(coords);
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
        // console.log("check - occupied");
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
        square.setAttribute("id", `r${rindex}c${cindex}`);
        if (this.owner === "human") {
          square.classList.add("own-square");
        } else if (this.owner === "AI") {
          square.classList.add("enemy-square");
          square.addEventListener("click", () => {
            this.playerAttack([rindex, cindex]);
          });
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
    // console.log("truee");
    return (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.placementError)();
  }
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.cleanPlaceDom)();
  boardA.drawGrid();
  boardB.getRandomPlacement();
  boardB.drawGrid();
  // console.log(boardB.grid);
  currentPlayer = "human";
}

// function gameLoop() {

//}
// wait for players attack...
// after player clicks on a square sending an attack, run receive attack on enemy board
// block the possibility of user attacking
// generate random hit of the ai
// run receive attack on human board
// enable listeners on enemy board
// wait for player to attack...
//}



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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,4BAA4B;EAC5B,uDAAuD;EACvD,gCAAgC;EAChC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,eAAe;EACf,YAAY;EACZ,sBAAsB;EACtB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,WAAW;AACb;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,yBAAyB;AAC3B;;;AAGA;EACE,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,yBAAyB;EACzB,cAAc;EACd,yBAAyB;EACzB,iBAAiB;EACjB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,kCAAkC;EAClC,eAAe;EACf,yBAAyB;EACzB,YAAY;AACd","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@800&display=swap');\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  margin: 0px;\r\n  padding: 0px;\r\n}\r\n\r\nbody {\r\n  background-color: #0d1e26;\r\n  color: #dca85d;\r\n}\r\n\r\n.header {\r\n  margin: 12px;\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.header > span {\r\n  font-size: 2.5rem;\r\n  font-family: 'Cinzel', serif;\r\n  text-shadow: #3c3d51 0px -10px 6px, 2px 2px 2px #5f561b;\r\n  border-bottom: #dca85d 2px solid;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.main {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 28px);\r\n  column-gap: 0px;\r\n  row-gap: 0px;\r\n  justify-items: stretch;\r\n  font-size: 12px;\r\n  margin: 0 12px;\r\n}\r\n\r\n.own-square, .enemy-square, .prep-square {\r\n  width: 28px;\r\n  height: 28px;\r\n  border: 1px #dca85d solid;\r\n  margin: 0px;\r\n}\r\n\r\n.enemy-square:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.enemy-square.hit {\r\n  background-color: darkgreen;\r\n}\r\n\r\n.enemy-square.miss {\r\n  background-color: grey;\r\n}\r\n\r\n.own-square.miss {\r\n  background-color: grey;\r\n}\r\n\r\n.own-square.hit {\r\n  background-color: rgb(255, 98, 205);\r\n}\r\n\r\n.own-square.ship, .prep-square.ship{\r\n  background-color: #1253d6;\r\n}\r\n\r\n\r\n#div1 {\r\n  width: 350px;\r\n  height: 70px;\r\n  padding: 10px;\r\n  border: 1px solid #aaaaaa;\r\n}\r\n\r\n.own-board {\r\n  margin: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 300px;\r\n}\r\n\r\n.place-ships {\r\n  margin: 6px 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 300px;\r\n}\r\n\r\n.place-ships > span, .own-board > span {\r\n  font-size: 1.5rem;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.ship-div {\r\n  display: flex;\r\n  margin: 4px;\r\n}\r\n\r\n.ship-on-board {\r\n  position: absolute;\r\n  margin: 0px;\r\n}\r\n\r\n.shipsq {\r\n  background-color: rgb(56 9 135);\r\n}\r\n\r\n.sq0-to-place:hover {\r\n  cursor: grab;\r\n}\r\n\r\n.flex-toggle {\r\n  flex-direction: column;\r\n}\r\n\r\n.place-info {\r\n  margin-top: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.start-game {\r\n  margin: 10px;\r\n  background-color: #11364a;\r\n  color: #dca85d;\r\n  border: 1px #dca85d solid;\r\n  padding: 6px 18px;\r\n  font-size: 1.2rem;\r\n  align-self: center;\r\n}\r\n\r\n.start-game:hover {\r\n  background-color: #234e66;\r\n  cursor: pointer;\r\n}\r\n\r\n.start-game:active {\r\n  background-color: rgb(56 9 135);\r\n}\r\n\r\n.own-ship {\r\n  background: #1253d6;\r\n}\r\n\r\n.grid-enemy {\r\n  background-color: rgb(58, 39, 104);\r\n}\r\n\r\n.grid-own {\r\n  background-color: #234e66;\r\n}\r\n\r\n.grid-place-own {\r\n  background-color: #234e66;\r\n}\r\n\r\n.enemy-ship {\r\n  background: rgb(175, 13, 40);\r\n}\r\n\r\n.error-msg {\r\n  background-color: rgb(58, 39, 104);\r\n  margin: 8px 0px;\r\n  border: 1px #dca85d solid;\r\n  padding: 6px;\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxnRkFBZ0YsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFFBQVEsS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsOEdBQThHLFdBQVcsNkJBQTZCLGtCQUFrQixtQkFBbUIsS0FBSyxjQUFjLGdDQUFnQyxxQkFBcUIsS0FBSyxpQkFBaUIsbUJBQW1CLG9CQUFvQiw4QkFBOEIsS0FBSyx3QkFBd0Isd0JBQXdCLG1DQUFtQyw4REFBOEQsdUNBQXVDLHlCQUF5QixLQUFLLGVBQWUsb0JBQW9CLDhCQUE4QixLQUFLLGVBQWUsb0JBQW9CLDhDQUE4QyxzQkFBc0IsbUJBQW1CLDZCQUE2QixzQkFBc0IscUJBQXFCLEtBQUssa0RBQWtELGtCQUFrQixtQkFBbUIsZ0NBQWdDLGtCQUFrQixLQUFLLDZCQUE2QixzQkFBc0IsS0FBSywyQkFBMkIsa0NBQWtDLEtBQUssNEJBQTRCLDZCQUE2QixLQUFLLDBCQUEwQiw2QkFBNkIsS0FBSyx5QkFBeUIsMENBQTBDLEtBQUssNENBQTRDLGdDQUFnQyxLQUFLLG1CQUFtQixtQkFBbUIsbUJBQW1CLG9CQUFvQixnQ0FBZ0MsS0FBSyxvQkFBb0Isa0JBQWtCLG9CQUFvQiw2QkFBNkIsMEJBQTBCLG1CQUFtQixLQUFLLHNCQUFzQix1QkFBdUIsb0JBQW9CLDZCQUE2QixtQkFBbUIsS0FBSyxnREFBZ0Qsd0JBQXdCLHlCQUF5QixLQUFLLG1CQUFtQixvQkFBb0Isa0JBQWtCLEtBQUssd0JBQXdCLHlCQUF5QixrQkFBa0IsS0FBSyxpQkFBaUIsc0NBQXNDLEtBQUssNkJBQTZCLG1CQUFtQixLQUFLLHNCQUFzQiw2QkFBNkIsS0FBSyxxQkFBcUIsc0JBQXNCLG9CQUFvQiw2QkFBNkIsS0FBSyxxQkFBcUIsbUJBQW1CLGdDQUFnQyxxQkFBcUIsZ0NBQWdDLHdCQUF3Qix3QkFBd0IseUJBQXlCLEtBQUssMkJBQTJCLGdDQUFnQyxzQkFBc0IsS0FBSyw0QkFBNEIsc0NBQXNDLEtBQUssbUJBQW1CLDBCQUEwQixLQUFLLHFCQUFxQix5Q0FBeUMsS0FBSyxtQkFBbUIsZ0NBQWdDLEtBQUsseUJBQXlCLGdDQUFnQyxLQUFLLHFCQUFxQixtQ0FBbUMsS0FBSyxvQkFBb0IseUNBQXlDLHNCQUFzQixnQ0FBZ0MsbUJBQW1CLEtBQUssbUJBQW1CO0FBQzl4STtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ25MMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQW1HO0FBQ25HO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsc0ZBQU87Ozs7QUFJNkM7QUFDckUsT0FBTyxpRUFBZSxzRkFBTyxJQUFJLHNGQUFPLFVBQVUsc0ZBQU8sbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7OztBQ0FrRTtBQUNWO0FBQzFCO0FBRTlCN0Msa0RBQVMsQ0FBQyxDQUFDO0FBQ1hNLHFEQUFZLENBQUMsQ0FBQzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZWJvYXJkLCBQbGF5ZXIsIHBsYXlHYW1lIH0gZnJvbSBcIi4vZ2FtZS5qc1wiO1xyXG5cclxuZnVuY3Rpb24gYWxsb3dEcm9wKGV2KSB7XHJcbiAgZXYucHJldmVudERlZmF1bHQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhZyhldikge1xyXG4gIGV2LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBldi50YXJnZXQuaWQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcm9wKGV2KSB7XHJcbiAgLy8gY2F0Y2ggYW4gZXJyb3IgaGFwcGVuaW5nIGlmIHRoZSB1c2VyIHRyaWVzIHRvIGRyYWcgYW5kIGRyb3AgdGhlIHNoaXAgaW4gYSB3cm9uZyBwbGFjZSwgZS5nLiBpbiB0aGUgbWlkZGxlIG9mIG11bHRpcGxlIHNxdWFyZXNcclxuICB0cnkge1xyXG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBkYXRhID0gZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YSkuY2xhc3NMaXN0LmFkZChcInNoaXAtb24tYm9hcmRcIik7XHJcbiAgICBldi50YXJnZXQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YSkpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgY29uc29sZS5sb2coXCJlcnJvciAtIGRyYWcmZHJvcFwiKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWdFbmQoZXYpIHtcclxuICBhcmVBbGxTaGlwc1BsYWNlZCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVHcmlkKCkge1xyXG4gIGxldCBncmlkQXJyYXkgPSBbXTtcclxuICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcclxuICAgIGdyaWRBcnJheS5wdXNoKFtdKTtcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xyXG4gICAgICBncmlkQXJyYXlbeF0ucHVzaChudWxsKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGdyaWRBcnJheTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0dyaWQoKSB7XHJcbiAgY29uc3Qgb3duQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm93bi1ib2FyZFwiKTtcclxuICBjb25zdCBhcnJheSA9IGNyZWF0ZUdyaWQoKTtcclxuXHJcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICBhcnJheS5mb3JFYWNoKChyb3csIHJpbmRleCkgPT4ge1xyXG4gICAgcm93LmZvckVhY2goKGNlbGwsIGNpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInByZXAtc3F1YXJlXCIpO1xyXG4gICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHIke3JpbmRleH1jJHtjaW5kZXh9YCk7XHJcbiAgICAgIGlmIChjZWxsID09PSBcInNoaXBcIikge1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2VsbCA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNlbGwgPT09IFwiaGl0XCIpIHtcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgfVxyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcCk7XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgYWxsb3dEcm9wKTtcclxuICAgICAgZ3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGdyaWQuY2xhc3NMaXN0LmFkZChcImdyaWRcIik7XHJcbiAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1wbGFjZS1vd25cIik7XHJcbiAgb3duQm9hcmQuYXBwZW5kQ2hpbGQoZ3JpZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURvbSgpIHtcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcclxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIHRpdGxlLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwc1wiO1xyXG5cclxuICBtYWluLmNsYXNzTGlzdC5hZGQoXCJtYWluXCIpO1xyXG4gIC8vIGNvbnN0IGVuZW15Qm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIC8vIGNvbnN0IGVuZW15Qm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgLy8gZW5lbXlCb2FyZFRpdGxlLnRleHRDb250ZW50ID0gXCJFbmVteSBib2FyZFwiO1xyXG5cclxuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gIC8vIG1haW4uYXBwZW5kQ2hpbGQoZW5lbXlCb2FyZCk7XHJcbiAgLy8gZW5lbXlCb2FyZC5hcHBlbmRDaGlsZChlbmVteUJvYXJkVGl0bGUpO1xyXG5cclxuICBib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcclxuICBib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZXBhcmVTaGlwcygpIHtcclxuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xyXG4gIGNvbnN0IG93bkJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBvd25Cb2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgb3duQm9hcmQuY2xhc3NMaXN0LmFkZChcIm93bi1ib2FyZFwiKTtcclxuICBvd25Cb2FyZFRpdGxlLnRleHRDb250ZW50ID0gXCJZb3VyIGJvYXJkXCI7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHBsYWNlU2hpcHMuY2xhc3NMaXN0LmFkZChcInBsYWNlLXNoaXBzXCIpO1xyXG4gIGNvbnN0IHNoaXBzVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICBzaGlwc1RpdGxlLnRleHRDb250ZW50ID0gXCJQbGFjZSB5b3VyIHNoaXBzXCI7XHJcblxyXG4gIGNvbnN0IHNoaXBMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBzaGlwTGlzdC5jbGFzc0xpc3QuYWRkKFwic2hpcC1saXN0XCIpO1xyXG5cclxuICBjb25zdCBzaGlwTGVuZ3RocyA9IFsyLCAzLCA0LCA1XTtcclxuICBzaGlwTGVuZ3Rocy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3Qgc2hpcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwLWRpdlwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbTsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHNoaXBTcSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIC8vIHNoaXBTcS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgc3EwLXRvLXBsYWNlLSR7aW5kZXh9YCk7XHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgc2hpcFNxLmNsYXNzTGlzdC5hZGQoXCJzcTAtdG8tcGxhY2VcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNoaXBTcS5jbGFzc0xpc3QuYWRkKFwicHJlcC1zcXVhcmVcIik7XHJcbiAgICAgIHNoaXBTcS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuXHJcbiAgICAgIHNoaXBEaXYuYXBwZW5kQ2hpbGQoc2hpcFNxKTtcclxuICAgIH1cclxuICAgIHNoaXBEaXYuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcclxuICAgIHNoaXBEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHRvLXBsYWNlLSR7aW5kZXh9YCk7XHJcblxyXG4gICAgLy8gbmVlZCB0byBoYW5kbGUgZXJyb3IgLSB3aGVuIHRoZSBpdGVtIGlzIGRyYWdnZWQgaW4gdGhlIG1pZGRsZSBvZiB0d28gc3F1YXJlc1xyXG4gICAgc2hpcERpdi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWcpO1xyXG4gICAgc2hpcERpdi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnRW5kKTtcclxuICAgIHNoaXBEaXYuYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsICgpID0+IHtcclxuICAgICAgc2hpcERpdi5jbGFzc0xpc3QudG9nZ2xlKFwiZmxleC10b2dnbGVcIik7XHJcbiAgICB9KTtcclxuICAgIHNoaXBMaXN0LmFwcGVuZENoaWxkKHNoaXBEaXYpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBwbGFjZUluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IHBsYWNlSW5mb1NwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcGxhY2VJbmZvLmNsYXNzTGlzdC5hZGQoXCJwbGFjZS1pbmZvXCIpO1xyXG4gIHBsYWNlSW5mb1NwLnRleHRDb250ZW50ID1cclxuICAgIFwiRHJhZyAmIGRyb3AgdGhlIHNoaXBzIG9uIHRoZSBib2FyZC4gRG91YmxlY2xpY2sgYSBzaGlwIHRvIHJvdGF0ZSBpdC5cIjtcclxuICBwbGFjZUluZm8uYXBwZW5kQ2hpbGQocGxhY2VJbmZvU3ApO1xyXG4gIG1haW4uYXBwZW5kQ2hpbGQob3duQm9hcmQpO1xyXG4gIG93bkJvYXJkLmFwcGVuZENoaWxkKG93bkJvYXJkVGl0bGUpO1xyXG4gIG1haW4uYXBwZW5kQ2hpbGQocGxhY2VTaGlwcyk7XHJcbiAgcGxhY2VTaGlwcy5hcHBlbmRDaGlsZChzaGlwc1RpdGxlKTtcclxuICBwbGFjZVNoaXBzLmFwcGVuZENoaWxkKHNoaXBMaXN0KTtcclxuICBwbGFjZVNoaXBzLmFwcGVuZENoaWxkKHBsYWNlSW5mbyk7XHJcblxyXG4gIGRyYXdHcmlkKCk7XHJcbn1cclxuXHJcbi8vIGNoZWNrIGlmIGFsbCBzaGlwcyB3ZXJlIHBsYWNlZCBvbiB0aGUgYm9hcmRcclxuZnVuY3Rpb24gYXJlQWxsU2hpcHNQbGFjZWQoKSB7XHJcbiAgY29uc3QgcGxhY2VTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2Utc2hpcHNcIik7XHJcbiAgY29uc3Qgc2hpcExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXAtbGlzdFwiKTtcclxuICBpZiAoc2hpcExpc3QuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcclxuICAgIGNvbnN0IHN0YXJ0R2FtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBzdGFydEdhbWUudGV4dENvbnRlbnQgPSBcIlN0YXJ0IGdhbWVcIjtcclxuICAgIHN0YXJ0R2FtZS5jbGFzc0xpc3QuYWRkKFwic3RhcnQtZ2FtZVwiKTtcclxuICAgIHN0YXJ0R2FtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hlY2tQbGFjZWRTaGlwcyk7XHJcbiAgICBjb25zdCBwbGFjZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLWluZm9cIik7XHJcbiAgICBjb25zdCBwbGFjZUluZm9TcDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIHBsYWNlSW5mb1NwMi50ZXh0Q29udGVudCA9XHJcbiAgICAgIFwiT25jZSB5b3UncmUgaGFwcHkgd2l0aCB0aGUgcGxhY2VtZW50IG9mIHlvdXIgc2hpcHMsIGNsaWNrIHRoZSBzdGFydCBidXR0b24gdG8gYmVnaW4gdGhlIGdhbWUhXCI7XHJcbiAgICBwbGFjZUluZm8uYXBwZW5kQ2hpbGQoc3RhcnRHYW1lKTtcclxuICAgIHBsYWNlSW5mby5hcHBlbmRDaGlsZChwbGFjZUluZm9TcDIpO1xyXG4gICAgcGxhY2VTaGlwcy5hcHBlbmRDaGlsZChwbGFjZUluZm8pO1xyXG4gIH1cclxufVxyXG5cclxuLy8gKysrIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgcGxhY2VkIGNvcnJlY3RseVxyXG5mdW5jdGlvbiBjaGVja1BsYWNlZFNoaXBzKCkge1xyXG4gIHBsYXlHYW1lKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYWNlbWVudEVycm9yKCkge1xyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzXCIpO1xyXG4gIGNvbnN0IGVycm9yTXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBlcnJvck1zZy5jbGFzc0xpc3QuYWRkKFwiZXJyb3ItbXNnXCIpO1xyXG4gIGVycm9yTXNnLnRleHRDb250ZW50ID1cclxuICAgIFwiU29tZSBzaGlwcyBkb24ndCBmaXQgb24gdGhlIGJvYXJkIG9yIG92ZXJsYXAuIFVzZSBkcmFnICYgZHJvcCB0byBtb3ZlIHRoZW0gb3IgZG91YmxlIGNsaWNrIHRvIHJvdGF0ZSB0aGVtIGJlZm9yZSB5b3UgY2FuIGJlZ2luIHRoZSBnYW1lLlwiO1xyXG4gIHBsYWNlU2hpcHMuYXBwZW5kQ2hpbGQoZXJyb3JNc2cpO1xyXG59XHJcblxyXG4vLyBwbGFjZSBzaGlwcyBvbiB0aGUgcGxheWVyJ3MgYm9hcmRcclxuZnVuY3Rpb24gcGxhY2VTaGlwcyhib2FyZCkge1xyXG4gIC8vIGdldCBwbGFjZWQgc2hpcHMgY29vcmRzXHJcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbMiwgMywgNCwgNV07XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHMubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjdG8tcGxhY2UtJHtpfWApO1xyXG4gICAgY29uc3QgY29vcmRTdGFydCA9IHNoaXAucGFyZW50Tm9kZS5pZDtcclxuICAgIGNvb3JkU3RhcnQuc3BsaXQoXCJcIik7XHJcbiAgICBsZXQgc3RhcnRSb3cgPSBwYXJzZUludChjb29yZFN0YXJ0WzFdKTtcclxuICAgIGxldCBzdGFydENvbHVtbiA9IHBhcnNlSW50KGNvb3JkU3RhcnRbM10pO1xyXG4gICAgbGV0IGxlbmd0aCA9IHBhcnNlSW50KHNoaXBMZW5ndGhzW2ldKTtcclxuICAgIGxldCBlbmRSb3cgPSBzdGFydFJvdyArIGxlbmd0aCAtIDE7XHJcbiAgICBsZXQgZW5kQ29sdW1uID0gc3RhcnRDb2x1bW4gKyBsZW5ndGggLSAxO1xyXG4gICAgbGV0IGZ1bGxDb29yZHM7XHJcbiAgICBpZiAoc2hpcC5jbGFzc0xpc3QuY29udGFpbnMoXCJmbGV4LXRvZ2dsZVwiKSkge1xyXG4gICAgICAvL3NoaXAgaXMgdmVydGljYWxcclxuICAgICAgaWYgKGVuZFJvdyA+IDkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBmdWxsQ29vcmRzID0gYm9hcmQuZ2V0RnVsbENvb3JkcyhbXHJcbiAgICAgICAgW3N0YXJ0Um93LCBzdGFydENvbHVtbl0sXHJcbiAgICAgICAgW2VuZFJvdywgc3RhcnRDb2x1bW5dLFxyXG4gICAgICBdKTtcclxuICAgICAgaWYgKGJvYXJkLmNoZWNrSWZPY2N1cGllZChmdWxsQ29vcmRzKSA9PSB0cnVlKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJheXl5XCIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGJvYXJkLnBsYWNlU2hpcChsZW5ndGgsIFtzdGFydFJvdywgc3RhcnRDb2x1bW5dLCBbZW5kUm93LCBzdGFydENvbHVtbl0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hpcCBpcyBob3Jpem9udGFsXHJcbiAgICAgIGlmIChlbmRDb2x1bW4gPiA5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgZnVsbENvb3JkcyA9IGJvYXJkLmdldEZ1bGxDb29yZHMoW1xyXG4gICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2x1bW5dLFxyXG4gICAgICAgIFtzdGFydFJvdywgZW5kQ29sdW1uXSxcclxuICAgICAgXSk7XHJcbiAgICAgIGlmIChib2FyZC5jaGVja0lmT2NjdXBpZWQoZnVsbENvb3JkcykgPT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYXl5eVwiKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBib2FyZC5wbGFjZVNoaXAobGVuZ3RoLCBbc3RhcnRSb3csIHN0YXJ0Q29sdW1uXSwgW3N0YXJ0Um93LCBlbmRDb2x1bW5dKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFuUGxhY2VEb20oKSB7XHJcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcclxuICB3aGlsZSAobWFpbi5maXJzdENoaWxkKSB7XHJcbiAgICBtYWluLnJlbW92ZUNoaWxkKG1haW4uZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBjcmVhdGVEb20sIHByZXBhcmVTaGlwcywgcGxhY2VTaGlwcywgY2xlYW5QbGFjZURvbSwgcGxhY2VtZW50RXJyb3IgfTtcclxuIiwiaW1wb3J0IHsgcGxhY2VTaGlwcywgY2xlYW5QbGFjZURvbSwgcGxhY2VtZW50RXJyb3IgfSBmcm9tIFwiLi9kb20uanNcIjtcclxuXHJcbmxldCBjdXJyZW50UGxheWVyID0gbnVsbDtcclxuY29uc3QgcG9zc2libGVTY29yZSA9IDE1O1xyXG5cclxuY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBpZCkge1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmhpdHMgPSAwO1xyXG4gICAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuaGl0cyArPSAxO1xyXG4gICAgdGhpcy5pc1N1bmsoKTtcclxuICB9XHJcblxyXG4gIGlzU3VuaygpIHtcclxuICAgIGlmICh0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3Iob3duZXIpIHtcclxuICAgIHRoaXMuZ3JpZCA9IHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xyXG4gICAgdGhpcy5zaGlwc0xpc3QgPSBbXTtcclxuICAgIHRoaXMucmVjZWl2ZWRIaXRzID0gMDtcclxuICAgIHRoaXMubG9zdEdhbWUgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hpcExlbmd0aHMgPSBbMiwgMywgNCwgNV07XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAobGVuZ3RoLCBjb29yZHNTdGFydCwgY29vcmRzRW5kKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuc2hpcHNMaXN0Lmxlbmd0aDtcclxuICAgIGNvbnN0IHBsYWNlZFNoaXAgPSBuZXcgU2hpcChsZW5ndGgsIGlkKTtcclxuXHJcbiAgICAvLyBpZiB0aGUgc2hpcCdzIGxlbmd0aCA+IDIsIG1hcmsgdGhlIG90aGVyIHNxdWFyZXMgdG9vXHJcbiAgICB0aGlzLnNoaXBzTGlzdC5wdXNoKHBsYWNlZFNoaXApO1xyXG4gICAgaWYgKGNvb3Jkc1N0YXJ0WzBdICE9PSBjb29yZHNFbmRbMF0pIHtcclxuICAgICAgZm9yIChsZXQgaSA9IGNvb3Jkc1N0YXJ0WzBdOyBpIDw9IGNvb3Jkc0VuZFswXTsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5ncmlkW2ldW2Nvb3Jkc1N0YXJ0WzFdXSA9IGlkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY29vcmRzU3RhcnRbMV0gIT09IGNvb3Jkc0VuZFsxXSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gY29vcmRzU3RhcnRbMV07IGkgPD0gY29vcmRzRW5kWzFdOyBpKyspIHtcclxuICAgICAgICB0aGlzLmdyaWRbY29vcmRzU3RhcnRbMF1dW2ldID0gaWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1bY29vcmRzU3RhcnRbMV1dID0gaWQ7XHJcbiAgICB0aGlzLmdyaWRbY29vcmRzRW5kWzBdXVtjb29yZHNFbmRbMV1dID0gaWQ7XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xyXG4gICAgbGV0IHNxdWFyZTtcclxuICAgIGxldCBpZCA9IHRoaXMuZ3JpZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV07XHJcbiAgICAvLyBjb25zb2xlLmxvZyhpZCk7XHJcbiAgICBpZiAoaWQgPT09IFwibWlzc1wiIHx8IGlkID09PSBcImhpdFwiKSB7XHJcbiAgICAgIC8vIHRyeSBhZ2FpbiBpZiBpbnZhbGlkIG1vdmVcclxuICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkIG1vdmVcIik7XHJcbiAgICAgIHJldHVybiBcImludmFsaWQgbW92ZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjdXJyZW50UGxheWVyID09PSBcImh1bWFuXCIpIHtcclxuICAgICAgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICBgLmVuZW15LXNxdWFyZSNyJHtjb29yZHNbMF19YyR7Y29vcmRzWzFdfWBcclxuICAgICAgKTtcclxuICAgICAgY3VycmVudFBsYXllciA9IFwiQUlcIjtcclxuICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYXllciA9PT0gXCJBSVwiKSB7XHJcbiAgICAgIHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5vd24tc3F1YXJlI3Ike2Nvb3Jkc1swXX1jJHtjb29yZHNbMV19YCk7XHJcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBcImh1bWFuXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy9yZWNvcmQgYSBoaXQgb3IgbWlzc1xyXG4gICAgaWYgKGlkID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuZ3JpZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPSBcIm1pc3NcIjtcclxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgIGxldCBoaXRTaGlwID0gdGhpcy5zaGlwc0xpc3RbaWRdO1xyXG4gICAgICB0aGlzLmdyaWRbY29vcmRzWzBdXVtjb29yZHNbMV1dID0gXCJoaXRcIjtcclxuICAgICAgaGl0U2hpcC5oaXQoKTtcclxuICAgICAgdGhpcy5yZWNlaXZlZEhpdHMgKz0gMTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwib3duZXI6IFwiICsgdGhpcy5vd25lcik7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmdyaWQpO1xyXG4gICAgLy9pZiBpdCdzIEFJJ3MgdHVybiBub3csIHNlbmQgYW4gYXR0YWNrXHJcbiAgICBpZiAoY3VycmVudFBsYXllciA9PT0gXCJBSVwiKSB7XHJcbiAgICAgIHRoaXMuQUlhdHRhY2soKTtcclxuICAgIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ3JpZCk7XHJcbiAgfVxyXG5cclxuICBwbGF5ZXJBdHRhY2soY29vcmRzKSB7XHJcbiAgICAvLyBpZiBpdCdzIG5vdCB0aGUgcGxheWVyJ3MgdHVybiwgY2xpY2tpbmcgb24gZW5lbXkgYm9hcmQgd2lsbCBkbyBub3RoaW5nXHJcbiAgICBpZiAoY3VycmVudFBsYXllciA9PT0gXCJodW1hblwiKSB7XHJcbiAgICAgIHRoaXMucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgQUlhdHRhY2soKSB7XHJcbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSk7XHJcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSk7XHJcbiAgICBpZiAodGhpcy5ncmlkW3hdW3ldID09PSBcImhpdFwiIHx8IHRoaXMuZ3JpZFt4XVt5XSA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuQUlhdHRhY2soKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlY2VpdmVBdHRhY2soW3gsIHldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrSWZMb3N0KCkge1xyXG4gICAgaWYgKHRoaXMucmVjZWl2ZWRIaXRzID49IHBvc3NpYmxlU2NvcmUpIHtcclxuICAgICAgdGhpcy5sb3N0R2FtZSA9IHRydWU7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlR3JpZCgpIHtcclxuICAgIGxldCBncmlkQXJyYXkgPSBbXTtcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xyXG4gICAgICBncmlkQXJyYXkucHVzaChbXSk7XHJcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xyXG4gICAgICAgIGdyaWRBcnJheVt5XS5wdXNoKG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ3JpZEFycmF5O1xyXG4gIH1cclxuXHJcbiAgLy8gZ2VuZXJhdGUgcmFuZG9tIHNoaXBzIGFuZCBwbGFjZSB0aGVtIG9uIHRoZSBlbmVteSBib2FyZFxyXG4gIGdldFJhbmRvbVBsYWNlbWVudCgpIHtcclxuICAgIGZvciAobGV0IGkgPSB0aGlzLnNoaXBMZW5ndGhzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGNvbnN0IHNoaXBMID0gcGFyc2VJbnQodGhpcy5zaGlwTGVuZ3Roc1tpXSk7XHJcbiAgICAgIGxldCBjb29yZHMgPSB0aGlzLmdldE5ld0Nvb3JkcyhzaGlwTCk7XHJcbiAgICAgIHRoaXMucGxhY2VTaGlwKFxyXG4gICAgICAgIHNoaXBMLFxyXG4gICAgICAgIFtjb29yZHNbMF1bMF0sIGNvb3Jkc1swXVsxXV0sXHJcbiAgICAgICAgW2Nvb3Jkc1sxXVswXSwgY29vcmRzWzFdWzFdXVxyXG4gICAgICApO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmdyaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gcnVucyBmdW5jdGlvbnMgZ2VuZXJhdGluZyBhbmQgY2hlY2tpbmcgaWYgbmV3IGNvb3JkcyBhcmUgdmFsaWQsIHJldHVybnMgY29vcmRzIGZvciBvbmUgc2hpcCBvciB1c2VzIHJlY3Vyc2lvbiB0byBzdGFydCBvdmVyIHRoZSBwcm9jZXNzIGlmIGNvb3JkcyBhcmUgaW52YWxpZFxyXG4gIGdldE5ld0Nvb3JkcyhzaGlwTGVuZ3RoKSB7XHJcbiAgICBsZXQgY29vcmRzID0gdGhpcy5yYW5kb21pemVDb29yZHMocGFyc2VJbnQoc2hpcExlbmd0aCkpO1xyXG4gICAgbGV0IGZ1bGxDb29yZHMgPSB0aGlzLmdldEZ1bGxDb29yZHMoY29vcmRzKTtcclxuICAgIGxldCBjb29yZENoZWNrID0gdGhpcy5jaGVja0lmT2NjdXBpZWQoZnVsbENvb3Jkcyk7XHJcbiAgICBpZiAoY29vcmRDaGVjayA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIGNvb3JkcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldE5ld0Nvb3JkcyhwYXJzZUludChzaGlwTGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyB1c2VzIG1hdGgucmFuZG9tIHRvIGdldCByYW5kb20gY29vcmRpbmF0ZXMgb24gdGhlIGJvYXJkLCByYW5kb21pemUgd2hldGVyIHRoZSBuZXcgc2hpcCB3aWxsIGJlIHZlcnRpY2FsIG9yIGhvcml6b250YWwsIGNhbGN1bGF0ZSB0aGF0IGl0IGZpdHMgb24gdGhlIGJvYXJkIGFjY29yZGluZyB0byB0aGUgc2hpcHMgbGVuZ3RoXHJcbiAgcmFuZG9taXplQ29vcmRzKHNoaXBMZW5ndGgpIHtcclxuICAgIGNvbnN0IHN0YXJ0Um93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgY29uc3Qgc3RhcnRDb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBjb25zdCBlbmRSb3cgPSBzdGFydFJvdyArIHBhcnNlSW50KHNoaXBMZW5ndGgpIC0gMTtcclxuICAgIGNvbnN0IGVuZENvbCA9IHN0YXJ0Q29sICsgcGFyc2VJbnQoc2hpcExlbmd0aCkgLSAxO1xyXG5cclxuICAgIGlmIChlbmRSb3cgPCAxMCAmJiBlbmRDb2wgPCAxMCkge1xyXG4gICAgICAvL3JhbmRvbWl6ZSAtIGhvcml6b250YWwgb3IgdmVydGljYWxcclxuICAgICAgbGV0IGNoYW5jZSA9IE1hdGgucmFuZG9tKCkgKiAxO1xyXG4gICAgICBpZiAoY2hhbmNlIDwgMC41KSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgICAgW3N0YXJ0Um93LCBlbmRDb2xdLFxyXG4gICAgICAgIF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgICAgW2VuZFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgIF07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZW5kQ29sIDwgMTApIHtcclxuICAgICAgcmV0dXJuIFtcclxuICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgICBbc3RhcnRSb3csIGVuZENvbF0sXHJcbiAgICAgIF07XHJcbiAgICB9IGVsc2UgaWYgKGVuZFJvdyA8IDEwKSB7XHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgW3N0YXJ0Um93LCBzdGFydENvbF0sXHJcbiAgICAgICAgW2VuZFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmFuZG9taXplQ29vcmRzKHNoaXBMZW5ndGgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZ2V0cyBmdWxsIGNvb3JkaW5hdGVzIG9mIGV2ZXJ5IHNxdWFyZSBpbiBhIHNpbmdsZSBzaGlwXHJcbiAgZ2V0RnVsbENvb3Jkcyhjb29yZHMpIHtcclxuICAgIGxldCByb3dTdGFydCA9IHBhcnNlSW50KGNvb3Jkc1swXVswXSk7XHJcbiAgICBsZXQgY29sU3RhcnQgPSBwYXJzZUludChjb29yZHNbMF1bMV0pO1xyXG4gICAgbGV0IHJvd0VuZCA9IHBhcnNlSW50KGNvb3Jkc1sxXVswXSk7XHJcbiAgICBsZXQgY29sRW5kID0gcGFyc2VJbnQoY29vcmRzWzFdWzFdKTtcclxuXHJcbiAgICBsZXQgZnVsbENvb3JkaW5hdGVzID0gW107XHJcbiAgICBpZiAocm93U3RhcnQgIT09IHJvd0VuZCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gcm93U3RhcnQ7IGkgPD0gcm93RW5kOyBpKyspIHtcclxuICAgICAgICBmdWxsQ29vcmRpbmF0ZXMucHVzaChbaSwgY29sU3RhcnRdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGNvbFN0YXJ0ICE9PSBjb2xFbmQpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IGNvbFN0YXJ0OyBpIDw9IGNvbEVuZDsgaSsrKSB7XHJcbiAgICAgICAgZnVsbENvb3JkaW5hdGVzLnB1c2goW3Jvd1N0YXJ0LCBpXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmdWxsQ29vcmRpbmF0ZXM7XHJcbiAgfVxyXG5cclxuICAvLyBjaGVjayBpZiBhbnkgc3F1YXJlIG9mIHRoZSBuZXcgc2hpcCBpcyBhbHJlYWR5IG9jY3VwaWVkOyBpZiBzbywgc2VuZCBpbmZvIHRvIHByZXZpb3VzIGZ1bmN0aW9ucyB0byBnZW5lcmF0ZSBuZXcgc2hpcCBjb29yZGluYXRlcyBpbnN0ZWFkXHJcbiAgY2hlY2tJZk9jY3VwaWVkKGZ1bGxDb29yZGluYXRlcykge1xyXG4gICAgLy8gY29uc29sZS5sb2coZnVsbENvb3JkaW5hdGVzKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVsbENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBjb29yZCA9IGZ1bGxDb29yZGluYXRlc1tpXTtcclxuICAgICAgaWYgKHRoaXMuZ3JpZFtwYXJzZUludChjb29yZFswXSldW3BhcnNlSW50KGNvb3JkWzFdKV0gIT09IG51bGwpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNoZWNrIC0gb2NjdXBpZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGRyYXdHcmlkKCkge1xyXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcclxuICAgIGNvbnN0IGFycmF5ID0gdGhpcy5ncmlkO1xyXG4gICAgLy8gY29uc29sZS5sb2coYXJyYXkpO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGFycmF5LmZvckVhY2goKHJvdywgcmluZGV4KSA9PiB7XHJcbiAgICAgIHJvdy5mb3JFYWNoKChjb2x1bW4sIGNpbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGByJHtyaW5kZXh9YyR7Y2luZGV4fWApO1xyXG4gICAgICAgIGlmICh0aGlzLm93bmVyID09PSBcImh1bWFuXCIpIHtcclxuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwib3duLXNxdWFyZVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3duZXIgPT09IFwiQUlcIikge1xyXG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJlbmVteS1zcXVhcmVcIik7XHJcbiAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJBdHRhY2soW3JpbmRleCwgY2luZGV4XSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb2x1bW4gPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coY29sdW1uKTtcclxuICAgICAgICAgIGlmICh0aGlzLm93bmVyID09PSBcImh1bWFuXCIpIHtcclxuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJvd24tc2hpcFwiKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBtYXJraW5nIG9mIGVuZW15IHNoaXBzIGluIHRoZSBmaW5hbCB2ZXJzaW9uIG9mIHRoZSBnYW1lXHJcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZW5lbXktc2hpcFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhvc2UgdHdvIGlmcyBhcmUgbmVlZGVkLCBwb3NzaWJseSByZW1vdmVcclxuICAgICAgICBpZiAoY29sdW1uID09PSBcIm1pc3NcIikge1xyXG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29sdW1uID09PSBcImhpdFwiKSB7XHJcbiAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMub3duZXIgPT09IFwiaHVtYW5cIikge1xyXG4gICAgICBncmlkLmNsYXNzTGlzdC5hZGQoXCJncmlkLW93blwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZChcImdyaWQtZW5lbXlcIik7XHJcbiAgICB9XHJcbiAgICBncmlkLmNsYXNzTGlzdC5hZGQoXCJncmlkXCIpO1xyXG4gICAgbWFpbi5hcHBlbmRDaGlsZChncmlkKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3Iob3duZXIpIHtcclxuICAgIHRoaXMub3duZXIgPSBvd25lcjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYXlHYW1lKCkge1xyXG4gIGNvbnN0IHBsYXllckEgPSBuZXcgUGxheWVyKFwiaHVtYW5cIik7XHJcbiAgY29uc3QgcGxheWVyQiA9IG5ldyBQbGF5ZXIoXCJBSVwiKTtcclxuICBjb25zdCBib2FyZEEgPSBuZXcgR2FtZWJvYXJkKFwiaHVtYW5cIik7XHJcbiAgY29uc3QgYm9hcmRCID0gbmV3IEdhbWVib2FyZChcIkFJXCIpO1xyXG5cclxuICBsZXQgY2hlY2tQbGFjZWQgPSBwbGFjZVNoaXBzKGJvYXJkQSk7XHJcbiAgaWYgKGNoZWNrUGxhY2VkID09PSB0cnVlKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcInRydWVlXCIpO1xyXG4gICAgcmV0dXJuIHBsYWNlbWVudEVycm9yKCk7XHJcbiAgfVxyXG4gIGNsZWFuUGxhY2VEb20oKTtcclxuICBib2FyZEEuZHJhd0dyaWQoKTtcclxuICBib2FyZEIuZ2V0UmFuZG9tUGxhY2VtZW50KCk7XHJcbiAgYm9hcmRCLmRyYXdHcmlkKCk7XHJcbiAgLy8gY29uc29sZS5sb2coYm9hcmRCLmdyaWQpO1xyXG4gIGN1cnJlbnRQbGF5ZXIgPSBcImh1bWFuXCI7XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIGdhbWVMb29wKCkge1xyXG5cclxuLy99XHJcbi8vIHdhaXQgZm9yIHBsYXllcnMgYXR0YWNrLi4uXHJcbi8vIGFmdGVyIHBsYXllciBjbGlja3Mgb24gYSBzcXVhcmUgc2VuZGluZyBhbiBhdHRhY2ssIHJ1biByZWNlaXZlIGF0dGFjayBvbiBlbmVteSBib2FyZFxyXG4vLyBibG9jayB0aGUgcG9zc2liaWxpdHkgb2YgdXNlciBhdHRhY2tpbmdcclxuLy8gZ2VuZXJhdGUgcmFuZG9tIGhpdCBvZiB0aGUgYWlcclxuLy8gcnVuIHJlY2VpdmUgYXR0YWNrIG9uIGh1bWFuIGJvYXJkXHJcbi8vIGVuYWJsZSBsaXN0ZW5lcnMgb24gZW5lbXkgYm9hcmRcclxuLy8gd2FpdCBmb3IgcGxheWVyIHRvIGF0dGFjay4uLlxyXG4vL31cclxuXHJcbmV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgUGxheWVyLCBwbGF5R2FtZSB9O1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUNpbnplbDp3Z2h0QDgwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbiAgcGFkZGluZzogMHB4O1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGQxZTI2O1xyXG4gIGNvbG9yOiAjZGNhODVkO1xyXG59XHJcblxyXG4uaGVhZGVyIHtcclxuICBtYXJnaW46IDEycHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmhlYWRlciA+IHNwYW4ge1xyXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xyXG4gIGZvbnQtZmFtaWx5OiAnQ2luemVsJywgc2VyaWY7XHJcbiAgdGV4dC1zaGFkb3c6ICMzYzNkNTEgMHB4IC0xMHB4IDZweCwgMnB4IDJweCAycHggIzVmNTYxYjtcclxuICBib3JkZXItYm90dG9tOiAjZGNhODVkIDJweCBzb2xpZDtcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbn1cclxuXHJcbi5tYWluIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4uZ3JpZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjhweCk7XHJcbiAgY29sdW1uLWdhcDogMHB4O1xyXG4gIHJvdy1nYXA6IDBweDtcclxuICBqdXN0aWZ5LWl0ZW1zOiBzdHJldGNoO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBtYXJnaW46IDAgMTJweDtcclxufVxyXG5cclxuLm93bi1zcXVhcmUsIC5lbmVteS1zcXVhcmUsIC5wcmVwLXNxdWFyZSB7XHJcbiAgd2lkdGg6IDI4cHg7XHJcbiAgaGVpZ2h0OiAyOHB4O1xyXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbn1cclxuXHJcbi5lbmVteS1zcXVhcmU6aG92ZXIge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmVuZW15LXNxdWFyZS5oaXQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtncmVlbjtcclxufVxyXG5cclxuLmVuZW15LXNxdWFyZS5taXNzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xyXG59XHJcblxyXG4ub3duLXNxdWFyZS5taXNzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xyXG59XHJcblxyXG4ub3duLXNxdWFyZS5oaXQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDk4LCAyMDUpO1xyXG59XHJcblxyXG4ub3duLXNxdWFyZS5zaGlwLCAucHJlcC1zcXVhcmUuc2hpcHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTI1M2Q2O1xyXG59XHJcblxyXG5cclxuI2RpdjEge1xyXG4gIHdpZHRoOiAzNTBweDtcclxuICBoZWlnaHQ6IDcwcHg7XHJcbiAgcGFkZGluZzogMTBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjYWFhYWFhO1xyXG59XHJcblxyXG4ub3duLWJvYXJkIHtcclxuICBtYXJnaW46IDZweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB3aWR0aDogMzAwcHg7XHJcbn1cclxuXHJcbi5wbGFjZS1zaGlwcyB7XHJcbiAgbWFyZ2luOiA2cHggMjRweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgd2lkdGg6IDMwMHB4O1xyXG59XHJcblxyXG4ucGxhY2Utc2hpcHMgPiBzcGFuLCAub3duLWJvYXJkID4gc3BhbiB7XHJcbiAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcblxyXG4uc2hpcC1kaXYge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luOiA0cHg7XHJcbn1cclxuXHJcbi5zaGlwLW9uLWJvYXJkIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbn1cclxuXHJcbi5zaGlwc3Ege1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1NiA5IDEzNSk7XHJcbn1cclxuXHJcbi5zcTAtdG8tcGxhY2U6aG92ZXIge1xyXG4gIGN1cnNvcjogZ3JhYjtcclxufVxyXG5cclxuLmZsZXgtdG9nZ2xlIHtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4ucGxhY2UtaW5mbyB7XHJcbiAgbWFyZ2luLXRvcDogNnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG5cclxuLnN0YXJ0LWdhbWUge1xyXG4gIG1hcmdpbjogMTBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTEzNjRhO1xyXG4gIGNvbG9yOiAjZGNhODVkO1xyXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XHJcbiAgcGFkZGluZzogNnB4IDE4cHg7XHJcbiAgZm9udC1zaXplOiAxLjJyZW07XHJcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG59XHJcblxyXG4uc3RhcnQtZ2FtZTpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5zdGFydC1nYW1lOmFjdGl2ZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU2IDkgMTM1KTtcclxufVxyXG5cclxuLm93bi1zaGlwIHtcclxuICBiYWNrZ3JvdW5kOiAjMTI1M2Q2O1xyXG59XHJcblxyXG4uZ3JpZC1lbmVteSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU4LCAzOSwgMTA0KTtcclxufVxyXG5cclxuLmdyaWQtb3duIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjM0ZTY2O1xyXG59XHJcblxyXG4uZ3JpZC1wbGFjZS1vd24ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzRlNjY7XHJcbn1cclxuXHJcbi5lbmVteS1zaGlwIHtcclxuICBiYWNrZ3JvdW5kOiByZ2IoMTc1LCAxMywgNDApO1xyXG59XHJcblxyXG4uZXJyb3ItbXNnIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTgsIDM5LCAxMDQpO1xyXG4gIG1hcmdpbjogOHB4IDBweDtcclxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xyXG4gIHBhZGRpbmc6IDZweDtcclxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQiw0QkFBNEI7RUFDNUIsdURBQXVEO0VBQ3ZELGdDQUFnQztFQUNoQyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxlQUFlO0VBQ2YsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7OztBQUdBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixhQUFhO0VBQ2IseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2QseUJBQXlCO0VBQ3pCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsZUFBZTtFQUNmLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Q2luemVsOndnaHRAODAwJmRpc3BsYXk9c3dhcCcpO1xcclxcblxcclxcbioge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIG1hcmdpbjogMHB4O1xcclxcbiAgcGFkZGluZzogMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZDFlMjY7XFxyXFxuICBjb2xvcjogI2RjYTg1ZDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciB7XFxyXFxuICBtYXJnaW46IDEycHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIgPiBzcGFuIHtcXHJcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcclxcbiAgZm9udC1mYW1pbHk6ICdDaW56ZWwnLCBzZXJpZjtcXHJcXG4gIHRleHQtc2hhZG93OiAjM2MzZDUxIDBweCAtMTBweCA2cHgsIDJweCAycHggMnB4ICM1ZjU2MWI7XFxyXFxuICBib3JkZXItYm90dG9tOiAjZGNhODVkIDJweCBzb2xpZDtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW4ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JpZCB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI4cHgpO1xcclxcbiAgY29sdW1uLWdhcDogMHB4O1xcclxcbiAgcm93LWdhcDogMHB4O1xcclxcbiAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXHJcXG4gIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gIG1hcmdpbjogMCAxMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4ub3duLXNxdWFyZSwgLmVuZW15LXNxdWFyZSwgLnByZXAtc3F1YXJlIHtcXHJcXG4gIHdpZHRoOiAyOHB4O1xcclxcbiAgaGVpZ2h0OiAyOHB4O1xcclxcbiAgYm9yZGVyOiAxcHggI2RjYTg1ZCBzb2xpZDtcXHJcXG4gIG1hcmdpbjogMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZW5lbXktc3F1YXJlOmhvdmVyIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmVuZW15LXNxdWFyZS5oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya2dyZWVuO1xcclxcbn1cXHJcXG5cXHJcXG4uZW5lbXktc3F1YXJlLm1pc3Mge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXHJcXG59XFxyXFxuXFxyXFxuLm93bi1zcXVhcmUubWlzcyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcclxcbn1cXHJcXG5cXHJcXG4ub3duLXNxdWFyZS5oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgOTgsIDIwNSk7XFxyXFxufVxcclxcblxcclxcbi5vd24tc3F1YXJlLnNoaXAsIC5wcmVwLXNxdWFyZS5zaGlwe1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEyNTNkNjtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuI2RpdjEge1xcclxcbiAgd2lkdGg6IDM1MHB4O1xcclxcbiAgaGVpZ2h0OiA3MHB4O1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNhYWFhYWE7XFxyXFxufVxcclxcblxcclxcbi5vd24tYm9hcmQge1xcclxcbiAgbWFyZ2luOiA2cHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICB3aWR0aDogMzAwcHg7XFxyXFxufVxcclxcblxcclxcbi5wbGFjZS1zaGlwcyB7XFxyXFxuICBtYXJnaW46IDZweCAyNHB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB3aWR0aDogMzAwcHg7XFxyXFxufVxcclxcblxcclxcbi5wbGFjZS1zaGlwcyA+IHNwYW4sIC5vd24tYm9hcmQgPiBzcGFuIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1kaXYge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIG1hcmdpbjogNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1vbi1ib2FyZCB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBtYXJnaW46IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXBzcSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYgOSAxMzUpO1xcclxcbn1cXHJcXG5cXHJcXG4uc3EwLXRvLXBsYWNlOmhvdmVyIHtcXHJcXG4gIGN1cnNvcjogZ3JhYjtcXHJcXG59XFxyXFxuXFxyXFxuLmZsZXgtdG9nZ2xlIHtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5wbGFjZS1pbmZvIHtcXHJcXG4gIG1hcmdpbi10b3A6IDZweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhcnQtZ2FtZSB7XFxyXFxuICBtYXJnaW46IDEwcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTEzNjRhO1xcclxcbiAgY29sb3I6ICNkY2E4NWQ7XFxyXFxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xcclxcbiAgcGFkZGluZzogNnB4IDE4cHg7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXJ0LWdhbWU6aG92ZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXJ0LWdhbWU6YWN0aXZlIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1NiA5IDEzNSk7XFxyXFxufVxcclxcblxcclxcbi5vd24tc2hpcCB7XFxyXFxuICBiYWNrZ3JvdW5kOiAjMTI1M2Q2O1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JpZC1lbmVteSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTgsIDM5LCAxMDQpO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JpZC1vd24ge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIzNGU2NjtcXHJcXG59XFxyXFxuXFxyXFxuLmdyaWQtcGxhY2Utb3duIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMzRlNjY7XFxyXFxufVxcclxcblxcclxcbi5lbmVteS1zaGlwIHtcXHJcXG4gIGJhY2tncm91bmQ6IHJnYigxNzUsIDEzLCA0MCk7XFxyXFxufVxcclxcblxcclxcbi5lcnJvci1tc2cge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU4LCAzOSwgMTA0KTtcXHJcXG4gIG1hcmdpbjogOHB4IDBweDtcXHJcXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XFxyXFxuICBwYWRkaW5nOiA2cHg7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBjcmVhdGVEb20sIHByZXBhcmVTaGlwcywgY2xlYW5QbGFjZURvbSB9IGZyb20gXCIuL2RvbS5qc1wiO1xyXG5pbXBvcnQgeyBQbGF5ZXIsIEdhbWVib2FyZCwgcGxheUdhbWUgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XHJcbmltcG9ydCBjc3MgZnJvbSBcIi4vc3R5bGUuY3NzXCI7XHJcblxyXG5jcmVhdGVEb20oKTtcclxucHJlcGFyZVNoaXBzKCk7XHJcblxyXG4vKiBmb3IgdGVzdHMgLSBzaG93IG9ubHkgZW5lbXkgYm9hcmRcclxuY2xlYW5QbGFjZURvbSgpO1xyXG5jb25zdCBwbGF5ZXJCID0gbmV3IFBsYXllcihcIkFJXCIpO1xyXG5jb25zdCBib2FyZEIgPSBuZXcgR2FtZWJvYXJkKFwiQUlcIik7XHJcbmJvYXJkQi5yYW5kb21pemVQbGFjZW1lbnQoKTtcclxuYm9hcmRCLmRyYXdHcmlkKCk7XHJcbiovXHJcbiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJQbGF5ZXIiLCJwbGF5R2FtZSIsImFsbG93RHJvcCIsImV2IiwicHJldmVudERlZmF1bHQiLCJkcmFnIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInRhcmdldCIsImlkIiwiZHJvcCIsImRhdGEiLCJnZXREYXRhIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwiY29uc29sZSIsImxvZyIsImRyYWdFbmQiLCJhcmVBbGxTaGlwc1BsYWNlZCIsImNyZWF0ZUdyaWQiLCJncmlkQXJyYXkiLCJ4IiwicHVzaCIsInkiLCJkcmF3R3JpZCIsIm93bkJvYXJkIiwicXVlcnlTZWxlY3RvciIsImFycmF5IiwiYm9keSIsImdyaWQiLCJjcmVhdGVFbGVtZW50IiwiZm9yRWFjaCIsInJvdyIsInJpbmRleCIsImNlbGwiLCJjaW5kZXgiLCJzcXVhcmUiLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiY3JlYXRlRG9tIiwiaGVhZGVyIiwibWFpbiIsImZvb3RlciIsInRpdGxlIiwidGV4dENvbnRlbnQiLCJwcmVwYXJlU2hpcHMiLCJvd25Cb2FyZFRpdGxlIiwicGxhY2VTaGlwcyIsInNoaXBzVGl0bGUiLCJzaGlwTGlzdCIsInNoaXBMZW5ndGhzIiwiaXRlbSIsImluZGV4Iiwic2hpcERpdiIsImkiLCJzaGlwU3EiLCJ0b2dnbGUiLCJwbGFjZUluZm8iLCJwbGFjZUluZm9TcCIsImNoaWxkTm9kZXMiLCJsZW5ndGgiLCJzdGFydEdhbWUiLCJjaGVja1BsYWNlZFNoaXBzIiwicGxhY2VJbmZvU3AyIiwicGxhY2VtZW50RXJyb3IiLCJlcnJvck1zZyIsImJvYXJkIiwic2hpcCIsImNvb3JkU3RhcnQiLCJwYXJlbnROb2RlIiwic3BsaXQiLCJzdGFydFJvdyIsInBhcnNlSW50Iiwic3RhcnRDb2x1bW4iLCJlbmRSb3ciLCJlbmRDb2x1bW4iLCJmdWxsQ29vcmRzIiwiY29udGFpbnMiLCJnZXRGdWxsQ29vcmRzIiwiY2hlY2tJZk9jY3VwaWVkIiwicGxhY2VTaGlwIiwiY2xlYW5QbGFjZURvbSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImN1cnJlbnRQbGF5ZXIiLCJwb3NzaWJsZVNjb3JlIiwiU2hpcCIsImNvbnN0cnVjdG9yIiwiaGl0cyIsImRlc3Ryb3llZCIsImhpdCIsImlzU3VuayIsIm93bmVyIiwic2hpcHNMaXN0IiwicmVjZWl2ZWRIaXRzIiwibG9zdEdhbWUiLCJjb29yZHNTdGFydCIsImNvb3Jkc0VuZCIsInBsYWNlZFNoaXAiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmRzIiwiaGl0U2hpcCIsIkFJYXR0YWNrIiwicGxheWVyQXR0YWNrIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY2hlY2tJZkxvc3QiLCJnZXRSYW5kb21QbGFjZW1lbnQiLCJzaGlwTCIsImdldE5ld0Nvb3JkcyIsInNoaXBMZW5ndGgiLCJyYW5kb21pemVDb29yZHMiLCJjb29yZENoZWNrIiwic3RhcnRDb2wiLCJlbmRDb2wiLCJjaGFuY2UiLCJyb3dTdGFydCIsImNvbFN0YXJ0Iiwicm93RW5kIiwiY29sRW5kIiwiZnVsbENvb3JkaW5hdGVzIiwiY29vcmQiLCJjb2x1bW4iLCJwbGF5ZXJBIiwicGxheWVyQiIsImJvYXJkQSIsImJvYXJkQiIsImNoZWNrUGxhY2VkIiwiY3NzIl0sInNvdXJjZVJvb3QiOiIifQ==