import Phaser from "phaser";

let SinglePlayer;

class StartScreen extends Phaser.Scene {
  constructor() {
    super({
      key: "StartScreen",
      active: true,
    });
  }

  init() {}

  preload() {
    this.load.image("space", require("./assets/space.png"));
    this.load.spritesheet("ship", require("./assets/ship.png"), {
      frameWidth: 75,
      frameHeight: 160,
    });
  }

  create() {
    this.add.tileSprite(0, 0, 800, 600, "space").setOrigin(0, 0);

    this.add.text(180, 100, "SPACESHOOTER", {
      fill: "#FFFFFF",
      fontSize: "50px",
      fontFamily: "Orbitron"
    });

    var SinglePlayer = this.add
      .sprite(
        280,
        480,
        "ship",
        this.add.text(225, 550, "Single Player", {
          fill: "#FFFFFF",
          fontSize: "16px",
          fontFamily: "Orbitron",
        })
      )
      .setScale(0.7);
    SinglePlayer.setInteractive().on("pointerdown", () => {
      this.scene.stop("StartScreen");
      this.scene.start("PlayGame", {});
    });
  }
}

export default StartScreen;
