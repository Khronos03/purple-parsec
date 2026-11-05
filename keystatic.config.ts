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
import { config, collection, singleton, fields } from '@keystatic/core';

/**
 * ⚠️ Proyecto de Keystatic Cloud: "equipo/proyecto", tal como aparece en keystatic.cloud.
 * Crea el proyecto allí, conéctalo al repositorio purple-parsec y pega aquí su identificador.
 */
const CLOUD_PROJECT = 'TU-EQUIPO/purple-parsec';

const foto = (label: string, description?: string, required = true) =>
  fields.image({
    label,
    description,
    // Cada producto guarda sus fotos en su propia carpeta: fotos/<producto>/
    directory: 'src/content/productos/fotos',
    publicPath: './fotos/',
    validation: { isRequired: required },
  });

export default config({
  storage: import.meta.env.DEV ? { kind: 'local' } : { kind: 'cloud' },
  cloud: { project: CLOUD_PROJECT },
  ui: {
    brand: { name: 'Rustic Home' },
    navigation: { Catálogo: ['productos'], Sitio: ['contacto'] },
  },

  collections: {
    productos: collection({
      label: 'Productos',
      path: 'src/content/productos/*',
      format: { data: 'json' },
      slugField: 'name',
      columns: ['name', 'order'],
      entryLayout: 'form',
      schema: {
        name: fields.slug({
          name: {
            label: 'Nombre',
            description: 'Ej.: Matero Gota 40 cm. También define la dirección de la página del producto.',
            validation: { length: { min: 1 } },
          },
          slug: { label: 'Dirección (URL)', description: 'Se genera sola a partir del nombre.' },
        }),
        published: fields.checkbox({
          label: 'Publicado',
          description: 'Desmárcalo para ocultar el producto sin borrarlo.',
          defaultValue: true,
        }),
        category: fields.select({
          label: 'Mesón (forma)',
          options: [
            { label: 'Gota', value: 'gota' },
            { label: 'Redondo', value: 'redondo' },
            { label: 'Cónico y rectangular', value: 'alto' },
            { label: 'Jardineras', value: 'jardinera' },
            { label: 'Decoración', value: 'decoracion' },
          ],
          defaultValue: 'gota',
        }),
        order: fields.integer({
          label: 'Orden',
          description: 'Número menor aparece antes en el catálogo.',
          defaultValue: 100,
        }),
        photos: fields.array(
          fields.object({
            src: foto('Foto'),
            alt: fields.text({
              label: 'Descripción de la foto',
              description: 'Qué se ve en la foto (la leen Google y los lectores de pantalla).',
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: 'Fotos',
            description: 'La primera es la foto principal.',
            itemLabel: (props) => props.fields.alt.value || 'Foto',
            validation: { length: { min: 1 } },
          },
        ),
        description: fields.text({ label: 'Descripción corta', multiline: true }),
        dimensions: fields.text({
          label: 'Medidas (texto)',
          description: 'Como en el catálogo: 40 cm de altura × 35 cm de ancho',
        }),
        size: fields.object(
          {
            h: fields.number({ label: 'Alto (cm)' }),
            w: fields.number({ label: 'Ancho o largo (cm)' }),
          },
          {
            label: 'Medidas en números',
            description: 'Se usan para dibujar el mesón a escala del inicio.',
          },
        ),
        material: fields.text({ label: 'Material', defaultValue: 'Concreto' }),
        showNoPlant: fields.checkbox({ label: 'Mostrar «No incluye la mata»', defaultValue: true }),
        onRequest: fields.checkbox({
          label: 'Precio a consultar',
          description: 'Márcalo si el producto no tiene precios publicados (como las Lunas).',
          defaultValue: false,
        }),
        options: fields.array(
          fields.object({
            name: fields.text({ label: 'Nombre', validation: { length: { min: 1 } } }),
            price: fields.integer({ label: 'Precio (COP)', description: 'Sin puntos: 100000', validation: { isRequired: true, min: 1 } }),
          }),
          {
            label: 'Colores y acabados',
            description:
              'Con muestra de color: Gris natural, Gris, Blanca, Blanco, Negra, Negro. Microcemento y Estuco veneciano muestran una nota explicativa.',
            itemLabel: (props) =>
              `${props.fields.name.value || 'Sin nombre'} — $${(props.fields.price.value ?? 0).toLocaleString('es-CO')}`,
          },
        ),
        base: fields.object(
          {
            label: fields.text({ label: 'Nombre', defaultValue: 'Base con rodachines' }),
            price: fields.integer({ label: 'Precio (COP)', description: 'Déjalo vacío si no se ofrece base.' }),
          },
          { label: 'Base' },
        ),
        hero: fields.object(
          {
            show: fields.checkbox({
              label: 'Mostrar en el mesón del inicio',
              description: 'Requiere las medidas en números.',
              defaultValue: false,
            }),
            photo: foto(
              'Foto recortada al matero',
              'Opcional. Un recorte ajustado al matero (de la base al borde) se ve mejor a escala.',
              false,
            ),
            hideOnMobile: fields.checkbox({ label: 'Ocultar en celular', defaultValue: false }),
          },
          { label: 'Mesón del inicio (a escala)' },
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
