class Ship {
  constructor(length, hits, destroyed) {
    this.length = length;
    this.hits = hits;
    this.destroyed = destroyed;
  }

  hit() {
    this.hits += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.destroyed = true;
      return true;
    }
    return false;
  }
}

export { Ship };
