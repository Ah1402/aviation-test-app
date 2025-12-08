# Chart Extraction Guide

## Quick Start: Extract Charts from PDF

Your PDF has been analyzed and contains **47 unique chart references** across **508 pages**.

### Option 1: Online Extraction (Recommended - No Installation)

1. **Go to**: https://www.ilovepdf.com/pdf_to_jpg
2. **Upload**: `C:\Users\ahmed\Desktop\Full_compressed_250919_160111 (2).pdf`
3. **Select**: "Extract individual images" (not "Convert entire pages")
4. **Download** the ZIP file
5. **Extract** to: `C:\Users\ahmed\Desktop\aviation-test-app\src\charts\extracted`

### Option 2: Using Python (Best Quality)

```powershell
# Install required package
pip install pdf2image pillow

# Run extraction
python tools/extract_chart_images.py
```

This will create a Python script that:
- Extracts all pages as high-quality images
- Attempts to detect chart pages automatically
- Saves charts to organized folders

### Option 3: Manual Page Extraction

If you know specific page numbers for charts, extract them individually:

**Using Adobe Acrobat:**
1. Open PDF
2. File → Export To → Image → PNG
3. Select "All Pages" or specific pages
4. Save to `src/charts/extracted`

**Using Preview (Mac):**
1. Open PDF
2. View → Thumbnails
3. Select pages with charts
4. File → Export Selected Images

## Chart References in Questions

### Most Common Charts (54 questions reference these):

| Chart Reference | Questions | Type |
|----------------|-----------|------|
| CAP 697 MRJT Figure 4.* | 25 | Flight Planning/Performance |
| CAP 697 SEP Figure 2.* | 8 | Single Engine Performance |
| CAP 697 MEP Figure 3.* | 6 | Multi-Engine Performance |
| Jeppesen E(LO) Charts | 5 | Low Altitude Europe |
| ED-6 | 8 | VFR Charts Germany |
| Jeppesen SID/STAR | 2 | Procedures |

### Chart Categories

**Flight Planning (CAP 697 MRJT)**
- Figure 4.1: Optimum Altitude
- Figure 4.3.1b: Trip time/fuel calculations
- Figure 4.3.2b/c: Range performance
- Figure 4.3.6: Alternate fuel requirements
- Figure 4.4: Final reserve calculations
- Figure 4.5.1: Climb performance data
- Figure 4.5.3.1/2: Long Range Cruise tables
- Figure 4.5.4: Descent fuel/distance
- Figure 4.7.2: ETOPS diversion distances

**Single Engine Performance (CAP 697 SEP)**
- Figure 2.1: Climb performance
- Figure 2.2: Cruise performance
- Figure 2.4: Range calculations

**Multi-Engine Performance (CAP 697 MEP)**
- Figure 3.4: High speed cruise
- Figure 3.5: Endurance calculations

**Navigation Charts (Jeppesen)**
- E(LO)1, E(LO)5: Low altitude enroute
- E(HI)4, E(HI)5: High altitude enroute  
- 5AT(HI): Polar operations
- Airport approach plates

**VFR Charts (ED-6)**
- Germany VFR navigation chart
- VOR/DME/NDB positions
- Aerodrome data

## After Extraction

Once you have the images:

1. **Rename charts** to match references:
   - `figure_4_1.png` for Figure 4.1
   - `jeppesen_elo1.png` for E(LO)1
   - `ed6_full.png` for ED-6 main chart

2. **Organize** into folders:
   ```
   src/charts/
   ├── cap697/
   │   ├── figure_4_1.png
   │   ├── figure_4_3_1b.png
   │   └── ...
   ├── jeppesen/
   │   ├── elo1.png
   │   ├── ehi4.png
   │   └── ...
   └── ed6/
       └── main_chart.png
   ```

3. **Run the linker script**:
   ```powershell
   node tools/link_charts_to_dataset.js
   ```

This will update your testData.js to include chart image paths in questions.

## Auto-Detection Tips

If extracting all 508 pages as images, look for:
- Pages with tables and grids (performance charts)
- Pages with maps and airways (navigation charts)
- Pages with color-coded regions (especially Jeppesen)
- Pages without question text (pure chart pages)

Page ranges that likely contain charts:
- CAP 697 figures: Usually in appendices or dedicated sections
- Jeppesen charts: Often at the end of test sections
- ED-6: Typically large fold-out style charts

## Need Help?

The chart extraction script at `tools/extract_chart_images.py` can be customized to:
- Extract specific page ranges
- Apply image enhancement
- Crop margins automatically
- Detect chart boundaries

Run with `--help` for options once created.
