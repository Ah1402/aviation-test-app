// Application Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    window.app = new AviationTestApp();
    
    // Ensure testData has sane numeric `correct` values when possible
    (function normalizeTestDataGlobal(){
        try {
            const normalize = s => String(s||'').replace(/\s+/g,' ').trim().toLowerCase();
            const resolveIndex = (q) => {
                const opts = q.options || [];
                let idx = (typeof q.correct === 'number') ? q.correct : null;
                if (idx == null || typeof idx !== 'number' || idx < 0 || idx >= opts.length) {
                    if (typeof q.correct === 'string') {
                        const c = q.correct.trim();
                        if (/^[A-Z]$/i.test(c)) {
                            const cand = c.toUpperCase().charCodeAt(0) - 65;
                            if (cand >= 0 && cand < opts.length) idx = cand;
                        } else {
                            const normC = normalize(c);
                            const found = opts.findIndex(o => normalize(o) === normC);
                            if (found !== -1) idx = found;
                        }
                    }
                    if (idx == null || idx < 0 || idx >= opts.length) {
                        const alt = normalize(q.answer || q.correctText || q.correct || '');
                        if (alt) {
                            const found = opts.findIndex(o => {
                                const no = normalize(o);
                                return no === alt || no.includes(alt) || alt.includes(no);
                            });
                            if (found !== -1) idx = found;
                        }
                    }
                }
                return (typeof idx === 'number' && idx >= 0 && idx < (q.options||[]).length) ? idx : -1;
            };
            Object.keys(window.testData||{}).forEach(cat => {
                (window.testData[cat].tests||[]).forEach(test => {
                    (test.questions||[]).forEach(q => {
                        const newIdx = resolveIndex(q);
                        if (newIdx >= 0) q.correct = newIdx;
                    });
                });
            });
        } catch (e) { console.warn('normalizeTestDataGlobal failed', e); }
    })();

    // Expose a debug helper to resolve correct display for a question
    window.debugResolve = function(q){
        try {
            if (window.app && typeof window.app.resolveCorrectDisplay === 'function') return window.app.resolveCorrectDisplay(q);
            // fallback local resolver
            const normalize = s => String(s||'').replace(/\s+/g,' ').trim().toLowerCase();
            const opts = q.options || [];
            let idx = (typeof q.correct === 'number') ? q.correct : null;
            if (idx == null || typeof idx !== 'number' || idx < 0 || idx >= opts.length) {
                if (typeof q.correct === 'string') {
                    const c = q.correct.trim();
                    if (/^[A-Z]$/i.test(c)) {
                        const cand = c.toUpperCase().charCodeAt(0) - 65;
                        if (cand >= 0 && cand < opts.length) idx = cand;
                    } else {
                        const normC = normalize(c);
                        const found = opts.findIndex(o => normalize(o) === normC);
                        if (found !== -1) idx = found;
                    }
                }
                if (idx == null || idx < 0 || idx >= opts.length) {
                    const alt = normalize(q.answer || q.correctText || q.correct || '');
                    if (alt) {
                        const found = opts.findIndex(o => {
                            const no = normalize(o);
                            return no === alt || no.includes(alt) || alt.includes(no);
                        });
                        if (found !== -1) idx = found;
                    }
                }
            }
            const index = (typeof idx === 'number' && idx >= 0 && idx < opts.length) ? idx : -1;
            const letter = index >= 0 ? (window.safeLetter ? window.safeLetter(index) : String.fromCharCode(65 + index)) : '';
            const text = index >= 0 ? opts[index] : (q.answer || q.correctText || '');
            return { index, letter, text };
        } catch (e) { return { index: -1, letter: '', text: ''}; }
    };
    
    const categoryCount = Object.keys(window.testData || {}).length;
    let totalQuestions = 0;
    Object.keys(window.testData || {}).forEach(cat => {
        (window.testData[cat].tests || []).forEach(t => {
            totalQuestions += (t.questions || []).length;
        });
    });

    console.log('Aviation Test Center loaded successfully!');
    console.log('Features:');
    console.log('- Modern responsive design');
    console.log(`- ${categoryCount} test categories`);
    console.log(`- ${totalQuestions}+ questions`);
    console.log('- Progress tracking');
    console.log('- Timed tests');
    console.log('- Results storage');
    console.log('- Keyboard shortcuts');
    
    // Add keyboard shortcut help
    console.log('\nKeyboard Shortcuts (during test):');
    console.log('← → : Navigate questions');
    console.log('1-4 : Select answer options');
    console.log('Ctrl+F : Toggle flag');
    console.log('Ctrl+O : Show overview');
});