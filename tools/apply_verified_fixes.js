const fs=require('fs');

function extractTestDataJSON(content){
  const startMatch = content.match(/const testData = /);
  if(!startMatch) throw new Error('testData start not found');
  const startPos = startMatch.index + startMatch[0].length;
  let brace=0,endPos=startPos,inString=false,esc=false,strChar=null;
  for(let i=startPos;i<content.length;i++){
    const ch=content[i];
    if(esc){esc=false;continue;}
    if(ch==='\\'){esc=true;continue;}
    if((ch==='"'||ch==="'")&&!esc){
      if(!inString){inString=true;strChar=ch;}
      else if(ch===strChar){inString=false;strChar=null;}
      continue;
    }
    if(inString) continue;
    if(ch==='{' ){brace++;}
    else if(ch==='}'){brace--; if(brace===0){ endPos=i+1; break; }}
  }
  return { startIndex: startMatch.index, startPos, endPos, json: content.substring(startPos,endPos) };
}

function loadTestData(){
  const content = fs.readFileSync('src/data/testData.js','utf8');
  const { json } = extractTestDataJSON(content);
  return JSON.parse(json);
}

function writeTestData(updated){
  const original = fs.readFileSync('src/data/testData.js','utf8');
  const { startIndex, endPos } = extractTestDataJSON(original);
  const header = original.substring(0, startIndex);
  const newJson = JSON.stringify(updated, null, 2);
  const newContent = header + 'const testData = ' + newJson + ';\n\nexport default testData';
  fs.writeFileSync('src/data/testData.js', newContent);
}

function main(){
  const report = JSON.parse(fs.readFileSync('tools/answer_verification_report.json','utf8'));
  const td = loadTestData();
  const original = fs.readFileSync('src/data/testData.js','utf8');
  const backup='testData_backup_autofix_'+new Date().toISOString().replace(/[:.]/g,'-')+'.js';
  fs.writeFileSync(backup, original);

  let applied=0;
  report.mismatches.forEach(m=>{
    const cat = td[m.category];
    if(!cat || !cat.tests || !cat.tests[m.testIndex] || !cat.tests[m.testIndex].questions[m.questionIndex]) return;
    cat.tests[m.testIndex].questions[m.questionIndex].correct = m.authoritativeCorrect;
    applied++;
  });

  writeTestData(td);
  console.log('Auto-fix applied answers:', applied);
  console.log('Backup saved to', backup);
}

main();