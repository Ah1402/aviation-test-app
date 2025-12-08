// Loader wrapper: fetch `252.js` (the consolidated bank) and transform it
// into the runtime `window.testData` shape the app expects.
(function () {
  try {
    if (typeof window === 'undefined') return;
    if (window.testData && Object.keys(window.testData).length) return;

    var url = '/252.js';
    fetch(url, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to fetch consolidated source: ' + res.status);
        return res.text();
      })
      .then(function (txt) {
        try {
          // Extract the array literal from the ES module style export.
          // Find first '[' and last ']' to capture the array content.
          var first = txt.indexOf('[');
          var last = txt.lastIndexOf(']');
          if (first === -1 || last === -1 || last <= first) throw new Error('Could not parse consolidated array');
          var arrText = txt.slice(first, last + 1);
          var consolidated = (0, eval)('(' + arrText + ')');

          // Build grouped structure: { <slug>: { name, icon, tests: [ { id, name, timeLimit, questions: [...] } ] } }
          var grouped = {};
          consolidated.forEach(function (q) {
            var catName = q.category || 'uncategorized';
            var slug = String(catName).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            if (!slug) slug = 'uncategorized';
            if (!grouped[slug]) grouped[slug] = { name: catName, icon: '', tests: [] };

            var testNum = q.test || 1;
            var testId = slug + '-test-' + testNum;
            var cat = grouped[slug];
            var testObj = cat.tests.find(function (t) { return t.id === testId; });
            if (!testObj) {
              testObj = { id: testId, name: 'Test ' + testNum, timeLimit: 60, questions: [] };
              cat.tests.push(testObj);
            }

            var correctIndex = -1;
            if (Array.isArray(q.options) && typeof q.answer === 'string') {
              correctIndex = q.options.findIndex(function (opt) { return String(opt).trim() === String(q.answer).trim(); });
            }

            var questionObj = {
              category: testId,
              test: testNum,
              id: q.id,
              question: q.question || '',
              options: Array.isArray(q.options) ? q.options : [],
              answer: q.answer || '',
              correct: correctIndex,
              explanation: q.explanation || ''
            };

            testObj.questions.push(questionObj);
          });

          window.testData = grouped;
          if (window.updateUIStats && typeof window.updateUIStats === 'function') {
            try { window.updateUIStats(); } catch (e) { console.warn('updateUIStats error', e); }
          }
        } catch (e) {
          console.error('Transforming consolidated bank failed', e);
        }
      })
      .catch(function (err) {
        console.warn('Could not load consolidated question bank:', err);
      });
  } catch (e) {
    console.error('testData loader error', e);
  }
})();
