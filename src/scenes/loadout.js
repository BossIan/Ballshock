var gunpreview;
var gunprev2;
var gunY = 0;
export default class loadout extends Phaser.Scene {
  constructor(){
    super({key: "loadout"});
  }
  create(){
    var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    key_ESC.on('up', function () {
      this.scene.start('menu')
    },this)
    var self = this;
    var loadoutno = 1;
    var savedloadout1 = JSON.parse(localStorage.getItem('loadout1'));
    var savedloadout2 = JSON.parse(localStorage.getItem('loadout2'));
    var savedloadout3 = JSON.parse(localStorage.getItem('loadout3'));
    if (savedloadout1 == null) {
      savedloadout1 = {gun: 'gun1',character: 'character1', secondary: '', }
      savedloadout2 = {gun: 'AncientDischargeGun',character: 'character1', secondary: '', }
      savedloadout3 = {gun: 'gun1',character: 'character1', secondary: '', }
      localStorage.setItem('loadout1',JSON.stringify(savedloadout1));
      localStorage.setItem('loadout2',JSON.stringify(savedloadout2));
      localStorage.setItem('loadout3',JSON.stringify(savedloadout3));
    }
    //images
    //preview screen
    var characterpreview = this.add.image(484, 512, savedloadout1.character, 0).setDepth(2).setScale(20, 20)
    var characterselect = this.add.image(1545, 800, savedloadout1.character, 0).setDepth(2).setScale(10, 10)
    gunpreview = this.add.image(484, 712, savedloadout1.gun).setDepth(2).setScale(20, 20)
    var gunselect = this.add.image(1240, 280, savedloadout1.gun).setDepth(2).setScale(10, 10)
    //select gun screen
    var gun1 = this.add.image(250, 1050, "gun1").setScale(10, 10).setVisible(false).setDepth(2)
    var ancientDischargeGun = this.add.image(750, 1050, "AncientDischargeGun").setScale(10, 10).setVisible(false).setDepth(2)
    var characterprev2 = this.add.image(1060, 450, "character1", 0).setScale(20, 20).setVisible(false)
		gunprev2 = this.add.image(1060, 650, "gun1").setScale(20, 20).setVisible(false)

    //select rectangles
		var secondaryrect = this.add.image(1832, 280, '128rectangle').setScale(4.5, 4.5)
		var primaryrect = this.add.image(968, 272, '128rectangle').setScale(4.5, 4.5).setOrigin(0, 0.5).setInteractive();
		var characterrect = this.add.image(1544, 880, '128rectangle').setScale(9, 5)

    //select gun screen rectangles
		var gun1rect = this.add.image(0, 1200, '250rectangle').setScale(2, 2).setOrigin(0, 1).setInteractive().setVisible(false);
    var gun2rect = this.add.image(500, 1200, '250rectangle').setScale(2, 2).setOrigin(0, 1).setInteractive().setVisible(false);

    //number rectangles
		var rect1 = this.add.image(228, 1024, 'button1', 1).setInteractive().setOrigin(0.5, 0);
    rect1.on('pointerup', function () {
      rect1.setFrame(1);
      rect2.setFrame(0);
      rect3.setFrame(0);
      loadoutno = 1;
      characterpreview.setTexture(savedloadout1.character)
      characterselect.setTexture(savedloadout1.character)
      gunpreview.setTexture(savedloadout1.gun)
      gunselect.setTexture(savedloadout1.gun)
   });
		var rect2 = this.add.image(484, 1024, 'button2', 0).setInteractive().setOrigin(0.5, 0);
    rect2.on('pointerup', function () {
      rect1.setFrame(0);
      rect2.setFrame(1);
      rect3.setFrame(0);
      loadoutno = 2;
      characterpreview.setTexture(savedloadout2.character)
      characterselect.setTexture(savedloadout2.character)
      gunpreview.setTexture(savedloadout2.gun)
      gunselect.setTexture(savedloadout2.gun)
   });
		var rect3 = this.add.image(740, 1024, 'button3', 0).setInteractive().setOrigin(0.5, 0);
    rect3.on('pointerup', function () {
      rect1.setFrame(0);
      rect2.setFrame(0);
      rect3.setFrame(1);
      loadoutno = 3;
      characterpreview.setTexture(savedloadout3.character)
      characterselect.setTexture(savedloadout3.character)
      gunpreview.setTexture(savedloadout3.gun)
      gunselect.setTexture(savedloadout3.gun)
   });


		//texts
    var Charactertext = this.add.text(1544, 1040, "Character", {}).setScale(9, 9).setOrigin(0.5, 0).setStyle({"color":"#050101ff","stroke":"#de7e7eff"});
    var Primarytext = this.add.text(1256, 440, "Primary", {}).setScale(4.5, 4.5).setOrigin(0.5, 0).setStyle({"color":"#060606ff"});
    var Secondarytext = this.add.text(1832, 440, "Secondary", {}).setScale(4.5, 4.5).setOrigin(0.5, 0).setStyle({"color":"#000000ff"});
    primaryrect.on('pointerup', function () {
      characterpreview.setVisible(false)
      characterselect.setVisible(false)
      gunpreview.setVisible(false)
      gunselect.setVisible(false)
      secondaryrect.setVisible(false)
      primaryrect.setVisible(false)
      characterrect.setVisible(false)
      rect1.setVisible(false)
      rect2.setVisible(false)
      rect3.setVisible(false)
      Charactertext.setVisible(false)
      Primarytext.setVisible(false)
      Secondarytext.setVisible(false)
      gun1.setVisible(true)
      ancientDischargeGun.setVisible(true)
      characterprev2.setVisible(true)
      gunprev2.setVisible(true)
      gun1rect.setVisible(true)
      gun2rect.setVisible(true)
    })
    gun1rect.on('pointerup', function () {
      characterpreview.setVisible(true)
      characterselect.setVisible(true)
      gunpreview.setVisible(true)
      gunselect.setVisible(true)
      secondaryrect.setVisible(true)
      primaryrect.setVisible(true)
      characterrect.setVisible(true)
      rect1.setVisible(true)
      rect2.setVisible(true)
      rect3.setVisible(true)
      Charactertext.setVisible(true)
      Primarytext.setVisible(true)
      Secondarytext.setVisible(true)
      gun1.setVisible(false)
      ancientDischargeGun.setVisible(false)
      characterprev2.setVisible(false)
      gunprev2.setVisible(false)
      gun1rect.setVisible(false)
      gun2rect.setVisible(false)
      if (loadoutno == 1) {
        savedloadout1.gun = 'gun1';
        localStorage.setItem('loadout1',JSON.stringify(savedloadout1));
        gunpreview.setTexture(savedloadout1.gun)
        gunselect.setTexture(savedloadout1.gun)
      }
      else if (loadoutno == 2) {
        savedloadout2.gun = 'gun1';
        localStorage.setItem('loadout1',JSON.stringify(savedloadout2));
        gunpreview.setTexture(savedloadout2.gun)
        gunselect.setTexture(savedloadout2.gun)
      }
      else {
        savedloadout3.gun = 'gun1';
        localStorage.setItem('loadout1',JSON.stringify(savedloadout3));
        gunpreview.setTexture(savedloadout3.gun)
        gunselect.setTexture(savedloadout3.gun)
      }
    })
    gun2rect.on('pointerup', function () {
      characterpreview.setVisible(true)
      characterselect.setVisible(true)
      gunpreview.setVisible(true)
      gunselect.setVisible(true)
      secondaryrect.setVisible(true)
      primaryrect.setVisible(true)
      characterrect.setVisible(true)
      rect1.setVisible(true)
      rect2.setVisible(true)
      rect3.setVisible(true)
      Charactertext.setVisible(true)
      Primarytext.setVisible(true)
      Secondarytext.setVisible(true)
      threetext.setVisible(true)
      twotext.setVisible(true)
      onetext.setVisible(true)
      gun1.setVisible(false)
      ancientDischargeGun.setVisible(false)
      characterprev2.setVisible(false)
      gunprev2.setVisible(false)
      gun1rect.setVisible(false)
      gun2rect.setVisible(false)
      if (loadoutno == 1) {
        savedloadout1.gun = 'AncientDischargeGun';
        localStorage.setItem('loadout1',JSON.stringify(savedloadout1));
        gunpreview.setTexture(savedloadout1.gun)
        gunselect.setTexture(savedloadout1.gun)
      }
      else if (loadoutno == 2) {
        savedloadout2.gun = 'AncientDischargeGun';
        localStorage.setItem('loadout1',JSON.stringify(savedloadout2));
        gunpreview.setTexture(savedloadout2.gun)
        gunselect.setTexture(savedloadout2.gun)
      }
      else {
        savedloadout3.gun = 'AncientDischargeGun';
        localStorage.setItem('loadout1',JSON.stringify(savedloadout3));
        gunpreview.setTexture(savedloadout3.gun)
        gunselect.setTexture(savedloadout3.gun)
      }
    })
  }
  update(){
    if (gunY >= 12) {
      gunpreview.moveup = true;
    }
    else if (gunY <= 0) {
      gunpreview.moveup = false;
    }
    if (gunpreview.moveup) {
      gunY -= 0.5
    }
    else {
      gunY += 0.5
    }
    gunpreview.y = gunY + 700
    gunprev2.y = gunY + 650
  }
}
