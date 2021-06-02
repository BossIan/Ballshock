import menu from './menu'
export default class logo extends Phaser.Scene {
  constructor(){
    super({key: "logo"});
  }
	preload(){
	this.add.image( 2120 / 2, 1200 / 2 - 75, 'logo');
  this.load.setPath('assets/');
  this.load.spritesheet('character1', 'character1.png', {frameWidth: 35, frameHeight: 35})
  this.load.spritesheet('walljump1', 'walljump1.png', {frameWidth: 35, frameHeight: 35})
  this.load.image('gun1', 'gun1.png')
  this.load.image('bullet1', 'bullet1.png')
  this.load.image('floor', 'floor.png')
  this.load.image('floor_side', 'floor_side.png')
  this.load.image('floor_small', 'floor_small.png')
  this.load.image('floor_front', 'floor_front.png')
  this.load.image('floor_bottom_small', 'floor_bottom_small.png')
  this.load.image('floor_middle', 'floor_middle.png')
  this.load.image('floor_middle_small', 'floor_middle_small.png')
  this.load.image('floor_bottom_middle_small', 'floor_bottom_middle_small.png')
  this.load.image('floor_side_small', 'floor_side_small.png')
  this.load.image('floor_sidemiddle', 'floor_sidemiddle.png')
  this.load.image('floor_topmiddle', 'floor_topmiddle.png')
  this.load.image('floor_tube_up', 'floor_tube_up.png')
  this.load.image('floor_tube_side', 'floor_tube_side.png')
  this.load.image('floor_diag', 'floor_diag.png')
  this.load.image('floor_diag_small', 'floor_diag_small.png')
  this.load.image('floor_triple_small', 'floor_triple_small.png')
  this.load.image('floor_side_small_line', 'floor_side_small_line.png')
  this.load.image('floor_diag_withsmall', 'floor_diag_withsmall.png')
  this.load.image('floor_vertical1', 'floor_vertical1.png')
  this.load.image('floor_vertical2', 'floor_vertical2.png')
  this.load.image('floor_vertical3', 'floor_vertical3.png')
  this.load.image('floor_vertical4', 'floor_vertical4.png')
  this.load.image('floor_vertical5', 'floor_vertical5.png')
  this.load.image('floor_vertical6', 'floor_vertical6.png')
  this.load.image('floor_vertical7', 'floor_vertical7.png')
  this.load.image('floor_vertical8', 'floor_vertical8.png')
  this.load.image('floor_vertical9', 'floor_vertical9.png')
  this.load.image('floor_vertical10', 'floor_vertical10.png')
  this.load.image('floor_bigvertical', 'floor_bigvertical.png')
  this.load.spritesheet('multiplayer', 'multiplayer.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('play', 'play.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('quit', 'quit.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('options', 'options.png', {frameWidth: 128, frameHeight: 64});
}
	create(){
  this.scene.start('menu');
	}
}
