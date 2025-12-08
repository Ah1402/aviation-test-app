const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'SHAREABLE_STANDALONE.html');
const txt = fs.readFileSync(file, 'utf8');
const marker = 'const testData =';
const i = txt.indexOf(marker);
if (i === -1) {
  console.error('testData block not found');
  process.exit(2);
}
const jsStart = txt.indexOf('{', i);
let level = 0, end = -1;
for (let k = jsStart; k < txt.length; k++) {
  if (txt[k] === '{') level++; else if (txt[k] === '}') { level--; if (level === 0) { end = k; break; } }
}
if (end === -1) { console.error('Could not find end of testData object'); process.exit(2); }
const objText = txt.slice(jsStart, end+1);
let obj;
try { obj = JSON.parse(objText); } catch (e) { console.error('JSON parse error:', e.message); process.exit(2); }
const categories = Object.keys(obj);
let totalQuestions = 0;
categories.forEach(cat => { (obj[cat].tests||[]).forEach(t => { totalQuestions += (t.questions||[]).length }) });
console.log('Embedded counts: categories=', categories.length, 'questions=', totalQuestions);

// Simulate augmentCategories logic specifically for radio-navigation
(function simulateAugment(){
  const data = JSON.parse(JSON.stringify(obj));
  const rnKey = 'radio-navigation';
  function match(s){
    const txt = (s||'').toString().toLowerCase();
    return [
      'vor','dme','vortac','tacan','ils','localizer','glide slope','marker beacon','ndb','adf','rnav','gps','rnp','vhf omnidirectional','radial ','bearing to','track to vor',' backcourse',' loc '
    ].some(k=>txt.includes(k));
  }
  const seen = new Set();
  const collected = [];
  if (!data[rnKey]) data[rnKey] = { name: 'Radio Navigation', icon: 'fas fa-broadcast-tower', tests: [] };
  if (Array.isArray(data[rnKey].tests)) {
    data[rnKey].tests.forEach(t => (t.questions||[]).forEach(q => { const key=(q.question||'').trim(); if (key && !seen.has(key)) { seen.add(key); collected.push(q); } }));
  }
  Object.entries(data).forEach(([catKey, cat])=>{
    if (catKey === rnKey) return;
    (cat.tests||[]).forEach(test=>{
      (test.questions||[]).forEach(q=>{
        const qKey = (q.question||'').trim();
        if (!qKey || seen.has(qKey)) return;
        const hay = `${q.question}\n${(q.options||[]).join(' ')}\n${q.explanation||''}`;
        if (match(hay)) { seen.add(qKey); collected.push(q); }
      })
    })
  })
  console.log('radio-navigation collected questions:', collected.length);
  if (collected.length >= 10) {
    // would create tests in radio-navigation
    console.log('augmentCategories would add radio-navigation and chunk into', Math.ceil(collected.length/50), 'tests');
  } else {
    console.log('augmentCategories would NOT modify radio-navigation (collected < 10)');
  }
})();
