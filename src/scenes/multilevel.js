import {socket} from './lobby'
import {roomId} from './lobby'
import {map} from './room'
var disconnected = false;
var smalljoystick;
var key_W;
var key_A;
var key_S;
var key_D;
var key_Space;
var CanMove
var speed = 195;
var acceleration = 15;
var primarygun;
var spawned = false;
var name;
var leaderboardnames = [];
var leaderboardkills = [];
var leaderboarddeaths = [];
var mobile = false;
var shootMobile = false;
var primary = {
  bulletspread: 0,
  bulletspeed: 0,
  bulletcooldownconfig: 0,
  bulletcooldown: 0,
  recoil: 0,
  overheatadd: 0,
  overheat: 0,
};
var secondary = {
  bulletspread: 0,
  bulletspeed: 0,
  bulletcooldownconfig: 0,
  bulletcooldown: 0,
  recoil: 0,
  overheatadd: 0,
  overheat: 0,
};
var selectedgun;
var Health;
var overheatgrpx;
var overheattext;
var healthbar;
var selectedloadout;
var afterimage;
var myid;
var morekill = 0;
var ping;
var elevator;
var playsoundprimary;
var playsoundsecondary;
var overheatsound;
var cam;
export default class multilevel extends Phaser.Scene {
  constructor(){
    super({key: "multilevel"});
  }
	preload(){
    if (map == 'remnants') {
      this.load.setPath('assets/maps/remnants');
      this.load.image('healthpack', 'healthpack.png')
      this.load.spritesheet('healthstation', 'healthstation.png', {frameWidth: 40, frameHeight: 40})
      this.load.image('elevator', 'elevator.png')
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
    this.load.setPath('assets/ui/mobile');
    this.load.image('pause', 'pause/Default.png')
    this.load.image('shoot', 'shoot/Default.png')
    this.load.image('sprint', 'sprint/Default.png')
    this.load.image('change', 'change/Default.png')
  }
	create(){
    CanMove = true
    Health = 100;
//loadout layer
    {
    var savedname = JSON.parse(localStorage.getItem('name'));
    var self = this;
    var spawnfirst = true;
//loadouts
    var savedloadout1 = JSON.parse(localStorage.getItem('loadout1'));
    var savedloadout2 = JSON.parse(localStorage.getItem('loadout2'));
    var savedloadout3 = JSON.parse(localStorage.getItem('loadout3'));
    selectedloadout = savedloadout1;
    //images
    var characterselect = this.add.image(1060, 590, 'Character', 0).setScale(1.75, 1.75).setScrollFactor(0).setDepth(61);
    var playerselect = this.add.image(1060, 590, selectedloadout.character, 0).setScale(1.75, 1.75).setScrollFactor(0).setDepth(62);
    var primaryselect = this.add.image(996, 455.6, selectedloadout.primary).setScale(1.75, 1.75).setScrollFactor(0).setDepth(61);
    var secondaryselect = this.add.image(1124, 455.6, selectedloadout.secondary).setScale(1.75, 1.75).setScrollFactor(0).setDepth(61);
    //rectangles
		var loadoutrect = this.add.rectangle(1060, 800, 500, 128).setScale(0.5 , 0.5).setInteractive({useHandCursor: true}).setScrollFactor(0).setDepth(59);
    loadoutrect.isFilled = true;
    loadoutrect.fillColor = 2630692;
    var spawnrect = this.add.rectangle(1060, 725, 500, 128).setScale(0.5 , 0.5).setVisible(false).setInteractive({useHandCursor: true}).setScrollFactor(0).setDepth(59);
    spawnrect.isFilled = true;
    spawnrect.fillColor = 2630692;
    var characterrect = this.add.image(1060, 590, '256rectangle').setScale(1 , 1).setScrollFactor(0).setDepth(59)
    var primaryrect = this.add.image(1060, 455.6, '128rectangle').setOrigin(1, 0.5).setScrollFactor(0).setDepth(59)
		var secondaryrect = this.add.image(1060, 455.6, '128rectangle').setOrigin(0, 0.5).setScrollFactor(0).setDepth(59);
    var rect1 = this.add.image(967, 720, 'button1', 1).setScale(0.5, 0.5).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true}).setScrollFactor(0).setDepth(59);
    var rect2 = this.add.image(1060, 720, 'button2', 0).setScale(0.5, 0.5).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true}).setScrollFactor(0).setDepth(59);
    var rect3 = this.add.image(1153, 720, 'button3', 0).setScale(0.5, 0.5).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true}).setScrollFactor(0).setDepth(59);
//texts
    var loadouttext = this.add.text(1060, 800, "Loadout", {}).setScale(2, 2).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(60);
    var spawntext = this.add.text(1060, 725, "Spawn", {}).setScale(2, 2).setOrigin(0.5, 0.5).setVisible(false).setScrollFactor(0).setDepth(60);
    var charactertext = this.add.text(1060, 620, "Character", {"color":"#050101ff"}).setScale(2, 2).setOrigin(0.5, 0).setScrollFactor(0).setDepth(60);
		var primarytext = this.add.text(996, 500, "Primary", {"color":"#060606ff"}).setOrigin(0.5, 0).setScrollFactor(0).setDepth(60).setDepth(60);
		var secondarytext = this.add.text(1124, 500, "Secondary", {"color":"#000000ff"}).setOrigin(0.5, 0).setScrollFactor(0).setDepth(60);
		var pauseBtn = this.add.image(1400, 405, 'pause').setOrigin(0, 0.5).setScrollFactor(0).setDepth(59).setInteractive().on('pointerdown', function () {
      spawned = false;
      socket.disconnect();
      ping.destroy()
      self.scene.start('menu')
    })

    //mobile 
    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
      mobile = true
      this.input.addPointer(5);
      var shootBtn = this.add.image(1320, 790, 'shoot').setOrigin(0, 0.5).setScrollFactor(0).setDepth(30).setInteractive().on('pointerdown', function () {
        shootMobile = true
      })
      shootBtn.on('pointerup', function () {
        shootMobile = false;
      })
      var sprintBtn = this.add.image(1220, 790, 'sprint').setOrigin(0, 0.5).setScrollFactor(0).setDepth(30).setInteractive().on('pointerdown', function () {
        key_Shift = true;
      })
      sprintBtn.on('pointerup', function () {
        key_Shift = false;
      })
      var changeBtn = this.add.image(1060, 790, 'change').setOrigin(0, 0.5).setScrollFactor(0).setDepth(30).setInteractive().on('pointerdown', function () {
        if (selectedgun == 'secondary') {
          CanMove = true;
          selectedgun = 'primary'
          primarygun.setTexture(selectedloadout.primary)
          socket.emit('changeloadout', {character: selectedloadout.character, gun: primarygun.texture.key})
        }
        else {
          CanMove = true;
          selectedgun = 'secondary'
          primarygun.setTexture(selectedloadout.secondary)
          socket.emit('changeloadout', {character: selectedloadout.character, gun: primarygun.texture.key})
        }
      })
      var joystick = this.add.ellipse(800, 720, 200, 200).setScrollFactor(0).setDepth(30).setInteractive();
      smalljoystick = this.add.ellipse(800, 720, 50, 50, '#000000').setDepth(30).setVisible(false);
      this.input.on('pointermove', function (pointer) {
        if(!pointer.isDown){
          self.activeMobile = false
        }
        if(!self.activeMobile) return
          smalljoystick.setVisible(false)
         primarygun.rotation = Phaser.Math.Angle.Between(joystick.x, joystick.y, self.input.activePointer.x + 400, self.input.activePointer.y - 200);
         socket.emit('gunRotatement', { gunrotation: primarygun.rotation})
            if (joystick.x < self.input.activePointer.x + 400) {
              self.player.flipX = false;
              self.character.flipX = false;
            socket.emit('playerflip', { flipped: self.player.flipX})
           }
           else if (joystick.x > self.input.activePointer.x + 400) {
            self.player.flipX = true;
            self.character.flipX = true;
            socket.emit('playerflip', { flipped: self.player.flipX})
           }
         if (self.moveMobile) {
          if (joystick.x < self.input.activePointer.x + 400) {
             key_D.isDown = true
             key_A.isDown = false
          }
          else if (joystick.x > self.input.activePointer.x + 400) {
            key_A.isDown = true
            key_D.isDown = false
          }
          if (joystick.y < self.input.activePointer.y - 250) {
              key_S.isDown = true
              for (var i = 1; i < elevator.children.size + 1; i++) {
                elevator[i].body.checkCollision.up = false;
                setTimeout(function () {
                  this.body.checkCollision.up = true;
                }.bind(elevator[i]), 500)
              }
          } else if(joystick.y > self.input.activePointer.y -70){
            key_W.isDown = true
  
          }
          else{
            key_S.isDown = false
            key_W.isDown = false
  
          }
         }
      }
      )
      joystick.on('pointerdown', function () {
        self.activeMobile = true;
      })
      joystick.on('pointerout', function () {
        self.moveMobile = true;
      }
      ) 
      joystick.on('pointerover', function () {
        self.moveMobile = false;
        key_D.isDown = false
        key_A.isDown = false
        key_S.isDown = false
        key_W.isDown = false
      }
      )
      joystick.isFilled = true;
    }
   
    var loadoutopened = true;
    var loadoutselection = this.add.layer().setDepth(60);
    loadoutselection.add(primarytext)
    loadoutselection.add(secondarytext);
    loadoutselection.add(charactertext)
    loadoutselection.add(primaryrect)
    loadoutselection.add(secondaryrect)
    loadoutselection.add(characterrect)
    loadoutselection.add(secondaryselect)
    loadoutselection.add(primaryselect)
    loadoutselection.add(playerselect)
    loadoutselection.add(characterselect)}
//camera
    var camera = self.cameras.main;
    camera.setZoom(2.5)
    camera.setBackgroundColor('#646464');
//multiplayer
    var healthstation = {}
    var healthpack = {}
    elevator = this.physics.add.group()
    this.otherPlayers = this.physics.add.group();
    this.otherGuns = this.physics.add.group();
    this.otherNames = this.add.group();
    this.otherHps = this.add.group();
    this.otherAfterimages = this.physics.add.group();
    this.otherbullets = {}
    this.otherCharacters = this.physics.add.group();
    var gun1damage = 10
    var AncientDischargeGundamage = 13
    var ThunderScreamGundamage = 80
    var SolFlairGundamage = 25
    var Boomsmithdamage = 35
    var SuperchargedFractaldamage = 3
    function gunconfig() {
      if (selectedloadout.primary == 'gun1') {
        primary.bulletspread = 30
        primary.bulletspeed = 600
        primary.bulletcooldownconfig = 0.1 * 60
        primary.recoil = 15
        primary.overheatadd = 8
      }
      else if (selectedloadout.primary == 'AncientDischargeGun') {
        primary.bulletspread = 100
        primary.bulletspeed = 1200
        primary.bulletcooldownconfig = 0.7 * 60
        primary.recoil = 405
        primary.overheatadd = 40
      }
      else if (selectedloadout.primary == 'ThunderScreamGun') {
        primary.bulletspread = 0
        primary.bulletspeed = 500
        primary.bulletcooldownconfig = 1 * 60
        primary.recoil = 330
        primary.overheatadd = 60
      }
      else if (selectedloadout.primary == 'Boomsmith') {
        primary.bulletspread = 10
        primary.bulletspeed = 570
        primary.bulletcooldownconfig = 0.25 * 60
        primary.recoil = 150
        primary.overheatadd = 50
      }
      if (selectedloadout.secondary == 'SolFlairGun') {
        secondary.bulletspread = 10
        secondary.bulletspeed = 400
        secondary.bulletcooldownconfig = 0.7 * 60
        secondary.recoil = 30
        secondary.overheatadd = 35
      }
      else if (selectedloadout.secondary == 'SuperchargedFractal') {
        secondary.bulletspread = 50
        secondary.bulletspeed = 750
        secondary.bulletcooldownconfig = 0.1 * 60
        secondary.recoil = 15
        secondary.overheatadd = 5
      }
    }
    function addPlayer(self, playerInfo, players) {
      morekill = 0;
      selectedgun = 'primary';
      self.player = self.physics.add.sprite(80, 1100, 'Character', 0).setDepth(35);
      self.player.playerId = socket.id;
      self.character = self.physics.add.sprite(80, 1100, selectedloadout.character, 0).setDepth(35);
      self.character.body.allowGravity = false;
      afterimage = self.physics.add.image(self.player.x , self.player.y, 'Character' + 'Afterimage').setDepth(33).setVisible(false)
      self.player.setMaxVelocity(405)
      afterimage.body.allowGravity = false;
      name = self.add.text(self.player.x, self.player.y, savedname, { font: '15px Corbel', fill: '#FFFFFF' }).setDepth(36)
      name.setOrigin( 0.5, 0);
      cam = self.physics.add.image(self.player.x , self.player.y, 'Character' + 'Afterimage').setVisible(false)
      cam.body.allowGravity = false;
      camera.startFollow(cam);
      self.player.anims.play('dash')
      socket.emit('playeranim', { curanim: self.player.anims.currentAnim.key})
      primarygun = self.add.image(self.player.x, self.player.y, selectedloadout.primary).setDepth(36);
      self.player.body.collideWorldBounds = true;
      healthbar = self.add.image( self.player.x, self.player.y, 'hpbar').setDepth(36).setScale(0.5, 0.5).setDepth(36)
      overheattext = self.add.sprite( self.player.x, self.player.y , 'overheattext', 0).setDepth(36).setVisible(false);
      overheatgrpx = self.add.image( 1060, 635 , 'overheatbar').setDepth(36).setScrollFactor(0).setScale(0.5, 0.5).setOrigin( 0.5, 0);
      spawned = true;
//character collider
      self.physics.add.collider(self.player, floors)
      self.physics.add.collider(self.player, elevator)
      socket.emit('data', {name: savedname, character: selectedloadout.character, gun: primarygun.texture.key})
      //otherbullets
      var namenumber = 0;
      Object.keys(players).forEach(function (id) {
        if (players[id].room !== roomId) return
        if (socket.id == id) return
        self.otherbullets[id].getChildren().forEach(function (otherbullet) {
        self.physics.add.overlap(self.player, otherbullet,
          function () {
            if (otherbullet.texture.key == 'BoomsmithBullet') return
            if (otherbullet.active && self.player.active) {
              otherbullet.body.allowGravity = false;
              if (otherbullet.texture.key == 'gun1Bullet') {
                Health -= gun1damage
              }
              else if (otherbullet.texture.key == 'AncientDischargeGunBullet') {
                Health -= AncientDischargeGundamage
              }
              else if (otherbullet.texture.key == 'ThunderScreamGunBullet') {
                Health -= ThunderScreamGundamage
              }
              else if (otherbullet.texture.key == 'SolFlairGunBullet') {
                Health -= SolFlairGundamage
              }
              else if (otherbullet.texture.key == 'SuperchargedFractalBullet') {
                Health -= SuperchargedFractaldamage
              }
              if (Health <= 0) {
                spawnrect.setVisible(true)
                spawntext.setVisible(true)
                loadoutrect.setVisible(true)
                loadouttext.setVisible(true)
                CanMove = false;
                self.player.setVelocity(0, 0)
                healthbar.setVisible(false);
                self.player.setActive(false);
                self.player.setVisible(false);
                self.character.setVisible(false);
                primarygun.setVisible(false);
                name.setVisible(false);
                socket.emit('dead', {killed: myid, killer: otherbullet.playerId})
              }
              else {
                healthbar.setCrop(0, 0, Health / 100 * 100, 8)
              }
              otherbullet.setActive(false)
              otherbullet.setVisible(false)
              socket.emit('healthupdate', { hp: Health})
              socket.emit('bullethit', {name: otherbullet.name, player: otherbullet.playerId})
            }
          }
        )
      })
      })
      for (var i = 1; i < 8; i++) {
        healthpack[i].name = i
        self.physics.add.overlap(healthpack[i], self.player,
          function (healthpack) {
            if (healthpack.active) {
              healthpack.setVisible(false)
              healthpack.setActive(false)
              if (Health >= 100) {
                Health = 100
              }
              else if (Health <= 0) {
              }
              else {
                Health += 30
              }
              healthbar.setCrop(0, 0, Health / 100 * 100, 8)
              socket.emit('healthpackGot', healthpack.name)
              socket.emit('healthupdate', { hp: Health})
            }
        })
      }
      gunconfig()
    }
    function addOtherPlayers(self, playerInfo) {
      var otherPlayer = self.otherPlayers.create(playerInfo.x, playerInfo.y, 'Character', 0);
      otherPlayer.body.allowGravity = false;
      otherPlayer.playerId = playerInfo.playerId;
      var otherCharacter = self.otherCharacters.create(playerInfo.x, playerInfo.y, playerInfo.playercharacter, 0);
      otherCharacter.body.allowGravity = false;
      otherCharacter.playerId = playerInfo.playerId;
      var otherAfterimage = self.otherAfterimages.create(playerInfo.x, playerInfo.y, 'CharacterAfterimage', 0).setVisible(false);
      otherAfterimage.body.allowGravity = false;
      otherAfterimage.playerId = playerInfo.playerId;
      otherAfterimage.setVisible(false)
      var otherGun = self.otherGuns.create(playerInfo.x, playerInfo.y + 13, playerInfo.playergun)
      otherGun.body.allowGravity = false;
      otherGun.playerId = playerInfo.playerId;
      var otherName = self.add.text(playerInfo.x, playerInfo.y - 35, playerInfo.playername, { font: '15px Corbel', fill: '#FFFFFF' }).setDepth(30);
      otherName.setOrigin( 0.5, 0);
      otherName.playerId = playerInfo.playerId;
      self.otherNames.add(otherName);
      var otherHp = self.add.image(playerInfo.x, playerInfo.y + 25, 'otherhpbar').setDepth(30).setScale(0.5, 0.5);
      otherHp.setOrigin( 0.5, 0);
      otherHp.playerId = playerInfo.playerId;
      self.otherHps.add(otherHp);
      let a = 30;
      for (let i = 0; i < 10; i++) {
        let depth1 = a - i
        let depth2 = a - i - 1
        let depth3 = a - i - 2
        otherPlayer.setDepth(depth2);
        otherCharacter.setDepth(depth2);
        otherGun.setDepth(depth1);
        a -= 2;
      }
    }
    function disconnect() {
      disconnected = true;
    var disconlayer = self.add.layer().setDepth(60);
     var disconnectrect = self.add.rectangle(1060, 600, 400, 200).setScrollFactor(0).setDepth(60);
      disconnectrect.isFilled = true;
      disconnectrect.fillColor = 3223857;
      disconnectrect.isStroked = true;
      disconnectrect.strokeColor = 0;
      disconnectrect.lineWidth = 10;
     var quitrect = self.add.rectangle(1160, 665, 100, 40).setInteractive({useHandCursor: true}).setScrollFactor(0).setDepth(60);
      quitrect.isFilled = true;
      quitrect.fillColor = 10490647;
      quitrect.isStroked = true;
      quitrect.strokeColor = 921102;
      quitrect.lineWidth = 5;
     var retryrect = self.add.rectangle(960, 665, 100, 40).setInteractive({useHandCursor: true}).setScrollFactor(0).setDepth(60);
      retryrect.isFilled = true;
      retryrect.fillColor = 8516894;
      retryrect.isStroked = true;
      retryrect.strokeColor = 0;
      retryrect.lineWidth = 5;
     var quittext = self.add.text(1160, 665, "Quit", {"color":"#000000ff"}).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(60);
     var disconnectedtext = self.add.text(1060, 550, "You have been disconnected.", {"color":"#919191ff","fontSize":"20px","stroke":"#686161ff"}).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(60);
     var retrytext = self.add.text(960, 665, "Retry", {"color":"#171111ff"}).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(60);
     disconlayer.add(disconnectrect);
     disconlayer.add(quitrect);
     disconlayer.add(retryrect);
     disconlayer.add(quittext);
     disconlayer.add(disconnectedtext);
     disconlayer.add(retrytext);
     quitrect.on('pointerup', function () {
       if (spawned) {
         self.player.destroy();
         primarygun.destroy();
         healthbar.destroy();
         name.destroy();
         afterimage.destroy();
         self.otherbullets[myid].destroy()
       }
       spawned = false;
       ping.destroy();
       socket.disconnect();
       self.scene.start('menu')
    });
     retryrect.on('pointerup', function () {
       setTimeout(function () {
        disconnected = false;
       socket.emit('dead', {killed: myid, killer: myid})
       spawnrect.setVisible(true)
       spawntext.setVisible(true)
       loadoutrect.setVisible(true)
       loadouttext.setVisible(true)
       CanMove = false;
       self.player.setVelocity(0, 0)
       retryrect.setVisible(false)
       quitrect.setVisible(false)
       healthbar.setVisible(false);
       self.player.setActive(false);
       self.player.setVisible(false);
       self.character.setVisible(false);
       primarygun.setVisible(false);
       name.setVisible(false);
       Health = 0
       healthbar.setCrop(0, 0, Health / 100 * 100, 8)
       socket.emit('healthupdate', { hp: Health})
       disconlayer.setVisible(false)
     }, 2500)
       setTimeout(function () {
        gunconfig();
        loadoutselection.setVisible(false)
        rect1.setVisible(false)
        rect2.setVisible(false)
        rect3.setVisible(false)
        loadoutrect.setVisible(false)
        loadouttext.setVisible(false)
        self.player.setActive(true);
        self.player.setVisible(true);
        self.character.setVisible(true);
        primarygun.setVisible(true);
        name.setVisible(true);
        healthbar.setVisible(true);
        if (selectedgun == 'primary') {
          primarygun.setTexture(selectedloadout.primary)
        }
        else {
          primarygun.setTexture(selectedloadout.secondary)
        }
        Health = 100
        healthbar.setCrop(0, 0, Health / 100 * 100, 8)
        socket.emit('healthupdate', { hp: Health})
        CanMove = true;
        var randomLocation = Phaser.Math.Between(0, 100);
        if (randomLocation <= 25) {
          self.player.setPosition(80, 1140);
        }
        else if (randomLocation > 25 && randomLocation <= 50) {
          self.player.setPosition(2000, 1140);
        }
        else if (randomLocation > 50 && randomLocation <= 75) {
          self.player.setPosition(600, 300);
        }
        else {
          self.player.setPosition(1500, 300);
        }
        socket.emit('alive')
      }, 2500)
    });
  }
    this.game.events.off("blur", this.game.onGameBlur, this.game, false);
    this.game.events.off("hidden", this.game.onHidden, this.game, false);
    this.game.events.off("visible", this.game.onVisible, this.game, false);
//keys
    var key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    var key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    key_Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    var key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    var key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    var key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    var key_Shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    var floors = this.physics.add.staticGroup();
//characteranimations
    this.anims.create({
      key: 'dash',
      repeat: 0,
      frameRate: 5,
      frames: this.anims.generateFrameNumbers('Character')
    });
    this.anims.create({
      key: 'walljump',
      repeat: 0,
      frameRate: 5,
      frames: this.anims.generateFrameNumbers('Character' + 'Walljump')
    });
    this.anims.create({
      key: 'healthstationidle',
      repeat: 0,
      frameRate: 15,
      frames: this.anims.generateFrameNumbers('healthstation')
    });
    this.anims.create({
      key: 'overheat!',
      repeat: 0,
      frameRate: 30,
      frames: this.anims.generateFrameNumbers('overheattext'),
      hideOnComplete: true
    });
    this.anims.create({
      key: 'BoomsmithBoomAnim',
      repeat: 0,
      frameRate: 60,
      frames: this.anims.generateFrameNumbers('BoomforgedBlast'),
      hideOnComplete: true
    });
//audio
    this.sound.add('SFX_AncientDischargeGunBullet')
    this.sound.add('SFX_ThunderScreamGunBullet')
    this.sound.add('SFX_gun1Bullet')
    this.sound.add('SFX_BoomsmithBullet')
    this.sound.add('SFX_Boomsmith_Explosion')
    this.sound.add('SFX_SolFlairGunBullet')
    this.sound.add('SFX_Gun_Overheat')
    playsoundprimary = function () {
      let sounds = self.sound.get('SFX_' + selectedloadout.primary + 'Bullet')
      sounds.pan = 0
      sounds.volume = 1
      sounds.play()
    }
    playsoundsecondary = function () {
      let sounds = self.sound.get('SFX_' + selectedloadout.secondary + 'Bullet')
      sounds.pan = 0
      sounds.volume = 1
      sounds.play()
    }
    overheatsound = function () {
      let sounds = self.sound.get('SFX_Gun_Overheat')
      sounds.pan = 0
      sounds.volume = 1
      sounds.play()
    }

//floors
    floors = this.physics.add.staticGroup()
//on
    rect1.on('pointerup', function () {
      rect1.setFrame(1);
      rect2.setFrame(0);
      rect3.setFrame(0);
      selectedloadout = savedloadout1;
      playerselect.setTexture(savedloadout1.character)
      primaryselect.setTexture(savedloadout1.primary)
      secondaryselect.setTexture(savedloadout1.secondary)
   });
    rect2.on('pointerup', function () {
      rect1.setFrame(0);
      rect2.setFrame(1);
      rect3.setFrame(0);
      selectedloadout = savedloadout2;
      playerselect.setTexture(savedloadout2.character)
      primaryselect.setTexture(savedloadout2.primary)
      secondaryselect.setTexture(savedloadout2.secondary)

   });
    rect3.on('pointerup', function () {
      rect1.setFrame(0);
      rect2.setFrame(0);
      rect3.setFrame(1);
      selectedloadout = savedloadout3;
      playerselect.setTexture(savedloadout3.character)
      primaryselect.setTexture(savedloadout3.primary)
      secondaryselect.setTexture(savedloadout3.secondary)
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
     loadoutselection.setVisible(loadoutopened)
     rect1.setVisible(loadoutopened)
     rect2.setVisible(loadoutopened)
     rect3.setVisible(loadoutopened)
    });
    spawnrect.on('pointerup', function () {
    if (spawned == false) {
      socket.emit('spawn', function (player, players) {
        addPlayer(self, player, players)
      })
    }
    if (Health <= 0) {
      setTimeout(function () {
        gunconfig();
        loadoutselection.setVisible(false)
        rect1.setVisible(false)
        rect2.setVisible(false)
        rect3.setVisible(false)
        loadoutrect.setVisible(false)
        loadouttext.setVisible(false)
        self.player.setActive(true);
        self.player.setVisible(true);
        self.character.setVisible(true);
        primarygun.setVisible(true);
        name.setVisible(true);
        healthbar.setVisible(true);
        if (selectedgun == 'primary') {
          primarygun.setTexture(selectedloadout.primary)
        }
        else {
          primarygun.setTexture(selectedloadout.secondary)
        }
        Health = 100
        healthbar.setCrop(0, 0, Health / 100 * 100, 8)
        socket.emit('healthupdate', { hp: Health})
        CanMove = true;
        var randomLocation = Phaser.Math.Between(0, 100);
        if (randomLocation <= 25) {
          self.player.setPosition(80, 1140);
        }
        else if (randomLocation > 25 && randomLocation <= 50) {
          self.player.setPosition(2000, 1140);
        }
        else if (randomLocation > 50 && randomLocation <= 75) {
          self.player.setPosition(600, 300);
        }
        else {
          self.player.setPosition(1500, 300);
        }
        socket.emit('changeloadout', {character: selectedloadout.character, gun: primarygun.texture.key})
        socket.emit('alive')
      }, 2500)
      }
    spawntext.setVisible(false)
    spawnrect.setVisible(false)
    loadoutrect.setVisible(false)
    loadouttext.setVisible(false)
    })
    key_ESC.on('up', function () {
      spawned = false;
      socket.disconnect();
      ping.destroy()
      this.scene.start('menu')
    },this)
    key_S.on('down', function () {
      for (var i = 1; i < elevator.children.size + 1; i++) {
        elevator[i].body.checkCollision.up = false;
        setTimeout(function () {
          this.body.checkCollision.up = true;
        }.bind(elevator[i]), 500)
      }
    })
    key_1.on('down', function () {
      CanMove = true;
      selectedgun = 'primary'
      primarygun.setTexture(selectedloadout.primary)
      socket.emit('changeloadout', {character: selectedloadout.character, gun: primarygun.texture.key})
    })
    key_2.on('down', function () {
      CanMove = true;
      selectedgun = 'secondary'
      primarygun.setTexture(selectedloadout.secondary)
      socket.emit('changeloadout', {character: selectedloadout.character, gun: primarygun.texture.key})
    })
    key_Space.on('down', function () {
      if (CanMove == true) {
        if (spawned) {
          if (self.player.body.touching.left && self.player.body.touching.down != true) {
            self.player.setVelocityX(200);
            self.player.setVelocityY(-250);
            self.player.anims.play('walljump');
            afterimage.setPosition(self.player.x , self.player.y)
            afterimage.setVisible(true)
            socket.emit('playeranim', { curanim: self.player.anims.currentAnim.key})
            self.player.on('animationcomplete', function () {
              afterimage.setVisible(false)
           })
          }
          else if (self.player.body.touching.right && self.player.body.touching.down != true) {
            self.player.setVelocityX(-200);
            self.player.setVelocityY(-250);
            self.player.anims.play('walljump');
            afterimage.setPosition(self.player.x , self.player.y)
            afterimage.setVisible(true)
            socket.emit('playeranim', { curanim: self.player.anims.currentAnim.key})
            self.player.on('animationcomplete', function () {
              afterimage.setVisible(false)
           })
          }
        }
      }
    })
    key_Shift.on('down', function () {
      //dash
      if (CanMove == true) {
        if (spawned) {
           if (key_D.isDown) {
            self.player.setVelocityX(345);
            self.player.anims.play('dash')
            afterimage.setPosition(self.player.x , self.player.y)
            afterimage.setVisible(true)
            socket.emit('playeranim', { curanim: self.player.anims.currentAnim.key})
            self.player.on('animationcomplete', function () {
              afterimage.setVisible(false)
           })
          }
            else if (key_A.isDown) {
            self.player.setVelocityX(-345);
            self.player.anims.play('dash')
            afterimage.setPosition(self.player.x , self.player.y)
            afterimage.setVisible(true)
            socket.emit('playeranim', { curanim: self.player.anims.currentAnim.key})
            self.player.on('animationcomplete', function () {
              afterimage.setVisible(false)
           })
           }
        }
       }
    })
//socket
      socket.off()
      socket.emit('ingame')
      myid = socket.id
      ping = this.add.text( 1300, 375, 'ping: ', { font: '20px', fill: '#FFFFFF' }).setScrollFactor(0).setDepth(30);
      socket.emit("ping", () => {
      let start = Date.now();
      let latency = Date.now() - start;
      ping.text = 'ping: ' + latency;
      setInterval(() => {
        let start = Date.now();
        socket.volatile.emit("ping", () => {
          let latency = Date.now() - start;
          ping.text = 'ping: ' + latency;
          if (latency >= 1000) {
            if (!disconnected) {
              disconnect();
            }
          }
        });
      }, 1000);
      });
      socket.on('newPlayer', function (playerInfo) {
             addOtherPlayers(self, playerInfo);
      });
      socket.on('disconnected', function (playerInfo) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
             if (playerInfo.playerId === otherPlayer.playerId) {
             otherPlayer.destroy();
             }
            });
            self.otherCharacters.getChildren().forEach(function (otherCharacter) {
             if (playerInfo.playerId === otherCharacter.playerId) {
             otherCharacter.destroy();
             }
            });
            self.otherGuns.getChildren().forEach(function (otherGun) {
             if (playerInfo.playerId === otherGun.playerId) {
             otherGun.destroy();
             }
            });
            self.otherNames.getChildren().forEach(function (otherName) {
             if (playerInfo.playerId === otherName.playerId) {
              otherName.text = ''
             otherName.setVisible(false);
             otherName.destroy();
             }
            });
            self.otherHps.getChildren().forEach(function (otherHp) {
             if (playerInfo.playerId === otherHp.playerId) {
             otherHp.destroy();
             }
            })
            self.otherAfterimages.getChildren().forEach(function (otherAfterimage) {
             otherAfterimage.destroy();
            })
           });
      socket.on('disconnect', function (reason){
        if (reason === "io client disconnect" || reason === 'io server disconnect' || reason === 'transport error') return
        if (!disconnected) {
          disconnect();
        }
           })
      socket.on('alived', function (playerInfo) {
             self.otherPlayers.getChildren().forEach(function (otherPlayer) {
               if (playerInfo.playerId === otherPlayer.playerId) {
                 otherPlayer.setVisible(playerInfo.playeralive);
                 otherPlayer.setActive(playerInfo.playeralive);
               }
             });
             self.otherCharacters.getChildren().forEach(function (otherCharacter) {
              if (playerInfo.playerId === otherCharacter.playerId) {
              otherCharacter.setVisible(playerInfo.playeralive);
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
           });
      socket.on('deaded', function (playerInfo) {
             self.otherPlayers.getChildren().forEach(function (otherPlayer) {
               if (playerInfo.playerId === otherPlayer.playerId) {
                 otherPlayer.setVisible(playerInfo.playeralive);
                 otherPlayer.setActive(playerInfo.playeralive);
               }
             });
             self.otherCharacters.getChildren().forEach(function (otherCharacter) {
              if (playerInfo.playerId === otherCharacter.playerId) {
              otherCharacter.setVisible(playerInfo.playeralive);
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
           });
      socket.on('playerMoved', function (playerInfo, otherx, othery, otherx2, othery2) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
              if (playerInfo.playerId === otherPlayer.playerId) {
               otherPlayer.setPosition(playerInfo.x, playerInfo.y);
              }
            });
            self.otherAfterimages.getChildren().forEach(function (otherAfterimage) {
              if (playerInfo.playerId === otherAfterimage.playerId) {
               otherAfterimage.setPosition(otherx, othery);
              }
            });
            self.otherGuns.getChildren().forEach(function (otherGun) {
              if (playerInfo.playerId === otherGun.playerId) {
               otherGun.setPosition(otherx, othery + 7)
              }
            });
            self.otherCharacters.getChildren().forEach(function (otherCharacter) {
              if (playerInfo.playerId === otherCharacter.playerId) {
               otherCharacter.setPosition(otherx2, othery2);
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
          });
      socket.on('testyo', function (players, room) {
        self.add.text(650, 375, "Leaderboard", { font: '20px', fill: '#FFFFFF' }).setScrollFactor(0).setDepth(30);
        self.add.text(650, 400, "Names", { font: '20px', fill: '#FFFFFF' }).setScrollFactor(0).setDepth(30);
        self.add.text(800, 400, "Kills", { font: '20px', fill: '#FFFFFF' }).setScrollFactor(0).setDepth(30);
        self.add.text(950, 400, "Deaths", { font: '20px', fill: '#FFFFFF' }).setScrollFactor(0).setDepth(30);
        Object.keys(players).forEach(function (id) {
          if (room !== roomId) return
          if (socket.id == id) return
          self.otherbullets[id] = self.physics.add.group()
          for (var i = 0; i < 20; i++) {
            self.otherbullets[players[id].playerId].create(players[id].x, players[id].y + 13, players[id].playergun + 'Bullet').setDepth(28).setActive(false).setVisible(false).body.allowGravity = false;
          }
          let namenumber = 0
          self.otherbullets[id].getChildren().forEach(function (bullet) {
            namenumber += 1;
            bullet.playerId = id
            bullet.name = 'bullet' + namenumber;
            self.physics.add.collider(floors, bullet,
            function () {
              if (bullet.texture.key == 'BoomsmithBullet') return
              bullet.body.allowGravity = false;
              bullet.setVelocity(0, 0)
              bullet.setActive(false)
              bullet.setVisible(false)
            })
          });
        });
      })
      socket.on('leaderboardCreate', function (leaderboardData) {
        var i = 0;
        Object.keys(leaderboardData).forEach(user => {
          leaderboardnames[i] = self.add.text(650, 420 + i*20, leaderboardData[user].playername, { font: '20px', fill: '#FFFFFF' }).setScrollFactor(0).setDepth(30);
          leaderboardkills[i] = self.add.text(800, 420 + i*20, leaderboardData[user].kills, { font: '20px', fill: '#FFFFFF' }).setScrollFactor(0).setDepth(30);
          leaderboarddeaths[i] = self.add.text(950, 420 + i*20, leaderboardData[user].kills, { font: '20px', fill: '#FFFFFF' }).setScrollFactor(0).setDepth(30);
          i++;
        });
      })
      socket.on('bullethitted', function (playerInfo) {
            self.otherbullets[playerInfo.player].getChildren().forEach(function (otherbullet) {
             if (otherbullet.name == playerInfo.bulletname.name) {
               otherbullet.body.allowGravity = false;
               otherbullet.setActive(false)
               otherbullet.setVisible(false)
             }
            });
           });
      socket.on('bulletshotted', function (player, bulletname, velocityX, velocityY, gravity) {
        self.otherbullets[player.playerId].getChildren().forEach(function (otherbullet){
              if (otherbullet.name == bulletname) {
                let sounds = self.sound.get('SFX_' + otherbullet.texture.key)
                if (self.player.x > player.x) {
                  sounds.volume = player.x/self.player.x
                  sounds.pan = (player.x - self.player.x)/self.player.x
                }
                else if (self.player.x < player.x) {
                  sounds.volume = self.player.x/player.x
                  sounds.pan = (player.x - self.player.x)/player.x
                }
                else {
                  sounds.pan = 0
                  sounds.volume = 1
                }
                sounds.play()
                otherbullet.body.allowGravity = gravity
                otherbullet.setTexture(player.playergun + 'Bullet')
                otherbullet.setPosition(player.x, player.y + 7);
                otherbullet.setActive(true);
                otherbullet.setVisible(true);
                otherbullet.setVelocity(velocityX, velocityY)
                otherbullet.rotation = player.gunrotation
                if (otherbullet.texture.key == 'BoomsmithBullet') {
                  otherbullet.collider = self.physics.add.collider(elevator, otherbullet)
                }
              }
            })
           });
      socket.on('gunRotated', function (playerInfo) {
            self.otherGuns.getChildren().forEach(function (otherGun) {
             if (playerInfo.playerId === otherGun.playerId) {
              otherGun.rotation = playerInfo.gunrotation
             }
            });
           });
      socket.on('playeranimed', function (playerInfo) {
             self.otherAfterimages.getChildren().forEach(function (otherAfterimage) {
               if (playerInfo.playerId === otherAfterimage.playerId) {
                 self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                  if (playerInfo.playerId === otherPlayer.playerId) {
                   otherPlayer.anims.play(playerInfo.curanim)
                   otherAfterimage.setVisible(true);
                   otherPlayer.on('animationcomplete', function () {
                     otherAfterimage.setVisible(false);
                   })
                  }
                 });
              }
             });
           });
      socket.on('playerfliped', function (playerInfo) {
             self.otherPlayers.getChildren().forEach(function (otherPlayer) {
               if (playerInfo.playerId === otherPlayer.playerId) {
                 otherPlayer.flipX = playerInfo.flipped;
               }
             });
             self.otherCharacters.getChildren().forEach(function (otherCharacter) {
               if (playerInfo.playerId === otherCharacter.playerId) {
                 otherCharacter.flipX = playerInfo.flipped;
               }
             });
           });
      socket.on('healthupdated', function (playerInfo) {
            self.otherHps.getChildren().forEach(function (otherHp) {
             if (playerInfo.playerId === otherHp.playerId) {
              otherHp.setCrop(0, 0, playerInfo.health / 100 * 100, 8)
             }
            });
           });
      socket.on('changedloadout', function (playerInfo) {
            self.otherCharacters.getChildren().forEach(function (otherCharacter) {
              if (playerInfo.playerId === otherCharacter.playerId) {
               otherCharacter.setTexture(playerInfo.playercharacter);
              }
            });
            self.otherGuns.getChildren().forEach(function (otherGun) {
              if (playerInfo.playerId === otherGun.playerId) {
               otherGun.setTexture(playerInfo.playergun)
              }
            });
          });
      socket.on('healthpackUp', function (healthpackinfo) {
             var o = 0
             for (var healthpacks in healthpackinfo) {
               o += 1
               if (healthpackinfo.hasOwnProperty(healthpacks)) {
                 if (healthpackinfo[healthpacks])
                   healthstation[o].anims.play('healthstationidle')
                 }
                   healthpack[o].setVisible(healthpackinfo[healthpacks])
                   healthpack[o].setActive(healthpackinfo[healthpacks])

               }
             })
      socket.on('overheated', function (playerInfo) {
                self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                  if (playerInfo.playerId === otherPlayer.playerId) {
                   var otheroverheat = self.add.sprite(playerInfo.x, playerInfo.y - 10, 'overheattext', 0).setDepth(36)
                   otheroverheat.anims.play('overheat!')
                   let sounds = self.sound.get('SFX_Gun_Overheat')
                   if (self.player.x > playerInfo.x) {
                     sounds.volume = playerInfo.x / self.player.x
                     sounds.pan = (-playerInfo.x - -self.player.x) / -self.player.x
                   }
                   else if (self.player.x < playerInfo.x) {
                     sounds.volume = self.player.x / playerInfo.x
                     sounds.pan = (+playerInfo.x - +self.player.x) / +playerInfo.x
                   }
                   else {
                     sounds.pan = 0
                     sounds.volume = 1
                   }
                   otheroverheat.on('animationcomplete', function () {
                     otheroverheat.destroy()
                   })
                  }
                });
             })
      socket.on('KillBroadcast', function (kill, leaderboardData) {
                var i = 0;
                for (let i = 0; i < leaderboardData.length; i++) {
                  var array = leaderboardData[i];
                  leaderboardnames[i].text = array[1].playername
                  leaderboardkills[i].text = array[1].kills
                  leaderboarddeaths[i].text = array[1].deaths
                }
                var killertextx = 1060;
                var killedtextx = 1060;
                var killY = 390;
                if (kill.killer.playergun == 'gun1') {
                  killertextx -= 12.5 + 5
                  killedtextx += 12.5 + 5
                }
                else if (kill.killer.playergun == 'AncientDischargeGun') {
                  killertextx -= 23 + 5
                  killedtextx += 23 + 5
                }
                else if (kill.killer.playergun == 'ThunderScreamGun') {
                  killertextx -= 29.5 + 5
                  killedtextx += 29.5 + 5
                }
                else if (kill.killer.playergun == 'SolFlairGun') {
                  killertextx -= 8.5 + 5
                  killedtextx += 8.5 + 5
                }
                else if (kill.killer.playergun == 'Boomsmith') {
                  killertextx -= 22.5 + 5
                  killedtextx += 22.5 + 5
                }
                else if (kill.killer.playergun == 'SuperchargedFractal') {
                  killertextx -= 9.5 + 5
                  killedtextx += 9.5 + 5
                }
                if (morekill > 0) {
                  killY += 20 * morekill
                }
                var killergun = self.add.image(1060, killY, kill.killer.playergun).setDepth(60).setScrollFactor(0)
                var killertext = self.add.text(killertextx, killY, kill.killer.playername).setDepth(60).setScrollFactor(0).setOrigin(1, 0.5)
                var killedtext = self.add.text(killedtextx, killY, kill.killed.playername).setDepth(60).setScrollFactor(0).setOrigin(0, 0.5)
                morekill += 1
                setTimeout(function () {
                  killergun.destroy()
                  killertext.destroy()
                  killedtext.destroy()
                  morekill -= 1
                }, 1500)
            })
      socket.on('elevatorGoUp', function (elevatorno) {
               elevator.getChildren().forEach(function (elevator) {
                 if (elevator.name === elevatorno.num) {
                   elevator.body.velocity.y = elevatorno.vel
                   if (elevatorno.y) {
                     if (elevator.name <= 2) {
                       elevator.y = elevatorno.y - 40
                     }
                     else if (elevator.name <= 4) {
                       elevator.y = elevatorno.y - 560
                     }
                     else if (elevator.name <= 6) {
                       elevator.y = elevatorno.y - 720
                     }
                   }
                 }
               });
           })
      socket.on('BoomsmithBoomed', function (bulletname, socketid) {
          self.otherbullets[socketid].getChildren().forEach(function (otherbullet) {
           if (otherbullet.name == bulletname) {
             if (socketid == socket.id) {
             }
             else {
             let gotHit = self.physics.overlapCirc(otherbullet.x, otherbullet.y, 52.5, true, false);
             for (var i = 0; i < gotHit.length; i++) {
                if (gotHit[i].gameObject.playerId == socket.id) {
                  if (self.player.active) {
                  Health -= Boomsmithdamage
                  if (Health <= 0) {
                    spawnrect.setVisible(true)
                    spawntext.setVisible(true)
                    loadoutrect.setVisible(true)
                    loadouttext.setVisible(true)
                    CanMove = false;
                    self.player.setVelocity(0, 0)
                    healthbar.setVisible(false);
                    self.player.setActive(false);
                    self.player.setVisible(false);
                    self.character.setVisible(false);
                    primarygun.setVisible(false);
                    name.setVisible(false);
                    socket.emit('dead', {killed: myid, killer: otherbullet.playerId})
                  }
                  else {
                    healthbar.setCrop(0, 0, Health / 100 * 100, 8)
                  }
                  socket.emit('healthupdate', { hp: Health})
                }
              }
              }
            }
            let sounds = self.sound.get('SFX_Boomsmith_Explosion')
            sounds.play()
            let boomanimation = self.add.sprite(otherbullet.x, otherbullet.y, 'BoomforgedBlast', 0)
             otherbullet.setVelocity(0, 0)
             otherbullet.body.allowGravity = false
             boomanimation.anims.play('BoomsmithBoomAnim')
             boomanimation.on('animationcomplete', function () {
               otherbullet.setActive(false)
               otherbullet.setVisible(false)
               self.physics.world.removeCollider(otherbullet.collider);
               boomanimation.destroy()
             })
           }
          });
         });
    if (map == 'remnants') {
    healthstation[1] = this.add.sprite(220, 860, 'healthstation', 0)
    healthstation[2] = this.add.sprite(300, 580, 'healthstation', 0)
    healthstation[3] = this.add.sprite(860, 460, 'healthstation', 0)
    healthstation[4] = this.add.sprite(1260, 460, 'healthstation', 0)
    healthstation[5] = this.add.sprite(1820, 580, 'healthstation', 0)
    healthstation[6] = this.add.sprite(1900, 860, 'healthstation', 0)
    healthstation[7] = this.add.sprite(1060, 1060, 'healthstation', 0)
    healthpack[1] = this.physics.add.sprite(220, 860, 'healthpack').setVisible(false)
    healthpack[1].body.allowGravity = false;
    healthpack[2] = this.physics.add.sprite(300, 580, 'healthpack').setVisible(false)
    healthpack[2].body.allowGravity = false;
    healthpack[3] = this.physics.add.sprite(860, 460, 'healthpack').setVisible(false)
    healthpack[3].body.allowGravity = false;
    healthpack[4] = this.physics.add.sprite(1260, 460, 'healthpack').setVisible(false)
    healthpack[4].body.allowGravity = false;
    healthpack[5] = this.physics.add.sprite(1820, 580, 'healthpack').setVisible(false)
    healthpack[5].body.allowGravity = false;
    healthpack[6] = this.physics.add.sprite(1900, 860, 'healthpack').setVisible(false)
    healthpack[6].body.allowGravity = false;
    healthpack[7] = this.physics.add.sprite(1060, 1060, 'healthpack').setVisible(false)
    healthpack[7].body.allowGravity = false;
    elevator[1] = elevator.create(780, 1140, 'elevator')
    elevator[2] = elevator.create(1340, 1140, 'elevator')
    elevator[3] = elevator.create(1900, 580, 'elevator')
    elevator[4] = elevator.create(220, 580, 'elevator')
    elevator[5] = elevator.create(1020, 420, 'elevator')
    elevator[6] = elevator.create(1100, 420, 'elevator')
    for (var i = 1; i < 7; i++) {
      elevator[i].name = i
      elevator[i].body.allowGravity = false;
      elevator[i].body.immovable = true;
      elevator[i].body.checkCollision.up = true;
      elevator[i].body.checkCollision.down = false;
      elevator[i].body.checkCollision.left = false;
      elevator[i].body.checkCollision.right = false;
    }
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
    this.otherbullets[socket.id] = this.physics.add.group()
    for (var i = 0; i < 20; i++) {
      this.otherbullets[socket.id].create(0, 0, selectedloadout.primary + 'Bullet').setDepth(35).setActive(false).setVisible(false).body.allowGravity = false;
    }
    let namenumber = 0
    this.otherbullets[socket.id].getChildren().forEach(function (bullet) {
      namenumber += 1;
      bullet.name = 'bullet' + namenumber;
      self.physics.add.collider(floors, bullet,
        function () {
          if (bullet.texture.key == 'BoomsmithBullet') return
          bullet.body.allowGravity = false;
          bullet.setVelocity(0, 0)
          bullet.setActive(false)
          bullet.setVisible(false)
        })
      });
	}
  update(){
    if(mobile){
var shootNow = shootMobile
    } else {
var  shootNow = this.input.activePointer.isDown
    }
    if (spawned) {
      primary.bulletcooldown -= 1
      secondary.bulletcooldown -= 1
      if (selectedgun == 'primary') {
        overheatgrpx.setCrop(0, 0, primary.overheat / 100 * 100, 8)
        if (shootNow && this.player.active && primary.CanShoot && primary.bulletcooldown <= 0) {
            if (selectedloadout.primary == 'gun1') {
              var thebullet = this.otherbullets[myid].getFirstDead();
              thebullet.setTexture(selectedloadout.primary + 'Bullet')
              thebullet.x = primarygun.x;
              thebullet.y = primarygun.y;
              thebullet.setActive(true);
              thebullet.setVisible(true);
              var bulletspreadcalc = Phaser.Math.Between(primary.bulletspread, -primary.bulletspread);
              thebullet.rotation = primarygun.rotation + bulletspreadcalc * (0.0002 * primary.overheat);
              var bulletvelocity = this.physics.velocityFromRotation(thebullet.rotation, primary.bulletspeed, thebullet.body.velocity);
              var thebulletvelocityY = bulletvelocity.y;
              var thebulletvelocityX = bulletvelocity.x;
              socket.emit('bulletshot', {name: thebullet.name, velocityY: thebulletvelocityY, velocityX: thebulletvelocityX, gravity: false})
            }
            else if (selectedloadout.primary == 'ThunderScreamGun') {
              var thebullet = this.otherbullets[myid].getFirstDead();
              thebullet.setTexture(selectedloadout.primary + 'Bullet')
              thebullet.x = primarygun.x;
              thebullet.y = primarygun.y;
              thebullet.setActive(true);
              thebullet.setVisible(true);
              var bulletspreadcalc = Phaser.Math.Between(primary.bulletspread, -primary.bulletspread);
              thebullet.rotation = primarygun.rotation + bulletspreadcalc * (0.000025 * primary.overheat);
              var bulletvelocity = this.physics.velocityFromRotation(thebullet.rotation, primary.bulletspeed, thebullet.body.velocity);
              var thebulletvelocityY = bulletvelocity.y;
              var thebulletvelocityX = bulletvelocity.x;
              socket.emit('bulletshot', {name: thebullet.name, velocityY: thebulletvelocityY, velocityX: thebulletvelocityX, gravity: false})
            }
            else if (selectedloadout.primary == 'AncientDischargeGun') {
              for (var i = -3; i < 4; i++) {
                var thebullet = this.otherbullets[myid].getFirstDead();
                thebullet.setTexture(selectedloadout.primary + 'Bullet')
                thebullet.x = primarygun.x;
                thebullet.y = primarygun.y;
                thebullet.setActive(true);
                thebullet.setVisible(true);
                var bulletspreadcalc = Phaser.Math.Between(primary.bulletspread, -primary.bulletspread);
                thebullet.rotation = primarygun.rotation + i * 0.2;
                var bulletvelocity = this.physics.velocityFromRotation(thebullet.rotation, primary.bulletspeed, thebullet.body.velocity);
                var thebulletvelocityY = bulletvelocity.y + bulletspreadcalc * primary.overheat * 0.1;
                var thebulletvelocityX = bulletvelocity.x + bulletspreadcalc * primary.overheat * 0.1;
                thebullet.body.velocity.y = thebulletvelocityY
                thebullet.body.velocity.x = thebulletvelocityX
                socket.emit('bulletshot', {name: thebullet.name, velocityY: thebulletvelocityY, velocityX: thebulletvelocityX, gravity: false})
              }
            }
            else if (selectedloadout.primary == 'Boomsmith') {
              var thebullet = this.otherbullets[myid].getFirstDead();
              thebullet.setTexture(selectedloadout.primary + 'Bullet')
              thebullet.x = primarygun.x;
              thebullet.y = primarygun.y;
              thebullet.body.allowGravity = true;
              thebullet.body.setBounce(0.25, 0.5);
              thebullet.setActive(true);
              thebullet.setVisible(true);
              var bulletspreadcalc = Phaser.Math.Between(primary.bulletspread, -primary.bulletspread);
              thebullet.rotation = primarygun.rotation + bulletspreadcalc * (0.0002 * primary.overheat);
              var bulletvelocity = this.physics.velocityFromRotation(thebullet.rotation, primary.bulletspeed, thebullet.body.velocity);
              var thebulletvelocityY = bulletvelocity.y;
              var thebulletvelocityX = bulletvelocity.x;
              socket.emit('bulletshot', {name: thebullet.name, velocityY: thebulletvelocityY, velocityX: thebulletvelocityX, gravity: true})
              thebullet.collider = this.physics.add.collider(elevator, thebullet)
              setTimeout(function () {
                  socket.emit('BoomsmithBoom', this)
              }.bind(thebullet.name), 750)
            }
            primary.bulletcooldown = primary.bulletcooldownconfig
            primary.overheat += primary.overheatadd;
            playsoundprimary()
//recoil
            if (this.player.flipX) {
                this.player.body.velocity.x += primary.recoil
              
            }
            else {
                this.player.body.velocity.x -= primary.recoil
              
            }
        }
      }
      else if (selectedgun == 'secondary') {
        overheatgrpx.setCrop(0, 0, secondary.overheat / 100 * 100, 8)
        if (shootNow && this.player.active && secondary.CanShoot && secondary.bulletcooldown  <= 0) {
            if (selectedloadout.secondary == 'SolFlairGun') {
              var thebullet = this.otherbullets[myid].getFirstDead();
              thebullet.setTexture(selectedloadout.secondary + 'Bullet')
              thebullet.x = primarygun.x;
              thebullet.y = primarygun.y;
              thebullet.setActive(true);
              thebullet.setVisible(true);
              var bulletspreadcalc = Phaser.Math.Between(secondary.bulletspread, -secondary.bulletspread);
              thebullet.rotation = primarygun.rotation + bulletspreadcalc * (0.0001 * secondary.overheat);
              var bulletvelocity = this.physics.velocityFromRotation(thebullet.rotation, secondary.bulletspeed, thebullet.body.velocity);
              var thebulletvelocityY = bulletvelocity.y;
              var thebulletvelocityX = bulletvelocity.x;
              socket.emit('bulletshot', {name: thebullet.name, velocityY: thebulletvelocityY, velocityX: thebulletvelocityX, gravity: false})
            }
            else if (selectedloadout.secondary == 'SuperchargedFractal') {
              var thebullet = this.otherbullets[myid].getFirstDead();
              thebullet.anims.stop()
              thebullet.setTexture(selectedloadout.secondary + 'Bullet')
              thebullet.x = primarygun.x;
              thebullet.y = primarygun.y;
              thebullet.setActive(true);
              thebullet.setVisible(true);
              var bulletspreadcalc = Phaser.Math.Between(secondary.bulletspread, -secondary.bulletspread);
              thebullet.rotation = primarygun.rotation + bulletspreadcalc * (0.0002 * secondary.overheat);
              var bulletvelocity = this.physics.velocityFromRotation(thebullet.rotation, secondary.bulletspeed, thebullet.body.velocity);
              var thebulletvelocityY = bulletvelocity.y;
              var thebulletvelocityX = bulletvelocity.x;
              socket.emit('bulletshot', {name: thebullet.name, velocityY: thebulletvelocityY, velocityX: thebulletvelocityX, gravity: false})
            }
            secondary.bulletcooldown = secondary.bulletcooldownconfig
            secondary.overheat += secondary.overheatadd;
            playsoundsecondary()
//recoil
            if (this.player.flipX) {
                this.player.body.velocity.x += secondary.recoil
              
            }
            else {
                this.player.body.velocity.x -= secondary.recoil
              
            }
       }
     }
        if (primary.overheat >= 100) {
          if (selectedgun == 'primary') {
            overheatgrpx.setTint(0xff8800)
          }
          overheattext.setPosition(this.player.x, this.player.y - 10)
          overheattext.setVisible(true)
          overheattext.anims.play('overheat!')
          overheatsound()
          primary.overheat = 99
          socket.emit('overheat')
          primary.CanShoot = false
          primary.overheat -= 0.6
        }
        else if (primary.overheat <= 0) {
          if (selectedgun == 'primary') {
            overheatgrpx.clearTint()
          }
          primary.overheat = 0
          primary.CanShoot = true
        }
        else {
          primary.overheat -= 0.6
        }
        if (secondary.overheat >= 100) {
          if (selectedgun == 'secondary') {
            overheatgrpx.setTint(0xff8800)
          }
          overheattext.setPosition(this.player.x, this.player.y - 10)
          overheattext.setVisible(true)
          overheattext.anims.play('overheat!')
          overheatsound()
          secondary.overheat = 99
          socket.emit('overheat')
          secondary.CanShoot = false
          secondary.overheat -= 0.6
        }
        else if (secondary.overheat <= 0) {
          if (selectedgun == 'secondary') {
            overheatgrpx.clearTint()
          }
          secondary.overheat = 0
          secondary.CanShoot = true
        }
        else {
            secondary.overheat -= 0.6
        }
//pointer
      var pointx = this.input.activePointer.worldX;
      var pointy = this.input.activePointer.worldY;
//primarygun
      primarygun.x = this.player.x;
      primarygun.y = this.player.y + 7;
      if (!mobile) {
        if (this.input.activePointer.oldPosition && (pointx !== this.input.activePointer.oldPosition.pointx || pointy !== this.input.activePointer.oldPosition.pointy)) {
          primarygun.rotation = Phaser.Math.Angle.Between(primarygun.x, primarygun.y, this.input.activePointer.worldX , this.input.activePointer.worldY);
          socket.emit('gunRotatement', { gunrotation: primarygun.rotation})
          if (this.input.activePointer.worldX > this.player.x) {
            this.player.flipX = false;
            this.character.flipX = false;
            socket.emit('playerflip', { flipped: this.player.flipX})
          }
          else {
            this.player.flipX = true;
            this.character.flipX = true;
            socket.emit('playerflip', { flipped: this.player.flipX})
          }
        }
        this.input.activePointer.oldPosition = {
          pointx: this.input.activePointer.worldX,
          pointy: this.input.activePointer.worldY,
        }
      } else {
smalljoystick.setPosition(this.input.activePointer.worldX, this.input.activePointer.worldY)

      }
     
//movement

        if (CanMove == true) {
          if (key_D.isDown && this.player.body.velocity.x !== 345) {
               if (this.player.body.velocity.x >= speed) {
               }
               else {
                 this.player.body.velocity.x += acceleration
               }
          }
          else if (key_A.isDown && this.player.body.velocity.x !== -345) {
            if (this.player.body.velocity.x <= -speed) {
            }
            else {
              this.player.body.velocity.x -= acceleration
            }
          }
          else if (key_A.isUp && key_D.isUp){
            if (this.player.body.velocity.x > 0) {
              this.player.body.velocity.x -= acceleration
            }
            else if (this.player.body.velocity.x < 0) {
              this.player.body.velocity.x += acceleration
            }
          }
          if (key_Space.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-400);
          }
          else if(key_W.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-400);
          }
          if (key_S.isDown) {
            this.player.body.velocity.y += acceleration
          }
        }
// emit player movement
        if (this.player) {
          var x = this.player.x;
          var y = this.player.y;
          if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y)) {
            socket.emit('playerMovement', { x: this.player.x, y: this.player.y, otherx: this.player.oldPosition.x, othery: this.player.oldPosition.y, otherx2: this.character.x, othery2: this.character.y})
            this.character.x = this.player.oldPosition.x;
            this.character.y = this.player.oldPosition.y;
          }
          this.player.oldPosition = {
            x: this.player.x,
            y: this.player.y,
          }
        }
//afterimage

        afterimage.setPosition(this.player.x, this.player.y)
        healthbar.setPosition(this.player.x, this.player.y + 20)
        name.setPosition(this.player.x, this.player.y - 40)
        if (cam.x !== this.player.x || cam.y !== this.player.y) {
          this.physics.moveToObject(cam, this.player, 200, 100);
        }
       }
    }
}
