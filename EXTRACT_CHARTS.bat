@echo off
REM Chart Extraction Helper for Aviation Test App
REM This script helps you extract and organize charts from the PDF

echo ============================================
echo Aviation Test App - Chart Extraction Helper
echo ============================================
echo.

set PDF_PATH=C:\Users\ahmed\Desktop\Full_compressed_250919_160111 (2).pdf
set OUTPUT_DIR=src\charts\extracted

echo PDF Location: %PDF_PATH%
echo Output Directory: %OUTPUT_DIR%
echo.

echo [1/3] Checking prerequisites...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Python not found. Please install Python from https://python.org
    echo.
    goto :manual_methods
)

echo [+] Python found
echo.

REM Check if required packages are installed
python -c "import pdf2image" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] pdf2image not installed
    echo [*] Installing required packages...
    pip install pdf2image pillow
    echo.
)

REM Check if poppler is available
python -c "from pdf2image import convert_from_path; convert_from_path('test.pdf', 1)" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] Poppler not found
    echo.
    echo You need to install Poppler for Windows:
    echo 1. Download from: https://github.com/oschwaldp/poppler-windows/releases/
    echo 2. Extract to C:\Program Files\poppler
    echo 3. Add C:\Program Files\poppler\Library\bin to PATH
    echo.
    goto :manual_methods
)

echo [2/3] Ready to extract images from PDF
echo.
echo This will extract all 508 pages as images (may take several minutes)
echo Images will be saved to: %OUTPUT_DIR%
echo.
echo Press any key to start extraction or Ctrl+C to cancel...
pause >nul

echo.
echo [*] Extracting images... (this may take 5-10 minutes)
python tools\extract_chart_images.py "%PDF_PATH%" --output "%OUTPUT_DIR%" --dpi 150

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [+] Extraction complete!
    echo.
    echo [3/3] Next Steps:
    echo.
    echo 1. Review images in %OUTPUT_DIR%
    echo 2. Identify chart pages (usually tables, graphs, maps)
    echo 3. Rename and move chart images:
    echo    - CAP 697 figures --^> src\charts\cap697\
    echo    - Jeppesen charts --^> src\charts\jeppesen\
    echo    - ED-6 charts --^> src\charts\ed6\
    echo.
    echo 4. Link charts to questions:
    echo    node tools\link_charts_to_dataset.js
    echo.
    echo See CHART_EXTRACTION_GUIDE.md for detailed instructions
    echo.
) else (
    echo.
    echo [!] Extraction failed. See error above.
    goto :manual_methods
)

goto :end

:manual_methods
echo.
echo ============================================
echo Alternative Methods
echo ============================================
echo.
echo If Python method doesn't work, try these alternatives:
echo.
echo 1. ONLINE (Easiest):
echo    - Go to: https://www.ilovepdf.com/pdf_to_jpg
echo    - Upload: %PDF_PATH%
echo    - Download images to: %OUTPUT_DIR%
echo.
echo 2. ADOBE ACROBAT:
echo    - File -^> Export To -^> Image -^> PNG
echo    - Save to: %OUTPUT_DIR%
echo.
echo 3. WINDOWS PHOTOS APP:
echo    - Open PDF in Edge browser
echo    - Use "Snipping Tool" to capture chart pages
echo.
echo See CHART_EXTRACTION_GUIDE.md for more options
echo.

:end
pause
