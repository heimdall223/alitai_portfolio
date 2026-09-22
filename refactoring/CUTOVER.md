# Cutover a GitHub Pages (Actions)

## Estado actual (dominio custom activo)

- URL canónica: `https://alitai.com.ar`
- En `astro.config.mjs`: `site: 'https://alitai.com.ar'` + `base: '/'`
- `public/CNAME` = `alitai.com.ar`

La URL `https://heimdall223.github.io/alitai_portfolio/` puede verse sin estilos: es normal con `base: '/'` (los assets no usan el prefijo del repo). Preferí el dominio custom.

## Deploy

1. Repo → **Settings** → **Pages** → Source: **GitHub Actions**
2. Custom domain: `alitai.com.ar` + Enforce HTTPS cuando el certificado esté listo
3. Push a `main` → workflow **Deploy to GitHub Pages**

## Si el dominio muestra texto sin CSS

Causa típica: el build se publicó con `base: '/alitai_portfolio/'` mientras el dominio sirve en la raíz. Solución: `base: '/'`, `site: 'https://alitai.com.ar'`, redeploy.

## DNS (referencia)

Apex `alitai.com.ar` → registros **A** a las IPs de GitHub Pages (ver [docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)).

Opcional `www` → CNAME a `heimdall223.github.io`.

## Rollback

HTML anterior en [`legacy/`](legacy/). Copia de respaldo del CNAME: [`CNAME.pending`](CNAME.pending).

## Redirects legacy

`public/*.html` y `public/<slug>/` redirigen a `/series/<slug>/`.
