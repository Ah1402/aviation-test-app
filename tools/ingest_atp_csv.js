/**
 * Ingest ATP MCQ questions from CSV files and merge into testData.js.
 *
 * CSV columns (header required):
 * category,test,question,A,B,C,D,correct,explanation,chart
 * - correct: A|B|C|D (or 0|1|2|3)
 * - chart: optional relative path to an image (png/jpg/svg); will be embedded as data URL
 *
 * Usage:
 *   node tools/ingest_atp_csv.js path/to/csv_folder
 * Defaults to: data/atp_csv
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.resolve(__dirname, '..', 'dist', 'portable_build', 'www', 'src', 'data', 'testData.js');

function readDirFiles(dir){
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.csv')).map(f => path.join(dir, f));
}

function parseCSV(text){
  const rows = [];
  let i=0, field='', inQuotes=false, row=[];
  while (i < text.length){
    const ch = text[i];
    if (inQuotes){
      if (ch === '"'){
        if (text[i+1] === '"'){ field += '"'; i+=2; continue; }
        inQuotes = false; i++; continue;
      }
      field += ch; i++; continue;
    }
    if (ch === '"'){ inQuotes = true; i++; continue; }
    if (ch === ','){ row.push(field); field=''; i++; continue; }
    if (ch === '\n' || ch === '\r'){
      // handle CRLF/CR
      if (ch === '\r' && text[i+1] === '\n') i++;
      row.push(field); field='';
      if (row.length>1 || row[0]!== '') rows.push(row);
      row=[]; i++; continue;
    }
    field += ch; i++;
  }
  if (field.length>0 || row.length>0){ row.push(field); rows.push(row); }
  return rows;
}

function extractRootObject(raw) {
  const anchor = raw.indexOf('const testData');
  if (anchor === -1) throw new Error('testData declaration not found');
  let i = raw.indexOf('{', anchor);
  if (i === -1) throw new Error('Opening brace not found');
  let depth = 0, start = -1, end = -1; let inStr=false, q=''; let prev='';
  for (; i < raw.length; i++) {
    const ch = raw[i];
    if (inStr) { if (ch === q && prev !== '\\') { inStr=false; } prev=ch; continue; }
    if (ch === '"' || ch === "'") { inStr=true; q=ch; prev=ch; continue; }
    if (ch === '{') { if (depth===0) start=i; depth++; }
    else if (ch === '}') { depth--; if (depth===0){ end=i+1; break; } }
    prev=ch;
  }
  if (start === -1 || end === -1) throw new Error('Failed to bracket object');
  return { slice: raw.slice(start, end), start, end };
}

function parseObject(text){
  const cleaned = text.replace(/,(\s*[}\]])/g, '$1');
  // eslint-disable-next-line no-new-func
  return Function('return ('+ cleaned + ')')();
}

function ensureCategory(data, catKey, catName){
  if (!data[catKey]){
    data[catKey] = { name: catName || catKey, icon: 'fas fa-book', tests: [] };
  }
  if (!Array.isArray(data[catKey].tests)) data[catKey].tests = [];
}

function getOrCreateTest(catObj, testName){
  let t = catObj.tests.find(x => x.name === testName);
  if (!t){ t = { name: testName, timeLimit: 60, questions: [] }; catObj.tests.push(t); }
  if (!Array.isArray(t.questions)) t.questions = [];
  return t;
}

function toIndex(correct){
  if (correct == null) return 0;
  const s = String(correct).trim().toUpperCase();
  if (/^[0-3]$/.test(s)) return parseInt(s,10);
  const map = {A:0,B:1,C:2,D:3};
  return map[s] ?? 0;
}

function fileToDataUrl(filePath){
  try{
    const buf = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : ext === '.svg' ? 'image/svg+xml' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'application/octet-stream';
    return `data:${mime};base64,${buf.toString('base64')}`;
  }catch(e){ return null; }
}

function main(){
  const srcDir = path.resolve(process.cwd(), process.argv[2] || 'data/atp_csv');
  const files = readDirFiles(srcDir);
  if (files.length === 0){
    console.error(`No CSV files found in ${srcDir}. Place ATP CSVs with header: category,test,question,A,B,C,D,correct,explanation,chart`);
    process.exit(1);
  }

  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const { slice, start, end } = extractRootObject(raw);
  const data = parseObject(slice);

  let imported=0, testsCreated=0, categoriesCreated=0;
  const existingCats = new Set(Object.keys(data));

  for (const f of files){
    const text = fs.readFileSync(f, 'utf8');
    const rows = parseCSV(text);
    if (rows.length === 0) continue;
    const header = rows[0].map(h => h.trim().toLowerCase());
    const idx = (name) => header.indexOf(name);
    const cCat = idx('category'), cTest = idx('test'), cQ = idx('question'), cA = idx('a'), cB = idx('b'), cC = idx('c'), cD = idx('d'), cCorr = idx('correct'), cExp = idx('explanation'), cChart = idx('chart');
    if ([cCat,cTest,cQ,cA,cB,cC,cD,cCorr].some(v => v === -1)){
      console.warn(`Skipping ${path.basename(f)}: missing required columns.`);
      continue;
    }
    for (let r=1; r<rows.length; r++){
      const row = rows[r];
      const categoryName = (row[cCat]||'').trim();
      const testName = (row[cTest]||'').trim() || 'ATP Test';
      const qText = (row[cQ]||'').trim();
      if (!qText) continue;
      const opts = [row[cA]||'', row[cB]||'', row[cC]||'', row[cD]||''].map(s => String(s||'').trim());
      const correct = toIndex(row[cCorr]);
      const explanation = (cExp>=0 ? String(row[cExp]||'').trim() : '');
      const chartRel = (cChart>=0 ? String(row[cChart]||'').trim() : '');
      const catKey = categoryName.toLowerCase().replace(/\s+/g,'-');
      const catExisted = existingCats.has(catKey);
      ensureCategory(data, catKey, categoryName);
      if (!catExisted) categoriesCreated++;
      const t = getOrCreateTest(data[catKey], testName);
      if (!t.__seen){ t.__seen = true; testsCreated++; }

      let chartDataUrl = null;
      if (chartRel){
        const abs = path.isAbsolute(chartRel) ? chartRel : path.resolve(srcDir, chartRel);
        chartDataUrl = fileToDataUrl(abs);
      }

      t.questions.push({
        question: qText,
        options: opts,
        correct,
        explanation: explanation || '',
        ...(chartDataUrl ? { chart: chartDataUrl } : {}),
        answerVerified: false,
        lastChecked: new Date().toISOString()
      });
      imported++;
    }
  }

  // Clean helper props
  Object.keys(data).forEach(k => {
    const cat = data[k];
    (cat.tests||[]).forEach(t => { delete t.__seen; });
  });

  const backupPath = path.resolve(path.dirname(DATA_PATH), `testData.atp_import_backup_${Date.now()}.js`);
  fs.writeFileSync(backupPath, raw, 'utf8');
  const newRaw = raw.slice(0, start) + JSON.stringify(data, null, 2) + raw.slice(end);
  fs.writeFileSync(DATA_PATH, newRaw, 'utf8');

  console.log(`Imported questions: ${imported}. New categories: ${categoriesCreated}. New tests touched: ${testsCreated}.`);
  console.log('Backup saved to:', backupPath);
}

if (require.main === module){
  try { main(); } catch (e) { console.error('Error:', e); process.exit(1); }
}
