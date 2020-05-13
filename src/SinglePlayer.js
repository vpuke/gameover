import Phaser from "phaser";

let space;
let backgroundVelocity;
let ship;
let cursors;
let playerFire;
let lastFired = -1;
// http://labs.phaser.io/edit.html?src=src/pools/bullets.js

class PlayGame extends Phaser.Scene {
  preload() {
    this.load.image("space", require("./assets/space.png"));
    this.load.spritesheet("playerFire", require("./assets/shot.png"), {
      frameWidth: 104,
      frameHeight: 104,
    });
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

    playerFire = this.physics.add
      .sprite(ship.x, ship.y, "playerFire")
      .setScale(0.5);

    this.anims.create({
      key: "playerFire",
      frames: this.anims.generateFrameNames("playerFire", {
        start: 6,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNames("ship", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    space.tilePositionY += backgroundVelocity;

    playerFire.anims.play("playerFire", true);
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

    lastFired -= delta;
    if (cursors.space.isDown && lastFired < 0) {
      lastFired = 1000;
      shotsFired();
    }
  }
}

function shotsFired() {
  playerFire.enableBody(true, ship.x, ship.y, true, true);
  playerFire.setVelocityY(-400);
  playerFire.body.setGravityY(-400);
}

export default PlayGame;
