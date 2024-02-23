import React, { useState } from 'react';

function StartButton(props) {
  
  return(
    <button className="default-btn" onClick={props.onClick}>Start Game</button>
    )
}

export default StartButton