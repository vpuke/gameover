import Phaser from "phaser";
import StartScreen from "./StartScreen";
import PlayGame from "./SinglePlayer";
import GameOver from "./GameOver";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [PlayGame, StartScreen, GameOver],
};

let game = new Phaser.Game(config);
