import Phaser from 'phaser';
import testlevel from './scenes/testlevel';
import multilevel from './scenes/multilevel';
var width = 2120;
var height = 1200;
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
    gameVersion: "0.0.0.5",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 800}
        }
    },
    scene:[testlevel, multilevel]
};
var game = new Phaser.Game(config);
