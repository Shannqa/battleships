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
    startGame.addEventListener("click", checkplacedShips);
    const placeInfo = document.querySelector(".place-info");
    const placeInfoSp2 = document.createElement("p");
    placeInfoSp2.textContent = "Once you're happy with the placement of your ships, click the start button to begin the game!";
    placeInfo.appendChild(startGame);
    placeInfo.appendChild(placeInfoSp2);
    placeShips.appendChild(placeInfo);
  }
}

// +++ check if all ships are placed correctly
function checkplacedShips() {
  (0,_game_js__WEBPACK_IMPORTED_MODULE_0__.playGame)();
  ///
}

// place ships on the player's board
function placeShips(board) {
  // get placed ships coords
  const shipLengths = [2, 3, 4, 5];
  shipLengths.forEach((item, index) => {
    const ship = document.querySelector(`#to-place-${index}`);
    const coordStart = ship.parentNode.id;
    coordStart.split("");
    let startRow = parseInt(coordStart[1]);
    let startColumn = parseInt(coordStart[3]);
    let length = parseInt(item);
    if (ship.classList.contains("flex-toggle")) {
      // ship is vertical
      board.placeShip(length, [startRow, startColumn], [startRow, startColumn + length - 1]);
    } else {
      // ship is horizontal
      board.placeShip(length, [startRow, startColumn], [startRow, startColumn + length - 1]);
    }
  });
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
// possibleScore depends on the overall nr of ships and their length
// available ships:
// 1x 5-square
// 1x 4-square
// 2x 3-square
// 2x 2-square
// = 19 possible score

//import { isNumber } from "lodash";

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
    this.shipLengths = [2, 3, 4, 5];
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
    for (let y = 0; y < 10; y++) {
      gridArray.push([]);
      for (let x = 0; x < 10; x++) {
        gridArray[y].push(null);
      }
    }
    return gridArray;
  }
  generateNewCoords(shipLength) {
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
      return this.generateNewCoords(shipLength);
    }
  }
  randomizePlacement() {
    for (let i = this.shipLengths.length - 1; i >= 0; i--) {
      const shipL = parseInt(this.shipLengths[i]);
      let coords = this.genCoo(shipL);
      this.placeShip(shipL, [coords[0][0], coords[0][1]], [coords[1][0], coords[1][1]]);
      console.log(this.grid);
    }
  }
  genCoo(shipLength) {
    let coords = this.generateNewCoords(parseInt(shipLength));
    let fullCoords = this.getFullCoords(coords);
    let coordCheck = this.checkIfOccupied(fullCoords);
    if (coordCheck === false) {
      return coords;
    } else {
      return this.genCoo(parseInt(shipLength));
    }
  }
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
    // console.log(fullCoordinates);
    return fullCoordinates;
  }

  // check if a square on the board is already occupied
  checkIfOccupied(fullCoordinates) {
    console.log(fullCoordinates);
    for (let i = 0; i < fullCoordinates.length; i++) {
      let coord = fullCoordinates[i];
      if (this.grid[parseInt(coord[0])][parseInt(coord[1])] !== null) {
        console.log("check - occupied");
        return true;
      }
    }
    console.log("unoccupied");
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
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.placeShips)(boardA);
  // console.log(boardA.grid);

  (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.cleanPlaceDom)();
  boardA.drawGrid();
  boardB.randomizePlacement();
  boardB.drawGrid();
  console.log(boardB.grid);
}


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
/******/ 			// no module.id needed
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


//import imgsrc from "./img_logo.gif";
//import css from "./style.css";

(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.createDom)();
(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.prepareShips)();

//
(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.cleanPlaceDom)();
const playerB = new _game_js__WEBPACK_IMPORTED_MODULE_1__.Player("AI");
const boardB = new _game_js__WEBPACK_IMPORTED_MODULE_1__.Gameboard("AI");
boardB.randomizePlacement();
boardB.drawGrid();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBd0Q7QUFFeEQsU0FBU0csU0FBU0EsQ0FBQ0MsRUFBRSxFQUFFO0VBQ3JCQSxFQUFFLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JCO0FBRUEsU0FBU0MsSUFBSUEsQ0FBQ0YsRUFBRSxFQUFFO0VBQ2hCQSxFQUFFLENBQUNHLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLE1BQU0sRUFBRUosRUFBRSxDQUFDSyxNQUFNLENBQUNDLEVBQUUsQ0FBQztBQUMvQztBQUVBLFNBQVNDLElBQUlBLENBQUNQLEVBQUUsRUFBRTtFQUNoQkEsRUFBRSxDQUFDQyxjQUFjLENBQUMsQ0FBQztFQUNuQixJQUFJTyxJQUFJLEdBQUdSLEVBQUUsQ0FBQ0csWUFBWSxDQUFDTSxPQUFPLENBQUMsTUFBTSxDQUFDO0VBQzFDQyxRQUFRLENBQUNDLGNBQWMsQ0FBQ0gsSUFBSSxDQUFDLENBQUNJLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGVBQWUsQ0FBQztFQUM1RGIsRUFBRSxDQUFDSyxNQUFNLENBQUNTLFdBQVcsQ0FBQ0osUUFBUSxDQUFDQyxjQUFjLENBQUNILElBQUksQ0FBQyxDQUFDO0FBQ3REO0FBRUEsU0FBU08sT0FBT0EsQ0FBQ2YsRUFBRSxFQUFFO0VBQ25CZ0IsaUJBQWlCLENBQUMsQ0FBQztBQUNyQjtBQUVBLFNBQVNDLFVBQVVBLENBQUEsRUFBRztFQUNwQixJQUFJQyxTQUFTLEdBQUcsRUFBRTtFQUNsQixLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO0lBQzNCRCxTQUFTLENBQUNFLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbEIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLEVBQUUsRUFBRTtNQUMzQkgsU0FBUyxDQUFDQyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6QjtFQUNGO0VBQ0EsT0FBT0YsU0FBUztBQUNsQjtBQUVBLFNBQVNJLFFBQVFBLENBQUEsRUFBRztFQUNsQixNQUFNQyxRQUFRLEdBQUdiLFFBQVEsQ0FBQ2MsYUFBYSxDQUFDLFlBQVksQ0FBQztFQUNyRCxNQUFNQyxLQUFLLEdBQUdSLFVBQVUsQ0FBQyxDQUFDO0VBRTFCLE1BQU1TLElBQUksR0FBR2hCLFFBQVEsQ0FBQ2MsYUFBYSxDQUFDLE1BQU0sQ0FBQztFQUMzQyxNQUFNRyxJQUFJLEdBQUdqQixRQUFRLENBQUNrQixhQUFhLENBQUMsS0FBSyxDQUFDO0VBRTFDSCxLQUFLLENBQUNJLE9BQU8sQ0FBQyxDQUFDQyxHQUFHLEVBQUVDLE1BQU0sS0FBSztJQUM3QkQsR0FBRyxDQUFDRCxPQUFPLENBQUMsQ0FBQ0csSUFBSSxFQUFFQyxNQUFNLEtBQUs7TUFDNUIsTUFBTUMsTUFBTSxHQUFHeEIsUUFBUSxDQUFDa0IsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUM1Q00sTUFBTSxDQUFDdEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQzlCcUIsTUFBTSxDQUFDQyxZQUFZLENBQUMsSUFBSSxFQUFHLElBQUdKLE1BQU8sSUFBR0UsTUFBTyxFQUFDLENBQUM7TUFDakQsSUFBSUQsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNuQkUsTUFBTSxDQUFDdEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQzlCO01BQ0EsSUFBSW1CLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDbkJFLE1BQU0sQ0FBQ3RCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUM5QjtNQUNBLElBQUltQixJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ2xCRSxNQUFNLENBQUN0QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxLQUFLLENBQUM7TUFDN0I7TUFDQXFCLE1BQU0sQ0FBQ0UsZ0JBQWdCLENBQUMsTUFBTSxFQUFFN0IsSUFBSSxDQUFDO01BQ3JDMkIsTUFBTSxDQUFDRSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUVyQyxTQUFTLENBQUM7TUFDOUM0QixJQUFJLENBQUNiLFdBQVcsQ0FBQ29CLE1BQU0sQ0FBQztJQUMxQixDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7RUFFRlAsSUFBSSxDQUFDZixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7RUFDMUJjLElBQUksQ0FBQ2YsU0FBUyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7RUFDcENVLFFBQVEsQ0FBQ1QsV0FBVyxDQUFDYSxJQUFJLENBQUM7QUFDNUI7QUFFQSxTQUFTVSxTQUFTQSxDQUFBLEVBQUc7RUFDbkIsTUFBTVgsSUFBSSxHQUFHaEIsUUFBUSxDQUFDYyxhQUFhLENBQUMsTUFBTSxDQUFDO0VBQzNDLE1BQU1jLE1BQU0sR0FBRzVCLFFBQVEsQ0FBQ2tCLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDNUMsTUFBTVcsSUFBSSxHQUFHN0IsUUFBUSxDQUFDa0IsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMxQyxNQUFNWSxNQUFNLEdBQUc5QixRQUFRLENBQUNrQixhQUFhLENBQUMsS0FBSyxDQUFDO0VBRTVDVSxNQUFNLENBQUMxQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFDOUIsTUFBTTRCLEtBQUssR0FBRy9CLFFBQVEsQ0FBQ2tCLGFBQWEsQ0FBQyxNQUFNLENBQUM7RUFDNUNhLEtBQUssQ0FBQ0MsV0FBVyxHQUFHLGFBQWE7RUFFakNILElBQUksQ0FBQzNCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztFQUMxQjtFQUNBO0VBQ0E7O0VBRUF5QixNQUFNLENBQUN4QixXQUFXLENBQUMyQixLQUFLLENBQUM7RUFDekI7RUFDQTs7RUFFQWYsSUFBSSxDQUFDWixXQUFXLENBQUN3QixNQUFNLENBQUM7RUFDeEJaLElBQUksQ0FBQ1osV0FBVyxDQUFDeUIsSUFBSSxDQUFDO0VBQ3RCYixJQUFJLENBQUNaLFdBQVcsQ0FBQzBCLE1BQU0sQ0FBQztBQUMxQjtBQUVBLFNBQVNHLFlBQVlBLENBQUEsRUFBRztFQUN0QixNQUFNSixJQUFJLEdBQUc3QixRQUFRLENBQUNjLGFBQWEsQ0FBQyxPQUFPLENBQUM7RUFDNUMsTUFBTUQsUUFBUSxHQUFHYixRQUFRLENBQUNrQixhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzlDLE1BQU1nQixhQUFhLEdBQUdsQyxRQUFRLENBQUNrQixhQUFhLENBQUMsTUFBTSxDQUFDO0VBQ3BETCxRQUFRLENBQUNYLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztFQUNuQytCLGFBQWEsQ0FBQ0YsV0FBVyxHQUFHLFlBQVk7RUFFeEMsTUFBTUcsVUFBVSxHQUFHbkMsUUFBUSxDQUFDa0IsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUNoRGlCLFVBQVUsQ0FBQ2pDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztFQUN2QyxNQUFNaUMsVUFBVSxHQUFHcEMsUUFBUSxDQUFDa0IsYUFBYSxDQUFDLE1BQU0sQ0FBQztFQUNqRGtCLFVBQVUsQ0FBQ0osV0FBVyxHQUFHLGtCQUFrQjtFQUUzQyxNQUFNSyxRQUFRLEdBQUdyQyxRQUFRLENBQUNrQixhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzlDbUIsUUFBUSxDQUFDbkMsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0VBRW5DLE1BQU1tQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDaENBLFdBQVcsQ0FBQ25CLE9BQU8sQ0FBQyxDQUFDb0IsSUFBSSxFQUFFQyxLQUFLLEtBQUs7SUFDbkMsTUFBTUMsT0FBTyxHQUFHekMsUUFBUSxDQUFDa0IsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUM3Q3VCLE9BQU8sQ0FBQ3ZDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNqQyxLQUFLLElBQUl1QyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdILElBQUksRUFBRUcsQ0FBQyxFQUFFLEVBQUU7TUFDN0IsTUFBTUMsTUFBTSxHQUFHM0MsUUFBUSxDQUFDa0IsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUM1QztNQUNBLElBQUl3QixDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ1hDLE1BQU0sQ0FBQ3pDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGNBQWMsQ0FBQztNQUN0QztNQUVBd0MsTUFBTSxDQUFDekMsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQzlCd0MsTUFBTSxDQUFDekMsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO01BRWhDc0MsT0FBTyxDQUFDckMsV0FBVyxDQUFDdUMsTUFBTSxDQUFDO0lBQzdCO0lBQ0FGLE9BQU8sQ0FBQ2hCLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO0lBQ3pDZ0IsT0FBTyxDQUFDaEIsWUFBWSxDQUFDLElBQUksRUFBRyxZQUFXZSxLQUFNLEVBQUMsQ0FBQzs7SUFFL0M7SUFDQUMsT0FBTyxDQUFDZixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUVsQyxJQUFJLENBQUM7SUFDM0NpRCxPQUFPLENBQUNmLGdCQUFnQixDQUFDLFNBQVMsRUFBRXJCLE9BQU8sQ0FBQztJQUM1Q29DLE9BQU8sQ0FBQ2YsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLE1BQU07TUFDekNlLE9BQU8sQ0FBQ3ZDLFNBQVMsQ0FBQzBDLE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDekMsQ0FBQyxDQUFDO0lBQ0ZQLFFBQVEsQ0FBQ2pDLFdBQVcsQ0FBQ3FDLE9BQU8sQ0FBQztFQUMvQixDQUFDLENBQUM7RUFFRixNQUFNSSxTQUFTLEdBQUc3QyxRQUFRLENBQUNrQixhQUFhLENBQUMsS0FBSyxDQUFDO0VBQy9DLE1BQU00QixXQUFXLEdBQUc5QyxRQUFRLENBQUNrQixhQUFhLENBQUMsR0FBRyxDQUFDO0VBQy9DMkIsU0FBUyxDQUFDM0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDO0VBQ3JDMkMsV0FBVyxDQUFDZCxXQUFXLEdBQ3JCLHNFQUFzRTtFQUN4RWEsU0FBUyxDQUFDekMsV0FBVyxDQUFDMEMsV0FBVyxDQUFDO0VBQ2xDakIsSUFBSSxDQUFDekIsV0FBVyxDQUFDUyxRQUFRLENBQUM7RUFDMUJBLFFBQVEsQ0FBQ1QsV0FBVyxDQUFDOEIsYUFBYSxDQUFDO0VBQ25DTCxJQUFJLENBQUN6QixXQUFXLENBQUMrQixVQUFVLENBQUM7RUFDNUJBLFVBQVUsQ0FBQy9CLFdBQVcsQ0FBQ2dDLFVBQVUsQ0FBQztFQUNsQ0QsVUFBVSxDQUFDL0IsV0FBVyxDQUFDaUMsUUFBUSxDQUFDO0VBQ2hDRixVQUFVLENBQUMvQixXQUFXLENBQUN5QyxTQUFTLENBQUM7RUFFakNqQyxRQUFRLENBQUMsQ0FBQztBQUNaOztBQUVBO0FBQ0EsU0FBU04saUJBQWlCQSxDQUFBLEVBQUc7RUFDM0IsTUFBTTZCLFVBQVUsR0FBR25DLFFBQVEsQ0FBQ2MsYUFBYSxDQUFDLGNBQWMsQ0FBQztFQUN6RCxNQUFNdUIsUUFBUSxHQUFHckMsUUFBUSxDQUFDYyxhQUFhLENBQUMsWUFBWSxDQUFDO0VBQ3JELElBQUl1QixRQUFRLENBQUNVLFVBQVUsQ0FBQ0MsTUFBTSxLQUFLLENBQUMsRUFBRTtJQUNwQyxNQUFNQyxTQUFTLEdBQUdqRCxRQUFRLENBQUNrQixhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ2xEK0IsU0FBUyxDQUFDakIsV0FBVyxHQUFHLFlBQVk7SUFDcENpQixTQUFTLENBQUMvQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDckM4QyxTQUFTLENBQUN2QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUV3QixnQkFBZ0IsQ0FBQztJQUNyRCxNQUFNTCxTQUFTLEdBQUc3QyxRQUFRLENBQUNjLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDdkQsTUFBTXFDLFlBQVksR0FBR25ELFFBQVEsQ0FBQ2tCLGFBQWEsQ0FBQyxHQUFHLENBQUM7SUFDaERpQyxZQUFZLENBQUNuQixXQUFXLEdBQ3RCLCtGQUErRjtJQUNqR2EsU0FBUyxDQUFDekMsV0FBVyxDQUFDNkMsU0FBUyxDQUFDO0lBQ2hDSixTQUFTLENBQUN6QyxXQUFXLENBQUMrQyxZQUFZLENBQUM7SUFDbkNoQixVQUFVLENBQUMvQixXQUFXLENBQUN5QyxTQUFTLENBQUM7RUFDbkM7QUFDRjs7QUFFQTtBQUNBLFNBQVNLLGdCQUFnQkEsQ0FBQSxFQUFHO0VBQzFCOUQsa0RBQVEsQ0FBQyxDQUFDO0VBQ1Y7QUFDRjs7QUFFQTtBQUNBLFNBQVMrQyxVQUFVQSxDQUFDaUIsS0FBSyxFQUFFO0VBQ3pCO0VBQ0EsTUFBTWQsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hDQSxXQUFXLENBQUNuQixPQUFPLENBQUMsQ0FBQ29CLElBQUksRUFBRUMsS0FBSyxLQUFLO0lBQ25DLE1BQU1hLElBQUksR0FBR3JELFFBQVEsQ0FBQ2MsYUFBYSxDQUFFLGFBQVkwQixLQUFNLEVBQUMsQ0FBQztJQUN6RCxNQUFNYyxVQUFVLEdBQUdELElBQUksQ0FBQ0UsVUFBVSxDQUFDM0QsRUFBRTtJQUNyQzBELFVBQVUsQ0FBQ0UsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUNwQixJQUFJQyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0osVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLElBQUlLLFdBQVcsR0FBR0QsUUFBUSxDQUFDSixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsSUFBSU4sTUFBTSxHQUFHVSxRQUFRLENBQUNuQixJQUFJLENBQUM7SUFDM0IsSUFBSWMsSUFBSSxDQUFDbkQsU0FBUyxDQUFDMEQsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO01BQzFDO01BQ0FSLEtBQUssQ0FBQ1MsU0FBUyxDQUNiYixNQUFNLEVBQ04sQ0FBQ1MsUUFBUSxFQUFFRSxXQUFXLENBQUMsRUFDdkIsQ0FBQ0YsUUFBUSxFQUFFRSxXQUFXLEdBQUdYLE1BQU0sR0FBRyxDQUFDLENBQ3JDLENBQUM7SUFDSCxDQUFDLE1BQU07TUFDTDtNQUNBSSxLQUFLLENBQUNTLFNBQVMsQ0FDYmIsTUFBTSxFQUNOLENBQUNTLFFBQVEsRUFBRUUsV0FBVyxDQUFDLEVBQ3ZCLENBQUNGLFFBQVEsRUFBRUUsV0FBVyxHQUFHWCxNQUFNLEdBQUcsQ0FBQyxDQUNyQyxDQUFDO0lBQ0g7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVBLFNBQVNjLGFBQWFBLENBQUEsRUFBRztFQUN2QixNQUFNakMsSUFBSSxHQUFHN0IsUUFBUSxDQUFDYyxhQUFhLENBQUMsT0FBTyxDQUFDO0VBQzVDLE9BQU9lLElBQUksQ0FBQ2tDLFVBQVUsRUFBRTtJQUN0QmxDLElBQUksQ0FBQ21DLFdBQVcsQ0FBQ25DLElBQUksQ0FBQ2tDLFVBQVUsQ0FBQztFQUNuQztBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ3FEO0FBRXJELE1BQU1FLGFBQWEsR0FBRyxFQUFFO0FBRXhCLE1BQU1DLElBQUksQ0FBQztFQUNUQyxXQUFXQSxDQUFDbkIsTUFBTSxFQUFFcEQsRUFBRSxFQUFFO0lBQ3RCLElBQUksQ0FBQ29ELE1BQU0sR0FBR0EsTUFBTTtJQUNwQixJQUFJLENBQUNvQixJQUFJLEdBQUcsQ0FBQztJQUNiLElBQUksQ0FBQ0MsU0FBUyxHQUFHLEtBQUs7SUFDdEIsSUFBSSxDQUFDekUsRUFBRSxHQUFHQSxFQUFFO0VBQ2Q7RUFFQTBFLEdBQUdBLENBQUEsRUFBRztJQUNKLElBQUksQ0FBQ0YsSUFBSSxJQUFJLENBQUM7SUFDZCxJQUFJLENBQUNHLE1BQU0sQ0FBQyxDQUFDO0VBQ2Y7RUFFQUEsTUFBTUEsQ0FBQSxFQUFHO0lBQ1AsSUFBSSxJQUFJLENBQUNILElBQUksSUFBSSxJQUFJLENBQUNwQixNQUFNLEVBQUU7TUFDNUIsSUFBSSxDQUFDcUIsU0FBUyxHQUFHLElBQUk7TUFDckIsT0FBTyxJQUFJO0lBQ2I7SUFDQSxPQUFPLEtBQUs7RUFDZDtBQUNGO0FBRUEsTUFBTW5GLFNBQVMsQ0FBQztFQUNkaUYsV0FBV0EsQ0FBQ0ssS0FBSyxFQUFFO0lBQ2pCLElBQUksQ0FBQ3ZELElBQUksR0FBRyxJQUFJLENBQUNWLFVBQVUsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQ2lFLEtBQUssR0FBR0EsS0FBSztJQUNsQixJQUFJLENBQUNDLFNBQVMsR0FBRyxFQUFFO0lBQ25CLElBQUksQ0FBQ0MsWUFBWSxHQUFHLENBQUM7SUFDckIsSUFBSSxDQUFDQyxRQUFRLEdBQUcsS0FBSztJQUNyQixJQUFJLENBQUNyQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDakM7RUFFQXVCLFNBQVNBLENBQUNiLE1BQU0sRUFBRTRCLFdBQVcsRUFBRUMsU0FBUyxFQUFFO0lBQ3hDLE1BQU1qRixFQUFFLEdBQUcsSUFBSSxDQUFDNkUsU0FBUyxDQUFDekIsTUFBTTtJQUNoQyxNQUFNOEIsVUFBVSxHQUFHLElBQUlaLElBQUksQ0FBQ2xCLE1BQU0sRUFBRXBELEVBQUUsQ0FBQztJQUN2QztJQUNBO0lBQ0E7O0lBRUEsSUFBSSxDQUFDNkUsU0FBUyxDQUFDL0QsSUFBSSxDQUFDb0UsVUFBVSxDQUFDO0lBQy9CLElBQUlGLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBS0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO01BQ25DLEtBQUssSUFBSW5DLENBQUMsR0FBR2tDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRWxDLENBQUMsSUFBSW1DLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRW5DLENBQUMsRUFBRSxFQUFFO1FBQ25ELElBQUksQ0FBQ3pCLElBQUksQ0FBQ3lCLENBQUMsQ0FBQyxDQUFDa0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdoRixFQUFFO01BQ25DO0lBQ0Y7SUFDQSxJQUFJZ0YsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7TUFDbkMsS0FBSyxJQUFJbkMsQ0FBQyxHQUFHa0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFbEMsQ0FBQyxJQUFJbUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFbkMsQ0FBQyxFQUFFLEVBQUU7UUFDbkQsSUFBSSxDQUFDekIsSUFBSSxDQUFDMkQsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNsQyxDQUFDLENBQUMsR0FBRzlDLEVBQUU7TUFDbkM7SUFDRjtJQUVBLElBQUksQ0FBQ3FCLElBQUksQ0FBQzJELFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR2hGLEVBQUU7SUFDOUMsSUFBSSxDQUFDcUIsSUFBSSxDQUFDNEQsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHakYsRUFBRTtFQUM1QztFQUVBbUYsYUFBYUEsQ0FBQ0MsT0FBTyxFQUFFQyxPQUFPLEVBQUU7SUFDOUIsSUFBSXJGLEVBQUUsR0FBRyxJQUFJLENBQUNxQixJQUFJLENBQUMrRCxPQUFPLENBQUMsQ0FBQ0MsT0FBTyxDQUFDO0lBQ3BDLElBQUlyRixFQUFFLEtBQUssSUFBSSxFQUFFO01BQ2YsSUFBSSxDQUFDcUIsSUFBSSxDQUFDK0QsT0FBTyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxHQUFHLE1BQU07SUFDdEMsQ0FBQyxNQUFNLElBQUlyRixFQUFFLEtBQUssTUFBTSxJQUFJQSxFQUFFLEtBQUssS0FBSyxFQUFFO01BQ3hDLE9BQU8sY0FBYztJQUN2QixDQUFDLE1BQU07TUFDTCxJQUFJc0YsT0FBTyxHQUFHLElBQUksQ0FBQ1QsU0FBUyxDQUFDN0UsRUFBRSxDQUFDO01BQ2hDLElBQUksQ0FBQ3FCLElBQUksQ0FBQytELE9BQU8sQ0FBQyxDQUFDQyxPQUFPLENBQUMsR0FBRyxLQUFLO01BQ25DQyxPQUFPLENBQUNaLEdBQUcsQ0FBQyxDQUFDO01BQ2IsSUFBSSxDQUFDSSxZQUFZLElBQUksQ0FBQztJQUN4QjtFQUNGO0VBRUFTLFdBQVdBLENBQUEsRUFBRztJQUNaLElBQUksSUFBSSxDQUFDVCxZQUFZLElBQUlULGFBQWEsRUFBRTtNQUN0QyxJQUFJLENBQUNVLFFBQVEsR0FBRyxJQUFJO01BRXBCLE9BQU8sSUFBSTtJQUNiO0lBQ0EsT0FBTyxLQUFLO0VBQ2Q7RUFFQXBFLFVBQVVBLENBQUEsRUFBRztJQUNYLElBQUlDLFNBQVMsR0FBRyxFQUFFO0lBQ2xCLEtBQUssSUFBSUcsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7TUFDM0JILFNBQVMsQ0FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQztNQUNsQixLQUFLLElBQUlELENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO1FBQzNCRCxTQUFTLENBQUNHLENBQUMsQ0FBQyxDQUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDO01BQ3pCO0lBQ0Y7SUFDQSxPQUFPRixTQUFTO0VBQ2xCO0VBRUE0RSxpQkFBaUJBLENBQUNDLFVBQVUsRUFBRTtJQUM1QixNQUFNNUIsUUFBUSxHQUFHNkIsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDL0MsTUFBTUMsUUFBUSxHQUFHSCxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMvQyxNQUFNRSxNQUFNLEdBQUdqQyxRQUFRLEdBQUdDLFFBQVEsQ0FBQzJCLFVBQVUsQ0FBQyxHQUFHLENBQUM7SUFDbEQsTUFBTU0sTUFBTSxHQUFHRixRQUFRLEdBQUcvQixRQUFRLENBQUMyQixVQUFVLENBQUMsR0FBRyxDQUFDO0lBRWxELElBQUlLLE1BQU0sR0FBRyxFQUFFLElBQUlDLE1BQU0sR0FBRyxFQUFFLEVBQUU7TUFDOUI7TUFDQSxJQUFJQyxNQUFNLEdBQUdOLElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO01BQzlCLElBQUlJLE1BQU0sR0FBRyxHQUFHLEVBQUU7UUFDaEIsT0FBTyxDQUNMLENBQUNuQyxRQUFRLEVBQUVnQyxRQUFRLENBQUMsRUFDcEIsQ0FBQ2hDLFFBQVEsRUFBRWtDLE1BQU0sQ0FBQyxDQUNuQjtNQUNILENBQUMsTUFBTTtRQUNMLE9BQU8sQ0FDTCxDQUFDbEMsUUFBUSxFQUFFZ0MsUUFBUSxDQUFDLEVBQ3BCLENBQUNDLE1BQU0sRUFBRUQsUUFBUSxDQUFDLENBQ25CO01BQ0g7SUFDRixDQUFDLE1BQU0sSUFBSUUsTUFBTSxHQUFHLEVBQUUsRUFBRTtNQUN0QixPQUFPLENBQ0wsQ0FBQ2xDLFFBQVEsRUFBRWdDLFFBQVEsQ0FBQyxFQUNwQixDQUFDaEMsUUFBUSxFQUFFa0MsTUFBTSxDQUFDLENBQ25CO0lBQ0gsQ0FBQyxNQUFNLElBQUlELE1BQU0sR0FBRyxFQUFFLEVBQUU7TUFDdEIsT0FBTyxDQUNMLENBQUNqQyxRQUFRLEVBQUVnQyxRQUFRLENBQUMsRUFDcEIsQ0FBQ0MsTUFBTSxFQUFFRCxRQUFRLENBQUMsQ0FDbkI7SUFDSCxDQUFDLE1BQU07TUFDTCxPQUFPLElBQUksQ0FBQ0wsaUJBQWlCLENBQUNDLFVBQVUsQ0FBQztJQUMzQztFQUNGO0VBRUFRLGtCQUFrQkEsQ0FBQSxFQUFHO0lBQ25CLEtBQUssSUFBSW5ELENBQUMsR0FBRyxJQUFJLENBQUNKLFdBQVcsQ0FBQ1UsTUFBTSxHQUFHLENBQUMsRUFBRU4sQ0FBQyxJQUFJLENBQUMsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7TUFDckQsTUFBTW9ELEtBQUssR0FBR3BDLFFBQVEsQ0FBQyxJQUFJLENBQUNwQixXQUFXLENBQUNJLENBQUMsQ0FBQyxDQUFDO01BQzNDLElBQUlxRCxNQUFNLEdBQUcsSUFBSSxDQUFDQyxNQUFNLENBQUNGLEtBQUssQ0FBQztNQUMvQixJQUFJLENBQUNqQyxTQUFTLENBQ1ppQyxLQUFLLEVBQ0wsQ0FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDNUIsQ0FBQ0EsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzdCLENBQUM7TUFDREUsT0FBTyxDQUFDQyxHQUFHLENBQUMsSUFBSSxDQUFDakYsSUFBSSxDQUFDO0lBQ3hCO0VBQ0Y7RUFFQStFLE1BQU1BLENBQUNYLFVBQVUsRUFBRTtJQUNqQixJQUFJVSxNQUFNLEdBQUcsSUFBSSxDQUFDWCxpQkFBaUIsQ0FBQzFCLFFBQVEsQ0FBQzJCLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELElBQUljLFVBQVUsR0FBRyxJQUFJLENBQUNDLGFBQWEsQ0FBQ0wsTUFBTSxDQUFDO0lBQzNDLElBQUlNLFVBQVUsR0FBRyxJQUFJLENBQUNDLGVBQWUsQ0FBQ0gsVUFBVSxDQUFDO0lBQ2pELElBQUlFLFVBQVUsS0FBSyxLQUFLLEVBQUU7TUFDeEIsT0FBT04sTUFBTTtJQUNmLENBQUMsTUFBTTtNQUNMLE9BQU8sSUFBSSxDQUFDQyxNQUFNLENBQUN0QyxRQUFRLENBQUMyQixVQUFVLENBQUMsQ0FBQztJQUMxQztFQUNGO0VBRUFlLGFBQWFBLENBQUNMLE1BQU0sRUFBRTtJQUNwQixJQUFJUSxRQUFRLEdBQUc3QyxRQUFRLENBQUNxQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsSUFBSVMsUUFBUSxHQUFHOUMsUUFBUSxDQUFDcUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLElBQUlVLE1BQU0sR0FBRy9DLFFBQVEsQ0FBQ3FDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxJQUFJVyxNQUFNLEdBQUdoRCxRQUFRLENBQUNxQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkMsSUFBSVksZUFBZSxHQUFHLEVBQUU7SUFDeEIsSUFBSUosUUFBUSxLQUFLRSxNQUFNLEVBQUU7TUFDdkIsS0FBSyxJQUFJL0QsQ0FBQyxHQUFHNkQsUUFBUSxFQUFFN0QsQ0FBQyxJQUFJK0QsTUFBTSxFQUFFL0QsQ0FBQyxFQUFFLEVBQUU7UUFDdkNpRSxlQUFlLENBQUNqRyxJQUFJLENBQUMsQ0FBQ2dDLENBQUMsRUFBRThELFFBQVEsQ0FBQyxDQUFDO01BQ3JDO0lBQ0Y7SUFDQSxJQUFJQSxRQUFRLEtBQUtFLE1BQU0sRUFBRTtNQUN2QixLQUFLLElBQUloRSxDQUFDLEdBQUc4RCxRQUFRLEVBQUU5RCxDQUFDLElBQUlnRSxNQUFNLEVBQUVoRSxDQUFDLEVBQUUsRUFBRTtRQUN2Q2lFLGVBQWUsQ0FBQ2pHLElBQUksQ0FBQyxDQUFDNkYsUUFBUSxFQUFFN0QsQ0FBQyxDQUFDLENBQUM7TUFDckM7SUFDRjtJQUNBO0lBQ0EsT0FBT2lFLGVBQWU7RUFDeEI7O0VBRUE7RUFDQUwsZUFBZUEsQ0FBQ0ssZUFBZSxFQUFFO0lBQy9CVixPQUFPLENBQUNDLEdBQUcsQ0FBQ1MsZUFBZSxDQUFDO0lBQzVCLEtBQUssSUFBSWpFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2lFLGVBQWUsQ0FBQzNELE1BQU0sRUFBRU4sQ0FBQyxFQUFFLEVBQUU7TUFDL0MsSUFBSWtFLEtBQUssR0FBR0QsZUFBZSxDQUFDakUsQ0FBQyxDQUFDO01BQzlCLElBQUksSUFBSSxDQUFDekIsSUFBSSxDQUFDeUMsUUFBUSxDQUFDa0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2xELFFBQVEsQ0FBQ2tELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQzlEWCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztRQUMvQixPQUFPLElBQUk7TUFDYjtJQUNGO0lBQ0FELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztJQUN6QixPQUFPLEtBQUs7RUFDZDtFQUVBdEYsUUFBUUEsQ0FBQSxFQUFHO0lBQ1QsTUFBTWlCLElBQUksR0FBRzdCLFFBQVEsQ0FBQ2MsYUFBYSxDQUFDLE9BQU8sQ0FBQztJQUM1QyxNQUFNQyxLQUFLLEdBQUcsSUFBSSxDQUFDRSxJQUFJO0lBQ3ZCOztJQUVBLE1BQU1ELElBQUksR0FBR2hCLFFBQVEsQ0FBQ2MsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxNQUFNRyxJQUFJLEdBQUdqQixRQUFRLENBQUNrQixhQUFhLENBQUMsS0FBSyxDQUFDO0lBRTFDSCxLQUFLLENBQUNJLE9BQU8sQ0FBQyxDQUFDQyxHQUFHLEVBQUVDLE1BQU0sS0FBSztNQUM3QkQsR0FBRyxDQUFDRCxPQUFPLENBQUMsQ0FBQzBGLE1BQU0sRUFBRXRGLE1BQU0sS0FBSztRQUM5QixNQUFNQyxNQUFNLEdBQUd4QixRQUFRLENBQUNrQixhQUFhLENBQUMsS0FBSyxDQUFDO1FBRTVDTSxNQUFNLENBQUN0QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDOUJxQixNQUFNLENBQUNDLFlBQVksQ0FBQyxJQUFJLEVBQUcsSUFBR0osTUFBTyxJQUFHRSxNQUFPLEVBQUMsQ0FBQztRQUNqRCxJQUFJLE9BQU9zRixNQUFNLElBQUksUUFBUSxFQUFFO1VBQzdCO1VBQ0EsSUFBSSxJQUFJLENBQUNyQyxLQUFLLEtBQUssT0FBTyxFQUFFO1lBQzFCaEQsTUFBTSxDQUFDdEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO1VBQ2xDLENBQUMsTUFBTTtZQUNMcUIsTUFBTSxDQUFDdEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDO1VBQ3BDO1FBQ0Y7UUFDQSxJQUFJMEcsTUFBTSxLQUFLLE1BQU0sRUFBRTtVQUNyQnJGLE1BQU0sQ0FBQ3RCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUM5QjtRQUNBLElBQUkwRyxNQUFNLEtBQUssS0FBSyxFQUFFO1VBQ3BCckYsTUFBTSxDQUFDdEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQzdCO1FBQ0FjLElBQUksQ0FBQ2IsV0FBVyxDQUFDb0IsTUFBTSxDQUFDO01BQzFCLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUNGLElBQUksSUFBSSxDQUFDZ0QsS0FBSyxLQUFLLE9BQU8sRUFBRTtNQUMxQnZELElBQUksQ0FBQ2YsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ2hDLENBQUMsTUFBTTtNQUNMYyxJQUFJLENBQUNmLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztJQUNsQztJQUNBYyxJQUFJLENBQUNmLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUMxQjBCLElBQUksQ0FBQ3pCLFdBQVcsQ0FBQ2EsSUFBSSxDQUFDO0VBQ3hCO0FBQ0Y7QUFFQSxNQUFNOUIsTUFBTSxDQUFDO0VBQ1hnRixXQUFXQSxDQUFDSyxLQUFLLEVBQUU7SUFDakIsSUFBSSxDQUFDQSxLQUFLLEdBQUdBLEtBQUs7RUFDcEI7QUFDRjtBQUVBLFNBQVNwRixRQUFRQSxDQUFBLEVBQUc7RUFDbEIsTUFBTTBILE9BQU8sR0FBRyxJQUFJM0gsTUFBTSxDQUFDLE9BQU8sQ0FBQztFQUNuQyxNQUFNNEgsT0FBTyxHQUFHLElBQUk1SCxNQUFNLENBQUMsSUFBSSxDQUFDO0VBQ2hDLE1BQU02SCxNQUFNLEdBQUcsSUFBSTlILFNBQVMsQ0FBQyxPQUFPLENBQUM7RUFDckMsTUFBTStILE1BQU0sR0FBRyxJQUFJL0gsU0FBUyxDQUFDLElBQUksQ0FBQztFQUNsQ2lELG1EQUFVLENBQUM2RSxNQUFNLENBQUM7RUFDbEI7O0VBRUFsRCxzREFBYSxDQUFDLENBQUM7RUFFZmtELE1BQU0sQ0FBQ3BHLFFBQVEsQ0FBQyxDQUFDO0VBRWpCcUcsTUFBTSxDQUFDcEIsa0JBQWtCLENBQUMsQ0FBQztFQUMzQm9CLE1BQU0sQ0FBQ3JHLFFBQVEsQ0FBQyxDQUFDO0VBQ2pCcUYsT0FBTyxDQUFDQyxHQUFHLENBQUNlLE1BQU0sQ0FBQ2hHLElBQUksQ0FBQztBQUMxQjs7Ozs7OztVQ2xRQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05rRTtBQUNWO0FBQ3hEO0FBQ0E7O0FBRUFVLGtEQUFTLENBQUMsQ0FBQztBQUNYTSxxREFBWSxDQUFDLENBQUM7O0FBRWQ7QUFDQTZCLHNEQUFhLENBQUMsQ0FBQztBQUVmLE1BQU1pRCxPQUFPLEdBQUcsSUFBSTVILDRDQUFNLENBQUMsSUFBSSxDQUFDO0FBQzlCLE1BQU04SCxNQUFNLEdBQUcsSUFBSS9ILCtDQUFTLENBQUMsSUFBSSxDQUFDO0FBQ2xDK0gsTUFBTSxDQUFDcEIsa0JBQWtCLENBQUMsQ0FBQztBQUUzQm9CLE1BQU0sQ0FBQ3JHLFFBQVEsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVib2FyZCwgUGxheWVyLCBwbGF5R2FtZSB9IGZyb20gXCIuL2dhbWUuanNcIjtcclxuXHJcbmZ1bmN0aW9uIGFsbG93RHJvcChldikge1xyXG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWcoZXYpIHtcclxuICBldi5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgZXYudGFyZ2V0LmlkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJvcChldikge1xyXG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgdmFyIGRhdGEgPSBldi5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIik7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YSkuY2xhc3NMaXN0LmFkZChcInNoaXAtb24tYm9hcmRcIik7XHJcbiAgZXYudGFyZ2V0LmFwcGVuZENoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGEpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhZ0VuZChldikge1xyXG4gIGFyZUFsbFNoaXBzUGxhY2VkKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUdyaWQoKSB7XHJcbiAgbGV0IGdyaWRBcnJheSA9IFtdO1xyXG4gIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xyXG4gICAgZ3JpZEFycmF5LnB1c2goW10pO1xyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XHJcbiAgICAgIGdyaWRBcnJheVt4XS5wdXNoKG51bGwpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZ3JpZEFycmF5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3R3JpZCgpIHtcclxuICBjb25zdCBvd25Cb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3duLWJvYXJkXCIpO1xyXG4gIGNvbnN0IGFycmF5ID0gY3JlYXRlR3JpZCgpO1xyXG5cclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gIGFycmF5LmZvckVhY2goKHJvdywgcmluZGV4KSA9PiB7XHJcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY2luZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xyXG4gICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHIke3JpbmRleH1jJHtjaW5kZXh9YCk7XHJcbiAgICAgIGlmIChjZWxsID09PSBcInNoaXBcIikge1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2VsbCA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNlbGwgPT09IFwiaGl0XCIpIHtcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgfVxyXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcCk7XHJcbiAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgYWxsb3dEcm9wKTtcclxuICAgICAgZ3JpZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGdyaWQuY2xhc3NMaXN0LmFkZChcImdyaWRcIik7XHJcbiAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1wbGFjZS1vd25cIik7XHJcbiAgb3duQm9hcmQuYXBwZW5kQ2hpbGQoZ3JpZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURvbSgpIHtcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcclxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIHRpdGxlLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwc1wiO1xyXG5cclxuICBtYWluLmNsYXNzTGlzdC5hZGQoXCJtYWluXCIpO1xyXG4gIC8vIGNvbnN0IGVuZW15Qm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIC8vIGNvbnN0IGVuZW15Qm9hcmRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgLy8gZW5lbXlCb2FyZFRpdGxlLnRleHRDb250ZW50ID0gXCJFbmVteSBib2FyZFwiO1xyXG5cclxuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gIC8vIG1haW4uYXBwZW5kQ2hpbGQoZW5lbXlCb2FyZCk7XHJcbiAgLy8gZW5lbXlCb2FyZC5hcHBlbmRDaGlsZChlbmVteUJvYXJkVGl0bGUpO1xyXG5cclxuICBib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcclxuICBib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZXBhcmVTaGlwcygpIHtcclxuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xyXG4gIGNvbnN0IG93bkJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBvd25Cb2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgb3duQm9hcmQuY2xhc3NMaXN0LmFkZChcIm93bi1ib2FyZFwiKTtcclxuICBvd25Cb2FyZFRpdGxlLnRleHRDb250ZW50ID0gXCJZb3VyIGJvYXJkXCI7XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHBsYWNlU2hpcHMuY2xhc3NMaXN0LmFkZChcInBsYWNlLXNoaXBzXCIpO1xyXG4gIGNvbnN0IHNoaXBzVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICBzaGlwc1RpdGxlLnRleHRDb250ZW50ID0gXCJQbGFjZSB5b3VyIHNoaXBzXCI7XHJcblxyXG4gIGNvbnN0IHNoaXBMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBzaGlwTGlzdC5jbGFzc0xpc3QuYWRkKFwic2hpcC1saXN0XCIpO1xyXG5cclxuICBjb25zdCBzaGlwTGVuZ3RocyA9IFsyLCAzLCA0LCA1XTtcclxuICBzaGlwTGVuZ3Rocy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3Qgc2hpcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzaGlwRGl2LmNsYXNzTGlzdC5hZGQoXCJzaGlwLWRpdlwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbTsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHNoaXBTcSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIC8vIHNoaXBTcS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgc3EwLXRvLXBsYWNlLSR7aW5kZXh9YCk7XHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgc2hpcFNxLmNsYXNzTGlzdC5hZGQoXCJzcTAtdG8tcGxhY2VcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNoaXBTcS5jbGFzc0xpc3QuYWRkKFwic3F1YXJlXCIpO1xyXG4gICAgICBzaGlwU3EuY2xhc3NMaXN0LmFkZChcIm93bi1zaGlwXCIpO1xyXG5cclxuICAgICAgc2hpcERpdi5hcHBlbmRDaGlsZChzaGlwU3EpO1xyXG4gICAgfVxyXG4gICAgc2hpcERpdi5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xyXG4gICAgc2hpcERpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgdG8tcGxhY2UtJHtpbmRleH1gKTtcclxuXHJcbiAgICAvLyBuZWVkIHRvIGhhbmRsZSBlcnJvciAtIHdoZW4gdGhlIGl0ZW0gaXMgZHJhZ2dlZCBpbiB0aGUgbWlkZGxlIG9mIHR3byBzcXVhcmVzXHJcbiAgICBzaGlwRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZyk7XHJcbiAgICBzaGlwRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGRyYWdFbmQpO1xyXG4gICAgc2hpcERpdi5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBzaGlwRGl2LmNsYXNzTGlzdC50b2dnbGUoXCJmbGV4LXRvZ2dsZVwiKTtcclxuICAgIH0pO1xyXG4gICAgc2hpcExpc3QuYXBwZW5kQ2hpbGQoc2hpcERpdik7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHBsYWNlSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29uc3QgcGxhY2VJbmZvU3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBwbGFjZUluZm8uY2xhc3NMaXN0LmFkZChcInBsYWNlLWluZm9cIik7XHJcbiAgcGxhY2VJbmZvU3AudGV4dENvbnRlbnQgPVxyXG4gICAgXCJEcmFnICYgZHJvcCB0aGUgc2hpcHMgb24gdGhlIGJvYXJkLiBEb3VibGVjbGljayBhIHNoaXAgdG8gcm90YXRlIGl0LlwiO1xyXG4gIHBsYWNlSW5mby5hcHBlbmRDaGlsZChwbGFjZUluZm9TcCk7XHJcbiAgbWFpbi5hcHBlbmRDaGlsZChvd25Cb2FyZCk7XHJcbiAgb3duQm9hcmQuYXBwZW5kQ2hpbGQob3duQm9hcmRUaXRsZSk7XHJcbiAgbWFpbi5hcHBlbmRDaGlsZChwbGFjZVNoaXBzKTtcclxuICBwbGFjZVNoaXBzLmFwcGVuZENoaWxkKHNoaXBzVGl0bGUpO1xyXG4gIHBsYWNlU2hpcHMuYXBwZW5kQ2hpbGQoc2hpcExpc3QpO1xyXG4gIHBsYWNlU2hpcHMuYXBwZW5kQ2hpbGQocGxhY2VJbmZvKTtcclxuXHJcbiAgZHJhd0dyaWQoKTtcclxufVxyXG5cclxuLy8gY2hlY2sgaWYgYWxsIHNoaXBzIHdlcmUgcGxhY2VkIG9uIHRoZSBib2FyZFxyXG5mdW5jdGlvbiBhcmVBbGxTaGlwc1BsYWNlZCgpIHtcclxuICBjb25zdCBwbGFjZVNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1zaGlwc1wiKTtcclxuICBjb25zdCBzaGlwTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcC1saXN0XCIpO1xyXG4gIGlmIChzaGlwTGlzdC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgY29uc3Qgc3RhcnRHYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHN0YXJ0R2FtZS50ZXh0Q29udGVudCA9IFwiU3RhcnQgZ2FtZVwiO1xyXG4gICAgc3RhcnRHYW1lLmNsYXNzTGlzdC5hZGQoXCJzdGFydC1nYW1lXCIpO1xyXG4gICAgc3RhcnRHYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGVja3BsYWNlZFNoaXBzKTtcclxuICAgIGNvbnN0IHBsYWNlSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2UtaW5mb1wiKTtcclxuICAgIGNvbnN0IHBsYWNlSW5mb1NwMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgcGxhY2VJbmZvU3AyLnRleHRDb250ZW50ID1cclxuICAgICAgXCJPbmNlIHlvdSdyZSBoYXBweSB3aXRoIHRoZSBwbGFjZW1lbnQgb2YgeW91ciBzaGlwcywgY2xpY2sgdGhlIHN0YXJ0IGJ1dHRvbiB0byBiZWdpbiB0aGUgZ2FtZSFcIjtcclxuICAgIHBsYWNlSW5mby5hcHBlbmRDaGlsZChzdGFydEdhbWUpO1xyXG4gICAgcGxhY2VJbmZvLmFwcGVuZENoaWxkKHBsYWNlSW5mb1NwMik7XHJcbiAgICBwbGFjZVNoaXBzLmFwcGVuZENoaWxkKHBsYWNlSW5mbyk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyArKysgY2hlY2sgaWYgYWxsIHNoaXBzIGFyZSBwbGFjZWQgY29ycmVjdGx5XHJcbmZ1bmN0aW9uIGNoZWNrcGxhY2VkU2hpcHMoKSB7XHJcbiAgcGxheUdhbWUoKTtcclxuICAvLy9cclxufVxyXG5cclxuLy8gcGxhY2Ugc2hpcHMgb24gdGhlIHBsYXllcidzIGJvYXJkXHJcbmZ1bmN0aW9uIHBsYWNlU2hpcHMoYm9hcmQpIHtcclxuICAvLyBnZXQgcGxhY2VkIHNoaXBzIGNvb3Jkc1xyXG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzIsIDMsIDQsIDVdO1xyXG4gIHNoaXBMZW5ndGhzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3RvLXBsYWNlLSR7aW5kZXh9YCk7XHJcbiAgICBjb25zdCBjb29yZFN0YXJ0ID0gc2hpcC5wYXJlbnROb2RlLmlkO1xyXG4gICAgY29vcmRTdGFydC5zcGxpdChcIlwiKTtcclxuICAgIGxldCBzdGFydFJvdyA9IHBhcnNlSW50KGNvb3JkU3RhcnRbMV0pO1xyXG4gICAgbGV0IHN0YXJ0Q29sdW1uID0gcGFyc2VJbnQoY29vcmRTdGFydFszXSk7XHJcbiAgICBsZXQgbGVuZ3RoID0gcGFyc2VJbnQoaXRlbSk7XHJcbiAgICBpZiAoc2hpcC5jbGFzc0xpc3QuY29udGFpbnMoXCJmbGV4LXRvZ2dsZVwiKSkge1xyXG4gICAgICAvLyBzaGlwIGlzIHZlcnRpY2FsXHJcbiAgICAgIGJvYXJkLnBsYWNlU2hpcChcclxuICAgICAgICBsZW5ndGgsXHJcbiAgICAgICAgW3N0YXJ0Um93LCBzdGFydENvbHVtbl0sXHJcbiAgICAgICAgW3N0YXJ0Um93LCBzdGFydENvbHVtbiArIGxlbmd0aCAtIDFdXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBzaGlwIGlzIGhvcml6b250YWxcclxuICAgICAgYm9hcmQucGxhY2VTaGlwKFxyXG4gICAgICAgIGxlbmd0aCxcclxuICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sdW1uXSxcclxuICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sdW1uICsgbGVuZ3RoIC0gMV1cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYW5QbGFjZURvbSgpIHtcclxuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xyXG4gIHdoaWxlIChtYWluLmZpcnN0Q2hpbGQpIHtcclxuICAgIG1haW4ucmVtb3ZlQ2hpbGQobWFpbi5maXJzdENoaWxkKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZURvbSwgcHJlcGFyZVNoaXBzLCBwbGFjZVNoaXBzLCBjbGVhblBsYWNlRG9tIH07XHJcbiIsIi8vIHBvc3NpYmxlU2NvcmUgZGVwZW5kcyBvbiB0aGUgb3ZlcmFsbCBuciBvZiBzaGlwcyBhbmQgdGhlaXIgbGVuZ3RoXHJcbi8vIGF2YWlsYWJsZSBzaGlwczpcclxuLy8gMXggNS1zcXVhcmVcclxuLy8gMXggNC1zcXVhcmVcclxuLy8gMnggMy1zcXVhcmVcclxuLy8gMnggMi1zcXVhcmVcclxuLy8gPSAxOSBwb3NzaWJsZSBzY29yZVxyXG5cclxuLy9pbXBvcnQgeyBpc051bWJlciB9IGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgcGxhY2VTaGlwcywgY2xlYW5QbGFjZURvbSB9IGZyb20gXCIuL2RvbS5qc1wiO1xyXG5cclxuY29uc3QgcG9zc2libGVTY29yZSA9IDE5O1xyXG5cclxuY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBpZCkge1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmhpdHMgPSAwO1xyXG4gICAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuaGl0cyArPSAxO1xyXG4gICAgdGhpcy5pc1N1bmsoKTtcclxuICB9XHJcblxyXG4gIGlzU3VuaygpIHtcclxuICAgIGlmICh0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3Iob3duZXIpIHtcclxuICAgIHRoaXMuZ3JpZCA9IHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xyXG4gICAgdGhpcy5zaGlwc0xpc3QgPSBbXTtcclxuICAgIHRoaXMucmVjZWl2ZWRIaXRzID0gMDtcclxuICAgIHRoaXMubG9zdEdhbWUgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hpcExlbmd0aHMgPSBbMiwgMywgNCwgNV07XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAobGVuZ3RoLCBjb29yZHNTdGFydCwgY29vcmRzRW5kKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuc2hpcHNMaXN0Lmxlbmd0aDtcclxuICAgIGNvbnN0IHBsYWNlZFNoaXAgPSBuZXcgU2hpcChsZW5ndGgsIGlkKTtcclxuICAgIC8vIGNvbnN0IHBsYWNlZFNoaXAgPSBuZXcgU2hpcChsZW5ndGgsIGNvb3Jkc1N0YXJ0LCBjb29yZHNFbmQpO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5ncmlkW2Nvb3Jkc1N0YXJ0WzBdXVtjb29yZHNTdGFydFsxXV0pO1xyXG4gICAgLy8gaWYgdGhlIHNoaXAncyBsZW5ndGggPiAyLCBtYXJrIHRoZSBvdGhlciBzcXVhcmVzIHRvb1xyXG5cclxuICAgIHRoaXMuc2hpcHNMaXN0LnB1c2gocGxhY2VkU2hpcCk7XHJcbiAgICBpZiAoY29vcmRzU3RhcnRbMF0gIT09IGNvb3Jkc0VuZFswXSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gY29vcmRzU3RhcnRbMF07IGkgPD0gY29vcmRzRW5kWzBdOyBpKyspIHtcclxuICAgICAgICB0aGlzLmdyaWRbaV1bY29vcmRzU3RhcnRbMV1dID0gaWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb29yZHNTdGFydFsxXSAhPT0gY29vcmRzRW5kWzFdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSBjb29yZHNTdGFydFsxXTsgaSA8PSBjb29yZHNFbmRbMV07IGkrKykge1xyXG4gICAgICAgIHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1baV0gPSBpZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZFtjb29yZHNTdGFydFswXV1bY29vcmRzU3RhcnRbMV1dID0gaWQ7XHJcbiAgICB0aGlzLmdyaWRbY29vcmRzRW5kWzBdXVtjb29yZHNFbmRbMV1dID0gaWQ7XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvb3Jkc1gsIGNvb3Jkc1kpIHtcclxuICAgIGxldCBpZCA9IHRoaXMuZ3JpZFtjb29yZHNYXVtjb29yZHNZXTtcclxuICAgIGlmIChpZCA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmdyaWRbY29vcmRzWF1bY29vcmRzWV0gPSBcIm1pc3NcIjtcclxuICAgIH0gZWxzZSBpZiAoaWQgPT09IFwibWlzc1wiIHx8IGlkID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHJldHVybiBcImludmFsaWQgbW92ZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGhpdFNoaXAgPSB0aGlzLnNoaXBzTGlzdFtpZF07XHJcbiAgICAgIHRoaXMuZ3JpZFtjb29yZHNYXVtjb29yZHNZXSA9IFwiaGl0XCI7XHJcbiAgICAgIGhpdFNoaXAuaGl0KCk7XHJcbiAgICAgIHRoaXMucmVjZWl2ZWRIaXRzICs9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja0lmTG9zdCgpIHtcclxuICAgIGlmICh0aGlzLnJlY2VpdmVkSGl0cyA+PSBwb3NzaWJsZVNjb3JlKSB7XHJcbiAgICAgIHRoaXMubG9zdEdhbWUgPSB0cnVlO1xyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVHcmlkKCkge1xyXG4gICAgbGV0IGdyaWRBcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCAxMDsgeSsrKSB7XHJcbiAgICAgIGdyaWRBcnJheS5wdXNoKFtdKTtcclxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XHJcbiAgICAgICAgZ3JpZEFycmF5W3ldLnB1c2gobnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBncmlkQXJyYXk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZU5ld0Nvb3JkcyhzaGlwTGVuZ3RoKSB7XHJcbiAgICBjb25zdCBzdGFydFJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIGNvbnN0IHN0YXJ0Q29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgY29uc3QgZW5kUm93ID0gc3RhcnRSb3cgKyBwYXJzZUludChzaGlwTGVuZ3RoKSAtIDE7XHJcbiAgICBjb25zdCBlbmRDb2wgPSBzdGFydENvbCArIHBhcnNlSW50KHNoaXBMZW5ndGgpIC0gMTtcclxuXHJcbiAgICBpZiAoZW5kUm93IDwgMTAgJiYgZW5kQ29sIDwgMTApIHtcclxuICAgICAgLy9yYW5kb21pemUgLSBob3Jpem9udGFsIG9yIHZlcnRpY2FsXHJcbiAgICAgIGxldCBjaGFuY2UgPSBNYXRoLnJhbmRvbSgpICogMTtcclxuICAgICAgaWYgKGNoYW5jZSA8IDAuNSkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgICAgIFtzdGFydFJvdywgZW5kQ29sXSxcclxuICAgICAgICBdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICBbc3RhcnRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgICAgIFtlbmRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgICBdO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGVuZENvbCA8IDEwKSB7XHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgW3N0YXJ0Um93LCBzdGFydENvbF0sXHJcbiAgICAgICAgW3N0YXJ0Um93LCBlbmRDb2xdLFxyXG4gICAgICBdO1xyXG4gICAgfSBlbHNlIGlmIChlbmRSb3cgPCAxMCkge1xyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgIFtzdGFydFJvdywgc3RhcnRDb2xdLFxyXG4gICAgICAgIFtlbmRSb3csIHN0YXJ0Q29sXSxcclxuICAgICAgXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTmV3Q29vcmRzKHNoaXBMZW5ndGgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmFuZG9taXplUGxhY2VtZW50KCkge1xyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuc2hpcExlbmd0aHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgY29uc3Qgc2hpcEwgPSBwYXJzZUludCh0aGlzLnNoaXBMZW5ndGhzW2ldKTtcclxuICAgICAgbGV0IGNvb3JkcyA9IHRoaXMuZ2VuQ29vKHNoaXBMKTtcclxuICAgICAgdGhpcy5wbGFjZVNoaXAoXHJcbiAgICAgICAgc2hpcEwsXHJcbiAgICAgICAgW2Nvb3Jkc1swXVswXSwgY29vcmRzWzBdWzFdXSxcclxuICAgICAgICBbY29vcmRzWzFdWzBdLCBjb29yZHNbMV1bMV1dXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZW5Db28oc2hpcExlbmd0aCkge1xyXG4gICAgbGV0IGNvb3JkcyA9IHRoaXMuZ2VuZXJhdGVOZXdDb29yZHMocGFyc2VJbnQoc2hpcExlbmd0aCkpO1xyXG4gICAgbGV0IGZ1bGxDb29yZHMgPSB0aGlzLmdldEZ1bGxDb29yZHMoY29vcmRzKTtcclxuICAgIGxldCBjb29yZENoZWNrID0gdGhpcy5jaGVja0lmT2NjdXBpZWQoZnVsbENvb3Jkcyk7XHJcbiAgICBpZiAoY29vcmRDaGVjayA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIGNvb3JkcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdlbkNvbyhwYXJzZUludChzaGlwTGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRGdWxsQ29vcmRzKGNvb3Jkcykge1xyXG4gICAgbGV0IHJvd1N0YXJ0ID0gcGFyc2VJbnQoY29vcmRzWzBdWzBdKTtcclxuICAgIGxldCBjb2xTdGFydCA9IHBhcnNlSW50KGNvb3Jkc1swXVsxXSk7XHJcbiAgICBsZXQgcm93RW5kID0gcGFyc2VJbnQoY29vcmRzWzFdWzBdKTtcclxuICAgIGxldCBjb2xFbmQgPSBwYXJzZUludChjb29yZHNbMV1bMV0pO1xyXG5cclxuICAgIGxldCBmdWxsQ29vcmRpbmF0ZXMgPSBbXTtcclxuICAgIGlmIChyb3dTdGFydCAhPT0gcm93RW5kKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSByb3dTdGFydDsgaSA8PSByb3dFbmQ7IGkrKykge1xyXG4gICAgICAgIGZ1bGxDb29yZGluYXRlcy5wdXNoKFtpLCBjb2xTdGFydF0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY29sU3RhcnQgIT09IGNvbEVuZCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gY29sU3RhcnQ7IGkgPD0gY29sRW5kOyBpKyspIHtcclxuICAgICAgICBmdWxsQ29vcmRpbmF0ZXMucHVzaChbcm93U3RhcnQsIGldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gY29uc29sZS5sb2coZnVsbENvb3JkaW5hdGVzKTtcclxuICAgIHJldHVybiBmdWxsQ29vcmRpbmF0ZXM7XHJcbiAgfVxyXG5cclxuICAvLyBjaGVjayBpZiBhIHNxdWFyZSBvbiB0aGUgYm9hcmQgaXMgYWxyZWFkeSBvY2N1cGllZFxyXG4gIGNoZWNrSWZPY2N1cGllZChmdWxsQ29vcmRpbmF0ZXMpIHtcclxuICAgIGNvbnNvbGUubG9nKGZ1bGxDb29yZGluYXRlcyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZ1bGxDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgY29vcmQgPSBmdWxsQ29vcmRpbmF0ZXNbaV07XHJcbiAgICAgIGlmICh0aGlzLmdyaWRbcGFyc2VJbnQoY29vcmRbMF0pXVtwYXJzZUludChjb29yZFsxXSldICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjaGVjayAtIG9jY3VwaWVkXCIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhcInVub2NjdXBpZWRcIik7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBkcmF3R3JpZCgpIHtcclxuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIik7XHJcbiAgICBjb25zdCBhcnJheSA9IHRoaXMuZ3JpZDtcclxuICAgIC8vIGNvbnNvbGUubG9nKGFycmF5KTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICBhcnJheS5mb3JFYWNoKChyb3csIHJpbmRleCkgPT4ge1xyXG4gICAgICByb3cuZm9yRWFjaCgoY29sdW1uLCBjaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcclxuICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHIke3JpbmRleH1jJHtjaW5kZXh9YCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb2x1bW4gPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coY29sdW1uKTtcclxuICAgICAgICAgIGlmICh0aGlzLm93bmVyID09PSBcImh1bWFuXCIpIHtcclxuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJvd24tc2hpcFwiKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZW5lbXktc2hpcFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbHVtbiA9PT0gXCJoaXRcIikge1xyXG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLm93bmVyID09PSBcImh1bWFuXCIpIHtcclxuICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1vd25cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBncmlkLmNsYXNzTGlzdC5hZGQoXCJncmlkLWVuZW15XCIpO1xyXG4gICAgfVxyXG4gICAgZ3JpZC5jbGFzc0xpc3QuYWRkKFwiZ3JpZFwiKTtcclxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZ3JpZCk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG93bmVyKSB7XHJcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5R2FtZSgpIHtcclxuICBjb25zdCBwbGF5ZXJBID0gbmV3IFBsYXllcihcImh1bWFuXCIpO1xyXG4gIGNvbnN0IHBsYXllckIgPSBuZXcgUGxheWVyKFwiQUlcIik7XHJcbiAgY29uc3QgYm9hcmRBID0gbmV3IEdhbWVib2FyZChcImh1bWFuXCIpO1xyXG4gIGNvbnN0IGJvYXJkQiA9IG5ldyBHYW1lYm9hcmQoXCJBSVwiKTtcclxuICBwbGFjZVNoaXBzKGJvYXJkQSk7XHJcbiAgLy8gY29uc29sZS5sb2coYm9hcmRBLmdyaWQpO1xyXG5cclxuICBjbGVhblBsYWNlRG9tKCk7XHJcblxyXG4gIGJvYXJkQS5kcmF3R3JpZCgpO1xyXG5cclxuICBib2FyZEIucmFuZG9taXplUGxhY2VtZW50KCk7XHJcbiAgYm9hcmRCLmRyYXdHcmlkKCk7XHJcbiAgY29uc29sZS5sb2coYm9hcmRCLmdyaWQpO1xyXG59XHJcblxyXG5leHBvcnQgeyBTaGlwLCBHYW1lYm9hcmQsIFBsYXllciwgcGxheUdhbWUgfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVEb20sIHByZXBhcmVTaGlwcywgY2xlYW5QbGFjZURvbSB9IGZyb20gXCIuL2RvbS5qc1wiO1xyXG5pbXBvcnQgeyBQbGF5ZXIsIEdhbWVib2FyZCwgcGxheUdhbWUgfSBmcm9tIFwiLi9nYW1lLmpzXCI7XHJcbi8vaW1wb3J0IGltZ3NyYyBmcm9tIFwiLi9pbWdfbG9nby5naWZcIjtcclxuLy9pbXBvcnQgY3NzIGZyb20gXCIuL3N0eWxlLmNzc1wiO1xyXG5cclxuY3JlYXRlRG9tKCk7XHJcbnByZXBhcmVTaGlwcygpO1xyXG5cclxuLy9cclxuY2xlYW5QbGFjZURvbSgpO1xyXG5cclxuY29uc3QgcGxheWVyQiA9IG5ldyBQbGF5ZXIoXCJBSVwiKTtcclxuICBjb25zdCBib2FyZEIgPSBuZXcgR2FtZWJvYXJkKFwiQUlcIik7XHJcbiAgYm9hcmRCLnJhbmRvbWl6ZVBsYWNlbWVudCgpO1xyXG5cclxuICBib2FyZEIuZHJhd0dyaWQoKTtcclxuIl0sIm5hbWVzIjpbIkdhbWVib2FyZCIsIlBsYXllciIsInBsYXlHYW1lIiwiYWxsb3dEcm9wIiwiZXYiLCJwcmV2ZW50RGVmYXVsdCIsImRyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwidGFyZ2V0IiwiaWQiLCJkcm9wIiwiZGF0YSIsImdldERhdGEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJkcmFnRW5kIiwiYXJlQWxsU2hpcHNQbGFjZWQiLCJjcmVhdGVHcmlkIiwiZ3JpZEFycmF5IiwieCIsInB1c2giLCJ5IiwiZHJhd0dyaWQiLCJvd25Cb2FyZCIsInF1ZXJ5U2VsZWN0b3IiLCJhcnJheSIsImJvZHkiLCJncmlkIiwiY3JlYXRlRWxlbWVudCIsImZvckVhY2giLCJyb3ciLCJyaW5kZXgiLCJjZWxsIiwiY2luZGV4Iiwic3F1YXJlIiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNyZWF0ZURvbSIsImhlYWRlciIsIm1haW4iLCJmb290ZXIiLCJ0aXRsZSIsInRleHRDb250ZW50IiwicHJlcGFyZVNoaXBzIiwib3duQm9hcmRUaXRsZSIsInBsYWNlU2hpcHMiLCJzaGlwc1RpdGxlIiwic2hpcExpc3QiLCJzaGlwTGVuZ3RocyIsIml0ZW0iLCJpbmRleCIsInNoaXBEaXYiLCJpIiwic2hpcFNxIiwidG9nZ2xlIiwicGxhY2VJbmZvIiwicGxhY2VJbmZvU3AiLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwic3RhcnRHYW1lIiwiY2hlY2twbGFjZWRTaGlwcyIsInBsYWNlSW5mb1NwMiIsImJvYXJkIiwic2hpcCIsImNvb3JkU3RhcnQiLCJwYXJlbnROb2RlIiwic3BsaXQiLCJzdGFydFJvdyIsInBhcnNlSW50Iiwic3RhcnRDb2x1bW4iLCJjb250YWlucyIsInBsYWNlU2hpcCIsImNsZWFuUGxhY2VEb20iLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJwb3NzaWJsZVNjb3JlIiwiU2hpcCIsImNvbnN0cnVjdG9yIiwiaGl0cyIsImRlc3Ryb3llZCIsImhpdCIsImlzU3VuayIsIm93bmVyIiwic2hpcHNMaXN0IiwicmVjZWl2ZWRIaXRzIiwibG9zdEdhbWUiLCJjb29yZHNTdGFydCIsImNvb3Jkc0VuZCIsInBsYWNlZFNoaXAiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmRzWCIsImNvb3Jkc1kiLCJoaXRTaGlwIiwiY2hlY2tJZkxvc3QiLCJnZW5lcmF0ZU5ld0Nvb3JkcyIsInNoaXBMZW5ndGgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzdGFydENvbCIsImVuZFJvdyIsImVuZENvbCIsImNoYW5jZSIsInJhbmRvbWl6ZVBsYWNlbWVudCIsInNoaXBMIiwiY29vcmRzIiwiZ2VuQ29vIiwiY29uc29sZSIsImxvZyIsImZ1bGxDb29yZHMiLCJnZXRGdWxsQ29vcmRzIiwiY29vcmRDaGVjayIsImNoZWNrSWZPY2N1cGllZCIsInJvd1N0YXJ0IiwiY29sU3RhcnQiLCJyb3dFbmQiLCJjb2xFbmQiLCJmdWxsQ29vcmRpbmF0ZXMiLCJjb29yZCIsImNvbHVtbiIsInBsYXllckEiLCJwbGF5ZXJCIiwiYm9hcmRBIiwiYm9hcmRCIl0sInNvdXJjZVJvb3QiOiIifQ==