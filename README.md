# Rustic Home · Catálogo digital

Catálogo de materos de concreto con pedido directo por WhatsApp. Astro 7, sitio 100 % estático, sin frameworks de UI.

## Comandos

| Comando           | Acción                                   |
| :---------------- | :--------------------------------------- |
| `npm install`     | Instala dependencias                     |
| `npm run dev`     | Servidor local en `http://localhost:4321` |
| `npm run build`   | Genera el sitio en `./dist/`             |
| `npm run preview` | Sirve `./dist/` para revisarlo           |

## Estructura

```
src/
  content/productos/   ← un JSON por producto + fotos/<producto>/ (editables desde /keystatic)
  content/sitio/contacto.json ← WhatsApp, Instagram, TikTok, eslogan (editable desde /keystatic)
  content.config.ts    ← esquema y validación del catálogo
  data/products.ts     ← lectura del catálogo, muestras de color y utilidades
  data/site.ts         ← deriva enlaces de contacto desde contacto.json
  lib/whatsapp.ts      ← enlaces wa.me y mensajes prellenados
  lib/format.ts        ← formato de precios COP
  assets/catalogo/     ← fotos (Astro las convierte a WebP y genera tamaños)
  components/          ← Header, Hero, Concreto, Catalog, Shelf (mesón), ShelfItem (producto + etiqueta), Footer, WhatsAppFab, Icon, Sprig
  pages/index.astro    ← inicio + catálogo en mesones a escala
  pages/catalogo/[slug].astro ← una página por producto, con selector de acabado
```

## Administración

El cliente edita el catálogo en `/keystatic` (botón "Ingreso administrador" del footer) con
Keystatic + Keystatic Cloud, sin backend propio ni base de datos: los cambios se guardan como
commits en GitHub y Vercel republica solo. Configuración en `keystatic.config.ts`; uso: **ADMIN.md**.

## Tareas habituales

- **Cambiar un precio o agregar un acabado:** desde `/keystatic`, o edita `options` en el JSON del producto en `src/content/productos/`.
- **Agregar un producto:** desde `/keystatic` → Productos → Add, o copia un JSON en `src/content/productos/`. El nombre del archivo es la dirección: `/catalogo/<archivo>/`.
- **Reemplazar fotos por originales:** súbelas desde `/keystatic` (en el producto, cambia la foto). Las fotos actuales son recortes de las capturas del catálogo ampliados con superresolución (EDSR); siguen teniendo poco detalle.
- **Dominio:** cuando lo tengas, define `site` en `astro.config.mjs`. Así se generan canonical, Open Graph absoluto y datos estructurados de producto.

## Notas

- Los productos no tienen referencia/código porque el catálogo no los incluye.
- Las fuentes (Zilla Slab y Hanken Grotesk) se sirven desde el propio sitio vía la API de fuentes de Astro.
- Ya no se usan y puedes borrarlos: `src/components/Welcome.astro`, `src/components/ProductCard.astro`, `src/assets/astro.svg`, `src/assets/background.svg` y en `src/assets/catalogo/` todo menos `concreto.jpg` (las fotos ahora están en `src/content/productos/fotos/`).

Desarrollado por J. Alexander Suaza M. con 💚
