// "remnants" map: asset list + level geometry.
// Tile names omit the "floor_" prefix. flip: 'x', 'y' or 'xy'.

const FLOOR_TILES = [
  'side', 'small', 'front', 'bottom_small', 'middle', 'middle_small', 'bottom_middle_small',
  'side_small', 'sidemiddle', 'topmiddle', 'tube_up', 'tube_side', 'diag', 'diag_small',
  'triple_small', 'side_small_line', 'diag_withsmall', 'bigvertical',
];

const STATIONS = [[220, 860], [300, 580], [860, 460], [1260, 460], [1820, 580], [1900, 860], [1060, 1060]];
const ELEVATORS = [[780, 1140], [1340, 1140], [1900, 580], [220, 580], [1020, 420], [1100, 420]];

export function preload(scene) {
  const load = scene.load;
  load.setPath('assets/maps/remnants');
  load.image('healthpack', 'healthpack.png');
  load.spritesheet('healthstation', 'healthstation.png', { frameWidth: 40, frameHeight: 40 });
  load.image('elevator', 'elevator.png');
  FLOOR_TILES.forEach((n) => load.image('floor_' + n, `floor_${n}.png`));
  for (let i = 1; i <= 10; i++) load.image('floor_vertical' + i, `floor_vertical${i}.png`);
}

export function build(scene) {
  const floors = scene.physics.add.staticGroup();
  const tile = (x, y, name, flip = '') => {
    const t = floors.create(x, y, 'floor_' + name);
    if (flip.includes('x')) t.flipX = true;
    if (flip.includes('y')) t.flipY = true;
  };
  const run = (x, y, name, count, dx, dy, flip = '') => {
    for (let i = 0; i < count; i++) tile(x + i * dx, y + i * dy, name, flip);
  };

  // ---- outer walls & ceiling ----
  tile(20, 1180, 'small');
  tile(20, 1120, 'vertical7');
  tile(20, 1060, 'small', 'y');
  run(20, 1020, 'middle', 2, 0, -40);
  tile(20, 940, 'small');
  tile(20, 860, 'vertical8');
  tile(20, 780, 'side_small');
  tile(20, 400, 'bigvertical');
  tile(20, 20, 'small', 'y');
  run(60, 20, 'front', 51, 40, 0, 'y');
  tile(2100, 20, 'small', 'xy');
  tile(2100, 400, 'bigvertical', 'x');
  tile(2100, 780, 'side_small', 'x');
  tile(2100, 860, 'vertical8', 'x');
  tile(2100, 940, 'small', 'x');
  run(2100, 980, 'middle', 2, 0, 40);
  tile(2100, 1060, 'small', 'xy');
  tile(2100, 1120, 'vertical7', 'x');
  tile(2100, 1180, 'small', 'x');

  // ---- bottom row ----
  run(60, 1180, 'front', 5, 40, 0);
  run(380, 1180, 'front', 6, 40, 0);
  run(660, 1180, 'middle', 2, 40, 0);
  run(780, 1180, 'front', 3, 40, 0);
  run(1260, 1180, 'front', 3, 40, 0);
  run(1540, 1180, 'front', 6, 40, 0);
  run(1900, 1180, 'front', 5, 40, 0);

  // ---- bottom-left ----
  run(60, 1060, 'front', 2, 40, 0, 'y');
  tile(140, 1060, 'bottom_small');
  tile(180, 1060, 'sidemiddle');
  tile(60, 1020, 'middle');
  tile(100, 1020, 'small');
  tile(140, 1020, 'diag');
  tile(60, 980, 'middle');
  tile(100, 980, 'diag');
  tile(60, 940, 'diag');

  tile(260, 1180, 'small', 'x');
  tile(260, 1140, 'diag', 'x');
  tile(300, 1180, 'middle');
  tile(300, 1140, 'middle_small');
  tile(300, 1100, 'topmiddle');
  tile(340, 1180, 'small');
  tile(340, 1140, 'diag');
  tile(260, 1020, 'sidemiddle', 'x');
  tile(300, 1020, 'tube_side');
  tile(340, 1020, 'sidemiddle');

  // ---- left platforms ----
  run(60, 780, 'tube_side', 4, 40, 0);
  tile(220, 780, 'sidemiddle');
  tile(140, 900, 'sidemiddle', 'x');
  run(180, 900, 'tube_side', 2, 40, 0);
  tile(260, 900, 'bottom_small', 'x');
  tile(260, 860, 'diag', 'x');
  run(300, 900, 'front', 2, 40, 0, 'y');
  tile(300, 860, 'small', 'x');
  tile(300, 820, 'diag', 'x');
  tile(340, 860, 'middle');
  tile(340, 820, 'front');
  tile(380, 900, 'bottom_small');
  tile(380, 840, 'vertical6');
  tile(420, 900, 'tube_side');
  tile(460, 900, 'sidemiddle');

  tile(140, 700, 'sidemiddle', 'x');
  tile(180, 700, 'bottom_small', 'x');
  tile(180, 660, 'diag', 'x');
  tile(220, 700, 'diag', 'y');
  tile(220, 660, 'diag_small', 'y');
  tile(220, 620, 'diag', 'x');
  tile(260, 660, 'diag', 'y');
  tile(260, 620, 'triple_small');
  tile(260, 580, 'topmiddle');
  tile(300, 620, 'sidemiddle');

  // ---- lower-left ramp ----
  tile(420, 1060, 'sidemiddle', 'x');
  tile(460, 1060, 'bottom_small', 'x');
  tile(460, 1020, 'diag', 'x');
  tile(500, 1060, 'front', 'y');
  tile(500, 1020, 'small', 'x');
  tile(500, 980, 'diag', 'x');
  tile(540, 1060, 'diag', 'y');
  tile(540, 1020, 'small', 'y');
  tile(540, 980, 'small', 'x');
  tile(540, 940, 'diag', 'x');
  tile(580, 1020, 'diag', 'y');
  tile(580, 980, 'small', 'y');
  tile(580, 940, 'small', 'x');
  tile(580, 900, 'diag', 'x');
  tile(620, 980, 'diag', 'y');
  tile(620, 940, 'small', 'y');
  tile(620, 900, 'front');
  tile(660, 940, 'diag', 'y');
  tile(660, 900, 'bottom_small', 'y');
  tile(700, 900, 'tube_side');
  tile(740, 900, 'sidemiddle');

  // ---- mid-left block ----
  tile(380, 660, 'sidemiddle', 'x');
  tile(420, 660, 'bottom_small', 'x');
  tile(420, 620, 'diag', 'x');
  run(460, 660, 'front', 4, 40, 0, 'y');
  tile(460, 620, 'small', 'x');
  tile(460, 580, 'diag', 'x');
  run(500, 620, 'middle', 4, 40, 0);
  run(500, 580, 'front', 4, 40, 0);
  tile(620, 700, 'diag', 'xy');
  tile(620, 660, 'small', 'xy');
  tile(660, 580, 'diag');
  tile(660, 740, 'topmiddle', 'y');
  tile(660, 700, 'middle_small', 'y');
  tile(660, 660, 'middle');
  tile(660, 620, 'small');
  tile(700, 700, 'diag', 'y');
  tile(700, 660, 'side_small');
  tile(700, 620, 'diag');
  tile(740, 660, 'sidemiddle');

  // ---- upper-left block ----
  tile(380, 460, 'sidemiddle', 'x');
  tile(420, 460, 'bottom_small', 'x');
  tile(420, 420, 'diag', 'x');
  run(460, 460, 'front', 5, 40, 0, 'y');
  tile(460, 420, 'small', 'x');
  tile(460, 380, 'diag', 'x');
  tile(500, 420, 'middle');
  tile(500, 380, 'small', 'x');
  tile(500, 340, 'diag', 'x');
  tile(540, 380, 'middle');
  tile(540, 340, 'middle_small');
  tile(540, 300, 'topmiddle');
  run(540, 420, 'middle', 2, 0, -40);
  run(580, 340, 'front', 2, 40, 0);
  run(580, 420, 'middle', 2, 0, -40);
  run(620, 420, 'middle', 2, 0, -40);
  tile(660, 460, 'diag', 'y');
  tile(660, 420, 'small', 'y');
  tile(660, 380, 'small');
  tile(660, 340, 'diag');
  tile(700, 420, 'diag', 'y');
  tile(700, 380, 'bottom_small', 'y');
  tile(740, 380, 'tube_side');
  tile(780, 380, 'sidemiddle');

  // ---- bottom-centre-left ----
  tile(620, 1140, 'diag', 'x');
  tile(700, 1100, 'small', 'x');
  tile(620, 1180, 'small', 'x');
  tile(740, 1180, 'small');
  tile(660, 1140, 'small', 'x');
  tile(660, 1100, 'diag', 'x');
  tile(700, 1060, 'diag', 'x');
  tile(700, 1140, 'middle');
  tile(740, 1080, 'vertical1');
  tile(820, 1000, 'vertical2');
  tile(740, 820, 'sidemiddle', 'x');
  tile(780, 820, 'tube_side');
  tile(820, 820, 'sidemiddle');

  // ---- centre ----
  tile(900, 1180, 'small', 'x');
  tile(900, 1140, 'diag', 'x');
  tile(940, 1180, 'middle');
  tile(940, 1140, 'small', 'x');
  tile(940, 1100, 'diag', 'x');
  tile(980, 1180, 'small');
  tile(980, 1100, 'vertical3');

  tile(900, 940, 'sidemiddle', 'x');
  run(940, 940, 'tube_side', 2, 40, 0);
  tile(1020, 940, 'sidemiddle');
  tile(940, 820, 'sidemiddle', 'x');
  run(980, 820, 'tube_side', 5, 40, 0);
  tile(1180, 820, 'sidemiddle');
  tile(1060, 620, 'vertical5');

  tile(780, 500, 'sidemiddle', 'x');
  run(820, 500, 'tube_side', 2, 40, 0);
  tile(900, 500, 'bottom_middle_small');
  tile(900, 460, 'topmiddle');
  run(940, 500, 'tube_side', 3, 40, 0);
  tile(1060, 500, 'bottom_middle_small', 'y');
  run(1100, 500, 'tube_side', 3, 40, 0);
  tile(1220, 500, 'bottom_middle_small');
  tile(1220, 460, 'topmiddle');
  run(1260, 500, 'tube_side', 2, 40, 0);
  tile(1340, 500, 'sidemiddle');

  tile(1060, 1120, 'vertical4');
  tile(900, 660, 'sidemiddle', 'x');
  tile(940, 660, 'tube_side');
  tile(980, 660, 'sidemiddle');
  tile(1100, 940, 'sidemiddle', 'x');
  run(1140, 940, 'tube_side', 2, 40, 0);
  tile(1220, 940, 'sidemiddle');
  tile(1140, 660, 'sidemiddle', 'x');
  tile(1180, 660, 'tube_side');
  tile(1220, 660, 'sidemiddle');

  tile(1020, 1180, 'front');
  tile(1060, 1180, 'middle_small');
  tile(1100, 1180, 'front');
  tile(1140, 1180, 'small', 'x');
  tile(1140, 1100, 'vertical3', 'x');
  tile(1140, 1060, 'topmiddle');
  tile(1180, 1180, 'middle');
  tile(1180, 1140, 'small');
  tile(1180, 1100, 'diag');
  tile(1220, 1180, 'small');
  tile(1220, 1140, 'diag');

  // ---- bottom-right ----
  tile(1380, 1080, 'vertical1', 'x');
  tile(1380, 1180, 'small', 'x');
  tile(1420, 1180, 'middle');
  tile(1420, 1140, 'middle');
  tile(1420, 1100, 'small');
  tile(1420, 1060, 'diag');
  tile(1460, 1180, 'middle');
  tile(1460, 1140, 'small');
  tile(1460, 1100, 'diag');
  tile(1500, 1180, 'small');
  tile(1500, 1140, 'diag');
  tile(1300, 1000, 'vertical2');

  tile(1780, 1180, 'small', 'x');
  tile(1780, 1140, 'diag', 'x');
  tile(1820, 1180, 'middle');
  tile(1820, 1140, 'middle_small');
  tile(1820, 1100, 'topmiddle');
  tile(1860, 1180, 'small');
  tile(1860, 1140, 'diag');

  // ---- top centre ----
  tile(860, 340, 'sidemiddle', 'x');
  tile(900, 340, 'bottom_small', 'x');
  tile(900, 300, 'side_small_line', 'x');
  tile(900, 260, 'topmiddle');
  tile(940, 340, 'bottom_small');
  tile(940, 300, 'diag');
  tile(980, 360, 'vertical9');
  tile(1060, 340, 'vertical10');
  tile(980, 220, 'sidemiddle', 'x');
  tile(1020, 260, 'diag', 'xy');
  tile(1020, 220, 'side_small', 'x');
  tile(1020, 180, 'diag', 'x');
  tile(1060, 260, 'middle_small', 'y');
  tile(1060, 220, 'middle');
  tile(1060, 180, 'middle_small');
  tile(1060, 140, 'topmiddle');
  tile(1100, 260, 'diag', 'y');
  tile(1100, 220, 'side_small');
  tile(1100, 180, 'diag');
  tile(1140, 220, 'sidemiddle');
  tile(1140, 360, 'vertical9', 'x');
  tile(1180, 340, 'bottom_small', 'x');
  tile(1180, 300, 'diag', 'x');
  tile(1220, 340, 'bottom_small');
  tile(1220, 300, 'side_small_line');
  tile(1220, 260, 'topmiddle');
  tile(1260, 340, 'sidemiddle');

  // ---- upper-right block ----
  tile(1340, 380, 'sidemiddle', 'x');
  tile(1380, 380, 'tube_side');
  tile(1420, 380, 'bottom_small', 'xy');
  tile(1420, 420, 'diag', 'xy');
  tile(1460, 460, 'diag', 'xy');
  tile(1460, 420, 'small', 'xy');
  tile(1460, 380, 'small', 'x');
  tile(1460, 340, 'diag', 'x');
  run(1500, 460, 'front', 5, 40, 0, 'y');
  run(1500, 340, 'front', 2, 40, 0);
  run(1500, 420, 'middle', 2, 0, -40);
  run(1540, 420, 'middle', 2, 0, -40);
  run(1580, 420, 'middle', 2, 0, -40);
  tile(1580, 340, 'middle_small');
  tile(1580, 300, 'topmiddle');
  tile(1620, 420, 'middle');
  tile(1620, 380, 'small');
  tile(1620, 340, 'diag');
  tile(1660, 420, 'small');
  tile(1660, 380, 'diag');
  tile(1700, 420, 'diag');
  tile(1700, 460, 'bottom_small');
  tile(1740, 460, 'sidemiddle');

  // ---- mid-right block ----
  tile(1380, 660, 'sidemiddle', 'x');
  tile(1420, 700, 'diag', 'xy');
  tile(1420, 660, 'side_small', 'x');
  tile(1420, 620, 'diag', 'x');
  tile(1460, 740, 'topmiddle', 'y');
  tile(1460, 700, 'middle_small', 'y');
  tile(1460, 660, 'middle');
  tile(1460, 620, 'small', 'x');
  tile(1460, 580, 'diag', 'x');
  tile(1500, 700, 'diag', 'y');
  tile(1500, 660, 'small', 'y');
  tile(1500, 620, 'middle');
  run(1500, 580, 'front', 4, 40, 0);
  run(1500, 620, 'middle', 4, 40, 0);
  run(1540, 660, 'front', 4, 40, 0, 'y');
  tile(1660, 620, 'small');
  tile(1660, 580, 'diag');
  tile(1700, 660, 'bottom_small');
  tile(1700, 620, 'diag');
  tile(1740, 660, 'sidemiddle');

  tile(1300, 820, 'sidemiddle', 'x');
  tile(1340, 820, 'tube_side');
  tile(1380, 820, 'sidemiddle');

  // ---- lower-right ramp ----
  tile(1380, 900, 'sidemiddle', 'x');
  tile(1420, 900, 'tube_side');
  tile(1460, 900, 'bottom_small', 'xy');
  tile(1460, 940, 'diag', 'xy');
  tile(1500, 940, 'small', 'xy');
  tile(1540, 980, 'small', 'xy');
  tile(1580, 1020, 'small', 'xy');
  tile(1500, 980, 'diag', 'xy');
  tile(1500, 900, 'front');
  tile(1540, 1020, 'diag', 'xy');
  tile(1540, 940, 'small');
  tile(1540, 900, 'diag');
  tile(1580, 1060, 'diag', 'xy');
  tile(1580, 980, 'small');
  tile(1580, 940, 'diag');
  tile(1620, 1060, 'front', 'y');
  tile(1620, 1020, 'small');
  tile(1620, 980, 'diag');
  tile(1660, 1060, 'bottom_small');
  tile(1660, 1020, 'diag');
  tile(1700, 1060, 'sidemiddle');

  // ---- right side platforms ----
  tile(1660, 900, 'sidemiddle', 'x');
  tile(1700, 900, 'tube_side');
  tile(1740, 840, 'vertical6', 'x');
  tile(1740, 900, 'bottom_small', 'x');
  tile(1780, 900, 'front', 'y');
  tile(1780, 860, 'middle');
  tile(1780, 820, 'front');
  tile(1820, 900, 'front', 'y');
  tile(1820, 860, 'small');
  tile(1820, 820, 'diag');
  tile(1860, 900, 'bottom_small');
  tile(1860, 860, 'diag');
  tile(1900, 900, 'tube_side');
  tile(1940, 900, 'tube_side');
  tile(1980, 900, 'sidemiddle');

  tile(1820, 620, 'sidemiddle', 'x');
  tile(1860, 660, 'diag', 'xy');
  tile(1860, 620, 'triple_small', 'x');
  tile(1860, 580, 'topmiddle');
  tile(1900, 700, 'diag', 'xy');
  tile(1900, 660, 'diag_small');
  tile(1900, 620, 'diag');
  tile(1940, 700, 'bottom_small');
  tile(1940, 660, 'diag');
  tile(1980, 700, 'sidemiddle');

  tile(1900, 780, 'sidemiddle', 'x');
  run(1940, 780, 'tube_side', 4, 40, 0);

  tile(1780, 1020, 'sidemiddle', 'x');
  tile(1820, 1020, 'tube_side');
  tile(1860, 1020, 'sidemiddle');

  tile(1940, 1060, 'sidemiddle', 'x');
  tile(1980, 1020, 'diag', 'x');
  tile(1980, 1060, 'bottom_small', 'x');
  tile(2020, 1020, 'small', 'x');
  tile(2020, 980, 'diag', 'x');
  tile(2020, 1060, 'front', 'y');
  tile(2060, 1060, 'front', 'y');
  tile(2060, 1020, 'middle');
  tile(2060, 980, 'small', 'x');
  tile(2060, 940, 'diag', 'x');

  // ---- dynamic objects ----
  const elevatorGroup = scene.physics.add.group();
  const elevators = ELEVATORS.map(([x, y], i) => {
    const e = elevatorGroup.create(x, y, 'elevator');
    e.name = i + 1;
    e.body.allowGravity = false;
    e.body.immovable = true;
    e.body.checkCollision.up = true; // one-way: stand on top only
    e.body.checkCollision.down = false;
    e.body.checkCollision.left = false;
    e.body.checkCollision.right = false;
    return e;
  });

  const healthStations = STATIONS.map(([x, y]) => scene.add.sprite(x, y, 'healthstation', 0));
  // Packs start hidden; the server shows them via 'healthpackUp'.
  const healthPacks = STATIONS.map(([x, y], i) => {
    const p = scene.physics.add.sprite(x, y, 'healthpack').setVisible(false);
    p.body.allowGravity = false;
    p.name = i + 1;
    return p;
  });

  return { floors, elevatorGroup, elevators, healthStations, healthPacks };
}

export default { preload, build };
