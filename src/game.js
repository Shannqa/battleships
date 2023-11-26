// possibleScore depends on the overall nr of ships and their length
// available ships:
// 1x 5-square
// 1x 4-square
// 2x 3-square
// 2x 2-square
// = 19 possible score

//import { isNumber } from "lodash";
import { placeShips, cleanPlaceDom } from "./dom.js";

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
    for (let y = 0; y < 10; y++) {
      gridArray.push([]);
      for (let x = 0; x < 10; x++) {
        gridArray[y].push(null);
      }
    }
    return gridArray;
  }

  randomizePlacement() {
    const shipLengths = [2, 3, 4, 5];
    let grrr = this.grid;
    let putShip = this.placeShip;
    let list = this.shipsList;
    // this.placeShip();

    // recursive function to geenerate coordinates of AI's ships
    // here ships may overlap

    //something's wrong - start and end coords are the same!
    function generateCoords(shipLength) {
      const shipLengthInt = parseInt(shipLength);
      const startRow = Math.floor(Math.random() * 10);
      const startCol = Math.floor(Math.random() * 10);
      const endRow = startRow + shipLength - 1;
      const endCol = startCol + shipLength - 1;
      let endCoord;
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
        return generateCoords(shipLength);
      }
    }

    for (let i = shipLengths.length - 1; i >= 0; i--) {
      const length = parseInt(shipLengths[i]);
      let coords = generateCoords(length);
      let fullCoords = getFullCoords(coords);
      //if a square is already occupied, generate new coords
      while (this.checkIfOccupied(fullCoords) === true) {
        coords = generateCoords(length);
        fullCoords = getFullCoords(coords);
      }

      this.placeShip(
        length,
        [coords[0][0], coords[0][1]],
        [coords[1][0], coords[1][1]]
      );

      // console.log(
      //   length,
      //   [coords[0][0], coords[0][1]],
      //   [coords[1][0], coords[1][1]]
      // );
      // console.log(this.grid);
    }

    // function checkCoordsOnBoard(coords, length) {
    //   putShip(
    //     length,
    //     [coords[0][0], coords[0][1]],
    //     [coords[1][0], coords[1][1]]
    //   );
    //   console.log(
    //     length,
    //     [coords[0][0], coords[0][1]],
    //     [coords[1][0], coords[1][1]]
    //   );
    //   console.log(list.length);
    //   console.log(grrr);
    // }

    //check if proposed ship's coordinates are not already occupied on the grid
    // get full coordinates of a proposed ship
    function getFullCoords(coords) {
      let rowStart = coords[0][0];
      let colStart = coords[0][1];
      let rowEnd = coords[1][0];
      let colEnd = coords[1][1];

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
  }

  // check if a square on the board is already occupied
  checkIfOccupied(fullCoordinates) {
    fullCoordinates.forEach((coord) => {
      if (this.grid[coord[0]][coord[1]] !== null) {
        console.log("check - occupied");
        return true;
      }
      return false;
    });
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
  placeShips(boardA);
  // console.log(boardA.grid);

  cleanPlaceDom();

  boardA.drawGrid();

  boardB.randomizePlacement();
  boardB.drawGrid();
  console.log(boardB.grid);
}

export { Ship, Gameboard, Player, playGame };
