#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const testDataPath = path.join(root, 'testData_complete.js');
const srcHtml = path.join(root, 'index_shareable.html');
const destHtml = path.join(root, 'younes.html');

function loadTestData() {
  if (!fs.existsSync(testDataPath)) throw new Error('testData_complete.js not found');
  const src = fs.readFileSync(testDataPath, 'utf8');
  // Execute in a sandbox to capture window.testData or module.exports
  const sandbox = { window: {}, module: { exports: {} }, exports: {} };
  try {
    vm.runInNewContext(src, sandbox, { filename: 'testData_complete.js' });
  } catch (e) {
    // fallback handled below
  }

  let data = null;
  if (sandbox.window && sandbox.window.testData) data = sandbox.window.testData;
  else if (sandbox.module && sandbox.module.exports && Object.keys(sandbox.module.exports).length) data = sandbox.module.exports;
  else if (sandbox.exports && Object.keys(sandbox.exports).length) data = sandbox.exports;

  if (!data) {
    // Try to extract a JSON object literal from the file
    const m = src.match(/window\.testData\s*=\s*(\{[\s\S]*\})\s*;?/m);
    if (m && m[1]) {
      try { data = JSON.parse(m[1]); } catch (e) { /* ignore */ }
    }
  }

  if (!data) throw new Error('Unable to extract testData from testData_complete.js');
  return data;
}

function extractAndInject() {
  const data = loadTestData();
  const json = JSON.stringify(data, null, 2);
  const injectedScript = `\n<script>\nwindow.testData = ${json};\nwindow.__testDataQuestionCount = (function(){ try { let c=0; for(const k of Object.keys(window.testData||{})){ const cat = window.testData[k]; (cat.tests||[]).forEach(t=> c += (t.questions||[]).length); } return c;}catch(e){return 0;} })();\nconsole.log('testData injected — questions:', window.__testDataQuestionCount);\n</script>\n`;

  if (!fs.existsSync(srcHtml)) throw new Error('source HTML not found: ' + srcHtml);
  const original = fs.readFileSync(srcHtml, 'utf8');

  // Create a working copy of the source HTML
  let out = original;

  // Remove any existing inline window.testData assignments from the copy
  while (true) {
    const idx = out.indexOf('window.testData');
    if (idx === -1) break;
    const eq = out.indexOf('=', idx);
    if (eq === -1) break;
    const brace = out.indexOf('{', eq);
    if (brace === -1) break;
    let i = brace;
    let depth = 0;
    for (; i < out.length; i++) {
      const ch = out[i];
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) { i++; break; }
      }
    }
    const semi = out.indexOf(';', i);
    const end = semi !== -1 ? semi + 1 : i;
    out = out.slice(0, idx) + out.slice(end);
  }

  // Insert injectedScript immediately after opening <body> tag if present, otherwise before </head>
  const bodyOpen = out.indexOf('<body');
  if (bodyOpen !== -1) {
    const bodyEnd = out.indexOf('>', bodyOpen);
    if (bodyEnd !== -1) {
      const insertAt = bodyEnd + 1;
      out = out.slice(0, insertAt) + injectedScript + out.slice(insertAt);
    } else {
      out = injectedScript + out;
    }
  } else {
    const headClose = out.indexOf('</head>');
    if (headClose !== -1) out = out.slice(0, headClose) + injectedScript + out.slice(headClose);
    else out = injectedScript + out;
  }

  // Backup existing dest if present
  if (fs.existsSync(destHtml)) {
    const bak = destHtml + '.bak.' + Date.now();
    fs.copyFileSync(destHtml, bak);
    console.log('Backup written to', bak);
  }

  fs.writeFileSync(destHtml, out, 'utf8');
  console.log('Wrote', destHtml);
  console.log('Sync complete.');
}

if (require.main === module) {
  try {
    extractAndInject();
  } catch (e) {
    console.error('Sync failed:', e && e.message ? e.message : e);
    process.exitCode = 2;
  }
}

module.exports = { extractAndInject, loadTestData };
