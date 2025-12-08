#!/usr/bin/env node
// tools/sync_and_renumber.js
// Safe synchronizer: copy IDs from a canonical source to target files
// Supports optional canonical renumbering (global renumber mode) and dry-run.

const fs = require('fs');
const path = require('path');

function usage() {
  console.log(`Usage: node tools/sync_and_renumber.js --source <canonical-file> --targets <comma-separated-list> [--renumber] [--apply] [--backup]
  --source     path to canonical source (default: testData_complete.js)
  --targets    comma separated paths to target files (default: src/data/testData_complete.js,924.html)
  --renumber   renumber canonical sequentially and apply same mapping to targets (global renumber)
  --apply      actually write changes to files (default: dry-run)
  --backup     make timestamped backups before modifying target files (default: true when --apply)
`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { source: 'testData_complete.js', targets: ['src/data/testData_complete.js','924.html'], renumber: false, apply: false, backup: true };
  for (let i=0;i<args.length;i++){
    const a = args[i];
    if (a === '--source') out.source = args[++i];
    else if (a === '--targets') out.targets = args[++i].split(',').map(s=>s.trim()).filter(Boolean);
    else if (a === '--renumber') out.renumber = true;
    else if (a === '--apply') out.apply = true;
    else if (a === '--backup') out.backup = true;
    else if (a === '--no-backup') out.backup = false;
    else if (a === '-h' || a === '--help') { usage(); process.exit(0);} 
    else { console.error('Unknown arg', a); usage(); process.exit(1);} 
  }
  return out;
}

function findIds(text) {
  const re = /(\"id\"\s*:\s*)(\d+)(?=\s*[,\n])/g;
  const ids = [];
  let m;
  while ((m = re.exec(text))!==null) {
    ids.push({ start: m.index, len: m[2].length, value: parseInt(m[2],10) });
  }
  return ids;
}

function backupFile(filepath) {
  const t = new Date().toISOString().replace(/[:.]/g,'_');
  const dest = filepath + '.bak.' + t;
  fs.copyFileSync(filepath,dest);
  return dest;
}

function applyMappingToText(text, mapping) {
  // mapping: object of oldId->newId (both numbers)
  // Replace only "id": <old> occurrences for old in mapping
  const re = /(\"id\"\s*:\s*)(\d+)(?=\s*[,\n])/g;
  return text.replace(re, (full, prefix, numStr) => {
    const num = parseInt(numStr,10);
    if (Object.prototype.hasOwnProperty.call(mapping, num)) {
      return prefix + mapping[num];
    }
    return full;
  });
}

function renumberCanonicalAndBuildMapping(text) {
  // renumber every occurrence of "id": <number> in-order to sequence starting 1
  const ids = findIds(text);
  const mapping = {};
  let counter = 1;
  for (const item of ids) {
    const oldId = item.value;
    if (!Object.prototype.hasOwnProperty.call(mapping, oldId)) {
      mapping[oldId] = counter++; // assign new
    }
  }
  const newText = applyMappingToText(text, mapping);
  return { mapping, newText };
}

function buildMappingFromCanonical(text) {
  // If not renumbering: mapping is identity for canonical ids (old->old) so targets are unchanged
  const ids = findIds(text);
  const mapping = {};
  for (const item of ids) mapping[item.value] = item.value;
  return mapping;
}

function main(){
  const opts = parseArgs();
  console.log('Options:', opts);

  // read canonical
  if (!fs.existsSync(opts.source)) { console.error('source not found:', opts.source); process.exit(2);} 
  const srcText = fs.readFileSync(opts.source,'utf8');

  let mapping; let canonNewText=null;
  if (opts.renumber) {
    const res = renumberCanonicalAndBuildMapping(srcText);
    mapping = res.mapping;
    canonNewText = res.newText;
    console.log('Canonical renumbering will map', Object.keys(mapping).length, 'IDs');
  } else {
    mapping = buildMappingFromCanonical(srcText);
    console.log('No renumbering; mapping length', Object.keys(mapping).length);
  }

  // Show a short preview of mapping (first 20)
  const pairs = Object.entries(mapping).slice(0,20).map(([o,n])=>`${o}->${n}`);
  console.log('Sample mapping:', pairs.join(', '));

  // If canonical is to be written
  if (opts.renumber && opts.apply) {
    if (opts.backup) {
      console.log('Backing up canonical', opts.source);
      console.log('backup created:', backupFile(opts.source));
    }
    fs.writeFileSync(opts.source, canonNewText, 'utf8');
    console.log('Canonical file updated:', opts.source);
  } else if (opts.renumber) {
    console.log('Dry-run: canonical WOULD be rewritten if --apply used.');
  }

  // Process targets
  for (const t of opts.targets) {
    if (!fs.existsSync(t)) { console.warn('target not found, skipping:', t); continue; }
    const targetText = fs.readFileSync(t,'utf8');
    // We'll apply mapping only for keys present in mapping
    const newText = applyMappingToText(targetText, mapping);
    if (newText === targetText) {
      console.log(`No changes required for target ${t}`);
      continue;
    }
    console.log(`Target ${t} WOULD be updated (changed).`);
    if (opts.apply) {
      if (opts.backup) {
        console.log('Backing up target', t);
        console.log('backup created:', backupFile(t));
      }
      fs.writeFileSync(t,newText,'utf8');
      console.log('Updated target:', t);
    }
  }

  console.log('\nDone. Use --apply to write changes (backups created when --apply).');
}

if (require.main === module) main();
