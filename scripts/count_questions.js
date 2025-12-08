const fs = require('fs');
const content = fs.readFileSync('testData_complete.js','utf8');
const dataStr = content.replace(/^\s*window\.testData\s*=\s*/,'').trim().replace(/;$/,'');
const data = JSON.parse(dataStr);
let total = 0; let catCounts = {};
for(const cat in data){
  let catTotal = 0;
  (data[cat].tests||[]).forEach(test=>{ catTotal += (test.questions||[]).length; });
  catCounts[cat] = catTotal;
  total += catTotal;
}
console.log('Total questions in testData_complete.js:', total);
console.log('Per category counts:', JSON.stringify(catCounts,null,2));
