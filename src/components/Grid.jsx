import React, { useState } from "react";

const gridSize = 10;

function Grid() {
  let gridArray = [];
  
  for (let y = 0; y < gridSize; y++) {
    gridArray.push([]);
    for (let x = 0; x < gridSize; x++) {
      gridArray[y].push(null);
    }
  }
  
  return(
    <div className="board">
      {gridArray.map((row, rindex) => (
        row.map((column, cindex) => (<div className="cell" data-row={rindex} data-column={cindex} key={rindex + "-" + cindex}></div>))
      ))}
    
    </div>
  )
}

export default Grid
  
{/* 
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

export default Board */}