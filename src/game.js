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
    receivedHits = 0;
  }
  
  placeShip(length, coordsX, coordsY) {
    const placedShip = new Ship(length);
    this.grid[coordsX][coordsY] = "ship";
  }
  
  receiveAttack(coordsX, coordsY) {
    if (this.grid[coordsX][coordsY] === "ship") {
      this.grid[coordsX][coordsY] = "hit";
      placedShip.hit();
    } else if (this.grid[coordsX][coordsY] === null) {
      this.grid[coordsX][coordsY] = "miss";
    }
  }
  checkIfLost() {
    if (this.receivedHits >= possibleScore) {
      //lost
    }
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
}

export { Ship };

const board = new Gameboard;
board.createGrid();
console.log(board.grid);