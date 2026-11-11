// Mide con Lighthouse (móvil, throttling por defecto) y guarda src/data/mediciones.json
// Uso: node scripts/lighthouse.mjs <urlBase> [--externos]
//   <urlBase>  ej: http://127.0.0.1:4322/web-performance-showcase/  o  https://gusdv16.github.io/web-performance-showcase/
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'node:fs';

const baseUrl = (process.argv[2] || '').replace(/\/?$/, '/');
if (!process.argv[2]) { console.error('Falta la URL base'); process.exit(1); }
const conExternos = process.argv.includes('--externos');
const RUNS = 3;
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const paginas = [
  ['inicio', ''],
  ['tecnicas', 'tecnicas/'],
  ['tecnica-imagenes', 'tecnicas/imagenes/'],
  ['caso-real', 'caso-real/'],
  ['laboratorio', 'laboratorio/'],
  ['lab-antes', 'laboratorio/antes/'],
  ['lab-despues', 'laboratorio/despues/'],
  ['ejemplos', 'ejemplos/'],
  ['ej-slider', 'ejemplos/slider/'],
  ['ej-slider-antes', 'ejemplos/slider-antes/'],
  ['ej-galeria', 'ejemplos/galeria/'],
  ['ej-galeria-antes', 'ejemplos/galeria-antes/'],
  ['ej-imagenes', 'ejemplos/imagenes/'],
  ['skill', 'skill/'],
];
const objetivos = paginas.map(([id, ruta]) => ({ id, url: baseUrl + ruta }));
if (conExternos) objetivos.push({ id: 'ichiban4d-actual', url: 'https://ichiban4d.shop/', externo: true });

const mediana = (arr, key) => [...arr].sort((a, b) => a[key] - b[key])[Math.floor(arr.length / 2)];

async function medir(url) {
  const chrome = await chromeLauncher.launch({ chromePath, chromeFlags: ['--headless=new', '--no-sandbox'] });
  try {
    const runs = [];
    for (let i = 0; i < RUNS; i++) {
      const r = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error' });
      const lhr = r.lhr;
      const a = lhr.audits;
      runs.push({
        performance: Math.round(lhr.categories.performance.score * 100),
        accessibility: Math.round(lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
        fcp: Math.round(a['first-contentful-paint'].numericValue),
        lcp: Math.round(a['largest-contentful-paint'].numericValue),
        tbt: Math.round(a['total-blocking-time'].numericValue),
        cls: +a['cumulative-layout-shift'].numericValue.toFixed(3),
        speedIndex: Math.round(a['speed-index'].numericValue),
        bytes: Math.round(a['total-byte-weight'].numericValue),
        requests: a['network-requests'].details.items.length,
        version: lhr.lighthouseVersion,
      });
    }
    const med = mediana(runs, 'performance');
    return { ...med, corridas: runs.map((r) => r.performance) };
  } finally {
    await chrome.kill();
  }
}

const resultado = { fecha: new Date().toISOString().slice(0, 10), corridas: RUNS, perfil: 'Móvil (emulado, throttling simulado por defecto de Lighthouse)', origen: baseUrl, paginas: {} };
for (const o of objetivos) {
  console.log('Midiendo', o.url);
  resultado.paginas[o.id] = { url: o.externo ? o.url : undefined, ...(await medir(o.url)) };
  console.log(' ', JSON.stringify(resultado.paginas[o.id]));
}
fs.writeFileSync(new URL('../src/data/mediciones.json', import.meta.url), JSON.stringify(resultado, null, 2) + '\n');
console.log('Guardado src/data/mediciones.json');
