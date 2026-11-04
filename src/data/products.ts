/**
 * Catálogo de Rustic Home.
 *
 * Fuente única de verdad: todos los datos salen del catálogo oficial (7 páginas).
 * Para agregar o editar un producto, modifica solo este archivo.
 *
 * - Precios en pesos colombianos (COP), sin decimales.
 * - `options`: cada color/acabado con su precio. Cuando el catálogo da un
 *   precio para varios colores ("Blanca o negra: $X"), cada color es una opción con ese mismo precio.
 * - `base`: precio de la base cuando el catálogo la ofrece.
 * - Si un dato no existe en el catálogo, se deja `undefined`. No inventar.
 * - Las fotos viven en `src/assets/catalogo/`. Para usar fotos originales,
 *   reemplaza el archivo conservando el nombre, o cambia el import.
 */
import type { ImageMetadata } from 'astro';
export { formatCOP } from '../lib/format';

import gota40a from '../assets/catalogo/gota-40-a.jpg';
import gota40b from '../assets/catalogo/gota-40-b.jpg';
import redondo30a from '../assets/catalogo/redondo-30-a.jpg';
import redondo30b from '../assets/catalogo/redondo-30-b.jpg';
import gota27a from '../assets/catalogo/gota-27-a.jpg';
import gota60a from '../assets/catalogo/gota-60-a.jpg';
import gota60b from '../assets/catalogo/gota-60-b.jpg';
import conico70a from '../assets/catalogo/conico-70-a.jpg';
import conico70b from '../assets/catalogo/conico-70-b.jpg';
import jardinera100a from '../assets/catalogo/jardinera-100-a.jpg';
import jardinera100b from '../assets/catalogo/jardinera-100-b.jpg';
import jardinera70a from '../assets/catalogo/jardinera-70-a.jpg';
import jardinera70b from '../assets/catalogo/jardinera-70-b.jpg';
import rectangular60a from '../assets/catalogo/rectangular-60-a.jpg';
import gotaSmallA from '../assets/catalogo/gota-small-a.jpg';
import chimeneaA from '../assets/catalogo/chimenea-a.jpg';
import lunaA from '../assets/catalogo/luna-a.jpg';
import lunaB from '../assets/catalogo/luna-b.jpg';
import lunaC from '../assets/catalogo/luna-c.jpg';

export type CategoryId = 'gota' | 'redondo' | 'alto' | 'jardinera' | 'decoracion';

export interface Category {
  id: CategoryId;
  label: string;
}

/** Agrupación por forma, según los nombres del catálogo. */
export const categories: Category[] = [
  { id: 'gota', label: 'Gota' },
  { id: 'redondo', label: 'Redondo' },
  { id: 'alto', label: 'Cónico y rectangular' },
  { id: 'jardinera', label: 'Jardineras' },
  { id: 'decoracion', label: 'Decoración' },
];

export interface PriceOption {
  /** Nombre del color o acabado, como aparece en el catálogo. */
  name: string;
  price: number;
}

export interface Photo {
  src: ImageMetadata;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  /** Texto descriptivo tomado del catálogo, si existe. */
  description?: string;
  /** Medidas tal como aparecen en el catálogo. */
  dimensions?: string;
  /** Alto y ancho frontal en cm (números del catálogo), para dibujar a escala. */
  size?: { h: number; w: number };
  material?: string;
  options: PriceOption[];
  base?: { label: string; price: number };
  includesPlant?: false;
  photos: Photo[];
  /** Producto sin precio publicado: se consulta por WhatsApp. */
  onRequest?: boolean;
}

const CONCRETO = 'Concreto';

export const products: Product[] = [
  {
    slug: 'matero-gota-40-cm',
    name: 'Matero Gota 40 cm',
    category: 'gota',
    dimensions: '40 cm de altura × 35 cm de ancho',
    size: { h: 40, w: 35 },
    material: CONCRETO,
    options: [
      { name: 'Gris natural', price: 100000 },
      { name: 'Blanca', price: 110000 },
      { name: 'Negra', price: 110000 },
      { name: 'Microcemento', price: 115000 },
      { name: 'Estuco veneciano', price: 160000 },
    ],
    base: { label: 'Base con rodachines', price: 80000 },
    includesPlant: false,
    photos: [
      { src: gota40b, alt: 'Matero Gota 40 cm blanco con una planta de hojas largas, sobre un banco de madera' },
      { src: gota40a, alt: 'Matero Gota 40 cm con acabado veteado verde y negro en una sala' },
    ],
  },
  {
    slug: 'matero-redondo-30-cm',
    name: 'Matero Redondo 30 cm',
    category: 'redondo',
    dimensions: '30 cm de altura × 30 cm de ancho',
    size: { h: 30, w: 30 },
    material: CONCRETO,
    options: [
      { name: 'Gris natural', price: 70000 },
      { name: 'Blanca', price: 80000 },
      { name: 'Negra', price: 80000 },
      { name: 'Microcemento', price: 85000 },
      { name: 'Estuco veneciano', price: 120000 },
    ],
    base: { label: 'Base con rodachines', price: 70000 },
    includesPlant: false,
    photos: [
      { src: redondo30a, alt: 'Matero Redondo 30 cm con textura clara sobre una base con rodachines, en una terraza' },
      { src: redondo30b, alt: 'Matero Redondo 30 cm blanco con vetas negras junto a una ventana' },
    ],
  },
  {
    slug: 'matero-gota-27-cm',
    name: 'Matero Gota 27 cm',
    category: 'gota',
    dimensions: '27 cm de altura × 20 cm de ancho',
    size: { h: 27, w: 20 },
    material: CONCRETO,
    options: [
      { name: 'Gris natural', price: 60000 },
      { name: 'Blanca', price: 65000 },
      { name: 'Negra', price: 65000 },
      { name: 'Microcemento', price: 65000 },
      { name: 'Estuco veneciano', price: 90000 },
    ],
    base: { label: 'Base con rodachines', price: 60000 },
    includesPlant: false,
    photos: [
      { src: gota27a, alt: 'Matero Gota 27 cm blanco con un cactus en espiral' },
    ],
  },
  {
    slug: 'matero-gota-60-cm',
    name: 'Matero Gota 60 cm',
    category: 'gota',
    dimensions: '60 cm de altura × 45 cm de ancho',
    size: { h: 60, w: 45 },
    material: CONCRETO,
    options: [
      { name: 'Gris natural', price: 140000 },
      { name: 'Blanca', price: 150000 },
      { name: 'Negra', price: 150000 },
      { name: 'Microcemento', price: 160000 },
      { name: 'Estuco veneciano', price: 200000 },
    ],
    includesPlant: false,
    photos: [
      { src: gota60a, alt: 'Matero Gota 60 cm gris natural con una planta frente a una pared de madera' },
      { src: gota60b, alt: 'Matero Gota 60 cm blanco con vetas doradas y un caucho de hojas oscuras' },
    ],
  },
  {
    slug: 'matero-conico-70-cm',
    name: 'Matero Cónico 70 cm',
    category: 'alto',
    dimensions: '70 cm de altura × 30 cm de ancho',
    size: { h: 70, w: 30 },
    material: CONCRETO,
    options: [
      { name: 'Gris natural', price: 100000 },
      { name: 'Blanca', price: 100000 },
      { name: 'Negra', price: 100000 },
    ],
    includesPlant: false,
    photos: [
      { src: conico70a, alt: 'Dos materos Cónicos 70 cm grises con plantas en un pasillo' },
      { src: conico70b, alt: 'Matero Cónico 70 cm negro veteado con una planta de tronco' },
    ],
  },
  {
    slug: 'matero-jardinera-100-cm',
    name: 'Matero Jardinera 100 cm',
    category: 'jardinera',
    dimensions: '100 cm de largo × 20 cm de ancho × 40 cm de alto',
    size: { h: 40, w: 100 },
    material: CONCRETO,
    options: [
      { name: 'Gris natural', price: 150000 },
      { name: 'Blanca', price: 160000 },
      { name: 'Negra', price: 160000 },
    ],
    base: { label: 'Base con rodachines', price: 60000 },
    includesPlant: false,
    photos: [
      { src: jardinera100a, alt: 'Fila de jardineras de 100 cm blancas con plantas altas' },
      { src: jardinera100b, alt: 'Jardineras de 100 cm instaladas en la fachada de un local comercial' },
    ],
  },
  {
    slug: 'matero-jardinera-70-cm',
    name: 'Matero Jardinera 70 cm',
    category: 'jardinera',
    dimensions: '70 cm de largo × 25 cm de ancho × 40 cm de alto',
    size: { h: 40, w: 70 },
    material: CONCRETO,
    options: [
      { name: 'Gris natural', price: 100000 },
      { name: 'Blanca', price: 110000 },
      { name: 'Negra', price: 110000 },
      { name: 'Microcemento', price: 110000 },
    ],
    base: { label: 'Base', price: 60000 },
    includesPlant: false,
    photos: [
      { src: jardinera70a, alt: 'Jardinera de 70 cm sobre base metálica con varias plantas' },
      { src: jardinera70b, alt: 'Jardinera de 70 cm con crotos en un balcón' },
    ],
  },
  {
    slug: 'matero-rectangular-60-cm',
    name: 'Matero Rectangular 60 cm',
    category: 'alto',
    dimensions: '60 cm de altura × 30 cm de ancho',
    size: { h: 60, w: 30 },
    material: CONCRETO,
    options: [
      { name: 'Gris natural', price: 100000 },
      { name: 'Blanca', price: 100000 },
      { name: 'Negra', price: 100000 },
    ],
    base: { label: 'Base', price: 60000 },
    includesPlant: false,
    photos: [
      { src: rectangular60a, alt: 'Matero Rectangular 60 cm gris sobre base metálica con una planta' },
    ],
  },
  {
    slug: 'materos-gota-small',
    name: 'Materos Gota Small',
    category: 'gota',
    description: 'Es perfecta para alegrar el exterior de tus espacios con su atractiva apariencia.',
    dimensions: '15 cm de altura × 15 cm de ancho',
    size: { h: 15, w: 15 },
    material: CONCRETO,
    options: [
      { name: 'Gris natural', price: 20000 },
      { name: 'Blanca', price: 20000 },
      { name: 'Negra', price: 20000 },
    ],
    includesPlant: false,
    photos: [
      { src: gotaSmallA, alt: 'Matero Gota Small negro con una orquídea' },
    ],
  },
  {
    slug: 'chimenea-bioetanol',
    name: 'Chimenea Bioetanol',
    category: 'decoracion',
    description: 'Es perfecta para alegrar tus veladas y momentos especiales.',
    dimensions: '15 cm de ancho × 15 cm de alto',
    size: { h: 15, w: 15 },
    options: [
      { name: 'Gris', price: 60000 },
      { name: 'Negro', price: 60000 },
      { name: 'Blanco', price: 60000 },
    ],
    photos: [
      { src: chimeneaA, alt: 'Chimenea de bioetanol negra encendida junto a dos copas' },
    ],
  },
  {
    slug: 'lunas-de-diseno',
    name: 'Lunas de Diseño',
    category: 'decoracion',
    description: 'Pregunta por nuestro catálogo en lunas.',
    options: [],
    onRequest: true,
    photos: [
      { src: lunaC, alt: 'Luna decorativa iluminada en una pared oscura' },
      { src: lunaA, alt: 'Luna decorativa grande con luz perimetral en una sala' },
      { src: lunaB, alt: 'Luna decorativa iluminada detrás de una copa de vino' },
    ],
  },
];

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

export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);
