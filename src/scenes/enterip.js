export var address = '';
var ip;
export default class enterip extends Phaser.Scene {
  constructor(){
    super({key: "enterip"});
  }
  create(){
    var self = this;
    var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    key_ESC.on('up', function () {
      this.scene.start('menu')
    },this)
    this.add.text(100, 100, 'Enter ip:', { font: '40px Courier', fill: '#000000' });
    this.add.text(100, 200, 'Press Enter without ip to join the official server.', { font: '40px Courier', fill: '#000000' });
    ip = this.add.text(100, 150, '', { font: '40px Courier', fill: '#000000' });
    this.input.keyboard.on('keydown', function (event) {
        if (event.keyCode === 8 && ip.text.length > 0){
          ip.text = ip.text.substr(0, ip.text.length - 1);
        }
          else if (event.keyCode >= 95 &&  event.keyCode <= 110 || event.keyCode === 189 || event.keyCode === 186 || event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90 || event.keyCode === 190 || event.keyCode === 90)){
            if (ip.text.length < 100) {
              ip.text += event.key;
            }
          }
          else if (event.keyCode === 13 && ip.text.length > 0) {
            address = ip.text;
            self.scene.start('multilevel');
          }
          else if (event.keyCode === 13 && ip.text.length == 0) {
            address = 'ballshock-server.herokuapp.com';
            self.scene.start('multilevel');
          }
        });
  }
  update(){
  }
}
