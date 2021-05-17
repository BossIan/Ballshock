import Phaser from 'phaser';
import testlevel from './scenes/testlevel';
var width = 1280;
var height = 720;
var config;
config = {
    type: Phaser.AUTO,
    backgroundColor: '#646464',
    scale: {
      mode: Phaser.Scale.FIT,
      parent: 'phaser-example',
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: width,
      height: height
    },
    transparent: false,
    expandParent: true,
    gameTitle: "Ballshock",
    gameVersion: "0.0.0.2",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 600}
        }
    },
    scene:[testlevel]
};
var game = new Phaser.Game(config);
