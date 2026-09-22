# Guía de contenido — Portfolio Alitai

Esta guía explica cómo agregar o editar series, obras y exhibiciones **sin tocar el código** de layouts o componentes.

La fuente de verdad del contenido está en `src/content/`. Las imágenes van en `public/images/`.

Tras cambiar contenido, hace falta un build (`npm run build`) o un push a `main` (GitHub Actions publica el sitio).

---

## Estructura rápida

| Qué | Dónde |
|-----|--------|
| Bio, contacto, redes | `src/content/site/settings.yaml` |
| Series | `src/content/series/<slug>.md` |
| Obras | `src/content/works/<slug-serie>/<slug-obra>.md` |
| Exhibiciones | `src/content/exhibitions/<slug>.md` |
| Imágenes | `public/images/...` |
| Plantillas | `src/content/_templates/` |

El **slug** es el nombre del archivo o carpeta (sin espacios, preferible `snake_case` o `kebab-case`). Ejemplo: serie `naturaleza_zen` → archivo `series/naturaleza_zen.md` y carpeta `works/naturaleza_zen/`.

---

## Agregar una serie nueva

1. Copiá `src/content/_templates/series.md` a `src/content/series/<slug>.md`.
2. Creá la carpeta `src/content/works/<slug>/`.
3. Copiá al menos una obra desde `src/content/_templates/work.md` dentro de esa carpeta.
4. Subí las imágenes a `public/images/series/<slug>/`.
5. Completá el frontmatter (entre `---`):
   - `title`, `dateRange`, `technique`, `worksSummary`
   - `cover`: ruta tipo `/images/series/<slug>/portada.jpg`
   - `order`: número (menor = aparece antes en el home)
   - `draft: false` para publicar (`true` la oculta)
   - `description`: texto corto para SEO
6. Escribí la ficha de la serie debajo del segundo `---`.
7. Push a `main` o corré `npm run build` localmente para validar.

Si falta un campo obligatorio, el build **falla** con un mensaje de error (es intencional).

---

## Agregar una obra

1. Abrí la carpeta `src/content/works/<slug-serie>/`.
2. Copiá `_templates/work.md` como `<slug-obra>.md`.
3. Completá `title`, `technique`, `year`, `image`, `orientation` (`portrait` o `landscape`), `order`.
4. Poné la imagen en `public/images/...` y usá esa ruta en `image`.
5. Escribí la descripción debajo del frontmatter.

La obra pertenece a la serie por el **nombre de la carpeta padre**.

---

## Agregar una exhibición

1. Copiá `src/content/_templates/exhibition.md` a `src/content/exhibitions/<slug>.md`.
2. Completá `title`, `thumb`, `fullImage`, `order`.
3. Subí el flyer a `public/images/exhibiciones/`.

En el home, al hacer clic se abre el lightbox con `fullImage`.

---

## Editar bio o contacto

Editá `src/content/site/settings.yaml`. No hace falta tocar HTML.

---

## Consejos para nombres de archivo

- Evitá espacios y tildes en nombres de imagen cuando puedas (`rey_coco.jpg` es más robusto que `Rey Coco.jpg`).
- Si ya existen archivos con espacios, la ruta en el Markdown debe coincidir exactamente.

---

## Publicar

1. Guardá los cambios.
2. `npm run build` (opcional, para validar en tu PC).
3. Commit + push a `main`.
4. GitHub Actions construye y publica en Pages (`alitai.com.ar`).

Si el Action falla, leé el log: casi siempre es un campo faltante en el frontmatter o una ruta de imagen incorrecta.
