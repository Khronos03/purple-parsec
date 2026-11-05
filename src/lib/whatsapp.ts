import { site } from '../data/site';
import { formatCOP } from './format';
import type { Product } from '../data/products';

/** Construye un enlace wa.me con el mensaje codificado (espacios, tildes, $, etc.). */
export const waLink = (message: string): string =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const GENERAL_MESSAGE =
  'Hola, vi el catálogo de Rustic Home y quiero más información sobre sus productos.';

const ARTICLES: Record<string, string> = { Matero: 'el', Materos: 'los', Chimenea: 'la', Lunas: 'las' };
const article = (name: string): string => ARTICLES[name.split(' ')[0]] ?? 'el producto';

interface Selection {
  option?: { name: string; price: number };
  withBase?: boolean;
  /** Cantidad de unidades (por defecto 1). */
  qty?: number;
}

/**
 * Mensaje contextualizado para un producto. Solo incluye precios confirmados
 * en el catálogo. El catálogo no tiene referencias, así que no se mencionan.
 * - Sin selección (botón del catálogo): nombre + "desde $X" y pregunta por acabados.
 * - Con selección (ficha): acabado, base, cantidad y total.
 */
export const productMessage = (
  product: Pick<Product, 'name' | 'options' | 'base' | 'onRequest'>,
  selection: Selection = {},
): string => {
  const subject = `${article(product.name)} ${product.name}`;
  if (product.onRequest) {
    return `Hola, estoy interesado en ${subject}. ¿Me pueden compartir precios, opciones y disponibilidad?`;
  }

  const { option, withBase = false, qty = 1 } = selection;
  const prices = product.options.map((o) => o.price);

  if (!option) {
    if (!prices.length) return `Hola, estoy interesado en ${subject}. ¿Me pueden brindar más información?`;
    const low = Math.min(...prices);
    const vary = new Set(prices).size > 1;
    return `Hola, estoy interesado en ${subject} (${vary ? 'desde ' : ''}${formatCOP(low)}). ¿Qué colores y acabados tienen disponibles?`;
  }

  const base = withBase && product.base ? product.base : undefined;
  const unit = option.price + (base?.price ?? 0);
  const lines = [
    `Hola, quiero pedir ${qty > 1 ? `${qty} unidades de ${subject}`.replace(' de el ', ' del ') : subject}:`,
    `- Color/acabado: ${option.name} (${formatCOP(option.price)})`,
  ];
  if (base) lines.push(`- ${base.label} (${formatCOP(base.price)})`);
  if (qty > 1) lines.push(`- Cantidad: ${qty}`);
  lines.push(`- Total: ${formatCOP(unit * qty)}`);
  lines.push('¿Me confirman disponibilidad y cómo hago la compra?');
  return lines.join('\n');
};
