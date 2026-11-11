// Orden e índice de la sección de técnicas
export const tecnicas = [
  { slug: 'core-web-vitals', titulo: 'Core Web Vitals', resumen: 'LCP, INP y CLS: qué miden y qué valores son buenos.' },
  { slug: 'imagenes', titulo: 'Imágenes: WebP y AVIF', resumen: 'Formatos modernos y compresión: lo que más pesa en casi toda web.' },
  { slug: 'srcset-lazy', titulo: 'srcset, sizes y lazy loading', resumen: 'Entregar a cada pantalla el tamaño justo y diferir lo que no se ve.' },
  { slug: 'preload', titulo: 'Preload y prioridades', resumen: 'Decirle al navegador qué es crítico: preload, fetchpriority, preconnect.' },
  { slug: 'fuentes', titulo: 'Fuentes web', resumen: 'font-display, subsets, preload o directamente fuentes del sistema.' },
  { slug: 'css-critico', titulo: 'CSS crítico', resumen: 'Evitar que el CSS bloquee el primer pintado.' },
  { slug: 'javascript', titulo: 'Minimizar JavaScript', resumen: 'Menos JS, cargado más tarde: defer, islas y scripts de terceros.' },
  { slug: 'cache-cdn', titulo: 'Caché y CDN', resumen: 'Cache-Control, versionado de archivos y stale-while-revalidate.' },
  { slug: 'compresion', titulo: 'Compresión', resumen: 'Gzip y Brotli para texto: HTML, CSS, JS, JSON y SVG.' },
  { slug: 'medir', titulo: 'Medir con Lighthouse y PageSpeed', resumen: 'Laboratorio vs. campo, y cómo no engañarse con los números.' },
];
