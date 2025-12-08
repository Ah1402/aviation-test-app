// Simple standalone builder: merges index.html with cached scripts into a single STANDALONE_GENERATED.html
// NOTE: This is a placeholder; full implementation would inline external JS/CSS similar to existing STANDALONE.html.
const fs = require('fs');
const path = require('path');

function main(){
  const root = process.cwd();
  const indexPath = path.join(root, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('index.html not found');
    process.exit(1);
  }
  const html = fs.readFileSync(indexPath,'utf8');
  // Minimal transform: stamp generation time
  const outPath = path.join(root, 'STANDALONE_GENERATED.html');
  const stamped = html.replace(/<head>/i, '<head>\n<!-- Standalone generated '+ new Date().toISOString() +' -->');
  fs.writeFileSync(outPath, stamped, 'utf8');
  console.log('Generated', outPath);
}

main();
