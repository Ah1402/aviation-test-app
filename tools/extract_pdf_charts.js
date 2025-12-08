const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

// This script extracts chart references and attempts to extract images from PDF
// Note: pdf-parse doesn't extract images directly - you may need pdf2image or similar

async function extractCharts(pdfPath, outputDir) {
  console.log('Reading PDF...');
  const pdfBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(pdfBuffer);
  
  // Parse text to find chart references
  const chartReferences = new Map();
  const lines = data.text.split('\n');
  
  // Common chart reference patterns
  const patterns = [
    /CAP\s+69[67]\s+[A-Z]+\s+Figure\s+[\d.]+/gi,
    /Jeppesen\s+[^\n]{10,50}/gi,
    /ED-\d+/gi,
    /Figure\s+[\d.]+/gi,
    /Chart\s+[\d.]+/gi
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    patterns.forEach(pattern => {
      const matches = line.match(pattern);
      if (matches) {
        matches.forEach(ref => {
          const normalized = ref.trim();
          if (!chartReferences.has(normalized)) {
            chartReferences.set(normalized, {
              reference: normalized,
              contexts: []
            });
          }
          // Get surrounding context
          const context = lines.slice(Math.max(0, i - 2), i + 3).join(' ');
          chartReferences.get(normalized).contexts.push(context.substring(0, 200));
        });
      }
    });
  }
  
  // Save chart references
  const chartData = {
    totalReferences: chartReferences.size,
    charts: Array.from(chartReferences.values()),
    note: 'Image extraction requires additional tools like pdf2image or pdfjs-dist',
    extractionMethod: 'To extract actual images, use: npm install pdf-image or use external tools like pdf2image/ImageMagick'
  };
  
  const outputPath = path.join(outputDir, 'chart_references.json');
  fs.writeFileSync(outputPath, JSON.stringify(chartData, null, 2));
  console.log(`Found ${chartReferences.size} unique chart references`);
  console.log(`Saved to ${outputPath}`);
  
  // Try to get page info if available
  if (data.numpages) {
    console.log(`PDF has ${data.numpages} pages`);
    console.log('To extract images, you can use:');
    console.log('  - ImageMagick: convert -density 150 input.pdf -quality 90 output_%03d.png');
    console.log('  - pdftoppm: pdftoppm input.pdf output -png');
    console.log('  - Online tools: smallpdf.com, ilovepdf.com');
  }
  
  return chartData;
}

async function linkChartsToQuestions(questionsJsonPath, chartDataPath, outputPath) {
  const questions = JSON.parse(fs.readFileSync(questionsJsonPath, 'utf8'));
  const chartData = JSON.parse(fs.readFileSync(chartDataPath, 'utf8'));
  
  let linkedCount = 0;
  
  questions.questions.forEach(q => {
    const chartRefs = [];
    chartData.charts.forEach(chart => {
      // Check if question text contains this chart reference
      const qText = q.question.toLowerCase();
      const chartRef = chart.reference.toLowerCase();
      if (qText.includes(chartRef.split(/\s+/)[0])) {
        // More sophisticated matching
        const keywords = chartRef.split(/\s+/).filter(w => w.length > 2);
        const matches = keywords.filter(k => qText.includes(k.toLowerCase())).length;
        if (matches >= 2) {
          chartRefs.push(chart.reference);
        }
      }
    });
    
    if (chartRefs.length > 0) {
      q.chartReferences = chartRefs;
      linkedCount++;
    }
  });
  
  fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));
  console.log(`Linked ${linkedCount} questions to chart references`);
  console.log(`Updated questions saved to ${outputPath}`);
}

async function main() {
  const pdfPath = process.argv[2];
  const outputDir = process.argv[3] || 'tools';
  
  if (!pdfPath) {
    console.error('Usage: node extract_pdf_charts.js <PDF_PATH> [OUTPUT_DIR]');
    console.log('\nThis script will:');
    console.log('1. Extract chart references from the PDF');
    console.log('2. Link them to questions in pdf_import.json');
    console.log('3. Provide instructions for image extraction');
    process.exit(1);
  }
  
  if (!fs.existsSync(pdfPath)) {
    console.error('PDF file not found:', pdfPath);
    process.exit(1);
  }
  
  // Extract chart references
  const chartData = await extractCharts(pdfPath, outputDir);
  
  // Link to questions if pdf_import.json exists
  const questionsPath = path.join(outputDir, 'pdf_import.json');
  if (fs.existsSync(questionsPath)) {
    const chartDataPath = path.join(outputDir, 'chart_references.json');
    const outputPath = path.join(outputDir, 'pdf_import_with_charts.json');
    await linkChartsToQuestions(questionsPath, chartDataPath, outputPath);
  } else {
    console.log('\nTo link charts to questions, first run extract_pdf_questions.js');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
