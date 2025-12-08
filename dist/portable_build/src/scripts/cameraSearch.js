// Camera-based OCR search integration
// Provides a modal to scan text with the device camera and use OCR to populate the search box.
(function(){
  const CameraSearch = {
    app: null,
    stream: null,
    ocrLoaded: false,

    init(app){
      this.app = app;
      const btn = document.getElementById('scanBtn');
      const modal = document.getElementById('camera-modal');
      if (!btn || !modal) return;

      document.getElementById('scanBtn').addEventListener('click', ()=> this.open());
      document.getElementById('camera-close')?.addEventListener('click', ()=> this.close());
      document.getElementById('camera-capture')?.addEventListener('click', ()=> this.captureAndRecognize());
    },

    async open(){
      const modal = document.getElementById('camera-modal');
      const video = document.getElementById('camera-video');
      if (!modal || !video) return;

      try {
        modal.classList.add('active');
        // Request camera stream
        this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        video.srcObject = this.stream;
        await video.play();
      } catch (e) {
        alert('Camera access failed. Please allow camera permissions or try a different device.');
        this.close();
      }
    },

    async ensureOCR(){
      if (this.ocrLoaded) return true;
      return new Promise((resolve, reject)=>{
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js';
        s.onload = ()=> { this.ocrLoaded = true; resolve(true); };
        s.onerror = ()=> { alert('Failed to load OCR engine.'); reject(new Error('OCR load failed')); };
        document.head.appendChild(s);
      });
    },

    async captureAndRecognize(){
      try {
        await this.ensureOCR();
      } catch { return; }
      const video = document.getElementById('camera-video');
      const canvas = document.createElement('canvas');
      const w = video.videoWidth || 1280; const h = video.videoHeight || 720;
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, w, h);

      const status = document.getElementById('camera-status');
      status.textContent = 'Recognizing text…';

      try {
        const { data } = await Tesseract.recognize(canvas.toDataURL('image/png'), 'eng', {
          logger: m => { if (m && m.status) status.textContent = `${m.status} ${(m.progress*100||0).toFixed(0)}%`; }
        });
        const text = (data && data.text || '').replace(/\s+/g, ' ').trim();
        if (!text) {
          status.textContent = 'No text detected. Try again with better lighting or focus.';
          return;
        }
        // Put into search box and trigger search
        const input = document.getElementById('mainSearchInput') || document.getElementById('searchInput');
        if (input) {
          input.value = text;
          // Prefer main search flow
          if (document.getElementById('mainSearchBtn')) {
            document.getElementById('mainSearchBtn').click();
          } else if (this.app && typeof this.app.performMainSearch === 'function') {
            this.app.performMainSearch();
          }
        }
        status.textContent = 'Text recognized and search triggered.';
        // Auto-close shortly
        setTimeout(()=> this.close(), 800);
      } catch (e) {
        console.error(e);
        status.textContent = 'OCR failed. Please try again.';
      }
    },

    close(){
      const modal = document.getElementById('camera-modal');
      const video = document.getElementById('camera-video');
      if (modal) modal.classList.remove('active');
      if (video) video.pause();
      if (this.stream) {
        this.stream.getTracks().forEach(t => t.stop());
        this.stream = null;
      }
      const status = document.getElementById('camera-status');
      if (status) status.textContent = '';
    }
  };

  window.CameraSearch = CameraSearch;
})();
