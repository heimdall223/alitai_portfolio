# Alitai Portfolio

Sitio estático del portfolio de **Alicia Isabel Tocino (@Alitai)**.

- **Stack:** Astro + Content Collections + Tailwind (build) + Swiper
- **Hosting:** GitHub Pages
- **URL actual:** https://heimdall223.github.io/alitai_portfolio/
- **Dominio custom:** `alitai.com.ar` (pendiente de DNS — ver [refactoring/CUTOVER.md](refactoring/CUTOVER.md))
- **Contenido:** `src/content/` — ver [CONTENT.md](CONTENT.md)

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí la URL local (p. ej. `http://localhost:4321/alitai_portfolio/`).

```bash
npm run build
npm run preview
```

Requisitos: Node.js >= 22.12

## Deploy

Push a `main` dispara `.github/workflows/deploy.yml`. En GitHub → Settings → Pages, la fuente debe ser **GitHub Actions**. No configures custom domain hasta que el DNS esté correcto.
