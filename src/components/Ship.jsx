import React, { useState } from 'react';

function Ship(props) {
  const size = parseInt(props.size);
  let singleShip = [];
  for (let i = 0; i < size; i++) {
    singleShip.push(<div className="cell" key={size + i}></div>);
  }

  /* Drag and drop functions */
  function allowDrop(ev) {
    ev.preventDefault();
  }

  function dragStart(ev) {
    //ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
  // catch an error happening if the user tries to drag and drop the ship in a wrong place, e.g. in the middle of multiple squares
  /*
  try {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    document.getElementById(data).classList.add("ship-on-board");
    ev.target.appendChild(document.getElementById(data));
  } catch {
    console.log("error - drag&drop");
    return;
  }*/
  }
  
  function doubleClick() {
    
  }

  function dragEnd() {
    //areAllShipsPlaced();
  }
  
  function doubleClick(ev) {
    ev.target.classList.toggle("flex-toggle");
  }

  
  return(
    <div className="ship-to-place" id={"to-place-" + props.index} draggable="true" onDragStart={dragStart} ondblclick={doubleClick} onDragEnd={dragEnd}>
      {singleShip}
    </div>
  )
}

export default Ship