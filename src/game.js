import { placeShips, cleanPlaceDom, placementError } from "./dom.js";

let currentPlayer = null;
const boards = {
  human: null,
  AI: null,
  prep: null
}

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
      square = document.querySelector(
        `.enemy-square#r${coords[0]}c${coords[1]}`
      );
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
      this.checkIfLost();
    }

    console.log("owner: " + this.owner, "hits: " + this.receivedHits);
    //console.log(this.grid);
    //if it's AI's turn now, send an attack
    if (currentPlayer === "AI") {
      boards.human.AIattack();
    }
    // console.log(this.grid);
  }

  playerAttack(coords) {
    // if it's not the player's turn, clicking on enemy board will do nothing
    if (currentPlayer === "human") {
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
    if (currentPlayer === "human") {
      boards.AI.receiveAttack(coords);
    }
    return;
  }

  checkIfLost() {
    const possibleScore = this.shipLengths.reduce((previous, current, initial) => previous + current, 0);
    if (this.receivedHits >= possibleScore) {
      this.lostGame = true;
      console.log("game lost: " + this.owner);
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
      this.placeShip(
        shipL,
        [coords[0][0], coords[0][1]],
        [coords[1][0], coords[1][1]]
      );
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
        return [
          [startRow, startCol],
          [startRow, endCol],
        ];
      } else {
        return [
          [startRow, startCol],
          [endRow, startCol],
        ];
      }
    } else if (endCol < 10) {
      return [
        [startRow, startCol],
        [startRow, endCol],
      ];
    } else if (endRow < 10) {
      return [
        [startRow, startCol],
        [endRow, startCol],
      ];
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
      console.log("preppy");
      grid.classList.add("grid-prep");
      const prepBoard = document.querySelector(".prep-board");
      prepBoard.appendChild(grid);
    }
    
    grid.classList.add("grid");
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

  let checkPlaced = placeShips(boardA);
  if (checkPlaced === true) {
    // console.log("truee");
    return placementError();
  }
  cleanPlaceDom();
  boardA.drawGrid();
  boardB.getRandomPlacement();
  boardB.drawGrid();
  // console.log(boardB.grid);
  currentPlayer = "human";
}

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
}

function AImove() {
  boardA.AIattack();
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

export { Ship, Gameboard, Player, playGame, playTestGame, boards };
