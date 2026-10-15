// All tunable numbers and static data for the multilevel scene.
// Per-frame values (cooldowns, overheat, acceleration) are tuned for 60fps and scaled by `frames` = delta / FRAME_MS.
export const FRAME_MS = 1000 / 60;
export const MAX_DELTA_MS = 100;
export const SCENE_KEY = 'multilevel';
export const ZOOM = 2.5;
export const BG_COLOR = '#646464';
export const MAX_HEALTH = 100;
export const HEALTHPACK_HEAL = 30;
export const POOL_SIZE = 20; // bullets per player

export const PLAYER = {
  speed: 195,
  acceleration: 5,
  maxVelocity: 405,
  jump: -400,
  wallJump: -200,
  wallKick: { speed: 230, duration: 50 },

  firstSpawn: { x: 80, y: 1100 },
};

export const SPAWN_POINTS = [
  { x: 80, y: 1140 },
  { x: 2000, y: 1140 },
  { x: 600, y: 300 },
  { x: 1500, y: 300 },
];

export const TIMING = {
  respawnDelay: 2500,
  elevatorDrop: 500,
  killFeed: 1500,
  pingInterval: 1000,
  disconnectLatency: 1000,
};

export const DASH = { speed: 345, duration: 160, cooldown: 0 };


export const OVERHEAT = { max: 100, vented: 99, coolPerFrame: 0.6 };

// Y offset applied when the server snaps elevator N (index N-1)
export const ELEVATOR_Y_OFFSET = [40, 40, 560, 560, 720, 720];

export const DEPTH = {
  remoteBody: 2,
  remoteGun: 3,
  remoteBullet: 28,
  hudText: 30,
  mobileControls: 30,
  afterimage: 33,
  player: 35,
  localBullet: 35,
  playerAttachment: 36,
  menuButton: 59,
  menuText: 60,
  killFeed: 60,
  dialog: 60,
  menuImageBack: 61,
  menuImageFront: 62,
};

export const SFX = {
  overheat: 'SFX_Gun_Overheat',
  explosion: 'SFX_Boomsmith_Explosion',
};

// Used when localStorage has no saved loadout
export const DEFAULT_LOADOUT = {
  character: 'Character',
  primary: 'gun1',
  secondary: 'SolFlairGun',
};

// cooldown is in frames (60fps). killfeed is the half-width used to lay out the kill feed.
// fan = shotgun pattern, explosive = detonates after `fuse` ms and hurts within `radius`.
export const GUNS = {
  gun1: {
    damage: 10, spread: 30, spreadFactor: 0.0002, speed: 600,
    cooldown: 0.1 * 60, recoil: 15, overheat: 8, killfeed: 12.5,
  },
  AncientDischargeGun: {
    damage: 13, spread: 100, speed: 1200,
    cooldown: 0.7 * 60, recoil: 405, overheat: 40, killfeed: 23,
    fan: { half: 3, step: 0.2, jitter: 0.1 },
  },
  ThunderScreamGun: {
    damage: 80, spread: 0, spreadFactor: 0.000025, speed: 500,
    cooldown: 1 * 60, recoil: 330, overheat: 60, killfeed: 29.5,
  },
  Boomsmith: {
    damage: 35, spread: 10, spreadFactor: 0.0002, speed: 570,
    cooldown: 0.25 * 60, recoil: 150, overheat: 50, killfeed: 22.5,
    gravity: true, bounce: [0.25, 0.5],
    explosive: { fuse: 750, radius: 52.5 },
  },
  SolFlairGun: {
    damage: 25, spread: 10, spreadFactor: 0.0001, speed: 400,
    cooldown: 0.7 * 60, recoil: 30, overheat: 35, killfeed: 8.5,
  },
  SuperchargedFractal: {
    damage: 3, spread: 50, spreadFactor: 0.0002, speed: 750,
    cooldown: 0.1 * 60, recoil: 15, overheat: 5, killfeed: 9.5,
  },
};

export const bulletKey = (gun) => gun + 'Bullet';
export const sfxKey = (gun) => 'SFX_' + gun + 'Bullet';
export const gunFromBulletKey = (key) => key.replace(/Bullet$/, '');
