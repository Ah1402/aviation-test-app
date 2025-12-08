#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const root = path.resolve(__dirname, '..');
const testDataPath = path.join(root, 'testData_complete.js');
const syncScript = path.join(root, 'tools', 'sync_testdata_to_younes.js');

if (!fs.existsSync(syncScript)) {
  console.error('Sync script not found:', syncScript);
  process.exit(1);
}

let timer = null;
function runSync() {
  console.log(new Date().toISOString(), 'Running sync...');
  const p = spawn(process.execPath, [syncScript], { stdio: 'inherit' });
  p.on('close', (code) => {
    console.log('sync exited with', code);
  });
}

if (!fs.existsSync(testDataPath)) {
  console.error('watch target not found:', testDataPath);
  process.exit(1);
}

console.log('Watching', testDataPath, 'for changes...');
// initial run
runSync();

fs.watch(testDataPath, { persistent: true }, (eventType) => {
  if (timer) clearTimeout(timer);
  // debounce
  timer = setTimeout(() => {
    console.log('Detected change:', eventType, '-> running sync');
    runSync();
  }, 250);
});
