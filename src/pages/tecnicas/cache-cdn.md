---
layout: ../../layouts/Tecnica.astro
slug: cache-cdn
title: Caché y CDN
description: La petición más rápida es la que no se hace. Y la segunda más rápida es la que responde un servidor cercano.
---

## Cache-Control

Indica cuánto tiempo puede reutilizar el navegador (o un CDN) una respuesta sin volver a pedirla.

| Tipo de archivo | Estrategia típica |
|---|---|
| CSS/JS/imágenes con hash en el nombre (`app.a1b2c3.js`) | `max-age=31536000, immutable` (1 año) |
| Imágenes sin hash | Semanas o meses, y cambiar el nombre o agregar `?v=` al reemplazar |
| HTML | Corto (minutos) o `no-cache` con validación |

```
Cache-Control: public, max-age=31536000, immutable
```

### Versionado

Con caché largo, la forma de "actualizar" es **cambiar la URL**. Los bundlers lo hacen con un hash en el nombre; para imágenes sueltas sirve un parámetro de versión (`foto.webp?v=3`).

## stale-while-revalidate

Para el HTML: si la copia expiró, el CDN sirve la vieja **ya mismo** y la refresca por detrás. Evita que el primer visitante tras cada expiración espere al servidor de origen.

```
Cache-Control: public, max-age=600, stale-while-revalidate=86400, stale-if-error=86400
```

`stale-if-error` además mantiene el sitio en pie si el origen falla.

## Ejemplo en Apache (`.htaccess`)

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 10 minutes"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 month"
</IfModule>
```

## CDN

Una red de distribución de contenido guarda copias de tu sitio en muchas ubicaciones y responde desde la más cercana al visitante. Para un sitio estático es casi gratis y baja el TTFB (tiempo hasta el primer byte). GitHub Pages, Cloudflare, Netlify o Vercel ya incluyen uno.

## Service Worker

Para casos avanzados, un Service Worker permite cachear recursos y ofrecer modo sin conexión. Es potente, pero suma JavaScript y complejidad: solo si el producto lo necesita.
