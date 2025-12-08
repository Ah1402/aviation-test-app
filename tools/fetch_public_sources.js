// Download public-domain FAA PDF sources listed in tools/question_sources.json into data/sources
// Usage: node tools/fetch_public_sources.js
// Creates: data/sources/<id>.pdf and a manifest data/sources/download_manifest.json

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const SOURCES_JSON = path.join(__dirname, 'question_sources.json');
const OUT_DIR = path.join(ROOT, 'data', 'sources');
const MANIFEST_PATH = path.join(OUT_DIR, 'download_manifest.json');

function ensureDir(p){ if(!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

function loadSources(){
  if(!fs.existsSync(SOURCES_JSON)) throw new Error('question_sources.json not found');
  return JSON.parse(fs.readFileSync(SOURCES_JSON, 'utf8'));
}

function download(url, dest){
  return new Promise((resolve, reject)=>{
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if(res.statusCode !== 200){
        file.close();
        fs.unlink(dest, ()=>{});
        return reject(new Error('HTTP '+res.statusCode+' for '+url));
      }
      res.pipe(file);
      file.on('finish', ()=> file.close(()=> resolve()));
    }).on('error', err => {
      file.close();
      fs.unlink(dest, ()=>{});
      reject(err);
    });
  });
}

async function main(){
  ensureDir(OUT_DIR);
  const sources = loadSources();
  const manifest = fs.existsSync(MANIFEST_PATH) ? JSON.parse(fs.readFileSync(MANIFEST_PATH,'utf8')) : { downloaded: {} };
  for(const src of sources){
    const pdfPath = path.join(OUT_DIR, src.id + '.pdf');
    if(fs.existsSync(pdfPath)){
      console.log('✓ Already downloaded', src.id);
      continue;
    }
    console.log('↓ Downloading', src.id, 'from', src.url);
    try {
      await download(src.url, pdfPath);
      manifest.downloaded[src.id] = { path: pdfPath, url: src.url, ts: new Date().toISOString() };
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
      console.log('✓ Saved', pdfPath);
    } catch(e){
      console.error('✗ Failed', src.id, e.message);
    }
  }
  console.log('\nDownload complete. Manifest at', MANIFEST_PATH);
}

if(require.main === module){
  main().catch(e=>{ console.error('Fatal:', e); process.exit(1); });
}
