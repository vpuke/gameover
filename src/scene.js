import Phaser from "phaser";

var space;
var backgroundVelocity;

class PlayGame extends Phaser.Scene {
  preload() {
    this.load.image("space", require("./assets/space.png"));
  }

  create() {
    space = this.add.tileSprite(0, 0, 800, 600, "space").setOrigin(0, 0);
    backgroundVelocity = 1;
  }

  update() {
    space.tilePositionY += backgroundVelocity;
  }
}

export default PlayGame;
