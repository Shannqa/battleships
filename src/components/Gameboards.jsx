import React, { useState } from "react";

function Gameboards({ boardHuman, setterHuman, boardAI, setterAI }) {
  
  
  return(
    <div className="gameboards">
      <div>
        <h3>Your Board</h3>
        <Grid owner="human" board={boardHuman} setter={setterHuman} />
      </div>
      <div>
        <h3>Enemy Board</h3>
        <Grid owner="AI" board={boardAI} setter={setterAI}/>
      </div>
    </div>
  )
}


export default Gameboards