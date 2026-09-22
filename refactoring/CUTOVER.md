# Cutover a GitHub Pages (Actions)

## Estado actual (mientras DNS custom no esté listo)

- URL pública de prueba: `https://heimdall223.github.io/alitai_portfolio/`
- En `astro.config.mjs`: `site: 'https://heimdall223.github.io'` + `base: '/alitai_portfolio/'`
- El archivo `CNAME` está aparcado en [`CNAME.pending`](CNAME.pending) para que Pages **no** redirija a un dominio DNS roto (eso dejaba el sitio inaccesible o sin estilos).

## Qué cambió en el refactor

- El sitio se genera con `npm run build` → `dist/`.
- El workflow [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) publica `dist/` en Pages.

## Pasos en GitHub (Actions)

1. Repo → **Settings** → **Pages**.
2. **Build and deployment** → Source: **GitHub Actions**.
3. **Custom domain:** dejalo **vacío** hasta que el DNS de `alitai.com.ar` esté bien.
4. Push a `main` o **Actions** → Deploy to GitHub Pages → Run workflow.
5. Verificá: `https://heimdall223.github.io/alitai_portfolio/` (con CSS e imágenes).

## Cuando reactive `alitai.com.ar`

### DNS (registrador del dominio)

Para **apex** `alitai.com.ar` (recomendado, coincide con el CNAME histórico):

- Registros **A** hacia las IPs de GitHub Pages (consultar [docs actuales](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)):
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- Opcional **www**: CNAME `www` → `heimdall223.github.io`

### En el repo (después de que el DNS responda bien)

1. Copiá `refactoring/CNAME.pending` → `public/CNAME` (contenido: `alitai.com.ar`).
2. En `astro.config.mjs` cambiá a:

```js
site: 'https://alitai.com.ar',
base: '/',
```

3. Regenerá redirects: `node scripts/write-legacy-redirects.mjs` (ajustá `BASE` a `''` o `/` en el script si hace falta).
4. Commit, push a `main`, esperá el Action.
5. Pages → Custom domain: `alitai.com.ar` → esperá el certificado → Enforce HTTPS.

### Por qué hay que quitar `base` al usar el dominio

Con dominio custom, GitHub sirve el sitio en la **raíz** (`https://alitai.com.ar/`). Con `base: '/alitai_portfolio/'` los CSS quedarían en una ruta incorrecta.

## Rollback

1. Pages → Source: **Deploy from a branch** solo si restaurás HTML legacy.
2. HTML anterior: [`legacy/`](legacy/).

## Redirects legacy

Archivos en `public/` (`arquetipos.html`, etc.) redirigen a `/alitai_portfolio/series/<slug>/` mientras el `base` del proyecto esté activo.
