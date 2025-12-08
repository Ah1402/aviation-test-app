@echo off
echo ================================================
echo   Aviation Test Center - Portable Launcher
echo ================================================
echo.
echo Starting local web server...
echo.
echo Opening browser to: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ================================================
echo.

REM Try Python 3 first
python -c "import webbrowser; webbrowser.open('http://localhost:8000')" 2>nul
start http://localhost:8000
python -m http.server 8000 2>nul
if %errorlevel% neq 0 (
    REM Try Python 2
    python -m SimpleHTTPServer 8000 2>nul
    if %errorlevel% neq 0 (
        echo ERROR: Python is not installed!
        echo.
        echo Please install Python from: https://www.python.org/downloads/
        echo.
        echo ALTERNATIVE: Opening index.html directly in browser...
        start index.html
        echo.
        echo NOTE: Some features may not work without a server
        echo.
        pause
    )
)
