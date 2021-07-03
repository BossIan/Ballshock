import {address} from './enterip';
import io from 'socket.io-client';
var key_1;
var key_2;
var key_W;
var key_A;
var key_S;
var key_D;
var key_Space;
var key_ESC;
var invincible = false;
var invincibletimer = 60;
var testspeed = 0;
var CanMove = true;
var key_Q;
var key_R;
var key_E;
var key_Shift;
var socket = 0;
var speed = 200;
var floors;
var gun;
var otherPlayer;
var otherName;
var otherGun;
var otherHp;
var spawned = false;
var player;
var otherbullet;
var thebullet;
var bulletspread;
var bulletspeed;
var bulletcooldown = 0;
var bulletcooldownconfig;
var bulletspread;
var bulletdamage;
var Health;
var healthtext;
var myid;
var name;
var map;
var ping;
var connectingtext;
var loadoutrect;
var loadouttext;
var selectedloadout;
var afterimagesec = 0;
var afterimage;
export default class multilevel extends Phaser.Scene {
  constructor(){
    super({key: "multilevel"});
  }
	preload(){
    connectingtext = this.add.text(1000, 600, 'Connecting to ' + address, { font: '50px Corbel', fill: '#000000' });
    this.load.setPath('assets/');
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
}
	create(){
    Health = 100;
    var savedname = JSON.parse(localStorage.getItem('name'));
    var self = this;
    var spawnfirst = true;
//loadouts
    var savedloadout1 = JSON.parse(localStorage.getItem('loadout1'));
    var savedloadout2 = JSON.parse(localStorage.getItem('loadout2'));
    var savedloadout3 = JSON.parse(localStorage.getItem('loadout3'));
    selectedloadout = savedloadout1;
    if (savedloadout1 == null) {
      savedloadout1 = {gun: 'gun1',character: 'Char1', secondary: '', }
      savedloadout2 = {gun: 'AncientDischargeGun',character: 'Char1', secondary: '', }
      savedloadout3 = {gun: 'gun1',character: 'Char1', secondary: '', }
      localStorage.setItem('loadout1',JSON.stringify(savedloadout1));
      localStorage.setItem('loadout2',JSON.stringify(savedloadout2));
      localStorage.setItem('loadout3',JSON.stringify(savedloadout3));
    }
    //images
    var characterselect = this.add.image(1060, 590, selectedloadout.character, 0).setScale(2.5, 2.5).setVisible(true).setScrollFactor(0).setDepth(61);
    var gunselect = this.add.image(996, 455.6, selectedloadout.gun).setScale(2, 2).setVisible(true).setScrollFactor(0).setDepth(61);
    //rectangles
		var characterrect = this.add.image(1060, 590, '128rectangle').setScale(2 , 1.1).setVisible(true).setScrollFactor(0).setDepth(59)
		loadoutrect = this.add.rectangle(1060, 800, 500, 128).setScale(0.5 , 0.5).setVisible(true).setInteractive().setScrollFactor(0).setDepth(59);
    loadoutrect.isFilled = true;
    loadoutrect.fillColor = 2630692;
    var spawnrect = this.add.rectangle(1060, 725, 500, 128).setScale(0.5 , 0.5).setVisible(false).setInteractive().setScrollFactor(0).setDepth(59);
    spawnrect.isFilled = true;
    spawnrect.fillColor = 2630692;
		var secondaryrect = this.add.image(1060, 455.6, '128rectangle').setOrigin(0, 0.5).setVisible(true).setScrollFactor(0).setDepth(59);
		var primaryrect = this.add.image(1060, 455.6, '128rectangle').setVisible(true).setOrigin(1, 0.5).setScrollFactor(0).setDepth(59)
    var rect1 = this.add.image(967, 720, 'button1', 1).setScale(0.5, 0.5).setOrigin(0.5, 0.5).setVisible(true).setInteractive().setScrollFactor(0).setDepth(59);
    var rect2 = this.add.image(1060, 720, 'button2', 0).setScale(0.5, 0.5).setOrigin(0.5, 0.5).setVisible(true).setInteractive().setScrollFactor(0).setDepth(59);
    var rect3 = this.add.image(1153, 720, 'button3', 0).setScale(0.5, 0.5).setVisible(true).setOrigin(0.5, 0.5).setInteractive().setScrollFactor(0).setDepth(59);
    var loadoutopened = true;
//texts
    loadouttext = this.add.text(1060, 800, "Loadout", {}).setScale(2, 2).setOrigin(0.5, 0.5).setVisible(true).setScrollFactor(0).setDepth(60);
    var spawntext = this.add.text(1060, 725, "Spawn", {}).setScale(2, 2).setOrigin(0.5, 0.5).setVisible(false).setScrollFactor(0).setDepth(60);
    var charactertext = this.add.text(1060, 620, "Character", {"color":"#050101ff"}).setScale(2, 2).setOrigin(0.5, 0).setVisible(true).setScrollFactor(0).setDepth(60);
		var primary = this.add.text(996, 500, "Primary", {"color":"#060606ff"}).setOrigin(0.5, 0).setVisible(true).setScrollFactor(0).setDepth(60).setDepth(60);
		var secondary = this.add.text(1124, 500, "Secondary", {"color":"#000000ff"}).setOrigin(0.5, 0).setVisible(true).setScrollFactor(0).setDepth(60);
//camera
    var camera = self.cameras.main;
    camera.setZoom(2.5)
    camera.setBackgroundColor('#646464');
//multiplayer
    this.otherPlayers = this.physics.add.group();
    this.otherGuns = this.physics.add.group();
    this.otherNames = this.add.group();
    this.otherHps = this.add.group();
    this.otherbullets = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    }
    function gunconfig() {
      if (selectedloadout.gun == 'gun1') {
        bulletspread = 30
        bulletspeed = 600
        bulletcooldownconfig = 15
      }
      else if (selectedloadout.gun == 'AncientDischargeGun') {
        bulletspread = 100
        bulletspeed = 1200
        bulletcooldownconfig = 150
      }
    }
    function addPlayer(self, playerInfo, availablenumber) {
      self.character = self.physics.add.sprite(80, 1100, selectedloadout.character, 0).setDepth(34);
      afterimage = self.physics.add.image(self.character.x , self.character.y, selectedloadout.character + 'Afterimage').setDepth(33)
      afterimage.body.allowGravity = false;
      name = self.add.text(1060, 600 - 35, savedname, { font: '15px Corbel', fill: '#000000' }).setDepth(36).setScrollFactor(0);
      name.setOrigin( 0.5, 0);
      myid = playerInfo.playerId;
      camera.startFollow(self.character);
      self.character.anims.play('dash')
      socket.emit('playeranim', { curanim: self.character.anims.currentAnim.key})
      gun = self.add.image(self.character.x, self.character.y, selectedloadout.gun).setDepth(36);
      self.character.body.collideWorldBounds = true;
      healthtext = self.add.image( 1060, 600 + 25, 'hpbar').setDepth(36).setScrollFactor(0).setScale(0.5, 0.5);
      healthtext.setOrigin( 0.5, 0);
      spawned = true;
//bullets
          self.otherbullets[0] = self.physics.add.group()
          for (var i = 0; i < 20; i++) {
            self.otherbullets[0].create( 30, 30, selectedloadout.gun + 'Bullet').setDepth(34).setActive(false).setVisible(false).body.allowGravity = false;
          }
          var namenumber = 0;
          self.otherbullets[0].getChildren().forEach(function (bullet) {
            namenumber += 1;
            bullet.name = 'bullet' + namenumber;
            self.physics.add.overlap(floors, bullet,
            function () {
              bullet.setVelocity(0, 0)
              bullet.setActive(false)
              bullet.setVisible(false)
            })
          });
//character collider
      self.physics.add.collider(self.character, floors)

      for (var i = 1; i < 11; i++) {
        if (availablenumber[i] == null && self.character.playernumber == undefined) {
          availablenumber[i] = true;
          self.character.playernumber = i;
          console.log('You are player ' + i);
          socket.emit('playernumberupdate', i)
            socket.emit('data', {name: savedname, loadout: selectedloadout})
            gunconfig()
        }
      }
    }
    function addOtherPlayers(self, playerInfo) {
      otherPlayer = self.otherPlayers.create(playerInfo.x, playerInfo.y, playerInfo.playercharacter, 0);
      otherPlayer.body.allowGravity = false;
      otherPlayer.playerId = playerInfo.playerId;
      otherGun = self.otherGuns.create(playerInfo.x, playerInfo.y + 13, playerInfo.playergun)
      otherGun.body.allowGravity = false;
      otherGun.playerId = playerInfo.playerId;
      self.otherbullets[playerInfo.playernumber] = self.physics.add.group();
      if (playerInfo.playername != '') {
        otherName = self.add.text(playerInfo.x, playerInfo.y - 35, playerInfo.playername, { font: '15px Corbel', fill: '#000000' }).setDepth(30);
        otherName.setOrigin( 0.5, 0);
        otherName.playerId = playerInfo.playerId;
        self.otherNames.add(otherName);
      }
      otherHp = self.add.image(playerInfo.x, playerInfo.y + 25, 'otherhpbar').setDepth(30).setScale(0.5, 0.5);
      otherHp.setOrigin( 0.5, 0);
      otherHp.playerId = playerInfo.playerId;
      self.otherHps.add(otherHp);
      //depth
      var a = 33;
      for (var i = 0; i < 10; i++) {
        var depth1 = a - i
        var depth2 = a - i - 1
        var depth3 = a - i - 2
        otherPlayer.setDepth(depth2);
        otherGun.setDepth(depth1);
        a -= 2;
      }
      //otherbullets
      for (var i = 0; i < 20; i++) {
        self.otherbullets[playerInfo.playernumber].create(playerInfo.x, playerInfo.y + 13, playerInfo.playergun + 'Bullet').setDepth(depth3).setActive(false).setVisible(false).body.allowGravity = false;
      }
      var namenumber = 0;
      self.otherbullets[0].getChildren().forEach(function (otherbullet) {
        self.physics.add.overlap(otherPlayer, otherbullet,
          function () {
            if (otherbullet.active) {
              otherbullet.setActive(false)
              otherbullet.setVisible(false)
            }
          }
        )
      })
      self.otherbullets[playerInfo.playernumber].getChildren().forEach(function (otherbullet) {
        self.physics.add.overlap(self.character, otherbullet,
          function () {
            if (otherbullet.active) {
              Health -= bulletdamage
              otherbullet.setActive(false)
              otherbullet.setVisible(false)
              socket.emit('healthupdate', { hp: Health})
              socket.emit('bullethit', otherbullet.name)
            }
          }
        )
        self.physics.add.overlap(floors, otherbullet,
          function () {
            if (otherbullet.active) {
              otherbullet.setActive(false)
              otherbullet.setVisible(false)
            }
            otherbullet.setVelocity(0, 0)
          }
        )
        namenumber += 1;
        otherbullet.name = 'bullet' + namenumber;
        otherbullet.body.allowGravity = false;
  })
  }
//keys
    key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    key_Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    key_Shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    floors = this.physics.add.staticGroup();
//characteranimations
    this.anims.create({
      key: 'dash',
      repeat: 0,
      frameRate: 5,
      frames: this.anims.generateFrameNumbers(selectedloadout.character)
    });
    this.anims.create({
      key: 'walljump',
      repeat: 0,
      frameRate: 5,
      frames: this.anims.generateFrameNumbers(selectedloadout.character + 'Walljump')
    });
//floors
          floors = this.physics.add.staticGroup()
//on
    rect1.on('pointerup', function () {
      rect1.setFrame(1);
      rect2.setFrame(0);
      rect3.setFrame(0);
      selectedloadout = savedloadout1;
      characterselect.setTexture(savedloadout1.character)
      gunselect.setTexture(savedloadout1.gun)
   });
    rect2.on('pointerup', function () {
      rect1.setFrame(0);
      rect2.setFrame(1);
      rect3.setFrame(0);
      selectedloadout = savedloadout2;
      characterselect.setTexture(savedloadout2.character)
      gunselect.setTexture(savedloadout2.gun)
   });
    rect3.on('pointerup', function () {
      rect1.setFrame(0);
      rect2.setFrame(0);
      rect3.setFrame(1);
      selectedloadout = savedloadout3;
      characterselect.setTexture(savedloadout3.character)
      gunselect.setTexture(savedloadout3.gun)
   });
    loadoutrect.on('pointerup', function () {
      spawntext.setVisible(loadoutopened)
      spawnrect.setVisible(loadoutopened)
     if (loadoutopened) {
       loadoutopened = false
     }
     else {
       loadoutopened = true
     }
     characterselect.setVisible(loadoutopened)
     gunselect.setVisible(loadoutopened)
     secondaryrect.setVisible(loadoutopened)
     primaryrect.setVisible(loadoutopened)
     characterrect.setVisible(loadoutopened)
     rect1.setVisible(loadoutopened)
     rect2.setVisible(loadoutopened)
     rect3.setVisible(loadoutopened)
     charactertext.setVisible(loadoutopened)
     primary.setVisible(loadoutopened)
     secondary.setVisible(loadoutopened)
    });
    spawnrect.on('pointerup', function () {
     if (spawnfirst) {
//socket
       socket = io('http://' + address, {
        reconnection: false,
        reconnectionDelayMax: 10000,
       });
       socket.on('connect_error', function () {
         console.log('Connection Error');
         self.scene.start('menu')
       });
       socket.on('connect',function(){
         connectingtext.destroy();
         console.log('Connected to ' + address);
         ping = self.add.text( 1340, 375, 'ping: ', { font: '20px', fill: '#000000' }).setScrollFactor(0).setDepth(30);
       });
       setInterval(() => {
        const start = Date.now();
        socket.volatile.emit("ping", () => {
        const latency = Date.now() - start;
        ping.text = 'ping: ' + latency;
        });
      }, 2500);
   //otherPlayers
       socket.on('currentPlayers', function (players) {
           addPlayer(self, players.player, players.availablenumber);
           Object.keys(players.player).forEach(function (id) {
             if (players.player[id].playerId === socket.id) {
               map = players.player[id].map;
               if (map == 'Remnants') {

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
         }
             } else {
               addOtherPlayers(self, players.player[id]);
             }
           });
         });
       socket.on('newPlayer', function (playerInfo) {
         addOtherPlayers(self, playerInfo);
         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
           if (playerInfo.playerId === otherPlayer.playerId) {
             otherName = self.add.text(playerInfo.x, playerInfo.y - 35, playerInfo.playername, { font: '15px Corbel', fill: '#000000' });
             otherName.setOrigin( 0.5, 0);
             otherName.playerId = playerInfo.playerId;
             self.otherNames.add(otherName);
           }
         });
       });
       socket.on('disconnected', function (playerInfo) {
        if (spawned) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
         if (playerInfo.playerId === otherPlayer.playerId) {
         otherPlayer.destroy();
         }
        });
        self.otherGuns.getChildren().forEach(function (otherGun) {
         if (playerInfo.playerId === otherGun.playerId) {
         otherGun.destroy();
         }
        });
        self.otherNames.getChildren().forEach(function (otherName) {
         if (playerInfo.playerId === otherName.playerId) {
         otherName.setVisible(false);
         otherName.destroy();
         }
        });
        self.otherHps.getChildren().forEach(function (otherHp) {
         if (playerInfo.playerId === otherHp.playerId) {
         otherHp.destroy();
         }
        })
       }
       });
       socket.on('spawnplayers',function (players) {
         Object.keys(players).forEach(function (id) {
             if (players[id].playerId === socket.id) {
             } else {
               addOtherPlayers(self, players[id]);
             }
         })
       });
       socket.on('alived', function (playerInfo) {
         if (spawned) {
         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
           if (playerInfo.playerId === otherPlayer.playerId) {
             otherPlayer.setVisible(playerInfo.playeralive);
             otherPlayer.setActive(playerInfo.playeralive);
           }
         });
         self.otherGuns.getChildren().forEach(function (otherGun) {
           if (playerInfo.playerId === otherGun.playerId) {
             otherGun.setVisible(playerInfo.playeralive);
           }
         });
         self.otherNames.getChildren().forEach(function (otherName) {
           if (playerInfo.playerId === otherName.playerId) {
             otherName.setVisible(playerInfo.playeralive);
           }
         });
         self.otherHps.getChildren().forEach(function (otherHp) {
           if (playerInfo.playerId === otherHp.playerId) {
             otherHp.setVisible(playerInfo.playeralive);
           }
         });
       }
       });
       socket.on('deaded', function (playerInfo) {
         if (spawned) {
         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
           if (playerInfo.playerId === otherPlayer.playerId) {
             otherPlayer.setVisible(playerInfo.playeralive);
             otherPlayer.setActive(playerInfo.playeralive);
           }
         });
         self.otherGuns.getChildren().forEach(function (otherGun) {
           if (playerInfo.playerId === otherGun.playerId) {
             otherGun.setVisible(playerInfo.playeralive);
           }
         });
         self.otherNames.getChildren().forEach(function (otherName) {
           if (playerInfo.playerId === otherName.playerId) {
             otherName.setVisible(playerInfo.playeralive);
           }
         });
         self.otherHps.getChildren().forEach(function (otherHp) {
           if (playerInfo.playerId === otherHp.playerId) {
             otherHp.setVisible(playerInfo.playeralive);
           }
         });
       }
       });
       socket.on('playerMoved', function (playerInfo) {
         if (spawned) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerInfo.playerId === otherPlayer.playerId) {
           otherPlayer.setPosition(playerInfo.x, playerInfo.y);
          }
        });
        self.otherGuns.getChildren().forEach(function (otherGun) {
          if (playerInfo.playerId === otherGun.playerId) {
           otherGun.setPosition(playerInfo.x, playerInfo.y + 13)
          }
        });
        self.otherNames.getChildren().forEach(function (otherName) {
          if (playerInfo.playerId === otherName.playerId) {
           otherName.setPosition(playerInfo.x, playerInfo.y - 35)
          }
        });
        self.otherHps.getChildren().forEach(function (otherHp) {
          if (playerInfo.playerId === otherHp.playerId) {
            otherHp.setPosition(playerInfo.x, playerInfo.y + 25)
          }
        });
      }
      });
       socket.on('bulletMovemented', function (playerInfo) {
         if (spawned) {
         var bulletx;
         var bullety;
         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
           if (playerInfo.player.playerId === otherPlayer.playerId) {
             bulletx = playerInfo.player.bulletx;
             bullety = playerInfo.player.bullety;
           }
         })
        self.otherbullets[playerInfo.player.playernumber].getChildren().forEach(function (otherbullet) {
         if (otherbullet.name == playerInfo.bulletname) {
          otherbullet.setPosition(bulletx, bullety)
          }
        });
       }
       });
       socket.on('bullethitted', function (playerInfo) {
         if (spawned) {
        self.otherbullets[playerInfo.player.playernumber].getChildren().forEach(function (otherbullet) {
         if (otherbullet.name == playerInfo.bulletname) {
           otherbullet.setActive(false)
           otherbullet.setVisible(false)
         }
        });
       }
       });
       socket.on('bulletshotted', function (playerInfo) {
       if (spawned) {
        self.otherbullets[playerInfo.player.playernumber].getChildren().forEach(function (otherbullet){
          if (otherbullet.name == playerInfo.bulletname) {
            otherbullet.setPosition(playerInfo.player.x, playerInfo.player.y + 10);
            otherbullet.setActive(true);
            otherbullet.setVisible(true);
            otherbullet.setVelocity(playerInfo.bulletvelocityX, playerInfo.bulletvelocityY)
            if (playerInfo.player.playergun == 'gun1') {
              bulletdamage = 10
            }
            else if (playerInfo.player.playergun == 'AncientDischargeGun') {
              bulletdamage = 8
            }
          }
        })
       }
       });
       socket.on('gunRotated', function (playerInfo) {
         if (spawned) {
        self.otherGuns.getChildren().forEach(function (otherGun) {
         if (playerInfo.playerId === otherGun.playerId) {
          otherGun.rotation = playerInfo.gunrotation
         }
        });
      }
       });
       socket.on('playeranimed', function (playerInfo) {
         if (spawned) {
         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
           if (playerInfo.playerId === otherPlayer.playerId) {
             otherPlayer.play(playerInfo.curanim);
           }
         });
       }
       });
       socket.on('playerfliped', function (playerInfo) {
         if (spawned) {
         self.otherPlayers.getChildren().forEach(function (otherPlayer) {
           if (playerInfo.playerId === otherPlayer.playerId) {
             otherPlayer.flipX = playerInfo.flipped;
           }
         });
       }
       });
       socket.on('healthupdated', function (playerInfo) {
         if (spawned) {
        self.otherHps.getChildren().forEach(function (otherHp) {
         if (playerInfo.playerId === otherHp.playerId) {
          otherHp.setCrop(0, 0, playerInfo.health / 100 * 100, 8)
         }
        });
      }
       });
       socket.on('changedloadout', function (playerInfo) {
         if (spawned) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerInfo.playerId === otherPlayer.playerId) {
           otherPlayer.setTexture(playerInfo.playercharacter);
          }
        });
        self.otherGuns.getChildren().forEach(function (otherGun) {
          if (playerInfo.playerId === otherGun.playerId) {
           otherGun.setTexture(playerInfo.playergun)
          }
        });
        self.otherbullets[playerInfo.playernumber].getChildren().forEach(function (otherbullet){
          otherbullet.setTexture(playerInfo.playergun + 'Bullet')
        })
      }
      });
        spawnfirst = false;
     }
     else {
      if (Health <= 0) {
          gunconfig();
          gun.setTexture(selectedloadout.gun)
          self.otherbullets[0].getChildren().forEach(function (bullet) {
            bullet.setTexture(selectedloadout.gun + 'Bullet')
          })
          socket.emit('changeloadout', selectedloadout)
          characterselect.setVisible(false)
          gunselect.setVisible(false)
          secondaryrect.setVisible(false)
          primaryrect.setVisible(false)
          characterrect.setVisible(false)
          rect1.setVisible(false)
          rect2.setVisible(false)
          rect3.setVisible(false)
          charactertext.setVisible(false)
          primary.setVisible(false)
          secondary.setVisible(false)
          loadoutrect.setVisible(false)
          loadouttext.setVisible(false)
          self.character.setActive(true);
          self.character.setVisible(true);
          gun.setVisible(true);
          name.setVisible(true);
          healthtext.setVisible(true);
          Health = 100
          socket.emit('healthupdate', { hp: Health})
          CanMove = true;
          var randomLocation = Phaser.Math.Between(0, 100);
          if (randomLocation <= 25) {
            self.character.setPosition(80, 1140);
          }
          else if (randomLocation > 25 && randomLocation <= 50) {
            self.character.setPosition(2000, 1140);
          }
          else if (randomLocation > 50 && randomLocation <= 75) {
            self.character.setPosition(600, 300);
          }
          else {
            self.character.setPosition(1500, 300);
          }
          socket.emit('alive')
      }
    }
    spawntext.setVisible(false)
    spawnrect.setVisible(false)
    loadoutrect.setVisible(false)
    loadouttext.setVisible(false)

    })
    key_ESC.on('up', function () {
      if (spawned) {
        self.character.destroy();
        gun.destroy();
        self.otherbullets[0].destroy();
      }
      spawned = false;
      this.scene.start('menu')
      socket.disconnect();
    },this)
    key_R.on('down', function () {
      if (Health <= 0) {
          gunconfig();
          gun.setTexture(selectedloadout.gun)
          self.otherbullets[0].getChildren().forEach(function (bullet) {
            bullet.setTexture(selectedloadout.gun + 'Bullet')
          })
          socket.emit('changeloadout', selectedloadout)
        characterselect.setVisible(false)
        gunselect.setVisible(false)
        secondaryrect.setVisible(false)
        primaryrect.setVisible(false)
        characterrect.setVisible(false)
        rect1.setVisible(false)
        rect2.setVisible(false)
        rect3.setVisible(false)
        charactertext.setVisible(false)
        primary.setVisible(false)
        secondary.setVisible(false)
        loadoutrect.setVisible(false)
        loadouttext.setVisible(false)
        self.character.setActive(true);
        self.character.setVisible(true);
        gun.setVisible(true);
        name.setVisible(true);
        healthtext.setVisible(true);
        Health = 100
        socket.emit('healthupdate', { hp: Health})
        CanMove = true;
        var randomLocation = Phaser.Math.Between(0, 100);
        if (randomLocation <= 25) {
          self.character.setPosition(80, 1140);
        }
        else if (randomLocation > 25 && randomLocation <= 50) {
          self.character.setPosition(2000, 1140);
        }
        else if (randomLocation > 50 && randomLocation <= 75) {
          self.character.setPosition(600, 300);
        }
        else {
          self.character.setPosition(1500, 300);
        }
        socket.emit('alive')
      }
    })
    key_1.on('down', function () {
      CanMove = true;
    })
    key_2.on('down', function () {
      CanMove = true;
    })
    key_Space.on('down', function () {
      if (CanMove == true) {
        if (spawned) {
          if (self.character.body.touching.left && self.character.body.touching.down != true) {
            CanMove = false;
            self.character.setVelocityX(200);
            self.character.setVelocityY(-250);
            self.character.anims.play('walljump');
            afterimage.setPosition(self.character.x , self.character.y)
            afterimage.setVisible(true)
            afterimagesec = 60
            socket.emit('playeranim', { curanim: self.character.anims.currentAnim.key})
            self.character.on('animationcomplete', function () {
              CanMove = true;
           })
          }
          else if (self.character.body.touching.right && self.character.body.touching.down != true) {
            CanMove = false;
            self.character.setVelocityX(-200);
            self.character.setVelocityY(-250);
            self.character.anims.play('walljump');
            afterimage.setPosition(self.character.x , self.character.y)
            afterimage.setVisible(true)
            afterimagesec = 60
            socket.emit('playeranim', { curanim: self.character.anims.currentAnim.key})
            self.character.on('animationcomplete', function () {
              CanMove = true;
           })
          }
        }
      }
    })
    key_Shift.on('down', function () {
      //dash
      if (CanMove == true) {
          if (self.character.body.velocity.x > 0) {
            CanMove = false;
            self.character.setVelocityX(350);
            self.character.anims.play('dash')
            afterimage.setPosition(self.character.x , self.character.y)
            afterimage.setVisible(true)
            afterimagesec = 60
            socket.emit('playeranim', { curanim: self.character.anims.currentAnim.key})
            self.character.on('animationcomplete', function () {
              CanMove = true
              self.character.setVelocityX(200);
           })
          }
          else if (self.character.body.velocity.x < 0) {
            CanMove = false;
            self.character.setVelocityX(-350);
            self.character.anims.play('dash')
            afterimage.setPosition(self.character.x , self.character.y)
            afterimage.setVisible(true)
            afterimagesec = 60
            socket.emit('playeranim', { curanim: self.character.anims.currentAnim.key})
            self.character.on('animationcomplete', function () {
              CanMove = true
              self.character.setVelocityX(-200);
           })
          }
       }
    })
	}
  update(){
    if (spawned) {
      bulletcooldown -= 1
      if (this.character.active == true) {
        if (this.input.activePointer.isDown) {
          if (bulletcooldown <= 0) {
              var thebullet = this.otherbullets[0].getFirstDead(false);
              thebullet.setDepth(12);
              thebullet.x = gun.x;
              thebullet.y = gun.y;
              thebullet.setActive(true);
              thebullet.setVisible(true);
              var bulletspreadcalc = Phaser.Math.Between(bulletspread, -bulletspread);
              thebullet.rotation = gun.rotation + bulletspreadcalc * 0.01;
              var bulletvelocity = this.physics.velocityFromRotation(thebullet.rotation, bulletspeed, thebullet.body.velocity);
              var thebulletvelocityY = bulletvelocity.y;
              var thebulletvelocityX = bulletvelocity.x;
              socket.emit('bulletshot', {name: thebullet.name, velocityY: thebulletvelocityY, velocityX: thebulletvelocityX})
            if (selectedloadout.gun == 'AncientDischargeGun') {
              for (var i = -3; i < 3; i++) {
                var thebullet = this.otherbullets[0].getFirstDead(false);
                thebullet.x = gun.x;
                thebullet.y = gun.y;
                thebullet.setActive(true);
                thebullet.setVisible(true);
                var bulletspreadcalc = Phaser.Math.Between(bulletspread, -bulletspread);
                thebullet.rotation = gun.rotation + i * 0.2;
                var bulletvelocity = this.physics.velocityFromRotation(thebullet.rotation, bulletspeed, thebullet.body.velocity);
                var thebulletvelocityY = bulletvelocity.y + bulletspreadcalc;
                var thebulletvelocityX = bulletvelocity.x + bulletspreadcalc;
                thebullet.body.velocity.y = thebulletvelocityY
                thebullet.body.velocity.x = thebulletvelocityX
                socket.emit('bulletshot', {name: thebullet.name, velocityY: thebulletvelocityY, velocityX: thebulletvelocityX})
              }
            }
            bulletcooldown = bulletcooldownconfig
          }
        }
      }
      if (Health <= 0) {
        loadoutrect.setVisible(true)
        loadouttext.setVisible(true)
        CanMove = false;
        healthtext.setVisible(false);
        this.character.setActive(false);
        this.character.setVisible(false);
        gun.setVisible(false);
        name.setVisible(false);
        socket.emit('dead')
      }
      else {
        healthtext.setCrop(0, 0, Health / 100 * 100, 8)
      }
//pointer
      var pointx = this.input.activePointer.worldX;
      var pointy = this.input.activePointer.worldY;
//gun
      gun.x = this.character.x;
      gun.y = this.character.y + 10;
      if (this.input.activePointer.oldPosition && (pointx !== this.input.activePointer.oldPosition.pointx || pointy !== this.input.activePointer.oldPosition.pointy)) {
        gun.rotation = Phaser.Math.Angle.Between(gun.x, gun.y, this.input.activePointer.worldX , this.input.activePointer.worldY);
        socket.emit('gunRotatement', { gunrotation: gun.rotation})
        if (this.input.activePointer.worldX > this.character.x) {
          this.character.flipX = false;
          socket.emit('playerflip', { flipped: this.character.flipX})
        }
        else {
          this.character.flipX = true;
          socket.emit('playerflip', { flipped: this.character.flipX})
        }
      }
      else {
      }
      this.input.activePointer.oldPosition = {
        pointx: this.input.activePointer.worldX,
        pointy: this.input.activePointer.worldY,
      }


//movement
        if (CanMove == true) {
          if (key_D.isDown && this.character.body.velocity.x !== 350) {
               this.character.setVelocityX(speed);
          }
          else if (key_A.isDown && this.character.body.velocity.x !== -350) {
            this.character.setVelocityX(-speed);
          }
          else if (key_A.isUp && key_D.isUp){
            this.character.setVelocityX(0);
          }
          if (key_Space.isDown && this.character.body.touching.down) {
            this.character.setVelocityY(-375);
          }
          else if(key_W.isDown && this.character.body.touching.down){
            this.character.setVelocityY(-375);
          }
        }
// emit player movement
        if (this.character) {
          var x = this.character.x;
          var y = this.character.y;
          if (this.character.oldPosition && (x !== this.character.oldPosition.x || y !== this.character.oldPosition.y)) {
            socket.emit('playerMovement', { x: this.character.x, y: this.character.y})
          }
          this.character.oldPosition = {
            x: this.character.x,
            y: this.character.y,
          }
        }
//afterimage
        afterimage.setPosition(this.character.x, this.character.y)
        //this.physics.moveToObject(afterimage, this.character, 350);
        afterimagesec -= 1
        if (afterimagesec <= 0) {
          afterimage.setVisible(false)
        }
       }
    }
}
