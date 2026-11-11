---
layout: ../../layouts/Tecnica.astro
slug: imagenes
title: "Imágenes: WebP y AVIF"
description: Las imágenes suelen ser la mayor parte de los bytes de una página. Optimizarlas es el cambio más rentable.
---

## Formatos

| Formato | Cuándo usarlo | Soporte |
|---|---|---|
| **AVIF** | Fotos: es el que mejor comprime, pero tarda más en codificar | Navegadores modernos |
| **WebP** | Fotos y gráficos, también animado (reemplaza GIF) | Prácticamente universal |
| **JPEG / PNG** | Solo como respaldo | Universal |
| **SVG** | Logos, íconos e ilustraciones vectoriales | Universal |

Un WebP animado pesa mucho menos que el GIF equivalente: si tenés animaciones cortas, es de las mejoras más grandes que se pueden hacer.

## Usar varios formatos con `<picture>`

El navegador elige el primero que entiende:

```html
<picture>
  <source type="image/avif" srcset="foto.avif" />
  <source type="image/webp" srcset="foto.webp" />
  <img src="foto.jpg" width="800" height="600" alt="Descripción" />
</picture>
```

## Reglas prácticas

1. **No subas más píxeles de los que se muestran.** Una foto de 4000 px en un contenedor de 400 px es desperdicio puro.
2. **Calidad 75–85** suele ser indistinguible del original a simple vista.
3. **Siempre `width` y `height`** para evitar saltos de diseño (CLS).
4. **Convertí en el build**, no a mano: en Astro, el componente `<Image />` genera los formatos y tamaños automáticamente.

```astro
---
import { Image } from 'astro:assets';
import foto from '../assets/foto.jpg';
---
<Image src={foto} format="avif" widths={[400, 800]} sizes="(max-width: 600px) 100vw, 800px" alt="..." />
```

Este mismo sitio demuestra el efecto en el [Laboratorio](../../laboratorio/).
