import {socket} from './lobby'
import {roomId} from './lobby'
import {roomName} from './lobby'
import {roomMaker} from './lobby'
export var map;
export default class room extends Phaser.Scene {
  constructor(){
    super({key: "room"});
  }
  create(){
    function disconnect() {
      socket.disconnect()
      let disconlayer = self.add.layer().setDepth(60);
       let disconnectrect = self.add.rectangle(1060, 600, 400, 200).setScrollFactor(0).setDepth(60);
        disconnectrect.isFilled = true;
        disconnectrect.fillColor = 3223857;
        disconnectrect.isStroked = true;
        disconnectrect.strokeColor = 0;
        disconnectrect.lineWidth = 10;
       let quitrect = self.add.rectangle(1160, 665, 100, 40).setInteractive({useHandCursor: true}).setScrollFactor(0).setDepth(60);
        quitrect.isFilled = true;
        quitrect.fillColor = 10490647;
        quitrect.isStroked = true;
        quitrect.strokeColor = 921102;
        quitrect.lineWidth = 5;
       let retryrect = self.add.rectangle(960, 665, 100, 40).setInteractive({useHandCursor: true}).setScrollFactor(0).setDepth(60);
        retryrect.isFilled = true;
        retryrect.fillColor = 8516894;
        retryrect.isStroked = true;
        retryrect.strokeColor = 0;
        retryrect.lineWidth = 5;
       let quittext = self.add.text(1160, 665, "Quit", {"color":"#000000ff"}).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(60);
       let disconnectedtext = self.add.text(1060, 550, "You have been disconnected.", {"color":"#919191ff","fontSize":"20px","stroke":"#686161ff"}).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(60);
       let retrytext = self.add.text(960, 665, "Retry", {"color":"#171111ff"}).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(60);
       disconlayer.add(disconnectrect);
       disconlayer.add(quitrect);
       disconlayer.add(retryrect);
       disconlayer.add(quittext);
       disconlayer.add(disconnectedtext);
       disconlayer.add(retrytext);
       quitrect.on('pointerup', function () {
         self.scene.start('menu')
      });
       retryrect.on('pointerup', function () {
         self.scene.start('lobby')
      });
    }
    map = 'remnants';
    var self = this;
    var playernames = new Array;
    var savedname = JSON.parse(localStorage.getItem('name'));
    var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    key_ESC.on('up', function () {
      this.scene.start('lobby')
      socket.disconnect()},this)
    const username = this.add.text(600, 600, '', {"fontSize":"50px"});
    const username2 = this.add.text(1400, 600, '', {"fontSize":"50px"});
    const starttext = self.add.text(1060, 1115, "Start", {"fontSize":"50px"}).setOrigin(0.5, 0.5).setVisible(false);
    const startbutton = this.add.image(1060, 1115, "256rectangle").setInteractive({useHandCursor: true}).setVisible(false);
    const roomnametext = this.add.text(1060, 5, roomName + " room", {fontSize:"50px"}).setOrigin(0.5, 0)
		const mappreview = this.add.image(1060, 230, map).setScale(3,3);
		const mapprevtext = this.add.text(1060, 388, "Map: " + map, {fontSize:"50px"}).setOrigin(0.5, 0);
    socket.off()
    socket.emit('joinedroom', roomId)
    socket.on('currentPlayers', function(usernames){
      let texts =  ''
      let texts2 =  ''
      for (var i = 0; i <= usernames.length; i++) {
        if (usernames[i] == null) continue
        if (i > 5) {
          texts2 +=  "\n" + usernames[i]
        }
        else {
          texts +=  "\n" + usernames[i]
        }
        if (i >= 1 && roomMaker == true) {
          starttext.setVisible(true)
          startbutton.setVisible(true)
        }
        else if (roomMaker == true) {
          starttext.setVisible(false)
          startbutton.setVisible(false)
          starttext.setVisible(true)
          startbutton.setVisible(true)
        }
      }
      if (usernames[0] == null) {
        socket.disconnect()
        self.scene.start('lobby')
      }
      username.text = texts
      username2.text = texts2
    })
    socket.on('disconnect', function (reason){
      if (reason === "io client disconnect" || reason === 'io server disconnect') return
      disconnect()
    })
    socket.on('startingRoom', function () {
      self.scene.start('multilevel')
    })
    startbutton.on('pointerup', function () {
      socket.emit('startroom')
    })
  }
}
