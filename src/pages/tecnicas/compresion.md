---
layout: ../../layouts/Tecnica.astro
slug: compresion
title: Compresión
description: HTML, CSS, JS, JSON y SVG son texto, y el texto comprime muy bien. Es una mejora de configuración, no de código.
---

El servidor puede comprimir las respuestas de texto antes de enviarlas, y el navegador las descomprime solo. Se negocia con el encabezado `Accept-Encoding`.

| Algoritmo | Notas |
|---|---|
| **Gzip** | Soportado en todos lados. Buena base mínima |
| **Brotli** (`br`) | Comprime mejor que gzip, especialmente en texto estático. Requiere HTTPS |
| **Zstd** | Más nuevo, soporte creciente |

## Qué comprimir y qué no

- **Sí:** HTML, CSS, JavaScript, JSON, SVG, XML, texto.
- **No:** JPEG, PNG, WebP, AVIF, MP4, WOFF2 y ZIP. Ya vienen comprimidos y volver a comprimirlos gasta CPU sin ganar nada.

## Apache

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/plain
</IfModule>
```

## Nginx

```nginx
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;
# Brotli (módulo ngx_brotli)
brotli on;
brotli_types text/css application/javascript application/json image/svg+xml;
```

## Cómo comprobarlo

```bash
curl -s -I -H "Accept-Encoding: br, gzip" https://tu-sitio.com | grep -i content-encoding
```

Si no ves `content-encoding`, esa respuesta se está enviando sin comprimir. Lighthouse también lo avisa en la auditoría "Enable text compression".

Plataformas como GitHub Pages, Cloudflare, Netlify o Vercel comprimen automáticamente. En hosting compartido hay que activarlo a mano.
