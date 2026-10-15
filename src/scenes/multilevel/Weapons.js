import { socket } from '../lobby';
import { GUNS, OVERHEAT, SFX, sfxKey } from './config';
import { activate } from './bullets';

const newSlot = () => ({ cooldown: 0, overheat: 0, canShoot: true });

// Weapon state (selected slot, cooldowns, overheat) and firing.
export default class Weapons {
  constructor(scene) {
    this.scene = scene;
    this.slots = { primary: newSlot(), secondary: newSlot() };
    this.selected = 'primary';
    this.loadout = null;
  }

  setLoadout(loadout) { this.loadout = loadout; }
  select(slot) { this.selected = slot; }
  get gunKey() { return this.loadout[this.selected]; }

  update(shooting, frames) {
    const { scene } = this;
    const slot = this.slots[this.selected];

    Object.values(this.slots).forEach((s) => { s.cooldown -= frames; });
    if (shooting && scene.player.active && slot.canShoot && slot.cooldown <= 0) {
      this.fire(this.selected);
    }
    Object.keys(this.slots).forEach((name) => this.coolDown(name, frames));
    scene.player.setOverheat(slot.overheat, !slot.canShoot);
  }

  coolDown(name, frames) {
    const s = this.slots[name];
    if (s.overheat >= OVERHEAT.max) {
      s.overheat = OVERHEAT.vented;
      s.canShoot = false;
      this.scene.player.overheatFx();
      this.scene.sfx.play(SFX.overheat);
      socket.emit('overheat');
      s.overheat -= OVERHEAT.coolPerFrame * frames;
    } else if (s.overheat <= 0) {
      s.overheat = 0;
      s.canShoot = true;
    } else {
      s.overheat -= OVERHEAT.coolPerFrame * frames;
    }
  }

  fire(name) {
    const { scene } = this;
    const slot = this.slots[name];
    const gunKey = this.loadout[name];
    const gun = GUNS[gunKey];
    if (!gun) return;

    const pool = scene.bulletPools[scene.myId];
    const { gun: gunSprite, sprite } = scene.player;
    const aim = gunSprite.rotation;
    const steps = gun.fan ? Phaser.Utils.Array.NumberArray(-gun.fan.half, gun.fan.half) : [0];

    steps.forEach((step) => {
      const bullet = pool.getFirstDead(false);
      if (!bullet) return;

      const roll = Phaser.Math.Between(-gun.spread, gun.spread);
      let rotation;
      let vx;
      let vy;
      if (gun.fan) {
        rotation = aim + step * gun.fan.step;
        const v = scene.physics.velocityFromRotation(rotation, gun.speed);
        vx = v.x + roll * slot.overheat * gun.fan.jitter;
        vy = v.y + roll * slot.overheat * gun.fan.jitter;
      } else {
        rotation = aim + roll * gun.spreadFactor * slot.overheat;
        const v = scene.physics.velocityFromRotation(rotation, gun.speed);
        vx = v.x;
        vy = v.y;
      }

      activate(scene, bullet, gunKey, gunSprite.x, gunSprite.y);
      bullet.rotation = rotation;
      bullet.body.velocity.set(vx, vy);
      socket.emit('bulletshot', { name: bullet.name, velocityY: vy, velocityX: vx, gravity: !!gun.gravity });

      if (gun.explosive) {
        scene.time.delayedCall(gun.explosive.fuse, () => socket.emit('BoomsmithBoom', bullet.name));
      }
    });

    slot.cooldown = gun.cooldown;
    slot.overheat += gun.overheat;
    scene.sfx.play(sfxKey(gunKey));
    sprite.body.velocity.x += (sprite.flipX ? 1 : -1) * gun.recoil; // recoil pushes against facing
  }
}
