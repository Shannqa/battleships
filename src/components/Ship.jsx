import React, { useState } from 'react';

function Ship(props) {
  const size = parseInt(props.size);
  let singleShip = [];
  for (let i = 0; i < size; i++) {
    singleShip.push(<div className="cell" key={size + i} id={i} data-cell={i + 1} data-size={size}></div>);
  }

  /* Drag and drop functions */

  let draggedElement = null;

  function dragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }
  
  function dragEnd() {
    //areAllShipsPlaced();
  }
  
  function doubleClick(ev) {
    ev.currentTarget.classList.toggle("flex-toggle");
  }

  
  return(
    <div className="ship-to-place" id={"to-place-" + props.size} draggable="true" onDragStart={dragStart} onDoubleClick={doubleClick} onDragEnd={dragEnd}>
      {singleShip}
    </div>
  )
}

export default Ship