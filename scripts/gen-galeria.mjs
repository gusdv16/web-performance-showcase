// Genera 12 ilustraciones sintéticas con detalle y grano (JPEG 1600x1000) para los ejemplos.
// No son fotos reales: paisajes dibujados con formas aleatorias reproducibles.
import sharp from 'sharp';
import fs from 'node:fs';

const w = 1600, h = 1000, N = 12;
fs.mkdirSync('src/assets/galeria', { recursive: true });

for (let k = 0; k < N; k++) {
  let seed = 4242 + k * 7919;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const hue = (k * 31 + 10) % 360;
  const col = (dh, s, l) => `hsl(${(hue + dh) % 360} ${s}% ${l}%)`;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col(0, 70, 30)}"/><stop offset="1" stop-color="${col(40, 80, 70)}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#c)"/>`;
  for (let i = 0; i < 160; i++) svg += `<circle cx="${rnd() * w}" cy="${rnd() * h * 0.5}" r="${rnd() * 2.2 + 0.3}" fill="white" opacity="${0.2 + rnd() * 0.6}"/>`;
  svg += `<circle cx="${300 + rnd() * 1000}" cy="${200 + rnd() * 150}" r="${60 + rnd() * 50}" fill="${col(60, 90, 85)}" opacity="0.9"/>`;
  for (let layer = 0; layer < 4; layer++) {
    const base = 420 + layer * 130;
    let d = `M0 ${h} L0 ${base}`;
    for (let x = 0; x <= w; x += 20) d += ` L${x} ${base - 60 - rnd() * (170 - layer * 25) - Math.sin(x / (140 + layer * 40) + k) * 40}`;
    d += ` L${w} ${h} Z`;
    svg += `<path d="${d}" fill="${col(20 * layer, 45 - layer * 5, 38 - layer * 8)}"/>`;
  }
  for (let i = 0; i < 700; i++) {
    const x = rnd() * w, y = 560 + rnd() * 440, s = 6 + rnd() * 26;
    svg += `<polygon points="${x},${y - s * 2} ${x - s / 2},${y} ${x + s / 2},${y}" fill="${col(100 + rnd() * 40, 50, 12 + rnd() * 22)}" opacity="${0.5 + rnd() * 0.5}"/>`;
  }
  svg += '</svg>';
  const raw = await sharp(Buffer.from(svg)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = raw;
  for (let i = 0; i < data.length; i++) {
    const n = (rnd() - 0.5) * 22; // grano
    data[i] = Math.max(0, Math.min(255, data[i] + n));
  }
  await sharp(data, { raw: info }).jpeg({ quality: 86 }).toFile(`src/assets/galeria/g${String(k + 1).padStart(2, '0')}.jpg`);
}
console.log('listo');
