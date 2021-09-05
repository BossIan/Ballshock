import {address} from './enterip';
import io from 'socket.io-client';
export var socket;
export var roomId;
export var roomMaker;
export var roomName;
export default class lobby extends Phaser.Scene {
  constructor(){
    super({key: "lobby"});
  }
  preload(){
  }
  create(){
    roomMaker = false;
    var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    key_ESC.on('up', function () {
      this.scene.start('menu')
    socket.disconnect()},this)
    //create Room Layer
    {
    var room = {
        name: savedname,
        password: '',
      }
		var createroomrect3 = this.add.rectangle(1046, 560, 400, 200);
		createroomrect3.scaleX = 2.5;
		createroomrect3.scaleY = 2.5;
		createroomrect3.isFilled = true;
		createroomrect3.fillColor = 3223857;
		createroomrect3.isStroked = true;
		createroomrect3.strokeColor = 0;
		createroomrect3.lineWidth = 10;
		var createroomRect2 = this.add.rectangle(1312, 732, 350, 100).setInteractive({useHandCursor: true}).setVisible(false);
		createroomRect2.isFilled = true;
		var createroomText2 = this.add.text(1320, 732, "Create", {"color":"#000000ff","fontSize":"50px"}).setOrigin(0.5, 0.5);
		var showpasswordRect = this.add.image(1020, 734, "128rectangle").setScale(0.5,0.5).setInteractive({useHandCursor: true}).setVisible(false);
		var showpasswordText = this.add.text(561, 709, "Show password", {"fontSize":"50px"});
		var passwordRect = this.add.rectangle(1046, 588, 350, 100).setInteractive({useHandCursor: true}).setVisible(false);
		passwordRect.isFilled = true;
		var roomnameRect = this.add.rectangle(1046, 423, 350, 100).setInteractive({useHandCursor: true}).setVisible(false);
		roomnameRect.isFilled = true;
		var passwordPrev = this.add.text(1046, 484, "Password", {"fontSize":"50px"}).setOrigin(0.5, 0);
		var roomnamePrev = this.add.text(1046, 323, "Room name", {"fontSize":"50px"}).setOrigin(0.5, 0);
		var passwordText = this.add.text(1046, 560, "", {"color":"#000000ff","fontSize":"50px","stroke":"#000000ff","strokeThickness":1}).setOrigin(0.5, 0);
		var roomnameText = this.add.text(1046, 393, "", {"color":"#000000ff","fontSize":"50px","stroke":"#000000ff","strokeThickness":1}).setOrigin(0.5, 0);
    var backbutton = this.add.image(1491, 361, "backbutton").setScale(0.5,0.5).setInteractive({useHandCursor: true}).setVisible(false).setDepth(60);
    var createroomlayer = this.add.layer().setDepth(50).setVisible(false);
    createroomlayer.add(createroomrect3)
    createroomlayer.add(createroomRect2)
    createroomlayer.add(createroomText2)
    createroomlayer.add(showpasswordText)
    createroomlayer.add(showpasswordRect)
    createroomlayer.add(createroomRect2)
    createroomlayer.add(roomnameRect)
    createroomlayer.add(passwordRect)
    createroomlayer.add(passwordPrev)
    createroomlayer.add(roomnamePrev)
    createroomlayer.add(passwordText)
    createroomlayer.add(roomnameText)
    backbutton.on('pointerup', function () {
      createroomlayer.setVisible(false)
      backbutton.setVisible(false)
      createroomRect2.setVisible(false)
      passwordRect.setVisible(false)
      roomnameRect.setVisible(false)
      showpasswordRect.setVisible(false)
    })
    createroomRect2.on('pointerup', function () {
      if (roomnameText.text == '') {
        room.name = savedname
      }
      else {
        room.name = roomnameText.text
      }
      if (passwordText.text == '') {
        room.password = null
      }
      else {
        room.password = passwordText.text
      }
      socket.emit('create room', room, function (roomid) {
      roomName = room.name;
      roomId = roomid
      roomMaker = true
      self.scene.start('room')
      })
    })
    passwordRect.on('pointerup', function () {
      self.input.keyboard.off('keydown')
      self.input.keyboard.on('keydown', function (event) {
          if (event.keyCode === 8 && passwordText.text.length > 0){
            passwordText.text = passwordText.text.substr(0, passwordText.text.length - 1);
          }
            else if (event.keyCode >= 95 &&  event.keyCode <= 110 || event.keyCode === 189 || event.keyCode === 186 || event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90 || event.keyCode === 190 || event.keyCode === 90)){
              if (passwordText.text.length < 11) {
                passwordText.text += event.key;
              }
            }
            else if (event.keyCode === 13) {
              self.input.keyboard.off('keydown')
            }
      })
      passwordRect.once('pointerout', function () {
        self.input.once('pointerup', function () {
          self.input.keyboard.off('keydown')
        })
      })
    })
    roomnameRect.on('pointerup', function () {
      self.input.keyboard.off('keydown')
      self.input.keyboard.on('keydown', function (event) {
          if (event.keyCode === 8 && roomnameText.text.length > 0){
            roomnameText.text = roomnameText.text.substr(0, roomnameText.text.length - 1);
          }
            else if (event.keyCode >= 95 &&  event.keyCode <= 110 || event.keyCode === 189 || event.keyCode === 186 || event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90 || event.keyCode === 190 || event.keyCode === 90)){
              if (roomnameText.text.length < 11) {
                roomnameText.text += event.key;
              }
            }
            else if (event.keyCode === 13) {
              self.input.keyboard.off('keydown')
            }
      })
      roomnameRect.once('pointerout', function () {
        self.input.once('pointerup', function () {
          self.input.keyboard.off('keydown')
        })
      })
    })
    showpasswordRect.on('pointerup', function () {
      passwordText.setVisible(!passwordText.visible)
    })
  }
  //password layer
    {
    var password_selected = '';
    var roomid_selected = '';
    var join_big_rect = this.add.rectangle(1046, 560, 400, 200).setScale(2.5, 2.5);
		join_big_rect.isFilled = true;
		join_big_rect.fillColor = 3223857;
		join_big_rect.isStroked = true;
		join_big_rect.strokeColor = 0;
		join_big_rect.lineWidth = 10;
		var join_Rect_join = this.add.rectangle(1046, 732, 350, 100).setInteractive({useHandCursor: true}).setVisible(false);
		join_Rect_join.isFilled = true;
		var join_text = this.add.text(1046, 732, "Join", {"color":"#000000ff","fontSize":"50px"}).setOrigin(0.5, 0.5);
		var password_Rect_join = this.add.rectangle(1046, 499, 350, 100).setInteractive({useHandCursor: true}).setVisible(false);
		password_Rect_join.isFilled = true;
		var password_Prev = this.add.text(1046, 381, "Password", {"fontSize":"50px"}).setOrigin(0.5, 0);
		var password_Text_join = this.add.text(1046, 471, "", {"color":"#000000ff","fontSize":"50px","stroke":"#000000ff","strokeThickness":1}).setOrigin(0.5, 0);
		var joinroom_back_button = this.add.image(1491, 361, "backbutton").setScale(0.5, 0.5).setInteractive({useHandCursor: true}).setVisible(false);
    var joinroom_layer = this.add.layer().setDepth(60).setVisible(false);
    joinroom_layer.add(join_big_rect)
    joinroom_layer.add(password_Rect_join)
    joinroom_layer.add(join_Rect_join)
    joinroom_layer.add(joinroom_back_button)
    joinroom_layer.add(password_Prev)
    joinroom_layer.add(join_text)
    joinroom_layer.add(password_Text_join)
    joinroom_back_button.on('pointerup', function () {
      joinroom_layer.setVisible(false)
      joinroom_back_button.setVisible(false)
      join_Rect_join.setVisible(false)
      password_Rect_join.setVisible(false)
    })
    join_Rect_join.on('pointerup', function () {
      if (password_selected == password_Text_join.text) {
        socket.emit('joinroom',  roomid_selected)
      }
    })
    password_Rect_join.on('pointerup', function () {
      self.input.keyboard.off('keydown')
      self.input.keyboard.on('keydown', function (event) {
          if (event.keyCode === 8 && password_Text_join.text.length > 0){
            password_Text_join.text = password_Text_join.text.substr(0, password_Text_join.text.length - 1);
          }
            else if (event.keyCode >= 95 &&  event.keyCode <= 110 || event.keyCode === 189 || event.keyCode === 186 || event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90 || event.keyCode === 190 || event.keyCode === 90)){
              if (password_Text_join.text.length < 11) {
                password_Text_join.text += event.key;
              }
            }
            else if (event.keyCode === 13) {
              self.input.keyboard.off('keydown')
            }
      })
      passwordRect.once('pointerout', function () {
        self.input.once('pointerup', function () {
          self.input.keyboard.off('keydown')
        })
      })
    })
    }
    function createroomvisual(room, roomid, roomstarted, roomNamew, roomPassword) {
      if (roomid == 'destroy') {
        rooms[room]?.destroy()
        roomtexts[room]?.destroy()
        return
      }
      rooms[room]?.destroy()
      roomtexts[room]?.destroy()
      rooms[room] = self.add.rectangle(568, 160 + 100 * room, 1500, 100).setOrigin(0, 0.5).setDepth(9).setInteractive({useHandCursor: true});
      roomtexts[room]  = self.add.text(568, 160 + 100 * room, roomNamew, {fontSize:"50px"}).setDepth(10).setOrigin(0, 0.5);
      rooms[room].isFilled = true;
      rooms[room].fillColor = 6499115;
      if (roomstarted) {
        rooms[room].setFillStyle(0x240709)
        return
      }
      rooms[room].on('pointerup', function () {
        roomName = roomNamew
        if (roomPassword == null) {
          socket.emit('joinroom',  roomid)
        }
        else {
          password_selected = roomPassword;
          roomid_selected = roomid;
          joinroom_back_button.setVisible(true)
          password_Rect_join.setVisible(true)
          join_Rect_join.setVisible(true)
          joinroom_layer.setVisible(true)
        }
      })
    }
    function disconnect() {
      socket.disconnect()
      let disconlayer = self.add.layer().setDepth(60);
       let disconnectrect = self.add.rectangle(1060, 600, 400, 200).setScrollFactor(0).setDepth(60).setScale(2, 2);
        disconnectrect.isFilled = true;
        disconnectrect.fillColor = 3223857;
        disconnectrect.isStroked = true;
        disconnectrect.strokeColor = 0;
        disconnectrect.lineWidth = 10;
       let quitrect = self.add.rectangle(1260, 665, 100, 40).setInteractive({useHandCursor: true}).setScrollFactor(0).setDepth(60).setScale(2, 2);
        quitrect.isFilled = true;
        quitrect.fillColor = 10490647;
        quitrect.isStroked = true;
        quitrect.strokeColor = 921102;
        quitrect.lineWidth = 5;
       let retryrect = self.add.rectangle(860, 665, 100, 40).setInteractive({useHandCursor: true}).setScrollFactor(0).setDepth(60).setScale(2, 2);
        retryrect.isFilled = true;
        retryrect.fillColor = 8516894;
        retryrect.isStroked = true;
        retryrect.strokeColor = 0;
        retryrect.lineWidth = 5;
       let quittext = self.add.text(1260, 665, "Quit", {"color":"#000000ff"}).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(60).setScale(2, 2);
       let disconnectedtext = self.add.text(1060, 550, "You have been disconnected.", {"color":"#919191ff","fontSize":"20px","stroke":"#686161ff"}).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(60).setScale(2, 2);
       let retrytext = self.add.text(860, 665, "Retry", {"color":"#171111ff"}).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(60).setScale(2, 2);
       disconlayer.add(disconnectrect);
       disconlayer.add(quitrect);
       disconlayer.add(retryrect);
       disconlayer.add(quittext);
       disconlayer.add(disconnectedtext);
       disconlayer.add(retrytext);
       quitrect.on('pointerup', function () {
         self.scene.start('menu')
         socket.disconnect()
      });
       retryrect.on('pointerup', function () {
         socket.disconnect()
         self.scene.start('lobby')
      });
    }
    var rooms = []
    var self = this
    var savedname = JSON.parse(localStorage.getItem('name'));
    var userinlobby = this.add.text(17, 50, "Users in lobby", {"fontSize":"50px"});
    var roomtexts = new Array()
    var playernumber;
    roomId = 'Lobby'
		var mappreview = this.add.image(215, 1060, "remnants").setScale(2, 2);
		var roomstext = this.add.text(568, 50, "Rooms", {"fontSize":"50px"});
		var mapprevtext = this.add.text(215, 1152, "Map: Remnants", {fontSize:"50px"}).setOrigin(0.5, 0);
		var createroomrect = this.add.rectangle(718, 1144, 350, 100).setInteractive({useHandCursor: true});
		createroomrect.isFilled = true;
		var createroom = this.add.text(718, 1144, "Create Room", {color:"#000000ff",fontSize:"50px"}).setOrigin(0.5, 0.5);
    var username = self.add.text(115, 90, '', {"fontSize":"50px"});
    socket = io('http://' + address, {
       reconnection: false,
       reconnectionDelayMax: 10000,
      });
    socket.off()
    socket.emit('join lobby', savedname)
    socket.on('connect_error', function () {
      disconnect()
    });
    socket.on('currentPlayers', function(usernames){
      let texts =  ''
      for (var i = 0; i < usernames.length; i++) {
        if (usernames[i] == null) continue
        texts +=  "\n" + usernames[i]
      }
      username.text = texts
    })
    socket.on('currentRooms',function(rooms){
      for (var i in rooms) {
        if (rooms.hasOwnProperty(i)) {
          if (rooms[i] == null) {
            createroomvisual(i, 'destroy')
          }
          else {
            createroomvisual(i , rooms[i].room, rooms[i].started, rooms[i].name, rooms[i].password)
          }
        }
      }
    })
    socket.on('joining room', function (roomdata) {
      roomId = roomdata
      self.scene.start('room')
    })
    socket.on('delete room', function (room) {
      if (room == null) return
        rooms[room.number].destroy();
        roomtexts[room.number].destroy();
        delete rooms[room.number]
        delete roomtexts[room.number]
    })
    socket.on('disconnect', function (reason){
      if (reason === "io client disconnect" || reason === 'io server disconnect') return
      disconnect()
    })
    createroomrect.on('pointerup', function () {
      createroomlayer.setVisible(true)
      createroomRect2.setVisible(true);
      showpasswordRect.setVisible(true);
      passwordRect.setVisible(true);
      roomnameRect.setVisible(true);
      backbutton.setVisible(true);
    })
  }
}
