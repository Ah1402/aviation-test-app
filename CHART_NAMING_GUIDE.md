# Chart Naming Examples & Organization Guide

## How to Name Extracted Charts

After extracting images from the PDF, you'll need to rename them to match the chart references in questions.

### CAP 697 Figures → `src/charts/cap697/`

#### Performance Charts (MRJT)
```
Question: "Refer to CAP 697 MRJT Figure 4.1..."
Chart Name: figure_4_1.png

Question: "Refer to CAP 697 MRJT Figure 4.3.1b..."
Chart Name: figure_4_3_1b.png

Question: "Refer to CAP 697 MRJT Figure 4.5.3.2..."
Chart Name: figure_4_5_3_2.png
```

#### Single Engine Performance (SEP)
```
Question: "Refer to CAP 697 SEP Figure 2.1..."
Chart Name: sep_figure_2_1.png
(or just: figure_2_1.png if in cap697/ folder)

Question: "Refer to CAP 697 SEP Figure 2.2..."
Chart Name: sep_figure_2_2.png
```

#### Multi-Engine Performance (MEP)
```
Question: "Refer to CAP 697 MEP Figure 3.4..."
Chart Name: mep_figure_3_4.png

Question: "Refer to CAP 697 MEP Figure 3.5..."
Chart Name: mep_figure_3_5.png
```

### Jeppesen Charts → `src/charts/jeppesen/`

#### Enroute Charts
```
Question: "Refer to Jeppesen E(LO)1..."
Chart Name: elo1.png
(or: e_lo_1.png)

Question: "Refer to Jeppesen E(LO)5..."
Chart Name: elo5.png

Question: "Refer to Jeppesen E(HI)4..."
Chart Name: ehi4.png

Question: "Refer to Jeppesen 5AT(HI)..."
Chart Name: 5at_hi.png
(or: polar_high_altitude.png)
```

#### Airport Charts
```
Question: "Refer to Jeppesen MUNICH 10-2B..."
Chart Name: munich_10_2b.png

Question: "Refer to Jeppesen AMSTERDAM Schiphol SID 10-3..."
Chart Name: amsterdam_sid_10_3.png
```

### ED-6 Charts → `src/charts/ed6/`

```
Question: "Refer to ED-6. The track and distance..."
Chart Name: ed6_main.png
(or: ed6_full.png)

If multiple ED-6 charts exist:
Chart Name: ed6_north.png, ed6_south.png, ed6_legend.png
```

## File Naming Rules

✅ **DO:**
- Use lowercase letters
- Use underscores `_` instead of spaces
- Keep numbers and letters from original reference
- Use `.png` or `.jpg` extension
- Be consistent across similar charts

❌ **DON'T:**
- Use spaces in filenames
- Use special characters (except underscore and hyphen)
- Make up names that don't match references
- Mix uppercase and lowercase randomly

## Quick Identification Guide

### How to Find Charts in Extracted Pages

**Look for pages with:**

1. **Tables and Grids** → CAP 697 performance data
   - Usually have rows/columns with numbers
   - Headers like "FL", "Weight", "Fuel", "Distance"
   - Temperature columns (ISA, ISA+10, etc.)

2. **Maps with Airways** → Jeppesen charts
   - Colored lines showing air routes
   - VOR/DME symbols (⊕ ◇)
   - Lat/long grids
   - Frequency information

3. **Graph Paper Style** → ED-6 VFR charts
   - Topographic features
   - Aerodrome symbols
   - Navigation aid markers
   - Scale bars

## Example Workflow

### Step 1: Extract (you have 508 pages as images)
```
page_001.png
page_002.png
...
page_508.png
```

### Step 2: Identify Charts
Browse through images, mark pages that have:
- `page_045.png` → Has "Figure 4.1" header → CAP 697 chart
- `page_156.png` → Has "E(LO)1" in corner → Jeppesen chart
- `page_234.png` → Shows Germany map → ED-6 chart

### Step 3: Rename and Move
```powershell
# Example commands
move page_045.png src\charts\cap697\figure_4_1.png
move page_156.png src\charts\jeppesen\elo1.png
move page_234.png src\charts\ed6\ed6_main.png
```

### Step 4: Link to Questions
```powershell
node tools\link_charts_to_dataset.js
```

Output:
```
Scanning for chart images...
Found 3 chart images

Results:
  Total questions: 1423
  Questions with charts: 12
  Available chart images: 3

Updated: src/data/testData.js
```

## Chart Reference → Filename Mapping

| Question Text | Chart Folder | Filename |
|--------------|--------------|----------|
| "Refer to CAP 697 MRJT Figure 4.1..." | cap697/ | figure_4_1.png |
| "Refer to CAP 697 MRJT Figure 4.3.1b..." | cap697/ | figure_4_3_1b.png |
| "Refer to CAP 697 MRJT Figure 4.3.2b..." | cap697/ | figure_4_3_2b.png |
| "Refer to CAP 697 MRJT Figure 4.3.2c..." | cap697/ | figure_4_3_2c.png |
| "Refer to CAP 697 MRJT Figure 4.3.6..." | cap697/ | figure_4_3_6.png |
| "Refer to CAP 697 MRJT Figure 4.4..." | cap697/ | figure_4_4.png |
| "Refer to CAP 697 MRJT Figure 4.5.1..." | cap697/ | figure_4_5_1.png |
| "Refer to CAP 697 MRJT Figure 4.5.3.1..." | cap697/ | figure_4_5_3_1.png |
| "Refer to CAP 697 MRJT Figure 4.5.3.2..." | cap697/ | figure_4_5_3_2.png |
| "Refer to CAP 697 MRJT Figure 4.5.4..." | cap697/ | figure_4_5_4.png |
| "Refer to CAP 697 MRJT Figure 4.7.2..." | cap697/ | figure_4_7_2.png |
| "Refer to CAP 697 SEP Figure 2.1..." | cap697/ | sep_figure_2_1.png |
| "Refer to CAP 697 SEP Figure 2.2..." | cap697/ | sep_figure_2_2.png |
| "Refer to CAP 697 SEP Figure 2.4..." | cap697/ | sep_figure_2_4.png |
| "Refer to CAP 697 MEP Figure 3.4..." | cap697/ | mep_figure_3_4.png |
| "Refer to CAP 697 MEP Figure 3.5..." | cap697/ | mep_figure_3_5.png |
| "Refer to Jeppesen E(LO)1..." | jeppesen/ | elo1.png |
| "Refer to Jeppesen E(LO)5..." | jeppesen/ | elo5.png |
| "Refer to Jeppesen E(HI)4..." | jeppesen/ | ehi4.png |
| "Refer to Jeppesen E(HI)5..." | jeppesen/ | ehi5.png |
| "Refer to Jeppesen 5AT(HI)..." | jeppesen/ | 5at_hi.png |
| "Refer to ED-6..." | ed6/ | ed6_main.png |

## Verification

After organizing, your structure should look like:

```
src/charts/
├── cap697/
│   ├── figure_4_1.png          ✓
│   ├── figure_4_3_1b.png       ✓
│   ├── figure_4_5_1.png        ✓
│   ├── sep_figure_2_1.png      ✓
│   └── mep_figure_3_4.png      ✓
├── jeppesen/
│   ├── elo1.png                ✓
│   ├── ehi4.png                ✓
│   └── 5at_hi.png              ✓
└── ed6/
    └── ed6_main.png            ✓
```

Run linker:
```powershell
node tools\link_charts_to_dataset.js
```

Should show:
```
Questions with charts: 54  ← All chart questions linked!
```

## Tips

💡 **Start with Most Common Charts**
Extract and organize these first (they appear in most questions):
1. CAP 697 Figure 4.1 (Optimum Altitude)
2. CAP 697 Figure 4.3.1b (Trip Time/Fuel)
3. CAP 697 Figure 4.5.3.1 (LRC)
4. ED-6 (main VFR chart)
5. Jeppesen E(LO)1

💡 **Use Batch Rename Tools**
Windows PowerShell:
```powershell
# Rename multiple files
Get-ChildItem page_04*.png | Rename-Item -NewName {$_.Name -replace 'page_045','figure_4_1'}
```

💡 **Keep Originals**
Keep the extracted pages in `src/charts/extracted/` as backup before organizing.

## Need Help?

See:
- `CHART_EXTRACTION_GUIDE.md` - Full extraction guide
- `CHART_QUICK_REFERENCE.md` - Quick commands
- `src/charts/README.md` - Chart organization details
