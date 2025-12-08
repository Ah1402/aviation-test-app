/**
 * Chart Display Component
 * Add to src/scripts/test.js to display charts with questions
 */

// Add this CSS to your stylesheet or inject it
const chartDisplayCSS = `
  .question-chart-container {
    margin: 1.5rem 0;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #dee2e6;
  }
  
  .question-chart-header {
    font-weight: 600;
    color: #495057;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .question-chart-header i {
    color: #0d6efd;
  }
  
  .question-chart {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .question-chart:hover {
    transform: scale(1.02);
  }
  
  .chart-lightbox {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 10000;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  
  .chart-lightbox.active {
    display: flex;
  }
  
  .chart-lightbox img {
    max-width: 95%;
    max-height: 95%;
    object-fit: contain;
  }
  
  .chart-lightbox-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .chart-reference-badge {
    display: inline-block;
    background: #e7f3ff;
    color: #0d6efd;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
    margin: 0.25rem;
  }
`;

// Chart display function - add to your question rendering code
function renderQuestionCharts(question) {
  if (!question.chartImages || question.chartImages.length === 0) {
    return '';
  }
  
  const chartHTML = question.chartImages.map((imagePath, index) => {
    const chartName = imagePath.split('/').pop().replace(/\.[^.]+$/, '');
    return `
      <div class="question-chart-container">
        <div class="question-chart-header">
          <i class="fas fa-chart-line"></i>
          <span>Reference Chart: ${chartName}</span>
        </div>
        <img 
          src="charts/${imagePath}" 
          alt="Chart ${chartName}"
          class="question-chart"
          data-chart-index="${index}"
          onclick="openChartLightbox(this.src)"
        />
      </div>
    `;
  }).join('');
  
  return chartHTML;
}

// Lightbox functionality
function setupChartLightbox() {
  // Create lightbox element if it doesn't exist
  if (!document.getElementById('chart-lightbox')) {
    const lightbox = document.createElement('div');
    lightbox.id = 'chart-lightbox';
    lightbox.className = 'chart-lightbox';
    lightbox.innerHTML = `
      <button class="chart-lightbox-close" onclick="closeChartLightbox()">×</button>
      <img id="chart-lightbox-img" src="" alt="Chart">
    `;
    document.body.appendChild(lightbox);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeChartLightbox();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeChartLightbox();
      }
    });
  }
}

function openChartLightbox(imageSrc) {
  setupChartLightbox();
  const lightbox = document.getElementById('chart-lightbox');
  const img = document.getElementById('chart-lightbox-img');
  img.src = imageSrc;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeChartLightbox() {
  const lightbox = document.getElementById('chart-lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Integration Example:
// In your displayQuestion() function, add:
/*
function displayQuestion() {
  const question = getCurrentQuestion();
  
  // ... existing question display code ...
  
  // Add chart display
  const chartHTML = renderQuestionCharts(question);
  const questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = `
    <div class="question-text">${question.question}</div>
    ${chartHTML}
    <div class="options-container">
      ${renderOptions(question.options)}
    </div>
  `;
  
  // ... rest of display code ...
}
*/

// Export functions for use in main app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderQuestionCharts,
    openChartLightbox,
    closeChartLightbox,
    setupChartLightbox,
    chartDisplayCSS
  };
}
