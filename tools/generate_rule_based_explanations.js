/**
 * Rule-based fallback explanation generator.
 * Populates missing `explanation` fields in src/data/testData.js with concise
 * domain-flavoured rationales derived from pattern matching the question text
 * and the correct option. This is a non-AI deterministic filler used while
 * external model access (e.g. Gemini) is unavailable.
 *
 * Safety: Produces clearly marked placeholders so future AI generations can
 * overwrite only those. Existing non-empty explanations are preserved.
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'testData.js');
const BACKUP_PATH = path.join(__dirname, '..', 'src', 'data', `testData_backup_explanations_${new Date().toISOString().replace(/[:.]/g,'-')}.js`);

function loadDataset() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  // We will collect every questions array and its span indices for replacement.
  const questionBlocks = [];
  const regex = /"questions"\s*:\s*(\[(?:[^\]\[]|\[(?:[^\]\[]|\[(?:[^\]\[]|.)*\])*\])*\])/gs; // attempt to match balanced brackets crudely
  // Simpler, incremental parse: scan and count brackets once '"questions" :' encountered.
  let idx = 0;
  while (true) {
    const qKey = raw.indexOf('"questions"', idx);
    if (qKey === -1) break;
    const colon = raw.indexOf(':', qKey);
    if (colon === -1) break;
    // move to first '[' after colon
    let start = raw.indexOf('[', colon);
    if (start === -1) break;
    let depth = 0;
    let end = start;
    for (; end < raw.length; end++) {
      const ch = raw[end];
      if (ch === '[') depth++;
      else if (ch === ']') {
        depth--;
        if (depth === 0) { end++; break; }
      }
    }
    if (depth !== 0) throw new Error('Unbalanced brackets while parsing questions array near index ' + start);
    const arrText = raw.slice(start, end);
    questionBlocks.push({ start, end, text: arrText });
    idx = end;
  }
  if (!questionBlocks.length) throw new Error('No questions arrays found in testData.js');
  // Parse each array text via Function (dataset uses JSON-compatible literals only).
  const parsed = questionBlocks.map(b => {
    let clean = b.text.replace(/,(\s*[}\]])/g, '$1');
    try {
      return Function('return ' + clean)();
    } catch (e) {
      throw new Error('Failed to parse one questions array: ' + e.message);
    }
  });
  return { raw, questionBlocks, parsed };
}

function saveDataset(context) {
  const { raw, questionBlocks, updatedArrays } = context;
  let cursor = 0;
  let chunks = [];
  questionBlocks.forEach((block, i) => {
    chunks.push(raw.slice(cursor, block.start));
    chunks.push(JSON.stringify(updatedArrays[i], null, 2));
    cursor = block.end;
  });
  chunks.push(raw.slice(cursor));
  const updated = chunks.join('');
  fs.writeFileSync(BACKUP_PATH, raw, 'utf8');
  fs.writeFileSync(DATA_PATH, updated, 'utf8');
}

function buildExplanation(q, correctOption) {
  const text = q.question || '';
  const lower = text.toLowerCase();
  const opt = correctOption || '';

  // Keyword heuristics
  if (/\b(mach|tas|cas|speed|rate|descent|climb|gradient|radius|turn|wind|drift|heading)\b/.test(lower)) {
    return `Auto-generated: ${opt} is correct based on standard performance/flight planning relationships implied by the question.`;
  }
  if (/\b(pressure|altimeter|altitude|temperature|density|isotherm|inversion)\b/.test(lower)) {
    return `Auto-generated: ${opt} aligns with atmospheric / pressure instrument principles referenced in the question.`;
  }
  if (/\b(hydraulic|pump|fuel|compressor|turbine|ignition|magneto|bleed|valve|electrical|generator|circuit|battery|bus)\b/.test(lower)) {
    return `Auto-generated: ${opt} matches the described aircraft system component function.`;
  }
  if (/\b(fire|smoke|icing|anti-ice|de-ice|oxygen|pressurization|evacuation|emergency)\b/.test(lower)) {
    return `Auto-generated: ${opt} reflects standard safety / emergency procedure or equipment behavior.`;
  }
  if (/\b(holding|approach|runway|clearance|atc|ifr|vfr|separation|airspace|classification|wake|taxi|sid|star|transition)\b/.test(lower)) {
    return `Auto-generated: ${opt} is correct per ICAO / standard operational procedure context.`;
  }
  if (/\b(meteorology|frontal|cloud|turbulence|jet stream|convection|dewpoint|temperature|fog|visibility|wind shear)\b/.test(lower)) {
    return `Auto-generated: ${opt} fits the meteorological process or phenomenon described.`;
  }
  if (/\b(human performance|fatigue|hypoxia|illusion|vision|stress|fatigue|alertness|CRM)\b/.test(lower)) {
    return `Auto-generated: ${opt} aligns with human performance / physiological principles.`;
  }
  if (/\b(navigation|vortac|vor|dme|gnss|gps|adf|bearing|radial|fix|track)\b/.test(lower)) {
    return `Auto-generated: ${opt} corresponds to the navigation concept referenced.`;
  }
  if (/\b(chart|reference|diagram|figure|graph)\b/.test(lower)) {
    return `Auto-generated: ${opt} matches interpretation of the referenced chart/figure.`;
  }
  if (/^why\b|\bwhy\b/.test(lower)) {
    return `Auto-generated: ${opt} provides the underlying reason addressed by the question.`;
  }
  if (/\b(primary|purpose|function|role|effect)\b/.test(lower)) {
    return `Auto-generated: ${opt} is the principal function/effect identified.`;
  }
  if (/\bdefine|definition|means|stands for|refers to\b/.test(lower)) {
    return `Auto-generated: ${opt} is the accepted definition in aviation context.`;
  }
  // Generic fallback
  return `Auto-generated placeholder: ${opt} is the validated correct choice; detailed explanation pending authoritative source or AI generation.`;
}

function main() {
  const { raw, questionBlocks, parsed } = loadDataset();
  let filled = 0;
  let already = 0;
  const updatedArrays = parsed.map(arr => arr.map(q => {
    if (q && typeof q === 'object') {
      if (q.explanation && q.explanation.trim().length) { already++; return q; }
      const correctIdx = typeof q.correct === 'number' ? q.correct : -1;
      const correctOption = correctIdx >= 0 && Array.isArray(q.options) ? q.options[correctIdx] : '';
      q.explanation = buildExplanation(q, correctOption);
      filled++;
    }
    return q;
  }));
  saveDataset({ raw, questionBlocks, updatedArrays });
  console.log('Rule-based explanation generation complete.');
  console.log(`Question arrays processed: ${questionBlocks.length}`);
  console.log(`Existing explanations preserved: ${already}`);
  console.log(`New explanations added: ${filled}`);
  console.log(`Backup written to: ${BACKUP_PATH}`);
}

if (require.main === module) {
  try { main(); } catch (e) { console.error('Error:', e); process.exit(1); }
}
