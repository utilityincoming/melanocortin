// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import { lastmod } from './src/lib/pagedates.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://melanocortin.com',
  // Canonical URLs are slash-free; keep routing + sitemap consistent with them.
  trailingSlash: 'never',
  // Fully static content site: prerender every route to edge-cached HTML.
  // Nothing here renders at request time, so static wins on TTFB, crawl
  // reliability, and cost. Web Analytics is handled by the <Analytics/>
  // component in BaseLayout, so the adapter needs no options.
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap({
      // Emit a real <lastmod> per URL from each page's last git commit date.
      // Reader-facing bylines stay year-only by editorial policy; this is a
      // machine-only freshness signal for crawlers.
      serialize(item) {
        try {
          item.lastmod = lastmod(new URL(item.url).pathname);
        } catch {
          /* leave lastmod unset rather than break the build */
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
