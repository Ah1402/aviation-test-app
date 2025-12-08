// Merge window.addedImports into window.testData with cleaning & de-duplication
(function(){
  if (typeof window === 'undefined') return;
  if (!window.testData || !Array.isArray(window.addedImports)) return;
  const data = window.testData;
  const imports = window.addedImports;

  function norm(s){ return String(s || '').toLowerCase().replace(/\s+/g,' ').trim(); }
  function cleanQuestionText(s){
    let t = String(s || '');
    t = t.replace(/Correct\s*Answer:\s*[ABCD].*$/i, '');
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  }
  function cleanOption(s){
    return String(s || '').replace(/Correct\s*Answer:.*$/i,'').replace(/\s+/g,' ').trim();
  }

  imports.forEach(catImp => {
    const key = catImp.category || 'misc';
    if (!data[key]) {
      data[key] = { name: key.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()), icon: 'fas fa-book', tests: [] };
    }
    const cat = data[key];

    // Build existing set for de-dup
    const existing = new Set();
    (cat.tests || []).forEach(t => (t.questions||[]).forEach(q => existing.add(norm(q.question))));

    (catImp.tests || []).forEach(t => {
      const testName = t.name && t.name.trim() ? t.name.trim() : 'Imported Test';
      let tgt = (cat.tests || []).find(x => x.name === testName);
      if (!tgt) {
        tgt = { name: testName, timeLimit: t.timeLimit || 60, questions: [] };
        cat.tests.push(tgt);
      }

      (t.questions || []).forEach(q => {
        const question = cleanQuestionText(q.question);
        const options = (q.options || []).map(cleanOption).slice(0,4);
        const correct = (typeof q.correct === 'number' && q.correct >=0 && q.correct < options.length) ? q.correct : 0;
        if (!question || options.filter(Boolean).length < 2) return;
        const key = norm(question);
        if (existing.has(key)) return;
        tgt.questions.push({ question, options, correct, explanation: q.explanation || null });
        existing.add(key);
      });
    });
  });

  // Expose back
  window.testData = data;

  // Rebuild search engine if available
  try {
    if (window.app && typeof window.app.rebuildSearchEngine === 'function') {
      console.log('Auto-rebuilding search engine after data merge...');
      window.app.rebuildSearchEngine();
    }
  } catch (e) {
    console.warn('Could not auto-rebuild search engine:', e);
  }
})();
