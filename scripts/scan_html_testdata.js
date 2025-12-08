const fs = require('fs');
const glob = require('glob');

const files = glob.sync('**/*.html', { ignore: ['node_modules/**', 'dist/**', '**/node_modules/**'] });
const results = [];
for (const f of files) {
  try {
    const txt = fs.readFileSync(f, 'utf8');
    let found = false, cats = 0, qs = 0;
    let start = txt.indexOf('const testData =');
    if (start !== -1) {
      found = true;
      const jsStart = txt.indexOf('{', start);
      let level = 0, end = -1;
      for (let i = jsStart; i < txt.length; i++) {
        if (txt[i] === '{') level++; else if (txt[i] === '}') { level--; if (level === 0) { end = i; break; } }
      }
      const objText = txt.slice(jsStart, end + 1);
      const obj = JSON.parse(objText);
      cats = Object.keys(obj).length;
      Object.values(obj).forEach(c => { (c.tests || []).forEach(t => { qs += (t.questions ? t.questions.length : 0) }) });
    } else {
      start = txt.indexOf('window.testData =');
      if (start !== -1) {
        found = true;
        const jsStart = txt.indexOf('{', start);
        let level = 0, end = -1;
        for (let i = jsStart; i < txt.length; i++) {
          if (txt[i] === '{') level++; else if (txt[i] === '}') { level--; if (level === 0) { end = i; break; } }
        }
        const objText = txt.slice(jsStart, end + 1);
        const obj = JSON.parse(objText);
        cats = Object.keys(obj).length;
        Object.values(obj).forEach(c => { (c.tests || []).forEach(t => { qs += (t.questions ? t.questions.length : 0) }) });
      }
    }
    results.push({ file: f, hasTestData: found, categories: cats, questions: qs });
  } catch (e) {
    results.push({ file: f, error: e.message });
  }
}
console.log(JSON.stringify(results, null, 2));
