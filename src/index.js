import Phaser from "phaser";

import PlayGame from "./scene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: PlayGame,
};

let game = new Phaser.Game(config);
