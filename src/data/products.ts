/**
 * Catálogo de Rustic Home.
 *
 * Los productos viven en `src/content/productos/*.json` (uno por producto) y sus fotos en
 * `src/content/productos/fotos/`. Se editan desde el panel /admin; este módulo solo los lee.
 * El esquema y la validación están en `src/content.config.ts`.
 *
 * - Precios en pesos colombianos (COP), sin decimales.
 * - `options`: cada color/acabado con su precio.
 * - `base`: precio de la base cuando el catálogo la ofrece.
 * - Si un dato no existe en el catálogo, se deja vacío. No inventar.
 */
import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
export { formatCOP } from '../lib/format';

export type CategoryId = CollectionEntry<'productos'>['data']['category'];

export interface Category {
  id: CategoryId;
  label: string;
}

/** Agrupación por forma (las opciones del panel usan estos mismos ids). */
export const categories: Category[] = [
  { id: 'gota', label: 'Gota' },
  { id: 'redondo', label: 'Redondo' },
  { id: 'alto', label: 'Cónico y rectangular' },
  { id: 'jardinera', label: 'Jardineras' },
  { id: 'decoracion', label: 'Decoración' },
];

export interface PriceOption {
  name: string;
  price: number;
}

export interface Photo {
  src: ImageMetadata;
  alt: string;
}

export type Product = Omit<CollectionEntry<'productos'>['data'], 'showNoPlant'> & {
  slug: string;
  includesPlant?: false;
};

/** true si el precio cambia según el color/acabado. */
export const pricesVary = (product: Product): boolean =>
  new Set(product.options.map((o) => o.price)).size > 1;

/** Muestra de color para opciones que son un color liso (no para microcemento ni estuco). */
export const SWATCHES: Record<string, string> = {
  'Gris natural': '#a3a49d',
  Gris: '#a3a49d',
  Blanca: '#f4f3ee',
  Blanco: '#f4f3ee',
  Negra: '#2b2c29',
  Negro: '#2b2c29',
};

/** Explicación corta de los acabados que no son un color liso. */
export const FINISH_NOTES: Record<string, string> = {
  Microcemento: 'Revestimiento fino de cemento, de textura continua.',
  'Estuco veneciano': 'Acabado pulido con vetas, de aspecto marmolado.',
};

export const lowestPrice = (product: Product): number | undefined =>
  product.options.length ? Math.min(...product.options.map((o) => o.price)) : undefined;

/** Productos publicados, en el orden definido en el panel. */
export async function getProducts(): Promise<Product[]> {
  const entries = await getCollection('productos');
  return entries
    .filter((e) => e.data.published)
    .map((e) => ({
      slug: e.id,
      ...e.data,
      // Sin precios cargados = "Precio a consultar", aunque no se haya marcado la casilla.
      onRequest: e.data.onRequest || e.data.options.length === 0,
      includesPlant: e.data.showNoPlant ? (false as const) : undefined,
    }))
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, 'es'));
}
