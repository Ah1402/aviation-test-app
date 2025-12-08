#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = process.cwd();
const tdPath = path.join(repoRoot, 'testData_complete.js');

function runSync() {
  console.log(new Date().toISOString(), '- running sync...');
  const res = spawnSync(process.execPath, [path.join(repoRoot, 'tools', 'sync_testdata_to_shareable.js')], { stdio: 'inherit' });
  if (res.error) console.error('Sync failed', res.error);
}

if (!fs.existsSync(tdPath)) {
  console.error('testData_complete.js not found at', tdPath);
  process.exit(2);
}

// Run once at startup
runSync();

// Watch for changes and resync
fs.watchFile(tdPath, { interval: 500 }, (curr, prev) => {
  if (curr.mtimeMs !== prev.mtimeMs) {
    console.log(new Date().toISOString(), '- change detected in testData_complete.js');
    runSync();
  }
});

console.log('Watching', tdPath, 'for changes (ctrl+c to exit)');
