---
layout: ../../layouts/Tecnica.astro
slug: medir
title: Medir con Lighthouse y PageSpeed
description: Sin medir no hay mejora. Pero hay que saber qué mide cada herramienta y cuánto varía.
---

## Datos de laboratorio vs. datos de campo

| | Laboratorio | Campo |
|---|---|---|
| Qué es | Una prueba simulada y repetible | Mediciones de usuarios reales |
| Herramientas | Lighthouse, WebPageTest | CrUX, PageSpeed Insights (sección superior), Search Console |
| Sirve para | Depurar y comparar cambios | Saber cómo lo vive la gente de verdad |
| Limitación | Un solo dispositivo y una red simulada | Necesita tráfico suficiente y tarda semanas en reflejar cambios |

## Lighthouse

Viene en Chrome (DevTools > Lighthouse) y también como herramienta de línea de comandos:

```bash
npx lighthouse https://ejemplo.com --form-factor=mobile --output=json --output-path=./reporte.json
```

Mide cuatro categorías: **Performance, Accessibility, Best Practices y SEO**. Por defecto simula un celular de gama media con red 4G lenta, y esa simulación (*throttling*) es bastante exigente.

### Pesos de la categoría Performance (Lighthouse 10+)

| Métrica | Peso |
|---|---|
| Total Blocking Time (TBT) | 30 % |
| Largest Contentful Paint (LCP) | 25 % |
| Cumulative Layout Shift (CLS) | 25 % |
| First Contentful Paint (FCP) | 10 % |
| Speed Index | 10 % |

## PageSpeed Insights

Es Lighthouse corriendo en servidores de Google, más los datos reales de CrUX si el sitio tiene tráfico. Vale la pena mirar ambos bloques por separado.

## Buenas prácticas al medir

1. **Hacelo sobre el build de producción**, no el servidor de desarrollo.
2. **Repetí la prueba**: los resultados varían entre corridas. Un solo número no es una conclusión.
3. Probá en **modo incógnito** o sin extensiones, que alteran los resultados.
4. Medí **antes y después** de cada cambio, y de a un cambio por vez.
5. No persigas el 100 por el 100: el objetivo es la experiencia real. Un 100 en Lighthouse no garantiza buen INP en dispositivos lentos.

Los resultados de este sitio están en la [página de inicio](../../) con fecha y método.
