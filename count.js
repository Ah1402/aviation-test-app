const fs = require('fs'); const content = fs.readFileSync('testData_complete.js', 'utf8'); const matches = content.match(/"id":/g); console.log('Total IDs:', matches ? matches.length : 0);
