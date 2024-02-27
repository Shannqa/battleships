import React, { useState } from 'react';

function Ship(props) {
  const size = parseInt(props.size);
  let singleShip = [];
  for (let i = 0; i < size; i++) {
    singleShip.push(<div className="cell" key={size + i}></div>);
  }

  /* Drag and drop functions */

  function dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function dragEnd() {
    //areAllShipsPlaced();
  }
  
  function doubleClick(ev) {
    ev.currentTarget.classList.toggle("flex-toggle");
  }

  
  return(
    <div className="ship-to-place" id={"to-place-" + props.index} draggable="true" onDragStart={dragStart} onDoubleClick={doubleClick} onDragEnd={dragEnd}>
      {singleShip}
    </div>
  )
}

export default Ship