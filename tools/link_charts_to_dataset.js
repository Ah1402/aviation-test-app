const fs = require('fs');
const path = require('path');

/**
 * Link chart images to questions in testData.js
 * Scans src/charts/ for images and matches them to questions with chart references
 */

function findChartImages(chartsDir) {
  const images = new Map();
  
  const scanDir = (dir, prefix = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        scanDir(fullPath, path.join(prefix, entry.name));
      } else if (/\.(png|jpg|jpeg|gif|svg)$/i.test(entry.name)) {
        const relativePath = path.join(prefix, entry.name).replace(/\\/g, '/');
        const normalizedName = entry.name.toLowerCase()
          .replace(/[_\s-]+/g, '')
          .replace(/\.(png|jpg|jpeg|gif|svg)$/i, '');
        images.set(normalizedName, relativePath);
      }
    }
  };
  
  if (fs.existsSync(chartsDir)) {
    scanDir(chartsDir);
  }
  
  return images;
}

function matchChartToQuestion(questionText, chartImages) {
  const matches = [];
  const qLower = questionText.toLowerCase();
  
  // Extract chart references from question
  const patterns = [
    /figure\s*([\d.]+[a-z]?)/gi,
    /chart\s*([\d.]+[a-z]?)/gi,
    /(e\(lo\)[\d]+)/gi,
    /(e\(hi\)[\d]+)/gi,
    /([\d]+at\(hi\))/gi,
    /ed-?([\d]+)/gi
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(qLower)) !== null) {
      const ref = match[1] || match[0];
      const normalized = ref.replace(/[^a-z0-9]/g, '');
      
      // Look for matching image
      for (const [imgKey, imgPath] of chartImages.entries()) {
        if (imgKey.includes(normalized) || normalized.includes(imgKey)) {
          if (!matches.includes(imgPath)) {
            matches.push(imgPath);
          }
        }
      }
    }
  }
  
  return matches;
}

function linkChartsToDataset(testDataPath, chartsDir, outputPath) {
  console.log('Loading test data...');
  const testData = require(path.resolve(testDataPath));
  
  console.log('Scanning for chart images...');
  const chartImages = findChartImages(chartsDir);
  console.log(`Found ${chartImages.size} chart images`);
  
  let linkedCount = 0;
  let totalQuestions = 0;
  
  // Process each category
  for (const [catKey, category] of Object.entries(testData)) {
    if (!category.tests) continue;
    
    for (const test of category.tests) {
      if (!test.questions) continue;
      
      for (const question of test.questions) {
        totalQuestions++;
        
        // Check if question references charts
        const qText = question.question.toLowerCase();
        if (qText.includes('refer') || qText.includes('figure') || 
            qText.includes('chart') || qText.includes('jeppesen') ||
            qText.includes('cap 69')) {
          
          const matches = matchChartToQuestion(question.question, chartImages);
          
          if (matches.length > 0) {
            question.chartImages = matches;
            linkedCount++;
          }
        }
      }
    }
  }
  
  // Write updated data
  const header = `// Aviation Test Data - With Chart References\n// Generated: ${new Date().toISOString()}\n// Charts linked: ${linkedCount}/${totalQuestions} questions\n\n`;
  const jsOut = header + 'const testData = ' + JSON.stringify(testData, null, 2) + 
                '\n\nif (typeof module !== "undefined" && module.exports) { module.exports = testData; }\n';
  
  fs.writeFileSync(outputPath || testDataPath, jsOut, 'utf8');
  
  console.log(`\nResults:`);
  console.log(`  Total questions: ${totalQuestions}`);
  console.log(`  Questions with charts: ${linkedCount}`);
  console.log(`  Available chart images: ${chartImages.size}`);
  console.log(`\nUpdated: ${outputPath || testDataPath}`);
  
  if (chartImages.size === 0) {
    console.log('\n⚠️  No chart images found in src/charts/');
    console.log('To add charts:');
    console.log('1. Extract images from PDF (see CHART_EXTRACTION_GUIDE.md)');
    console.log('2. Place images in src/charts/cap697/, src/charts/jeppesen/, etc.');
    console.log('3. Run this script again');
  } else if (linkedCount === 0) {
    console.log('\n⚠️  No automatic matches found');
    console.log('Chart images found but not linked to questions.');
    console.log('Check that image names match chart references:');
    console.log('  figure_4_1.png for "Figure 4.1"');
    console.log('  elo1.png for "E(LO)1"');
  }
}

function main() {
  const testDataPath = process.argv[2] || 'src/data/testData.js';
  const chartsDir = process.argv[3] || 'src/charts';
  const outputPath = process.argv[4];
  
  if (!fs.existsSync(testDataPath)) {
    console.error(`Error: Test data not found: ${testDataPath}`);
    console.log('\nUsage: node link_charts_to_dataset.js [testDataPath] [chartsDir] [outputPath]');
    process.exit(1);
  }
  
  linkChartsToDataset(testDataPath, chartsDir, outputPath);
}

main();
