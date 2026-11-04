// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

const zilla = (weight) => ({
  weight,
  style: 'normal',
  src: [`@fontsource/zilla-slab/files/zilla-slab-latin-${weight}-normal.woff2`],
});

// https://astro.build/config
export default defineConfig({
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
