# Cutover a GitHub Pages (Actions)

## Estado actual (dominio custom activo)

- URL canónica: `https://alitai.com.ar`
- En `astro.config.mjs`: `site: 'https://alitai.com.ar'` + `base: '/'`
- `public/CNAME` = `alitai.com.ar`

La URL `https://heimdall223.github.io/alitai_portfolio/` puede verse sin estilos: es normal con `base: '/'` (los assets no usan el prefijo del repo). Preferí el dominio custom.

## Deploy

1. Repo → **Settings** → **Pages** → Source: **GitHub Actions**
2. Custom domain: `alitai.com.ar`
3. Push a `main` → workflow **Deploy to GitHub Pages**

## Si el dominio muestra texto sin CSS

Causa típica: el build se publicó con `base: '/alitai_portfolio/'` mientras el dominio sirve en la raíz. Solución: `base: '/'`, `site: 'https://alitai.com.ar'`, redeploy.

## DNS y HTTPS (Cloudflare delante de Pages)

**Decisión vigente:** el apex usa **Cloudflare** (NS `*.ns.cloudflare.com`) con **proxy activo** (nube naranja). En DNS público el dominio resuelve a IPs de Cloudflare, no a las A/AAAA de GitHub Pages.

| Capa | Rol |
|------|-----|
| Cloudflare (edge) | TLS hacia el visitante, caché/CDN, redirect HTTP→HTTPS |
| GitHub Pages | Origen estático (`CNAME` / deploy Actions) |

### Enforce HTTPS en GitHub

En Settings → Pages puede aparecer:

> Enforce HTTPS — Unavailable for your site because your domain is not properly configured to support HTTPS (`alitai.com.ar`)

**Es esperado** con proxy naranja. GitHub solo emite su certificado Let’s Encrypt (y habilita ese checkbox) si el apex resuelve a *sus* IPs. Con Cloudflare delante, el HTTPS lo termina Cloudflare; el sitio sigue siendo seguro si SSL/TLS está bien configurado allí.

Checklist Cloudflare (mantener así):

- SSL/TLS: **Full (strict)** preferible; como mínimo **Full** (evitar Flexible).
- **Always Use HTTPS** activado.

### Alternativa (si algún día se quiere el checkbox de GitHub)

1. En Cloudflare: registros del apex en **DNS only** (nube gris), o sacar el proxy.
2. Apex → registros **A** (y opcionalmente **AAAA**) a las IPs actuales de [GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
3. Opcional `www` → CNAME a `heimdall223.github.io` (también DNS only).
4. Esperar validación en Settings → Pages → activar **Enforce HTTPS**.

**Trade-off de la decisión actual:** simplicidad + CDN en el edge; no usar Enforce HTTPS de GitHub.

## Rollback

HTML anterior en [`legacy/`](legacy/). Copia de respaldo del CNAME: [`CNAME.pending`](CNAME.pending).

## Redirects legacy

`public/*.html` y `public/<slug>/` redirigen a `/series/<slug>/`.
