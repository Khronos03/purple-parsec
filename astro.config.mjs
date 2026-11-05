// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

const zilla = (weight) => ({
  weight,
  style: 'normal',
  src: [`@fontsource/zilla-slab/files/zilla-slab-latin-${weight}-normal.woff2`],
});

// https://astro.build/config
export default defineConfig({
  // El sitio sigue siendo estático; solo el panel /keystatic y su API corren bajo demanda en Vercel.
  output: 'static',
  adapter: vercel(),
  integrations: [react(), keystatic()],
  // Cuando tengas dominio, defínelo aquí para URLs absolutas (canonical, Open Graph, JSON-LD):
  // site: 'https://www.tudominio.com',
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Zilla Slab',
      cssVariable: '--font-display',
      fallbacks: ['Georgia', 'serif'],
      options: { variants: [zilla(600), zilla(700)] },
    },
    {
      provider: fontProviders.local(),
      name: 'Hanken Grotesk',
      cssVariable: '--font-text',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            weight: '300 700',
            style: 'normal',
            src: ['@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2'],
          },
        ],
      },
    },
  ],
});
