import { socket, roomId } from './lobby';
import { map } from './room';
import {
  SCENE_KEY, ZOOM, BG_COLOR, MAX_HEALTH, HEALTHPACK_HEAL, PLAYER, DASH, SPAWN_POINTS, TIMING, FRAME_MS, MAX_DELTA_MS,
  DEPTH, SFX, GUNS, DEFAULT_LOADOUT, ELEVATOR_Y_OFFSET, bulletKey, sfxKey,
} from './multilevel/config';
import remnants from './multilevel/remnants';
import { createPool, activate, retire, findByName } from './multilevel/bullets';
import Controls from './multilevel/Controls';
import Sfx from './multilevel/Sfx';
import Weapons from './multilevel/Weapons';
import Hud from './multilevel/Hud';
import LocalPlayer from './multilevel/LocalPlayer';
import RemotePlayer from './multilevel/RemotePlayer';
import LoadoutMenu from './multilevel/LoadoutMenu';
import MobileControls from './multilevel/MobileControls';
import DisconnectDialog from './multilevel/DisconnectDialog';

const MAPS = { remnants };

// server event -> scene method
const SOCKET_EVENTS = {
  newPlayer: 'onNewPlayer',
  disconnected: 'onPlayerLeft',
  disconnect: 'onSocketDisconnect',
  alived: 'onPlayerAliveChanged',
  deaded: 'onPlayerAliveChanged',
  playerMoved: 'onPlayerMoved',
  testyo: 'onRoomPlayers',
  leaderboardCreate: 'onLeaderboardCreate',
  bullethitted: 'onBulletHitted',
  bulletshotted: 'onBulletShotted',
  gunRotated: 'onGunRotated',
  playeranimed: 'onPlayerAnimed',
  playerfliped: 'onPlayerFlipped',
  healthupdated: 'onHealthUpdated',
  changedloadout: 'onLoadoutChanged',
  healthpackUp: 'onHealthpackUp',
  overheated: 'onOverheated',
  KillBroadcast: 'onKillBroadcast',
  elevatorGoUp: 'onElevatorGoUp',
  BoomsmithBoomed: 'onBoomsmithBoomed',
};

const ANIMS = [
  { key: 'dash', texture: 'Character', frameRate: 5 },
  { key: 'walljump', texture: 'CharacterWalljump', frameRate: 5 },
  { key: 'healthstationidle', texture: 'healthstation', frameRate: 15 },
  { key: 'overheat!', texture: 'overheattext', frameRate: 30, hideOnComplete: true },
  { key: 'BoomsmithBoomAnim', texture: 'BoomforgedBlast', frameRate: 60, hideOnComplete: true },
];

const readSaved = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v == null ? fallback : v;
  } catch (err) {
    return fallback;
  }
};

export default class Multilevel extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEY });
  }

  // ───────────────────────── lifecycle ─────────────────────────

  preload() {
    this.mapDef = MAPS[map];
    if (this.mapDef) this.mapDef.preload(this);
    else console.warn(`[multilevel] unknown map "${map}"`);

    this.load.setPath('assets/ui/mobile');
    ['pause', 'shoot', 'sprint', 'change'].forEach((k) => this.load.image(k, `${k}/Default.png`));
  }

  create() {
    this.resetState();
    this.events.on(Phaser.Scenes.Events.POST_UPDATE, this.syncPlayer, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      clearInterval(this.pingTimer);
      this.events.off(Phaser.Scenes.Events.POST_UPDATE, this.syncPlayer, this);
    });
    this.cameras.main.setZoom(ZOOM).setBackgroundColor(BG_COLOR);
    this.keepRunningWhenUnfocused();
    this.createAnimations();

    this.world = this.mapDef ? this.mapDef.build(this) : this.emptyWorld();
    this.sfx = new Sfx(this);
    this.controls = new Controls(this);
    this.weapons = new Weapons(this);
    this.hud = new Hud(this);

    this.menu = new LoadoutMenu(
      this,
      [1, 2, 3].map((n) => readSaved('loadout' + n, DEFAULT_LOADOUT)),
      { onSpawn: () => this.requestSpawn(), onExit: () => this.leaveToMenu() },
    );
    this.dialog = new DisconnectDialog(this, {
      onQuit: () => this.leaveToMenu(),
      onRetry: () => this.retry(),
    });
    this.mobile = this.isMobile ? this.createMobileControls() : null;

    this.bindKeys();
    this.connect();
  }

  update(time, delta) {
    if (!this.spawned) return;
    this.mobile?.update();
    const frames = Math.min(delta, MAX_DELTA_MS) / FRAME_MS;

    const shooting = this.isMobile ? this.mobile.shooting : this.input.activePointer.isDown;
    this.weapons.update(shooting, frames);
    this.updateAim();
    this.updateMovement(frames);
  }

  syncPlayer() {
    if (!this.spawned) return;
    this.player.emitMovement();
    this.player.sync();
  }
  // ───────────────────────── setup ─────────────────────────

  resetState() {
    this.myId = socket.id;
    this.isMobile = !!(this.sys.game.device.os.android || this.sys.game.device.os.iOS);
    this.savedName = readSaved('name', 'Player');
    this.spawned = false;
    this.disconnected = false;
    this.canMove = true;
    this.dashUntil = 0;   // time.now until which a dash holds our x velocity
    this.dashReadyAt = 0;
    this.dashDir = 1;
    this.dashSpeed = DASH.speed;
    this.health = MAX_HEALTH;
    this.player = null;
    this.remotes = {};       // playerId -> RemotePlayer
    this.bulletPools = {};   // playerId -> physics group (includes our own)
    this.lastPointer = null;
    this.pingTimer = null;
  }

  // The game keeps simulating when the tab loses focus.
  keepRunningWhenUnfocused() {
    this.game.events.off('blur', this.game.onGameBlur, this.game, false);
    this.game.events.off('hidden', this.game.onHidden, this.game, false);
    this.game.events.off('visible', this.game.onVisible, this.game, false);
  }

  createAnimations() {
    ANIMS.forEach(({ texture, ...cfg }) => {
      if (this.anims.exists(cfg.key) || !this.textures.exists(texture)) return;
      this.anims.create({ ...cfg, repeat: 0, frames: this.anims.generateFrameNumbers(texture) });
    });
  }

  emptyWorld() {
    return {
      floors: this.physics.add.staticGroup(),
      elevatorGroup: this.physics.add.group(),
      elevators: [],
      healthStations: [],
      healthPacks: [],
    };
  }

  createMobileControls() {
    return new MobileControls(this, this.controls, {
      onDash: () => this.dash(),
      onSwapGun: () => this.swapGun(this.weapons.selected === 'secondary' ? 'primary' : 'secondary'),
      onDrop: () => this.dropThroughElevators(),
      onWallJump: () => this.tryWallJump(),
      onAim: (rotation) => this.onMobileAim(rotation),
      onFace: (flipX) => this.player?.setFacing(flipX),
    });
  }

  bindKeys() {
    const k = this.controls.keys;
    k.s.on('down', () => this.dropThroughElevators());
    k.one.on('down', () => this.swapGun('primary'));
    k.two.on('down', () => this.swapGun('secondary'));
    k.space.on('down', () => this.tryWallJump());
    k.shift.on('down', () => this.dash());
    k.esc.on('up', () => this.leaveToMenu());
  }

  connect() {
    socket.off();
    Object.entries(SOCKET_EVENTS).forEach(([event, method]) => {
      socket.on(event, (...args) => this[method](...args));
    });
    this.bulletPools[this.myId] = createPool(
      this, this.myId, bulletKey(this.menu.selected.primary), DEPTH.localBullet,
    );
    socket.emit('ingame');
    this.startPing();
  }

  startPing() {
    socket.emit('ping', () => {
      this.hud.setPing(0);
      this.pingTimer = setInterval(() => {
        const start = Date.now();
        socket.volatile.emit('ping', () => {
          const latency = Date.now() - start;
          this.hud.setPing(latency);
          if (latency >= TIMING.disconnectLatency) this.showDisconnect();
        });
      }, TIMING.pingInterval);
    });
  }

  // ───────────────────────── spawn / death ─────────────────────────

  requestSpawn() {
    if (!this.spawned) {
      socket.emit('spawn', () => this.createLocalPlayer());
    } else if (this.health <= 0) {
      this.time.delayedCall(TIMING.respawnDelay, () => this.respawn());
    }
    this.menu.hideAll();
    this.mobile?.setVisible(true);
  }

  createLocalPlayer() {
    const loadout = this.menu.selected;
    this.weapons.setLoadout(loadout);
    this.weapons.select('primary');

    this.player = new LocalPlayer(this, {
      id: this.myId,
      name: this.savedName,
      character: loadout.character,
      gun: loadout.primary,
    });
    this.cameras.main.startFollow(this.player.camTarget);
    this.spawned = true;

    this.physics.add.collider(this.player.sprite, this.world.floors);
    this.physics.add.collider(this.player.sprite, this.world.elevatorGroup);
    socket.emit('data', { name: this.savedName, character: loadout.character, gun: loadout.primary });

    Object.keys(this.bulletPools).forEach((id) => this.registerPoolHit(id));
    this.world.healthPacks.forEach((pack) => {
      this.physics.add.overlap(pack, this.player.sprite, () => this.onHealthpackTouched(pack));
    });
    this.player.showPlayerHud();
  }

  respawn() {
    const loadout = this.menu.selected;
    this.weapons.setLoadout(loadout);
    this.menu.hideAll();

    this.player.setCharacter(loadout.character);
    this.player.setGun(this.weapons.gunKey);
    const spawn = Phaser.Utils.Array.GetRandom(SPAWN_POINTS);
    this.player.revive(spawn.x, spawn.y);

    this.health = MAX_HEALTH;
    this.player.setHealth(this.health);
    socket.emit('healthupdate', { hp: this.health });
    this.canMove = true;
    socket.emit('changeloadout', { character: loadout.character, gun: this.weapons.gunKey });
    socket.emit('alive');
  }

  takeDamage(amount, killerId) {
    this.health -= amount;
    if (this.health <= 0) this.die(killerId);
    else this.player.setHealth(this.health);
  }

  die(killerId) {
    this.mobile?.setVisible(false);
    this.menu.showRespawnButtons();
    this.canMove = false;
    this.dashUntil = 0;
    this.player.setAlive(false);
    socket.emit('dead', { killed: this.myId, killer: killerId });
  }

  onHealthpackTouched(pack) {
    if (!pack.active || !this.player.active) return;
    pack.setVisible(false).setActive(false);
    this.health = Math.min(MAX_HEALTH, this.health + HEALTHPACK_HEAL);
    this.player.setHealth(this.health);
    socket.emit('healthpackGot', pack.name);
    socket.emit('healthupdate', { hp: this.health });
  }

  // ───────────────────────── connection loss ─────────────────────────

  showDisconnect() {
    if (this.disconnected) return;
    this.disconnected = true;
    this.dialog.show();
  }

  retry() {
    this.time.delayedCall(TIMING.respawnDelay, () => {
      this.disconnected = false;
      this.dialog.hide();
      if (!this.spawned) return;
      socket.emit('dead', { killed: this.myId, killer: this.myId });
      this.health = 0;
      this.player.setHealth(0);
      socket.emit('healthupdate', { hp: 0 });
      this.respawn();
    });
  }

  leaveToMenu() {
    this.spawned = false;
    socket.disconnect();
    this.scene.start('menu');
  }

  // ───────────────────────── player actions ─────────────────────────

  swapGun(slot) {
    if (!this.player?.active) return;
    this.weapons.select(slot);
    this.player.setGun(this.weapons.gunKey);
    socket.emit('changeloadout', { character: this.weapons.loadout.character, gun: this.weapons.gunKey });
  }

  dash() {
    if (!this.canMove || !this.spawned) return;
    const { left, right } = this.controls;
    const now = this.time.now;
    if ((!left && !right) || now < this.dashReadyAt) return;

    this.dashDir = right ? 1 : -1;
    this.dashSpeed = DASH.speed;
    this.dashUntil = now + DASH.duration;
    this.dashReadyAt = now + DASH.cooldown;
    this.player.sprite.setVelocityX(this.dashDir * this.dashSpeed);
    this.player.dashEffect(DASH.duration);
  }

  tryWallJump() {
    if (!this.canMove || !this.spawned) return;
    const body = this.player.sprite.body;
    if ((body.touching.left || body.touching.right) && !body.touching.down) {
      this.player.sprite.setVelocityY(PLAYER.wallJump);
      const { speed, duration } = PLAYER.wallKick;
      this.dashDir = body.touching.left ? 1 : -1;
      this.dashSpeed = speed;
      this.dashUntil = this.time.now + duration;
      this.player.sprite.setVelocityX(this.dashDir * speed);
      this.player.playAnim('walljump');
    }
  }

  dropThroughElevators() {
    this.world.elevators.forEach((e) => {
      e.body.checkCollision.up = false;
      this.time.delayedCall(TIMING.elevatorDrop, () => { e.body.checkCollision.up = true; });
    });
  }

  onMobileAim(rotation) {
    if (!this.player) return;
    this.player.gun.rotation = rotation;
    socket.emit('gunRotatement', { gunrotation: rotation });
  }

  updateAim() {
    if (this.isMobile) return;
    const pointer = this.input.activePointer;
    const last = this.lastPointer;
    if (last && (pointer.worldX !== last.x || pointer.worldY !== last.y)) {
      const gun = this.player.gun;
      gun.rotation = Phaser.Math.Angle.Between(gun.x, gun.y, pointer.worldX, pointer.worldY);
      socket.emit('gunRotatement', { gunrotation: gun.rotation });
      this.player.setFacing(pointer.worldX <= this.player.sprite.x);
    }
    this.lastPointer = { x: pointer.worldX, y: pointer.worldY };
  }

  updateMovement(frames) {
    if (!this.canMove) return;
    const c = this.controls;
    const body = this.player.sprite.body;
    const speed = PLAYER.speed;
    const acceleration = PLAYER.acceleration * frames;

    if (this.time.now < this.dashUntil) {
      body.velocity.x = this.dashDir * this.dashSpeed; 
    } else if (c.right && body.velocity.x < speed) {
      body.velocity.x += acceleration;
    } else if (c.left && body.velocity.x > -speed) {
      body.velocity.x -= acceleration;
    } else if (!c.left && !c.right) {
      const vx = body.velocity.x; // slow to a stop without overshooting zero
      body.velocity.x = vx > 0 ? Math.max(0, vx - acceleration) : Math.min(0, vx + acceleration);
    }
    if (c.jump && body.touching.down) this.player.sprite.setVelocityY(PLAYER.jump);
    if (c.down) body.velocity.y += acceleration;
  }

  // ───────────────────────── bullets ─────────────────────────

  ensureBulletPool(id, info) {
    if (this.bulletPools[id]) return this.bulletPools[id];
    const pool = createPool(
      this, id, bulletKey(info?.playergun || 'gun1'), DEPTH.remoteBullet,
      info?.x ?? 0, (info?.y ?? 0) + 13,
    );
    this.bulletPools[id] = pool;
    this.registerPoolHit(id);
    return pool;
  }

  // other players' bullets can hurt us (once we exist)
  registerPoolHit(id) {
    const pool = this.bulletPools[id];
    if (id === this.myId || !this.player || !pool || pool.hitRegistered) return;
    pool.hitRegistered = true;
    this.physics.add.overlap(this.player.sprite, pool, (_player, bullet) => this.onBulletHitPlayer(bullet));
  }

  onBulletHitPlayer(bullet) {
    if (!bullet.active || !this.player.active) return;
    const gun = GUNS[bullet.texture.key.replace(/Bullet$/, '')];
    if (!gun || gun.explosive) return; // explosives hurt via their blast
    this.takeDamage(gun.damage, bullet.playerId);
    retire(this, bullet);
    socket.emit('healthupdate', { hp: this.health });
    socket.emit('bullethit', { name: bullet.name, player: bullet.playerId });
  }

  applyExplosionDamage(bullet) {
    if (!this.player?.active) return;
    const radius = GUNS.Boomsmith.explosive.radius;
    const hits = this.physics.overlapCirc(bullet.x, bullet.y, radius, true, false);
    if (!hits.some((b) => b.gameObject.playerId === this.myId)) return;
    this.takeDamage(GUNS.Boomsmith.damage, bullet.playerId);
    socket.emit('healthupdate', { hp: this.health });
  }

  // ───────────────────────── socket handlers ─────────────────────────

  onNewPlayer(info) {
    this.remotes[info.playerId]?.destroy();
    this.remotes[info.playerId] = new RemotePlayer(this, info);

  }

  onPlayerLeft(info) {
    this.remotes[info.playerId]?.destroy();
    delete this.remotes[info.playerId];
  }

  onSocketDisconnect(reason) {
    if (['io client disconnect', 'io server disconnect', 'transport error'].includes(reason)) return;
    this.showDisconnect();
  }

  onPlayerAliveChanged(info) {
    this.remotes[info.playerId]?.setAlive(info.playeralive);
  }

  onPlayerMoved(info, ox, oy, ox2, oy2) {
    this.remotes[info.playerId]?.moveTo(info, ox, oy, ox2, oy2);
  }

  onRoomPlayers(players, room) {
    if (room !== roomId) return;
    Object.keys(players).forEach((id) => {
      if (id !== socket.id) this.ensureBulletPool(id, players[id]);
    });
  }

  onLeaderboardCreate(data) {
    this.hud.setLeaderboard(Object.values(data));
  }

  onKillBroadcast(kill, leaderboard) {
    this.hud.setLeaderboard(leaderboard.map((entry) => entry[1]));
    this.hud.addKill(kill);
  }

  onBulletHitted(info) {
    const bullet = findByName(this.bulletPools[info.player], info.bulletname?.name);
    if (bullet) retire(this, bullet);
  }

  onBulletShotted(player, bulletName, vx, vy, gravity) {
    const bullet = findByName(this.ensureBulletPool(player.playerId, player), bulletName);
    if (!bullet) return;
    this.sfx.play(sfxKey(player.playergun), player.x, this.player?.x);
    activate(this, bullet, player.playergun, player.x, player.y + 7);
    bullet.body.allowGravity = gravity;
    bullet.setVelocity(vx, vy);
    bullet.rotation = player.gunrotation;
  }

  onGunRotated(info) {
    this.remotes[info.playerId]?.setGunRotation(info.gunrotation);
  }

  onPlayerAnimed(info) {
    this.remotes[info.playerId]?.playAnim(info.curanim);
  }

  onPlayerFlipped(info) {
    this.remotes[info.playerId]?.setFlip(info.flipped);
  }

  onHealthUpdated(info) {
    this.remotes[info.playerId]?.setHealth(info.health);
  }

  onLoadoutChanged(info) {
    this.remotes[info.playerId]?.setLoadout(info);
  }

  onHealthpackUp(info) {
    Object.values(info).forEach((up, i) => {
      if (up) this.world.healthStations[i]?.anims.play('healthstationidle');
      this.world.healthPacks[i]?.setVisible(up).setActive(up);
    });
  }

  onOverheated(info) {
    if (!this.remotes[info.playerId]) return;
    const fx = this.add.sprite(info.x, info.y - 10, 'overheattext', 0).setDepth(DEPTH.playerAttachment);
    fx.anims.play('overheat!');
    fx.once('animationcomplete', () => fx.destroy());
    this.sfx.play(SFX.overheat, info.x, this.player?.x);
  }

  onElevatorGoUp(data) {
    const e = this.world.elevators.find((el) => el.name === data.num);
    if (!e) return;
    e.body.velocity.y = data.vel;
    if (data.y) e.y = data.y - ELEVATOR_Y_OFFSET[e.name - 1];
  }

  onBoomsmithBoomed(bulletName, ownerId) {
    const bullet = findByName(this.bulletPools[ownerId], bulletName);
    if (!bullet) return;
    if (ownerId !== this.myId) this.applyExplosionDamage(bullet); // our own blasts never hurt us

    this.sfx.play(SFX.explosion, bullet.x, this.player?.x);
    const blast = this.add.sprite(bullet.x, bullet.y, 'BoomforgedBlast', 0);
    bullet.setVelocity(0, 0);
    bullet.body.allowGravity = false;
    blast.anims.play('BoomsmithBoomAnim');
    blast.once('animationcomplete', () => {
      retire(this, bullet);
      blast.destroy();
    });
  }
}
