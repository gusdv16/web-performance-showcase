import { defineConfig } from 'astro/config';

// Sitio estático: sin integraciones de UI, CSS inline y casi cero JS en el cliente.
export default defineConfig({
  site: 'https://gusdv16.github.io',
  base: '/web-performance-showcase',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
