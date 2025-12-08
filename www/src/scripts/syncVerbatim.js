// Sync Instrumentation explanations verbatim from local HTML attachment at runtime
(function() {
  async function fetchAttachment() {
    // Attempt common relative paths
    const candidates = [
      'src/data/instrumentation_source.html',
      '../added/Instrumentation%20Test%201.htm',
      '../../added/Instrumentation%20Test%201.htm',
      'added/Instrumentation%20Test%201.htm'
    ];
    for (const url of candidates) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const text = await res.text();
          return text;
        }
      } catch (e) {
        // ignore and try next
      }
    }
    return null;
  }

  function buildMappingFromHtml(html) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const text = (doc.body ? doc.body.textContent : html) || '';

      const mapping = new Map();
      // Split by numbered questions (e.g., "1. ")
      const parts = text.split(/\n\s*\d+\.\s+/);
      for (let i = 1; i < parts.length; i++) {
        const block = parts[i];
        if (!/Correct Answer:/i.test(block)) continue;

        // Extract question text (before first ' A.' marker)
        const qMatch = block.match(/^(.*?)(?:\s+A[\.)]\s+)/s);
        if (!qMatch) continue;
        let qText = qMatch[1].trim();
        // Normalize whitespace
        qText = qText.replace(/\s+/g, ' ');

        // Extract explanation inside parentheses after Correct Answer
        const eMatch = block.match(/Correct Answer:\s*[ABCD]\s*\((.*?)\)/is);
        const expl = eMatch ? eMatch[1].trim().replace(/\s+/g, ' ') : '';

        if (qText) {
          mapping.set(qText, expl);
        }
      }
      return mapping;
    } catch (e) {
      console.warn('Failed to parse attachment for verbatim mapping', e);
      return new Map();
    }
  }

  function applyMappingToInstrumentation(mapping) {
    try {
      const cat = window.testData && window.testData['instrumentation'];
      if (!cat) return 0;
      let updated = 0;

      cat.tests.forEach(test => {
        test.questions.forEach(q => {
          // Try exact match
          const key = q.question.replace(/\s+/g, ' ');
          if (mapping.has(key)) {
            q.explanation = mapping.get(key) || '';
            updated++;
          }
        });
      });
      return updated;
    } catch (e) {
      console.warn('Failed applying verbatim mapping', e);
      return 0;
    }
  }

  async function run() {
    const html = await fetchAttachment();
    if (!html) return;
    const mapping = buildMappingFromHtml(html);
    const count = applyMappingToInstrumentation(mapping);
    if (count > 0) {
      console.log(`Verbatim sync applied to ${count} Instrumentation questions.`);
      // Optionally refresh counts (no-op for counts) or UI if needed
    } else {
      console.log('No Instrumentation explanations updated (no matches found).');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
