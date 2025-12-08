// Merge window.addedImports into window.testData with cleaning & de-duplication
// merge_added_imports neutralized: merging `window.addedImports` into the canonical dataset is disabled.
(function(){
  if (typeof window === 'undefined') return;
  // No-op: distribution and standalone builds should use the embedded canonical `testData` only.
  if (window && window.addedImports) {
    try { console.info('merge_added_imports: clearing window.addedImports to prevent augmentation'); window.addedImports = null; } catch(e){}
  }
  return;
})();
