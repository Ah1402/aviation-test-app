// Count total questions in last403.html
const fs = require('fs');
const html = fs.readFileSync('last403.html', 'utf8');

// Count by "Correct Answer" patterns
const matches = html.match(/Correct Answer:\s*[A-D]/gi);
console.log('Total "Correct Answer" occurrences:', matches ? matches.length : 0);

// Also count different answer formats
const answerBox = html.match(/<div class="correct-answer-box">/gi);
const answerLabel = html.match(/<span class="correct-answer-label">/gi);
const correctClass = html.match(/class="option correct"/gi);

console.log('Answer box format:', answerBox ? answerBox.length : 0);
console.log('Answer label format:', answerLabel ? answerLabel.length : 0);
console.log('Correct class format:', correctClass ? correctClass.length : 0);

console.log('\nTotal unique questions estimated:', matches ? matches.length : 0);
