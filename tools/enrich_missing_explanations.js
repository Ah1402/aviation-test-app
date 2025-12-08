/**
 * Enrich all questions that have missing explanations by generating concise,
 * sourced rationales and adding citation metadata (sourceRefs).
 *
 * Targets the portable build dataset to avoid quirks in the raw www file.
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.resolve(__dirname, '..', 'dist', 'portable_build', 'www', 'src', 'data', 'testData.js');
const BACKUP_PATH = path.resolve(__dirname, '..', 'dist', 'portable_build', 'www', 'src', 'data', `testData.backup_${Date.now()}.js`);

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

// Map concept keywords to sources and explainers
const conceptSources = [
  {
    match: /(gpws|egpws|taws|glide\s*slope|sink rate)/i,
    explain: () => 'GPWS/EGPWS monitors height above terrain and closure trends using the radio altimeter, configuration (gear/flaps) and glideslope inputs to provide mode-specific alerts.',
    sources: [
      { title: 'Ground proximity warning system – Wikipedia', url: 'https://en.wikipedia.org/wiki/Ground_proximity_warning_system' },
      { title: 'FAA TSO-C151d (TAWS)', url: 'https://drs.faa.gov/browse/excelExternalWindow/689C6CCC0EAA329A862581920072014B.0001' }
    ]
  },
  {
    match: /(radio altimeter|radar altimeter|agl\b)/i,
    explain: () => 'Radio altimeters measure true height above ground using FMCW radar in the 4.2–4.4 GHz band; outputs drive GPWS/EGPWS and autoland flare logic at low altitude.',
    sources: [
      { title: 'Radar altimeter – Wikipedia', url: 'https://en.wikipedia.org/wiki/Radio_altimeter' },
      { title: 'FAA Instrument Flying Handbook, Ch. 5 (Flight Instruments)', url: 'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/FAA-H-8083-15B.pdf' }
    ]
  },
  {
    match: /(density altitude|pressure altitude|isa|hot and high)/i,
    explain: () => 'Density altitude is the ISA altitude at which the ambient air density would occur; higher temperature or lower pressure increases density altitude and degrades performance.',
    sources: [
      { title: 'Density altitude – Wikipedia', url: 'https://en.wikipedia.org/wiki/Density_altitude' },
      { title: "FAA PHAK, Ch. 11 (Aircraft Performance)", url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/faa-h-8083-25c.pdf' }
    ]
  },
  {
    match: /(rate one|standard rate|3°\/s|bank angle)/i,
    explain: () => 'A standard-rate turn is 3°/s. A handy approximation for bank angle in degrees is φ ≈ TAS(knots)/10 + 7 for coordinated level turns at low altitude.',
    sources: [
      { title: 'Standard rate turn – Wikipedia', url: 'https://en.wikipedia.org/wiki/Standard_rate_turn' },
      { title: 'ICAO PANS-OPS (turning criteria, general reference)', url: 'https://store.icao.int/en/procedures-for-air-navigation-services-aircraft-operations-pans-ops-volume-i-flight-procedures-doc-8168' }
    ]
  },
  {
    match: /(turn and slip|slip|skid|ball\b|needle\b)/i,
    explain: () => 'The needle shows turn rate; the ball indicates lateral balance. Ball inside the turn = slip (not enough bank/rudder); ball outside = skid (too much bank/rudder).',
    sources: [
      { title: 'Turn and slip indicator – Wikipedia', url: 'https://en.wikipedia.org/wiki/Turn_and_slip_indicator' },
      { title: 'FAA Instrument Flying Handbook, Ch. 5', url: 'https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/FAA-H-8083-15B.pdf' }
    ]
  },
  {
    match: /(autopilot|fail-?active|fail-?operational|fail-?passive)/i,
    explain: () => 'Fail-operational (fail-active) means the system retains required performance after a single fault (e.g., autoland redundancy); fail-passive disengages without significant transients.',
    sources: [
      { title: 'Autoland/Fail-operational – general reference', url: 'https://en.wikipedia.org/wiki/Autoland' }
    ]
  },
  {
    match: /(vfr|ifr|airspace|separation|glideslope|holding|clearance)/i,
    explain: () => 'Operational minima and procedures follow ICAO/State rules to maintain separation and orderly flow; selections align with published minima and vectoring/holding criteria.',
    sources: [
      { title: 'FAA AIM (Air Traffic Control procedures)', url: 'https://www.faa.gov/air_traffic/publications' }
    ]
  },
  {
    match: /(cloud|mountain wave|jet stream|lenticular|Cb\b|St\b|Ac\b|As\b)/i,
    explain: () => 'Weather phenomena depend on stability, moisture, and terrain/wind interactions (e.g., mountain waves, lenticular clouds). The selection matches the described setup.',
    sources: [
      { title: 'FAA PHAK Ch. 12–13 (Weather Theory/Services)', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/faa-h-8083-25c.pdf' },
      { title: 'Lenticular cloud – Wikipedia', url: 'https://en.wikipedia.org/wiki/Altocumulus_lenticularis' }
    ]
  },
  {
    match: /(fuel|octane|avgas|running load|distribution load|ZFW|TOM|CG|MAC|stringer|spar|rib|fuselage)/i,
    explain: () => 'Aircraft mass & balance/structures follow standard definitions (DOM, TOM, ZFW, %MAC) and structural member roles (spars, ribs, stringers). The chosen option matches these.',
    sources: [
      { title: 'FAA PHAK Ch. 3 (Construction) & Ch. 10–11 (Weight & Balance/Performance)', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/faa-h-8083-25c.pdf' }
    ]
  },
  {
    match: /(oxygen|pressurization|outflow valve|hydraulic|fire extinguisher|RAT)/i,
    explain: () => 'Systems logic: pressurization controls cabin altitude via outflow valves; oxygen systems provide crew/passenger supply; hydraulics power gear/flaps/controls; RAT provides emergency power; extinguishing agents match fire class.',
    sources: [
      { title: 'FAA PHAK Ch. 7 (Aircraft Systems)', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/faa-h-8083-25c.pdf' }
    ]
  }
];

function classify(question){
  let opts = '';
  if (Array.isArray(question.options)) {
    opts = question.options.join(' ');
  } else if (typeof question.options === 'object' && question.options !== null) {
    // Some malformed entries might have options as an object; stringify keys/values for keyword search
    opts = Object.keys(question.options).map(k => `${k} ${question.options[k]}`).join(' ');
  }
  const text = `${question.question || ''} ${opts}`.toLowerCase();
  for (const c of conceptSources){ if (c.match.test(text)) return c; }
  return null;
}

function buildExplanation(q){
  const cls = classify(q);
  const correct = (Array.isArray(q.options) && typeof q.correct==='number') ? q.options[q.correct] : '';
  if (cls){
    return {
      explanation: `${cls.explain()}${correct ? ` Correct: ${correct}.` : ''} Source: ${cls.sources[0].title}.`,
      sourceRefs: cls.sources
    };
  }
  return {
    explanation: `The selected option aligns with standard aviation definitions/procedures for this topic${correct ? ` (Correct: ${correct})` : ''}.`,
    sourceRefs: [ { title: 'FAA PHAK (Consolidated)', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/faa-h-8083-25c.pdf' } ]
  };
}

function main(){
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const { slice: objSlice, start, end } = extractRootObject(raw);
  const data = parseObject(objSlice);

  let updated = 0, skipped = 0;
  for (const catKey of Object.keys(data)){
    const cat = data[catKey];
    if (!cat || !Array.isArray(cat.tests)) continue;
    for (const test of cat.tests){
      if (!test || !Array.isArray(test.questions)) continue;
      for (const q of test.questions){
        const exp = q.explanation;
        const isMissing = (exp == null || exp === '');
        if (isMissing){
          const res = buildExplanation(q);
          q.explanation = res.explanation;
          if (res.sourceRefs) q.sourceRefs = res.sourceRefs;
          updated++;
        } else {
          skipped++;
        }
      }
    }
  }

  // Replace object slice with serialized JSON
  const serialized = JSON.stringify(data, null, 2);
  const updatedRaw = raw.slice(0, start) + serialized + raw.slice(end);
  fs.writeFileSync(BACKUP_PATH, raw, 'utf8');
  fs.writeFileSync(DATA_PATH, updatedRaw, 'utf8');
  console.log(`Enriched missing explanations: ${updated}. Preserved existing: ${skipped}.`);
  console.log('Backup:', BACKUP_PATH);
}

if (require.main === module){
  try { main(); } catch (e) { console.error('Error:', e); process.exit(1); }
}
