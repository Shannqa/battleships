import { createDom } from "./dom.js";
import { playGame } from "./game.js";
import imgsrc from "./img_logo.gif";
import css from "./style.css";

createDom();
playGame();

const body = document.querySelector("body");
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

/*
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<br>
<img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69"></img>

*/
body.appendChild(div1);
body.appendChild(img);
