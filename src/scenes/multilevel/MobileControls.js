import { DEPTH } from './config';

const STICK = { x: 800, y: 720, offsetX: 400, offsetY: -200, downBelow: 250, upAbove: 70 };

// On-screen buttons + aim/move joystick. Movement goes through controls.virtual.
export default class MobileControls {
  constructor(scene, controls, handlers) {
    this.controls = controls;
    this.h = handlers;
    this.shooting = false;
    this.pointer = null;       // pointer that grabbed the stick
    this.stickActive = false;
    this.moveEnabled = false;  // true once the finger leaves the stick's dead zone

    scene.input.addPointer(5);
    this.layer = scene.add.layer().setDepth(DEPTH.mobileControls).setVisible(false);

    const button = (x, key) => scene.add.image(x, 790, key).setOrigin(0, 0.5).setScrollFactor(0).setInteractive();
    const shoot = button(1320, 'shoot');
    const stop = () => { this.shooting = false; };
    shoot.on('pointerdown', () => { this.shooting = true; });
    shoot.on('pointerup', stop);
    shoot.on('pointerout', stop);
    shoot.on('pointerupoutside', stop);

    const sprint = button(1220, 'sprint').on('pointerdown', () => this.h.onDash());
    const change = button(1060, 'change').on('pointerdown', () => this.h.onSwapGun());

    this.base = scene.add.ellipse(STICK.x, STICK.y, 100, 100, 0xffffff).setScrollFactor(0).setInteractive();
    this.knob = scene.add.ellipse(STICK.x, STICK.y, 50, 50, 0x000000).setVisible(false).setScrollFactor(0);
    this.layer.add([shoot, sprint, change, this.base, this.knob]);

    this.base.on('pointerdown', (p) => { this.pointer = p; this.stickActive = true; });
    this.base.on('pointerout', () => { this.moveEnabled = true; });
    this.base.on('pointerover', () => { this.moveEnabled = false; controls.clearVirtual(); });
    scene.input.on('pointermove', (p) => this.onMove(p));
  }

  setVisible(v) { this.layer.setVisible(v); }

  onMove(pointer) {
    if (!this.stickActive) return;
    const { base, knob, controls, h } = this;
    const px = pointer.x + STICK.offsetX;
    const py = pointer.y;

    knob.setPosition(635 + pointer.x / 2.5, 360 + pointer.y / 2.5).setVisible(true);
    h.onAim(Phaser.Math.Angle.Between(base.x, base.y, px, pointer.y + STICK.offsetY));
    if (base.x < px) h.onFace(false);
    else if (base.x > px) h.onFace(true);

    if (!this.moveEnabled) return;
    controls.virtual.right = base.x < px;
    controls.virtual.left = base.x > px;

    if (base.y < py - STICK.downBelow) {
      controls.virtual.down = true;
      controls.virtual.up = false;
      h.onDrop();
    } else if (base.y > py - STICK.upAbove) {
      if (!controls.virtual.up) h.onWallJump(); // edge-triggered, like pressing Space
      controls.virtual.up = true;
      controls.virtual.down = false;
    } else {
      controls.virtual.up = false;
      controls.virtual.down = false;
    }
  }

  update() {
    if (this.pointer?.isDown) return;
    this.stickActive = false;
    this.knob.setVisible(false);
    this.controls.clearVirtual();
  }
}
