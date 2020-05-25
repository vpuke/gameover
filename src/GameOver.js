import Phaser from "phaser";

let box;
let score;
let isMultiPlayer;
let isGameOver = false;

class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: "GameOver"
    });
  }

  init (data) {
    score = data.score;
    isMultiPlayer = data.isMultiPlayer;
  }

  preload() {
    this.load.image("clickBox", require("./assets/box.png"));
  }

  create() {
    this.add.tileSprite(0, 0, 800, 600, "space").setOrigin(0, 0);

    this.add.text(200, 200, "GAME OVER", {
      fill: "#FFFFFF",
      fontSize: "60px",
      fontFamily: "Orbitron",
    });

    this.add.text(300, 320, `SCORE: ${score}`, {
      fill: "#FFFFFF",
      fontSize: "35px",
      fontFamily: "Orbitron",
    });

    this.add.text(275, 400, "PLAY AGAIN", {
      fill: "#FFFFFF",
      fontSize: "35px",
      fontFamily: "Orbitron",
    });

    box = this.add.image(265, 395, "clickBox").setOrigin(0, 0);

    box.setInteractive().on("pointerdown", () => {
      this.scene.stop("GameOver");
      this.scene.start("StartScreen");
    });
  }
}

export default GameOver;
