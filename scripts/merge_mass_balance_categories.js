#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const filePath = path.join(root, 'testData_complete.js');
const dataDir = path.join(root, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

function readTestData(src){
  const content = fs.readFileSync(src,'utf8');
  return JSON.parse(content.replace(/^\s*window\.testData\s*=\s*/,'').trim().replace(/;$/,''));
}

function backup(src){
  const ts = new Date().toISOString().replace(/[:.]/g,'-');
  const dst = src + '.bak.merge.' + ts;
  fs.copyFileSync(src, dst);
  return dst;
}

function run(){
  console.log('Reading', filePath);
  const data = readTestData(filePath);

  if (!data['mass-balance']) { console.log('No mass-balance category present; nothing to merge.'); return; }
  if (!data['mass-and-balance']) { console.log('No mass-and-balance category present; nothing to merge.'); return; }

  const bak = backup(filePath);
  console.log('Backup created:', bak);

  // Move all tests from mass-balance into mass-and-balance
  const srcCat = data['mass-balance'];
  const destCat = data['mass-and-balance'];

  // For each test in srcCat, if a test with same id exists in destCat, merge questions (avoid duplicates), else append test
  for (const test of srcCat.tests || []){
    const existing = destCat.tests.find(t => t.id === test.id);
    if (existing){
      // merge questions, avoid identical question text duplicates
      const existingQs = existing.questions || [];
      const qTexts = new Set(existingQs.map(q=> (q.question||'').replace(/\s+/g,' ').trim()));
      for (const q of test.questions || []){
        const text = (q.question||'').replace(/\s+/g,' ').trim();
        if (!qTexts.has(text)){
          // normalize category field inside question so it matches destination test id
          q.category = existing.id;
          existingQs.push(q);
          qTexts.add(text);
        }
      }
      existing.questions = existingQs;
    } else {
      // adjust category in questions to dest test ids pattern if needed
      const newTest = JSON.parse(JSON.stringify(test));
      newTest.questions = (newTest.questions||[]).map(q=> { q.category = newTest.id; return q; });
      destCat.tests.push(newTest);
    }
  }

  // Remove the source category
  delete data['mass-balance'];

  // Save modified file
  fs.writeFileSync(filePath, 'window.testData = ' + JSON.stringify(data, null, 2) + ';\n','utf8');
  console.log('Merged mass-balance into mass-and-balance and removed mass-balance');
}

if(require.main === module) run();
