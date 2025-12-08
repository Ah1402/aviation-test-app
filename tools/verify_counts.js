// Verify structure, counts, and option sanitation
const path = require('path');
const dataPath = path.join(process.cwd(), 'www', 'src', 'data', 'testData.js');
const data = require(dataPath);

function countAll(d){
  const cats = Object.keys(d);
  let tests = 0, questions = 0;
  cats.forEach(k => {
    const cat = d[k] || {};
    (cat.tests||[]).forEach(t => {
      tests++;
      questions += (t.questions||[]).length;
    });
  });
  return { categories: cats.length, tests, questions };
}

function findOptionContamination(d){
  const hits = [];
  Object.entries(d).forEach(([catKey, cat]) => {
    (cat.tests||[]).forEach(test => {
      (test.questions||[]).forEach((q, qi) => {
        const opts = Array.isArray(q.options) ? q.options : [];
        opts.forEach((opt, oi) => {
          if (typeof opt === 'string' && /Correct Answer:/i.test(opt)) {
            hits.push({catKey, testName: test.name, qi, oi, opt: opt.slice(0,120)});
          }
        });
      });
    });
  });
  return hits;
}

function main(){
  const totals = countAll(data);
  const hits = findOptionContamination(data);

  console.log(JSON.stringify({ totals, optionContaminationCount: hits.length, sample: hits.slice(0,5) }, null, 2));
}

main();
