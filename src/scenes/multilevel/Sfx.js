import { GUNS, SFX, sfxKey } from './config';

// Sound lookup + simple distance/pan model.
export default class Sfx {
  constructor(scene) {
    this.scene = scene;
    this.cache = {};
    [...Object.keys(GUNS).map(sfxKey), SFX.overheat, SFX.explosion].forEach((k) => this.get(k));
  }

  get(key) {
    if (key in this.cache) return this.cache[key];
    let sound = null;
    try {
      sound = this.scene.sound.get(key) || this.scene.sound.add(key);
    } catch (err) {
      console.warn(`[sfx] missing audio "${key}"`);
    }
    return (this.cache[key] = sound);
  }

  // sourceX / listenerX are optional; without them the sound plays centered at full volume.
  play(key, sourceX, listenerX) {
    const sound = this.get(key);
    
    if (!sound) return;
    let volume = 1;
    let pan = 0;
    if (sourceX != null && listenerX != null && sourceX !== listenerX) {
      const far = Math.max(sourceX, listenerX);
      if (far > 0) {
        volume = Math.min(sourceX, listenerX) / far;
        pan = (sourceX - listenerX) / far;
      }
    }
    sound.volume = volume;
    sound.pan = pan;
    sound.play();
  }
}
