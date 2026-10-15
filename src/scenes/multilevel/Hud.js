import { DEPTH, GUNS, TIMING } from './config';

const TEXT = { font: '20px', fill: '#FFFFFF' };
const COLS = { name: 650, kills: 800, deaths: 950 };
const ROW_Y = 420;
const ROW_H = 20;

// Screen-space HUD: ping, leaderboard, kill feed.
export default class Hud {
  constructor(scene) {
    this.scene = scene;
    const text = (x, y, s) => scene.add.text(x, y, s, TEXT).setScrollFactor(0).setDepth(DEPTH.hudText);

    this.ping = text(1300, 375, 'ping: ');
    text(COLS.name, 375, 'Leaderboard');
    text(COLS.name, 400, 'Names');
    text(COLS.kills, 400, 'Kills');
    text(COLS.deaths, 400, 'Deaths');
    this.rows = [];
    this.makeText = text;


    this.killCount = 0;
  }

  setPing(ms) {
    if (this.ping.active) this.ping.setText('ping: ' + ms);
  }



  // rows: [{ playername, kills, deaths }]
  setLeaderboard(rows) {
    rows.forEach((r, i) => {
      const y = ROW_Y + i * ROW_H;
      const row = this.rows[i] || (this.rows[i] = {
        name: this.makeText(COLS.name, y, ''),
        kills: this.makeText(COLS.kills, y, ''),
        deaths: this.makeText(COLS.deaths, y, ''),
      });
      row.name.setText(r.playername);
      row.kills.setText(r.kills);
      row.deaths.setText(r.deaths);
    });
    while (this.rows.length > rows.length) {
      Object.values(this.rows.pop()).forEach((t) => t.destroy());
    }
  }

  addKill(kill) {
    const scene = this.scene;
    const gun = GUNS[kill.killer.playergun];
    const half = gun ? gun.killfeed + 5 : 0;
    const y = 390 + 20 * this.killCount;

    const items = [
      scene.add.image(1060, y, kill.killer.playergun).setDepth(DEPTH.killFeed).setScrollFactor(0),
      scene.add.text(1060 - half, y, kill.killer.playername).setDepth(DEPTH.killFeed).setScrollFactor(0).setOrigin(1, 0.5),
      scene.add.text(1060 + half, y, kill.killed.playername).setDepth(DEPTH.killFeed).setScrollFactor(0).setOrigin(0, 0.5),
    ];
    this.killCount += 1;
    scene.time.delayedCall(TIMING.killFeed, () => {
      items.forEach((o) => o.destroy());
      this.killCount = Math.max(0, this.killCount - 1);
    });
  }
}
