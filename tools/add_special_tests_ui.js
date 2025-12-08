// Add Complete Test and Custom Test options to the Aviation Test App
// This script adds two special test cards at the top of the Tests section

const fs = require('fs');
const path = require('path');

const INDEX_HTML = path.resolve(__dirname, '..', 'index.html');

function addSpecialTests() {
  let html = fs.readFileSync(INDEX_HTML, 'utf8');
  
  const specialTestsHTML = `
                    <!-- Special Test Options -->
                    <div class="special-tests" style="margin-bottom: 30px; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">
                        <div class="category-card" data-category="complete-test" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">
                            <div class="category-icon" style="background: rgba(255,255,255,0.2);">
                                <i class="fas fa-globe"></i>
                            </div>
                            <h3 style="color: white;">Complete Test - All Questions</h3>
                            <p style="color: rgba(255,255,255,0.9);">Take a comprehensive test with ALL questions from every category</p>
                            <div class="category-info">
                                <span class="test-count" style="background: rgba(255,255,255,0.2); color: white;">All Categories</span>
                                <span class="question-count" id="complete-test-count" style="background: rgba(255,255,255,0.2); color: white;">2799 Questions</span>
                            </div>
                            <button class="start-btn" style="background: white; color: #667eea;">Start Complete Test</button>
                        </div>

                        <div class="category-card" data-category="custom-test" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border: none;">
                            <div class="category-icon" style="background: rgba(255,255,255,0.2);">
                                <i class="fas fa-sliders-h"></i>
                            </div>
                            <h3 style="color: white;">Custom Test</h3>
                            <p style="color: rgba(255,255,255,0.9);">Create your own test by selecting categories and number of questions</p>
                            <div class="category-info">
                                <span class="test-count" style="background: rgba(255,255,255,0.2); color: white;">Customizable</span>
                                <span class="question-count" style="background: rgba(255,255,255,0.2); color: white;">Your Choice</span>
                            </div>
                            <button class="start-btn" style="background: white; color: #f5576c;">Configure Custom Test</button>
                        </div>
                    </div>

                    <h3 style="margin-top: 40px; margin-bottom: 20px; color: #64748b;">Category Tests</h3>
`;

  // Insert after "Select a Test Category" heading
  html = html.replace(
    /<h2>Select a Test Category<\/h2>\s*<div class="test-categories">/,
    `<h2>Select a Test Category</h2>\n${specialTestsHTML}                    <div class="test-categories">`
  );
  
  // Add Custom Test Configuration Modal before closing body
  const customTestModalHTML = `
    <!-- Custom Test Configuration Modal -->
    <div class="modal" id="custom-test-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-sliders-h"></i> Configure Custom Test</h3>
                <button class="modal-close" id="custom-test-close">&times;</button>
            </div>
            <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 10px;">
                        <i class="fas fa-list-ol"></i> Number of Questions:
                    </label>
              <input type="number" id="custom-question-count" min="1" max="2799" value="50" 
                           style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 16px;">
                    <small style="color: #64748b; display: block; margin-top: 5px;">
                        Enter between 1 and 2799 questions
                    </small>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 10px;">
                        <i class="fas fa-clock"></i> Time Limit (minutes):
                    </label>
                    <input type="number" id="custom-time-limit" min="1" max="600" value="60" 
                           style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 16px;">
                    <small style="color: #64748b; display: block; margin-top: 5px;">
                        Recommended: 1.2 minutes per question
                    </small>
                </div>
                
                <div>
                    <label style="display: block; font-weight: 600; margin-bottom: 10px;">
                        <i class="fas fa-check-square"></i> Select Categories (check all that apply):
                    </label>
                    <div id="custom-categories-list" style="display: grid; gap: 10px;">
                        <!-- Will be populated dynamically -->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" id="custom-test-cancel">Cancel</button>
                <button class="btn-primary" id="custom-test-start">
                    <i class="fas fa-play"></i> Start Custom Test
                </button>
            </div>
        </div>
    </div>
`;

  html = html.replace('</body>', `${customTestModalHTML}\n</body>`);
  
  fs.writeFileSync(INDEX_HTML, html, 'utf8');
  console.log('✅ Added Complete Test and Custom Test options to index.html');
}

addSpecialTests();
