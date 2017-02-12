import { lightGenerator, drawLight } from '../src/index.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


for (let x = 1; x < 13; x++) {
  for (let y = 1; y < 17; y++) {
    let light = lightGenerator().create(x * 30, y * 30);
    drawLight(ctx, light, 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.5)');
  }
}
