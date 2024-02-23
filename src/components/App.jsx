import { useState } from "react";
import Scoreboard from "./Scoreboard.jsx";
import ImageGetter from "./ImageGetter.jsx";
import ModalLostGame from "./ModalLostGame.jsx";
import ModalNextRound from "./ModalNextRound.jsx"
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "../styles/index.css"

function Game() {
  const [images, setImages] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  // get best score from local storage
  const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem("bestScore")) || 0);
  const [imgCount, setImgCount] = useState(3);
  const [fetchSwitch, setFetchSwitch] = useState(true);
  const [turnCount, setTurnCount] = useState(1);
  const [round, setRound] = useState(1);
  
  function shuffleImages(array) {
    // Fisher-Yates shuffle
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array;
  }

  function handlePick(e) {
    console.log(e.target.id);
    // check if the image has already been picked
    const pickedImage = images.find((img) => img.id === e.target.id);

    if (pickedImage.picked === true) {
      return lostGame();
    } 

    const setAsPicked = images.map((img) => {
      if (img.id === e.target.id) {
        return {
          ...img,
          picked: true
        }         
      } else {
        return img;
      } 
    });
    setImages(shuffleImages(setAsPicked))
    winTurn();
    console.log(images);
  }  

  function lostGame() {
    const modal = document.querySelector("#modal-lost");
    modal.classList.add("display");
    setCurrentScore(0);
    setTurnCount(1);
  }

  function playAgain() {
    const modal = document.querySelector("#modal-lost");
    modal.classList.remove("display");
    setFetchSwitch(!fetchSwitch);
    setImgCount(3);
    const cards = document.querySelector(".cards");
    cards.classList.remove("display");
  }

  function winTurn() {
    setCurrentScore(currentScore + 1)
    setTurnCount(turnCount + 1)
    if (currentScore >= bestScore) {
      setBestScore(bestScore + 1);
      // save best score to the local storage
      localStorage.setItem("bestScore", JSON.stringify(bestScore));
    }
    console.log("turnCount" + turnCount);
    console.log("imgCount" + imgCount);
    if (turnCount === imgCount) {
      winRound();
    }
      
  }

  function winRound() {
    const modal = document.querySelector("#modal-round");
    modal.classList.add("display");

  }

  function startNextRound() {
    const modal = document.querySelector("#modal-round");
    modal.classList.remove("display");
    const cards = document.querySelector(".cards");
    cards.classList.remove("display");
    setTurnCount(1);
    setImgCount(imgCount + 1);
    setRound(round + 1);
  }

  return(
    <div>
      <Header currentScore={currentScore} bestScore={bestScore} round={round}/>
      <ImageGetter imgCount={imgCount} images={images} setImages={setImages} onPick={handlePick} fetchSwitch={fetchSwitch} setFetchSwitch={setFetchSwitch}/>
      <ModalLostGame handler={playAgain}/>
      <ModalNextRound handler={startNextRound} />
      <Footer />
    </div>
  )
}

export default Game