/**
 * Colecciones de contenido: el catálogo vive en JSON + fotos dentro del repositorio.
 * Se edita desde el panel /admin (Sveltia CMS), que guarda cada cambio en GitHub;
 * Vercel vuelve a publicar el sitio automáticamente.
 *
 * El esquema valida cada producto al compilar: si un dato del panel queda mal,
 * el build falla con un mensaje claro en lugar de publicar una página rota.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** El panel puede guardar campos opcionales vacíos ("" o null); se tratan como ausentes. */
const empty = (v: unknown) => (v === '' || v === null ? undefined : v);
const optionalText = z.preprocess(empty, z.string().trim().min(1).optional());

export const CATEGORY_IDS = ['gota', 'redondo', 'alto', 'jardinera', 'decoracion'] as const;

const productos = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/productos' }),
  schema: ({ image }) =>
    z.object({
      name: z.string().trim().min(1),
      category: z.enum(CATEGORY_IDS),
      order: z.preprocess(empty, z.number().default(999)),
      published: z.boolean().default(true),
      description: optionalText,
      dimensions: optionalText,
      size: z.preprocess(
        (v) => {
          const o = v as { h?: unknown; w?: unknown } | null | undefined;
          return o && empty(o.h) !== undefined && empty(o.w) !== undefined ? o : undefined;
        },
        z.object({ h: z.number().positive(), w: z.number().positive() }).optional(),
      ),
      material: optionalText,
      showNoPlant: z.boolean().default(false),
      onRequest: z.boolean().default(false),
      options: z
        .array(z.object({ name: z.string().trim().min(1), price: z.number().int().positive() }))
        .default([]),
      base: z.preprocess(
        (raw) => {
          // Formato del panel: { discriminant: boolean, value: { label, price } }
          const v = raw && typeof raw === 'object' && 'discriminant' in raw
            ? ((raw as { discriminant: boolean; value?: unknown }).discriminant ? (raw as { value?: unknown }).value : undefined)
            : raw;
          const o = v as { label?: unknown; price?: unknown } | null | undefined;
          return o && empty(o.label) !== undefined && empty(o.price) !== undefined ? o : undefined;
        },
        z.object({ label: z.string().trim().min(1), price: z.number().int().positive() }).optional(),
      ),
      photos: z
        .array(z.object({ src: image(), alt: z.string().trim().min(1) }))
        .min(1, 'Cada producto necesita al menos una foto'),
      hero: z.preprocess(
        (raw) => {
          // Formato del panel: { discriminant: boolean, value: { photo, hideOnMobile } }
          if (raw && typeof raw === 'object' && 'discriminant' in raw) {
            const r = raw as { discriminant: boolean; value?: Record<string, unknown> | null };
            return { show: r.discriminant, ...(r.discriminant ? r.value ?? {} : {}) };
          }
          return raw;
        },
        z
        .object({
          show: z.boolean().default(false),
          photo: z.preprocess(empty, image().optional()),
          hideOnMobile: z.boolean().default(false),
        })
        .default({ show: false, hideOnMobile: false }),
      ),
    }),
});

export const collections = { productos };
