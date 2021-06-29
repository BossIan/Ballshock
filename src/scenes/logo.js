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
  this.load.spritesheet('multiplayer', 'multiplayer.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('play', 'play.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('quit', 'quit.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('options', 'options.png', {frameWidth: 128, frameHeight: 64});
}
	create(){
    var self = this;
    var name;
    var file = JSON.parse(localStorage.getItem('saveFile'));
    if (file == null) {
      console.log(file);
      this.add.text(100, 100, 'Enter your name:', { font: '40px Courier', fill: '#000000' });
      name = this.add.text(100, 150, '', { font: '40px Courier', fill: '#000000' });+
      this.input.keyboard.on('keydown', function (event) {
          if (event.keyCode === 8 && name.text.length > 0){
            name.text = name.text.substr(0, name.text.length - 1);
          }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90 || event.keyCode === 190 || event.keyCode === 90)){
              if (name.text.length < 8) {name.text += event.key;
              }
            }
            else if (event.keyCode === 13 && name.text.length > 0) {
              file = {name: name.text}
              localStorage.setItem('saveFile',JSON.stringify(file));
              self.scene.start('menu');
            }
          });
    }
    else {
     this.scene.start('menu');
    }
	}
}
