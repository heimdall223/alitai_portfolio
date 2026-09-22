# Plan UI/UX — Alitai Portfolio (luz / papel)

Documento operativo del rediseño visual. El content model Astro y el hosting Pages no cambian.

## Decisiones

| Tema | Elección |
|------|----------|
| Alcance | Home + plantilla de serie + componentes compartidos |
| Dirección | Luz / papel |
| Display | Cormorant Garamond |
| UI / cuerpo | DM Sans |
| Acento | Agua / reflejo `#3A6B78` |

## Tokens

- `--color-paper`: `#F7F7F5`
- `--color-ink`: `#1C1B1A`
- `--color-ink-muted`: `#5C5A57`
- `--color-line`: `#E4E2DC`
- `--color-accent`: `#3A6B78`
- `--color-accent-soft`: `#E8F0F2`

Evitar: indigo Tailwind, purple, cream AI `#F4F1EA`, cards con sombra genérica, pills decorativos.

## Composición

1. **Hero home:** full-bleed con retrato; marca `@ALITAI_arte` como señal dominante; rol + CTA “Ver trabajos”.
2. **Bio / trabajos / exhibiciones:** una job por sección; grids tipográficos sin cajas grises con sombra.
3. **Serie:** título display, ficha meta discreta, texto editorial, obra protagonista en carrusel.

## Motion

- Entrada suave del texto del hero
- Hover sutil en thumbs (opacidad / scale)
- Transición de lightbox
- `prefers-reduced-motion` respetado

## Criterios de hecho

- [x] Brand test en primer viewport
- [x] Homogeneidad home / serie
- [x] Sin cards-sombra default
- [x] Build OK

## Fase 1.5 (posterior)

WebP/AVIF, srcset, reducción de peso en `public/images/`.
