import Phaser from "phaser";
import StartScreen from "./StartScreen";
import PlayGame from "./SinglePlayer";
import GameOver from "./GameOver";
import MultiPlayer from "./MultiPlayer";

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
  scene: [StartScreen],
};

let game = new Phaser.Game(config);

game.scene.add("PlayGame", PlayGame, false);
game.scene.add("MultiPlayer", MultiPlayer, false);
game.scene.add("GameOver", GameOver, false);
