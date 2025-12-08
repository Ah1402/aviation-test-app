const fs = require('fs');
const path = require('path');

const PARSED_PATH = path.resolve(__dirname, '..', 'build', 'index_parsed_vm.json');
const CSS_PATH = path.resolve(__dirname, '..', 'www', 'src', 'styles', 'main.css');
const OUT_PATH = path.resolve(__dirname, '..', 'younes.html');

if (!fs.existsSync(PARSED_PATH)) {
  console.error('Parsed payloads not found. Run eval_addedimports.js first.');
  process.exit(1);
}

const parsed = JSON.parse(fs.readFileSync(PARSED_PATH, 'utf8'));
const css = fs.existsSync(CSS_PATH) ? fs.readFileSync(CSS_PATH, 'utf8') : '';

// normalize category key: replace non-word by underscore, collapse multiple underscores
function keyFor(cat) {
  return (cat || 'unknown').replace(/[^\w]+/g, '_').replace(/__+/g, '_').replace(/^_|_$/g, '').toLowerCase();
}

const testData = {};
parsed.forEach(item => {
  if (!item || !item.category) return;
  const k = keyFor(item.category);
  // ensure tests array
  testData[k] = testData[k] || { name: item.category, icon: '', tests: [] };
  if (Array.isArray(item.tests)) {
    item.tests.forEach(t => testData[k].tests.push(t));
  }
});

// compute counts
let total = 0;
const counts = {};
Object.keys(testData).forEach(k => {
  const tests = testData[k].tests || [];
  let c = 0;
  tests.forEach(t => { if (Array.isArray(t.questions)) c += t.questions.length; });
  counts[k] = c; total += c;
});

console.log('Categories:', Object.keys(testData).length, 'Total questions:', total);

// minimal HTML shell with inline CSS and data + small UI
const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Younes - Offline Questions</title>
  <style>${css}</style>
  <style>
    /* small overrides to ensure readability */
    body { padding: 16px; }
    .category-list { display:flex; flex-wrap:wrap; gap:8px; }
    .category-card { padding:8px 12px; border:1px solid #ddd; border-radius:6px; cursor:pointer; }
    .question-area { margin-top:16px; }
    .option { border:1px solid #ccc; padding:8px; margin:6px 0; border-radius:6px; }
  </style>
</head>
<body>
  <h1>Younes — Offline Question Viewer</h1>
  <p>Categories: <span id="catCount">${Object.keys(testData).length}</span> — Total questions: <span id="totalCount">${total}</span></p>
  <div class="category-list" id="categories"></div>
  <div class="question-area" id="questionArea" style="display:none"></div>

  <script>
    window.testData = ${JSON.stringify(testData)};
    console.log('Embedded testData categories:', Object.keys(window.testData).length);

    function mk(text, tag='div') { const e = document.createElement(tag); e.innerHTML = text; return e; }

    const catContainer = document.getElementById('categories');
    const qArea = document.getElementById('questionArea');
    Object.keys(window.testData).forEach(catKey => {
      const meta = window.testData[catKey];
      const btn = document.createElement('button');
      btn.className = 'category-card';
      btn.textContent = meta.name + ' (' + (meta.tests ? meta.tests.reduce((s,t)=>s+(t.questions? t.questions.length:0),0) : 0) + ')';
      btn.onclick = () => showCategory(catKey);
      catContainer.appendChild(btn);
    });

    function showCategory(catKey) {
      const meta = window.testData[catKey];
      qArea.style.display = '';
      qArea.innerHTML = '<h2>' + (meta.name || catKey) + '</h2>';
      if (!meta.tests || meta.tests.length === 0) { qArea.appendChild(mk('<p>No tests found.</p>')); return; }
      const list = document.createElement('div');
      meta.tests.forEach((t, ti) => {
        const tdiv = document.createElement('div');
        tdiv.style.borderTop = '1px solid #eee';
        tdiv.style.padding = '8px 0';
        const title = document.createElement('h3'); title.textContent = t.name || ('Test ' + (ti+1));
        tdiv.appendChild(title);
        const tc = document.createElement('p'); tc.textContent = 'Questions: ' + (t.questions ? t.questions.length : 0);
        tdiv.appendChild(tc);
        const open = document.createElement('button'); open.textContent = 'Open Test'; open.onclick = () => showTest(meta, t);
        tdiv.appendChild(open);
        list.appendChild(tdiv);
      });
      qArea.appendChild(list);
    }

    function showTest(meta, test) {
      qArea.innerHTML = '<h2>' + (test.name||'Test') + '</h2>';
      if (!test.questions || test.questions.length === 0) { qArea.appendChild(mk('<p>No questions.</p>')); return; }
      let idx = 0;
      const container = document.createElement('div');
      function render() {
        const q = test.questions[idx];
        container.innerHTML = '';
        container.appendChild(mk('<div style="margin-bottom:8px"><strong>Q ' + (idx+1) + ':</strong> ' + q.question + '</div>'));
        (q.options || []).forEach((opt, i) => {
          const o = document.createElement('div'); o.className = 'option'; o.textContent = String.fromCharCode(65+i) + '. ' + opt;
          container.appendChild(o);
        });
        const nav = document.createElement('div'); nav.style.marginTop='12px';
        const prev = document.createElement('button'); prev.textContent='Previous'; prev.onclick = ()=>{ if(idx>0){ idx--; render(); }};
        const next = document.createElement('button'); next.textContent='Next'; next.onclick = ()=>{ if(idx<test.questions.length-1){ idx++; render(); }};
        nav.appendChild(prev); nav.appendChild(next);
        container.appendChild(nav);
      }
      render();
      qArea.appendChild(container);
    }
  </script>
</body>
</html>`;

fs.writeFileSync(OUT_PATH, html, 'utf8');
console.log('Wrote', OUT_PATH);
