var gunpreview;
var primarypreview;
var secondarypreview;
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
    var backbutton = this.add.image(85, 85, "backbutton").setInteractive();
    backbutton.on('pointerup', function () {
     this.scene.start('menu');
    }, this);
    var self = this;
    var savedloadout1 = JSON.parse(localStorage.getItem('loadout1'));
    var savedloadout2 = JSON.parse(localStorage.getItem('loadout2'));
    var savedloadout3 = JSON.parse(localStorage.getItem('loadout3'));
    var selectedloadout = savedloadout1;
//preview screen
    var characterpreview = this.add.image(484, 512, selectedloadout.character, 0).setDepth(2).setScale(20, 20)
    var characterselect = this.add.image(1545, 840, selectedloadout.character, 0).setDepth(2).setScale(10, 10)
    gunpreview = this.add.image(484, 712, selectedloadout.primary).setDepth(2).setScale(20, 20)
    var primaryselect = this.add.image(1240, 280, selectedloadout.primary).setDepth(2).setScale(10, 10)
    var secondaryselect = this.add.image(1832, 280, selectedloadout.secondary).setDepth(2).setScale(10, 10)
    //number rectangles
    var rect1 = this.add.image(228, 1024, 'button1', 1).setInteractive().setOrigin(0.5, 0);
    var rect2 = this.add.image(484, 1024, 'button2', 0).setInteractive().setOrigin(0.5, 0);
    var rect3 = this.add.image(740, 1024, 'button3', 0).setInteractive().setOrigin(0.5, 0);

//select primary screen
    var primaryrect = this.add.image(968, 272, '128rectangle').setScale(4.5, 4.5).setOrigin(0, 0.5).setInteractive();
    var Primarytext = this.add.text(1256, 440, "Primary", {}).setScale(4.5, 4.5).setOrigin(0.5, 0).setStyle({"color":"#060606ff"});
    var characterprimarypreview = this.add.image(1060, 450, selectedloadout.character, 0).setScale(20, 20).setVisible(false)
		primarypreview = this.add.image(1060, 650, selectedloadout.primary).setScale(20, 20).setVisible(false)
    //select primary screen rectangles
		var gun1rect = this.add.image(0, 1200, '250rectangle').setScale(2, 2).setOrigin(0, 1).setInteractive().setVisible(false);
    var ancientDischargeGunrect = this.add.image(500, 1200, '250rectangle').setScale(2, 2).setOrigin(0, 1).setInteractive().setVisible(false);
    //primary guns
    var gun1 = this.add.image(250, 1050, "gun1").setScale(10, 10).setVisible(false).setDepth(2)
    var ancientDischargeGun = this.add.image(750, 1050, "AncientDischargeGun").setScale(10, 10).setVisible(false).setDepth(2)

//select secondary screen rectangles
    var secondaryrect = this.add.image(1832, 280, '128rectangle').setScale(4.5, 4.5).setInteractive();
    var Secondarytext = this.add.text(1832, 440, "Secondary", {}).setScale(4.5, 4.5).setOrigin(0.5, 0).setStyle({"color":"#000000ff"});
    var charactersecondarypreview = this.add.image(1060, 450, selectedloadout.character, 0).setScale(20, 20).setVisible(false)
		secondarypreview = this.add.image(1060, 650, selectedloadout.secondary).setScale(20, 20).setVisible(false)
    //select primary screen rectangles
    var SolFlairGun1rect = this.add.image(0, 1200, '250rectangle').setScale(2, 2).setOrigin(0, 1).setInteractive().setVisible(false);
    //secondary guns
    var SolFlairGun = this.add.image(250, 1050, "SolFlairGun").setScale(10, 10).setVisible(false).setDepth(2)

		//texts
    var characterrect = this.add.image(1544, 880, '128rectangle').setScale(9, 5)
    var Charactertext = this.add.text(1544, 1040, "Character", {}).setScale(9, 9).setOrigin(0.5, 0).setStyle({"color":"#050101ff","stroke":"#de7e7eff"});

    rect1.on('pointerup', function () {
      rect1.setFrame(1);
      rect2.setFrame(0);
      rect3.setFrame(0);
      selectedloadout = savedloadout1;
      settextureloadout()
    });
    rect2.on('pointerup', function () {
      rect1.setFrame(0);
      rect2.setFrame(1);
      rect3.setFrame(0);
      selectedloadout = savedloadout2;
      settextureloadout()
    });
    rect3.on('pointerup', function () {
      rect1.setFrame(0);
      rect2.setFrame(0);
      rect3.setFrame(1);
      selectedloadout = savedloadout3;
      settextureloadout()
   });
    //primary
    primaryrect.on('pointerup', function () {
      setpreviewscreen(false)
      gun1.setVisible(true)
      ancientDischargeGun.setVisible(true)
      characterprimarypreview.setVisible(true)
      primarypreview.setVisible(true)
      gun1rect.setVisible(true)
      ancientDischargeGunrect.setVisible(true)
      primarypreview.setTexture(selectedloadout.primary)
    })
    gun1rect.on('pointerup', function () {
      setpreviewscreen(true)
      gun1.setVisible(false)
      ancientDischargeGun.setVisible(false)
      characterprimarypreview.setVisible(false)
      primarypreview.setVisible(false)
      gun1rect.setVisible(false)
      ancientDischargeGunrect.setVisible(false)
      selectedloadout.primary = 'gun1';
      if (selectedloadout == savedloadout1) {
        localStorage.setItem('loadout1',JSON.stringify(selectedloadout));
      }
      else if (selectedloadout == savedloadout2) {
        localStorage.setItem('loadout2',JSON.stringify(selectedloadout));
      }
      else {
        localStorage.setItem('loadout3',JSON.stringify(selectedloadout));
      }
      gunpreview.setTexture(selectedloadout.primary)
      primaryselect.setTexture(selectedloadout.primary)
    })
    ancientDischargeGunrect.on('pointerup', function () {
      setpreviewscreen(true)
      characterprimarypreview.setVisible(false)
      primarypreview.setVisible(false)
      gun1rect.setVisible(false)
      gun1.setVisible(false)
      ancientDischargeGunrect.setVisible(false)
      ancientDischargeGun.setVisible(false)
      selectedloadout.primary = 'AncientDischargeGun';
      if (selectedloadout == savedloadout1) {
        localStorage.setItem('loadout1',JSON.stringify(selectedloadout));
      }
      else if (selectedloadout == savedloadout2) {
        localStorage.setItem('loadout2',JSON.stringify(selectedloadout));
      }
      else {
        localStorage.setItem('loadout3',JSON.stringify(selectedloadout));
      }
      gunpreview.setTexture(selectedloadout.primary)
      primaryselect.setTexture(selectedloadout.primary)
    })
    //secondary
    secondaryrect.on('pointerup', function () {
      setpreviewscreen(false)
      charactersecondarypreview.setVisible(true)
      secondarypreview.setVisible(true)
      SolFlairGun1rect.setVisible(true)
      SolFlairGun.setVisible(true)
      secondarypreview.setTexture(selectedloadout.secondary)
    })
    SolFlairGun1rect.on('pointerup', function () {
      setpreviewscreen(true)
      charactersecondarypreview.setVisible(false)
      secondarypreview.setVisible(false)
      SolFlairGun1rect.setVisible(false)
      SolFlairGun.setVisible(false)
      selectedloadout.secondary = 'SolFlairGun';
      if (selectedloadout == savedloadout1) {
        localStorage.setItem('loadout1',JSON.stringify(selectedloadout));
      }
      else if (selectedloadout == savedloadout2) {
        localStorage.setItem('loadout2',JSON.stringify(selectedloadout));
      }
      else {
        localStorage.setItem('loadout3',JSON.stringify(selectedloadout));
      }
      secondaryselect.setTexture(selectedloadout.secondary)
    })
    function settextureloadout() {
      characterpreview.setTexture(selectedloadout.character)
      characterselect.setTexture(selectedloadout.character)
      gunpreview.setTexture(selectedloadout.primary)
      primaryselect.setTexture(selectedloadout.primary)
      secondaryselect.setTexture(selectedloadout.secondary)
    }
    function setpreviewscreen(boolean) {
      characterpreview.setVisible(boolean)
      characterselect.setVisible(boolean)
      gunpreview.setVisible(boolean)
      primaryselect.setVisible(boolean)
      secondaryselect.setVisible(boolean)
      secondaryrect.setVisible(boolean)
      primaryrect.setVisible(boolean)
      characterrect.setVisible(boolean)
      rect1.setVisible(boolean)
      rect2.setVisible(boolean)
      rect3.setVisible(boolean)
      Charactertext.setVisible(boolean)
      Primarytext.setVisible(boolean)
      Secondarytext.setVisible(boolean)
    }
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
    primarypreview.y = gunY + 650
    secondarypreview.y = gunY + 650
  }
}
