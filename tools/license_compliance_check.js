// License compliance checker for source manifests and ad-hoc PDFs
// Usage: node tools/license_compliance_check.js [--manifest tools/question_sources.json] [--add URL] [--verbose]
// Blocks non-public-domain sources unless an explicit override ALLOW_COPYRIGHT=1 is set and user takes responsibility.
// This is a safeguard before parsing ICAO or other proprietary documents.

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let manifestPath = 'tools/question_sources.json';
let extraUrl = null;
let verbose = false;
for(let i=0;i<args.length;i++){
  const a = args[i];
  if(a==='--manifest') manifestPath = args[++i];
  else if(a==='--add') extraUrl = args[++i];
  else if(a==='--verbose') verbose = true;
}

function classify(url){
  try { const u = new URL(url); return u.hostname.toLowerCase(); } catch { return 'invalid'; }
}

// Known public-domain / permissive hosts
const PUBLIC_HOSTS = [
  'www.faa.gov', 'faa.gov',
  'www.nasa.gov','nasa.gov'
];
// Conditionally allowed with attribution (we would need CC BY-SA handling): keep out by default for MCQ generation unless we add attribution pipeline
const CC_BY_SA_HOSTS = ['en.wikipedia.org','wikipedia.org'];
// Known copyrighted (do NOT auto-fetch):
const BLOCKED_HOSTS = [
  'www.icao.int','icao.int', // ICAO publications are copyrighted and sold
  'www.skybrary.aero','skybrary.aero',
  'jeppesen.com','www.jeppesen.com'
];

function loadManifest(p){
  if(!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p,'utf8'));
}

function assessSource(src){
  const host = classify(src.url);
  let status = 'unknown';
  let reason = 'No rule matched';
  if(PUBLIC_HOSTS.includes(host)) { status='allowed'; reason='US federal publication'; }
  else if(CC_BY_SA_HOSTS.includes(host)) { status='needs-attribution'; reason='CC BY-SA requires attribution & share-alike'; }
  else if(BLOCKED_HOSTS.includes(host)) { status='blocked'; reason='Copyrighted / proprietary'; }
  else if(host==='invalid'){ status='invalid'; reason='Malformed URL'; }
  return { id: src.id||host, host, status, reason, url: src.url };
}

function main(){
  const manifest = loadManifest(manifestPath);
  if(extraUrl) manifest.push({ id: 'extra', url: extraUrl });
  const assessments = manifest.map(assessSource);
  const report = { generatedAt: new Date().toISOString(), assessments };
  const outPath = path.join(path.dirname(manifestPath), 'license_report.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  if(verbose){
    assessments.forEach(a=> console.log(`${a.id.padEnd(12)} ${a.host.padEnd(20)} ${a.status.padEnd(15)} ${a.reason}`));
  } else {
    console.log('Assessments complete. See', outPath);
  }
  const blocked = assessments.filter(a=>a.status==='blocked');
  if(blocked.length && !process.env.ALLOW_COPYRIGHT){
    console.error('\nBlocked sources detected:', blocked.map(b=>b.host).join(', '));
    console.error('Refusing to proceed. Set ALLOW_COPYRIGHT=1 ONLY if you have rights to use these documents.');
    process.exit(2);
  }
  if(assessments.some(a=>a.status==='needs-attribution')){
    console.warn('\nAttribution required for some sources (CC BY-SA). Implement attribution pipeline before using.');
  }
  console.log('License compliance check passed.');
}

if(require.main===module){
  main();
}
