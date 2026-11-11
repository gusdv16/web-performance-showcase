---
layout: ../../layouts/Tecnica.astro
slug: javascript
title: Minimizar JavaScript
description: Cada KB de JS cuesta más que un KB de imagen, porque hay que descargarlo, analizarlo y ejecutarlo.
---

## Primero: ¿hace falta JavaScript?

Muchas páginas son contenido. Si no hay interactividad real, HTML y CSS alcanzan. Este sitio envía **0 bytes de JavaScript** al navegador: Astro renderiza todo en el build.

## Arquitectura de islas

Astro (y otros frameworks) permiten dejar la página estática y cargar JavaScript solo en los componentes que lo necesitan:

```astro
<Galeria client:visible />   <!-- se hidrata cuando entra en pantalla -->
<Buscador client:idle />     <!-- cuando el navegador está libre -->
```

## Cargar scripts sin bloquear

```html
<script src="app.js" defer></script>   <!-- ejecuta tras parsear el HTML, en orden -->
<script src="otro.js" async></script>  <!-- ejecuta apenas baja, sin orden -->
<script type="module" src="app.js"></script> <!-- los módulos son diferidos por defecto -->
```

## Scripts de terceros: el gran enemigo

Analítica, píxeles de publicidad, chats y widgets suelen pesar más que el resto del sitio. Una táctica efectiva es **cargarlos después de que la página ya se mostró** o al primer gesto del usuario:

```js
function cargar() {
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://tercero.ejemplo/script.js';
  document.head.appendChild(s);
}
// Al primer toque, scroll o tecla; o 2,5 s después de que cargó la página
['pointerdown', 'keydown', 'scroll'].forEach((e) =>
  addEventListener(e, cargar, { once: true, passive: true })
);
addEventListener('load', () => setTimeout(cargar, 2500));
```

Así el usuario no paga el costo en la carga inicial. Es el mismo enfoque usado en el [caso real](../../caso-real/).

## Más ideas

- **Tree shaking y minificación** (los bundlers modernos lo hacen solos en producción).
- **Dividir el código** por página o por ruta.
- Reemplazar librerías grandes por APIs nativas (`fetch`, `IntersectionObserver`, `<dialog>`, `loading="lazy"`).
- **Dividir tareas largas** (más de 50 ms) para no bloquear el hilo principal y mejorar el INP.
