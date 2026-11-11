// Genera una imagen sintética tipo foto (degradado + ruido) para el laboratorio. No es una foto real.
import sharp from 'sharp';
const w = 1600, h = 1000;
const buf = Buffer.alloc(w * h * 3);
let seed = 12345;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const clamp = (v) => Math.max(0, Math.min(255, v));
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const i = (y * w + x) * 3;
  const cx = Math.sin(x / 190) * 40 + Math.cos(y / 140) * 40;
  const n = (rnd() - 0.5) * 10;
  buf[i] = clamp(60 + (x / w) * 150 + cx + n);
  buf[i + 1] = clamp(90 + (y / h) * 110 - cx + n);
  buf[i + 2] = clamp(200 - (x / w) * 120 + n);
}
await sharp(buf, { raw: { width: w, height: h, channels: 3 } }).png({ compressionLevel: 6 }).toFile('src/assets/foto.png');
