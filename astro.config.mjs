import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: "https://crisuroll.github.io/crisu_Portfolio/", // URL de GitHub Pages
  base: "/crisu_Portfolio/", // Nombre del repositorio
  output: "static"
});