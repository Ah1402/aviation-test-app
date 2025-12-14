@echo off
REM Aviation Test App Auto-Updater
REM Monitors testData_complete.js for changes and rebuilds apps automatically

echo ========================================
echo   Aviation Test App Auto-Updater
echo ========================================
echo.
echo 🔍 Monitoring testData_complete.js for changes...
echo 📱 Apps will rebuild automatically when file is updated
echo.
echo Press Ctrl+C to stop monitoring
echo.

REM Check if testData_complete.js exists
if not exist "testData_complete.js" (
    echo ❌ testData_complete.js not found
    echo Please run this from the project root directory
    pause
    exit /b 1
)

REM Get initial file timestamp
for %%A in ("testData_complete.js") do set "initial_time=%%~tA"

:monitor_loop
    REM Wait 5 seconds
    timeout /t 5 /nobreak >nul

    REM Check current file timestamp
    for %%A in ("testData_complete.js") do set "current_time=%%~tA"

    REM Compare timestamps
    if not "%initial_time%"=="%current_time%" (
        echo.
        echo 🔄 CHANGE DETECTED in testData_complete.js!
        echo 📅 New timestamp: %current_time%
        echo 🚀 Rebuilding apps...
        echo.

        REM Rebuild apps
        call build_apps.bat

        REM Update initial timestamp
        set "initial_time=%current_time%"

        echo.
        echo ✅ Apps rebuilt successfully!
        echo 🔄 Continuing to monitor for changes...
        echo.
    )

goto monitor_loop