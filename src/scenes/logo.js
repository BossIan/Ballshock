export default class logo extends Phaser.Scene {
  constructor(){
    super({key: "logo"});
  }
	preload(){
	this.add.image( 2120 / 2, 1200 / 2 - 75, 'logo');
  this.load.setPath('assets/');
  this.load.spritesheet('Character', 'Character.png', {frameWidth: 35, frameHeight: 35})
  this.load.spritesheet('CharacterWalljump', 'CharacterWalljump.png', {frameWidth: 35, frameHeight: 35})
  this.load.image('CharacterAfterimage', 'CharacterAfterimage.png')
  this.load.image('Chronoshifter', 'Chronoshifter.png')
  this.load.image('Bastion', 'Bastion.png')
  this.load.image('GhostForce', 'GhostForce.png')
  this.load.image('AideUnit', 'AideUnit.png')
  this.load.image('Vizier', 'Vizier.png')
  this.load.image('Veteran', 'Veteran.png')
  this.load.image('gun1', 'gun1.png')
  this.load.image('gun1Bullet', 'gun1Bullet.png')
  this.load.image('AncientDischargeGun', 'AncientDischargeGun.png')
  this.load.image('AncientDischargeGunBullet', 'AncientDischargeBullet.png')
  this.load.image('ThunderScreamGun', 'thunderscreamGun.png')
  this.load.image('ThunderScreamGunBullet', 'thunderscreamBullet.png')
  this.load.image('Boomsmith', 'Boomsmith.png')
  this.load.image('BoomsmithBullet', 'BoomforgedGrenade.png')
  this.load.image('SolFlairGun', 'SolFlairGun.png')
  this.load.image('SolFlairGunBullet', 'SolFlairGunBullet.png')
  this.load.image('SuperchargedFractal', 'SuperchargedFractal.png')
  this.load.image('SuperchargedFractalBullet', 'FractalBolt.png')
  this.load.image('128rectangle', '128rectangle.png')
  this.load.image('250rectangle', '250rectangle.png')
  this.load.image('256rectangle', '256rectangle.png')
  this.load.image('hpbar', 'hpbar.png')
  this.load.image('otherhpbar', 'otherhpbar.png')
  this.load.image('overheatbar', 'overheatbar.png')
  this.load.image('backbutton', 'backbutton.png')
  this.load.image('healthpack', 'healthpack.png')
  this.load.image('remnants', 'remnants.png')
  this.load.spritesheet('overheattext', 'overheattext.png', {frameWidth: 49, frameHeight: 25})
  this.load.spritesheet('healthstation', 'healthstation.png', {frameWidth: 40, frameHeight: 40})
  this.load.spritesheet('multiplayer', 'multiplayer.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('play', 'play.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('quit', 'quit.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('options', 'options.png', {frameWidth: 128, frameHeight: 64});
  this.load.spritesheet('button1', 'button1.png', {frameWidth: 128, frameHeight: 128});
  this.load.spritesheet('button2', 'button2.png', {frameWidth: 128, frameHeight: 128});
  this.load.spritesheet('button3', 'button3.png', {frameWidth: 128, frameHeight: 128});
  this.load.spritesheet('BoomforgedBlast', 'BoomforgedBlast.png', {frameWidth: 105, frameHeight: 105});
}
	create(){
    var self = this;
    var name;
    var savedloadout1 = JSON.parse(localStorage.getItem('loadout1'));
    var savedloadout2 = JSON.parse(localStorage.getItem('loadout2'));
    var savedloadout3 = JSON.parse(localStorage.getItem('loadout3'));
    if (savedloadout1 == null) {
      savedloadout1 = {primary: 'gun1',character: 'Chronoshifter', type: '1', characterTint: 0x00FFE0, secondary: 'SolFlairGun', }
      savedloadout2 = {primary: 'AncientDischargeGun',character: 'Chronoshifter', type: '1', characterTint: 0xC92603, secondary: 'SolFlairGun', }
      savedloadout3 = {primary: 'ThunderScreamGun',character: 'Chronoshifter', type: '1', characterTint: 0x038AC9, secondary: 'SolFlairGun', }
      localStorage.setItem('loadout1',JSON.stringify(savedloadout1));
      localStorage.setItem('loadout2',JSON.stringify(savedloadout2));
      localStorage.setItem('loadout3',JSON.stringify(savedloadout3));
    }
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
