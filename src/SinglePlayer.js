import Phaser from "phaser";

let space;
let backgroundVelocity;
let ship;
let cursors;

class PlayGame extends Phaser.Scene {
  preload() {
    this.load.image("space", require("./assets/space.png"));
    this.load.spritesheet("ship", require("./assets/ship.png"), {
      frameWidth: 75,
      frameHeight: 160,
    });
  }

  create() {
    space = this.add.tileSprite(0, 0, 800, 600, "space").setOrigin(0, 0);
    backgroundVelocity = -1;

    ship = this.physics.add.sprite(400, 500, "ship").setScale(0.4);
    ship.setBounce(0.2);
    ship.setCollideWorldBounds(true);

    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNames("ship", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    space.tilePositionY += backgroundVelocity;

    ship.anims.play("fly", true);

    if (cursors.left.isDown && cursors.up.isDown) {
      ship.setVelocityX(-160);
      ship.setVelocityY(-160);
    }

    if (cursors.right.isDown && cursors.up.isDown) {
      ship.setVelocityX(160);
      ship.setVelocityY(-160);
    }

    if (cursors.right.isDown && cursors.down.isDown) {
      ship.setVelocityX(160);
      ship.setVelocityY(160);
    }

    if (cursors.left.isDown && cursors.down.isDown) {
      ship.setVelocityX(-160);
      ship.setVelocityY(160);
    }

    if (cursors.up.isDown) {
      ship.setVelocityY(-160);
    } else if (cursors.down.isDown) {
      ship.setVelocityY(160);
    } else {
      ship.setVelocityY(0);
    }

    if (cursors.left.isDown) {
      ship.setVelocityX(-160);
    } else if (cursors.right.isDown) {
      ship.setVelocityX(160);
    } else {
      ship.setVelocityX(0);
    }
  }
}

export default PlayGame;
