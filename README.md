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
  data/products.ts     ← catálogo: nombres, medidas, acabados, precios, fotos
  data/site.ts         ← WhatsApp, Instagram, TikTok, eslogan
  lib/whatsapp.ts      ← enlaces wa.me y mensajes prellenados
  lib/format.ts        ← formato de precios COP
  assets/catalogo/     ← fotos (Astro las convierte a WebP y genera tamaños)
  components/          ← Header, Hero, Concreto, Catalog, Shelf (mesón), ShelfItem (producto + etiqueta), Footer, WhatsAppFab, Icon, Sprig
  pages/index.astro    ← inicio + catálogo en mesones a escala
  pages/catalogo/[slug].astro ← una página por producto, con selector de acabado
```

## Tareas habituales

- **Cambiar un precio o agregar un acabado:** edita `options` del producto en `src/data/products.ts`.
- **Agregar un producto:** copia un objeto en `products`, cambia `slug`, datos y fotos. Su página se crea sola en `/catalogo/<slug>/`. Incluye `size: { h, w }` (alto y ancho en cm) para que aparezca a escala en el mesón.
- **Reemplazar fotos por originales:** guarda la foto nueva en `src/assets/catalogo/` con el mismo nombre (por ejemplo `gota-40-a.jpg`). Las fotos actuales son recortes de las capturas del catálogo ampliados con superresolución (EDSR); siguen teniendo poco detalle.
- **Dominio:** cuando lo tengas, define `site` en `astro.config.mjs`. Así se generan canonical, Open Graph absoluto y datos estructurados de producto.

## Notas

- Los productos no tienen referencia/código porque el catálogo no los incluye.
- Las fuentes (Zilla Slab y Hanken Grotesk) se sirven desde el propio sitio vía la API de fuentes de Astro.
- Ya no se usan y puedes borrarlos: `src/components/Welcome.astro`, `src/components/ProductCard.astro`, `src/assets/astro.svg`, `src/assets/background.svg` y `src/assets/catalogo/portada-a.jpg`.

Desarrollado por J. Alexander Suaza M. con 💚
