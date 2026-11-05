/**
 * Panel de administración del catálogo (Keystatic).
 *
 * - En producción guarda en GitHub a través de Keystatic Cloud (inicio de sesión de Keystatic,
 *   sin backend propio ni base de datos). Vercel republica el sitio con cada cambio.
 * - En desarrollo (`npm run dev`) edita los archivos locales directamente.
 *
 * Los datos son los mismos que lee Astro: `src/content/productos/*.json` (+ fotos por producto)
 * y `src/content/sitio/contacto.json`. La validación final está en `src/content.config.ts`.
 * Guía: ADMIN.md.
 */
import { createElement as h } from 'react';
import { config, collection, singleton, fields } from '@keystatic/core';

/** Proyecto de Keystatic Cloud (equipo/proyecto), conectado al repositorio purple-parsec. */
const CLOUD_PROJECT = 'somba/rustic-home';

const foto = (label: string, description?: string, required = true) =>
  fields.image({
    label,
    description,
    // Cada producto guarda sus fotos en su propia carpeta: fotos/<producto>/
    directory: 'src/content/productos/fotos',
    publicPath: './fotos/',
    validation: { isRequired: required },
  });

/** Marca del panel: la hoja de Rustic Home, en el verde de la marca. */
const BrandMark = ({ colorScheme }: { colorScheme: 'light' | 'dark' }) =>
  h(
    'svg',
    { width: 24, height: 24, viewBox: '0 0 24 24', 'aria-hidden': true },
    h('rect', { width: 24, height: 24, rx: 6, fill: colorScheme === 'dark' ? '#b8d48a' : '#547236' }),
    h('path', {
      fill: colorScheme === 'dark' ? '#22301a' : '#f6f5ef',
      transform: 'translate(3.6 3.6) scale(0.7)',
      d: 'M20.5 3.5c-8.6.2-14.6 3.7-15.9 10.1-.4 1.9-.1 3.7.6 5.1L3 20.9l1.1 1.1 2.2-2.2c1.4.8 3.1 1 5 .6 6.5-1.3 9.9-7.3 10.1-15.9V3.5h-.9Zm-9.6 14.9c-1.3.3-2.5.2-3.5-.3l6.9-6.9-1.1-1.1-6.9 6.9c-.5-1-.6-2.2-.3-3.5C7 8.4 11.7 5.3 18.9 5.1c-.2 7.2-3.3 11.9-8 13.3Z',
    }),
  );

const cop = (n: number | null) => (n == null ? '' : `$${n.toLocaleString('es-CO')}`);

export default config({
  storage: import.meta.env.DEV ? { kind: 'local' } : { kind: 'cloud' },
  cloud: { project: CLOUD_PROJECT },
  locale: 'es-ES',
  ui: {
    brand: { name: 'Rustic Home', mark: BrandMark },
    navigation: { Catálogo: ['productos'], Sitio: ['contacto'] },
  },

  collections: {
    productos: collection({
      label: 'Productos',
      path: 'src/content/productos/*',
      format: { data: 'json' },
      slugField: 'name',
      columns: ['name', 'order'],
      previewUrl: '/catalogo/{slug}/',
      entryLayout: 'form',
      schema: {
        // 1. Identidad y ubicación en el catálogo
        name: fields.slug({
          name: {
            label: 'Nombre',
            description: 'Como aparece en el catálogo. Ej.: Matero Gota 40 cm',
            validation: { length: { min: 1 } },
          },
          slug: {
            label: 'Dirección de la página',
            description:
              'Se crea a partir del nombre. Si la cambias, los enlaces que ya compartiste dejarán de funcionar.',
          },
        }),
        published: fields.checkbox({
          label: 'Visible en el catálogo',
          description: 'Desmárcalo para ocultar el producto sin borrarlo.',
          defaultValue: true,
        }),
        category: fields.select({
          label: 'Mesón',
          description: 'Grupo del catálogo donde aparece.',
          options: [
            { label: 'Gota y redondo · Gota', value: 'gota' },
            { label: 'Gota y redondo · Redondo', value: 'redondo' },
            { label: 'Altos y jardineras · Cónico o rectangular', value: 'alto' },
            { label: 'Altos y jardineras · Jardinera', value: 'jardinera' },
            { label: 'Decoración', value: 'decoracion' },
          ],
          defaultValue: 'gota',
        }),
        order: fields.integer({
          label: 'Posición',
          description: 'Número menor aparece antes. Usa saltos de 10 (10, 20, 30…) para poder intercalar.',
          defaultValue: 100,
        }),

        // 2. Fotos
        photos: fields.array(
          fields.object({
            src: foto('Foto'),
            alt: fields.text({
              label: 'Qué se ve en la foto',
              description: 'Una frase corta. La leen Google y las personas con lector de pantalla.',
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: 'Fotos',
            description: 'La primera es la principal. Arrastra para cambiar el orden.',
            itemLabel: (props) => props.fields.alt.value || 'Foto sin descripción',
            validation: { length: { min: 1 } },
          },
        ),

        // 3. Precios
        options: fields.array(
          fields.object(
            {
              name: fields.text({ label: 'Color o acabado', validation: { length: { min: 1 } } }),
              price: fields.integer({
                label: 'Precio (COP)',
                description: 'Solo números: 100000',
                validation: { isRequired: true, min: 1 },
              }),
            },
            { layout: [8, 4] },
          ),
          {
            label: 'Colores, acabados y precios',
            description:
              'Si no agregas ninguno, el producto aparece como «Precio a consultar». Con muestra de color: Gris natural, Gris, Blanca, Blanco, Negra, Negro.',
            itemLabel: (props) => `${props.fields.name.value || 'Sin nombre'} — ${cop(props.fields.price.value)}`,
          },
        ),
        base: fields.conditional(
          fields.checkbox({ label: 'Se puede pedir con base', defaultValue: false }),
          {
            true: fields.object(
              {
                label: fields.text({ label: 'Nombre de la base', defaultValue: 'Base con rodachines', validation: { length: { min: 1 } } }),
                price: fields.integer({ label: 'Precio (COP)', validation: { isRequired: true, min: 1 } }),
              },
              { layout: [8, 4] },
            ),
            false: fields.empty(),
          },
        ),

        // 4. Ficha del producto
        description: fields.text({ label: 'Descripción corta', description: 'Opcional. Una o dos frases.', multiline: true }),
        dimensions: fields.text({
          label: 'Medidas como se leen en la ficha',
          description: 'Ej.: 40 cm de altura × 35 cm de ancho',
        }),
        size: fields.object(
          {
            h: fields.number({ label: 'Alto (cm)' }),
            w: fields.number({ label: 'Ancho o largo (cm)' }),
          },
          {
            label: 'Medidas en números',
            description: 'Necesarias para que el producto aparezca a escala en el inicio.',
            layout: [6, 6],
          },
        ),
        material: fields.text({ label: 'Material', defaultValue: 'Concreto' }),
        showNoPlant: fields.checkbox({ label: 'Indicar «No incluye la mata»', defaultValue: true }),

        // 5. Inicio
        hero: fields.conditional(
          fields.checkbox({
            label: 'Mostrar en el mesón a escala del inicio',
            description: 'Requiere las medidas en números.',
            defaultValue: false,
          }),
          {
            true: fields.object({
              photo: foto(
                'Foto recortada al matero',
                'Opcional. Un recorte de la base al borde del matero se ve mejor a escala. Si no hay, se usa la foto principal.',
                false,
              ),
              hideOnMobile: fields.checkbox({
                label: 'Ocultar en celular',
                description: 'En pantallas pequeñas caben 4 materos.',
                defaultValue: false,
              }),
            }),
            false: fields.empty(),
          },
        ),
      },
    }),
  },

  singletons: {
    contacto: singleton({
      label: 'Contacto y redes',
      path: 'src/content/sitio/contacto',
      format: { data: 'json' },
      schema: {
        whatsapp: fields.text({
          label: 'WhatsApp',
          description: '10 dígitos del celular, sin espacios ni +57. Ej.: 3117402752',
          validation: { length: { min: 10, max: 10 }, pattern: { regex: /^\d{10}$/, message: 'Escribe solo los 10 dígitos' } },
        }),
        instagram: fields.text({ label: 'Usuario de Instagram', description: 'Sin @' }),
        tiktok: fields.text({ label: 'Usuario de TikTok', description: 'Sin @' }),
        slogan: fields.text({ label: 'Eslogan' }),
        description: fields.text({
          label: 'Descripción para Google y redes',
          description: 'Aparece en los resultados de búsqueda y al compartir el enlace.',
          multiline: true,
        }),
      },
    }),
  },
});
