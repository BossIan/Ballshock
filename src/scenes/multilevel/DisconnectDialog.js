import { DEPTH } from './config';

const fixed = (obj) => obj.setScrollFactor(0).setDepth(DEPTH.dialog);

// "You have been disconnected" modal. Built once, shown/hidden on demand.
export default class DisconnectDialog {
  constructor(scene, { onQuit, onRetry }) {
    const box = fixed(scene.add.rectangle(1060, 600, 400, 200, 3223857).setStrokeStyle(10, 0));
    const quit = fixed(scene.add.rectangle(1160, 665, 100, 40, 10490647).setStrokeStyle(5, 921102))
      .setInteractive({ useHandCursor: true });
    const retry = fixed(scene.add.rectangle(960, 665, 100, 40, 8516894).setStrokeStyle(5, 0))
      .setInteractive({ useHandCursor: true });
    const label = (x, y, s, style) => fixed(scene.add.text(x, y, s, style).setOrigin(0.5));

    this.items = [
      box, quit, retry,
      label(1160, 665, 'Quit', { color: '#000000ff' }),
      label(960, 665, 'Retry', { color: '#171111ff' }),
      label(1060, 550, 'You have been disconnected.', { color: '#919191ff', fontSize: '20px', stroke: '#686161ff' }),
    ];
    quit.on('pointerup', onQuit);
    retry.on('pointerup', onRetry);
    this.hide();
  }

  show() { this.items.forEach((o) => o.setVisible(true)); }
  hide() { this.items.forEach((o) => o.setVisible(false)); }
}
