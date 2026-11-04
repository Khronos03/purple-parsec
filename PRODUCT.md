# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Personas que buscan materos y piezas decorativas para su hogar, oficina o negocio (el catálogo menciona "hogar, oficina o empresa" y muestra instalaciones en locales comerciales). Llegan sobre todo desde el móvil, a menudo desde Instagram, TikTok o un enlace compartido por WhatsApp. Su tarea: ver el producto, entender medidas, acabados y precio, y pedirlo por WhatsApp.

## Product Purpose

Catálogo digital de Rustic Home. Reemplaza el PDF/imagen que hoy se envía por chat. Éxito = más conversaciones de compra por WhatsApp con el producto, acabado y precio ya identificados.

## Positioning

Materos de concreto hechos por la marca, con el mismo modelo disponible en varios acabados (gris natural, blanco o negro, microcemento, estuco veneciano) y precio distinto por acabado. Ese sistema modelo × acabado es lo que la web debe hacer fácil de entender.

## Operating Context

- Sin carrito, sin pagos, sin cuentas. La compra se cierra en WhatsApp (+57 311 740 2752).
- Redes: Instagram @Rustichome05, TikTok @rustic_.home.
- Ciudad y envíos: no se mencionan (decisión del usuario).

## Capabilities and Constraints

- Sitio estático en Astro 7. Datos en `src/data/products.ts`.
- Precios en pesos colombianos tal como aparecen en el catálogo. "No incluye la mata" aplica a todos los materos.
- El catálogo no tiene referencias ni códigos de producto. No inventarlos.
- Lunas de diseño: sin precio ni medidas; solo "pregunta por nuestro catálogo en lunas".

## Brand Commitments

La web debe sentirse como una extensión digital del catálogo original (fijado por el usuario): verde oliva profundo, blanco, franja gris salvia, títulos en slab, fotos en arco. Sin gradientes ni colores saturados ajenos a la marca. Lema: "¡Regálale vida a tus espacios!".

## Evidence on Hand

- 7 páginas del catálogo (capturas). Fotos de producto recortadas de ellas en `src/assets/catalogo/` (baja resolución, ~200-250 px de origen). Pendiente: reemplazar por fotos originales.
- Textos reales: bienvenida y descripción de los materos de concreto.
- No hay testimonios, clientes, cifras ni garantías. No fabricarlos.

## Product Principles

1. El producto y su foto primero; la interfaz acompaña.
2. Cada dato visible sale del catálogo. Lo que no está, se consulta por WhatsApp.
3. Del producto a WhatsApp en un toque, con el mensaje ya escrito.
4. Móvil primero.
