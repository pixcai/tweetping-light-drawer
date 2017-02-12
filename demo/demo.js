import { lightGenerator, drawLight } from '../src/index.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const {width, height} = canvas;

const boxSize = 32;


for (let x = 1; x < width / boxSize; x++) {
  for (let y = 1; y < height / boxSize; y++) {
    let light = lightGenerator().create(x * boxSize - boxSize / 2, y * boxSize - boxSize / 2);
    drawLight(ctx, light, 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.7)');
  }
}
