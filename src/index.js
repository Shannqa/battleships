import { createDom } from "./dom.js";
import { playGame } from "./game.js";
import imgsrc from "./img_logo.gif";
import css from "./style.css";

createDom();
// playGame();

const body = document.querySelector("body");
const main = document.querySelector(".main");

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
  body.appendChild(grid);
}

drawGrid();

const ship1 = document.createElement("div");
const shipSq = document.createElement("div");
const shipSq1 = document.createElement("div");
shipSq.classList.add("square");
shipSq1.classList.add("square");
shipSq.classList.add("shipsq");
shipSq1.classList.add("shipsq");
ship1.classList.add("ship");
body.appendChild(ship1);
ship1.appendChild(shipSq);
ship1.appendChild(shipSq1);

ship1.setAttribute("draggable", "true");
ship1.setAttribute("id", "ship1");
ship1.addEventListener("dragstart", drag);

/////////// tests
const div1 = document.createElement("div");
const img = new Image();
img.src = imgsrc;

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

div1.setAttribute("id", "div1");
div1.addEventListener("drop", drop);
div1.addEventListener("dragover", allowDrop);
img.setAttribute("id", "drag1");
img.setAttribute("draggable", "true");
img.addEventListener("dragstart", drag);

body.appendChild(div1);
body.appendChild(img);
