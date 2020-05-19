import Phaser from "phaser";
import StartScreen from "./StartScreen";
import PlayGame from "./SinglePlayer";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  scene: [PlayGame, StartScreen],
};

let game = new Phaser.Game(config);
