import { DEPTH } from './config';

const NAME_STYLE = { font: '15px Corbel', fill: '#FFFFFF' };

// One other player in the room. All six display objects live and die together.
export default class RemotePlayer {
  constructor(scene, info) {
    const { x, y } = info;
    this.id = info.playerId;
    this.body = scene.add.sprite(x, y, 'Character', 0).setDepth(DEPTH.remoteBody);
    this.character = scene.add.sprite(x, y, info.playercharacter, 0).setDepth(DEPTH.remoteBody);
    this.afterimage = scene.add.sprite(x, y, 'CharacterAfterimage', 0).setVisible(false);
    this.gun = scene.add.image(x, y + 13, info.playergun).setDepth(DEPTH.remoteGun);
    this.nameText = scene.add.text(x, y - 35, info.playername, NAME_STYLE)
      .setDepth(DEPTH.hudText).setOrigin(0.5, 0);
    this.hpBar = scene.add.image(x, y + 25, 'otherhpbar')
      .setDepth(DEPTH.hudText).setScale(0.5).setOrigin(0.5, 0);
  }

  // otherx/y and otherx2/y2 are the trailing positions the sender computes (see LocalPlayer.emitMovement)
  moveTo(info, ox, oy, ox2, oy2) {
    this.body.setPosition(info.x, info.y);
    this.afterimage.setPosition(ox, oy);
    this.gun.setPosition(ox, oy + 7);
    this.character.setPosition(ox2, oy2);
    this.nameText.setPosition(info.x, info.y - 35);
    this.hpBar.setPosition(info.x, info.y + 25);
  }

  setAlive(alive) {
    this.body.setActive(alive);
    [this.body, this.character, this.gun, this.nameText, this.hpBar].forEach((o) => o.setVisible(alive));
  }

  setFlip(flipped) {
    this.body.flipX = flipped;
    this.character.flipX = flipped;
  }

  setGunRotation(r) { this.gun.rotation = r; }
  setHealth(hp) { this.hpBar.setCrop(0, 0, Math.max(0, hp), 8); }

  setLoadout(info) {
    this.character.setTexture(info.playercharacter);
    this.gun.setTexture(info.playergun);
  }

  playAnim(key) {
    this.body.anims.play(key);
    this.afterimage.setVisible(true);
    this.body.once('animationcomplete', () => this.afterimage.setVisible(false));
  }

  destroy() {
    [this.body, this.character, this.afterimage, this.gun, this.nameText, this.hpBar].forEach((o) => o.destroy());
  }
}
