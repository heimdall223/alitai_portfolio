# Alitai Portfolio

Sitio estático del portfolio de **Alicia Isabel Tocino (@Alitai)**.

- **Stack:** Astro + Content Collections + Tailwind (build) + Swiper
- **Hosting:** GitHub Pages
- **URL:** https://alitai.com.ar
- **Contenido:** `src/content/` — ver [CONTENT.md](CONTENT.md)
- **Deploy / DNS:** [refactoring/CUTOVER.md](refactoring/CUTOVER.md)

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

Push a `main` dispara `.github/workflows/deploy.yml`. Pages → Source: **GitHub Actions**.
