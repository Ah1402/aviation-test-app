// merge_import neutralized in distribution build to prevent runtime augmentation.
(function(){
  if (typeof window === 'undefined') return;
  // No-op merge: distribution builds embed canonical testData and must not be augmented at runtime.
  return;
})();
