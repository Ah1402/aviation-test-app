// Apply corrected answers from "fixed questions.htm" at runtime across all categories
(function() {
  function normalize(str) {
    return (str || '')
      .replace(/[\u2018\u2019\u201C\u201D]/g, '"') // normalize quotes
      .replace(/\s+/g, ' ')
      .trim();
  }

  async function fetchCorrectionsHtml() {
    const candidates = [
      '../fixed%20questions.htm',
      '../../fixed%20questions.htm',
      'fixed%20questions.htm',
      'src/data/fixed_questions.html'
    ];
    for (const rel of candidates) {
      try {
        const res = await fetch(rel);
        if (res.ok) {
          return await res.text();
        }
      } catch (_) { /* try next */ }
    }
    return null;
  }

  function extractCorrections(html) {
    const mapping = [];
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Primary: parse table rows with columns [Q#, Question, Correct Answer, Rationale]
      const tables = Array.from(doc.querySelectorAll('table'));
      for (const table of tables) {
        const rows = Array.from(table.querySelectorAll('tr'));
        // Skip header row if present
        for (const tr of rows.slice(1)) {
          const tds = Array.from(tr.querySelectorAll('td'));
          if (tds.length < 3) continue;

          const qText = normalize(tds[1].textContent || '');
          const ansCell = normalize(tds[2].textContent || '');
          const ratCell = normalize((tds[3] && tds[3].textContent) || '');
          if (!qText) continue;

          // Extract first answer letter A-D from the correct answer cell, e.g. "B. text"
          const m = ansCell.match(/^([ABCD])\b/i);
          if (!m) continue;
          const letter = m[1].toUpperCase();
          const correct = letter.charCodeAt(0) - 65;

          const explanation = ratCell || undefined;
          mapping.push({ question: qText, correct, explanation });
        }
      }

      // Fallback: legacy plain-text pattern with "Correct Answer: X"
      if (mapping.length === 0) {
        const text = doc.body ? doc.body.textContent : html;
        if (!text) return mapping;
        const blocks = text.split(/\n\s*(?=\d+\.)/g);
        for (const raw of blocks) {
          const blk = raw.trim();
          if (!/Correct Answer:/i.test(blk)) continue;

          let qMatch = blk.match(/^(.*?)(?:\s+A[\.)]\s+|\s*Correct Answer:)/s);
          let question = qMatch ? qMatch[1].trim() : '';
          if (!question) {
            const idx = blk.indexOf('Correct Answer:');
            if (idx > 0) question = blk.substring(0, idx).trim();
          }
          if (!question) continue;

          const cMatch = blk.match(/Correct Answer:\s*([ABCD])/i);
          if (!cMatch) continue;
          const letter = cMatch[1].toUpperCase();
          const correct = letter.charCodeAt(0) - 65;

          // Optional rationale after colon
          const eMatch = blk.match(/Correct Answer:\s*[ABCD]\s*\((.*?)\)/is);
          const explanation = eMatch ? normalize(eMatch[1]) : undefined;

          mapping.push({ question: normalize(question), correct, explanation });
        }
      }
    } catch (e) {
      console.warn('Failed extracting corrections', e);
    }
    return mapping;
  }

  function applyCorrections(mapping) {
    if (!Array.isArray(mapping) || !window.testData) return 0;
    const indexByQuestion = new Map();
    mapping.forEach(m => indexByQuestion.set(m.question, m));

    let updates = 0;
    Object.values(window.testData).forEach(cat => {
      (cat.tests || []).forEach(test => {
        (test.questions || []).forEach(q => {
          const key = normalize(q.question);
          // exact match first
          let fix = indexByQuestion.get(key);
          if (!fix) {
            // try startsWith match if correction is long and unique
            fix = mapping.find(m => key.startsWith(m.question) || m.question.startsWith(key));
          }
          if (fix) {
            if (typeof fix.correct === 'number' && q.correct !== fix.correct) {
              q.correct = fix.correct;
              updates++;
            }
            if (typeof fix.explanation === 'string' && fix.explanation.length) {
              q.explanation = fix.explanation;
            }
          }
        });
      });
    });
    return updates;
  }

  async function run() {
    const html = await fetchCorrectionsHtml();
    if (!html) return;
    const mapping = extractCorrections(html);
    const count = applyCorrections(mapping);
    if (count > 0) {
      console.log(`Applied ${count} corrected answer(s) from fixed questions.`);
    } else {
      console.log('No matching questions found to correct from fixed questions.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
