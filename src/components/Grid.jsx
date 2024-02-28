import React, { useState } from "react";

function Grid({ owner, board, grid, setter }) {
  let gridArray = grid;
  // handle clicks on the enemy (AI) board
  function clickHandler() {

  }

  /* Drag and drop */
  function onDragOver(ev) {
    ev.preventDefault();
    // set a class on a cell that's hovered over when dragging the ship to the board
    ev.target.classList.add("dragover-ship");
    // console.log(ev.target.dataset.column);

  }
  function onDragLeave(ev) {
    ev.preventDefault();
    removeClass();
  }

  function removeClass() {
    // if any cell has the class, remove it when dragover event ends
    const hoveredCells = document.querySelectorAll(".dragover-ship");
    if (hoveredCells) {
      for (let cell of hoveredCells) {
        cell.classList.remove("dragover-ship");
      }
    }
  }

  function drop(ev) {
    // catch an error happening if the user tries to drag and drop the ship in a wrong place, e.g. in the middle of multiple squares
    try {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text"); // id
      const draggedShip = document.querySelector(`#${data}`);
      const shipSize = parseInt(data.slice(-1));
      const targetColumn = parseInt(ev.target.dataset.column);
      const targetRow = parseInt(ev.target.dataset.row);

      if (draggedShip.classList.contains("flex-toggle")) {
        // ship is horizontal
        if (shipSize + targetRow > 10) {
          removeClass();
          return;
        }        
      } else {
        // ship is vertical
        if (shipSize + targetColumn > 10) {
          removeClass();
          return;
        }
      }

      // if the ship would be placed outside of the grid

      console.log(data);
      document.getElementById(data).classList.add("ship-on-board");
      ev.target.appendChild(document.getElementById(data));
    } catch {
      console.log("error - drag&drop");
      removeClass();
      return;
    }
  }
  
  function checkIfTaken() {

  }
  return(
    <div className="board">
      {gridArray.map((row, rindex) => (
        row.map((column, cindex) => (<div className="cell" data-row={rindex} data-column={cindex} key={rindex + "-" + cindex} onClick={owner === "AI" ? clickHandler : null} onDrop={drop} onDragOver={onDragOver} onDragLeave={onDragLeave}></div>))
      ))}
    
    </div>
  )
}

export default Grid
  
  /*
  import React, { useState } from "react"

const gridSize = 10;

function Grid() {
  const [gridArray, setGridArray] = useState(() => {
    let grid = [];
    for (let y = 0; y < gridSize; y++) {
      grid.push([]);
      for (let x = 0; x < gridSize; x++) {
        grid[y].push(null);
      }
    }
    return grid;
  });
  
  
  const handleClick = (rindex, cindex) => {
    setGridArray(gridArray.map((row, rowIndex) => {
      if (rowIndex === rindex) {
        console.log(gridArray[rowIndex]);
        row.map((column, colIndex) => {
          if (colIndex === cindex) {
            row[colIndex] = "b"
            console.log(row[colIndex]);
            return column;
        }})
      }
      
      return row;
    }))
  }
  
  // or
  gridArray.map((item) => {
    if (gridArray[rindex][cindex] 
  })
  
  const handleExperienceData = (id, e) => {
    setter(data.map(section => {
      console.log(section);
      return section.map((item) => { // remember to return in nested arrays!
        console.log(item);
        if (item.id === id) {
          return {
            ...item,
            value: e.target.value,
          };
        } else {
          return item;
        }
      })
    }))
  }
  
  console.log(gridArray);
  return(
    <div className="board">
      {gridArray.map((row, rindex) => (
      row.map((column, cindex) => (
        <div className="cell" data-row={rindex} data-column= {cindex} key={rindex-cindex} onClick={() => handleClick(rindex, cindex)}>{column}</div>
      
      ))))
      }
    
    </div>
    )
}
  
export default Grid
  
  
  
{
drawGrid() {
    const main = document.querySelector(".main");
    const array = this.grid;
    const body = document.querySelector("body");
    const prepBoardDiv = document.querySelector("div.prep-board-div");
    const boardContainer = document.createElement("div");
    const boardTitle = document.createElement("div");
    boardContainer.classList.add("board-container");
    boardTitle.classList.add("board-title")
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
      boardTitle.textContent = "Your fleet";
      boardContainer.appendChild(boardTitle);
      boardContainer.appendChild(grid);
    } else if (this.owner === "AI") {
      grid.classList.add("grid-enemy");
      boardTitle.textContent = "Enemy fleet";
      boardContainer.appendChild(boardTitle);
      boardContainer.appendChild(grid);
    } else if (this.owner === "prepare") {
      grid.classList.add("grid-prep");
      boardTitle.textContent = "Place your ships";
      boardContainer.appendChild(boardTitle);
      boardContainer.appendChild(grid);
      prepBoardDiv.appendChild(grid);
    }
    grid.classList.add("grid");
    main.appendChild(boardContainer);
  }
}




function Board(props) {
  
  const [stage, setStage] = useState("prep");
  
  const boardHuman = {
    owner: "human",
    grid: createGrid(),
    shipList: [],
    receivedHits: 0,
    lostGame: false,
    aiQueue: [],
    aiHits: []
  }
  
  const boardAI = {
    owner: "AI",
    shipList: [],
    receivedHits: 0,
    lostGame: false,
    aiQueue: [],
    aiHits: []
  }
  
  const boardPrep = {
    owner: "prep",
    shipList: [],
    receivedHits: 0,
    lostGame: false,
    aiQueue: [],
    aiHits: []
  }
  
  const [humanBoard, setHumanBoard] = useState(boardHuman);
  const [aiBoard, setAiBoard] = useState(boardAI);
  const [prepBoard, setPrepBoard] = useState(boardPrep);


props.stage === "prep"

return(
  <div className="board">
    div
  </div>
  
  
  )
}

export default Board */