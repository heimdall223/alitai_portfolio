// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Project Pages URL (works while custom DNS is pending).
 * When alitai.com.ar DNS is ready:
 *   1. Restore public/CNAME from refactoring/CNAME.pending
 *   2. Set site: 'https://alitai.com.ar' and base: '/'
 *   3. Redeploy
 * See refactoring/CUTOVER.md
 */
// https://astro.build/config
export default defineConfig({
  site: 'https://heimdall223.github.io',
  base: '/alitai_portfolio/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
