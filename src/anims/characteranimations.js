import {character} from './scenes/testlevel'
export default class characteranimations extends Phaser.Events.EventEmitter {
  constructor(scene) {
    super(scene, characteranimations);
          scene.anims.create({
          key: 'dash',
          repeat: -1,
          frameRate: 15,
          frames: scene.anims.generateFrameNumbers(character1)
      });
  }
}
