#!/usr/bin/env node
/*
 Generates concise explanations for correct answers using Google Gemini REST API.
 Usage:
   node tools/generate_explanations_gemini.js [--overwrite] [--dry-run]
 Requires env GOOGLE_API_KEY.
*/

const fs = require('fs');
const https = require('https');

const OVERWRITE = process.argv.includes('--overwrite');
const DRY_RUN = process.argv.includes('--dry-run');

function extractTestDataJSON(content){
  const startMatch = content.match(/const testData = /);
  if(!startMatch) throw new Error('testData start not found');
  const startPos = startMatch[0].length + startMatch.index;
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
  const meta = extractTestDataJSON(content);
  return { obj: JSON.parse(meta.json), raw: content, meta };
}

function writeTestData(updatedObj, original, meta){
  const header = original.substring(0, meta.startIndex);
  const newJson = JSON.stringify(updatedObj, null, 2);
  const newContent = header + 'const testData = ' + newJson + ';\n\nexport default testData';
  fs.writeFileSync('src/data/testData.js', newContent);
}

function buildPrompt(q){
  const letter = String.fromCharCode(65 + (q.correct ?? 0));
  const opts = q.options.map((o,i)=> `${String.fromCharCode(65+i)}. ${o}`).join('\n');
  return `You are an aviation theory instructor. Explain why the correct answer is ${letter} for the following multiple-choice question. Be concise (2-4 sentences), reference the key principle or calculation, and avoid mentioning other options unless needed. If a calculation is involved, show the formula and a quick numeric example.\n\nQuestion:\n${q.question}\n\nOptions:\n${opts}\n\nCorrect answer: ${letter}`;
}

function callGeminiAPI(prompt, apiKey){
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }]
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`API returned ${res.statusCode}: ${data}`));
          return;
        }
        try {
          const parsed = JSON.parse(data);
          const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
          if(!text) reject(new Error('No text in response'));
          else resolve(text.trim());
        } catch(e){ reject(e); }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function generateExplanation(q, apiKey){
  const prompt = buildPrompt(q);
  const text = await callGeminiAPI(prompt, apiKey);
  return text.replace(/^```[a-z]*\n?|```$/g, '').trim();
}

async function main(){
  const apiKey = process.env.GOOGLE_API_KEY;
  if(!apiKey) throw new Error('Missing GOOGLE_API_KEY. Set it in your environment.');

  console.log('Loading testData...');
  const { obj: testData, raw, meta } = loadTestData();

  // Count total + missing explanations
  let total=0;
  const targets=[];
  for(const catKey of Object.keys(testData)){
    const cat = testData[catKey];
    if(!cat.tests) continue;
    cat.tests.forEach((t,ti)=>{
      (t.questions||[]).forEach((q,qi)=>{
        total++;
        const has = q.explanation && q.explanation.trim().length>0;
        if(!has || OVERWRITE){
          targets.push({catKey, ti, qi});
        }
      });
    });
  }
  console.log(`Questions: ${total}. To generate: ${targets.length} (${OVERWRITE?'overwrite enabled':'missing only'}).`);

  if(DRY_RUN){
    console.log('Dry-run complete. No changes made.');
    return;
  }

  const backup = 'testData_backup_explanations_'+new Date().toISOString().replace(/[:.]/g,'-')+'.js';
  fs.writeFileSync(backup, raw);
  console.log('Backup saved to', backup);

  // Progress log
  const progressPath = 'tools/explanations_progress.json';
  let progress = fs.existsSync(progressPath) ? JSON.parse(fs.readFileSync(progressPath,'utf8')) : {};

  let done=0, failures=0;
  for(const ref of targets){
    const key = `${ref.catKey}/${ref.ti}/${ref.qi}`;
    if(progress[key] && progress[key].status==='ok') { done++; continue; }

    const q = testData[ref.catKey].tests[ref.ti].questions[ref.qi];
    try{
      const expl = await generateExplanation(q, apiKey);
      testData[ref.catKey].tests[ref.ti].questions[ref.qi].explanation = expl;
      progress[key] = { status:'ok' };
      done++;
      if(done % 10 === 0){
        writeTestData(testData, raw, meta);
        fs.writeFileSync(progressPath, JSON.stringify(progress,null,2));
        console.log(`Saved progress at ${done}/${targets.length}`);
      }
    }catch(err){
      failures++;
      progress[key] = { status:'fail', error: String(err.message||err) };
      console.error('Failed for', key, err.message||err);
      // Gentle delay after error
      await new Promise(r=>setTimeout(r, 1500));
    }
    // Rate limit
    await new Promise(r=>setTimeout(r, 400));
  }

  // Final write
  writeTestData(testData, raw, meta);
  fs.writeFileSync(progressPath, JSON.stringify(progress,null,2));
  console.log(`\nDone. Explanations generated: ${done - failures}. Failures: ${failures}.`);
}

main().catch(err=>{
  console.error('Fatal:', err.message||err);
  process.exit(1);
});
