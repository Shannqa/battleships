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
      shipSq.classList.add("shipsq");
      shipDiv.appendChild(shipSq);
    }
    shipDiv.setAttribute("draggable", "true");
    shipDiv.setAttribute("id", `to-place-${index}`);

    // need to handle error - when the item is dragged in the middle of two squares
    shipDiv.addEventListener("dragstart", drag);
    shipDiv.addEventListener("dblclick", () => {
      shipDiv.classList.toggle("flex-toggle");
    });
    shipList.appendChild(shipDiv);
  });
  const placeInfo = document.createElement("div");
  const placeInfoSp = document.createElement("span");
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
// possibleScore depends on the overall nr of ships and their length
// available ships:
// 1x 5-square
// 1x 4-square
// 2x 3-square
// 2x 2-square
// = 19 possible score

const possibleScore = 19;
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
  placeShip(length, coordsStart, coordsEnd) {
    const id = this.shipsList.length;
    const placedShip = new Ship(length, id);
    // const placedShip = new Ship(length, coordsStart, coordsEnd);
    // console.log(this.grid[coordsStart[0]][coordsStart[1]]);
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
    for (let x = 0; x < 10; x++) {
      gridArray.push([]);
      for (let y = 0; y < 10; y++) {
        gridArray[x].push(null);
      }
    }
    return gridArray;
  }
  drawGrid() {
    const array = this.grid;
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
        grid.appendChild(square);
      });
    });
    grid.classList.add("grid");
    body.appendChild(grid);
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
  boardA.placeShip(2, [5, 7], [6, 7]);
  boardA.placeShip(3, [1, 4], [1, 6]);
  boardA.placeShip(3, [3, 5], [3, 8]);
  // boardA.placeShip(4, [8, 3], [8, 6]);
  console.log(boardA.grid);
  boardB.placeShip(2, [4, 1], [5, 1]);
  boardB.placeShip(3, [5, 7], [5, 9]);
  boardB.placeShip(4, [2, 3], [2, 6]);
  boardA.drawGrid();
  boardB.drawGrid();
  /*
  while (boardA.lostGame === false && boardB.lostGame === false) {
    boardB.receiveAttack();
    boardA.receiveAttack();
  }
  */

  // boardA.receiveAttack(5, 7);
  // boardA.receiveAttack(6, 7);
  // console.log(boardA.shipsList);
  //console.log(boardA);
  // boardA.receiveAttack(1, 4);
  // boardA.drawGrid();
}

/*
const testShip = new Ship();
const board = new Gameboard();
board.createGrid();
board.placeShip(3, [1, 3], [3, 3]);
//board.#id;
testShip.hit();
console.log(testShip.shipID);
console.log(testShip.msg);

console.log(board.grid);
console.log(testShip.shipID);
const testShip1 = new Ship();
console.log(testShip1.shipID);
*/


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
}

.square {
  width: 28px;
  height: 28px;
  border: 1px #dca85d solid;
  background: #234e66;
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,4BAA4B;EAC5B,uDAAuD;EACvD,gCAAgC;EAChC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,eAAe;EACf,YAAY;EACZ,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,eAAe;AACjB","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@800&display=swap');\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  margin: 0px;\r\n  padding: 0px;\r\n}\r\n\r\nbody {\r\n  background-color: #0d1e26;\r\n  color: #dca85d;\r\n}\r\n\r\n.header {\r\n  margin: 12px;\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.header > span {\r\n  font-size: 2.5rem;\r\n  font-family: 'Cinzel', serif;\r\n  text-shadow: #3c3d51 0px -10px 6px, 2px 2px 2px #5f561b;\r\n  border-bottom: #dca85d 2px solid;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.main {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 28px);\r\n  column-gap: 0px;\r\n  row-gap: 0px;\r\n  justify-items: stretch;\r\n  font-size: 12px;\r\n}\r\n\r\n.square {\r\n  width: 28px;\r\n  height: 28px;\r\n  border: 1px #dca85d solid;\r\n  background: #234e66;\r\n  margin: 0px;\r\n}\r\n\r\n.squareB {\r\n  background: #234e66;\r\n}\r\n\r\n.miss {\r\n  background-color: grey;\r\n}\r\n\r\n.hit {\r\n  background-color: rgb(255, 98, 205);\r\n}\r\n\r\n#div1 {\r\n  width: 350px;\r\n  height: 70px;\r\n  padding: 10px;\r\n  border: 1px solid #aaaaaa;\r\n}\r\n\r\n.own-board {\r\n  margin: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 300px;\r\n}\r\n\r\n.place-ships {\r\n  margin: 6px 24px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 300px;\r\n}\r\n\r\n.place-ships > span, .own-board > span {\r\n  font-size: 1.5rem;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.ship-div {\r\n  display: flex;\r\n  margin: 4px;\r\n}\r\n\r\n.ship-on-board {\r\n  position: absolute;\r\n  margin: 0px;\r\n}\r\n\r\n.shipsq {\r\n  background-color: rgb(56 9 135);\r\n}\r\n\r\n.sq0-to-place:hover {\r\n  cursor: grab;\r\n}\r\n\r\n.flex-toggle {\r\n  flex-direction: column;\r\n}\r\n\r\n.place-info {\r\n  margin-top: 6px;\r\n}"],"sourceRoot":""}]);
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

/***/ }),

/***/ "./src/img_logo.gif":
/*!**************************!*\
  !*** ./src/img_logo.gif ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f0e6ffdfa8117925384d.gif";

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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
/* harmony import */ var _img_logo_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img_logo.gif */ "./src/img_logo.gif");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");




(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.createDom)();
(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.prepareShips)();
// playGame();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2xCQTs7Ozs7Ozs7Ozs7Ozs7O0FDQW1EO0FBQ2Q7QUFDRDtBQUNOO0FBRTlCZSxrREFBUyxDQUFDLENBQUM7QUFDWE0scURBQVksQ0FBQyxDQUFDO0FBQ2QsYyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZWJvYXJkLCBQbGF5ZXIgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XHJcblxyXG5mdW5jdGlvbiBhbGxvd0Ryb3AoZXYpIHtcclxuICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFnKGV2KSB7XHJcbiAgZXYuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGV2LnRhcmdldC5pZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyb3AoZXYpIHtcclxuICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHZhciBkYXRhID0gZXYuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEpLmNsYXNzTGlzdC5hZGQoXCJzaGlwLW9uLWJvYXJkXCIpO1xyXG4gIGV2LnRhcmdldC5hcHBlbmRDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUdyaWQoKSB7XHJcbiAgbGV0IGdyaWRBcnJheSA9IFtdO1xyXG4gIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xyXG4gICAgZ3JpZEFycmF5LnB1c2goW10pO1xyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XHJcbiAgICAgIGdyaWRBcnJheVt4XS5wdXNoKG51bGwpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZ3JpZEFycmF5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3R3JpZCgpIHtcclxuICBjb25zdCBvd25Cb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3duLWJvYXJkXCIpO1xyXG4gIGNvbnN0IGFycmF5ID0gY3JlYXRlR3JpZCgpO1xyXG5cclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gIGFycmF5LmZvckVhY2goKHJvdywgcmluZGV4KSA9PiB7XHJcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY2luZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xyXG4gICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHIke3JpbmRleH1jJHtjaW5kZXh9YCk7XHJcbiAgICAgIGlmIChjZWxsID09PSBcInNoaXBcIikge1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2VsbCA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNlbGwgPT09IFwiaGl0XCIpIHtcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgfVxyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcCk7XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgYWxsb3dEcm9wKTtcclxuICAgICAgZ3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGdyaWQuY2xhc3NMaXN0LmFkZChcImdyaWRcIik7XHJcbiAgb3duQm9hcmQuYXBwZW5kQ2hpbGQoZ3JpZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURvbSgpIHtcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcclxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIHRpdGxlLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwc1wiO1xyXG5cclxuICBtYWluLmNsYXNzTGlzdC5hZGQoXCJtYWluXCIpO1xyXG4gIC8vIGNvbnN0IGVuZW15Qm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIC8vIGNvbnN0IGVuZW15Qm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgLy8gZW5lbXlCb2FyZFRpdGxlLnRleHRDb250ZW50ID0gXCJFbmVteSBib2FyZFwiO1xyXG5cclxuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gIC8vIG1haW4uYXBwZW5kQ2hpbGQoZW5lbXlCb2FyZCk7XHJcbiAgLy8gZW5lbXlCb2FyZC5hcHBlbmRDaGlsZChlbmVteUJvYXJkVGl0bGUpO1xyXG5cclxuICBib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcclxuICBib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZXBhcmVTaGlwcygpIHtcclxuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xyXG4gIGNvbnN0IG93bkJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBvd25Cb2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgb3duQm9hcmQuY2xhc3NMaXN0LmFkZChcIm93bi1ib2FyZFwiKTtcclxuICBvd25Cb2FyZFRpdGxlLnRleHRDb250ZW50ID0gXCJZb3VyIGJvYXJkXCI7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHBsYWNlU2hpcHMuY2xhc3NMaXN0LmFkZChcInBsYWNlLXNoaXBzXCIpO1xyXG4gIGNvbnN0IHNoaXBzVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICBzaGlwc1RpdGxlLnRleHRDb250ZW50ID0gXCJQbGFjZSB5b3VyIHNoaXBzXCI7XHJcblxyXG4gIGNvbnN0IHNoaXBMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBzaGlwTGVuZ3RocyA9IFsyLCAzLCA0LCA1XTtcclxuICBzaGlwTGVuZ3Rocy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3Qgc2hpcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwLWRpdlwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbTsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHNoaXBTcSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIC8vIHNoaXBTcS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgc3EwLXRvLXBsYWNlLSR7aW5kZXh9YCk7XHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgc2hpcFNxLmNsYXNzTGlzdC5hZGQoXCJzcTAtdG8tcGxhY2VcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNoaXBTcS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xyXG4gICAgICBzaGlwU3EuY2xhc3NMaXN0LmFkZChcInNoaXBzcVwiKTtcclxuXHJcbiAgICAgIHNoaXBEaXYuYXBwZW5kQ2hpbGQoc2hpcFNxKTtcclxuICAgIH1cclxuICAgIHNoaXBEaXYuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcclxuICAgIHNoaXBEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHRvLXBsYWNlLSR7aW5kZXh9YCk7XHJcblxyXG4gICAgLy8gbmVlZCB0byBoYW5kbGUgZXJyb3IgLSB3aGVuIHRoZSBpdGVtIGlzIGRyYWdnZWQgaW4gdGhlIG1pZGRsZSBvZiB0d28gc3F1YXJlc1xyXG4gICAgc2hpcERpdi5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWcpO1xyXG4gICAgc2hpcERpdi5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBzaGlwRGl2LmNsYXNzTGlzdC50b2dnbGUoXCJmbGV4LXRvZ2dsZVwiKTtcclxuICAgIH0pO1xyXG4gICAgc2hpcExpc3QuYXBwZW5kQ2hpbGQoc2hpcERpdik7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHBsYWNlSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29uc3QgcGxhY2VJbmZvU3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICBwbGFjZUluZm8uY2xhc3NMaXN0LmFkZChcInBsYWNlLWluZm9cIik7XHJcbiAgcGxhY2VJbmZvU3AudGV4dENvbnRlbnQgPVxyXG4gICAgXCJEcmFnICYgZHJvcCB0aGUgc2hpcHMgb24gdGhlIGJvYXJkLiBEb3VibGVjbGljayBhIHNoaXAgdG8gcm90YXRlIGl0LlwiO1xyXG4gIHBsYWNlSW5mby5hcHBlbmRDaGlsZChwbGFjZUluZm9TcCk7XHJcbiAgbWFpbi5hcHBlbmRDaGlsZChvd25Cb2FyZCk7XHJcbiAgb3duQm9hcmQuYXBwZW5kQ2hpbGQob3duQm9hcmRUaXRsZSk7XHJcbiAgbWFpbi5hcHBlbmRDaGlsZChwbGFjZVNoaXBzKTtcclxuICBwbGFjZVNoaXBzLmFwcGVuZENoaWxkKHNoaXBzVGl0bGUpO1xyXG4gIHBsYWNlU2hpcHMuYXBwZW5kQ2hpbGQoc2hpcExpc3QpO1xyXG4gIHBsYWNlU2hpcHMuYXBwZW5kQ2hpbGQocGxhY2VJbmZvKTtcclxuXHJcbiAgZHJhd0dyaWQoKTtcclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlRG9tLCBwcmVwYXJlU2hpcHMgfTtcclxuIiwiLy8gcG9zc2libGVTY29yZSBkZXBlbmRzIG9uIHRoZSBvdmVyYWxsIG5yIG9mIHNoaXBzIGFuZCB0aGVpciBsZW5ndGhcclxuLy8gYXZhaWxhYmxlIHNoaXBzOlxyXG4vLyAxeCA1LXNxdWFyZVxyXG4vLyAxeCA0LXNxdWFyZVxyXG4vLyAyeCAzLXNxdWFyZVxyXG4vLyAyeCAyLXNxdWFyZVxyXG4vLyA9IDE5IHBvc3NpYmxlIHNjb3JlXHJcblxyXG5jb25zdCBwb3NzaWJsZVNjb3JlID0gMTk7XHJcblxyXG5jbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgsIGlkKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMuaGl0cyA9IDA7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5oaXRzICs9IDE7XHJcbiAgICB0aGlzLmlzU3VuaygpO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lcikge1xyXG4gICAgdGhpcy5ncmlkID0gdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XHJcbiAgICB0aGlzLnNoaXBzTGlzdCA9IFtdO1xyXG4gICAgdGhpcy5yZWNlaXZlZEhpdHMgPSAwO1xyXG4gICAgdGhpcy5sb3N0R2FtZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKGxlbmd0aCwgY29vcmRzU3RhcnQsIGNvb3Jkc0VuZCkge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLnNoaXBzTGlzdC5sZW5ndGg7XHJcbiAgICBjb25zdCBwbGFjZWRTaGlwID0gbmV3IFNoaXAobGVuZ3RoLCBpZCk7XHJcbiAgICAvLyBjb25zdCBwbGFjZWRTaGlwID0gbmV3IFNoaXAobGVuZ3RoLCBjb29yZHNTdGFydCwgY29vcmRzRW5kKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1bY29vcmRzU3RhcnRbMV1dKTtcclxuICAgIC8vIGlmIHRoZSBzaGlwJ3MgbGVuZ3RoID4gMiwgbWFyayB0aGUgb3RoZXIgc3F1YXJlcyB0b29cclxuXHJcbiAgICB0aGlzLnNoaXBzTGlzdC5wdXNoKHBsYWNlZFNoaXApO1xyXG4gICAgaWYgKGNvb3Jkc1N0YXJ0WzBdICE9PSBjb29yZHNFbmRbMF0pIHtcclxuICAgICAgZm9yIChsZXQgaSA9IGNvb3Jkc1N0YXJ0WzBdOyBpIDw9IGNvb3Jkc0VuZFswXTsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5ncmlkW2ldW2Nvb3Jkc1N0YXJ0WzFdXSA9IGlkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY29vcmRzU3RhcnRbMV0gIT09IGNvb3Jkc0VuZFsxXSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gY29vcmRzU3RhcnRbMV07IGkgPD0gY29vcmRzRW5kWzFdOyBpKyspIHtcclxuICAgICAgICB0aGlzLmdyaWRbY29vcmRzU3RhcnRbMF1dW2ldID0gaWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdyaWRbY29vcmRzU3RhcnRbMF1dW2Nvb3Jkc1N0YXJ0WzFdXSA9IGlkO1xyXG4gICAgdGhpcy5ncmlkW2Nvb3Jkc0VuZFswXV1bY29vcmRzRW5kWzFdXSA9IGlkO1xyXG4gIH1cclxuXHJcbiAgcmVjZWl2ZUF0dGFjayhjb29yZHNYLCBjb29yZHNZKSB7XHJcbiAgICBsZXQgaWQgPSB0aGlzLmdyaWRbY29vcmRzWF1bY29vcmRzWV07XHJcbiAgICBpZiAoaWQgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5ncmlkW2Nvb3Jkc1hdW2Nvb3Jkc1ldID0gXCJtaXNzXCI7XHJcbiAgICB9IGVsc2UgaWYgKGlkID09PSBcIm1pc3NcIiB8fCBpZCA9PT0gXCJoaXRcIikge1xyXG4gICAgICByZXR1cm4gXCJpbnZhbGlkIG1vdmVcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBoaXRTaGlwID0gdGhpcy5zaGlwc0xpc3RbaWRdO1xyXG4gICAgICB0aGlzLmdyaWRbY29vcmRzWF1bY29vcmRzWV0gPSBcImhpdFwiO1xyXG4gICAgICBoaXRTaGlwLmhpdCgpO1xyXG4gICAgICB0aGlzLnJlY2VpdmVkSGl0cyArPSAxO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tJZkxvc3QoKSB7XHJcbiAgICBpZiAodGhpcy5yZWNlaXZlZEhpdHMgPj0gcG9zc2libGVTY29yZSkge1xyXG4gICAgICB0aGlzLmxvc3RHYW1lID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gICB9XHJcbiAgY3JlYXRlR3JpZCgpIHtcclxuICAgIGxldCBncmlkQXJyYXkgPSBbXTtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xyXG4gICAgICBncmlkQXJyYXkucHVzaChbXSk7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xyXG4gICAgICAgIGdyaWRBcnJheVt4XS5wdXNoKG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ3JpZEFycmF5O1xyXG4gIH1cclxuXHJcbiAgZHJhd0dyaWQoKSB7XHJcbiAgICBjb25zdCBhcnJheSA9IHRoaXMuZ3JpZDtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICBhcnJheS5mb3JFYWNoKChyb3csIHJpbmRleCkgPT4ge1xyXG4gICAgICByb3cuZm9yRWFjaCgoY2VsbCwgY2luZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcclxuICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHIke3JpbmRleH1jJHtjaW5kZXh9YCk7XHJcbiAgICAgICAgaWYgKGNlbGwgPT09IFwic2hpcFwiKSB7XHJcbiAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjZWxsID09PSBcIm1pc3NcIikge1xyXG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBncmlkLmNsYXNzTGlzdC5hZGQoXCJncmlkXCIpO1xyXG4gICAgYm9keS5hcHBlbmRDaGlsZChncmlkKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3Iob3duZXIpIHtcclxuICAgIHRoaXMub3duZXIgPSBvd25lcjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYXlHYW1lKCkge1xyXG4gIGNvbnN0IHBsYXllckEgPSBuZXcgUGxheWVyKFwiaHVtYW5cIik7XHJcbiAgY29uc3QgcGxheWVyQiA9IG5ldyBQbGF5ZXIoXCJBSVwiKTtcclxuICBjb25zdCBib2FyZEEgPSBuZXcgR2FtZWJvYXJkKFwiaHVtYW5cIik7XHJcbiAgY29uc3QgYm9hcmRCID0gbmV3IEdhbWVib2FyZChcIkFJXCIpO1xyXG5cclxuICBib2FyZEEucGxhY2VTaGlwKDIsIFs1LCA3XSwgWzYsIDddKTtcclxuICBib2FyZEEucGxhY2VTaGlwKDMsIFsxLCA0XSwgWzEsIDZdKTtcclxuICBib2FyZEEucGxhY2VTaGlwKDMsIFszLCA1XSwgWzMsIDhdKTtcclxuICAvLyBib2FyZEEucGxhY2VTaGlwKDQsIFs4LCAzXSwgWzgsIDZdKTtcclxuICBjb25zb2xlLmxvZyhib2FyZEEuZ3JpZCk7XHJcbiAgYm9hcmRCLnBsYWNlU2hpcCgyLCBbNCwgMV0sIFs1LCAxXSk7XHJcbiAgYm9hcmRCLnBsYWNlU2hpcCgzLCBbNSwgN10sIFs1LCA5XSk7XHJcbiAgYm9hcmRCLnBsYWNlU2hpcCg0LCBbMiwgM10sIFsyLCA2XSk7XHJcblxyXG4gIGJvYXJkQS5kcmF3R3JpZCgpO1xyXG4gIGJvYXJkQi5kcmF3R3JpZCgpO1xyXG4gIC8qXHJcbiAgd2hpbGUgKGJvYXJkQS5sb3N0R2FtZSA9PT0gZmFsc2UgJiYgYm9hcmRCLmxvc3RHYW1lID09PSBmYWxzZSkge1xyXG4gICAgYm9hcmRCLnJlY2VpdmVBdHRhY2soKTtcclxuICAgIGJvYXJkQS5yZWNlaXZlQXR0YWNrKCk7XHJcbiAgfVxyXG4gKi9cclxuXHJcbiBcclxuICAvLyBib2FyZEEucmVjZWl2ZUF0dGFjayg1LCA3KTtcclxuICAvLyBib2FyZEEucmVjZWl2ZUF0dGFjayg2LCA3KTtcclxuICAvLyBjb25zb2xlLmxvZyhib2FyZEEuc2hpcHNMaXN0KTtcclxuICAvL2NvbnNvbGUubG9nKGJvYXJkQSk7XHJcbiAgLy8gYm9hcmRBLnJlY2VpdmVBdHRhY2soMSwgNCk7XHJcbiAgLy8gYm9hcmRBLmRyYXdHcmlkKCk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qXHJcbmNvbnN0IHRlc3RTaGlwID0gbmV3IFNoaXAoKTtcclxuY29uc3QgYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbmJvYXJkLmNyZWF0ZUdyaWQoKTtcclxuYm9hcmQucGxhY2VTaGlwKDMsIFsxLCAzXSwgWzMsIDNdKTtcclxuLy9ib2FyZC4jaWQ7XHJcbnRlc3RTaGlwLmhpdCgpO1xyXG5jb25zb2xlLmxvZyh0ZXN0U2hpcC5zaGlwSUQpO1xyXG5jb25zb2xlLmxvZyh0ZXN0U2hpcC5tc2cpO1xyXG5cclxuY29uc29sZS5sb2coYm9hcmQuZ3JpZCk7XHJcbmNvbnNvbGUubG9nKHRlc3RTaGlwLnNoaXBJRCk7XHJcbmNvbnN0IHRlc3RTaGlwMSA9IG5ldyBTaGlwKCk7XHJcbmNvbnNvbGUubG9nKHRlc3RTaGlwMS5zaGlwSUQpO1xyXG4qL1xyXG5leHBvcnQgeyBTaGlwLCBHYW1lYm9hcmQsIFBsYXllciwgcGxheUdhbWUgfTtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1DaW56ZWw6d2dodEA4MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIG1hcmdpbjogMHB4O1xyXG4gIHBhZGRpbmc6IDBweDtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBkMWUyNjtcclxuICBjb2xvcjogI2RjYTg1ZDtcclxufVxyXG5cclxuLmhlYWRlciB7XHJcbiAgbWFyZ2luOiAxMnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5oZWFkZXIgPiBzcGFuIHtcclxuICBmb250LXNpemU6IDIuNXJlbTtcclxuICBmb250LWZhbWlseTogJ0NpbnplbCcsIHNlcmlmO1xyXG4gIHRleHQtc2hhZG93OiAjM2MzZDUxIDBweCAtMTBweCA2cHgsIDJweCAycHggMnB4ICM1ZjU2MWI7XHJcbiAgYm9yZGVyLWJvdHRvbTogI2RjYTg1ZCAycHggc29saWQ7XHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcblxyXG4ubWFpbiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmdyaWQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI4cHgpO1xyXG4gIGNvbHVtbi1nYXA6IDBweDtcclxuICByb3ctZ2FwOiAwcHg7XHJcbiAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuXHJcbi5zcXVhcmUge1xyXG4gIHdpZHRoOiAyOHB4O1xyXG4gIGhlaWdodDogMjhweDtcclxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xyXG4gIGJhY2tncm91bmQ6ICMyMzRlNjY7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbn1cclxuXHJcbi5zcXVhcmVCIHtcclxuICBiYWNrZ3JvdW5kOiAjMjM0ZTY2O1xyXG59XHJcblxyXG4ubWlzcyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcclxufVxyXG5cclxuLmhpdCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgOTgsIDIwNSk7XHJcbn1cclxuXHJcbiNkaXYxIHtcclxuICB3aWR0aDogMzUwcHg7XHJcbiAgaGVpZ2h0OiA3MHB4O1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2FhYWFhYTtcclxufVxyXG5cclxuLm93bi1ib2FyZCB7XHJcbiAgbWFyZ2luOiA2cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDMwMHB4O1xyXG59XHJcblxyXG4ucGxhY2Utc2hpcHMge1xyXG4gIG1hcmdpbjogNnB4IDI0cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLnBsYWNlLXNoaXBzID4gc3BhbiwgLm93bi1ib2FyZCA+IHNwYW4ge1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxufVxyXG5cclxuLnNoaXAtZGl2IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1hcmdpbjogNHB4O1xyXG59XHJcblxyXG4uc2hpcC1vbi1ib2FyZCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIG1hcmdpbjogMHB4O1xyXG59XHJcblxyXG4uc2hpcHNxIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYgOSAxMzUpO1xyXG59XHJcblxyXG4uc3EwLXRvLXBsYWNlOmhvdmVyIHtcclxuICBjdXJzb3I6IGdyYWI7XHJcbn1cclxuXHJcbi5mbGV4LXRvZ2dsZSB7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG5cclxuLnBsYWNlLWluZm8ge1xyXG4gIG1hcmdpbi10b3A6IDZweDtcclxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQiw0QkFBNEI7RUFDNUIsdURBQXVEO0VBQ3ZELGdDQUFnQztFQUNoQyxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxlQUFlO0VBQ2YsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsbUJBQW1CO0VBQ25CLFdBQVc7QUFDYjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osYUFBYTtFQUNiLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUNpbnplbDp3Z2h0QDgwMCZkaXNwbGF5PXN3YXAnKTtcXHJcXG5cXHJcXG4qIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBtYXJnaW46IDBweDtcXHJcXG4gIHBhZGRpbmc6IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGQxZTI2O1xcclxcbiAgY29sb3I6ICNkY2E4NWQ7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIge1xcclxcbiAgbWFyZ2luOiAxMnB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyID4gc3BhbiB7XFxyXFxuICBmb250LXNpemU6IDIuNXJlbTtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnQ2luemVsJywgc2VyaWY7XFxyXFxuICB0ZXh0LXNoYWRvdzogIzNjM2Q1MSAwcHggLTEwcHggNnB4LCAycHggMnB4IDJweCAjNWY1NjFiO1xcclxcbiAgYm9yZGVyLWJvdHRvbTogI2RjYTg1ZCAycHggc29saWQ7XFxyXFxuICBtYXJnaW4tYm90dG9tOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5tYWluIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmdyaWQge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyOHB4KTtcXHJcXG4gIGNvbHVtbi1nYXA6IDBweDtcXHJcXG4gIHJvdy1nYXA6IDBweDtcXHJcXG4gIGp1c3RpZnktaXRlbXM6IHN0cmV0Y2g7XFxyXFxuICBmb250LXNpemU6IDEycHg7XFxyXFxufVxcclxcblxcclxcbi5zcXVhcmUge1xcclxcbiAgd2lkdGg6IDI4cHg7XFxyXFxuICBoZWlnaHQ6IDI4cHg7XFxyXFxuICBib3JkZXI6IDFweCAjZGNhODVkIHNvbGlkO1xcclxcbiAgYmFja2dyb3VuZDogIzIzNGU2NjtcXHJcXG4gIG1hcmdpbjogMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3F1YXJlQiB7XFxyXFxuICBiYWNrZ3JvdW5kOiAjMjM0ZTY2O1xcclxcbn1cXHJcXG5cXHJcXG4ubWlzcyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDk4LCAyMDUpO1xcclxcbn1cXHJcXG5cXHJcXG4jZGl2MSB7XFxyXFxuICB3aWR0aDogMzUwcHg7XFxyXFxuICBoZWlnaHQ6IDcwcHg7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2FhYWFhYTtcXHJcXG59XFxyXFxuXFxyXFxuLm93bi1ib2FyZCB7XFxyXFxuICBtYXJnaW46IDZweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAzMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYWNlLXNoaXBzIHtcXHJcXG4gIG1hcmdpbjogNnB4IDI0cHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIHdpZHRoOiAzMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYWNlLXNoaXBzID4gc3BhbiwgLm93bi1ib2FyZCA+IHNwYW4ge1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICBtYXJnaW4tYm90dG9tOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWRpdiB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgbWFyZ2luOiA0cHg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLW9uLWJvYXJkIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIG1hcmdpbjogMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcHNxIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1NiA5IDEzNSk7XFxyXFxufVxcclxcblxcclxcbi5zcTAtdG8tcGxhY2U6aG92ZXIge1xcclxcbiAgY3Vyc29yOiBncmFiO1xcclxcbn1cXHJcXG5cXHJcXG4uZmxleC10b2dnbGUge1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYWNlLWluZm8ge1xcclxcbiAgbWFyZ2luLXRvcDogNnB4O1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBjcmVhdGVEb20sIHByZXBhcmVTaGlwcyB9IGZyb20gXCIuL2RvbS5qc1wiO1xyXG5pbXBvcnQgeyBwbGF5R2FtZSB9IGZyb20gXCIuL2dhbWUuanNcIjtcclxuaW1wb3J0IGltZ3NyYyBmcm9tIFwiLi9pbWdfbG9nby5naWZcIjtcclxuaW1wb3J0IGNzcyBmcm9tIFwiLi9zdHlsZS5jc3NcIjtcclxuXHJcbmNyZWF0ZURvbSgpO1xyXG5wcmVwYXJlU2hpcHMoKTtcclxuLy8gcGxheUdhbWUoKTtcclxuIl0sIm5hbWVzIjpbIkdhbWVib2FyZCIsIlBsYXllciIsImFsbG93RHJvcCIsImV2IiwicHJldmVudERlZmF1bHQiLCJkcmFnIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInRhcmdldCIsImlkIiwiZHJvcCIsImRhdGEiLCJnZXREYXRhIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwiY3JlYXRlR3JpZCIsImdyaWRBcnJheSIsIngiLCJwdXNoIiwieSIsImRyYXdHcmlkIiwib3duQm9hcmQiLCJxdWVyeVNlbGVjdG9yIiwiYXJyYXkiLCJib2R5IiwiZ3JpZCIsImNyZWF0ZUVsZW1lbnQiLCJmb3JFYWNoIiwicm93IiwicmluZGV4IiwiY2VsbCIsImNpbmRleCIsInNxdWFyZSIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjcmVhdGVEb20iLCJoZWFkZXIiLCJtYWluIiwiZm9vdGVyIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsInByZXBhcmVTaGlwcyIsIm93bkJvYXJkVGl0bGUiLCJwbGFjZVNoaXBzIiwic2hpcHNUaXRsZSIsInNoaXBMaXN0Iiwic2hpcExlbmd0aHMiLCJpdGVtIiwiaW5kZXgiLCJzaGlwRGl2IiwiaSIsInNoaXBTcSIsInRvZ2dsZSIsInBsYWNlSW5mbyIsInBsYWNlSW5mb1NwIiwicG9zc2libGVTY29yZSIsIlNoaXAiLCJjb25zdHJ1Y3RvciIsImxlbmd0aCIsImhpdHMiLCJkZXN0cm95ZWQiLCJoaXQiLCJpc1N1bmsiLCJvd25lciIsInNoaXBzTGlzdCIsInJlY2VpdmVkSGl0cyIsImxvc3RHYW1lIiwicGxhY2VTaGlwIiwiY29vcmRzU3RhcnQiLCJjb29yZHNFbmQiLCJwbGFjZWRTaGlwIiwicmVjZWl2ZUF0dGFjayIsImNvb3Jkc1giLCJjb29yZHNZIiwiaGl0U2hpcCIsImNoZWNrSWZMb3N0IiwicGxheUdhbWUiLCJwbGF5ZXJBIiwicGxheWVyQiIsImJvYXJkQSIsImJvYXJkQiIsImNvbnNvbGUiLCJsb2ciLCJpbWdzcmMiLCJjc3MiXSwic291cmNlUm9vdCI6IiJ9