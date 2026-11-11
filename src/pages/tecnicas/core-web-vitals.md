---
layout: ../../layouts/Tecnica.astro
slug: core-web-vitals
title: Core Web Vitals
description: Tres métricas de Google que resumen la experiencia real de carga, interactividad y estabilidad visual.
---

Los **Core Web Vitals** son las métricas que Google usa para evaluar la experiencia de página. Se miden en usuarios reales (datos de campo) y también en laboratorio (Lighthouse).

| Métrica | Qué mide | Bueno | Necesita mejorar | Malo |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | Cuándo aparece el elemento más grande visible (foto, titular) | ≤ 2,5 s | ≤ 4 s | > 4 s |
| **INP** (Interaction to Next Paint) | Qué tan rápido responde la página a toques y clics | ≤ 200 ms | ≤ 500 ms | > 500 ms |
| **CLS** (Cumulative Layout Shift) | Cuánto "saltan" los elementos mientras carga | ≤ 0,1 | ≤ 0,25 | > 0,25 |

## LCP: que lo importante aparezca pronto

El elemento LCP suele ser una imagen hero o un bloque de texto. Para mejorarlo:

- Servir HTML ya renderizado (estático o SSR) en vez de construir la página con JavaScript.
- Si es una imagen: formato moderno, tamaño justo, `fetchpriority="high"` y **nunca** `loading="lazy"` sobre ella.
- Evitar CSS y fuentes que bloqueen el primer pintado.
- Usar caché y CDN para bajar el tiempo de respuesta del servidor (TTFB).

## INP: que la página responda

INP penaliza las tareas largas de JavaScript en el hilo principal. Menos JS, menos trabajo por evento, scripts de terceros diferidos y dividir tareas largas.

## CLS: que nada salte

La causa más común son imágenes sin dimensiones, anuncios o embebidos sin espacio reservado, y fuentes que cambian de tamaño al cargar.

```html
<!-- El navegador reserva el espacio antes de bajar la imagen -->
<img src="foto.webp" width="800" height="600" alt="..." />
```

```css
/* Alternativa con CSS: proporción fija */
.media { aspect-ratio: 4 / 3; }
```

<div class="note">Lighthouse mide LCP y CLS en laboratorio, pero no INP (usa TBT como aproximación). El INP real solo sale de usuarios reales: Search Console o el informe CrUX.</div>
