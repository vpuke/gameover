import Phaser from "phaser";

let SinglePlayer;
let MultiPlayer;

class StartScreen extends Phaser.Scene {
  constructor() {
    super({
      key: "StartScreen",
      active: true,
    });
  }

  preload() {
    this.load.image("background", require("./assets/space.png"));

    this.load.spritesheet("onePlayer", require("./assets/ship.png"), {
      frameWidth: 75,
      frameHeight: 160,
    });

    this.load.spritesheet("multiPlayer", require("./assets/ship2.png"), {
      frameWidth: 61,
      frameHeight: 157,
    });
  }

  create() {
    this.add.tileSprite(0, 0, 800, 600, "background").setOrigin(0, 0);

    this.add.text(180, 100, "SPACESHOOTER", {
      fill: "#FFFFFF",
      fontSize: "50px",
      fontFamily: "Orbitron",
    });

    var SinglePlayer = this.add
      .sprite(
        255,
        480,
        "onePlayer",
        this.add.text(200, 550, "Single Player", {
          fill: "#FFFFFF",
          fontSize: "16px",
          fontFamily: "Orbitron",
        })
      )
      .setScale(0.7);
    SinglePlayer.setInteractive().on("pointerdown", () => {
      this.scene.stop("StartScreen");
      this.scene.stop("MultiPlayer");
      this.scene.start("PlayGame", {});
    });

    var MultiPlayer = this.add
      .sprite(
        570,
        480,
        "multiPlayer",
        this.add.text(530, 550, "Multiplayer", {
          fill: "#FFFFFF",
          fontSize: "16px",
          fontFamily: "Orbitron",
        })
      )
      .setScale(0.8);
    MultiPlayer.setInteractive().on("pointerdown", () => {
      this.scene.stop("StartScreen");
      this.scene.stop("PlayGame");
      this.scene.start("MultiPlayer", {});
    });
  }
  update() {}
}

export default StartScreen;
