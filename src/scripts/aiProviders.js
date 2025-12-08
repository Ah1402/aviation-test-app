(function(){
  const STORAGE_KEY = 'ai-settings';

  function loadConfig(){
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { provider: 'openai', openaiKey: '', openaiModel: 'gpt-4o-mini', geminiKey: '', geminiModel: 'gemini-1.5-flash' };
      const cfg = JSON.parse(raw);
      return Object.assign({ provider: 'openai', openaiKey: '', openaiModel: 'gpt-4o-mini', geminiKey: '', geminiModel: 'gemini-1.5-flash' }, cfg);
    } catch { return { provider: 'openai', openaiKey: '', openaiModel: 'gpt-4o-mini', geminiKey: '', geminiModel: 'gemini-1.5-flash' }; }
  }
  function saveConfig(cfg){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg||{}));
  }
  function hasProvider(){
    const cfg = loadConfig();
    if (cfg.provider === 'openai') return !!cfg.openaiKey;
    if (cfg.provider === 'gemini') return !!cfg.geminiKey;
    return false;
  }

  async function queryOpenAI(question, category){
    const cfg = loadConfig();
    const apiKey = cfg.openaiKey;
    const model = cfg.openaiModel || 'gpt-4o-mini';
    if (!apiKey) throw new Error('OpenAI API key not set');

    const sys = 'You are an aviation exam assistant. If given a multiple-choice or free-form aviation question, provide a concise, factual answer and a short explanation. If the question lacks enough info, state assumptions. Return JSON.';
    const user = `Question: ${question}\nCategory: ${category||'unknown'}\n\nReturn a JSON object with keys: answer (string), explanation (string). Keep it short.`;

    const resp = await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages:[
          {role:'system', content: sys},
          {role:'user', content: user}
        ]
      })
    });
    if (!resp.ok) throw new Error(`OpenAI error: ${resp.status}`);
    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content || '';
    let parsed;
    try { parsed = JSON.parse(content); } catch {
      parsed = { answer: content, explanation: '' };
    }
    return { provider: 'openai', model, answer: parsed.answer||'', explanation: parsed.explanation||'' };
  }

  async function queryGemini(question, category){
    const cfg = loadConfig();
    const apiKey = cfg.geminiKey;
    const model = cfg.geminiModel || 'gemini-1.5-flash';
    if (!apiKey) throw new Error('Gemini API key not set');

    const prompt = `You are an aviation exam assistant. Answer concisely and factually.\nQuestion: ${question}\nCategory: ${category||'unknown'}\nReturn JSON: {"answer": string, "explanation": string}.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const resp = await fetch(url,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        contents:[{ role:'user', parts:[{ text: prompt }]}],
        generationConfig:{ temperature: 0.2 }
      })
    });
    if (!resp.ok) throw new Error(`Gemini error: ${resp.status}`);
    const data = await resp.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    let parsed;
    try { parsed = JSON.parse(text); } catch { parsed = { answer: text, explanation: '' }; }
    return { provider: 'gemini', model, answer: parsed.answer||'', explanation: parsed.explanation||'' };
  }

  async function query(question, category){
    const cfg = loadConfig();
    if ((cfg.provider||'openai') === 'openai') return queryOpenAI(question, category);
    return queryGemini(question, category);
  }

  window.AIHelper = { loadConfig, saveConfig, hasProvider, query };
})();
