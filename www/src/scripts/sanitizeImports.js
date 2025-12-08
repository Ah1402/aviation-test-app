// Runtime sanitation of imported question banks (e.g. 617 imports)
// - Strips embedded "Correct Answer:" annotations from option text
// - Moves rationale into the question.explanation if empty
// - Fixes correct index if annotation letter disagrees with stored index
// - Removes orphan options that are only ")" caused by broken line splits
// Idempotent: safe to run multiple times.
(function(){
  if (typeof window === 'undefined' || !window.testData) return;

  function cleanQuestion(q){
    if (!q || !Array.isArray(q.options)) return;    
    let updatedExplanation = q.explanation && q.explanation.trim().length ? q.explanation.trim() : '';
    const cleaned = [];
    let anyChanges = false;

    for (let i=0;i<q.options.length;i++) {
      let opt = q.options[i];
      if (typeof opt !== 'string') { cleaned.push(String(opt)); continue; }
      let original = opt;
      opt = opt.replace(/\s+/g,' ').trim();

      // Remove stray isolated parenthesis option (artefact of import)
      if (opt === ')' && q.options.length > 4) { anyChanges = true; continue; }

      // Pattern: <text> Correct Answer: X (Explanation...)
      const m = opt.match(/^(.*?)(?:\s*Correct Answer:\s*([A-D])(?:\s*\((.*)\))?)\s*$/i);
      if (m) {
        let body = m[1].trim();
        const letter = m[2].toUpperCase();
        const rationale = (m[3] || '').trim();
        if (!body) {
          // Fallback: if body empty but we have rationale, keep a placeholder
          body = letter; 
        }
        opt = body;
        const annotatedIndex = letter.charCodeAt(0) - 65;
        if (typeof q.correct === 'number' && q.correct !== annotatedIndex) {
          // Assume annotation is authoritative
          q.correct = annotatedIndex;
        }
        if (!updatedExplanation && rationale) {
          updatedExplanation = rationale;
        } else if (rationale) {
          // Append unique rationale if different
            if (!updatedExplanation.includes(rationale)) {
              updatedExplanation += (updatedExplanation ? ' ' : '') + rationale;
            }
        }
        anyChanges = true;
      }

      // Occasionally trailing unmatched commentary without parentheses
      // e.g., "text Correct Answer: B ..." (no closing paren)
      const m2 = opt.match(/^(.*?)(?:\s*Correct Answer:\s*([A-D])(.*))$/i);
      if (!m && m2) {
        let body = m2[1].trim();
        const letter = m2[2].toUpperCase();
        const tail = (m2[3]||'').trim();
        opt = body;
        const annotatedIndex = letter.charCodeAt(0) - 65;
        if (typeof q.correct === 'number' && q.correct !== annotatedIndex) {
          q.correct = annotatedIndex;
        }
        if (!updatedExplanation && tail) {
          updatedExplanation = tail;
        } else if (tail && !updatedExplanation.includes(tail)) {
          updatedExplanation += (updatedExplanation ? ' ' : '') + tail;
        }
        anyChanges = true;
      }

      cleaned.push(opt);
      if (opt !== original) anyChanges = true;
    }

    if (anyChanges) {
      // Ensure at least 2 options remain
      if (cleaned.length >= 2) {
        q.options = cleaned;
      }
      if (updatedExplanation) q.explanation = updatedExplanation.trim();
      // Guard correct index range
      if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length) {
        q.correct = 0;
      }
    }
  }

  Object.values(window.testData).forEach(cat => {
    (cat.tests||[]).forEach(t => (t.questions||[]).forEach(cleanQuestion));
  });
})();
