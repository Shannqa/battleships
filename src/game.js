class Ship {
  #msg = "hello world";
  #id = Math.floor(Math.random() * 100);

  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.destroyed = false;
  }
  
  get shipID() {
    return this.#id;
  }
  get msg() {
    return this.#msg;
  }
  set #amsg(x) {
    this.#msg = `hello ${x}`;
  }
  
  set id(x) {
    this.id = "x";
  }
  
  get id() {
    return id;
  }
  
  hit() {
    this.hits += 1;
    this.isSunk();
    this.#amsg = "lala";
    //private setter works inside the class, doesnt outside or it

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

class Player {
  constructor(owner) {
    this.owner = owner;
  }

  prepareGameboard(owner) {
    const board = new Gameboard(owner);
  }  
  
}


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


export { Ship, Gameboard, Player };
