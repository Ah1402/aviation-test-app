@echo off
REM Aviation Test App - Sync & Deploy Tool (Windows Batch Wrapper)
REM Double-click this file to sync and deploy changes

echo.
echo ===============================================
echo   Aviation Test App - Sync ^& Deploy Tool
echo ===============================================
echo.

REM Run PowerShell script
powershell.exe -ExecutionPolicy Bypass -File "%~dp0SYNC_AND_DEPLOY.ps1"

REM Keep window open if there was an error
if errorlevel 1 (
    echo.
    echo Press any key to exit...
    pause > nul
)
