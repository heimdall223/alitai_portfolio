// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Custom domain serves the project site at domain root (no /alitai_portfolio prefix).
 * Keep base: '/' while alitai.com.ar is the canonical URL.
 * See refactoring/CUTOVER.md
 */
// https://astro.build/config
export default defineConfig({
  site: 'https://alitai.com.ar',
  base: '/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
