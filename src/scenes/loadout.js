var gunpreview;
var primarypreview;
var primarypreview;
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
    var backbutton = this.add.image(85, 85, "backbutton").setInteractive({useHandCursor: true});
    backbutton.on('pointerup', function () {
     this.scene.start('menu');
    }, this);
    var self = this;
    var savedloadout1 = JSON.parse(localStorage.getItem('loadout1'));
    var savedloadout2 = JSON.parse(localStorage.getItem('loadout2'));
    var savedloadout3 = JSON.parse(localStorage.getItem('loadout3'));
    var selectedloadout = savedloadout1;
//preview screen
    {
    var ballpreview = this.add.image(484, 512, 'Character', 0).setDepth(2).setScale(15, 15).setTint(selectedloadout.characterTint)
    var ballselectprev = this.add.image(1545, 840, 'Character', 0).setDepth(2).setScale(7, 7).setTint(selectedloadout.characterTint)
    var characterpreview = this.add.image(484, 512, selectedloadout.character).setDepth(2).setScale(15, 15)
    var characterselectprev = this.add.image(1545, 840, selectedloadout.character).setDepth(2).setScale(7, 7)
    var characterrect = this.add.image(1544, 885, '256rectangle').setScale(4.5, 4.5).setInteractive({useHandCursor: true})
    var Charactertext = this.add.text(1544, 1040, 'Character', {}).setScale(9, 9).setOrigin(0.5, 0.5).setStyle({"color":"#050101ff","stroke":"#de7e7eff"});
    gunpreview = this.add.image(484, 712, selectedloadout.primary).setDepth(2).setScale(15, 15)
    var primaryselectprev = this.add.image(1240, 280, selectedloadout.primary).setDepth(2).setScale(7, 7)
    var primaryrect = this.add.image(968, 280, '128rectangle').setScale(4.5, 4.5).setOrigin(0, 0.5).setInteractive({useHandCursor: true});
    var Primarytext = this.add.text(1256, 440, 'Primary', {}).setScale(4.5, 4.5).setOrigin(0.5, 0.5).setStyle({"color":"#060606ff"});
    var secondaryselectprev = this.add.image(1832, 280, selectedloadout.secondary).setDepth(2).setScale(7, 7)
    var secondaryrect = this.add.image(1832, 280, '128rectangle').setScale(4.5, 4.5).setInteractive({useHandCursor: true});
    var Secondarytext = this.add.text(1832, 440, 'Secondary', {}).setScale(4.5, 4.5).setOrigin(0.5, 0.5).setStyle({"color":"#000000ff"});
  }
  //number rectangles
    var rect1 = this.add.image(228, 1024, 'button1', 1).setInteractive({useHandCursor: true}).setOrigin(0.5, 0);
    var rect2 = this.add.image(484, 1024, 'button2', 0).setInteractive({useHandCursor: true}).setOrigin(0.5, 0);
    var rect3 = this.add.image(740, 1024, 'button3', 0).setInteractive({useHandCursor: true}).setOrigin(0.5, 0);
//select screens
  //previews
  var ballprimarypreview = this.add.image(1060, 450, 'Character', 0).setScale(15, 15).setVisible(false)
  var characterprimarypreview = this.add.image(1060, 450, selectedloadout.character, 0).setScale(15, 15).setVisible(false)
  primarypreview = this.add.image(1060, 650, selectedloadout.primary).setScale(15, 15).setVisible(false)
//select primary screen rectangles
    var Primary_gun_rectangle = {}
    for (var i = 0; i < 4; i++) {
      Primary_gun_rectangle[i] = this.add.image(0 + 500 * i, 1200, '250rectangle').setScale(2, 2).setOrigin(0, 1).setInteractive({useHandCursor: true}).setVisible(false);
    }
  //primary guns
    var gun1 = this.add.image(250, 1025, "gun1").setScale(7, 7).setDepth(2)
    var ancientDischargeGun = this.add.image(750, 1025, "AncientDischargeGun").setScale(7, 7).setDepth(2)
    var thunderscreamGun = this.add.image(1250, 1025, "ThunderScreamGun").setScale(7, 7).setDepth(2)
    var boomsmith = this.add.image(1750, 1025, "Boomsmith").setScale(7, 7).setDepth(2)
    Primary_gun_rectangle[0].on('pointerup', function () {
      setpreviewscreen(true)
      primarygunchange('gun1')
    })
    Primary_gun_rectangle[1].on('pointerup', function () {
      setpreviewscreen(true)
      primarygunchange('AncientDischargeGun')
    })
    Primary_gun_rectangle[2].on('pointerup', function () {
      setpreviewscreen(true)
      primarygunchange('ThunderScreamGun')
    })
    Primary_gun_rectangle[3].on('pointerup', function () {
      setpreviewscreen(true)
      primarygunchange('Boomsmith')
    })
//select secondary screen rectangles
    var Secondary_gun_rectangle = {}
    for (var i = 0; i < 2; i++) {
      Secondary_gun_rectangle[i] = this.add.image(0 + 500 * i, 1200, '250rectangle').setScale(2, 2).setOrigin(0, 1).setInteractive({useHandCursor: true}).setVisible(false);
    }
  //secondary guns
    var solflairGun = this.add.image(250, 1025, "SolFlairGun").setScale(7, 7).setDepth(2)
    var superchargedfractal = this.add.image(750, 1025, "SuperchargedFractal").setScale(7, 7).setDepth(2)
    Secondary_gun_rectangle[0].on('pointerup', function () {
      setpreviewscreen(true)
      secondarygunchange('SolFlairGun')
    })
    Secondary_gun_rectangle[1].on('pointerup', function () {
      setpreviewscreen(true)
      secondarygunchange('SuperchargedFractal')
    })

//select character screen rectangles
    var Character_rectangle = {}
    for (var i = 0; i < 6; i++) {
      Character_rectangle[i] = this.add.image(0 + 500 * i, 1200, '250rectangle').setScale(2, 2).setOrigin(0, 1).setInteractive({useHandCursor: true}).setVisible(false);
    }
    //characters
    var chronoshifter = this.add.image(250, 1025, "Chronoshifter").setScale(7, 7).setDepth(2)
    var bastion = this.add.image(750, 1025, "Bastion").setScale(7, 7).setDepth(2)
    var ghostForce = this.add.image(1250, 1025, "GhostForce").setScale(7, 7).setDepth(2)
    var AideUnit = this.add.image(1750, 1025, "AideUnit").setScale(7, 7).setDepth(2)
    var Vizier = this.add.image(2250, 1025, "Vizier").setScale(7, 7).setDepth(2)
    var Veteran = this.add.image(2750, 1025, "Veteran").setScale(7, 7).setDepth(2)
    Character_rectangle[0].on('pointerup', function () {
      setpreviewscreen(true)
      characterchange('Chronoshifter')
    })
    Character_rectangle[1].on('pointerup', function () {
      setpreviewscreen(true)
      characterchange('Bastion')
    })
    Character_rectangle[2].on('pointerup', function () {
      setpreviewscreen(true)
      characterchange('GhostForce')
    })
    Character_rectangle[3].on('pointerup', function () {
      setpreviewscreen(true)
      characterchange('AideUnit')
    })
    Character_rectangle[4].on('pointerup', function () {
      setpreviewscreen(true)
      characterchange('Vizier')
    })
    Character_rectangle[5].on('pointerup', function () {
      setpreviewscreen(true)
      characterchange('Veteran')
    })
    var loadoutselectionlayer = this.add.layer()
    {
    loadoutselectionlayer.add(characterrect)
    loadoutselectionlayer.add(Charactertext)
    loadoutselectionlayer.add(ballpreview);
    loadoutselectionlayer.add(ballselectprev);
    loadoutselectionlayer.add(characterpreview);
    loadoutselectionlayer.add(characterselectprev);
    loadoutselectionlayer.add(gunpreview)
    loadoutselectionlayer.add(primaryselectprev)
    loadoutselectionlayer.add(secondaryselectprev)
    loadoutselectionlayer.add(rect1)
    loadoutselectionlayer.add(rect2)
    loadoutselectionlayer.add(rect3)
    loadoutselectionlayer.add(primaryrect)
    loadoutselectionlayer.add(Primarytext)
    loadoutselectionlayer.add(secondaryrect)
    loadoutselectionlayer.add(Secondarytext)
}
    var primarylayer = this.add.layer().setVisible(false)
    {
      primarylayer.add(gun1)
    primarylayer.add(ancientDischargeGun)
    primarylayer.add(thunderscreamGun)
    primarylayer.add(boomsmith)
  }

    var secondarylayer = this.add.layer().setVisible(false)
    {
      secondarylayer.add(solflairGun)
      secondarylayer.add(superchargedfractal)
    }

    var characterlayer = this.add.layer().setVisible(false)
    {
      characterlayer.add(chronoshifter)
      characterlayer.add(bastion)
      characterlayer.add(ghostForce)
      characterlayer.add(AideUnit)
      characterlayer.add(Vizier)
      characterlayer.add(Veteran)
    }

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
      ballprimarypreview.setVisible(true)
      characterprimarypreview.setVisible(true)
      primarypreview.setVisible(true)
      primarylayer.setVisible(true)
      for (var i in Primary_gun_rectangle) {
        Primary_gun_rectangle[i].setVisible(true)
      }
      primarypreview.setTexture(selectedloadout.primary)
    })

    //secondary
    secondaryrect.on('pointerup', function () {
      setpreviewscreen(false)
      ballprimarypreview.setVisible(true)
      characterprimarypreview.setVisible(true)
      primarypreview.setVisible(true)
      secondarylayer.setVisible(true)
      for (var i in Secondary_gun_rectangle) {
        Secondary_gun_rectangle[i].setVisible(true)
      }
      primarypreview.setTexture(selectedloadout.secondary)
    })

    //character
    characterrect.on('pointerup', function () {
      setpreviewscreen(false)
      ballprimarypreview.setVisible(true)
      characterprimarypreview.setVisible(true)
      primarypreview.setVisible(true)
      characterlayer.setVisible(true)
      for (var i in Character_rectangle) {
        Character_rectangle[i].setVisible(true)
      }
      characterprimarypreview.setTexture(selectedloadout.character)
      ballprimarypreview.setTint(selectedloadout.characterTint)
    })
    function settextureloadout() {
      gunpreview.setTexture(selectedloadout.primary)
      primaryselectprev.setTexture(selectedloadout.primary)
      secondaryselectprev.setTexture(selectedloadout.secondary)
      characterpreview.setTexture(selectedloadout.character)
      characterselectprev.setTexture(selectedloadout.character)
    }
    function setpreviewscreen(boolean) {
      loadoutselectionlayer.setVisible(boolean)
    }
    function primarygunchange(gun) {
      primarylayer.setVisible(false)
      ballprimarypreview.setVisible(false)
      characterprimarypreview.setVisible(false)
      primarypreview.setVisible(false)
      for (var i in Primary_gun_rectangle) {
        Primary_gun_rectangle[i].setVisible(false)
      }
      selectedloadout.primary = gun;
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
      primaryselectprev.setTexture(selectedloadout.primary)
    }
    function secondarygunchange(gun) {
      secondarylayer.setVisible(false)
      ballprimarypreview.setVisible(false)
      characterprimarypreview.setVisible(false)
      primarypreview.setVisible(false)
      for (var i in Secondary_gun_rectangle) {
        Secondary_gun_rectangle[i].setVisible(false)
      }
      selectedloadout.secondary = gun;
      if (selectedloadout == savedloadout1) {
        localStorage.setItem('loadout1',JSON.stringify(selectedloadout));
      }
      else if (selectedloadout == savedloadout2) {
        localStorage.setItem('loadout2',JSON.stringify(selectedloadout));
      }
      else {
        localStorage.setItem('loadout3',JSON.stringify(selectedloadout));
      }
      secondaryselectprev.setTexture(selectedloadout.secondary)
    }
    function characterchange(character, tint) {
      characterlayer.setVisible(false)
      ballprimarypreview.setVisible(false)
      characterprimarypreview.setVisible(false)
      primarypreview.setVisible(false)
      for (var i in Character_rectangle) {
        Character_rectangle[i].setVisible(false)
      }
      selectedloadout.character = character;
      selectedloadout.characterTint = tint;
      if (selectedloadout == savedloadout1) {
        localStorage.setItem('loadout1',JSON.stringify(selectedloadout));
      }
      else if (selectedloadout == savedloadout2) {
        localStorage.setItem('loadout2',JSON.stringify(selectedloadout));
      }
      else {
        localStorage.setItem('loadout3',JSON.stringify(selectedloadout));
      }
      characterpreview.setTexture(selectedloadout.character)
      characterprimarypreview.setTexture(selectedloadout.character)
      characterselectprev.setTexture(selectedloadout.character)
      ballpreview.setTint(selectedloadout.characterTint)
      ballselectprev.setTint(selectedloadout.characterTint)
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
    primarypreview.y = gunY + 650
  }
}
