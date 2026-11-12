# Web Performance Showcase

Sitio de muestra hecho con [Astro](https://astro.build) que demuestra **carga muy rápida** y explica técnicas para mejorar la performance de cualquier sitio web, más un caso real con las mejoras aplicadas a un catálogo en producción.

**Demo en vivo:** https://gusdv16.github.io/web-performance-showcase/

## Qué incluye

- **Técnicas** (10 páginas): Core Web Vitals (LCP, INP, CLS), imágenes WebP/AVIF, `srcset`/`sizes` y lazy loading, preload y prioridades, fuentes, CSS crítico, minimizar JavaScript, caché y CDN, compresión, y cómo medir con Lighthouse y PageSpeed.
- **Landing completa** (`/demo/`): hero, destinos, galería con lightbox sin JavaScript, video, formulario de reserva y FAQ. Marca ficticia, sin JS.
- **Sitio corporativo** (`/corp/`): empresa de servicios de TI ficticia, 19 páginas (inicio, nosotros, infraestructura, servicios, casos, contacto), menús desplegables y formulario, sin JavaScript.
- **Landing publicitaria** (`/promo/`): café por suscripción con oferta, cuenta regresiva (único JS, ~500 bytes), planes, suscripción y barra fija en móvil.
- **App con panel** (`/ats/`): acceso, panel de vacantes con filtros y tablero de candidatos (datos inventados).
- **Ejemplos**: slider, galería, video y formatos de imagen, cada uno en versión sin optimizar y optimizada, con mediciones.
- **Caso real**: las mejoras aplicadas a un catálogo de posters 3D hecho con Astro (el código de ese proyecto es privado; acá solo se explican las técnicas; el sitio es [ichiban4d.shop](https://ichiban4d.shop/)).
- **Laboratorio**: la misma página sin optimizar y optimizada, medidas con el mismo método.
- **Skill para IA** (`skill/web-performance/SKILL.md`): guía para que un asistente mida y optimice la performance de un sitio.

## Cómo es tan rápido

- HTML estático generado en el build, sin framework de UI.
- **0 bytes de JavaScript** en el cliente (la única excepción es el script de la página "antes" del laboratorio, que está ahí a propósito).
- CSS propio, inline en cada página (`inlineStylesheets: 'always'`).
- Fuentes del sistema: sin descargas ni saltos de diseño.
- Imágenes AVIF con `srcset`, dimensiones declaradas y lazy loading (en el laboratorio).

## Mediciones

Los puntajes se muestran en el sitio y salen de `src/data/mediciones.json`, generado por `scripts/lighthouse.mjs` con Lighthouse en móvil (throttling por defecto) y la **mediana de 3 corridas**. No hay cifras inventadas: lo que no se midió figura como pendiente.

Para repetirlas:

```bash
npm install
npm run build
npm run preview        # en otra terminal: http://127.0.0.1:4322/web-performance-showcase/
npm run lighthouse -- http://127.0.0.1:4322/web-performance-showcase/
```

El script usa Chrome instalado en Windows (`C:\Program Files\Google\Chrome\Application\chrome.exe`); en otro sistema definí la variable `CHROME_PATH`. Con `--externos` también mide la página pública del catálogo del caso real.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321/web-performance-showcase/
npm run build     # genera dist/
```

## Estructura

```
src/
  layouts/        Base.astro (HTML, nav, footer) y Tecnica.astro
  pages/          inicio, tecnicas/*.md, caso-real, laboratorio
  components/     Resultados.astro (puntajes medidos)
  data/           tecnicas.js (índice) y mediciones.json (resultados)
  assets/         fotos (galeria/, hero/) y portada del video
public/lab/       CSS y JS de las versiones "antes"
public/video/     video de ejemplo (1080p original y 480p optimizado)
skill/            SKILL.md de optimización web para LLMs
scripts/          lighthouse.mjs (mediciones) y gen-video.mjs (ffmpeg)
```

## Deploy

Cada push a `main` ejecuta `.github/workflows/deploy.yml`, que construye el sitio y lo publica en GitHub Pages.

## Créditos

Las fotos son de Unsplash (descargadas vía Picsum Photos); autores en la página `/creditos/`. La marca "Rumbo Sur" de la landing es ficticia.

## Licencia

MIT. Ver [LICENSE](LICENSE).
