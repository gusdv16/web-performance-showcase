// Genera public/corp/marca.webp: la marca del hero (dos pastillas y dos círculos) con una foto
// translúcida adentro, ya recortada y con canal alfa. Así el navegador no recorta ni enmascara nada al pintar.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const W = 1040, H = 680;
const foto = await sharp('src/assets/corp/p36.jpg').resize(W, H, { fit: 'cover' }).removeAlpha().raw().toBuffer();
const forma = await sharp(readFileSync('scripts/marca.svg'), { density: 192 }).resize(W, H).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(W * H * 4);
const aFoto = 0.3, aBase = 0.13;
const aTot = aFoto + aBase * (1 - aFoto);
for (let i = 0; i < W * H; i++) {
  const m = forma.data[i * 4 + 3] / 255; // opacidad de la forma
  for (let c = 0; c < 3; c++) out[i * 4 + c] = Math.round((foto[i * 3 + c] * aFoto + 255 * aBase * (1 - aFoto)) / aTot);
  out[i * 4 + 3] = Math.round(255 * aTot * m);
}
await sharp(out, { raw: { width: W, height: H, channels: 4 } }).webp({ quality: 70, alphaQuality: 80 }).toFile('public/corp/marca.webp');
console.log('ok');
