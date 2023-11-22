class Ship {

> constructor() length, number of times its been hit, sunk or not

> hit() function increasing number of hits in the ship

> isSunk() function calculating if the ship is sunk based on length and number of hits

- not sure if needed - disable any more hits after the hip has been destroyed

}

class Gameboard {
> constructor() create an empty board of size xy

> placeShip() call ship constructor and place on the board at specific coordinates

connect the ship instance to the board, it should be notified of any hits

receiveAttack() takes a pair of coordinates, determine if its a hit or not; if yes, call the ship's hit function, if not, record a miss

keep track of missed shots and display them

report whether all ships of the board have been sunk

}

class Player {
human-player and computer-player

take turns attacking the enemy's gameboard

}

playGame {
set up new game by creating players and gameboards
}
