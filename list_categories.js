const fs = require('fs');
const path = require('path');

function readTestData(filePath, encoding='utf8'){
  const content = fs.readFileSync(filePath, encoding);
  const start = content.indexOf('window.testData');
  const objStart = content.indexOf('{', start);
  let brace = 0; let endIdx = -1;
  for (let i = objStart; i < content.length; i++){
    if (content[i] === '{') brace++;
    else if (content[i] === '}'){
      brace--; if (brace === 0){ endIdx = i; break; }
    }
  }
  const objStr = content.substring(objStart, endIdx+1);
  return eval('(' + objStr + ')');
}

const tdPath = path.join(process.cwd(), 'testData_complete.js');
const data = readTestData(tdPath, 'utf8');
const res = Object.keys(data).map(k => {
  const cat = data[k];
  const qcount = (cat.tests||[]).reduce((s,t)=> s + ((t.questions||[]).length), 0);
  return { key: k, name: cat.name||'', tests: (cat.tests||[]).length, questions: qcount };
});
console.log(JSON.stringify(res, null, 2));
