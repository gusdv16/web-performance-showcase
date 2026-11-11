---
layout: ../../layouts/Tecnica.astro
slug: css-critico
title: CSS crítico
description: El CSS bloquea el renderizado. Si es chico, ponelo dentro del HTML y ahorrás una petición completa.
---

El navegador **no pinta nada** hasta descargar y procesar todo el CSS referenciado con `<link rel="stylesheet">` en el `<head>`. Una hoja externa significa una petición más en el camino crítico, y en una red móvil lenta eso se nota.

## Estrategias

### 1. Inline de todo el CSS (si es pequeño)

Para sitios chicos o medianos es lo más simple. Con Astro es una línea de configuración:

```js
// astro.config.mjs
export default defineConfig({
  build: { inlineStylesheets: 'always' },
});
```

Este sitio lo usa: el CSS completo va dentro del HTML, así que la primera visita necesita **una sola petición** para pintar.

### 2. CSS crítico inline + el resto diferido

Para sitios grandes: se extrae el CSS de lo que se ve al abrir la página (*above the fold*), se pone inline, y el resto se carga sin bloquear:

```html
<style>/* solo lo necesario para la primera pantalla */</style>
<link rel="stylesheet" href="resto.css" media="print" onload="this.media='all'" />
```

### 3. Menos CSS

- Eliminar reglas sin uso (Lighthouse y la pestaña *Coverage* de Chrome las detectan).
- Evitar frameworks completos si usás el 5% de las clases.
- Variables CSS en vez de repetir valores.

## `content-visibility`

Para páginas largas, `content-visibility: auto` le dice al navegador que no renderice lo que está fuera de pantalla hasta que haga falta:

```css
.seccion-larga {
  content-visibility: auto;
  contain-intrinsic-size: auto 600px; /* altura estimada, evita saltos de CLS */
}
```

## Cuidado con el caché

El inline ahorra la petición pero hace el HTML más pesado y no se cachea aparte. Con CSS de pocos KB conviene; con cientos de KB, mejor un archivo externo versionado con caché largo.
