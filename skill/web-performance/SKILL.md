---
name: web-performance
description: Audita y optimiza la velocidad de carga de un sitio web (Core Web Vitals, Lighthouse, imágenes, fuentes, CSS, JavaScript, caché). Úsala cuando pidan "hacer más rápido el sitio", mejorar LCP, INP, CLS o el puntaje de Lighthouse/PageSpeed, optimizar imágenes o sliders, o revisar por qué una página carga lento.
---

# Optimización de performance web

Trabajá siempre en este orden: **medir, diagnosticar, corregir de a una cosa, volver a medir**. Nunca declares una mejora sin una medición que la respalde.

## Reglas de oro

1. **No inventes números.** Todo valor que reportes (puntajes, LCP, KB, ms) debe salir de una medición que hiciste. Si no mediste, escribí "sin medir".
2. **Medí el build de producción**, nunca el servidor de desarrollo.
3. **Un cambio por vez**, y medí después de cada uno. Repetí la prueba 3 veces y usá la mediana: Lighthouse varía entre corridas.
4. **Datos de laboratorio ≠ datos de campo.** Lighthouse no mide INP real; para eso hacen falta datos de usuarios (CrUX, Search Console).
5. **No sacrifiques accesibilidad, SEO ni funcionalidad** por unos puntos de score.
6. Preferí quitar antes que optimizar: el recurso más rápido es el que no se pide.

## 1. Medir (línea base)

```bash
npm run build && npm run preview          # servir el build de producción
npx lighthouse <url> --form-factor=mobile --output=json --output-path=./lh.json --chrome-flags="--headless=new"
```

Para una mediana confiable, usá el API de Node (`lighthouse` + `chrome-launcher`) y corré 3 veces. Guardá: Performance, Accesibilidad, Buenas prácticas, SEO, FCP, LCP, TBT, CLS, peso total y número de peticiones.

Del JSON, mirá primero:
- `audits['largest-contentful-paint-element']`: **qué elemento es el LCP** (casi siempre decide todo).
- `audits['render-blocking-resources']`, `unused-javascript`, `unused-css-rules`, `uses-responsive-images`, `modern-image-formats`, `uses-text-compression`, `uses-long-cache-ttl`, `total-byte-weight`, `layout-shifts`, `long-tasks`.

## 2. Diagnosticar: de qué métrica viene el problema

| Síntoma | Causa probable | Dónde mirar |
|---|---|---|
| LCP alto | Imagen principal pesada, tardía o con `loading="lazy"`; CSS/fuentes bloqueantes; TTFB lento | Elemento LCP, cascada de red |
| TBT / INP altos | Demasiado JS, scripts de terceros, tareas largas | `long-tasks`, `unused-javascript`, analítica/chats |
| CLS > 0 | Imágenes/iframes sin dimensiones, fuentes que cambian, contenido inyectado arriba | `layout-shifts` |
| Peso total alto | Imágenes sin optimizar, video, JS de más | `total-byte-weight` |
| Muchas peticiones | Scripts de terceros, assets sueltos | Lista de red |

## 3. Corregir (en este orden de rentabilidad)

### Imágenes (casi siempre lo más pesado)
- Formato moderno: **AVIF o WebP** con JPEG/PNG de respaldo vía `<picture>`. Animaciones: WebP animado en vez de GIF.
- **Redimensionar al tamaño mostrado**; `srcset` + `sizes` con 3 anchos típicos (p. ej. 480, 800, 1200).
- **Siempre `width` y `height`** (o `aspect-ratio` en CSS) para evitar CLS.
- La(s) imagen(es) visibles al abrir (1 o 2): `loading="eager"` + `fetchpriority="high"`. **Nunca `lazy` en la imagen LCP.**
- Todo lo demás: `loading="lazy"` + `decoding="async"`.
- Astro: usar `<Image />` / `<Picture />` de `astro:assets` (genera formatos y tamaños en el build).

### Sliders y carruseles
- Reemplazar librerías por **CSS `scroll-snap`** (`scroll-snap-type: x mandatory`) y enlaces ancla para la navegación: 0 KB de JS.
- Solo la primera diapositiva con prioridad alta; el resto `lazy`.
- Reservar la altura con `aspect-ratio`.
- Si hace falta JS (autoplay, arrastre), cargarlo diferido y no antes del LCP.

### CSS
- CSS pequeño: **inline en el `<head>`** (Astro: `build.inlineStylesheets: 'always'`). CSS grande: crítico inline + el resto diferido.
- Eliminar reglas sin uso. Páginas largas: `content-visibility: auto` + `contain-intrinsic-size`.

### Fuentes
- Preferí **fuentes del sistema**. Si usás web fonts: WOFF2, alojadas en el mismo dominio, subset (solo latín), `font-display: swap`, preload de la que usa el LCP, y pocos pesos.

### JavaScript
- Menos JS: si la página es contenido, enviar HTML/CSS y ningún JS.
- `defer`/`async`/módulos; arquitectura de islas (`client:visible`, `client:idle`).
- **Terceros (analítica, píxeles, chats): cargarlos tras el evento `load` (+ ~2,5 s) o al primer gesto del usuario** (`pointerdown`, `keydown`, `scroll`).
- Dividir tareas largas (>50 ms); reemplazar librerías por APIs nativas.

### Red, caché y servidor
- Compresión **Brotli/Gzip** para HTML, CSS, JS, JSON y SVG (no para imágenes ni video).
- Caché larga con **hash o versión en la URL** (`max-age=31536000, immutable`); HTML con caché corta y `stale-while-revalidate` / `stale-if-error`.
- CDN delante del origen. `preconnect` solo a dominios externos realmente críticos; `preload` solo del recurso LCP que el navegador descubriría tarde.

## 4. Verificar

1. Volvé a medir con el mismo método y la mediana de 3 corridas.
2. Compará **contra la línea base**, métrica por métrica.
3. Abrí la página en un viewport móvil (375 px) y de escritorio: sin scroll horizontal, sin saltos, sin imágenes borrosas.
4. Revisá consola y red: sin errores 404 ni advertencias de preload sin usar.
5. Confirmá que accesibilidad, SEO y buenas prácticas no empeoraron.

## 5. Cómo reportar

Entregá una tabla antes/después con valores medidos, la lista de cambios aplicados (un renglón por cambio) y lo que quedó sin medir o pendiente. Si el puntaje no llegó a 100, decí por qué y qué costaría mejorarlo. No prometas un puntaje: en Lighthouse el TBT varía con la carga del equipo.

## Errores frecuentes

- `loading="lazy"` en la imagen principal.
- Optimizar en modo desarrollo o con extensiones del navegador activas.
- Precargar demasiados recursos (compiten entre sí).
- Subir imágenes enormes "porque el CSS las achica".
- Cargar tags de analítica en el `<head>` de forma síncrona.
- Perseguir el 100 de Lighthouse en perjuicio de la experiencia real.
