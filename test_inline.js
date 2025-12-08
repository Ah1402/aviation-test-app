const fs = require('fs');

try {
  const html = fs.readFileSync('924.html', 'utf8');
  console.log('File size:', html.length, 'characters');

  // Find the script tag that contains window.testData
  const scriptStart = html.indexOf('<script>\nwindow.testData = {');
  if (scriptStart === -1) {
    console.log('Script tag not found');
    return;
  }

  // Find the end of the script tag
  const scriptEnd = html.indexOf('</script>', scriptStart);
  if (scriptEnd === -1) {
    console.log('Script end tag not found');
    return;
  }

  const scriptContent = html.substring(scriptStart + 8, scriptEnd); // Skip '<script>'
  console.log('Script content length:', scriptContent.length);

  // Extract just the JSON part
  const jsonStart = scriptContent.indexOf('window.testData = ');
  if (jsonStart === -1) {
    console.log('window.testData assignment not found');
    return;
  }

  const jsonContent = scriptContent.substring(jsonStart + 17); // Skip 'window.testData = '
  console.log('JSON content length:', jsonContent.length);

  // Test if it's valid JSON
  try {
    const testData = eval('(' + jsonContent + ')');
    console.log('testData parsed successfully');
    console.log('Categories:', Object.keys(testData).length);

    let totalQuestions = 0;
    Object.keys(testData).forEach(cat => {
      testData[cat].tests.forEach(t => {
        totalQuestions += (t.questions?.length || 0);
      });
    });
    console.log('Total questions:', totalQuestions);
  } catch (e) {
    console.error('Error parsing testData:', e.message);
  }
} catch (e) {
  console.error('Error reading file:', e.message);
}