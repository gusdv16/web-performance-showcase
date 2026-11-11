---
layout: ../../layouts/Tecnica.astro
slug: preload
title: Preload y prioridades
description: El navegador descubre recursos a medida que lee el HTML. Con pistas de prioridad podés adelantarlos.
---

## `fetchpriority`

Indica la importancia relativa de un recurso. Es la herramienta más simple para el LCP:

```html
<img src="hero.webp" fetchpriority="high" width="800" height="450" alt="..." />
```

También existe `fetchpriority="low"` para imágenes decorativas o carruseles fuera de pantalla.

## `<link rel="preload">`

Pide un recurso crítico **antes** de que el navegador lo descubra por sí solo (por ejemplo, una imagen de fondo en CSS o una fuente):

```html
<link rel="preload" as="image" href="hero.webp" fetchpriority="high" />
<link rel="preload" as="font" type="font/woff2" href="/fuentes/inter.woff2" crossorigin />
```

Úsalo con moderación: precargar demasiado compite con lo realmente importante. Si un preload no se usa en pocos segundos, Chrome lo avisa en la consola.

## `preconnect` y `dns-prefetch`

Si dependés de otro dominio (CDN de imágenes, fuentes, analítica), abrir la conexión antes ahorra cientos de milisegundos:

```html
<link rel="preconnect" href="https://cdn.ejemplo.com" crossorigin />
```

## Resumen de herramientas

| Pista | Para qué |
|---|---|
| `fetchpriority="high"` | Subir la prioridad de la imagen LCP |
| `rel="preload"` | Adelantar recursos que el navegador tardaría en descubrir |
| `rel="preconnect"` | Abrir la conexión a un dominio externo |
| `rel="prefetch"` | Cargar con prioridad baja lo que probablemente se usará en la próxima página |
| `defer` / `async` | Que un script no bloquee el HTML |

La mejor optimización sigue siendo no necesitar el recurso: antes de precargar, preguntate si hace falta en la primera pantalla.
