export default class testlevel extends Phaser.Scene {
  constructor(){
    super({key: "testlevel"});
  }
	preload(){
    this.load.setPath('assets/');
    this.load.image('character1', 'character1.png')
}
	create(){
    this.add.image(50, 50, 'character1')
	}
  update(){
  }
}
