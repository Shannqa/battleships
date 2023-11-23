import { createDom } from "./dom.js";
import { playGame } from "./game.js";
import imgsrc from "./img_logo.gif";
import css from "./style.css";

createDom();
// playGame();

const body = document.querySelector("body");
const main = document.querySelector(".main");

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function createGrid() {
  let gridArray = [];
  for (let x = 0; x < 10; x++) {
    gridArray.push([]);
    for (let y = 0; y < 10; y++) {
      gridArray[x].push(null);
    }
  }
  return gridArray;
}

function drawGrid() {
  const ownBoard = document.querySelector(".own-board");
  const array = createGrid();

  const body = document.querySelector("body");
  const grid = document.createElement("div");

  array.forEach((row, rindex) => {
    row.forEach((cell, cindex) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", `r${rindex}c${cindex}`);
      if (cell === "ship") {
        square.classList.add("ship");
      }
      if (cell === "miss") {
        square.classList.add("miss");
      }
      if (cell === "hit") {
        square.classList.add("hit");
      }
      square.addEventListener("drop", drop);
      square.addEventListener("dragover", allowDrop);
      grid.appendChild(square);
    });
  });

  grid.classList.add("grid");
  ownBoard.appendChild(grid);
}

drawGrid();

const placeShips = document.querySelector(".place-ships");
const shipList = document.createElement("div");
const shipLengths = [2, 3, 4, 5];
shipLengths.forEach((item) => {
  const shipDiv = document.createElement("div");
  shipDiv.classList.add("ship-div");
  for (let i = 0; i < item; i++) {
    const shipSq = document.createElement("div");
    shipSq.classList.add("square");
    shipSq.classList.add("shipsq");
    shipDiv.appendChild(shipSq);
  }
  shipList.appendChild(shipDiv);
});
placeShips.appendChild(shipList);

// const shipSq = document.createElement("div");
// const shipSq1 = document.createElement("div");
// shipSq.classList.add("square");
// shipSq1.classList.add("square");
// shipSq.classList.add("shipsq");
// shipSq1.classList.add("shipsq");
// ship1.classList.add("ship");
// placeShips.appendChild(ship1);
// ship1.appendChild(shipSq);
// ship1.appendChild(shipSq1);

// ship1.setAttribute("draggable", "true");
// ship1.setAttribute("id", "ship1");
// ship1.addEventListener("dragstart", drag);
