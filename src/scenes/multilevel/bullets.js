import { GUNS, POOL_SIZE, bulletKey, gunFromBulletKey } from './config';

// Bullet pools are physics groups of POOL_SIZE recycled sprites, one per player.

export function createPool(scene, ownerId, textureKey, depth, x = 0, y = 0) {
  const group = scene.physics.add.group();
  for (let i = 0; i < POOL_SIZE; i++) {
    const bullet = group.create(x, y, textureKey).setDepth(depth).setActive(false).setVisible(false);
    bullet.body.allowGravity = false;
    bullet.name = 'bullet' + (i + 1);
    bullet.playerId = ownerId;
  }
  scene.physics.add.collider(scene.world.floors, group, (a, b) => {
    const bullet = group.contains(a) ? a : b;
    if (GUNS[gunFromBulletKey(bullet.texture.key)]?.explosive) return; // explosives bounce
    retire(scene, bullet);
  });
  return group;
}

export function activate(scene, bullet, gunKey, x, y) {
  const gun = GUNS[gunKey];
  detachCollider(scene, bullet);
  bullet.anims?.stop();
  bullet.setTexture(bulletKey(gunKey));
  bullet.setPosition(x, y);
  bullet.setActive(true).setVisible(true);
  bullet.body.allowGravity = !!gun?.gravity;
  bullet.body.setBounce(...(gun?.bounce || [0, 0]));
  if (gun?.explosive) bullet.collider = scene.physics.add.collider(scene.world.elevatorGroup, bullet);
}

export function retire(scene, bullet) {
  bullet.setVelocity(0, 0);
  bullet.body.allowGravity = false;
  bullet.setActive(false).setVisible(false);
  detachCollider(scene, bullet);
}

export function findByName(pool, name) {
  return pool?.getChildren().find((b) => b.name === name);
}

function detachCollider(scene, bullet) {
  if (!bullet.collider) return;
  scene.physics.world.removeCollider(bullet.collider);
  bullet.collider = null;
}
