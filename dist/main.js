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
/* harmony export */   createDom: () => (/* binding */ createDom)
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");


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
  margin: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.ship {
  /* position: absolute; */
}
.ship-on-board {
  position: absolute;
}
.shipsq {
  background-color: rgb(56 9 135);
  /* position: absolute; */
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,iBAAiB;EACjB,4BAA4B;EAC5B,uDAAuD;EACvD,gCAAgC;EAChC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,eAAe;EACf,YAAY;EACZ,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,mBAAmB;EACnB,WAAW;AACb;;AAEA;EACE,mBAAmB;AACrB;;;;AAIA;EACE,sBAAsB;AACxB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,wBAAwB;AAC1B;AACA;EACE,kBAAkB;AACpB;AACA;EACE,+BAA+B;EAC/B,wBAAwB;AAC1B","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@800&display=swap');\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  margin: 0px;\r\n  padding: 0px;\r\n}\r\n\r\nbody {\r\n  background-color: #0d1e26;\r\n  color: #dca85d;\r\n}\r\n\r\n.header {\r\n  margin: 12px;\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.header > span {\r\n  font-size: 2.5rem;\r\n  font-family: 'Cinzel', serif;\r\n  text-shadow: #3c3d51 0px -10px 6px, 2px 2px 2px #5f561b;\r\n  border-bottom: #dca85d 2px solid;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.main {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 28px);\r\n  column-gap: 0px;\r\n  row-gap: 0px;\r\n  justify-items: stretch;\r\n  font-size: 12px;\r\n}\r\n\r\n.square {\r\n  width: 28px;\r\n  height: 28px;\r\n  border: 1px #dca85d solid;\r\n  background: #234e66;\r\n  margin: 0px;\r\n}\r\n\r\n.squareB {\r\n  background: #234e66;\r\n}\r\n\r\n\r\n\r\n.miss {\r\n  background-color: grey;\r\n}\r\n\r\n.hit {\r\n  background-color: rgb(255, 98, 205);\r\n}\r\n\r\n#div1 {\r\n  width: 350px;\r\n  height: 70px;\r\n  padding: 10px;\r\n  border: 1px solid #aaaaaa;\r\n}\r\n\r\n.own-board {\r\n  margin: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 300px;\r\n}\r\n\r\n.place-ships {\r\n  margin: 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 300px;\r\n}\r\n\r\n.place-ships > span, .own-board > span {\r\n  font-size: 1.5rem;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n.ship-div {\r\n  display: flex;\r\n  margin: 4px;\r\n}\r\n\r\n.ship {\r\n  /* position: absolute; */\r\n}\r\n.ship-on-board {\r\n  position: absolute;\r\n}\r\n.shipsq {\r\n  background-color: rgb(56 9 135);\r\n  /* position: absolute; */\r\n}"],"sourceRoot":""}]);
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
// playGame();

const body = document.querySelector("body");
const main = document.querySelector(".main");
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
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
drawGrid();
const placeShips = document.querySelector(".place-ships");
const shipList = document.createElement("div");
const shipLengths = [2, 3, 4, 5];
shipLengths.forEach(item => {
  const shipDiv = document.createElement("div");
  shipDiv.classList.add("ship-div");
  for (let i = 0; i < item; i++) {
    const shipSq = document.createElement("div");
    shipSq.classList.add("square");
    shipSq.classList.add("shipsq");
    shipDiv.appendChild(shipSq);
  }
  shipList.appendChild(shipDiv);
});
placeShips.appendChild(shipList);

// const shipSq = document.createElement("div");
// const shipSq1 = document.createElement("div");
// shipSq.classList.add("square");
// shipSq1.classList.add("square");
// shipSq.classList.add("shipsq");
// shipSq1.classList.add("shipsq");
// ship1.classList.add("ship");
// placeShips.appendChild(ship1);
// ship1.appendChild(shipSq);
// ship1.appendChild(shipSq1);

// ship1.setAttribute("draggable", "true");
// ship1.setAttribute("id", "ship1");
// ship1.addEventListener("dragstart", drag);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsS0FBSyxDQUFDO0VBQzdDMEUsT0FBTyxDQUFDdkUsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0VBQ2pDLEtBQUssSUFBSTRCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3lDLElBQUksRUFBRXpDLENBQUMsRUFBRSxFQUFFO0lBQzdCLE1BQU0yQyxNQUFNLEdBQUc5RSxRQUFRLENBQUNHLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDNUMyRSxNQUFNLENBQUN4RSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDOUJ1RSxNQUFNLENBQUN4RSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDOUJzRSxPQUFPLENBQUMvRCxXQUFXLENBQUNnRSxNQUFNLENBQUM7RUFDN0I7RUFDQUosUUFBUSxDQUFDNUQsV0FBVyxDQUFDK0QsT0FBTyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGakUsVUFBVSxDQUFDRSxXQUFXLENBQUM0RCxRQUFRLENBQUM7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZWJvYXJkLCBQbGF5ZXIgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XHJcblxyXG4vLyBpY29ucyBodHRwczovL3d3dy5mcmVlcGlrLmNvbS9mcmVlLXZlY3Rvci9zZXQtc2lsaG91ZXR0ZXMtbmF2YWwtc2hpcHNfMTEwNTI5MjguaHRtI3F1ZXJ5PXdhcnNoaXAmcG9zaXRpb249MiZmcm9tX3ZpZXc9a2V5d29yZCZ0cmFjaz1zcGgmdXVpZD1mZTk2OGI1NS1lZjNiLTQ4MWEtYjY5YS1lY2JiYjYwYTQ3MWNcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURvbSgpIHtcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcclxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIHRpdGxlLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwc1wiO1xyXG5cclxuICBtYWluLmNsYXNzTGlzdC5hZGQoXCJtYWluXCIpO1xyXG4gIC8vIGNvbnN0IGVuZW15Qm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIC8vIGNvbnN0IGVuZW15Qm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgLy8gZW5lbXlCb2FyZFRpdGxlLnRleHRDb250ZW50ID0gXCJFbmVteSBib2FyZFwiO1xyXG5cclxuICBjb25zdCBvd25Cb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29uc3Qgb3duQm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIG93bkJvYXJkLmNsYXNzTGlzdC5hZGQoXCJvd24tYm9hcmRcIik7XHJcbiAgb3duQm9hcmRUaXRsZS50ZXh0Q29udGVudCA9IFwiWW91ciBib2FyZFwiO1xyXG5cclxuICBjb25zdCBwbGFjZVNoaXBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBwbGFjZVNoaXBzLmNsYXNzTGlzdC5hZGQoXCJwbGFjZS1zaGlwc1wiKTtcclxuICBjb25zdCBzaGlwc1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgc2hpcHNUaXRsZS50ZXh0Q29udGVudCA9IFwiUGxhY2UgeW91ciBzaGlwc1wiO1xyXG5cclxuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gIC8vIG1haW4uYXBwZW5kQ2hpbGQoZW5lbXlCb2FyZCk7XHJcbiAgLy8gZW5lbXlCb2FyZC5hcHBlbmRDaGlsZChlbmVteUJvYXJkVGl0bGUpO1xyXG4gIG1haW4uYXBwZW5kQ2hpbGQob3duQm9hcmQpO1xyXG4gIG93bkJvYXJkLmFwcGVuZENoaWxkKG93bkJvYXJkVGl0bGUpO1xyXG4gIG1haW4uYXBwZW5kQ2hpbGQocGxhY2VTaGlwcyk7XHJcbiAgcGxhY2VTaGlwcy5hcHBlbmRDaGlsZChzaGlwc1RpdGxlKTtcclxuICBib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcclxuICBib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZURvbSB9O1xyXG4iLCIvLyBwb3NzaWJsZVNjb3JlIGRlcGVuZHMgb24gdGhlIG92ZXJhbGwgbnIgb2Ygc2hpcHMgYW5kIHRoZWlyIGxlbmd0aFxyXG4vLyBhdmFpbGFibGUgc2hpcHM6XHJcbi8vIDF4IDUtc3F1YXJlXHJcbi8vIDF4IDQtc3F1YXJlXHJcbi8vIDJ4IDMtc3F1YXJlXHJcbi8vIDJ4IDItc3F1YXJlXHJcbi8vID0gMTkgcG9zc2libGUgc2NvcmVcclxuXHJcbmNvbnN0IHBvc3NpYmxlU2NvcmUgPSAxOTtcclxuXHJcbmNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgaWQpIHtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5oaXRzID0gMDtcclxuICAgIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgfVxyXG5cclxuICBoaXQoKSB7XHJcbiAgICB0aGlzLmhpdHMgKz0gMTtcclxuICAgIHRoaXMuaXNTdW5rKCk7XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKSB7XHJcbiAgICBpZiAodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lYm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKG93bmVyKSB7XHJcbiAgICB0aGlzLmdyaWQgPSB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgIHRoaXMub3duZXIgPSBvd25lcjtcclxuICAgIHRoaXMuc2hpcHNMaXN0ID0gW107XHJcbiAgICB0aGlzLnJlY2VpdmVkSGl0cyA9IDA7XHJcbiAgICB0aGlzLmxvc3RHYW1lID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAobGVuZ3RoLCBjb29yZHNTdGFydCwgY29vcmRzRW5kKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuc2hpcHNMaXN0Lmxlbmd0aDtcclxuICAgIGNvbnN0IHBsYWNlZFNoaXAgPSBuZXcgU2hpcChsZW5ndGgsIGlkKTtcclxuICAgIC8vIGNvbnN0IHBsYWNlZFNoaXAgPSBuZXcgU2hpcChsZW5ndGgsIGNvb3Jkc1N0YXJ0LCBjb29yZHNFbmQpO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5ncmlkW2Nvb3Jkc1N0YXJ0WzBdXVtjb29yZHNTdGFydFsxXV0pO1xyXG4gICAgLy8gaWYgdGhlIHNoaXAncyBsZW5ndGggPiAyLCBtYXJrIHRoZSBvdGhlciBzcXVhcmVzIHRvb1xyXG5cclxuICAgIHRoaXMuc2hpcHNMaXN0LnB1c2gocGxhY2VkU2hpcCk7XHJcbiAgICBpZiAoY29vcmRzU3RhcnRbMF0gIT09IGNvb3Jkc0VuZFswXSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gY29vcmRzU3RhcnRbMF07IGkgPD0gY29vcmRzRW5kWzBdOyBpKyspIHtcclxuICAgICAgICB0aGlzLmdyaWRbaV1bY29vcmRzU3RhcnRbMV1dID0gaWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb29yZHNTdGFydFsxXSAhPT0gY29vcmRzRW5kWzFdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb29yZHNTdGFydFsxXTsgaSA8PSBjb29yZHNFbmRbMV07IGkrKykge1xyXG4gICAgICAgIHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1baV0gPSBpZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1bY29vcmRzU3RhcnRbMV1dID0gaWQ7XHJcbiAgICB0aGlzLmdyaWRbY29vcmRzRW5kWzBdXVtjb29yZHNFbmRbMV1dID0gaWQ7XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvb3Jkc1gsIGNvb3Jkc1kpIHtcclxuICAgIGxldCBpZCA9IHRoaXMuZ3JpZFtjb29yZHNYXVtjb29yZHNZXTtcclxuICAgIGlmIChpZCA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmdyaWRbY29vcmRzWF1bY29vcmRzWV0gPSBcIm1pc3NcIjtcclxuICAgIH0gZWxzZSBpZiAoaWQgPT09IFwibWlzc1wiIHx8IGlkID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHJldHVybiBcImludmFsaWQgbW92ZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGhpdFNoaXAgPSB0aGlzLnNoaXBzTGlzdFtpZF07XHJcbiAgICAgIHRoaXMuZ3JpZFtjb29yZHNYXVtjb29yZHNZXSA9IFwiaGl0XCI7XHJcbiAgICAgIGhpdFNoaXAuaGl0KCk7XHJcbiAgICAgIHRoaXMucmVjZWl2ZWRIaXRzICs9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja0lmTG9zdCgpIHtcclxuICAgIGlmICh0aGlzLnJlY2VpdmVkSGl0cyA+PSBwb3NzaWJsZVNjb3JlKSB7XHJcbiAgICAgIHRoaXMubG9zdEdhbWUgPSB0cnVlO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgIH1cclxuICBjcmVhdGVHcmlkKCkge1xyXG4gICAgbGV0IGdyaWRBcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XHJcbiAgICAgIGdyaWRBcnJheS5wdXNoKFtdKTtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XHJcbiAgICAgICAgZ3JpZEFycmF5W3hdLnB1c2gobnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBncmlkQXJyYXk7XHJcbiAgfVxyXG5cclxuICBkcmF3R3JpZCgpIHtcclxuICAgIGNvbnN0IGFycmF5ID0gdGhpcy5ncmlkO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGFycmF5LmZvckVhY2goKHJvdywgcmluZGV4KSA9PiB7XHJcbiAgICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xyXG4gICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgciR7cmluZGV4fWMke2NpbmRleH1gKTtcclxuICAgICAgICBpZiAoY2VsbCA9PT0gXCJzaGlwXCIpIHtcclxuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNlbGwgPT09IFwibWlzc1wiKSB7XHJcbiAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjZWxsID09PSBcImhpdFwiKSB7XHJcbiAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGdyaWQuY2xhc3NMaXN0LmFkZChcImdyaWRcIik7XHJcbiAgICBib2R5LmFwcGVuZENoaWxkKGdyaWQpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3Rvcihvd25lcikge1xyXG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGxheUdhbWUoKSB7XHJcbiAgY29uc3QgcGxheWVyQSA9IG5ldyBQbGF5ZXIoXCJodW1hblwiKTtcclxuICBjb25zdCBwbGF5ZXJCID0gbmV3IFBsYXllcihcIkFJXCIpO1xyXG4gIGNvbnN0IGJvYXJkQSA9IG5ldyBHYW1lYm9hcmQoXCJodW1hblwiKTtcclxuICBjb25zdCBib2FyZEIgPSBuZXcgR2FtZWJvYXJkKFwiQUlcIik7XHJcblxyXG4gIGJvYXJkQS5wbGFjZVNoaXAoMiwgWzUsIDddLCBbNiwgN10pO1xyXG4gIGJvYXJkQS5wbGFjZVNoaXAoMywgWzEsIDRdLCBbMSwgNl0pO1xyXG4gIGJvYXJkQS5wbGFjZVNoaXAoMywgWzMsIDVdLCBbMywgOF0pO1xyXG4gIC8vIGJvYXJkQS5wbGFjZVNoaXAoNCwgWzgsIDNdLCBbOCwgNl0pO1xyXG4gIGNvbnNvbGUubG9nKGJvYXJkQS5ncmlkKTtcclxuICBib2FyZEIucGxhY2VTaGlwKDIsIFs0LCAxXSwgWzUsIDFdKTtcclxuICBib2FyZEIucGxhY2VTaGlwKDMsIFs1LCA3XSwgWzUsIDldKTtcclxuICBib2FyZEIucGxhY2VTaGlwKDQsIFsyLCAzXSwgWzIsIDZdKTtcclxuXHJcbiAgYm9hcmRBLmRyYXdHcmlkKCk7XHJcbiAgYm9hcmRCLmRyYXdHcmlkKCk7XHJcbiAgLypcclxuICB3aGlsZSAoYm9hcmRBLmxvc3RHYW1lID09PSBmYWxzZSAmJiBib2FyZEIubG9zdEdhbWUgPT09IGZhbHNlKSB7XHJcbiAgICBib2FyZEIucmVjZWl2ZUF0dGFjaygpO1xyXG4gICAgYm9hcmRBLnJlY2VpdmVBdHRhY2soKTtcclxuICB9XHJcbiAqL1xyXG5cclxuIFxyXG4gIC8vIGJvYXJkQS5yZWNlaXZlQXR0YWNrKDUsIDcpO1xyXG4gIC8vIGJvYXJkQS5yZWNlaXZlQXR0YWNrKDYsIDcpO1xyXG4gIC8vIGNvbnNvbGUubG9nKGJvYXJkQS5zaGlwc0xpc3QpO1xyXG4gIC8vY29uc29sZS5sb2coYm9hcmRBKTtcclxuICAvLyBib2FyZEEucmVjZWl2ZUF0dGFjaygxLCA0KTtcclxuICAvLyBib2FyZEEuZHJhd0dyaWQoKTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLypcclxuY29uc3QgdGVzdFNoaXAgPSBuZXcgU2hpcCgpO1xyXG5jb25zdCBib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuYm9hcmQuY3JlYXRlR3JpZCgpO1xyXG5ib2FyZC5wbGFjZVNoaXAoMywgWzEsIDNdLCBbMywgM10pO1xyXG4vL2JvYXJkLiNpZDtcclxudGVzdFNoaXAuaGl0KCk7XHJcbmNvbnNvbGUubG9nKHRlc3RTaGlwLnNoaXBJRCk7XHJcbmNvbnNvbGUubG9nKHRlc3RTaGlwLm1zZyk7XHJcblxyXG5jb25zb2xlLmxvZyhib2FyZC5ncmlkKTtcclxuY29uc29sZS5sb2codGVzdFNoaXAuc2hpcElEKTtcclxuY29uc3QgdGVzdFNoaXAxID0gbmV3IFNoaXAoKTtcclxuY29uc29sZS5sb2codGVzdFNoaXAxLnNoaXBJRCk7XHJcbiovXHJcbmV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgUGxheWVyLCBwbGF5R2FtZSB9O1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUNpbnplbDp3Z2h0QDgwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbiAgcGFkZGluZzogMHB4O1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGQxZTI2O1xyXG4gIGNvbG9yOiAjZGNhODVkO1xyXG59XHJcblxyXG4uaGVhZGVyIHtcclxuICBtYXJnaW46IDEycHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmhlYWRlciA+IHNwYW4ge1xyXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xyXG4gIGZvbnQtZmFtaWx5OiAnQ2luemVsJywgc2VyaWY7XHJcbiAgdGV4dC1zaGFkb3c6ICMzYzNkNTEgMHB4IC0xMHB4IDZweCwgMnB4IDJweCAycHggIzVmNTYxYjtcclxuICBib3JkZXItYm90dG9tOiAjZGNhODVkIDJweCBzb2xpZDtcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbn1cclxuXHJcbi5tYWluIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4uZ3JpZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjhweCk7XHJcbiAgY29sdW1uLWdhcDogMHB4O1xyXG4gIHJvdy1nYXA6IDBweDtcclxuICBqdXN0aWZ5LWl0ZW1zOiBzdHJldGNoO1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuLnNxdWFyZSB7XHJcbiAgd2lkdGg6IDI4cHg7XHJcbiAgaGVpZ2h0OiAyOHB4O1xyXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XHJcbiAgYmFja2dyb3VuZDogIzIzNGU2NjtcclxuICBtYXJnaW46IDBweDtcclxufVxyXG5cclxuLnNxdWFyZUIge1xyXG4gIGJhY2tncm91bmQ6ICMyMzRlNjY7XHJcbn1cclxuXHJcblxyXG5cclxuLm1pc3Mge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XHJcbn1cclxuXHJcbi5oaXQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDk4LCAyMDUpO1xyXG59XHJcblxyXG4jZGl2MSB7XHJcbiAgd2lkdGg6IDM1MHB4O1xyXG4gIGhlaWdodDogNzBweDtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNhYWFhYWE7XHJcbn1cclxuXHJcbi5vd24tYm9hcmQge1xyXG4gIG1hcmdpbjogNnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLnBsYWNlLXNoaXBzIHtcclxuICBtYXJnaW46IDZweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB3aWR0aDogMzAwcHg7XHJcbn1cclxuXHJcbi5wbGFjZS1zaGlwcyA+IHNwYW4sIC5vd24tYm9hcmQgPiBzcGFuIHtcclxuICBmb250LXNpemU6IDEuNXJlbTtcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbn1cclxuXHJcbi5zaGlwLWRpdiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW46IDRweDtcclxufVxyXG5cclxuLnNoaXAge1xyXG4gIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTsgKi9cclxufVxyXG4uc2hpcC1vbi1ib2FyZCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG59XHJcbi5zaGlwc3Ege1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig1NiA5IDEzNSk7XHJcbiAgLyogcG9zaXRpb246IGFic29sdXRlOyAqL1xyXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLDRCQUE0QjtFQUM1Qix1REFBdUQ7RUFDdkQsZ0NBQWdDO0VBQ2hDLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUNBQXVDO0VBQ3ZDLGVBQWU7RUFDZixZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixtQkFBbUI7RUFDbkIsV0FBVztBQUNiOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOzs7O0FBSUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLGFBQWE7RUFDYix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCO0FBQ0E7RUFDRSxrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLCtCQUErQjtFQUMvQix3QkFBd0I7QUFDMUJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Q2luemVsOndnaHRAODAwJmRpc3BsYXk9c3dhcCcpO1xcclxcblxcclxcbioge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIG1hcmdpbjogMHB4O1xcclxcbiAgcGFkZGluZzogMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZDFlMjY7XFxyXFxuICBjb2xvcjogI2RjYTg1ZDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciB7XFxyXFxuICBtYXJnaW46IDEycHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIgPiBzcGFuIHtcXHJcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcclxcbiAgZm9udC1mYW1pbHk6ICdDaW56ZWwnLCBzZXJpZjtcXHJcXG4gIHRleHQtc2hhZG93OiAjM2MzZDUxIDBweCAtMTBweCA2cHgsIDJweCAycHggMnB4ICM1ZjU2MWI7XFxyXFxuICBib3JkZXItYm90dG9tOiAjZGNhODVkIDJweCBzb2xpZDtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW4ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3JpZCB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI4cHgpO1xcclxcbiAgY29sdW1uLWdhcDogMHB4O1xcclxcbiAgcm93LWdhcDogMHB4O1xcclxcbiAganVzdGlmeS1pdGVtczogc3RyZXRjaDtcXHJcXG4gIGZvbnQtc2l6ZTogMTJweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNxdWFyZSB7XFxyXFxuICB3aWR0aDogMjhweDtcXHJcXG4gIGhlaWdodDogMjhweDtcXHJcXG4gIGJvcmRlcjogMXB4ICNkY2E4NWQgc29saWQ7XFxyXFxuICBiYWNrZ3JvdW5kOiAjMjM0ZTY2O1xcclxcbiAgbWFyZ2luOiAwcHg7XFxyXFxufVxcclxcblxcclxcbi5zcXVhcmVCIHtcXHJcXG4gIGJhY2tncm91bmQ6ICMyMzRlNjY7XFxyXFxufVxcclxcblxcclxcblxcclxcblxcclxcbi5taXNzIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxyXFxufVxcclxcblxcclxcbi5oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgOTgsIDIwNSk7XFxyXFxufVxcclxcblxcclxcbiNkaXYxIHtcXHJcXG4gIHdpZHRoOiAzNTBweDtcXHJcXG4gIGhlaWdodDogNzBweDtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAjYWFhYWFhO1xcclxcbn1cXHJcXG5cXHJcXG4ub3duLWJvYXJkIHtcXHJcXG4gIG1hcmdpbjogNnB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgd2lkdGg6IDMwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucGxhY2Utc2hpcHMge1xcclxcbiAgbWFyZ2luOiA2cHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICB3aWR0aDogMzAwcHg7XFxyXFxufVxcclxcblxcclxcbi5wbGFjZS1zaGlwcyA+IHNwYW4sIC5vd24tYm9hcmQgPiBzcGFuIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1kaXYge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIG1hcmdpbjogNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcCB7XFxyXFxuICAvKiBwb3NpdGlvbjogYWJzb2x1dGU7ICovXFxyXFxufVxcclxcbi5zaGlwLW9uLWJvYXJkIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG59XFxyXFxuLnNoaXBzcSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYgOSAxMzUpO1xcclxcbiAgLyogcG9zaXRpb246IGFic29sdXRlOyAqL1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBjcmVhdGVEb20gfSBmcm9tIFwiLi9kb20uanNcIjtcclxuaW1wb3J0IHsgcGxheUdhbWUgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XHJcbmltcG9ydCBpbWdzcmMgZnJvbSBcIi4vaW1nX2xvZ28uZ2lmXCI7XHJcbmltcG9ydCBjc3MgZnJvbSBcIi4vc3R5bGUuY3NzXCI7XHJcblxyXG5jcmVhdGVEb20oKTtcclxuLy8gcGxheUdhbWUoKTtcclxuXHJcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKTtcclxuXHJcbmZ1bmN0aW9uIGFsbG93RHJvcChldikge1xyXG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWcoZXYpIHtcclxuICBldi5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgZXYudGFyZ2V0LmlkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJvcChldikge1xyXG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgdmFyIGRhdGEgPSBldi5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIik7XHJcbiAgZXYudGFyZ2V0LmFwcGVuZENoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcclxuICBsZXQgZ3JpZEFycmF5ID0gW107XHJcbiAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XHJcbiAgICBncmlkQXJyYXkucHVzaChbXSk7XHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcclxuICAgICAgZ3JpZEFycmF5W3hdLnB1c2gobnVsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBncmlkQXJyYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdHcmlkKCkge1xyXG4gIGNvbnN0IG93bkJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vd24tYm9hcmRcIik7XHJcbiAgY29uc3QgYXJyYXkgPSBjcmVhdGVHcmlkKCk7XHJcblxyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgYXJyYXkuZm9yRWFjaCgocm93LCByaW5kZXgpID0+IHtcclxuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjaW5kZXgpID0+IHtcclxuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XHJcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgciR7cmluZGV4fWMke2NpbmRleH1gKTtcclxuICAgICAgaWYgKGNlbGwgPT09IFwic2hpcFwiKSB7XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjZWxsID09PSBcIm1pc3NcIikge1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2VsbCA9PT0gXCJoaXRcIikge1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wKTtcclxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBhbGxvd0Ryb3ApO1xyXG4gICAgICBncmlkLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZFwiKTtcclxuICBvd25Cb2FyZC5hcHBlbmRDaGlsZChncmlkKTtcclxufVxyXG5cclxuZHJhd0dyaWQoKTtcclxuXHJcbmNvbnN0IHBsYWNlU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzXCIpO1xyXG5jb25zdCBzaGlwTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbmNvbnN0IHNoaXBMZW5ndGhzID0gWzIsIDMsIDQsIDVdO1xyXG5zaGlwTGVuZ3Rocy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgY29uc3Qgc2hpcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgc2hpcERpdi5jbGFzc0xpc3QuYWRkKFwic2hpcC1kaXZcIik7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtOyBpKyspIHtcclxuICAgIGNvbnN0IHNoaXBTcSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzaGlwU3EuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcclxuICAgIHNoaXBTcS5jbGFzc0xpc3QuYWRkKFwic2hpcHNxXCIpO1xyXG4gICAgc2hpcERpdi5hcHBlbmRDaGlsZChzaGlwU3EpO1xyXG4gIH1cclxuICBzaGlwTGlzdC5hcHBlbmRDaGlsZChzaGlwRGl2KTtcclxufSk7XHJcbnBsYWNlU2hpcHMuYXBwZW5kQ2hpbGQoc2hpcExpc3QpO1xyXG5cclxuLy8gY29uc3Qgc2hpcFNxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuLy8gY29uc3Qgc2hpcFNxMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vIHNoaXBTcS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xyXG4vLyBzaGlwU3ExLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XHJcbi8vIHNoaXBTcS5jbGFzc0xpc3QuYWRkKFwic2hpcHNxXCIpO1xyXG4vLyBzaGlwU3ExLmNsYXNzTGlzdC5hZGQoXCJzaGlwc3FcIik7XHJcbi8vIHNoaXAxLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4vLyBwbGFjZVNoaXBzLmFwcGVuZENoaWxkKHNoaXAxKTtcclxuLy8gc2hpcDEuYXBwZW5kQ2hpbGQoc2hpcFNxKTtcclxuLy8gc2hpcDEuYXBwZW5kQ2hpbGQoc2hpcFNxMSk7XHJcblxyXG4vLyBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xyXG4vLyBzaGlwMS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNoaXAxXCIpO1xyXG4vLyBzaGlwMS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWcpO1xyXG4iXSwibmFtZXMiOlsiR2FtZWJvYXJkIiwiUGxheWVyIiwiY3JlYXRlRG9tIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhlYWRlciIsImNyZWF0ZUVsZW1lbnQiLCJtYWluIiwiZm9vdGVyIiwiY2xhc3NMaXN0IiwiYWRkIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsIm93bkJvYXJkIiwib3duQm9hcmRUaXRsZSIsInBsYWNlU2hpcHMiLCJzaGlwc1RpdGxlIiwiYXBwZW5kQ2hpbGQiLCJwb3NzaWJsZVNjb3JlIiwiU2hpcCIsImNvbnN0cnVjdG9yIiwibGVuZ3RoIiwiaWQiLCJoaXRzIiwiZGVzdHJveWVkIiwiaGl0IiwiaXNTdW5rIiwib3duZXIiLCJncmlkIiwiY3JlYXRlR3JpZCIsInNoaXBzTGlzdCIsInJlY2VpdmVkSGl0cyIsImxvc3RHYW1lIiwicGxhY2VTaGlwIiwiY29vcmRzU3RhcnQiLCJjb29yZHNFbmQiLCJwbGFjZWRTaGlwIiwicHVzaCIsImkiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmRzWCIsImNvb3Jkc1kiLCJoaXRTaGlwIiwiY2hlY2tJZkxvc3QiLCJncmlkQXJyYXkiLCJ4IiwieSIsImRyYXdHcmlkIiwiYXJyYXkiLCJmb3JFYWNoIiwicm93IiwicmluZGV4IiwiY2VsbCIsImNpbmRleCIsInNxdWFyZSIsInNldEF0dHJpYnV0ZSIsInBsYXlHYW1lIiwicGxheWVyQSIsInBsYXllckIiLCJib2FyZEEiLCJib2FyZEIiLCJjb25zb2xlIiwibG9nIiwiaW1nc3JjIiwiY3NzIiwiYWxsb3dEcm9wIiwiZXYiLCJwcmV2ZW50RGVmYXVsdCIsImRyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwidGFyZ2V0IiwiZHJvcCIsImRhdGEiLCJnZXREYXRhIiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwic2hpcExpc3QiLCJzaGlwTGVuZ3RocyIsIml0ZW0iLCJzaGlwRGl2Iiwic2hpcFNxIl0sInNvdXJjZVJvb3QiOiIifQ==