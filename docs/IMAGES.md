# Guía de imágenes — Portfolio Alitai

Optimizá **antes** de subir a `public/images/`. El sitio sirve los archivos tal cual (sin pipeline WebP automático): si cada imagen cumple esta guía, la web se mantiene rápida sin trabajo extra en el build.

Usá esta checklist cada vez que agregues o reemplaces una foto.

---

## Reglas generales

1. **Exportá una copia “para web”** — no subas TIFF, RAW ni el archivo maestro de Photoshop/Lightroom.
2. **Formato preferido:** JPG (calidad ~70–80). WebP manual también vale si sabés generarlo. Evitá PNG en fotos y flyers (suelen pesar de más); PNG solo para iconos con transparencia.
3. **Espacio de color:** sRGB.
4. **Nombres de archivo:**
   - `snake_case` o `kebab-case`
   - Sin espacios ni tildes: `rey_coco.jpg`, no `Rey Coco.jpg` ni `La_señal.jpg`
   - Minúsculas preferibles
5. **Carpeta correcta** según el uso (ver tabla abajo).
6. Tras colocar el archivo, la ruta en el Markdown/YAML debe coincidir **exactamente** (incluidas mayúsculas si el archivo las tiene).

### Herramientas sugeridas

- [Squoosh](https://squoosh.app/) (navegador)
- Photoshop / Affinity: “Exportar para web” / Export
- ImageMagick, Sharp CLI, o el exportador de tu cámara/móvil en “alta calidad web”

---

## Requisitos por tipo de imagen

| Uso | Carpeta típica | Formato | Lado largo orientativo | Peso máximo sugerido | Notas |
|-----|----------------|---------|------------------------|----------------------|--------|
| **Retrato / hero** (portada) | `public/images/sobre_mi/` | JPG | 1920–2400 px | 300–400 KB | Se usa a pantalla completa (`object-cover`). Mejor vertical u orientación del retrato actual. |
| **Cover de serie** (grid “Trabajos”) | `public/images/series/<slug>/` | JPG | 1200–1600 px | 150–250 KB | Se recorta a ~4:3. Encadrá el motivo al centro. |
| **Obra vertical** (`orientation: portrait`) | `public/images/series/<slug>/` | JPG | alto ~1200–1600 px | 200–300 KB | Carrusel: contenedor angosto. |
| **Obra horizontal** (`orientation: landscape`) | `public/images/series/<slug>/` | JPG | ancho ~1600–2000 px | 250–350 KB | Carrusel: contenedor más ancho. |
| **Flyer exhibición (thumb)** | `public/images/exhibiciones/` | JPG | ~1200 px | ≤ 150 KB | Grid del home. |
| **Flyer exhibición (ampliado)** | misma carpeta o el mismo archivo | JPG | ≤ 2000 px | ≤ 400 KB | Lightbox. Si thumb y full son el mismo archivo, cumplí el más estricto de los dos pesos o generá dos versiones. |
| **Iconos de redes** | `public/images/icons/` | PNG o SVG | 64–128 px | ≤ 10 KB | Ya existen; no hace falta tocarlos habitualmente. |

Si una misma foto es **cover** y **obra**, exportá una sola versión que respete el peso más bajo razonable (p. ej. ≤ 250 KB) y el lado largo adecuado para el uso más exigente.

---

## Checklist rápido (copiar al preparar un lote)

- [ ] Formato JPG (o WebP), no TIFF/RAW/PNG fotográfico enorme
- [ ] Lado largo dentro de la tabla
- [ ] Peso bajo el máximo de su tipo
- [ ] Nombre sin espacios ni tildes
- [ ] Archivo en la carpeta correcta bajo `public/images/`
- [ ] Ruta actualizada en `settings.yaml` / frontmatter del `.md`
- [ ] Si es obra: `orientation` (`portrait` | `landscape`) coherente con la foto

---

## Dónde se usan en el sitio

| Tipo | Referencia en contenido |
|------|-------------------------|
| Hero | `src/content/site/settings.yaml` → `portrait` |
| Cover serie | `src/content/series/<slug>.md` → `cover` |
| Obra | `src/content/works/<serie>/<obra>.md` → `image` + `orientation` |
| Exhibición | `src/content/exhibitions/<slug>.md` → `thumb`, `fullImage` |

Flujo completo de textos: [CONTENT.md](CONTENT.md).

---

## Qué no hace falta (por ahora)

El build de Astro **no** convierte a WebP ni genera `srcset`. No hace falta preparar varios tamaños salvo que quieras una versión thumb y otra full para flyers muy pesados.

Si en el futuro se agrega un pipeline automático de imágenes, esta guía puede relajarse; hasta entonces, **esta checklist es la optimización**.

---

## Ejemplo de nombres buenos

```text
public/images/sobre_mi/alitai_retrato.jpg
public/images/series/arquetipos/cover_mosaico.jpg
public/images/series/arquetipos/freud.jpg
public/images/series/reflejos_de_agua/velero_lunar.jpg
public/images/exhibiciones/flyer_bienal_mdp.jpg
```

Ejemplos a evitar: `Foto final (2).JPG`, `Ciruelo - El Iluminado.jpg`, `La_señal.jpg` (tilde).
