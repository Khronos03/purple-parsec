# Administrar el catálogo (Keystatic)

El catálogo no tiene backend propio ni base de datos. Cada producto es un JSON en
`src/content/productos/`, con sus fotos en `src/content/productos/fotos/<producto>/`. Los datos
de contacto están en `src/content/sitio/contacto.json`.

El panel **/keystatic** (botón "Ingreso administrador" del footer) edita esos archivos. En
producción guarda a través de **Keystatic Cloud**, que hace el commit en GitHub. Vercel vuelve
a publicar el sitio en 1 a 2 minutos.

```
/keystatic ──Keystatic Cloud──▶ GitHub (JSON + fotos) ──deploy automático──▶ Vercel
```

El sitio sigue siendo estático. Solo `/keystatic` y `/api/keystatic` corren como función en
Vercel, gracias al adaptador `@astrojs/vercel`. Es el mismo esquema que en Somba.

## Configuración inicial (una sola vez)

1. **Keystatic Cloud.** En https://keystatic.cloud inicia sesión con GitHub, crea el proyecto
   (en tu equipo actual o en uno nuevo) y conéctalo al repositorio `purple-parsec`. Así se
   instala la GitHub App de Keystatic en ese repositorio.
2. **Identificador.** Ya está configurado en `keystatic.config.ts`: `CLOUD_PROJECT =
   'somba/rustic-home'`. Si cambias de equipo o de proyecto en Keystatic Cloud, actualízalo ahí.
3. **Publicar.** Haz commit y push. Vercel detecta el adaptador y despliega el sitio estático
   más la función del panel. No necesitas variables de entorno.
4. **Cliente.** En Keystatic Cloud, invita al cliente al equipo. Entra en
   `https://tu-sitio/keystatic` con "Sign in with Keystatic Cloud". Revisa en Keystatic Cloud
   cuántos usuarios incluye tu plan.

## Trabajar en local (desarrollador)

`npm run dev` → `http://localhost:4321/keystatic`. En desarrollo el panel edita los archivos
locales directamente, sin Cloud. Después haces commit y push como siempre.

## Qué puede editar el cliente

- **Productos:** crear, editar, ocultar (*Publicado*), ordenar (*Orden*) y borrar.
  - Fotos (la primera es la principal) con su descripción.
  - Medidas en texto, más alto y ancho en números (para el mesón a escala del inicio).
  - Colores y acabados con precio, y la base opcional.
  - *Precio a consultar*: si no se carga ningún precio, el producto se trata así automáticamente.
  - *Mesón del inicio*: si aparece en el mesón a escala, con una foto recortada opcional.
- **Contacto y redes:** WhatsApp (10 dígitos), Instagram, TikTok, eslogan y descripción para
  Google.

### Muestras de color
Las opciones llamadas `Gris natural`, `Gris`, `Blanca`, `Blanco`, `Negra` o `Negro` muestran un
círculo de color. `Microcemento` y `Estuco veneciano` muestran una nota explicativa. Para agregar
otra, edita `SWATCHES` o `FINISH_NOTES` en `src/data/products.ts`.

## Si algo sale mal

- Cada producto se valida al publicar (`src/content.config.ts`). Si falta un dato obligatorio,
  el despliegue en Vercel falla y **el sitio anterior sigue en línea**. El error aparece en
  Vercel → Deployments.
- Todo cambio queda en el historial de GitHub, así que se puede revertir.

## Estructura de archivos que genera el panel

Keystatic guarda cada foto con una ruta fija según su posición:
`fotos/<producto>/photos/<n>/src.jpg` y `fotos/<producto>/hero/photo.jpg`. Los productos
existentes ya están en ese formato. No renombres esos archivos a mano.
