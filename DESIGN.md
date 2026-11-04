# Design · Rustic Home — "El mesón del vivero"

Los productos están parados en un mesón de concreto con una etiqueta de papel colgando del borde. El hero los muestra a escala real entre sí. En el catálogo todas las fotos tienen el mismo tamaño (arco 4:5), por decisión del usuario. Tokens en `src/styles/global.css`.

## Color
| Token | Valor | Uso |
|---|---|---|
| `--green` | #547236 | Pared del vivero: hero, catálogo, fichas, relacionados |
| `--green-deep` | #2f4520 | Títulos sobre blanco o sobre etiqueta |
| `--green-ink` | #22301a | Texto, botón sólido |
| `--on-green` / `--on-green-soft` | #f6f5ef / #eef2e7 | Texto sobre la pared (ambos ≥4,5:1) |
| `--bench` / `--bench-top` | #c7cac1 / #dfe1d9 | Mesón de concreto: frente y cara superior |
| `--tag` | #fffefa | Etiqueta de papel |
| `--paper` | #ffffff | Suelo: sección de concreto y cierre |
| `--sage` | #c7cac1 | Franja inferior |
| `--sage-ink` | #565d4f | Texto secundario |

## Escala
- `--cm` = píxeles por centímetro real: 2,5 en móvil, 3,4 desde 48rem y 4,2 desde 70rem. En el hero son 2,3, 3,2 y 4,2.
- Solo en el hero: cada arco mide `ancho × alto` reales (`size` en `products.ts`), con una regla en cm. Usa recortes ajustados al matero (`assets/catalogo/hero/`), apoyados abajo.
- Catálogo y relacionados: arcos iguales 4:5; las medidas van en la etiqueta.
- Ficha: cotas de alto y ancho junto a la foto.

## Componentes
- `ShelfItem`: arco (igual en el catálogo y a escala en el hero), tramo de mesón y etiqueta (nombre, medidas, "Desde $", botón de WhatsApp). Usa subgrid para que el mesón quede alineado en toda la fila.
- `Shelf`: fila de mesón ordenada de más alto a más bajo, con título. El mesón continúa hasta el final de la fila.
- Ficha de producto: la etiqueta grande, que cuelga de un hilo, es el formulario.
  - Opciones con muestra de color: un círculo lleno para gris, blanco o negro, y un anillo punteado con una nota corta para microcemento y estuco, porque no hay foto real de esos acabados.
  - Cantidad, total, y vista previa del mensaje de WhatsApp.
  - La selección vive en la URL (`?acabado=&base=1&cantidad=`).
  - Miniaturas que cambian la foto principal.
  - El total se "re-sella" con una animación al cambiar.
- Barra de compra fija en móvil (el contenedor usa `overflow-x: clip`, no `hidden`, para no romper `sticky`).
- 404: el mesón con un hueco vacío y una etiqueta con enlaces al catálogo y a WhatsApp.
- El menú móvil es una etiqueta colgada del botón; se cierra con Esc o al tocar fuera.

## Tipografía
Zilla Slab 600/700 para títulos y nombres en las etiquetas. Hanken Grotesk para el texto. Ambas se sirven desde el propio sitio.

## Movimiento
- La etiqueta gira 2,5° desde la perforación en hover/focus.
- El sello del precio al cambiar de acabado.
- La foto viaja del mesón a la ficha con transiciones entre páginas.
- Todo se desactiva con `prefers-reduced-motion`.
