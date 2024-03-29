var key_1;
var key_2;
var key_W;
var key_A;
var key_S;
var key_D;
var key_Space;
var testspeed = 0;
var CanMove = true;
var key_Q;
var key_E;
var key_Shift;
var speed = 200;
var character;
var gun;
var bullet1;
var bullet2;
var bullet3;
var bullet4;
var bullet5;
var bullet6;
var bullet7;
var bulletcooldown = 0;
var bullets;
var Health = 100;
var healthtext;
var key_ESC;











import Phaser from 'phaser';
export default class testlevel extends Phaser.Scene {
  constructor(){
    super({key: "testlevel"});
  }
	preload(){
}
	create(){
//keys
    key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    key_Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    key_Shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
//character
    character = this.physics.add.sprite(80, 1100, 'character1', 0)
    var camera = this.cameras.main;
    camera.setZoom(2.5)
    healthtext = this.add.text( 1000, 500,"Health = " + Health).setScrollFactor(0).setDepth(3);
    camera.setBounds(0, 0, 2120, 1200)
    camera.startFollow(character);
    character.body.collideWorldBounds = true;
    gun = this.add.image(character.x, character.y, 'gun1')
//characteranimations
     this.anims.create({
       key: 'dash',
       repeat: 0,
       frameRate: 5,
       frames: this.anims.generateFrameNumbers('character1')
     });
      this.anims.create({
        key: 'walljump',
        repeat: 0,
        frameRate: 5,
        frames: this.anims.generateFrameNumbers('walljump1')
      });
//floors
var floors = this.physics.add.staticGroup()
floors.create(20, 1180, 'floor_small');
floors.create(20, 1120, 'floor_vertical7');
floors.create(20, 1060, 'floor_small').flipY = true;
for (var i = 0; i < 2; i++) {
floors.create(20, 1020 - i * 40, 'floor_middle');
}
floors.create(20, 940, 'floor_small');
floors.create(20, 860, 'floor_vertical8');
floors.create(20, 780, 'floor_side_small');
floors.create(20, 400, 'floor_bigvertical');
floors.create(20, 20, 'floor_small').flipY = true;

for (var i = 0; i < 51; i++) {
floors.create(60 + i * 40, 20, 'floor_front').flipY = true;
}
var floorflip1 = floors.create(2100, 20, 'floor_small')
floorflip1.flipX = true;
floorflip1.flipY = true;

for (var i = 0; i < 2; i++) {
floors.create(60 + i * 40, 1060, 'floor_front').flipY = true;
}
floors.create(140, 1060, 'floor_bottom_small');
floors.create(180, 1060, 'floor_sidemiddle');
floors.create(60, 1020, 'floor_middle');
floors.create(100, 1020, 'floor_small');
floors.create(140, 1020, 'floor_diag');
floors.create(60, 980, 'floor_middle');
floors.create(100, 980, 'floor_diag');
floors.create(60, 940, 'floor_diag');

for (var i = 0; i < 4; i++) {
floors.create(60 + i * 40, 780, 'floor_tube_side');
}
floors.create(220, 780, 'floor_sidemiddle');

floors.create(140, 900, 'floor_sidemiddle').flipX = true;
for (var i = 0; i < 2; i++) {
floors.create(180 + i * 40, 900, 'floor_tube_side');
}
floors.create(260, 900, 'floor_bottom_small').flipX = true;
floors.create(260, 860, 'floor_diag').flipX = true;
for (var i = 0; i < 2; i++) {
floors.create(300 + i * 40, 900, 'floor_front').flipY = true;
}
floors.create(300, 860, 'floor_small').flipX = true;
floors.create(300, 820, 'floor_diag').flipX = true;
floors.create(340, 860, 'floor_middle');
floors.create(340, 820, 'floor_front');
floors.create(380, 900, 'floor_bottom_small');
floors.create(380, 840, 'floor_vertical6');
floors.create(420, 900, 'floor_tube_side');
floors.create(460, 900, 'floor_sidemiddle');

floors.create(140, 700, 'floor_sidemiddle').flipX = true;
floors.create(180, 700, 'floor_bottom_small').flipX = true;
floors.create(180, 660, 'floor_diag').flipX = true;
floors.create(220, 700, 'floor_diag').flipY = true;
floors.create(220, 660, 'floor_diag_small').flipY = true;
floors.create(220, 620, 'floor_diag').flipX = true;
floors.create(260, 660, 'floor_diag').flipY = true;
floors.create(260, 620, 'floor_triple_small');
floors.create(260, 580, 'floor_topmiddle');
floors.create(300, 620, 'floor_sidemiddle');

floors.create(260, 1180, 'floor_small').flipX = true;
floors.create(260, 1140, 'floor_diag').flipX = true;
floors.create(300, 1180, 'floor_middle');
floors.create(300, 1140, 'floor_middle_small');
floors.create(300, 1100, 'floor_topmiddle');
floors.create(340, 1180, 'floor_small');
floors.create(340, 1140, 'floor_diag');

floors.create(260, 1020, 'floor_sidemiddle').flipX = true;
floors.create(300, 1020, 'floor_tube_side')
floors.create(340, 1020, 'floor_sidemiddle')

floors.create(420, 1060, 'floor_sidemiddle').flipX = true;
floors.create(460, 1060, 'floor_bottom_small').flipX = true;
floors.create(460, 1020, 'floor_diag').flipX = true;
floors.create(500, 1060, 'floor_front').flipY = true;
floors.create(500, 1020, 'floor_small').flipX = true;
floors.create(500, 980, 'floor_diag').flipX = true;
floors.create(540, 1060, 'floor_diag').flipY = true;
floors.create(540, 1020, 'floor_small').flipY = true;
floors.create(540, 980, 'floor_small').flipX = true;
floors.create(540, 940, 'floor_diag').flipX = true;
floors.create(580, 1020, 'floor_diag').flipY = true;
floors.create(580, 980, 'floor_small').flipY = true;
floors.create(580, 940, 'floor_small').flipX = true;
floors.create(580, 900, 'floor_diag').flipX = true;
floors.create(620, 980, 'floor_diag').flipY = true;
floors.create(620, 940, 'floor_small').flipY = true;
floors.create(620, 900, 'floor_front');
floors.create(660, 940, 'floor_diag').flipY = true;
floors.create(660, 900, 'floor_bottom_small').flipY = true;
floors.create(700, 900, 'floor_tube_side');
floors.create(740, 900, 'floor_sidemiddle');

floors.create(380, 660, 'floor_sidemiddle').flipX = true;
floors.create(420, 660, 'floor_bottom_small').flipX = true;
floors.create(420, 620, 'floor_diag').flipX = true;
for (var i = 0; i < 4; i++) {
floors.create(460 + i * 40 , 660, 'floor_front').flipY = true;
}
floors.create(460, 620, 'floor_small').flipX = true;
floors.create(460, 580, 'floor_diag').flipX = true;
for (var i = 0; i < 4.; i++) {
floors.create(500 + i * 40, 620, 'floor_middle');
}
for (var i = 0; i < 4; i++) {
floors.create(500 + i * 40, 580, 'floor_front');
}
var floorflip2 = floors.create(620, 700, 'floor_diag');
floorflip2.flipX = true;
floorflip2.flipY = true;
var floorflip3 = floors.create(620, 660, 'floor_small');
floorflip3.flipX = true;
floorflip3.flipY = true;
floors.create(660, 580, 'floor_diag');
floors.create(660, 740, 'floor_topmiddle').flipY = true;
floors.create(660, 700, 'floor_middle_small').flipY = true;
floors.create(660, 660, 'floor_middle');
floors.create(660, 620, 'floor_small');
floors.create(700, 700, 'floor_diag').flipY = true;
floors.create(700, 660, 'floor_side_small');
floors.create(700, 620, 'floor_diag')
floors.create(740, 660, 'floor_sidemiddle')

floors.create(380, 460, 'floor_sidemiddle').flipX = true;
floors.create(420, 460, 'floor_bottom_small').flipX = true;
floors.create(420, 420, 'floor_diag').flipX = true;
for (var i = 0; i < 5; i++) {
floors.create(460 + i * 40, 460, 'floor_front').flipY = true;
}
floors.create(460, 420, 'floor_small').flipX = true;
floors.create(460, 380, 'floor_diag').flipX = true;
floors.create(500, 420, 'floor_middle');
floors.create(500, 380, 'floor_small').flipX = true;
floors.create(500, 340, 'floor_diag').flipX = true;
floors.create(540, 380, 'floor_middle');
floors.create(540, 340, 'floor_middle_small');
floors.create(540, 300, 'floor_topmiddle');
for (var i = 0; i < 2; i++) {
floors.create(540, 420 - i * 40, 'floor_middle');
floors.create(580 + i * 40, 340, 'floor_front');
floors.create(580, 420 - i * 40, 'floor_middle');
floors.create(620, 420 - i * 40, 'floor_middle');
}
floors.create(660, 460, 'floor_diag').flipY = true;
floors.create(660, 420, 'floor_small').flipY = true;
floors.create(660, 380, 'floor_small');
floors.create(660, 340, 'floor_diag');
floors.create(700, 420, 'floor_diag').flipY = true;
floors.create(700, 380, 'floor_bottom_small').flipY = true;
floors.create(740, 380, 'floor_tube_side');
floors.create(780, 380, 'floor_sidemiddle');

floors.create(620, 1140, 'floor_diag').flipX = true;
floors.create(700, 1100, 'floor_small').flipX = true;
floors.create(620, 1180, 'floor_small').flipX = true;
floors.create(740, 1180, 'floor_small');
floors.create(660, 1140, 'floor_small').flipX = true;
floors.create(660, 1100, 'floor_diag').flipX = true;
floors.create(700, 1060, 'floor_diag').flipX = true;
floors.create(700, 1140, 'floor_middle');
floors.create(740, 1080, 'floor_vertical1');

floors.create(820, 1000, 'floor_vertical2');

floors.create(740, 820, 'floor_sidemiddle').flipX = true;
floors.create(780, 820, 'floor_tube_side');
floors.create(820, 820, 'floor_sidemiddle');

floors.create(900, 1180, 'floor_small').flipX = true;
floors.create(900, 1140, 'floor_diag').flipX = true;
floors.create(940, 1180, 'floor_middle');
floors.create(940, 1140, 'floor_small').flipX = true;
floors.create(940, 1100, 'floor_diag').flipX = true;
floors.create(980, 1180, 'floor_small')
floors.create(980, 1100, 'floor_vertical3');

floors.create(900, 940, 'floor_sidemiddle').flipX = true;
for (var i = 0; i < 2; i++) {
floors.create(940 + i * 40, 940, 'floor_tube_side');
}
floors.create(1020, 940, 'floor_sidemiddle');

floors.create(940, 820, 'floor_sidemiddle').flipX = true;
for (var i = 0; i < 5; i++) {
floors.create(980 + i * 40, 820, 'floor_tube_side');
}
floors.create(1180, 820, 'floor_sidemiddle');

floors.create(1060, 620, 'floor_vertical5');

floors.create(780, 500, 'floor_sidemiddle').flipX = true;
for (var i = 0; i < 2; i++) {
floors.create(820 + i * 40, 500, 'floor_tube_side');
}
floors.create(900, 500, 'floor_bottom_middle_small');
floors.create(900, 460, 'floor_topmiddle');
for (var i = 0; i < 3; i++) {
floors.create(940 + i * 40, 500, 'floor_tube_side');
}
floors.create(1060, 500, 'floor_bottom_middle_small').flipY = true;
for (var i = 0; i < 3; i++) {
floors.create(1100 + i * 40, 500, 'floor_tube_side');
}
floors.create(1220, 500, 'floor_bottom_middle_small');
floors.create(1220, 460, 'floor_topmiddle');
for (var i = 0; i < 2; i++) {
floors.create(1260 + i * 40, 500, 'floor_tube_side');
}
floors.create(1340, 500, 'floor_sidemiddle');

floors.create(1060, 1120, 'floor_vertical4');

floors.create(900, 660, 'floor_sidemiddle').flipX = true;
floors.create(940, 660, 'floor_tube_side')
floors.create(980, 660, 'floor_sidemiddle')

floors.create(1100, 940, 'floor_sidemiddle').flipX = true;
for (var i = 0; i < 2; i++) {
floors.create(1140 + i * 40, 940, 'floor_tube_side');
}
floors.create(1220, 940, 'floor_sidemiddle');

floors.create(1140, 660, 'floor_sidemiddle').flipX = true;
floors.create(1180, 660, 'floor_tube_side')
floors.create(1220, 660, 'floor_sidemiddle')

floors.create(1020, 1180, 'floor_front');
floors.create(1060, 1180, 'floor_middle_small');
floors.create(1100, 1180, 'floor_front');

floors.create(1140, 1180, 'floor_small').flipX = true;
floors.create(1140, 1100, 'floor_vertical3').flipX = true;
floors.create(1140, 1060, 'floor_topmiddle')
floors.create(1180, 1180, 'floor_middle');
floors.create(1180, 1140, 'floor_small');
floors.create(1180, 1100, 'floor_diag');
floors.create(1220, 1180, 'floor_small');
floors.create(1220, 1140, 'floor_diag');

floors.create(1380, 1080, 'floor_vertical1').flipX = true;
floors.create(1380, 1180, 'floor_small').flipX = true;
floors.create(1420, 1180, 'floor_middle');
floors.create(1420, 1140, 'floor_middle');
floors.create(1420, 1100, 'floor_small');
floors.create(1420, 1060, 'floor_diag');
floors.create(1460, 1180, 'floor_middle');
floors.create(1460, 1140, 'floor_small');
floors.create(1460, 1100, 'floor_diag');
floors.create(1500, 1180, 'floor_small');
floors.create(1500, 1140, 'floor_diag');

floors.create(1780, 1180, 'floor_small').flipX = true;
floors.create(1780, 1140, 'floor_diag').flipX = true;
floors.create(1820, 1180, 'floor_middle');
floors.create(1820, 1140, 'floor_middle_small');
floors.create(1820, 1100, 'floor_topmiddle');
floors.create(1860, 1180, 'floor_small');
floors.create(1860, 1140, 'floor_diag')

floors.create(860, 340, 'floor_sidemiddle').flipX = true;
floors.create(900, 340, 'floor_bottom_small').flipX = true;
floors.create(900, 300, 'floor_side_small_line').flipX = true;
floors.create(900, 260, 'floor_topmiddle');
floors.create(940, 340, 'floor_bottom_small');
floors.create(940, 300, 'floor_diag');
floors.create(980, 360, 'floor_vertical9');

floors.create(1060, 340, 'floor_vertical10');
floors.create(980, 220, 'floor_sidemiddle').flipX = true;
var floorflip4 = floors.create(1020, 260, 'floor_diag');
floorflip4.flipX = true;
floorflip4.flipY = true;
floors.create(1020, 220, 'floor_side_small').flipX = true;
floors.create(1020, 180, 'floor_diag').flipX = true;
floors.create(1060, 260, 'floor_middle_small').flipY = true;
floors.create(1060, 220, 'floor_middle');
floors.create(1060, 180, 'floor_middle_small');
floors.create(1060, 140, 'floor_topmiddle');
floors.create(1100, 260, 'floor_diag').flipY = true;
floors.create(1100, 220, 'floor_side_small');
floors.create(1100, 180, 'floor_diag');
floors.create(1140, 220, 'floor_sidemiddle');

floors.create(1140, 360, 'floor_vertical9').flipX = true;
floors.create(1180, 340, 'floor_bottom_small').flipX = true;
floors.create(1180, 300, 'floor_diag').flipX = true;
floors.create(1220, 340, 'floor_bottom_small');
floors.create(1220, 300, 'floor_side_small_line');
floors.create(1220, 260, 'floor_topmiddle');
floors.create(1260, 340, 'floor_sidemiddle');

floors.create(1340, 380, 'floor_sidemiddle').flipX = true;
floors.create(1380, 380, 'floor_tube_side');
var floorflip5 = floors.create(1420, 380, 'floor_bottom_small');
floorflip5.flipX = true;
floorflip5.flipY = true;
var floorflip6 = floors.create(1420, 420, 'floor_diag');
floorflip6.flipX = true;
floorflip6.flipY = true;
var floorflip7 = floors.create(1460, 460, 'floor_diag');
floorflip7.flipX = true;
floorflip7.flipY = true;
var floorflip8 = floors.create(1460, 420, 'floor_small');
floorflip8.flipX = true;
floorflip8.flipY = true;
floors.create(1460, 380, 'floor_small').flipX = true;
floors.create(1460, 340, 'floor_diag').flipX = true;
for (var i = 0; i < 5; i++) {
floors.create(1500 + i * 40, 460, 'floor_front').flipY = true;
}
for (var i = 0; i < 2; i++) {
floors.create(1500 + i * 40, 340, 'floor_front');
floors.create(1500, 420 - i * 40, 'floor_middle');
floors.create(1540, 420 - i * 40, 'floor_middle');
floors.create(1580, 420 - i * 40, 'floor_middle');
}
floors.create(1580, 340, 'floor_middle_small');
floors.create(1580, 300, 'floor_topmiddle');
floors.create(1620, 420, 'floor_middle');
floors.create(1620, 380, 'floor_small');
floors.create(1620, 340, 'floor_diag');
floors.create(1660, 420, 'floor_small');
floors.create(1660, 380, 'floor_diag');
floors.create(1700, 420, 'floor_diag');
floors.create(1700, 460, 'floor_bottom_small');
floors.create(1740, 460, 'floor_sidemiddle');

floors.create(1380, 660, 'floor_sidemiddle').flipX = true;
var floorflip9 = floors.create(1420, 700, 'floor_diag');
floorflip9.flipX = true;
floorflip9.flipY = true;
floors.create(1420, 660, 'floor_side_small').flipX = true;;
floors.create(1420, 620, 'floor_diag').flipX = true;
floors.create(1460, 740, 'floor_topmiddle').flipY = true;
floors.create(1460, 700, 'floor_middle_small').flipY = true;
floors.create(1460, 660, 'floor_middle');
floors.create(1460, 620, 'floor_small').flipX = true;
floors.create(1460, 580, 'floor_diag').flipX = true;
floors.create(1500, 700, 'floor_diag').flipY = true;
floors.create(1500, 660, 'floor_small').flipY = true;
floors.create(1500, 620, 'floor_middle');
for (var i = 0; i < 4; i++) {
floors.create(1500 + i * 40, 580, 'floor_front');
floors.create(1500 + i * 40, 620, 'floor_middle');
floors.create(1540 + i * 40, 660, 'floor_front').flipY = true;
}
floors.create(1660, 620, 'floor_small');
floors.create(1660, 580, 'floor_diag');
floors.create(1700, 660, 'floor_bottom_small');
floors.create(1700, 620, 'floor_diag');
floors.create(1740, 660, 'floor_sidemiddle');

floors.create(1300, 820, 'floor_sidemiddle').flipX = true;
floors.create(1340, 820, 'floor_tube_side');
floors.create(1380, 820, 'floor_sidemiddle');

floors.create(1380, 900, 'floor_sidemiddle').flipX = true;
floors.create(1420, 900, 'floor_tube_side');
var floorflip10 = floors.create(1460, 900, 'floor_bottom_small');
floorflip10.flipX = true;
floorflip10.flipY = true;
var floorflip11 = floors.create(1460, 940, 'floor_diag');
floorflip11.flipX = true;
floorflip11.flipY = true;
var floorflip15 = floors.create(1500, 940, 'floor_small');
floorflip15.flipX = true;
floorflip15.flipY = true;
var floorflip15 = floors.create(1540, 980, 'floor_small');
floorflip15.flipX = true;
floorflip15.flipY = true;
var floorflip15 = floors.create(1580, 1020, 'floor_small');
floorflip15.flipX = true;
floorflip15.flipY = true;
var floorflip12 = floors.create(1500, 980, 'floor_diag');
floorflip12.flipX = true;
floorflip12.flipY = true;
floors.create(1500, 900, 'floor_front');
var floorflip13 = floors.create(1540, 1020, 'floor_diag');
floorflip13.flipX = true;
floorflip13.flipY = true;
floors.create(1540, 940, 'floor_small');
floors.create(1540, 900, 'floor_diag');
var floorflip14 = floors.create(1580, 1060, 'floor_diag');
floorflip14.flipX = true;
floorflip14.flipY = true;
floors.create(1580, 980, 'floor_small');
floors.create(1580, 940, 'floor_diag');
floors.create(1620, 1060, 'floor_front').flipY = true;
floors.create(1620, 1020, 'floor_small');
floors.create(1620, 980, 'floor_diag');
floors.create(1660, 1060, 'floor_bottom_small');
floors.create(1660, 1020, 'floor_diag');
floors.create(1700, 1060, 'floor_sidemiddle');

floors.create(1660, 900, 'floor_sidemiddle').flipX = true;
floors.create(1700, 900, 'floor_tube_side');
floors.create(1740, 840, 'floor_vertical6').flipX = true;
floors.create(1740, 900, 'floor_bottom_small').flipX = true;
floors.create(1780, 900, 'floor_front').flipY = true;
floors.create(1780, 860, 'floor_middle');
floors.create(1780, 820, 'floor_front');
floors.create(1820, 900, 'floor_front').flipY = true;
floors.create(1820, 860, 'floor_small');
floors.create(1820, 820, 'floor_diag');
floors.create(1860, 900, 'floor_bottom_small');
floors.create(1860, 860, 'floor_diag');
floors.create(1900, 900, 'floor_tube_side');
floors.create(1940, 900, 'floor_tube_side');
floors.create(1980, 900, 'floor_sidemiddle');

floors.create(1820, 620, 'floor_sidemiddle').flipX = true;
var floorflip14 = floors.create(1860, 660, 'floor_diag');
floorflip14.flipX = true;
floorflip14.flipY = true;
floors.create(1860, 620, 'floor_triple_small').flipX = true;
floors.create(1860, 580, 'floor_topmiddle');
var floorflip14 = floors.create(1900, 700, 'floor_diag');
floorflip14.flipX = true;
floorflip14.flipY = true;
floors.create(1900, 660, 'floor_diag_small');
floors.create(1900, 620, 'floor_diag');
floors.create(1940, 700, 'floor_bottom_small');
floors.create(1940, 660, 'floor_diag');
floors.create(1980, 700, 'floor_sidemiddle');

floors.create(1900, 780, 'floor_sidemiddle').flipX = true;
for (var i = 0; i < 4; i++) {
floors.create(1940 + i * 40, 780, 'floor_tube_side');
}

floors.create(1300, 1000, 'floor_vertical2');

floors.create(1780, 1020, 'floor_sidemiddle').flipX = true;
floors.create(1820, 1020, 'floor_tube_side');
floors.create(1860, 1020, 'floor_sidemiddle');

floors.create(1940, 1060, 'floor_sidemiddle').flipX = true;
floors.create(1980, 1020, 'floor_diag').flipX = true;
floors.create(1980, 1060, 'floor_bottom_small').flipX = true;
floors.create(2020, 1020, 'floor_small').flipX = true;
floors.create(2020, 980, 'floor_diag').flipX = true;
floors.create(2020, 1060, 'floor_front').flipY = true;
floors.create(2060, 1060, 'floor_front').flipY = true;
floors.create(2060, 1020, 'floor_middle');
floors.create(2060, 980, 'floor_small').flipX = true;
floors.create(2060, 940, 'floor_diag').flipX = true;

floors.create(2100, 400, 'floor_bigvertical').flipX = true;
floors.create(2100, 780, 'floor_side_small').flipX = true;
floors.create(2100, 860, 'floor_vertical8').flipX = true;
floors.create(2100, 940, 'floor_small').flipX = true;
for (var i = 0; i < 2; i++) {
floors.create(2100, 980 + i * 40, 'floor_middle');
}
var floorflip14 = floors.create(2100, 1060, 'floor_small');
floorflip14.flipX = true;
floorflip14.flipY = true;
floors.create(2100, 1120, 'floor_vertical7').flipX = true;
floors.create(2100, 1180, 'floor_small').flipX = true;
for (var i = 0; i < 2; i++) {
floors.create(660 + i * 40, 1180, 'floor_middle');
}
for (var i = 0; i < 3; i++) {
floors.create(780 + i * 40, 1180, 'floor_front');
floors.create(1260 + i * 40, 1180, 'floor_front');

}
for (var i = 0; i < 5; i++) {
floors.create(60 + i * 40, 1180, 'floor_front');
floors.create(1900 + i * 40, 1180, 'floor_front');
}
for (var i = 0; i < 6; i++) {
floors.create(380 + i * 40, 1180, 'floor_front');
floors.create(1540 + i * 40, 1180, 'floor_front');
}
//bullets
    bullets = this.physics.add.group()
      bullet1 = bullets.create( 30, 30, 'bullet1')
      bullet1.setActive(false);
      bullet1.setVisible(false);
      bullet1.body.allowGravity = false;
      bullet2 = bullets.create( 30, 30, 'bullet1')
      bullet2.setActive(false);
      bullet2.setVisible(false);
      bullet2.body.allowGravity = false;
      bullet3 = bullets.create( 30, 30, 'bullet1')
      bullet3.setActive(false);
      bullet3.setVisible(false);
      bullet3.body.allowGravity = false;
      bullet4 = bullets.create( 30, 30, 'bullet1')
      bullet4.setActive(false);
      bullet4.setVisible(false);
      bullet4.body.allowGravity = false;
      bullet5 = bullets.create( 30, 30, 'bullet1')
      bullet5.setActive(false);
      bullet5.setVisible(false);
      bullet5.body.allowGravity = false;
      bullet6 = bullets.create( 30, 30, 'bullet1')
      bullet6.setActive(false);
      bullet6.setVisible(false);
      bullet6.body.allowGravity = false;
      bullet7 = bullets.create( 30, 30, 'bullet1')
      bullet7.setActive(false);
      bullet7.setVisible(false);
      bullet7.body.allowGravity = false;
//colliders
    this.physics.add.collider(character, floors);
    var ha = this.physics.add.overlap(bullet1, floors, bullethitfloor1)
    this.physics.add.overlap(floors, bullet2, bullethitfloor2)
    this.physics.add.overlap(floors, bullet3, bullethitfloor3)
    this.physics.add.overlap(floors, bullet4, bullethitfloor4)
    this.physics.add.overlap(floors, bullet5, bullethitfloor5)
    this.physics.add.overlap(floors, bullet6, bullethitfloor6)
    this.physics.add.overlap(floors, bullet7, bullethitfloor7)
    function bullethitfloor1() {
      bullet1.setActive(false);
      bullet1.setVisible(false);
    }
    function bullethitfloor2() {
      bullet2.setActive(false);
      bullet2.setVisible(false);
    }
    function bullethitfloor3() {
      bullet3.setActive(false);
      bullet3.setVisible(false);
    }
    function bullethitfloor4() {
      bullet4.setActive(false);
      bullet4.setVisible(false);
    }
    function bullethitfloor5() {
      bullet5.setActive(false);
      bullet5.setVisible(false);
    }
    function bullethitfloor6() {
      bullet6.setActive(false);
      bullet6.setVisible(false);
    }
    function bullethitfloor7() {
      bullet7.setActive(false);
      bullet7.setVisible(false);
    }
//key on
    key_ESC.on('up', function () {
      this.scene.start('menu')
    },this)
    key_1.on('down', function () {
      CanMove = true;
    })
    key_2.on('down', function () {
      CanMove = true;
    })
    key_Space.on('down', function () {
      if (CanMove == true) {
        if (character.body.touching.left && character.body.touching.down != true) {
          CanMove = false;
          character.setVelocityX(200);
          character.setVelocityY(-250);
          character.anims.play('walljump');
          character.on('animationcomplete', function () {
            CanMove = true;
         })
        }
        else if (character.body.touching.right && character.body.touching.down != true) {
          CanMove = false;
          character.setVelocityX(-200);
          character.setVelocityY(-250);
          character.anims.play('walljump');
          character.on('animationcomplete', function () {
            CanMove = true;
         })
        }
      }
    })
    key_Shift.on('down', function () {
      //dash
      if (CanMove == true) {
          if (character.body.velocity.x > 0) {
            CanMove = false;
            character.setVelocityX(350);
            character.anims.play('dash');
            character.on('animationcomplete', function () {
              CanMove = true
              character.setVelocityX(200);
           })
          }
          else if (character.body.velocity.x < 0) {
            CanMove = false;
            character.setVelocityX(-350);
            character.anims.play('dash')
            character.on('animationcomplete', function () {
              CanMove = true
              character.setVelocityX(-200);
           })
          }
       }
    })
	}

  update(){
    if (this.input.activePointer.isDown) {
      if (bulletcooldown <= 0) {
        var thebullet = bullets.getFirstDead(false);
        console.log(thebullet);
        thebullet.x = gun.x;
        thebullet.y = gun.y;
        thebullet.setActive(true);
        thebullet.setVisible(true);
        bulletcooldown = 30
        thebullet.rotation = gun.rotation;
        this.physics.velocityFromRotation(thebullet.rotation, 600, thebullet.body.velocity);
      }
    }
    bulletcooldown -= 1
    if (this.input.activePointer.worldX > character.x) {
      character.flipX = false;
    }
    else {
      character.flipX = true;
    }
    gun.rotation = Phaser.Math.Angle.Between(gun.x, gun.y, this.input.activePointer.worldX , this.input.activePointer.worldY);
    gun.x = character.x;
    gun.y = character.y + 5;
   if (CanMove == true) {
     if (key_D.isDown && character.body.velocity.x !== 350) {
          character.setVelocityX(speed);
     }
     else if (key_A.isDown && character.body.velocity.x !== -350) {
       character.setVelocityX(-speed);
     }
     else if (key_A.isUp && key_D.isUp){
       character.setVelocityX(0);
     }
     if (key_Space.isDown) {
       console.log(character.body.touching.left);
       if (character.body.touching.down) {
         character.setVelocityY(-400);
       }
     }
     else if(key_W.isDown && character.body.touching.down){
       character.setVelocityY(-400);
     }
     else {
     }
   }
  }
}
