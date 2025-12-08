/**
 * Enrich placeholder explanations across all categories.
 * Replaces any explanation starting with 'Auto-generated' with a more detailed
 * domain rationale derived from pattern-based heuristics.
 * Existing non-placeholder explanations are preserved.
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'testData.js');
const BACKUP_PATH = path.join(__dirname, '..', 'src', 'data', `testData_backup_enrich_${new Date().toISOString().replace(/[:.]/g,'-')}.js`);

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
  return raw.slice(start, end);
}

function parseObject(text){
  const cleaned = text.replace(/,(\s*[}\]])/g, '$1');
  try { return Function('return ('+ cleaned + ')')(); } catch(e){ throw new Error('Eval fail: '+e.message); }
}

function enrich(question){
  const original = question.explanation || '';
  if (!/^Auto-generated/.test(original)) return null; // no change
  const qText = (question.question||'').toLowerCase();
  const correctIdx = question.correct;
  const correctOpt = Array.isArray(question.options) && typeof correctIdx==='number' && correctIdx>=0 ? question.options[correctIdx] : '';

  const rules = [
    {
      test: /rate one turn|rate 1 turn|rate-one/,
      build: () => 'Standard rate is 3°/s (360° in 2 min). Approximate bank angle (°) = TAS/10 + 7 for typical light aircraft; applying gives the selected answer.'
    },
    {
      test: /density altitude|pressure altitude|true altitude|temperature altitude/,
      build: () => 'Concept hinges on ISA comparisons: density altitude is the ISA level where current density would occur; higher temperature/ lower pressure raise it, impacting performance.'
    },
    {
      test: /egt|exhaust gas temperature|thermocouple/,
      build: () => 'EGT probes use dissimilar metal thermocouples generating a millivolt signal proportional to junction temperature, enabling accurate exhaust temperature indication.'
    },
    {
      test: /turn and slip|needle and ball|skid|slip|ball to the/,
      build: () => 'Needle shows rate of turn; ball shows lateral balance (centripetal force vs gravity). Ball displacement indicates slip (inside) or skid (outside), diagnosing bank vs rudder coordination.'
    },
    {
      test: /gpws|ground proximity warning|egpws|windshear|glide slope|sink rate/,
      build: () => 'GPWS/EGPWS modes monitor radio altitude, closure rate, configuration, and glideslope deviations; enhanced systems add terrain database and windshear logic.'
    },
    {
      test: /fail-active|fail active|fail-operational|fail operational/,
      build: () => 'Fail-operational (fail-active) systems retain required performance after a single fault (e.g., autoland redundancy) rather than disengaging immediately.'
    },
    {
      test: /radio altimeter|frequency band|uhf|shf|microwave/,
      build: () => 'Radio altimeters operate in the SHF microwave band (~4.2–4.4 GHz) using FMCW or pulse techniques to derive precise height above terrain.'
    },
    {
      test: /hydraulic|pump|reservoir|pressure|fluid|bleed air/,
      build: () => 'Aircraft systems manage pressure/flow using pumps, valves, accumulators, and thermal control; the correct option aligns with the functional component described.'
    },
    {
      test: /fire|smoke|extinguisher|foam|dry powder|halon|brake fire/,
      build: () => 'Fire suppression selection depends on fire class: e.g., foam for fuel, dry powder or halon for brakes/electrical; rationale follows extinguishing agent properties.'
    },
    {
      test: /pressurization|outflow valve|differential pressure|cabin altitude/,
      build: () => 'Pressurization regulates cabin altitude via inflow (engine bleed) and controlled exhaust through outflow valves; structural limits define max differential.'
    },
    {
      test: /oxygen|diluter-demand|mask|supplemental|smoke hood/,
      build: () => 'Crew/passenger oxygen systems mix O2 with cabin air (diluter-demand) or provide 100% under protection hoods; activation logic ensures supply in decompression.'
    },
    {
      test: /magneto|ignition|impulse coupling|spark/,
      build: () => 'Ignition systems use magnetos producing high voltage; impulse couplings boost rotational speed at low RPM for reliable starting.'
    },
    {
      test: /autopilot|fail-passive|fail-safe|synchronized/,
      build: () => 'Autopilot reliability categories define system behavior on component failure; synchronization avoids abrupt attitude changes on manual reversion.'
    },
    {
      test: /airspace|ifr|vfr|separation|runway|holding|clearance|wake turbulence/,
      build: () => 'Operational procedures stem from ICAO/EASA rules ensuring separation, orderly flow, and compliance with airspace classification and approach/holding criteria.'
    },
    {
      test: /cloud|front|turbulence|jet stream|convection|dew point|fog|thermal depression/,
      build: () => 'Meteorological phenomena arise from air mass interactions, stability, moisture, and wind shear; the chosen answer matches the described process.'
    },
    {
      test: /human performance|hypoxia|fatigue|stress|vision|illusions/,
      build: () => 'Human performance factors affect decision-making and physiological tolerance; the answer addresses mitigation or causal mechanism.'
    },
    {
      test: /navigation|vor|dme|adf|bearing|radial|track|gnss|gps/,
      build: () => 'Radio navigation derives position from bearings/radials and distance; the selection aligns with equipment function or procedural use.'
    },
    {
      test: /chart|diagram|figure|graph|reference/,
      build: () => 'Interpreting the figure involves reading scales, symbology, and derived relationships; the correct option matches that interpretation.'
    },
    {
      test: /why |why\b|purpose|function|role|effect/,
      build: () => 'The chosen option states the principal causal mechanism or intended function referenced in the question.'
    }
  ];

  for (const r of rules){ if (r.test.test(qText)) {
    return 'Enriched: ' + r.build() + (correctOpt? ' Correct option: '+ correctOpt + '.':''); }
  }
  return 'Enriched: Correct option chosen based on established aviation principles for this topic.' + (correctOpt? ' Option: '+ correctOpt + '.':'');
}

function main(){
  const raw = fs.readFileSync(DATA_PATH,'utf8');
  const objText = extractRootObject(raw);
  const data = parseObject(objText);
  let replaced = 0; let preserved = 0;
  for (const catKey of Object.keys(data)){
    const cat = data[catKey];
    if (!cat || !Array.isArray(cat.tests)) continue;
    for (const test of cat.tests){
      if (!test || !Array.isArray(test.questions)) continue;
      for (const q of test.questions){
        if (!q) continue;
        const newExp = enrich(q);
        if (newExp){ q.explanation = newExp; replaced++; } else { preserved++; }
      }
    }
  }
  // Serialize back: simple replace the original object text with updated JSON
  const serialized = JSON.stringify(data, null, 2);
  fs.writeFileSync(BACKUP_PATH, raw, 'utf8');
  const updated = raw.replace(objText, serialized);
  fs.writeFileSync(DATA_PATH, updated, 'utf8');
  console.log(`Enrichment complete. Replaced placeholders: ${replaced}. Preserved existing/non-placeholder: ${preserved}.`);
  console.log('Backup saved to:', BACKUP_PATH);
}

if (require.main === module){
  try { main(); } catch(e){ console.error('Error:', e); process.exit(1); }
}
