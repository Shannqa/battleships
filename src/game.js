class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.destroyed = false;
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
  constructor() {
    this.grid = this.createGrid();
    //receivedHits = 0;
  }

  placeShip(length, coordsStart, coordsEnd) {
    const placedShip = new Ship(length);
    console.log(this.grid[coordsStart[0]][coordsStart[1]]);
    // if the ship's length > 2, mark the other squares too
    if (coordsStart[0] !== coordsEnd[0]) {
      for (let i = coordsStart[0]; i <= coordsEnd[0]; i++) {
        this.grid[i][coordsStart[1]] = "ship";
      }
    }
    if (coordsStart[1] !== coordsEnd[1]) {
      for (let i = coordsStart[1]; i <= coordsEnd[1]; i++) {
        this.grid[i][coordsStart[1]] = "ship";
      }
    }

    this.grid[coordsStart[0]][coordsStart[1]] = "ship";
    this.grid[coordsEnd[0]][coordsEnd[1]] = "ship";
  }

  receiveAttack(coordsX, coordsY) {
    if (this.grid[coordsX][coordsY] === "ship") {
      this.grid[coordsX][coordsY] = "hit";
      placedShip.hit();
    } else if (this.grid[coordsX][coordsY] === null) {
      this.grid[coordsX][coordsY] = "miss";
    }
  }

  // checkIfLost() {
  //   if (this.receivedHits >= possibleScore) {
  //     lost
  //   }
  // }
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
}

const board = new Gameboard();
board.createGrid();
board.placeShip(3, [1, 3], [3, 3]);
console.log(board.grid);

export { Ship, Gameboard };
