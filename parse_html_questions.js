const fs = require('fs');
const cheerio = require('cheerio');

const htmlFile = 'Aircraft General Knowledge Test 1.htm';
const html = fs.readFileSync(htmlFile, 'utf8');
const $ = cheerio.load(html);

const categories = {};
let currentCategory = null;
let currentTest = null;

const allPs = $('p.MsoNormal');
for (let i = 0; i < allPs.length; i++) {
    const elem = allPs.eq(i);
    const text = elem.text().trim();
    if (!text) continue;

    if (text.includes('Aircraft General Knowledge Test')) {
        const match = text.match(/Aircraft General Knowledge Test (\d)/);
        if (match) {
            currentCategory = 'aircraft-general-knowledge';
            currentTest = match[1];
            if (!categories[currentCategory]) {
                categories[currentCategory] = {};
            }
            if (!categories[currentCategory][`test-${currentTest}`]) {
                categories[currentCategory][`test-${currentTest}`] = [];
            }
        }
    } else if (text.includes('Air Law Test')) {
        const match = text.match(/Air Law Test (\d)/);
        if (match) {
            currentCategory = 'air-law';
            currentTest = match[1];
            if (!categories[currentCategory]) {
                categories[currentCategory] = {};
            }
            if (!categories[currentCategory][`test-${currentTest}`]) {
                categories[currentCategory][`test-${currentTest}`] = [];
            }
        }
    } else if (text.includes('AON Aviation Knowledge Test')) {
        currentCategory = 'aon-aviation-knowledge';
        currentTest = '1';
        if (!categories[currentCategory]) {
            categories[currentCategory] = {};
        }
        if (!categories[currentCategory][`test-${currentTest}`]) {
            categories[currentCategory][`test-${currentTest}`] = [];
        }
    } else if (currentCategory && /^\d+\./.test(text)) {
        // Collect the question
        const questionLines = [text];
        i++; // next
        for (; i < allPs.length; i++) {
            const nextElem = allPs.eq(i);
            const nextText = nextElem.text().trim();
            if (nextText.startsWith('Correct Answer:')) {
                questionLines.push(nextText);
                break;
            } else if (/^[A-D]\./.test(nextText) || nextText.includes('Note:')) {
                questionLines.push(nextText);
            } else if (/^\d+\./.test(nextText)) {
                // Next question, back up
                i--;
                break;
            }
        }
        const q = parseQuestion(questionLines);
        if (q) {
            categories[currentCategory][`test-${currentTest}`].push(q);
        }
    }
}

function parseQuestion(lines) {
    let question = '';
    const options = [];
    let answer = '';
    let explanation = '';

    for (const line of lines) {
        if (line.startsWith('Correct Answer:')) {
            answer = line.replace('Correct Answer:', '').trim();
        } else if (/^A\./.test(line)) {
            options.push(line);
        } else if (/^B\./.test(line)) {
            options.push(line);
        } else if (/^C\./.test(line)) {
            options.push(line);
        } else if (/^D\./.test(line)) {
            options.push(line);
        } else if (line.includes('Note:')) {
            explanation = line.replace(/.*Note:\s*/, '').trim();
        } else if (/^\d+\./.test(line)) {
            question = line.replace(/^\d+\.\s*/, '');
        }
    }

    if (question && options.length === 4 && answer) {
        return {
            question,
            options,
            answer,
            explanation
        };
    }
    return null;
}

console.log('Categories:', Object.keys(categories));
Object.keys(categories).forEach(cat => {
    console.log(`${cat}:`, Object.keys(categories[cat]).length, 'tests');
    Object.keys(categories[cat]).forEach(test => {
        console.log(`  ${test}:`, categories[cat][test].length, 'questions');
    });
});

fs.writeFileSync('categorized_questions.json', JSON.stringify(categories, null, 2));