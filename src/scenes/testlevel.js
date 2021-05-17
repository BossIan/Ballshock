var key_W;
var key_A;
var key_S;
var key_D;
var key_Space;

var key_Q;
var key_E;
var key_Shift;

var speed = 100;
var character;
export default class testlevel extends Phaser.Scene {
  constructor(){
    super({key: "testlevel"});
  }
	preload(){
    this.load.setPath('assets/');
    this.load.image('character1', 'character1.png')
}
	create(){
//keys
    key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    key_Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    key_Shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    character = this.physics.add.image(50, 50, 'character1')
	}
  update(){
    if (key_D.isDown) {
      character.setVelocityX(speed);
    }
    else if (key_A.isDown) {
      character.setVelocityX(-speed);
    }
    else {
      character.setVelocityX(0);
    }
    if (key_Space.isDown) {
      character.setVelocityY(-240);
    }
    else if(key_W.isDown){
      character.setVelocityY(-240);
    }
  }
}
