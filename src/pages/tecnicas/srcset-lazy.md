---
layout: ../../layouts/Tecnica.astro
slug: srcset-lazy
title: srcset, sizes y lazy loading
description: Entregar a cada dispositivo la imagen del tamaño correcto y no descargar lo que todavía no se ve.
---

## srcset y sizes

Con `srcset` le das al navegador varias versiones; con `sizes` le decís qué ancho va a ocupar la imagen. Él elige la más chica que se vea nítida en esa pantalla.

```html
<img
  src="poster-480.webp"
  srcset="poster-480.webp 480w, poster-800.webp 800w, poster-1200.webp 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  width="1200" height="800"
  alt="Descripción"
/>
```

Un celular de 390 px de ancho no necesita la versión de 1200 px. Ahorrar esos bytes mejora el LCP justo en los dispositivos más lentos.

## Lazy loading nativo

```html
<img src="..." loading="lazy" decoding="async" width="400" height="300" alt="..." />
```

- `loading="lazy"` difiere la descarga hasta que la imagen está cerca de entrar en pantalla.
- `decoding="async"` evita que la decodificación bloquee el hilo principal.
- Funciona también en `<iframe>`.

## El error más común

Poner `loading="lazy"` en **todas** las imágenes, incluida la principal. La imagen LCP debe cargarse cuanto antes:

```html
<!-- Imagen principal: prioridad alta, sin lazy -->
<img src="hero.webp" fetchpriority="high" width="800" height="450" alt="..." />

<!-- Resto de la página: lazy -->
<img src="otra.webp" loading="lazy" width="400" height="300" alt="..." />
```

Regla simple: las 1 o 2 imágenes que se ven al abrir la página, con carga inmediata; todo lo demás, lazy.

## Diferir contenido pesado

El mismo principio sirve para video y animaciones: `preload="none"` en `<video>`, o cargar la animación recién después del evento `load` y solo cuando la tarjeta entra en pantalla (con `IntersectionObserver`). Mirá el [caso real](../../caso-real/).
