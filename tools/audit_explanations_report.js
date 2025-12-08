/**
 * Audit explanations across the dataset and produce a CSV of items needing enrichment.
 * Sources dataset from the portable build (clean exportable module).
 *
 * Output: tools/explanations_audit.csv
 */

const fs = require('fs');
const path = require('path');

// Prefer the portable build copy which has a clean CommonJS export
const DATA_PATH = path.resolve(__dirname, '..', 'dist', 'portable_build', 'www', 'src', 'data', 'testData.js');
const OUT_CSV = path.resolve(__dirname, 'explanations_audit.csv');

function loadData() {
  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const data = require(DATA_PATH);
    if (!data || typeof data !== 'object') throw new Error('Loaded data is not an object');
    return data;
  } catch (err) {
    console.error('Failed to load test data from:', DATA_PATH);
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

function csvEscape(value) {
  if (value === null || value === undefined) return '';
  const str = String(value).replace(/\r?\n+/g, ' ').trim();
  if (str.includes(',') || str.includes('"')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function detectStatus(explanation) {
  if (explanation == null || explanation === '') return 'missing';
  if (/^Auto-generated/.test(explanation) || /Auto-generated placeholder/i.test(explanation)) return 'auto';
  return 'existing';
}

function suggestConcept(question) {
  const q = question.toLowerCase();
  if (q.includes('gpws') || q.includes('egpws') || q.includes('taws')) return 'avionics: gpws/taws';
  if (q.includes('altimeter') || q.includes('radio altimeter') || q.includes('radar altimeter')) return 'instruments: altimetry';
  if (q.includes('turn') && (q.includes('rate one') || q.includes('standard rate'))) return 'instruments: standard-rate turn';
  if (q.includes('density altitude')) return 'performance: density altitude';
  if (q.includes('bank') && q.includes('rate')) return 'performance: turning flight';
  if (q.includes('vsi') || q.includes('vertical speed')) return 'instruments: vsi';
  if (q.includes('octane') || q.includes('avgas') || q.includes('fuel')) return 'systems: fuel';
  if (q.includes('oxygen')) return 'systems: oxygen';
  if (q.includes('hydraulic')) return 'systems: hydraulics';
  if (q.includes('stringer') || q.includes('spar') || q.includes('rib') || q.includes('fuselage')) return 'structures';
  return '';
}

function indexToLetter(idx) {
  return idx == null ? '' : String.fromCharCode(65 + Number(idx));
}

function run() {
  const data = loadData();
  const rows = [];
  // Header
  rows.push([
    'category',
    'test',
    'q_index',
    'question',
    'correct_letter',
    'correct_text',
    'status',
    'current_explanation',
    'concept_hint'
  ].join(','));

  const categories = Object.keys(data);
  let total = 0;
  let missing = 0;
  let auto = 0;

  for (const catKey of categories) {
    const cat = data[catKey];
    if (!cat || !Array.isArray(cat.tests)) continue;
    for (const test of cat.tests) {
      const testName = test.name || '';
      if (!Array.isArray(test.questions)) continue;
      test.questions.forEach((q, i) => {
        total += 1;
        const status = detectStatus(q.explanation);
        if (status === 'missing') missing += 1;
        if (status === 'auto') auto += 1;
        if (status !== 'existing') {
          const correctLetter = indexToLetter(q.correct);
          const correctText = (Array.isArray(q.options) && q.options[q.correct] != null) ? q.options[q.correct] : '';
          rows.push([
            csvEscape(cat.name || catKey),
            csvEscape(testName),
            i + 1,
            csvEscape(q.question || ''),
            correctLetter,
            csvEscape(correctText),
            status,
            csvEscape(q.explanation || ''),
            csvEscape(suggestConcept(q.question || ''))
          ].join(','));
        }
      });
    }
  }

  fs.writeFileSync(OUT_CSV, rows.join('\n'), 'utf8');
  console.log(`Audit complete. Total questions: ${total}. Missing explanations: ${missing}. Auto-generated: ${auto}.`);
  console.log(`Wrote: ${OUT_CSV}`);
}

run();
