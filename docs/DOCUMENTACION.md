# DOCUMENTACION — Portfolio Alitai

Documentación clave de mantenimiento del sitio **alitai.com.ar** (portfolio de Alicia Isabel Tocino / @Alitai / @ALITAI_arte).

Última actualización alineada al estado del repo tras: migración a Astro (estructura), cutover a GitHub Pages Actions, rediseño UI/UX “luz / papel”, y ajustes de `base` para dominio custom.

---

## Índice

1. [Visión y propósito](#1-visión-y-propósito)
2. [Mapa del sistema](#2-mapa-del-sistema)
3. [Arquitectura](#3-arquitectura)
4. [Árbol del repositorio](#4-árbol-del-repositorio)
5. [Modelo de contenido](#5-modelo-de-contenido)
6. [Diseño visual (UI/UX)](#6-diseño-visual-uiux)
7. [Capas técnicas y stack](#7-capas-técnicas-y-stack)
8. [Rutas y URLs](#8-rutas-y-urls)
9. [Build, deploy y dominio](#9-build-deploy-y-dominio)
10. [Decisiones de diseño](#10-decisiones-de-diseño)
11. [Decisiones técnicas / tecnológicas](#11-decisiones-técnicas--tecnológicas)
12. [Operación diaria](#12-operación-diaria)
13. [Seguridad (estado actual)](#13-seguridad-estado-actual)
14. [Troubleshooting](#14-troubleshooting)
15. [Deuda y roadmap](#15-deuda-y-roadmap)
16. [Referencias internas](#16-referencias-internas)

---

## 1. Visión y propósito

### Qué es
Sitio **brochure / portfolio artístico** multipágina, generado de forma **estática**. No hay base de datos, CMS en producción ni backend propio. El visitante recibe HTML/CSS/JS e imágenes desde GitHub Pages.

### Objetivos de producto
- Mostrar la obra (series y piezas) con foco editorial.
- Presentar bio, contacto y exhibiciones.
- Permitir ampliar contenido (series, obras, exhibiciones) **sin reescribir layouts**.
- Mantener hosting en **GitHub Pages** + dominio **alitai.com.ar**.

### Objetivos de ingeniería
- Separar **contenido** (Markdown/YAML) de **presentación** (Astro/CSS).
- Validar el contenido en el **build** (schemas Zod) para no publicar sitios rotos.
- Identidad visual homogénea en home y páginas de serie.

---

## 2. Mapa del sistema

### Flujo de datos (conceptual)

```text
Editor (humano)
  │
  ├─ edita src/content/**  (YAML / Markdown)
  └─ coloca imágenes en public/images/**
  │
  ▼
npm run build  /  GitHub Actions
  │
  ├─ Content Collections + Zod (validación)
  ├─ Astro genera páginas desde layouts/components
  ├─ Tailwind compila CSS (purge)
  └─ salida: dist/
  │
  ▼
GitHub Pages
  │
  └─ https://alitai.com.ar  (+ CNAME)
```

### Mapa de páginas (usuario)

```text
/                          Home
├─ Hero (marca + retrato)
├─ Sobre mí + contacto
├─ Trabajos → links a series
└─ Exhibiciones → lightbox

/series/<slug>/            Página de una serie
├─ Título + meta (fecha, técnica, obras)
├─ Texto de ficha
└─ Carrusel de obras (Swiper)

/404                       Página no encontrada

/<slug-serie>.html         Redirect legacy → /series/<slug>/
/<slug-serie>/             Redirect legacy → /series/<slug>/
```

### Mapa de dependencias de componentes

```text
BaseLayout
  ├─ global.css (tokens, motion, lightbox/swiper chrome)
  ├─ Google Fonts (Cormorant Garamond, DM Sans)
  ├─ GTM + SEO/OG
  └─ slot → páginas

index.astro
  ├─ SeriesCard
  ├─ ExhibitionCard
  ├─ SocialLinks
  ├─ Lightbox
  └─ BackToTop

series/[slug].astro
  └─ WorkCarousel (Swiper + render Markdown de obras)
```

---

## 3. Arquitectura

### Estilo arquitectónico
**Static Site Generation (SSG)** con Astro (`output: static` implícito). No hay runtime de servidor de aplicación.

Patrones aplicados:
- **Content as data:** el copy vive en collections, no en componentes.
- **Plantillas únicas:** una home, una ruta dinámica de serie.
- **Composición sobre herencia:** piezas UI pequeñas (`SeriesCard`, `Lightbox`, etc.).
- **Fail fast en build:** schema Zod → error de CI si falta un campo.

### Separación de responsabilidades

| Capa | Responsabilidad | Ubicación |
|------|-----------------|-----------|
| Contenido | Textos, meta, orden, drafts | `src/content/` |
| Validación | Tipos y campos obligatorios | `src/content.config.ts` |
| Acceso a datos | Queries ordenadas / filtros | `src/lib/content.ts` |
| Paths públicos | Prefijo `base` de Astro | `src/lib/paths.ts` (`withBase`) |
| Presentación | HTML semántico + clases | `src/pages/`, `src/components/`, `src/layouts/` |
| Estilos globales | Tokens, motion, a11y motion | `src/styles/global.css` |
| Assets estáticos | Imágenes, CNAME, robots, favicon | `public/` |
| CI/CD | Build + publicación Pages | `.github/workflows/deploy.yml` |

### Por qué no SPA / CMS / backend
- El tráfico y el modelo editorial no requieren app dinámica.
- Menos superficie de ataque y menos costo operativo.
- GitHub Pages + Actions cubren hosting y deploy.
- Un CMS visual (panel con login) se dejó **fuera de alcance** a propósito: aumenta hardening (auth, uploads, tokens). El modelo por archivos + [`CONTENT.md`](CONTENT.md) cubre edición técnica y, con guía, edición por la artista.

---

## 4. Árbol del repositorio

```text
alitai_portfolio/
├── README.md                 ← puerta de entrada del repo
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── .gitignore
├── .github/workflows/deploy.yml
├── docs/
│   ├── DOCUMENTACION.md      ← este archivo
│   ├── CONTENT.md            ← guía corta para editar contenido
│   ├── IMAGES.md             ← requisitos de imágenes
│   └── refactoring/
│       ├── refactor_plan.md
│       ├── ui_ux_plan.md
│       ├── CUTOVER.md
│       ├── CNAME.pending
│       └── legacy/           ← HTML pre-Astro (archivo)
├── public/
│   ├── CNAME                 ← alitai.com.ar
│   ├── robots.txt
│   ├── favicon.svg / .ico
│   ├── images/               ← fotos, flyers, iconos
│   └── <serie>.html + <serie>/  ← redirects legacy
├── src/
│   ├── content.config.ts     ← schemas Zod + loaders
│   ├── content/
│   │   ├── site/settings.yaml
│   │   ├── series/*.md
│   │   ├── works/<serie>/*.md
│   │   ├── exhibitions/*.md
│   │   └── _templates/       ← plantillas para copiar
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   └── series/[slug].astro
│   ├── components/           ← UI reutilizable
│   ├── lib/content.ts, paths.ts
│   └── styles/global.css
└── scripts/
    └── write-legacy-redirects.mjs
```

`dist/` y `node_modules/` se generan localmente / en CI; no son fuente de verdad.

---

## 5. Modelo de contenido

Definido en [`src/content.config.ts`](../src/content.config.ts). Guía operativa: [`CONTENT.md`](CONTENT.md).

### Collection `site`
Archivo: `src/content/site/settings.yaml`  
Fuente única de bio, handle, nombre, rol, retrato, contacto, redes, GTM, verification, copyright, description SEO.

### Collection `series`
Archivos: `src/content/series/<slug>.md`

| Campo | Rol |
|-------|-----|
| `title` | Título visible |
| `subtitle` | Opcional |
| `dateRange` | Meta ficha |
| `technique` | Meta ficha |
| `worksSummary` | Resumen de cantidad/tipo de obras |
| `cover` | Thumb en el home (`/images/...`) |
| `order` | Orden en el grid (menor = primero) |
| `draft` | `true` oculta la serie |
| `description` | SEO / Open Graph |
| Body (Markdown) | Texto largo de la ficha |

### Collection `works`
Archivos: `src/content/works/<series-slug>/<work-slug>.md`  
La serie se deduce del **segmento de carpeta** (`works/arquetipos/freud.md` → serie `arquetipos`).

| Campo | Rol |
|-------|-----|
| `title` | Título de la obra |
| `technique` | Técnica / medidas |
| `year` | Año |
| `image` | Ruta pública de la imagen |
| `orientation` | `portrait` \| `landscape` (layout del slide) |
| `order` | Orden en el carrusel |
| Body | Descripción |

### Collection `exhibitions`
Archivos: `src/content/exhibitions/<slug>.md`

| Campo | Rol |
|-------|-----|
| `title` | Título en el grid |
| `thumb` | Miniatura |
| `fullImage` | Imagen del lightbox |
| `order` | Orden en el home |
| `year` | Opcional |

### Relación serie ↔ obras

```text
src/content/series/arquetipos.md
src/content/works/arquetipos/*.md     ← mismo slug de carpeta
public/images/series/arquetipos/*     ← assets
```

Si el slug de la serie y el nombre de la carpeta `works/` no coinciden, las obras no aparecen en esa página.

### Plantillas
`src/content/_templates/` — copiar/pegar para no inventar frontmatter. No forman parte de las collections publicadas (viven fuera de `series/`, `works/`, `exhibitions/`).

---

## 6. Diseño visual (UI/UX)

Dirección: **luz / papel**. Detalle operativo también en [`refactoring/ui_ux_plan.md`](refactoring/ui_ux_plan.md).

### Conceptos de diseño
- **Brand first:** en el primer viewport la marca (`@ALITAI_arte`) es la señal dominante, no un título genérico.
- **Una job por sección:** bio, trabajos, exhibiciones — sin mezclar agendas.
- **La obra gana:** grids sin cards con sombra que compitan con la pintura; tipografía + imagen + hover sutil.
- **Homogeneidad:** mismos tokens, tipografías y ritmo en home y plantilla de serie.
- **Hero full-bleed:** retrato edge-to-edge con overlay para legibilidad del texto claro.

### Tipografía
| Rol | Familia | Uso |
|-----|---------|-----|
| Display | Cormorant Garamond | Marca, títulos de sección/serie/obra |
| UI / cuerpo | DM Sans | Bio, meta, botones, párrafos |

Carga: Google Fonts con `preconnect` en `BaseLayout.astro`.

### Tokens de color (`src/styles/global.css` → `@theme`)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-paper` | `#F7F7F5` | Fondo |
| `--color-ink` | `#1C1B1A` | Texto principal |
| `--color-ink-muted` | `#5C5A57` | Texto secundario |
| `--color-line` | `#E4E2DC` | Separadores |
| `--color-accent` | `#3A6B78` | Links, CTA sutil, Swiper |
| `--color-accent-soft` | `#E8F0F2` | Fondos suaves / thumbs |

**Evitar conscientemente:** indigo Tailwind, purple “AI default”, cream `#F4F1EA` tipo plantilla, pills decorativos, multi-shadow.

Clases Tailwind derivadas: `bg-paper`, `text-ink`, `text-ink-muted`, `border-line`, `text-accent`, `bg-accent-soft`, `font-display`, `font-sans`.

### Motion
1. Entrada del texto del hero (`.hero-animate*`).
2. Hover en thumbs (scale ~1.03 / opacidad).
3. Transición del lightbox.

`prefers-reduced-motion: reduce` desactiva / atenúa animaciones.

### Componentes visuales clave

| Componente | Rol visual |
|------------|------------|
| `SeriesCard` | Imagen + título display; borde inferior; sin card-shadow |
| `ExhibitionCard` | Igual lógica; abre lightbox |
| `WorkCarousel` | Obra centrada; caption editorial; controles accent |
| `SocialLinks` | Iconos alineados, sin pastilla blur genérica |
| `BackToTop` | Botón flat paper/ink, no FAB indigo |
| `Lightbox` | `<dialog>` nativo; Escape / backdrop / botón cerrar |

---

## 7. Capas técnicas y stack

### Runtime de desarrollo / CI
- **Node.js** `>= 22.12` (ver `package.json` → `engines`)
- **npm** (`npm ci` en Actions)

### Framework y libs

| Pieza | Versión (aprox. repo) | Para qué |
|-------|----------------------|----------|
| Astro | ^7.x | SSG, routing, content layer |
| `@astrojs/sitemap` | ^3.x | `sitemap-index.xml` en build |
| Tailwind CSS | ^4.x + `@tailwindcss/vite` | Utilidades + `@theme` |
| Swiper | ^14.x | Carrusel de obras |
| Zod (vía Astro) | schemas de collections | Validación |

### Config crítica — `astro.config.mjs`

```js
site: 'https://alitai.com.ar',
base: '/',
```

**Regla de oro:** con dominio custom en la **raíz**, `base` debe ser `'/'`.  
Si se pone `base: '/alitai_portfolio/'`, en `alitai.com.ar` se ven textos **sin CSS/imágenes** (los assets se piden bajo `/alitai_portfolio/...`).  
La URL `https://heimdall223.github.io/alitai_portfolio/` puede verse mal con `base: '/'`; la canónica es el dominio.

`withBase()` en `src/lib/paths.ts` prepara paths por si algún día cambia `base`.

### Analytics / SEO
- Google Tag Manager (`gtmId` en settings).
- Meta description, canonical, Open Graph, Twitter cards en `BaseLayout`.
- `google-site-verification` opcional en settings.
- `public/robots.txt` apunta al sitemap generado.
- Favicon en `public/`.

---

## 8. Rutas y URLs

| URL | Origen |
|-----|--------|
| `/` | `src/pages/index.astro` |
| `/series/<slug>/` | `src/pages/series/[slug].astro` (slug = id de collection series) |
| `/404` | `src/pages/404.astro` |
| `/arquetipos.html`, `/arquetipos/`, etc. | Stubs en `public/` → redirect a `/series/...` |

Series publicadas actuales (contenido): `arquetipos`, `naturaleza_zen`, `adn_estelar`, `reflejos_de_agua`, `hacia_la_luz`.

Regenerar redirects legacy:

```bash
node scripts/write-legacy-redirects.mjs
```

El script usa `BASE = ''` (raíz del dominio). Si se vuelve a un project URL con prefijo, hay que ajustar `BASE` ahí.

---

## 9. Build, deploy y dominio

### Local

```bash
npm install
npm run dev      # desarrollo
npm run build    # genera dist/
npm run preview  # sirve dist/
```

### CI — `.github/workflows/deploy.yml`
- Trigger: `push` a `main` + `workflow_dispatch`.
- Permisos: `contents: read`, `pages: write`, `id-token: write` (OIDC, sin secret de deploy inventado).
- Steps: checkout → Node 22 → `npm ci` → `npm run build` → upload `dist` → `deploy-pages`.
- Environment: `github-pages`.

### Dominio
- `public/CNAME` = `alitai.com.ar`
- DNS del registrador: registros **A** del apex a IPs de GitHub Pages (ver docs oficiales actuales).
- **Enforce HTTPS** en Settings → Pages solo cuando GitHub valide el dominio (si dice “Unavailable… domain not properly configured”, es DNS/certificado, no Astro). Detalle en [`refactoring/CUTOVER.md`](refactoring/CUTOVER.md).

### Orden mental al publicar
1. Cambiar contenido o código.
2. (Opcional) `npm run build` local.
3. Commit + push a `main`.
4. Action verde.
5. Hard refresh en el dominio.

---

## 10. Decisiones de diseño

| Decisión | Elección | Por qué |
|----------|----------|---------|
| Dirección visual | Luz / papel | Legible, editorial, encaja con obra pictórica sin “galería dark” por defecto |
| Marca en hero | Full-bleed + tipografía display grande | Brand test: el sitio debe ser reconocible como Alitai sin nav |
| Sin cards-sombra | Grids tipográficos | Las cards genéricas competían con la pintura |
| Acento agua `#3A6B78` | En lugar de indigo | Coherencia con series (reflejos, luz); evita look Tailwind default |
| Tipografías expresivas | Cormorant + DM Sans | Evitar Inter/system como identidad |
| Homogeneidad home/serie | Mismos tokens | Un solo idioma visual en todo el sitio |
| Motion contenido | 2–3 gestos + reduced-motion | Presencia sin ruido |
| CMS visual | No (aún) | Menos auth/hardening; archivos + guía bastan |

---

## 11. Decisiones técnicas / tecnológicas

| Decisión | Elección | Trade-off |
|----------|----------|-----------|
| SSG | Astro | Excelente content layer y estáticos; curva Node/build vs HTML crudo |
| Contenido | Markdown + YAML + Zod | Escalable y validado; la artista debe seguir plantillas o contar con ayuda técnica |
| Estilos | Tailwind 4 (Vite plugin), no CDN Play | CSS purged y predecible; no compilar Tailwind en el browser del visitante |
| Hosting | GitHub Pages + Actions | Mismo proveedor que antes; requiere Node en CI y Settings → Actions |
| Carrusel | Swiper | UX de series conocida; dependencia extra en cliente en páginas de serie |
| Imágenes v1 | `public/images` sin pipeline WebP | Simple; peso alto (~12 MB histórico) → deuda fase 1.5 |
| `base` | `/` + dominio custom | Correcto para `alitai.com.ar`; project URL `github.io/repo` no es canónica |
| Legacy HTML | `docs/refactoring/legacy/` | Rollback/consulta; no se publica como fuente de verdad |
| Analytics | GTM embebido | Continuidad con el sitio anterior |

### Anti-patrones descartados
- Tailwind Play CDN en producción.
- Duplicar HTML completo por cada serie.
- SPA innecesaria para un brochure.
- `base: '/alitai_portfolio/'` mientras el dominio custom sirve en raíz.

---

## 12. Operación diaria

### Cambiar bio / teléfono / redes
Editar `src/content/site/settings.yaml` → push a `main`.

### Nueva serie / obra / exhibición
Seguir [`CONTENT.md`](CONTENT.md) (plantillas en `_templates/`).

### Cambiar look (colores, tipografía)
1. Tokens y motion: `src/styles/global.css`
2. Fuentes / head: `src/layouts/BaseLayout.astro`
3. Estructura de secciones: `src/pages/*.astro` y `src/components/*`

### No editar para contenido rutinario
- No hace falta tocar `deploy.yml` ni `astro.config.mjs` para sumar una obra.
- No reintroducir páginas HTML sueltas en la raíz como fuente de contenido.

---

## 13. Seguridad (estado actual)

Superficie pequeña (sitio estático). Prioridades típicas en GitHub:

- 2FA en la cuenta.
- Pocos colaboradores en el repo.
- Branch protection en `main` (al menos: status checks del build; sin force push/delete).
- Actions: default token **read**; el workflow pide `pages`/`id-token` explícitos.
- Aprobación de workflows en PRs de forks (contribuidores externos).
- Allowlist de actions (`actions/*`) o política consciente; no “solo org” (rompería `actions/checkout`).
- No commitear secretos; `.env` ignorado.
- HTTPS en el dominio cuando GitHub lo habilite.
- Datos de contacto en el sitio son **públicos a propósito**.

Un CMS visual futuro implicaría auth, uploads y más hardening.

---

## 14. Troubleshooting

| Síntoma | Causa probable | Qué revisar |
|---------|----------------|-------------|
| Solo textos, sin CSS/imágenes en el dominio | `base` con prefijo `/alitai_portfolio/` o deploy viejo | `astro.config.mjs` → `base: '/'`; Action verde; hard refresh |
| Build falla en Zod | Frontmatter incompleto | Mensaje de Astro/Zod; comparar con `_templates/` |
| Serie sin obras | Carpeta `works/<slug>` ≠ id de la serie | Nombres de carpetas |
| Action rojo | Node/`npm ci`/build | Log de Actions |
| Enforce HTTPS gris | DNS/certificado Pages | A records, CAA, proxy CDN; `CUTOVER.md` |
| `github.io/.../alitai_portfolio` feo | Esperado con `base: '/'` | Usar `alitai.com.ar` |

---

## 15. Deuda y roadmap

### Hecho
- SSG Astro + content collections.
- Deploy Actions + dominio.
- UI luz/papel homogénea.
- Guía de contenido y plantillas.

### Pendiente recomendado (fase 1.5)
- Optimización **manual** de imágenes nuevas: seguir [`IMAGES.md`](IMAGES.md) (sin pipeline en el build).
- Revisar/renombrar archivos históricos con espacios o tildes en `public/images` cuando se toquen.
- (Opcional a futuro) pipeline WebP/`srcset` en Astro si el volumen o el peso lo justifican.

### Futuro opcional
- CMS visual git-based (Decap/Sveltia/Tina) **con** plan de seguridad.
- Headers CSP / mejoras a11y adicionales.
- `www` vs apex unificado del todo en DNS + redirects.

---

## 16. Referencias internas

| Documento | Para qué |
|-----------|----------|
| [`CONTENT.md`](CONTENT.md) | Cómo editar contenido día a día |
| [`IMAGES.md`](IMAGES.md) | Formato, tamaño y peso de imágenes antes de subir |
| [`../README.md`](../README.md) | Arranque rápido del repo |
| [`refactoring/refactor_plan.md`](refactoring/refactor_plan.md) | Plan de migración estructural |
| [`refactoring/ui_ux_plan.md`](refactoring/ui_ux_plan.md) | Sistema visual resumido |
| [`refactoring/CUTOVER.md`](refactoring/CUTOVER.md) | Pages, DNS, HTTPS, CNAME |
| [`refactoring/legacy/`](refactoring/legacy/) | HTML histórico pre-Astro |

---

*Documento vivo: actualizar esta guía cuando cambien `base`/`site`, el modelo de contenido, el diseño de tokens o el flujo de deploy.*
