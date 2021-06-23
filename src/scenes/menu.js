export default class menu extends Phaser.Scene {
  constructor(){
    super({key: "menu"});
  }
  preload(){
  }
  create(){
    var savefile = JSON.parse(localStorage.getItem('saveFile'));
    var name = this.add.text(100, 100, 'Welcome back, ' + savefile.name, { font: '40px Courier', fill: '#000000' });
    var multiplayer = this.add.image(2120 / 2, 600.0, "multiplayer").setScale(3.0, 3.0);
		var quit = this.add.image(2120 / 2, 1000, "quit").setScale(3.0, 3.0);
		var play = this.add.image(2120 / 2, 400.0, "play").setScale(3.0, 3.0);
		var options = this.add.image(2120 / 2, 800.0, "options").setScale(3.0, 3.0);
    name.setInteractive();
    name.on('pointerup', function () {
     localStorage.removeItem('saveFile');
     this.scene.start('logo');
   }, this);
    play.setInteractive();
    play.once('pointerup', function () {
      this.scene.start('testlevel');
    }, this);
    play.on('pointerdown', function () {
      this.setFrame(2);
    })
    play.on('pointerover', function () {
      this.setFrame(1);
    })
    play.on('pointerout', function () {
      this.setFrame(0);
    })
    multiplayer.setInteractive();
    multiplayer.once('pointerup', function () {
      this.scene.start('multilevel');
    }, this);
    multiplayer.on('pointerdown', function () {
      this.setFrame(2);
    })
    multiplayer.on('pointerover', function () {
      this.setFrame(1);
    })
    multiplayer.on('pointerout', function () {
      this.setFrame(0);
    })
    options.setInteractive();
    options.on('pointerdown', function () {
      this.setFrame(2);
    })
    options.on('pointerover', function () {
      this.setFrame(1);
    })
    options.on('pointerout', function () {
      this.setFrame(0);
    })
    quit.setInteractive();
    quit.once('pointerup', function () {
      close();
    }, this);
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
