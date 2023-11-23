// drag and drop polyfill
// https: //www.npmjs.com/package/drag-drop-touch

const body = document.querySelector("body");
const div1 = document.createElement("div");
const div2 = document.createElement("div");

function allowDrop(event) {
  event.preventDrfault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
}

div1.id="div1";
div1.ondrop="drop(event)";
div1.ondragover="allowDrop(event)";

div2.id = draggable="true";
div2.ondragstart="drag(event)"


body.appendChild(div1);
body.appendChild(div2);