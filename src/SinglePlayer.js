import Phaser from "phaser";

let space;
let backgroundVelocity;
let ship;
let enemies;
let enemyShots;
let cursors;
let addEnemiesTimer;
let enemyShotTimer;
let gameOver = false;
// let playerFire;
// let lastFired = -1;
let score = 0;
let scoreText;
let playAgain;
let highscore;

// http://labs.phaser.io/edit.html?src=src/pools/bullets.js

class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "playerFire");
  }
  fire(x, y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityY(-600);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.y <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Laser,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: "playerFire",
    });
  }
  fireLaser(x, y) {
    const laser = this.getFirstDead(false);
    if (laser) {
      laser.fire(x, y);
    }
  }
}

class PlayGame extends Phaser.Scene {
  constructor() {
    super({ key: "PlayGame" });
    this.LaserGroup;
  }

  preload() {
    this.load.image("space", require("./assets/space.png"));

    this.load.spritesheet("playerFire", require("./assets/shot.png"), {
      frameWidth: 102,
      frameHeight: 104,
    });
    this.load.spritesheet("ship", require("./assets/ship.png"), {
      frameWidth: 75,
      frameHeight: 160,
    });

    this.load.spritesheet("enemy", require("./assets/enemy.png"), {
      frameWidth: 35,
      frameHeight: 125,
    });

    this.load.spritesheet("explosion", require("./assets/explosion.png"), {
      frameWidth: 152,
      frameHeight: 150,
    });

    this.load.spritesheet("enemyShot", require("./assets/enemyShot.png"), {
      frameWidth: 34,
      frameHeight: 64,
    });
  }

  create() {
    space = this.add.tileSprite(0, 0, 800, 600, "space").setOrigin(0, 0);
    backgroundVelocity = -1;

    this.LaserGroup = new LaserGroup(this);

    ship = this.physics.add.sprite(400, 500, "ship").setScale(0.4);
    ship.setBounce(0.2);
    ship.setCollideWorldBounds(true);

    // playerFire = this.physics.add
    //   .sprite(ship.x, ship.y, "playerFire")
    //   .setScale(0.5);

    enemyShots = this.physics.add.group();
    enemies = this.physics.add.group();

    addEnemiesTimer = this.time.addEvent({
      delay: 3500,
      callback: addEnemies,
      callbackScope: this,
      loop: true,
    });

    enemyShotTimer = this.time.addEvent({
      delay: 2500,
      callback: addEnemyShots,
      callbackScope: this,
      loop: true
    });

    // this.anims.create({
    //   key: "playerFire",
    //   frames: this.anims.generateFrameNames("playerFire", {
    //     start: 6,
    //     end: 6,
    //   }),
    //   frameRate: 1,
    //   repeat: -1,
    // });

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

    this.anims.create({
      key: "enemyFly",
      frames: this.anims.generateFrameNames("enemy", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "shotFired",
      frames: this.anims.generateFrameNames("enemyShot", { start: 0, end: 11 }),
      frameRate: 8,
      repeat: 6
    });

    this.anims.create({
      key: "shipExplosion",
      frames: this.anims.generateFrameNames("explosion", { start: 0, end: 11 }),
      frameRate: 10,
      repeat: 0,
    });

    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(32, 32, "Ships Destroyed: 0", {
      fontSize: "28px",
      fill: "#FFFFFF",
      fontFamily: "Orbitron",
    });

    this.physics.add.collider(ship, enemies, hitShip, null, this);
    this.physics.add.overlap(ship, enemyShots, hitShip, null, this);
    this.physics.add.overlap(enemies, this.LaserGroup, hitEnemy, null, this);
  }

  update(time, delta) {
    space.tilePositionY += backgroundVelocity;

    ship.anims.play("fly", true);

    enemies.children.iterate((child) => {
      child.play("enemyFly", true);
      child.setVelocityY(40);
    });

    enemyShots.children.iterate((child) => {
      child.play("shotFired", true);
      child.setVelocityY(200);
    })

    if (gameOver)
    {
      this.add.text(200, 100, "GAME OVER", {
        fill: "#FFFFFF",
        fontSize: "60px",
        fontFamily: "Orbitron",
      });

      playAgain = this.add.text(290, 300, "PLAY AGAIN", {
        fill: "#FFFFFF",
        fontSize: "35px",
        fontFamily: "Orbitron",
      });

      highscore = this.add.text(290, 350, "HIGHSCORE", {
        fill: "#FFFFFF",
        fontSize: "35px",
        fontFamily: "Orbitron",
      });

      playAgain.setInteractive().on("pointerdown", () => {
        gameOver = false;
        this.scene.restart();
      });
    }

    if (cursors.left.isDown && cursors.up.isDown) {
      ship.setVelocityX(-200);
      ship.setVelocityY(-200);
    }

    if (cursors.right.isDown && cursors.up.isDown) {
      ship.setVelocityX(200);
      ship.setVelocityY(-200);
    }

    if (cursors.right.isDown && cursors.down.isDown) {
      ship.setVelocityX(200);
      ship.setVelocityY(200);
    }

    if (cursors.left.isDown && cursors.down.isDown) {
      ship.setVelocityX(-200);
      ship.setVelocityY(200);
    }

    if (cursors.up.isDown) {
      ship.setVelocityY(-200);
    } else if (cursors.down.isDown) {
      ship.setVelocityY(200);
    } else {
      ship.setVelocityY(0);
    }

    if (cursors.left.isDown) {
      ship.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      ship.setVelocityX(200);
    } else {
      ship.setVelocityX(0);
    }

    if (cursors.space.isDown) {
      this.shootLaser();
    }
  }
  shootLaser() {
    this.LaserGroup.fireLaser(ship.x, ship.y - 20);
  }
}

function addEnemies() {
  let enemy = this.physics.add
    .sprite(Phaser.Math.Between(35, this.game.config.width - 35), -75, "enemy")
    .setScale(0.6);
  enemies.add(enemy);
}

function addEnemyShots()
{
  enemies.children.iterate(child => {

    if (child.active !== false)
    {
      let shot = this.physics.add.sprite(child.x, child.y+50, "enemyShot");
      enemyShots.add(shot);
    }
  })
}

function hitShip(ship, enemyObject)
{
  enemyShotTimer.destroy();
  enemyObject.disableBody(true, true);
  ship.disableBody(true, true);
  let explosion = this.physics.add
    .sprite(ship.x, ship.y, "explosion")
    .setScale(0.6);
  explosion.anims.play("shipExplosion", true);
  this.physics.pause();

  gameOver = true;
}

function hitEnemy(enemy, fire)
{
  enemies.remove(enemy, true, true);
  enemy.active = false;
  let explosion = this.physics.add.sprite(enemy.x, enemy.y, "explosion").setScale(0.6);
  explosion.anims.play("shipExplosion", true);
}

export default PlayGame;
