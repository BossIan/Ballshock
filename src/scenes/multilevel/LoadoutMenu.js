import { DEPTH } from './config';

const BUTTON_FILL = 2630692;
const fixed = (obj, depth) => obj.setScrollFactor(0).setDepth(depth);
const show = (list, v) => list.forEach((o) => o.setVisible(v));

// Loadout picker + Spawn / Loadout buttons + the pause (exit) button.
// "Loadout" toggles the picker; "Spawn" only shows while the picker is closed.
export default class LoadoutMenu {
  constructor(scene, loadouts, { onSpawn, onExit }) {
    this.loadouts = loadouts;
    this.index = 0;
    this.panelOpen = true;
    const first = loadouts[0];

    const button = (y, label) => {
      const rect = fixed(
        scene.add.rectangle(1060, y, 500, 128, BUTTON_FILL).setScale(0.5).setInteractive({ useHandCursor: true }),
        DEPTH.menuButton,
      );
      const text = fixed(scene.add.text(1060, y, label, {}).setScale(2).setOrigin(0.5), DEPTH.menuText);
      return { rect, items: [rect, text] };
    };
    this.loadoutBtn = button(800, 'Loadout');
    this.spawnBtn = button(725, 'Spawn');
    show(this.spawnBtn.items, false);

    // previews
    this.primaryImg = fixed(scene.add.image(996, 455.6, first.primary).setScale(1.75), DEPTH.menuImageBack);
    this.secondaryImg = fixed(scene.add.image(1124, 455.6, first.secondary).setScale(1.75), DEPTH.menuImageBack);
    this.characterImg = fixed(scene.add.image(1060, 590, first.character, 0).setScale(1.75), DEPTH.menuImageFront);

    this.panel = scene.add.layer().setDepth(DEPTH.menuText);
    this.panel.add([
      fixed(scene.add.text(996, 500, 'Primary', { color: '#060606ff' }).setOrigin(0.5, 0), DEPTH.menuText),
      fixed(scene.add.text(1124, 500, 'Secondary', { color: '#000000ff' }).setOrigin(0.5, 0), DEPTH.menuText),
      fixed(scene.add.text(1060, 620, 'Character', { color: '#050101ff' }).setScale(2).setOrigin(0.5, 0), DEPTH.menuText),
      fixed(scene.add.image(1060, 455.6, '128rectangle').setOrigin(1, 0.5), DEPTH.menuButton),
      fixed(scene.add.image(1060, 455.6, '128rectangle').setOrigin(0, 0.5), DEPTH.menuButton),
      fixed(scene.add.image(1060, 590, '256rectangle'), DEPTH.menuButton),
      this.secondaryImg,
      this.primaryImg,
      this.characterImg,
      fixed(scene.add.image(1060, 590, 'Character', 0).setScale(1.75), DEPTH.menuImageBack),
    ]);

    // loadout slot buttons (1-3)
    this.slotButtons = ['button1', 'button2', 'button3'].map((key, i) => {
      const b = fixed(
        scene.add.image(967 + i * 93, 720, key, i === 0 ? 1 : 0).setScale(0.5).setInteractive({ useHandCursor: true }),
        DEPTH.menuButton,
      );
      b.on('pointerup', () => this.select(i));
      return b;
    });

    this.loadoutBtn.rect.on('pointerup', () => this.togglePanel());
    this.spawnBtn.rect.on('pointerup', onSpawn);

    fixed(scene.add.image(1400, 405, 'pause').setOrigin(0, 0.5).setInteractive(), DEPTH.menuButton)
      .on('pointerdown', onExit);
  }

  get selected() { return this.loadouts[this.index]; }

  select(i) {
    this.index = i;
    const l = this.selected;
    this.slotButtons.forEach((b, j) => b.setFrame(j === i ? 1 : 0));
    this.characterImg.setTexture(l.character);
    this.primaryImg.setTexture(l.primary);
    this.secondaryImg.setTexture(l.secondary);
  }

  togglePanel() {
    show(this.spawnBtn.items, this.panelOpen);
    this.panelOpen = !this.panelOpen;
    this.panel.setVisible(this.panelOpen);
    show(this.slotButtons, this.panelOpen);
  }

  // after dying: offer Spawn + Loadout again
  showRespawnButtons() {
    show(this.spawnBtn.items, true);
    show(this.loadoutBtn.items, true);
  }

  hideAll() {
    this.panelOpen = false;
    show(this.spawnBtn.items, false);
    show(this.loadoutBtn.items, false);
    show(this.slotButtons, false);
    this.panel.setVisible(false);
  }
}
