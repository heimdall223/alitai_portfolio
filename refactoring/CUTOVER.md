# Cutover a GitHub Pages (Actions)

## Qué cambió

- El sitio ya no se sirve desde HTML en la raíz del repo.
- `npm run build` genera `dist/` (incluye `CNAME` → `alitai.com.ar`).
- El workflow [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) publica `dist/` en Pages.

## Pasos en GitHub (una sola vez)

1. Repo → **Settings** → **Pages**.
2. **Build and deployment** → Source: **GitHub Actions** (dejar de usar “Deploy from a branch”).
3. Merge/push a `main` o lanzar el workflow manualmente (**Actions** → Deploy to GitHub Pages → Run workflow).
4. Verificar `https://www.alitai.com.ar` y el certificado HTTPS del dominio custom.

## Rollback

1. Pages → Source: **Deploy from a branch** (p. ej. `main` / root), solo si restaurás el HTML legacy.
2. El HTML anterior está en [`legacy/`](legacy/) por si hace falta recuperar copy o comparar.

## Redirects legacy

Archivos en `public/` (`arquetipos.html`, `arquetipos/index.html`, etc.) redirigen a `/series/<slug>/`.
