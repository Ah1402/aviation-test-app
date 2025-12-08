const fs = require('fs');
const cheerio = require('cheerio');

const htmlFile = 'Aircraft General Knowledge Test 1.htm';
const html = fs.readFileSync(htmlFile, 'utf8');
const $ = cheerio.load(html);

const questions = [];
$('p.MsoNormal').each((i, elem) => {
    const text = $(elem).text().trim();
    if (text && /^\d+\./.test(text)) { // starts with number.
        questions.push(text);
    }
});

console.log(`Total questions extracted: ${questions.length}`);
fs.writeFileSync('extracted_questions.json', JSON.stringify(questions, null, 2));