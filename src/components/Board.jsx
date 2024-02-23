import React, { useState } from "react";

const gridSize = 10;

function createGrid() {
  let gridArray = [];
    for (let y = 0; y < gridSize; y++) {
      gridArray.push([]);
      for (let x = 0; x < gridSize; x++) {
        gridArray[y].push(null);
      }
    }
  return gridArray;
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

export default Board