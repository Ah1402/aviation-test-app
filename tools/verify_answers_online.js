/**
 * Verify/adjust answers using authoritative online-sourced facts (curated rules)
 * and attach verification metadata. Applies high-confidence corrections only.
 *
 * Sources encoded via citations in each rule; no proprietary content copied.
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.resolve(__dirname, '..', 'dist', 'portable_build', 'www', 'src', 'data', 'testData.js');
const BACKUP_PATH = path.resolve(__dirname, '..', 'dist', 'portable_build', 'www', 'src', 'data', `testData.answers_backup_${Date.now()}.js`);
const REPORT_JSON = path.resolve(__dirname, 'answers_online_changes.json');
const REPORT_CSV = path.resolve(__dirname, 'answers_online_changes.csv');

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

function norm(s){
  return (s||'').toString().replace(/\s+/g,' ').trim();
}
function lower(s){ return norm(s).toLowerCase(); }

function optionsArray(opt){
  if (Array.isArray(opt)) return opt;
  if (typeof opt === 'object' && opt !== null) return Object.values(opt);
  return [];
}

// Curated rule verifiers
const rules = [
  {
    id: 'density-altitude-def',
    match: q => /what is density altitude|density altitude\b/i.test(q.question),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /isa .*altitude.* (at|where).* density/i.test(o) || /altitude.* international standard atmosphere.* density/i.test(o));
      if (idx >= 0) return {
        expected: idx,
        confidence: 'high',
        sources: [
          { title: 'Density altitude – Wikipedia', url: 'https://en.wikipedia.org/wiki/Density_altitude' },
          { title: 'FAA PHAK, Ch. 11', url: 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/faa-h-8083-25c.pdf' }
        ],
        reasoning: 'Density altitude is the ISA altitude at which the ambient density would occur.'
      };
      return null;
    }
  },
  {
    id: 'standard-rate-bank',
    match: q => /rate one turn|rate 1 turn|standard rate.*angle of bank/i.test(q.question),
    evaluate: q => {
      const m = q.question.match(/(\d{2,3})\s*kt/i);
      if (!m) return null;
      const tas = parseInt(m[1],10);
      const approx = Math.round((tas/10 + 7));
      const opts = optionsArray(q.options).map(norm);
      // find numeric degree in options
      let bestIdx = -1; let bestDiff = 999;
      opts.forEach((o,i)=>{
        const dm = o.match(/(\d{1,2})\s*°/);
        if (dm){ const val = parseInt(dm[1],10); const d = Math.abs(val - approx); if (d < bestDiff){ bestDiff = d; bestIdx = i; } }
      });
      if (bestIdx >= 0) return {
        expected: bestIdx,
        confidence: bestDiff <= 1 ? 'high' : 'medium',
        sources: [
          { title: 'Standard rate turn – Wikipedia', url: 'https://en.wikipedia.org/wiki/Standard_rate_turn' }
        ],
        reasoning: `Approx φ ≈ TAS/10 + 7 => ~${approx}°.`
      };
      return null;
    }
  },
  {
    id: 'radio-altimeter-band',
    match: q => /radio altimeter.*frequency|frequency band.*radio altimeter/i.test(q.question),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      // Prefer SHF 3000 MHz - 30 GHz, or an option mentioning 4.2–4.4 GHz band implicitly in SHF
      let idx = opts.findIndex(o => /shf\b|3000\s*mhz\s*-\s*30\s*ghz/.test(o));
      if (idx < 0) idx = opts.findIndex(o => /4\.2|4\.3|4\.4\s*ghz|4\.?2\s*-\s*4\.?4\s*ghz/.test(o));
      if (idx >= 0) return {
        expected: idx,
        confidence: 'high',
        sources: [
          { title: 'Radar altimeter – Wikipedia', url: 'https://en.wikipedia.org/wiki/Radio_altimeter' }
        ],
        reasoning: 'Civil RA operates in SHF (C-band 4.2–4.4 GHz).'
      };
      return null;
    }
  },
  {
    id: 'gpws-modes',
    match: q => /which of the following are modes of the gpws/i.test(lower(q.question)),
    evaluate: q => {
      const tokens = ['sink rate','altitude loss','terrain closure','glide','too low','unsafe terrain','windshear'];
      const opts = optionsArray(q.options).map(lower);
      // Pick the option that contains most/all tokens
      let bestIdx=-1, bestScore=-1;
      opts.forEach((o,i)=>{
        let score=0; tokens.forEach(t=>{ if (o.includes(t)) score++; });
        if (score>bestScore){bestScore=score; bestIdx=i;}
      });
      if (bestIdx>=0) return {
        expected: bestIdx,
        confidence: bestScore>=5 ? 'high' : 'medium',
        sources: [ { title: 'GPWS – Wikipedia', url: 'https://en.wikipedia.org/wiki/Ground_proximity_warning_system' } ],
        reasoning: 'Modes include excessive sink rate, terrain/obstacle closure, altitude loss after takeoff, glideslope deviation, unsafe terrain clearance, bank angle, windshear.'
      };
      return null;
    }
  },
  {
    id: 'gpws-inputs',
    match: q => /inputs to the central processing unit of the gpws/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(norm);
      const desired = ['Flaps','Landing gear','Glide slope','Radio altimeter'];
      const undesired = ['VOR','Unusual attitudes'];
      let bestIdx=-1, bestScore=-1;
      opts.forEach((o,i)=>{
        let score=0; desired.forEach(t=>{ if (o.toLowerCase().includes(t.toLowerCase())) score++; });
        undesired.forEach(t=>{ if (o.toLowerCase().includes(t.toLowerCase())) score-=2; });
        if (score>bestScore){ bestScore=score; bestIdx=i; }
      });
      if (bestIdx>=0) return {
        expected: bestIdx,
        confidence: bestScore>=3 ? 'high' : 'medium',
        sources: [ { title: 'GPWS – Wikipedia', url: 'https://en.wikipedia.org/wiki/Ground_proximity_warning_system' } ],
        reasoning: 'GPWS uses RA, configuration (flaps/gear), and glideslope inputs; VOR/attitudes are not core inputs.'
      };
      return null;
    }
  },
  {
    id: 'turn-slip-needle-ball',
    match: q => /turn and slip|needle.*ball/i.test(lower(q.question)),
    evaluate: q => {
      const ql = lower(q.question);
      if (/(needle.*left).*(ball.*right)/.test(ql)){
        const opts = optionsArray(q.options).map(lower);
        const idx = opts.findIndex(o => /left turn.*not enough bank|left turn.*too little bank/.test(o));
        if (idx>=0) return {
          expected: idx,
          confidence: 'high',
          sources: [ { title: 'Turn and slip indicator – Wikipedia', url: 'https://en.wikipedia.org/wiki/Turn_and_slip_indicator' } ],
          reasoning: 'Needle shows turn; ball opposite indicates insufficient bank (slip).'
        };
      }
      return null;
    }
  },
  {
    id: 'fail-active',
    match: q => /what is another name for fail.?active/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /fail.?operational/.test(o));
      if (idx>=0) return {
        expected: idx,
        confidence: 'high',
        sources: [ { title: 'Autoland – Wikipedia (fail-operational)', url: 'https://en.wikipedia.org/wiki/Autoland' } ],
        reasoning: 'Fail-active equals fail-operational.'
      };
      return null;
    }
  }
  ,
  // Radio/navigation frequency bands
  {
    id: 'vor-band',
    match: q => /frequency.*(vor|v\.o\.r\.)/i.test(q.question),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /108(\.\d+)?\s*[-–]\s*117(\.\d+)?\s*mhz|vhf/.test(o));
      if (idx>=0) return {
        expected: idx,
        confidence: 'high',
        sources: [ { title: 'VHF omnidirectional range – Wikipedia', url: 'https://en.wikipedia.org/wiki/VHF_omnidirectional_range' } ],
        reasoning: 'VOR operates in VHF 108.00–117.95 MHz.'
      };
      return null;
    }
  },
  {
    id: 'dme-band',
    match: q => /frequency.*dme/i.test(q.question),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /962\s*[-–]\s*1213\s*mhz|uhf|l\s*-?band/.test(o));
      if (idx>=0) return {
        expected: idx,
        confidence: 'high',
        sources: [ { title: 'Distance measuring equipment – Wikipedia', url: 'https://en.wikipedia.org/wiki/Distance_measuring_equipment' } ],
        reasoning: 'DME uses UHF L-band 962–1213 MHz.'
      };
      return null;
    }
  },
  {
    id: 'ils-glideslope-band',
    match: q => /(glide ?slope|g\/?s)\b.*frequency|frequency.*glide ?slope/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /329\.?\d?\s*[-–]\s*335\.?\d?\s*mhz|uhf/.test(o));
      if (idx>=0) return {
        expected: idx,
        confidence: 'high',
        sources: [ { title: 'Instrument landing system – Wikipedia', url: 'https://en.wikipedia.org/wiki/Instrument_landing_system' } ],
        reasoning: 'ILS glideslope uses UHF 329.3–335.0 MHz.'
      };
      return null;
    }
  },
  {
    id: 'ils-localizer-band',
    match: q => /locali[sz]er.*frequency|frequency.*locali[sz]er/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /108(\.\d+)?\s*[-–]\s*111(\.\d+)?\s*mhz|vhf/.test(o));
      if (idx>=0) return {
        expected: idx,
        confidence: 'high',
        sources: [ { title: 'Instrument landing system – Wikipedia', url: 'https://en.wikipedia.org/wiki/Instrument_landing_system' } ],
        reasoning: 'ILS localizer uses VHF 108.10–111.95 MHz.'
      };
      return null;
    }
  },
  {
    id: 'marker-beacon-band',
    match: q => /marker beacon.*frequency|frequency.*marker/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /75\s*mhz/.test(o));
      if (idx>=0) return { expected: idx, confidence: 'high', sources: [ { title: 'Marker beacon – Wikipedia', url: 'https://en.wikipedia.org/wiki/Marker_beacon' } ], reasoning: 'Marker beacons use 75 MHz.' };
      return null;
    }
  },
  {
    id: 'ndb-band',
    match: q => /ndb.*frequency|frequency.*ndb|non-?directional beacon/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /190\s*[-–]\s*1750\s*khz|lf|mf/.test(o));
      if (idx>=0) return { expected: idx, confidence: 'high', sources: [ { title: 'Non-directional beacon – Wikipedia', url: 'https://en.wikipedia.org/wiki/Non-directional_beacon' } ], reasoning: 'NDB operates in LF/MF 190–1750 kHz.' };
      return null;
    }
  },
  {
    id: 'gps-l1',
    match: q => /gps.*frequency|frequency.*gps|gnss.*frequency/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /1575\.42\s*mhz|l1/.test(o));
      if (idx>=0) return { expected: idx, confidence: 'high', sources: [ { title: 'GPS signals – Wikipedia', url: 'https://en.wikipedia.org/wiki/GPS_signals' } ], reasoning: 'Civil GPS L1 at 1575.42 MHz.' };
      return null;
    }
  },
  // Altimetry Q codes
  {
    id: 'qnh-def',
    match: q => /what is qnh|qnh is/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /sea level pressure|altitude above mean sea level|msl/i.test(o));
      if (idx>=0) return { expected: idx, confidence: 'high', sources: [ { title: 'Altimeter setting – Wikipedia', url: 'https://en.wikipedia.org/wiki/Altimeter_setting' } ], reasoning: 'QNH sets sea-level pressure to read altitude above MSL.' };
      return null;
    }
  },
  {
    id: 'qfe-def',
    match: q => /what is qfe|qfe is/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /airfield|runway|threshold.*elevation.*zero|height above/i.test(o));
      if (idx>=0) return { expected: idx, confidence: 'high', sources: [ { title: 'Altimeter setting – Wikipedia', url: 'https://en.wikipedia.org/wiki/Altimeter_setting' } ], reasoning: 'QFE sets local airfield pressure so altimeter reads height above field.' };
      return null;
    }
  },
  {
    id: 'qne-def',
    match: q => /what is qne|qne is/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /1013|29\.92|standard.*pressure|flight level/i.test(o));
      if (idx>=0) return { expected: idx, confidence: 'high', sources: [ { title: 'Altimeter setting – Wikipedia', url: 'https://en.wikipedia.org/wiki/Altimeter_setting' } ], reasoning: 'QNE refers to standard pressure (1013.25 hPa / 29.92 inHg) for flight levels.' };
      return null;
    }
  },
  // ISA values
  {
    id: 'isa-sea-level-temp',
    match: q => /isa.*sea level.*temperature|sea level temperature.*isa/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /15\s*°?c|288\.15\s*k/.test(o));
      if (idx>=0) return { expected: idx, confidence: 'high', sources: [ { title: 'International Standard Atmosphere – Wikipedia', url: 'https://en.wikipedia.org/wiki/International_Standard_Atmosphere' } ], reasoning: 'ISA sea-level temperature is 15 °C (288.15 K).' };
      return null;
    }
  },
  {
    id: 'isa-sea-level-pressure',
    match: q => /isa.*sea level.*pressure|sea level pressure.*isa/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /1013(\.25)?\s*hpa|29\.92\s*in ?hg/.test(o));
      if (idx>=0) return { expected: idx, confidence: 'high', sources: [ { title: 'International Standard Atmosphere – Wikipedia', url: 'https://en.wikipedia.org/wiki/International_Standard_Atmosphere' } ], reasoning: 'ISA sea-level pressure is 1013.25 hPa (29.92 inHg).' };
      return null;
    }
  },
  // Transponder
  {
    id: 'xpdr-frequency',
    match: q => /transponder.*frequency|frequency.*transponder|mode[ -]?s.*frequency/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      const idx = opts.findIndex(o => /1090\s*mhz/.test(o));
      if (idx>=0) return { expected: idx, confidence: 'high', sources: [ { title: 'Secondary surveillance radar – Wikipedia', url: 'https://en.wikipedia.org/wiki/Secondary_surveillance_radar' } ], reasoning: 'SSR replies on 1090 MHz.' };
      return null;
    }
  },
  // ELT
  {
    id: 'elt-frequency',
    match: q => /elt.*frequency|emergency locator.*frequency/i.test(lower(q.question)),
    evaluate: q => {
      const opts = optionsArray(q.options).map(lower);
      let idx = opts.findIndex(o => /406\s*mhz/.test(o));
      if (idx<0) idx = opts.findIndex(o => /121\.5\s*mhz/.test(o));
      if (idx>=0) return { expected: idx, confidence: 'high', sources: [ { title: 'Emergency position-indicating radio beacon – Wikipedia', url: 'https://en.wikipedia.org/wiki/Emergency_position-indicating_radiobeacon_station' } ], reasoning: 'Modern ELTs use 406 MHz; 121.5 MHz legacy/homing.' };
      return null;
    }
  }
];

function verifyQuestion(q){
  const text = lower(q.question || '');
  for (const rule of rules){
    try{
      if (rule.match(q)){
        const res = rule.evaluate(q);
        if (res) return { rule: rule.id, ...res };
      }
    }catch(e){ /* continue */ }
  }
  return null;
}

function main(){
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const { slice: objSlice, start, end } = extractRootObject(raw);
  const data = parseObject(objSlice);

  const changes = [];
  const csvRows = [
    'category,test,q_index,original_correct_letter,new_correct_letter,original_text,new_text,rule,confidence,sources,reasoning'
  ];

  const now = new Date().toISOString();
  let updated=0, checked=0;
  for (const catKey of Object.keys(data)){
    const cat = data[catKey];
    if (!cat || !Array.isArray(cat.tests)) continue;
    for (const test of cat.tests){
      if (!test || !Array.isArray(test.questions)) continue;
      test.questions.forEach((q, idx) => {
        checked++;
        const res = verifyQuestion(q) || null;
        const opts = optionsArray(q.options);
        const originalCorrect = typeof q.correct==='number'? q.correct : null;
        const originalLetter = originalCorrect!=null? String.fromCharCode(65+originalCorrect): '';
        if (res){
          // attach verification metadata
          q.answerVerified = true;
          q.answerConfidence = res.confidence;
          q.answerSources = res.sources;
          q.answerReasoning = res.reasoning;
          q.lastChecked = now;
          if (typeof res.expected==='number' && res.expected !== originalCorrect && res.confidence==='high'){
            // apply correction
            q.correct = res.expected;
            updated++;
          }
          const newLetter = typeof q.correct==='number'? String.fromCharCode(65+q.correct): '';
          const origText = (opts[originalCorrect] != null)? norm(opts[originalCorrect]) : '';
          const newText = (opts[q.correct] != null)? norm(opts[q.correct]) : '';
          const srcStr = (res.sources||[]).map(s=>s.title).join(' | ');
          csvRows.push([
            JSON.stringify(cat.name || catKey),
            JSON.stringify(test.name || ''),
            idx+1,
            originalLetter,
            newLetter,
            JSON.stringify(origText),
            JSON.stringify(newText),
            res.rule,
            res.confidence,
            JSON.stringify(srcStr),
            JSON.stringify(res.reasoning)
          ].join(','));
          changes.push({category: cat.name||catKey, test: test.name||'', index: idx+1, rule: res.rule, from: originalCorrect, to: q.correct, confidence: res.confidence, sources: res.sources, reasoning: res.reasoning});
        } else {
          // mark as checked but unknown
          q.answerVerified = q.answerVerified || false;
          q.lastChecked = now;
        }
      });
    }
  }

  // Write report
  fs.writeFileSync(REPORT_JSON, JSON.stringify({updated, checked, changes}, null, 2), 'utf8');
  fs.writeFileSync(REPORT_CSV, csvRows.join('\n'), 'utf8');

  // Persist data
  const serialized = JSON.stringify(data, null, 2);
  const updatedRaw = raw.slice(0, start) + serialized + raw.slice(end);
  fs.writeFileSync(BACKUP_PATH, raw, 'utf8');
  fs.writeFileSync(DATA_PATH, updatedRaw, 'utf8');

  console.log(`Checked: ${checked}. High-confidence updates applied: ${updated}.`);
  console.log('Reports:', REPORT_JSON, 'and', REPORT_CSV);
  console.log('Backup:', BACKUP_PATH);
}

if (require.main === module){
  try { main(); } catch (e) { console.error('Error:', e); process.exit(1); }
}
