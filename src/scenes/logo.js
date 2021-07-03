export default class logo extends Phaser.Scene {
  constructor(){
    super({key: "logo"});
  }
	preload(){
	this.add.image( 2120 / 2, 1200 / 2 - 75, 'logo');
  this.load.setPath('assets/');
  this.load.spritesheet('Char1', 'Char1.png', {frameWidth: 35, frameHeight: 35})
  this.load.spritesheet('Char1Walljump', 'Char1Walljump.png', {frameWidth: 35, frameHeight: 35})
  this.load.image('gun1', 'gun1.png')
  this.load.image('gun1Bullet', 'gun1Bullet.png')
  this.load.image('AncientDischargeGun', 'AncientDischargeGun.png')
  this.load.image('AncientDischargeGunBullet', 'AncientDischargeBullet.png')
  this.load.image('128rectangle', '128rectangle.png')
  this.load.image('250rectangle', '250rectangle.png')
  this.load.image('hpbar', 'hpbar.png')
  this.load.image('otherhpbar', 'otherhpbar.png')
  this.load.image('Char1Afterimage', 'Char1Afterimage.png')
  this.load.image('backbutton', 'backbutton.png')
  this.load.spritesheet('multiplayer', 'multiplayer.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('play', 'play.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('quit', 'quit.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('options', 'options.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('button1', 'button1.png', {frameWidth: 128, frameHeight: 128});
  this.load.spritesheet('button2', 'button2.png', {frameWidth: 128, frameHeight: 128});
  this.load.spritesheet('button3', 'button3.png', {frameWidth: 128, frameHeight: 128});
}
	create(){
    var self = this;
    var name;
    var file = JSON.parse(localStorage.getItem('name'));
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
              file = name.text
              console.log(JSON.stringify(file));
              localStorage.setItem('name',JSON.stringify(file));
              self.scene.start('menu');
            }
          });
    }
    else {
     this.scene.start('menu');
    }
	}
}
