import logo from './logo'
export default class prelogo extends Phaser.Scene {
  constructor(){
    super({key: "prelogo"});
  }
	preload(){
    this.load.setPath('assets/');
    this.load.image('logo', 'logo.png')
}
	create(){
  this.scene.start('logo');
	}
}
