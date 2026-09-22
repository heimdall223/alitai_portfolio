# Alitai Portfolio

Sitio estático del portfolio de **Alicia Isabel Tocino (@Alitai)**.

- **Stack:** Astro + Content Collections + Tailwind (build) + Swiper
- **Hosting:** GitHub Pages (`alitai.com.ar`)
- **Contenido:** archivos en `src/content/` — ver [CONTENT.md](CONTENT.md)
- **Plan de refactor:** [refactoring/refactor_plan.md](refactoring/refactor_plan.md)

## Desarrollo local

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

Requisitos: Node.js >= 22.12

## Deploy

Push a `main` dispara `.github/workflows/deploy.yml`. En GitHub → Settings → Pages, la fuente debe ser **GitHub Actions**.
