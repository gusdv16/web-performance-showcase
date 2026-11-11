// Genera el video de ejemplo (recorrido con zoom lento sobre 3 fotos) y sus variantes.
// Requiere ffmpeg en el PATH. Salida: src/assets/video/ (poster) y public/video/ (mp4/webm).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import sharp from 'sharp';

const fotos = ['src/assets/galeria/g08.jpg', 'src/assets/galeria/g05.jpg', 'src/assets/galeria/g02.jpg'];
fs.mkdirSync('public/video', { recursive: true });
fs.mkdirSync('src/assets/video', { recursive: true });

const dur = 4, fps = 25, xf = 1;
// Cada foto: escalar, zoom lento (zoompan) a 1920x1080
const filtros = fotos.map((_, i) =>
  `[${i}:v]scale=2400:-1,zoompan=z='min(zoom+0.0006,1.15)':d=${dur * fps}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=${fps},setsar=1[v${i}]`);
const cadena = `[v0][v1]xfade=transition=fade:duration=${xf}:offset=${dur - xf}[x1];[x1][v2]xfade=transition=fade:duration=${xf}:offset=${2 * (dur - xf)}[out]`;
const entradas = fotos.flatMap((f) => ['-i', f]);
const base = ['-y', '-hide_banner', '-loglevel', 'error', ...entradas, '-filter_complex', filtros.join(';') + ';' + cadena, '-map', '[out]', '-an'];

// Alta calidad (se usa en la versión "sin optimizar")
execFileSync('ffmpeg', [...base, '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p', 'public/video/original-1080p.mp4'], { stdio: 'inherit' });
// Optimizado: 480p, mp4 (H.264, faststart)
const e480 = ['-vf', 'scale=854:480'];
execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', 'public/video/original-1080p.mp4', ...e480, '-c:v', 'libx264', '-crf', '29', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', 'public/video/recorrido-480.mp4'], { stdio: 'inherit' });
// Poster: primer fotograma
execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', 'public/video/original-1080p.mp4', '-frames:v', '1', 'src/assets/video/poster.png'], { stdio: 'inherit' });
await sharp('src/assets/video/poster.png').jpeg({ quality: 85 }).toFile('src/assets/video/poster.jpg');
fs.unlinkSync('src/assets/video/poster.png');
for (const f of fs.readdirSync('public/video')) console.log(f, (fs.statSync('public/video/' + f).size / 1024).toFixed(0) + ' KB');
