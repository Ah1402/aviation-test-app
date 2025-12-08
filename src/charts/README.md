# Aviation Test Charts & Figures

This directory contains charts and figures referenced in test questions.

## Chart Organization

Charts are organized by type:
- `cap697/` - CAP 697 figures (Flight Planning, Performance, etc.)
- `jeppesen/` - Jeppesen approach plates, charts, and navigation aids
- `ed6/` - ED-6 VFR charts and references
- `other/` - Miscellaneous charts and diagrams

## Extracting Charts from PDF

Since your PDF contains 508 pages with many charts, here are the best methods to extract them:

### Method 1: Using Online Tools (Easiest)
1. Go to https://www.ilovepdf.com/pdf_to_jpg or https://smallpdf.com/pdf-to-jpg
2. Upload your PDF: `Full_compressed_250919_160111 (2).pdf`
3. Select "Extract individual images" 
4. Download and organize by chart reference

### Method 2: Using pdftoppm (Windows)
```powershell
# Install if needed: https://blog.alivate.com.au/poppler-windows/
pdftoppm -png -r 150 "Full_compressed_250919_160111 (2).pdf" output/page

# This creates page-001.png, page-002.png, etc.
```

### Method 3: Using ImageMagick
```powershell
# Install from: https://imagemagick.org/script/download.php
magick convert -density 150 "Full_compressed_250919_160111 (2).pdf" -quality 90 output/page_%03d.png
```

### Method 4: Using Python (pdf2image)
```python
from pdf2image import convert_from_path
pages = convert_from_path('Full_compressed_250919_160111 (2).pdf', 150)
for i, page in enumerate(pages):
    page.save(f'output/page_{i:03d}.png', 'PNG')
```

## Chart References Found

Total unique chart references: 47

### CAP 697 Figures (Flight Planning & Performance)
- Figure 4.1 - Optimum Altitude
- Figure 4.3.1b - Trip Time & Fuel
- Figure 4.3.2b, 4.3.2c - Fuel/Range calculations
- Figure 4.3.6 - Alternate fuel
- Figure 4.4 - Final Reserve
- Figure 4.5.1 - Climb performance
- Figure 4.5.3.1, 4.5.3.2 - Long Range Cruise
- Figure 4.5.4 - Descent performance
- Figure 4.7.2 - ETOPS diversion
- SEP Figures 2.1, 2.2 - Single Engine Performance
- MEP Figures 3.4, 3.5 - Multi-Engine Performance

### Jeppesen Charts
- E(LO)1, E(LO)5 - Low Altitude European Charts
- E(HI)4, E(HI)5 - High Altitude European Charts
- 5AT(HI) - Polar High Altitude Chart
- Airport approach plates (MUNICH, AMSTERDAM, etc.)
- SID/STAR procedures

### ED-6 Charts
- VFR navigation charts for Germany/Central Europe
- VOR/DME/NDB locations
- Aerodrome information

## Linking Charts to Questions

Charts are automatically linked to questions that reference them. See `tools/pdf_import_with_charts.json` for the linked data.

Example question with chart:
```json
{
  "question": "Refer to CAP 697 MRJT Figure 4.4...",
  "chartReferences": ["CAP 697 MRJT Figure 4.4", "Figure 4.4"],
  "chartImages": ["cap697/figure_4_4.png"]
}
```

## Next Steps

1. Extract images from the PDF using one of the methods above
2. Identify which pages contain which charts (manually or via OCR)
3. Rename and organize images by chart reference
4. Update the question data to include `chartImages` array
5. Modify the app UI to display charts when available

## Chart Display in App

To display charts with questions, update `src/scripts/test.js` to:
```javascript
if (question.chartImages && question.chartImages.length > 0) {
  const chartHTML = question.chartImages.map(img => 
    `<img src="charts/${img}" alt="Chart" class="question-chart">`
  ).join('');
  // Insert chartHTML into question display
}
```

Add CSS for chart display:
```css
.question-chart {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 8px;
}
```
