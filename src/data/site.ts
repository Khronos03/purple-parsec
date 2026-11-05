/**
 * Datos de marca y contacto de Rustic Home.
 * Los valores editables viven en `src/content/sitio/contacto.json` (panel /admin → "Datos de contacto").
 * Aquí solo se normalizan y se derivan los enlaces.
 */
import data from '../content/sitio/contacto.json';

const digits = String(data.whatsapp ?? '').replace(/\D/g, '');
// Número colombiano de 10 dígitos → formato internacional 57XXXXXXXXXX.
const waNumber = digits.length === 10 ? `57${digits}` : digits;
const local = waNumber.startsWith('57') ? waNumber.slice(2) : waNumber;
const handle = (v: unknown) => String(v ?? '').trim().replace(/^@/, '');
const ig = handle(data.instagram);
const tt = handle(data.tiktok);

export const site = {
  name: 'Rustic Home',
  slogan: data.slogan,
  description: data.description,
  whatsapp: {
    number: waNumber,
    display: local.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3'),
  },
  instagram: { handle: `@${ig}`, url: `https://www.instagram.com/${ig.toLowerCase()}/` },
  tiktok: { handle: `@${tt}`, url: `https://www.tiktok.com/@${tt}` },
} as const;
