// Lightweight search engine with simple indexing and scoring
// Builds an index from testData and supports AND terms, quoted phrases, and prefix matches.
(function(){
  function normalize(str){
    try {
      return String(str)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g,' ') // collapse spaces
        .trim();
    } catch {
      return (str||'').toString().toLowerCase();
    }
  }
  const STOP = new Set([
    'the','a','an','and','or','of','to','in','on','for','by','with','at','as','is','are','was','were','be','been','it','this','that','from','into','over','under','than'
  ]);
  function tokenize(str){
    return normalize(str)
      .split(/[^a-z0-9%]+/)
      .filter(t => t && t.length > 1 && !STOP.has(t));
  }

  class SearchEngine{
    constructor(data){
      this.docs = [];               // array of { id, categoryKey, categoryName, test, question, questionIndex, fullText }
      this.inverted = new Map();    // token -> Map(docIndex => score)
      this.tokenSet = new Set();    // all tokens seen (for prefix buckets)
      this.prefixBuckets = new Map(); // first2letters -> array of tokens
      this.build(data);
    }

    build(data){
      const fieldWeights = { q: 3, o: 1, e: 0.75, c: 0.5, t: 0.6 }; // include category (c) and test (t)
      const pushToken = (token, docIndex, weight)=>{
        if(!this.inverted.has(token)) this.inverted.set(token, new Map());
        const m = this.inverted.get(token);
        m.set(docIndex, (m.get(docIndex)||0) + weight);
        this.tokenSet.add(token);
      };

      Object.keys(data || {}).forEach(categoryKey => {
        const category = data[categoryKey];
        (category.tests || []).forEach((test, tIdx) => {
          (test.questions || []).forEach((q, qIdx) => {
            const id = `${categoryKey}::${tIdx}::${qIdx}`;
            const qText = q.question || '';
            // Handle both array and object format for options
            const opts = q.options || [];
            const optText = Array.isArray(opts) ? opts.join(' ') : (Object.values(opts).join(' ') || '');
            const expText = q.explanation || '';
            const catText = category.name || '';
            const testName = test.name || '';
            const fullText = `${qText} ${optText} ${expText} ${catText} ${testName}`;

            const docIndex = this.docs.length;
            const optList = Array.isArray(opts) ? opts : (Array.isArray(Object.values(opts)) ? Object.values(opts) : []);
            this.docs.push({
              id,
              categoryKey,
              categoryName: category.name,
              test: test,
              question: q,
              questionIndex: qIdx,
              fullText: normalize(fullText),
              qText, optText, expText,
              optList
            });

            // index tokens
            const qTokens = tokenize(qText);
            const oTokens = tokenize(optText);
            const eTokens = tokenize(expText);
            const cTokens = tokenize(catText);
            const tTokens = tokenize(testName);
            qTokens.forEach(tok => pushToken(tok, docIndex, fieldWeights.q));
            oTokens.forEach(tok => pushToken(tok, docIndex, fieldWeights.o));
            eTokens.forEach(tok => pushToken(tok, docIndex, fieldWeights.e));
            cTokens.forEach(tok => pushToken(tok, docIndex, fieldWeights.c));
            tTokens.forEach(tok => pushToken(tok, docIndex, fieldWeights.t));
          });
        });
      });

      // Build fast prefix buckets (by first two characters) to avoid scanning all tokens
      this.prefixBuckets.clear();
      for (const tok of this.tokenSet) {
        const key = tok.slice(0, 2);
        if (!this.prefixBuckets.has(key)) this.prefixBuckets.set(key, []);
        this.prefixBuckets.get(key).push(tok);
      }
      // Optional: sort tokens in each bucket for cache-friendly iteration
      for (const arr of this.prefixBuckets.values()) {
        arr.sort();
      }
    }

    parseQuery(query){
      const norm = normalize(query);
      const phrases = [];
      const phraseRegex = /"([^"]+)"/g;
      let m;
      let stripped = norm;
      while((m = phraseRegex.exec(norm))){
        if(m[1]) phrases.push(m[1]);
      }
      stripped = norm.replace(phraseRegex, ' ').trim();
      const terms = tokenize(stripped);
      return { terms, phrases, raw: norm };
    }

    // Return results as array of {doc, score}
    search(query, categoryFilter='all', limit){
      // default to all docs unless a limit is provided
      if (typeof limit !== 'number' || limit <= 0) limit = Number.MAX_SAFE_INTEGER;
      const { terms, phrases, raw } = this.parseQuery(query);
      if(terms.length === 0 && phrases.length === 0){
        return [];
      }

      // Collect candidate docs from term postings (AND semantics by default)
      let candidateScores = new Map(); // docIndex => score
      const postingsFor = (term)=>{
        // exact token postings
        const exact = this.inverted.get(term) || new Map();
        // prefix support for terms (>=2) to allow short queries
        let prefix = new Map();
        if(term.length >= 2){
          const bucket = this.prefixBuckets.get(term.slice(0,2)) || [];
          for(const tok of bucket){
            if(!tok.startsWith(term)) continue;
            const map = this.inverted.get(tok);
            if(!map) continue;
            for(const [di, sc] of map.entries()){
              prefix.set(di, (prefix.get(di)||0) + sc * 0.6);
            }
          }
        }
        // merge exact + prefix
        const merged = new Map(exact);
        for(const [di, sc] of prefix.entries()){
          merged.set(di, (merged.get(di)||0) + sc);
        }
        return merged;
      };

      const termPostings = terms.map(t => postingsFor(t));
      if(termPostings.length > 0){
        // Intersect doc sets for AND semantics
        const sortedBySize = termPostings.sort((a,b)=>a.size-b.size);
        for(const [docIndex, score] of sortedBySize[0].entries()){
          let ok = true;
          for(let i=1;i<sortedBySize.length;i++){
            if(!sortedBySize[i].has(docIndex)){ ok = false; break; }
          }
          if(ok) candidateScores.set(docIndex, score);
        }
        // also add contributions from other terms
        for(let i=1;i<sortedBySize.length;i++){
          for(const [docIndex, score] of sortedBySize[i].entries()){
            if(candidateScores.has(docIndex)){
              candidateScores.set(docIndex, candidateScores.get(docIndex) + score);
            }
          }
        }
      }

      // If only phrases, broaden candidate set by all docs
      if(candidateScores.size === 0 && terms.length === 0 && phrases.length){
        for(let i=0;i<this.docs.length;i++) candidateScores.set(i, 0);
      }

      // Phrase boosts
      if(phrases.length){
        for(const [di, baseScore] of candidateScores.entries()){
          const doc = this.docs[di];
          let bonus = 0;
          phrases.forEach(p => {
            if(doc.fullText.includes(p)) bonus += 8; // strong boost for phrase match
          });
          if(bonus>0) candidateScores.set(di, baseScore + bonus);
        }
      }

      // Category filter
      if(categoryFilter && categoryFilter !== 'all'){
        for(const di of Array.from(candidateScores.keys())){
          if(this.docs[di].categoryKey !== categoryFilter){
            candidateScores.delete(di);
          }
        }
      }

        // Score tie-breakers and positional boosts: prioritize matches at the beginning
        // Order of priority (highest first):
        // 1. query appears at start of question text
        // 2. query appears at start of any option
        // 3. query is a substring of question text
        // 4. query is a substring of an option
        // 5. phrase matches and token matches handled earlier
        
      const results = Array.from(candidateScores.entries()).map(([di, score])=>{
        const d = this.docs[di];
        // boost if raw query substring occurs in question text
        let boost = 0;
        const qNorm = d.qText ? normalize(d.qText) : '';
        const expNorm = d.expText ? normalize(d.expText) : '';
        // Exact match in question gets highest priority
        if (raw && qNorm === raw) {
          boost += 100;
        }
        // 1) starts-with in question
        else if (raw && qNorm.startsWith(raw)) {
          boost += 12; // highest boost for leading match in question
        } else if (raw && qNorm.includes(raw)) {
          boost += 3; // substring match in question
          if (raw.length > 10) boost += 20; // additional boost for long substring matches
        }

        // 2) starts-with in any option
        if (Array.isArray(d.optList) && d.optList.length) {
          let optStarts = false;
          let optContains = false;
          for (const opt of d.optList) {
            const oNorm = normalize(opt || '');
            if (raw && oNorm.startsWith(raw)) { optStarts = true; break; }
            if (!optContains && raw && oNorm.includes(raw)) optContains = true;
          }
          if (optStarts) boost += 9; // strong boost for option-leading match
          else if (optContains) boost += 1.5; // lighter boost for option substring
        } else {
          // fallback to joined optText
          const optNorm = d.optText ? normalize(d.optText) : '';
          if (raw && optNorm.startsWith(raw)) boost += 6;
          else if (raw && optNorm.includes(raw)) boost += 1;
        }

        if (raw && expNorm.includes(raw)) boost += 0.5;
        // slight preference for shorter content to surface concise matches
        const lengthPenalty = Math.min(1, (d.fullText.length / 1000));
        return { doc: d, score: score + boost - 0.1 * lengthPenalty };
      });

      results.sort((a,b)=> b.score - a.score);
      return results.slice(0, limit);
    }
  }

  // Expose globally
  window.SearchEngine = SearchEngine;
})();
