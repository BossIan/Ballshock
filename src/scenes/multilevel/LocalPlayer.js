import { socket } from '../lobby';
import { DEPTH, PLAYER } from './config';

const NAME_STYLE = { font: '15px Corbel', fill: '#FFFFFF' };
const noGravity = (obj) => { obj.body.allowGravity = false; return obj; };

// Everything that makes up the local player: body, skin overlay, gun, labels, camera target.
export default class LocalPlayer {
  constructor(scene, { id, name, character, gun }) {
    const { x, y } = PLAYER.firstSpawn;
    const A = DEPTH.playerAttachment;
    this.scene = scene;

    this.sprite = scene.physics.add.sprite(x, y, 'Character', 0).setDepth(DEPTH.player);
    this.sprite.playerId = id; // checked by explosion hit-tests
    this.sprite.setMaxVelocity(PLAYER.maxVelocity).setCollideWorldBounds(true);

    this.character = noGravity(scene.physics.add.sprite(x, y, character, 0)).setDepth(DEPTH.player);
    this.afterimage = noGravity(scene.physics.add.image(x, y, 'CharacterAfterimage'))
      .setDepth(DEPTH.afterimage).setVisible(false);
    this.camTarget = noGravity(scene.physics.add.image(x, y, 'CharacterAfterimage')).setVisible(false);

    this.gun = scene.add.image(x, y, gun).setDepth(A);
    this.nameText = scene.add.text(x, y, name, NAME_STYLE).setDepth(A).setOrigin(0.5, 0);
    this.healthBar = scene.add.image(x, y, 'hpbar').setDepth(A).setScale(0.5);
    this.overheatText = scene.add.sprite(x, y, 'overheattext', 0).setDepth(A).setVisible(false);

    this.overheatBar = scene.add.image(x, y, 'overheatbar').setDepth(A).setScale(0.5).setVisible(false);
    this.lastPos = null;
  }

  get active() { return this.sprite.active; }

  setAlive(alive) {
    if (!alive) this.sprite.setVelocity(0, 0);
    [this.sprite, this.character, this.gun, this.nameText, this.healthBar].forEach((o) => o.setVisible(alive));
    this.sprite.setActive(alive);
  }

  revive(x, y) {
    this.sprite.setPosition(x, y);
    this.setAlive(true);
  }
  
  showPlayerHud() { this.overheatBar.setVisible(true); }
  setHealth(hp) { this.healthBar.setCrop(0, 0, Math.max(0, hp), 8); }
  setGun(texture) { this.gun.setTexture(texture); }
  setCharacter(texture) { this.character.setTexture(texture); }

  setFacing(flipX) {
    this.sprite.flipX = flipX;
    this.character.flipX = flipX;
    socket.emit('playerflip', { flipped: flipX });
  }

  playAnim(key, { afterimage = true } = {}) {
    this.sprite.anims.play(key);
    if (afterimage) {
      this.afterimage.setPosition(this.sprite.x, this.sprite.y).setVisible(true);
      this.sprite.once('animationcomplete', () => this.afterimage.setVisible(false));
    }
    socket.emit('playeranim', { curanim: key });
  }

  // Dash visual: no body animation, just a black ghost left at the start point that fades out.
  dashEffect(duration) {
    const a = this.afterimage;
    this.scene.tweens.killTweensOf(a);
    a.setPosition(this.sprite.x, this.sprite.y).setFlipX(this.sprite.flipX).setAlpha(1).setVisible(true);
    this.afterimageFrozen = true;
    this.scene.tweens.add({
      targets: a, alpha: 0, duration,
      onComplete: () => { a.setVisible(false).setAlpha(1); this.afterimageFrozen = false; },
    });
    socket.emit('playeranim', { curanim: 'dash' });
  }

  overheatFx() {
    this.overheatText.setPosition(this.sprite.x, this.sprite.y - 10).setVisible(true);
    this.overheatText.anims.play('overheat!');
  }

  // The skin overlay trails the body by one step; remotes rely on this payload shape.
  emitMovement() {
    const { x, y } = this.sprite;
    const old = this.lastPos;
    if (old && (x !== old.x || y !== old.y)) {
      socket.emit('playerMovement', {
        x, y,
        otherx: old.x, othery: old.y,
        otherx2: this.character.x, othery2: this.character.y,
      });
      this.character.setPosition(old.x, old.y);
    }
    this.lastPos = { x, y };
  }
  setOverheat(value, hot) {
    this.overheatBar.setCrop(0, 0, value, 8);
    if (hot) this.overheatBar.setTint(0xff8800);
    else this.overheatBar.clearTint();
  }
  // Per-frame follow for the attachments + camera target.
  sync() {
    const { x, y } = this.sprite;
    this.gun.setPosition(x, y + 7);
    if (!this.afterimageFrozen) this.afterimage.setPosition(x, y);
    this.healthBar.setPosition(x, y + 20);
    this.nameText.setPosition(x, y - 40);
    this.overheatBar.setPosition(x, y + 25)
    if (this.camTarget.x !== x || this.camTarget.y !== y) {
      this.scene.physics.moveToObject(this.camTarget, this.sprite, 200, 100);
    }
  }
}
