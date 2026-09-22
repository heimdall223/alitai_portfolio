# Alitai Portfolio

Sitio estático del portfolio de **Alicia Isabel Tocino (@Alitai)**.

- **Stack:** Astro + Content Collections + Tailwind (build) + Swiper
- **Hosting:** GitHub Pages
- **URL:** https://alitai.com.ar

## Documentación

Toda la documentación de mantenimiento vive en [`docs/`](docs/README.md).

| Guía | Descripción |
|------|-------------|
| [docs/DOCUMENTACION.md](docs/DOCUMENTACION.md) | Arquitectura, diseño, decisiones y mantenimiento |
| [docs/CONTENT.md](docs/CONTENT.md) | Cómo agregar/editar series, obras y exhibiciones |
| [docs/IMAGES.md](docs/IMAGES.md) | Formato, tamaño y peso de imágenes antes de subir |
| [docs/refactoring/CUTOVER.md](docs/refactoring/CUTOVER.md) | Deploy Pages, DNS, HTTPS, CNAME |

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
