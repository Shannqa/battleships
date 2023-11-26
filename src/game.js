import { placeShips, cleanPlaceDom, placementError } from "./dom.js";

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

  let checkPlaced = placeShips(boardA);
  if (checkPlaced === true) {
    console.log("truee");
    return placementError();
  }
  cleanPlaceDom();
  boardA.drawGrid();
  boardB.getRandomPlacement();
  boardB.drawGrid();
  console.log(boardB.grid);
}

export { Ship, Gameboard, Player, playGame };