#!/usr/bin/env node
// Merge any removed_* redirect files in data/ into the id_remap_full_seq.json
// so old removed IDs are mapped to the new IDs of the kept question.

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const mapFile = path.join(dataDir, 'id_remap_full_seq.json');
const revFile = path.join(dataDir, 'id_remap_full_seq_reverse.json');

function run() {
  if (!fs.existsSync(mapFile)) {
    console.error('Mapping file not found:', mapFile); process.exit(2);
  }
  const idMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));

  const files = fs.readdirSync(dataDir).filter(f => f.startsWith('removed_') && f.endsWith('.json'));
  if (!files.length) {
    console.log('No removed_* redirect files found in data/');
    return;
  }

  for (const f of files) {
    const full = path.join(dataDir, f);
    const red = JSON.parse(fs.readFileSync(full, 'utf8'));
    for (const oldId of Object.keys(red)) {
      const keptIds = red[oldId];
      // we expect keptIds to be an array of old ids (pre-renumber)
      // map to new id(s) using idMap: pick the new ids mapped for the kept id(s)
      const newTargets = [];
      for (const k of keptIds) {
        const kKey = String(k);
        if (idMap.hasOwnProperty(kKey)) {
          idMap[oldId] = idMap[oldId] || [];
          // append every new id for k into mapping for oldId
          for (const nid of idMap[kKey]) {
            if (!idMap[oldId].includes(nid)) idMap[oldId].push(nid);
          }
        } else {
          console.warn('Kept id', kKey, 'not found in id_remap_full_seq — cannot resolve new id for removed old id', oldId);
        }
      }
      if (idMap[oldId]) console.log('Added redirect mapping for', oldId, '->', JSON.stringify(idMap[oldId]));
    }
  }

  fs.writeFileSync(mapFile, JSON.stringify(idMap, null, 2), 'utf8');
  console.log('Updated mapping file', mapFile);

  // do not modify reverse map (keep existing primary old id mapping)
}

if (require.main === module) run();
