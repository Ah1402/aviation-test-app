const fs = require('fs');
const path = require('path');

function readTestDataFromJS(filePath, encoding='utf8'){
  const content = fs.readFileSync(filePath, encoding);
  const start = content.indexOf('window.testData');
  if (start === -1) throw new Error('window.testData not found in ' + filePath);
  const objStart = content.indexOf('{', start);
  if (objStart === -1) throw new Error('Could not find object start');

  // Find matching closing brace
  let brace = 0;
  let endIdx = -1;
  for (let i = objStart; i < content.length; i++){
    const ch = content[i];
    if (ch === '{') brace++;
    else if (ch === '}'){
      brace--;
      if (brace === 0){ endIdx = i; break; }
    }
  }
  if (endIdx === -1) throw new Error('Could not find end of object');
  const objStr = content.substring(objStart, endIdx+1);
  let obj;
  try { obj = eval('(' + objStr + ')'); }
  catch(e){ throw new Error('Failed to eval testData: ' + e.message); }
  return { obj, pre: content.substring(0, start), post: content.substring(endIdx+1) };
}

function writeTestDataToJS(filePath, obj, pre, post, encoding='utf8'){
  const json = JSON.stringify(obj, null, 2);
  const out = pre + 'window.testData = ' + json + ';' + post;
  fs.writeFileSync(filePath, out, encoding);
}

function canonicalKeyFrom(categoryKey, categoryObj){
  // Prefer explicit categoryKey base by stripping common importer suffixes
  let k = categoryKey.replace(/-test-\d+$/,'').replace(/-test-5$/,'');
  // If this yields just empty or 'uncategorized', fallback to normalized category name
  if (!k || k === 'uncategorized'){
    const name = (categoryObj && categoryObj.name) ? categoryObj.name : categoryKey;
    k = name.toString().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  }
  return k;
}

function mergeAndDedupe(testData){
  const merged = {};
  const seenIds = new Set();
  let totalBefore = 0;
  Object.keys(testData).forEach(catKey => {
    const cat = testData[catKey];
    (cat.tests || []).forEach(test => {
      const qCount = (test.questions || []).length;
      totalBefore += qCount;
    });
  });

  Object.keys(testData).forEach(catKey => {
    const cat = testData[catKey];
    const baseKey = canonicalKeyFrom(catKey, cat);
    if (!merged[baseKey]){
      merged[baseKey] = { name: cat.name || baseKey.replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase()), icon: cat.icon || 'fas fa-question-circle', tests: [] };
    }

    (cat.tests || []).forEach(test => {
      // For each test, copy but filter questions
      const newTest = Object.assign({}, test, { questions: [] });
      (test.questions || []).forEach(q => {
        const qid = q.id !== undefined && q.id !== null ? q.id.toString() : null;
        const dedupeKey = qid ? `id:${qid}` : `text:${(q.question||'').slice(0,120)}`;
        if (!seenIds.has(dedupeKey)){
          seenIds.add(dedupeKey);
          newTest.questions.push(q);
        }
      });
      if (newTest.questions.length) merged[baseKey].tests.push(newTest);
    });
  });

  // Calculate after counts
  let totalAfter = 0;
  Object.keys(merged).forEach(k => {
    (merged[k].tests || []).forEach(t => { totalAfter += (t.questions||[]).length; });
  });

  return { merged, totalBefore, totalAfter };
}

(async function main(){
  try {
    const root = process.cwd();
    const tdPath = path.join(root, 'testData_complete.js');
    const saPath = path.join(root, 'STANDALONE.html');

    console.log('Reading', tdPath);
    const td = readTestDataFromJS(tdPath, 'utf8');
    console.log('Parsing testData_complete.js ...');
    const { merged, totalBefore, totalAfter } = mergeAndDedupe(td.obj);
    console.log(`Questions before: ${totalBefore}, after dedupe: ${totalAfter}`);
    console.log(`Categories before: ${Object.keys(td.obj).length}, after: ${Object.keys(merged).length}`);

    // Write back testData_complete.js
    writeTestDataToJS(tdPath, merged, td.pre, td.post, 'utf8');
    console.log('Updated', tdPath);

    // Now update STANDALONE.html (utf16le)
    if (fs.existsSync(saPath)){
      console.log('Updating', saPath);
      const sa = readTestDataFromJS(saPath, 'utf16le');
      writeTestDataToJS(saPath, merged, sa.pre, sa.post, 'utf16le');
      console.log('Updated', saPath);
    } else {
      console.warn('STANDALONE.html not found; skipping');
    }

    console.log('Dedupe complete. Summary:');
    console.log(' - Questions before:', totalBefore);
    console.log(' - Questions after:', totalAfter);
    console.log(' - Categories after:', Object.keys(merged).length);
  } catch (e) {
    console.error('Failed:', e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
