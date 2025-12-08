const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const inFile = path.join(root, 'index.html');
const outFile = path.join(root, 'index_shareable.rebuilt.html');
const dedup = path.join(root, 'testData_complete.dedup.js');

let html = fs.readFileSync(inFile, 'utf8');

// Inline local CSS referenced by <link rel="stylesheet" href="...">
html = html.replace(/<link\s+rel=(?:"|')stylesheet(?:"|')\s+href=(?:"|')([^"']+)(?:"|')\s*\/?>/gi, (m, href) => {
  try {
    const p = path.join(root, href);
    if (fs.existsSync(p)) {
      const css = fs.readFileSync(p, 'utf8');
      return `<style>\n/* inlined ${href} */\n${css}\n</style>`;
    }
  } catch (e) {}
  return m;
});

// Inline script tags with local src
html = html.replace(/<script\s+src=(?:"|')([^"']+)(?:"|')\s*>\s*<\/script>/gi, (m, src) => {
  // if external URL (http/https), leave it
  if (/^https?:\/\//i.test(src)) return m;
  // resolve path
  const p = path.join(root, src);
  if (!fs.existsSync(p)) {
    // sometimes referenced from dist or src; try relative
    const alt = path.join(root, src.replace(/^\//, ''));
    if (fs.existsSync(alt)) {
      try { const code = fs.readFileSync(alt,'utf8'); return `<script>\n/* inlined ${src} */\n${code}\n</script>`;}catch(e){}
    }
    return m;
  }
  try {
    const code = fs.readFileSync(p, 'utf8');
    // If this is testData_complete.js, replace with dedup file instead
    if (/testData_complete\.js$/i.test(src) && fs.existsSync(dedup)) {
      const dedCode = fs.readFileSync(dedup,'utf8');
      return `<script>\n/* inlined ${path.basename(dedup)} (deduped) */\n${dedCode}\n</script>`;
    }
    return `<script>\n/* inlined ${src} */\n${code}\n</script>`;
  } catch (e) {
    return m;
  }
});

// Also replace any remaining reference to testData_complete.js in case different path
html = html.replace(/<script>\s*document\.write\(.*testData_complete\.js.*\)\s*<\/script>/gi, '');

// If there is any external CSS @import or fonts we won't inline; leave as-is

fs.writeFileSync(outFile, html, 'utf8');
console.log('Wrote', outFile);
