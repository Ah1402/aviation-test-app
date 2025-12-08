(function(){
  // Auto-initialize AI settings with Gemini API key if not already configured
  const STORAGE_KEY = 'ai-settings';
  const GEMINI_KEY = 'AIzaSyDYEiGeu1K5uGZpVk2M8DCssPLYXTzT_IQ';
  
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      // First time - set up Gemini as default
      const config = {
        provider: 'gemini',
        geminiKey: GEMINI_KEY,
        geminiModel: 'gemini-1.5-flash',
        openaiKey: '',
        openaiModel: 'gpt-4o-mini'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      console.log('AI configured with Gemini provider');
    } else {
      // Update existing config if gemini key is empty
      const cfg = JSON.parse(existing);
      if (!cfg.geminiKey) {
        cfg.geminiKey = GEMINI_KEY;
        if (!cfg.provider || cfg.provider === 'gemini') {
          cfg.provider = 'gemini';
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
        console.log('AI Gemini key updated');
      }
    }
  } catch (e) {
    console.warn('Could not auto-initialize AI settings:', e);
  }
})();
