---
layout: ../../layouts/Tecnica.astro
slug: fuentes
title: Fuentes web
description: Una fuente personalizada es otro archivo que bajar, y puede retrasar el texto o hacer saltar el diseño.
---

## La opción más rápida: fuentes del sistema

Cero bytes, cero espera, cero saltos. Este sitio usa exactamente esto:

```css
body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
```

## Si necesitás una fuente propia

1. **Formato WOFF2** (comprime mejor que WOFF y TTF).
2. **Alojarla vos mismo** en el mismo dominio, en vez de depender de otro servidor: te ahorrás una conexión extra.
3. **`font-display: swap`** para mostrar el texto enseguida con una fuente de respaldo.
4. **Subset**: incluí solo los caracteres que usás (latín, sin cirílico ni griego) y solo los pesos necesarios.
5. **Preload** de la fuente que se usa en el texto del LCP.

```css
@font-face {
  font-family: "Inter";
  src: url("/fuentes/inter-latin.woff2") format("woff2");
  font-weight: 400 700; /* fuente variable: un archivo, varios pesos */
  font-display: swap;
}
```

```html
<link rel="preload" as="font" type="font/woff2" href="/fuentes/inter-latin.woff2" crossorigin />
```

## Evitar el salto al cambiar de fuente

Cuando la fuente real reemplaza a la de respaldo, el texto puede reacomodarse (CLS). Se reduce ajustando la fuente de respaldo con `size-adjust`, `ascent-override` y compañía, o usando `font-display: optional` si preferís no mostrar nunca el cambio.

## Qué evitar

- Cargar 6 pesos e itálicas "por las dudas".
- Hojas de estilo externas de proveedores de fuentes en el camino crítico sin `preconnect`.
- Íconos como fuente completa (pesan cientos de KB): usá SVG sueltos.
