import fs from 'node:fs';
import path from 'node:path';

const BASE = '/alitai_portfolio';
const slugs = [
  'arquetipos',
  'naturaleza_zen',
  'adn_estelar',
  'reflejos_de_agua',
  'hacia_la_luz',
];

for (const slug of slugs) {
  const target = `${BASE}/series/${slug}/`;
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0;url=${target}" />
  <link rel="canonical" href="${target}" />
  <title>Redirigiendo…</title>
</head>
<body>
  <p>Redirigiendo a <a href="${target}">${target}</a></p>
</body>
</html>
`;
  fs.writeFileSync(path.join('public', `${slug}.html`), html);
  fs.mkdirSync(path.join('public', slug), { recursive: true });
  fs.writeFileSync(path.join('public', slug, 'index.html'), html);
}

console.log(`Wrote redirects for ${slugs.length} series (base ${BASE})`);
