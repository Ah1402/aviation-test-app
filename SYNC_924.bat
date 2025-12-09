@echo off
REM Aviation Test App - SYNC_924 Batch Launcher
REM This batch file runs the SYNC_924.ps1 PowerShell script

echo ===============================================
echo   Aviation Test App - SYNC_924 Tool
echo ===============================================
echo.

REM Change to the script directory
cd /d "%~dp0"

REM Run the PowerShell script
powershell.exe -ExecutionPolicy Bypass -File "SYNC_924.ps1"

REM Pause to see the results
echo.
echo Press any key to exit...
pause >nul
