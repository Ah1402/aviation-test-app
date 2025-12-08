// Dynamically update stats (questions and categories) after all data merges
(function () {
  // Map various aliases used across builds to a canonical key
  const canonicalMap = {
    metrology: "meteorology",
    performance: "aircraft-performance",
    // UI shorthand -> dataset canonical keys
    "mass-balance": "mass-and-balance",
    "aircraft-general": "aircraft-general-knowledge",
    "aon-aviation": "aon-aviation-knowledge",
  };

  function toCanonical(key) {
    return canonicalMap[key] || key;
  }

  function computeCounts(data) {
    let totalQuestions = 0;
    const categoryCounts = {};
    if (!data || typeof data !== "object") return { totalQuestions: 0, categoryCounts: {}, categoryTotal: 0 };

    for (const [rawKey, cat] of Object.entries(data)) {
      if (!cat || !Array.isArray(cat.tests)) continue; // skip non-category entries
      const key = toCanonical(rawKey);
      let qCount = 0;
      for (const test of cat.tests) {
        if (test && Array.isArray(test.questions)) {
          qCount += test.questions.length;
        }
      }
      categoryCounts[key] = (categoryCounts[key] || 0) + qCount;
      totalQuestions += qCount;
    }
    const categoryTotal = Object.values(categoryCounts).filter(n => n > 0).length;
    return { totalQuestions, categoryCounts, categoryTotal };
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value);
  }

  function updatePerCategoryBadges(counts) {
    // Update per-category question and test badges in category cards if present
    const cards = document.querySelectorAll('.category-card[data-category]');
    if (!cards || !window.testData) return;

    // Build a lookup of normalized keys for matching
    function slugify(s) {
      return String(s || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    const dataKeyBySlug = {};
    Object.keys(window.testData).forEach(k => {
      dataKeyBySlug[slugify(k)] = k;
      // also map the category name if present
      const name = (window.testData[k] && window.testData[k].name) || '';
      if (name) dataKeyBySlug[slugify(name)] = k;
    });

    cards.forEach(card => {
      const raw = card.getAttribute('data-category') || '';
      const keyCandidate = toCanonical(raw);

      // Try exact match first
      let matchKey = Object.prototype.hasOwnProperty.call(counts, keyCandidate) ? keyCandidate : null;

      if (!matchKey) {
        // Try by slug match against data keys
        const s = slugify(raw);
        // try multiple slug variants to handle subtle naming differences like 'mass-balance' vs 'mass-and-balance'
        const variants = new Set();
        if (s) variants.add(s);
        // toggle the word 'and' presence in slug (mass-balance <-> mass-and-balance)
        if (s && s.indexOf('-and-') !== -1) variants.add(s.replace(/-and-/g, '-'));
        if (s && s.indexOf('-') !== -1) variants.add(s.replace(/-/g, '-and-'));
        for (const v of variants) { if (v && dataKeyBySlug[v]) { matchKey = dataKeyBySlug[v]; break; } }
        
        if (!matchKey) {
          // Fallback: try contains / startsWith heuristics
          for (const dk of Object.keys(window.testData)) {
            if (dk.indexOf(raw) !== -1 || raw.indexOf(dk) !== -1) { matchKey = dk; break; }
            const name = (window.testData[dk] && window.testData[dk].name || '').toLowerCase();
            if (name && name.indexOf(raw.toLowerCase()) !== -1) { matchKey = dk; break; }
          }
        }
      }

      // Update question count badge
      const qCount = matchKey ? counts[matchKey] || 0 : (counts[keyCandidate] || 0);
      const qBadge = card.querySelector('.question-count');
      if (qBadge) qBadge.textContent = qCount ? `${qCount} Questions` : '';

      // Update test count badge (number of tests in that category)
      const tBadge = card.querySelector('.test-count');
      if (tBadge) {
        let tNum = 0;
        const catObj = matchKey ? window.testData[matchKey] : window.testData[keyCandidate];
        if (catObj && Array.isArray(catObj.tests)) tNum = catObj.tests.length;
        tBadge.textContent = tNum ? `${tNum} Tests` : tBadge.textContent; // preserve custom text if zero
      }
    });
  }

  function updateCompleteTestCount(total) {
    const el = document.getElementById("complete-test-count");
    if (el) el.textContent = `${total} Questions`;
  }

  function updateInputsMax(total) {
    // Optional: adjust custom test modal max values and helper text if present
    const input = document.getElementById("custom-question-count");
    if (input) {
      input.max = String(total);
      const small = input.parentElement && input.parentElement.querySelector("small");
      if (small) small.textContent = `Enter between 1 and ${total} questions`;
    }
  }

  function run() {
    try {
      const data = window.testData;
      const { totalQuestions, categoryCounts, categoryTotal } = computeCounts(data);
      console.log('updateStats: totalQuestions =', totalQuestions, 'data keys:', data ? Object.keys(data) : 'no data');

      // Top hero stat cards
      setText("stat-questions-count", totalQuestions);
      setText("stat-categories-count", categoryTotal);

      // About section stats
      setText("about-questions-count", totalQuestions);
      setText("about-category-count", categoryTotal);

      // Per-category badges and complete test tile
      updatePerCategoryBadges(categoryCounts);
      updateCompleteTestCount(totalQuestions);
      updateInputsMax(totalQuestions);
    } catch (e) {
      console.warn("updateStats: unable to compute stats:", e);
    }
  }

  // Ensure we run after DOM ready; test data scripts are included before this script
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  // Expose for manual invocation (useful for standalone builds / debugging)
  try { window.__updateStats_run = run; } catch (e) { /* noop in non-browser env */ }
})();
