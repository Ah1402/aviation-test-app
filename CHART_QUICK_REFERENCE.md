# Quick Reference: Charts in Questions

## Summary
- **47 unique chart references** identified in PDF
- **54 questions** reference these charts
- Charts ready to be extracted and linked

## Quick Start

### 1. Extract Charts (Choose One Method)

**Fastest: Online Tool**
```
1. Visit: https://www.ilovepdf.com/pdf_to_jpg
2. Upload: C:\Users\ahmed\Desktop\Full_compressed_250919_160111 (2).pdf
3. Download images → Extract to: src/charts/extracted/
```

**Automated: Run Batch Script**
```cmd
EXTRACT_CHARTS.bat
```

**Manual: Python Script**
```powershell
pip install pdf2image pillow
python tools/extract_chart_images.py
```

### 2. Organize Charts

Move images from `src/charts/extracted/` to:
- `cap697/` → CAP 697 performance figures
- `jeppesen/` → Jeppesen navigation charts  
- `ed6/` → ED-6 VFR charts

Rename examples:
- `page_045.png` → `figure_4_1.png`
- `page_156.png` → `elo1.png`

### 3. Link to Questions

```powershell
node tools/link_charts_to_dataset.js
```

### 4. Test in App

Charts automatically appear with questions that reference them!

## Questions Needing Charts

### Flight Planning (25 questions need CAP 697 figures)
```
"Refer to CAP 697 MRJT Figure 4.4..."
"Refer to CAP 697 MRJT Figure 4.3.2b..."
"Refer to CAP 697 MRJT Figure 4.5.4..."
"Refer to CAP 697 SEP Figure 2.1..."
```

### Navigation (13 questions need Jeppesen/ED-6)
```
"Refer to ED-6. The track and distance..."
"Refer to Jeppesen E(LO)5..."
"Refer to Jeppesen Polar High Altitude Chart 5AT(HI)..."
```

## Chart Reference Quick List

| Reference | Type | Questions |
|-----------|------|-----------|
| CAP 697 MRJT Fig 4.1 | Optimum Alt | 2 |
| CAP 697 MRJT Fig 4.3.1 | Trip Time/Fuel | 3 |
| CAP 697 MRJT Fig 4.3.2 | Range | 2 |
| CAP 697 MRJT Fig 4.3.6 | Alternate Fuel | 1 |
| CAP 697 MRJT Fig 4.4 | Final Reserve | 1 |
| CAP 697 MRJT Fig 4.5.1 | Climb | 2 |
| CAP 697 MRJT Fig 4.5.3 | LRC | 3 |
| CAP 697 MRJT Fig 4.5.4 | Descent | 1 |
| CAP 697 MRJT Fig 4.7.2 | ETOPS | 1 |
| CAP 697 SEP Fig 2.1 | SE Climb | 3 |
| CAP 697 SEP Fig 2.2 | SE Cruise | 2 |
| CAP 697 SEP Fig 2.4 | SE Range | 1 |
| CAP 697 MEP Fig 3.4 | ME Cruise | 1 |
| CAP 697 MEP Fig 3.5 | ME Endurance | 1 |
| ED-6 | VFR Chart | 8 |
| Jeppesen E(LO)1 | Low Alt | 2 |
| Jeppesen E(LO)5 | Low Alt | 1 |
| Jeppesen E(HI)4 | High Alt | 1 |
| Jeppesen 5AT(HI) | Polar | 2 |

## Files Created

✅ Infrastructure:
- `src/charts/` directories
- `src/scripts/chartDisplay.js` - UI component
- `tools/extract_pdf_charts.js` - Reference extractor
- `tools/extract_chart_images.py` - Image extractor
- `tools/link_charts_to_dataset.js` - Auto-linker
- `EXTRACT_CHARTS.bat` - Helper script

✅ Documentation:
- `CHART_EXTRACTION_GUIDE.md` - Detailed guide
- `CHART_INTEGRATION_COMPLETE.md` - Full summary
- `src/charts/README.md` - Chart organization
- `CHART_QUICK_REFERENCE.md` - This file

✅ Data:
- `tools/chart_references.json` - 47 unique charts cataloged
- `tools/pdf_import_with_charts.json` - 54 questions linked

## Need Help?

See `CHART_EXTRACTION_GUIDE.md` for:
- Detailed extraction instructions
- Troubleshooting
- Alternative methods
- Chart identification tips

## Chart Display Features

When implemented:
- ✅ Auto-displays with questions
- ✅ Click to view full-size
- ✅ Lightbox with zoom
- ✅ Mobile responsive
- ✅ Keyboard shortcuts (Esc to close)

## Status

🟡 **Ready for Chart Extraction**

Next: Extract images from PDF and organize into chart folders.
