import getFullCoords from "../helpers/getFullCoords.js";

/* Drag and drop functions, used for placing ships on the board */

function dragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }
  
function dragEnd() {
  //areAllShipsPlaced();
}
  
function onDragOver(ev) {
  // style cell that's being hovered over
  ev.preventDefault();
  ev.target.classList.add("dragover-ship");
}

function removeHoverClass() {
  // remove styling of cell(s) that are being hovered over once the event ends
  const hoveredCells = document.querySelectorAll(".dragover-ship");
    if (hoveredCells) {
      for (let cell of hoveredCells) {
        cell.classList.remove("dragover-ship");
      }
    }
  }

function onDragLeave(ev) {
  ev.preventDefault();
  removeHoverClass();
}

function drop(ev) {
  // catch an error happening if the user tries to drag and drop the ship in a wrong place, e.g. in the middle of multiple squares
  try {
    ev.preventDefault();
    const shipID = ev.dataTransfer.getData("text");
    const draggedShip = document.querySelector(`#${shipID}`);
    const shipSize = parseInt(shipID.slice(-1));
    const targetX = parseInt(ev.target.dataset.column); // horizontal
    const targetY = parseInt(ev.target.dataset.row); // vertical
    const direction = draggedShip.classList.contains("flex-toggle") ? "vertical" : "horizontal";
    const fullCoords = getFullCoords([targetX, targetY], shipSize, direction);
      // to add: need to list full coords when direction is toggled while on the board!
      
    // if the ship would be placed outside of the grid
    if ((direction === "horizontal" && shipSize + targetX > 10) || 
      (direction === "vertical" && shipSize + targetY > 10)) {
      removeClass();
      return;
    } else if () {
      
    }
    draggedShip.classList.add("ship-on-board");
    ev.target.appendChild(draggedShip);
    
  } catch {
    console.error("error - drag&drop");
    removeClass();
    return;
  }
}

function checkPlacement() {
  
}

function addToBoard(fullCoords, id, grid, gridSetter) {
  // add a single ship cell to the board
  const [x, y] = coord;
  const newGrid;
  gridSetter(grid.map((column, colIndex) => {
    if (colIndex === y) {
      column.map((row, rowIndex) => {
        if (rowIndex === x) {
          row = id;
        }
      })
    }
  }));
}


function doubleClick(ev) {
  ev.currentTarget.classList.toggle("flex-toggle");
}

/*
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
  
  // check if any square of the new ship is already occupied; if so, send info to previous functions to generate new ship coordinates instead
  checkIfOccupied(fullCoordinates) {
    // console.log(fullCoordinates);
    for (let i = 0; i < fullCoordinates.length; i++) {
      let [x, y] = fullCoordinates[i];
      x = parseInt(x);
      y = parseInt(y);
      
      if (this.grid[x][y] !== null) {
        // square is occupied
        return true;
      }
      
      // check if any surrounding squares are occupied - if so, generate new coords. ships shouldnt be too close to each other
      let closeSq = [
        [x - 1, y - 1],
        [x - 1, y + 1],
        [x + 1, y - 1], 
        [x + 1, y + 1]
      ].filter((item) => {
        return item[0] >= 0 && item[0] <= 9 && item[1] >= 0 && item[1] <= 9;
      });
      
      for (let j = 0; j < closeSq.length; j++) {
        if (typeof this.grid[closeSq[j][0]][closeSq[j][1]] === "number" && this.grid[closeSq[j][0]][closeSq[j][1]] !== this.grid[x][y]) {
          // if any of the neighboring squares contain ships and their id is not the same as the currently considered ship's id, return and try with new coords
          return true;
        }
      } 
    }
    return false;
  }
  */