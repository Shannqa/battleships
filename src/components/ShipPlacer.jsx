import React, {useState} from 'react';
import Component from './Component.jsx';
import Ship from "./Ship.jsx";

function ShipPlacer(props) {
  const shipSizes = [2, 3, 4, 5];
  
  function checkPlacements() {
    
  }
  
  
  return(
    <div className="ship-placer">
      <h3>Place your ships</h3>
      <p>Drag & drop the ships on the board. Double-click a ship to rotate it.</p>
      <p>Once you're happy with the placement of your ships, click the start button to begin the game!</p>
      {shipSizes.map((item, index) => (
      <Ship key={index} size={shipSizes[index]} index={index} />
      ))}
      <StartButton onClick={checkPlacements} />
    </div>
    )
}

export default ShipPlacer