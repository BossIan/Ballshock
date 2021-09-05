export default class menu extends Phaser.Scene {
  constructor(){
    super({key: "menu"});
  }
  preload(){
  }
  create(){
    var self = this;
    var savedname = JSON.parse(localStorage.getItem('name'));
    var name = this.add.text(100, 100, 'Welcome back, ' + savedname, { font: '40px Courier', fill: '#000000' });
    var loadout = this.add.text(100, 1000, 'Loadout', { font: '80px Courier', fill: '#000000' });
    var multiplayer = this.add.image(2120 / 2, 400.0, "multiplayer").setScale(3.0, 3.0);
		var quit = this.add.image(2120 / 2, 1000, "quit").setScale(3.0, 3.0);
		var play = this.add.image(2120 / 2, 600.0, "play").setScale(3.0, 3.0);
		var options = this.add.image(2120 / 2, 800.0, "options").setScale(3.0, 3.0);
    loadout.setInteractive({useHandCursor: true});
    loadout.on('pointerup', function () {
     this.scene.start('loadout');
   }, this);
    name.setInteractive({useHandCursor: true});
    name.on('pointerup', function () {
      localStorage.removeItem('name');
     this.scene.start('logo');
   }, this);
    play.setInteractive({useHandCursor: true});
    play.on('pointerup', function () {
      this.setFrame(0);
      self.scene.start('testlevel');
    });
    play.on('pointerdown', function () {
      this.setFrame(2);
    })
    play.on('pointerover', function () {
      this.setFrame(1);
    })
    play.on('pointerout', function () {
      this.setFrame(0);
    })
    multiplayer.setInteractive({useHandCursor: true});
    multiplayer.on('pointerup', function () {
      this.setFrame(0);
      self.scene.start('enterip');
    });
    multiplayer.on('pointerdown', function () {
      this.setFrame(2);
    })
    multiplayer.on('pointerover', function () {
      this.setFrame(1);
    })
    multiplayer.on('pointerout', function () {
      this.setFrame(0);
    })
    options.setInteractive({useHandCursor: true});
    options.on('pointerup', function () {
      this.setFrame(0);
    })
    options.on('pointerdown', function () {
      this.setFrame(2);
    })
    options.on('pointerover', function () {
      this.setFrame(1);
    })
    options.on('pointerout', function () {
      this.setFrame(0);
    })
    quit.setInteractive({useHandCursor: true});
    quit.on('pointerup', function () {
      this.setFrame(0);
      close();
    });
    quit.on('pointerdown', function () {
      this.setFrame(2);
    })
    quit.on('pointerover', function () {
      this.setFrame(1);
    })
    quit.on('pointerout', function () {
      this.setFrame(0);
    })
  }
  update(){
  }
}
