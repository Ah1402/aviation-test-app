const fs = require('fs');
const path = require('path');

function findFilesWithPattern(root, pattern) {
  const glob = require('glob');
  return glob.sync('**/*', { cwd: root, nodir: true, ignore: ['node_modules/**', 'dist/**'] })
    .map(f => path.join(root, f))
    .filter(fp => {
      try { return fs.readFileSync(fp, 'utf8').indexOf(pattern) !== -1; } catch (e) { return false; }
    });
}

function updateFiles(root) {
  const tdPath = path.join(root, 'testData_complete.js');
  if (!fs.existsSync(tdPath)) throw new Error('testData_complete.js not found at ' + tdPath);
  const tdContent = fs.readFileSync(tdPath, 'utf8').trim();

  // pattern to find existing assignment block
  const re = /window\.testData\s*=\s*\{[\s\S]*?\};/m;

  const files = findFilesWithPattern(root, 'window.testData =');
  const updated = [];

  files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (!re.test(content)) return;
    const newContent = content.replace(re, tdContent);
    fs.writeFileSync(f, newContent, 'utf8');
    updated.push(f);
    console.log('Updated:', f);
  });

  return { updated, count: updated.length };
}

function summarizeCounts(root) {
  const td = require(path.join(root, 'testData_complete.js').replace(/\.js$/, ''));
}

function main() {
  const root = path.resolve(__dirname, '..');
  try {
    const result = updateFiles(root);
    console.log('\nDone. Files updated:', result.count);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

if (require.main === module) main();
