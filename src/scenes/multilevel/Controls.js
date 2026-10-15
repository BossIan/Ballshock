// One input surface for keyboard + on-screen joystick.

export default class Controls {
  constructor(scene) {
    const K = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      one: K.ONE, two: K.TWO,
      w: K.W, a: K.A, s: K.S, d: K.D,
      space: K.SPACE, shift: K.SHIFT, esc: K.ESC,
    });
    this.virtual = { left: false, right: false, up: false, down: false };
  }

  get left() { return this.keys.a.isDown || this.virtual.left; }
  get right() { return this.keys.d.isDown || this.virtual.right; }
  get down() { return this.keys.s.isDown || this.virtual.down; }
  get jump() { return this.keys.space.isDown || this.keys.w.isDown || this.virtual.up; }

  clearVirtual() {
    this.virtual.left = this.virtual.right = this.virtual.up = this.virtual.down = false;
  }
}
