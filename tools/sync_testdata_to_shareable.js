#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function extractAssignedObject(source, anchor) {
  const idx = source.indexOf(anchor);
  if (idx === -1) return null;
  const eq = source.indexOf('=', idx);
  if (eq === -1) return null;
  const start = source.indexOf('{', eq);
  if (start === -1) return null;

  let depth = 0;
  let end = -1;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) return null;
  return source.slice(eq + 1, end + 1).trim();
}

function removeAllAssignedObjects(source, anchor) {
  let s = source;
  while (true) {
    const idx = s.indexOf(anchor);
    if (idx === -1) break;
    const eq = s.indexOf('=', idx);
    if (eq === -1) break;
    const start = s.indexOf('{', eq);
    if (start === -1) break;

    let depth = 0;
    let end = -1;
    for (let i = start; i < s.length; i++) {
      const ch = s[i];
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) { end = i; break; }
      }
    }
    if (end === -1) break;

    // Remove from anchor start to end+1 and trailing semicolon if present
    let removeEnd = end + 1;
    // consume following semicolon and optional whitespace/newline
    while (removeEnd < s.length && /[;\s\r\n]/.test(s[removeEnd])) removeEnd++;
    s = s.slice(0, idx) + s.slice(removeEnd);
  }
  return s;
}

function insertAssignmentInShare(source, anchorComment, assignmentText) {
  // Try to locate main.js comment to insert before that script
  const commentIdx = source.indexOf(anchorComment);
  if (commentIdx !== -1) {
    // find <script> start before the comment (search backwards)
    const scriptStart = source.lastIndexOf('<script', commentIdx);
    if (scriptStart !== -1) {
      return source.slice(0, scriptStart) + '<script>\n' + assignmentText + '\n</script>\n' + source.slice(scriptStart);
    }
  }

  // Fallback: insert before closing </head> if present
  const headClose = source.indexOf('</head>');
  if (headClose !== -1) {
    return source.slice(0, headClose) + '<script>\n' + assignmentText + '\n</script>\n' + source.slice(headClose);
  }

  // Final fallback: insert after opening <body>
  const bodyOpen = source.indexOf('<body');
  if (bodyOpen !== -1) {
    const afterBody = source.indexOf('>', bodyOpen);
    if (afterBody !== -1) {
      return source.slice(0, afterBody + 1) + '\n<script>\n' + assignmentText + '\n</script>\n' + source.slice(afterBody + 1);
    }
  }

  // If nothing found, prepend
  return '<script>\n' + assignmentText + '\n</script>\n' + source;
}

function backupFile(filePath) {
  try {
    const t = Date.now();
    const bak = `${filePath}.bak.${t}`;
    fs.copyFileSync(filePath, bak);
    return bak;
  } catch (e) {
    return null;
  }
}

function countQuestions(text) {
  const m = text.match(/"question"\s*:/g);
  return (m && m.length) || 0;
}

function main() {
  const repoRoot = process.cwd();
  const tdPath = path.join(repoRoot, 'testData_complete.js');
  const sharePath = path.join(repoRoot, 'index_shareable.html');

  if (!fs.existsSync(tdPath)) {
    console.error('testData_complete.js not found at', tdPath);
    process.exit(2);
  }
  if (!fs.existsSync(sharePath)) {
    console.error('index_shareable.html not found at', sharePath);
    process.exit(3);
  }

  const tdSrc = fs.readFileSync(tdPath, 'utf8');
  const shareSrc = fs.readFileSync(sharePath, 'utf8');

  const anchor = 'window.testData';
  const tdObj = extractAssignedObject(tdSrc, anchor);
  if (!tdObj) {
    console.error('Failed to locate object assigned to window.testData in', tdPath);
    process.exit(4);
  }

  const newObjText = tdObj.trim();
  const assignmentText = 'window.testData = ' + newObjText + ';';

  // Remove all existing assignments
  let cleanedShare = removeAllAssignedObjects(shareSrc, anchor);

  // Insert a single canonical assignment before main.js (or fallback)
  const anchorComment = '/* inlined src/scripts/main.js */';
  const finalShare = insertAssignmentInShare(cleanedShare, anchorComment, assignmentText);

  const bak = backupFile(sharePath);
  if (bak) console.log('Backed up', sharePath, 'to', bak);

  fs.writeFileSync(sharePath, finalShare, 'utf8');
  console.log('Injected `window.testData` from', tdPath, 'into', sharePath);

  console.log('Counts:');
  console.log('  testData_complete.js questions:', countQuestions(tdSrc));
  console.log('  index_shareable.html questions:', countQuestions(finalShare));
}

if (require.main === module) main();
