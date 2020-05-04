import Phaser from 'phaser';

class PlayGame extends Phaser.Scene {
  preload ()
  {
    this.load.image('sky', require('./assets/sky.png'));
  }

  create ()
  {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }

  update ()
  {
  }

}

export default PlayGame;
